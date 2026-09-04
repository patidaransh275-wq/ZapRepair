import { NextResponse } from 'next/server';
import { sendNotificationEmail } from '../../../utils/resend';
import { checkRateLimit, sanitizeString, validateIndianPhone, validatePincode, getClientIp } from '../../../lib/security';

export async function POST(request) {
  try {
    // 1. Rate Limiting (Max 5 quote requests per minute per IP)
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`quote_${ip}`, 5, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const category = sanitizeString(body?.category);
    const brand = sanitizeString(body?.brand);
    const modelType = sanitizeString(body?.modelType);
    const issue = sanitizeString(body?.issue);
    const estimatedPrice = Number(body?.estimatedPrice) || 0;
    const customerName = sanitizeString(body?.customerName);
    const customerPhone = validateIndianPhone(body?.customerPhone) || sanitizeString(body?.customerPhone);
    const customerPincode = validatePincode(body?.customerPincode);
    const remarks = sanitizeString(body?.remarks);

    if (!category || !issue) {
      return NextResponse.json(
        { success: false, error: 'Category and issue details are required.' },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fbbf24; margin: 0; font-size: 20px;">PlumberIndore - New Quote Request</h2>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p style="font-size: 14px; margin-top: 0;">A customer requested a repair cost estimate on PlumberIndore:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Service Category:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; text-transform: capitalize; font-weight: bold; color: #d97706;">${category}</td>
            </tr>
            ${brand ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Appliance Brand:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${brand}</td>
            </tr>` : ''}
            ${modelType ? `
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Model / Type:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${modelType}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Reported Issue:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">${issue}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Estimated Quote:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 16px; font-weight: bold; color: #059669;">₹${estimatedPrice || 'Standard Rate Card'}</td>
            </tr>
            ${customerName ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Customer Name:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${customerName}</td>
            </tr>` : ''}
            ${customerPhone ? `
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Customer Phone:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${customerPhone}" style="color: #d97706; text-decoration: none; font-weight: bold;">${customerPhone}</a></td>
            </tr>` : ''}
            ${customerPincode ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Indore Pincode:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${customerPincode}</td>
            </tr>` : ''}
            ${remarks ? `
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Additional Remarks:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-line;">${remarks}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Requested At:</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${submissionTime} (IST)</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 12px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px; font-size: 13px;">
            <strong>Lead Action:</strong> ${customerPhone ? `Contact customer at <strong>${customerPhone}</strong> to confirm booking.` : 'Quote generated via Cost Calculator.'}
          </div>
        </div>
        <div style="text-align: center; padding: 12px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          PlumberIndore Notification System • Verified Domain: plumberindore.in
        </div>
      </div>
    `;

    // Persist in Supabase quote_requests table
    let dbRecord = null;
    try {
      const { getAdminClient } = await import('../../../lib/supabase/admin.js');
      const supabaseAdmin = getAdminClient();
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.from('quote_requests').insert({
          category,
          brand: brand || null,
          model_type: modelType || null,
          issue,
          estimated_price: Number(estimatedPrice) || null,
          customer_name: customerName || null,
          customer_phone: customerPhone || null,
          customer_pincode: customerPincode || null,
          remarks: remarks || null,
          status: 'pending'
        }).select().single();
        if (error) console.error('Supabase quote request save error:', error.message);
        else dbRecord = data;
      }
    } catch (dbEx) {
      console.warn('Supabase quote request save exception:', dbEx.message);
    }

    let emailResult = { sent: false };
    try {
      emailResult = await sendNotificationEmail({
        subject: `[PlumberIndore] New Quote Request: ${category.toUpperCase()} (${issue})`,
        html: htmlContent,
        replyTo: 'plumberindore@gmail.com'
      });

      if (!emailResult?.success || emailResult?.error) {
        console.error('[POST /api/quote ERROR] Resend dispatch error:', JSON.stringify(emailResult, null, 2));
      } else {
        console.log('[POST /api/quote SUCCESS] Quote request alert delivered:', JSON.stringify(emailResult, null, 2));
      }
    } catch (emailErr) {
      console.error('[POST /api/quote EXCEPTION]:', emailErr);
      emailResult = { sent: false, error: emailErr.message };
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully!',
        data: dbRecord || { category, issue, estimatedPrice },
        emailDispatch: emailResult
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/quote route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
