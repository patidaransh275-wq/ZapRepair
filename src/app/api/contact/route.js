import { NextResponse } from 'next/server';
import { sendNotificationEmail } from '../../../utils/resend';
import { checkRateLimit, sanitizeString, validateIndianPhone, validateEmail, getClientIp } from '../../../lib/security';

export async function POST(request) {
  try {
    // 1. Rate Limiting (Max 5 inquiries per minute per IP)
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`contact_${ip}`, 5, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const rawName = body?.name;
    const rawPhone = body?.phone;
    const rawMessage = body?.message;
    const rawEmail = body?.email;

    const name = sanitizeString(rawName);
    const message = sanitizeString(rawMessage);
    const cleanPhone = validateIndianPhone(rawPhone);
    const cleanEmail = validateEmail(rawEmail);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name.' },
        { status: 400 }
      );
    }

    if (!cleanPhone) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please enter a message of at least 5 characters.' },
        { status: 400 }
      );
    }

    const phone = cleanPhone;
    const email = cleanEmail;

    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fbbf24; margin: 0; font-size: 20px;">PlumberIndore - New Contact Form Inquiry</h2>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p style="font-size: 14px; margin-top: 0;">A new message was submitted via the <strong>Contact Support Desk</strong> on PlumberIndore:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Customer Name:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Mobile Number:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${phone}" style="color: #d97706; text-decoration: none; font-weight: bold;">${phone}</a></td>
            </tr>
            ${email ? `
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Email Address:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${email}</td>
            </tr>` : ''}
            <tr style="background-color: ${email ? '#ffffff' : '#f8fafc'};">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Submission Time:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionTime} (IST)</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Message / Query:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-line;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 12px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; font-size: 13px;">
            <strong>Doorstep Action:</strong> Call customer at <strong>${phone}</strong> or reply to this inquiry directly.
          </div>
        </div>
        <div style="text-align: center; padding: 12px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          PlumberIndore Notification System • Verified Domain: plumberindore.in
        </div>
      </div>
    `;

    // Persist in Supabase contact_messages table
    let dbRecord = null;
    try {
      const { getAdminClient } = await import('../../../lib/supabase/admin.js');
      const supabaseAdmin = getAdminClient();
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.from('contact_messages').insert({
          name: name.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : null,
          message: message.trim(),
          status: 'new'
        }).select().single();
        if (error) console.error('Supabase contact save error:', error.message);
        else dbRecord = data;
      }
    } catch (dbEx) {
      console.warn('Supabase contact save exception:', dbEx.message);
    }

    let emailResult = { sent: false };
    try {
      emailResult = await sendNotificationEmail({
        subject: `[PlumberIndore] New Contact Message from ${name} (${phone})`,
        html: htmlContent,
        replyTo: email || 'plumberindore@gmail.com'
      });
    } catch (emailErr) {
      console.warn('Resend contact dispatch notice:', emailErr.message);
      emailResult = { sent: false, error: emailErr.message };
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been received! Our Indore support team will reach out shortly.',
        data: dbRecord || { name, phone },
        emailDispatch: emailResult
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/contact route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
