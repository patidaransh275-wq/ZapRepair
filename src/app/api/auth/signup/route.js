import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, password } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const userSession = {
      id: `usr_${cleanPhone}`,
      name: name.trim(),
      phone: `+91 ${cleanPhone}`,
      email: email.toLowerCase().trim(),
      role: 'customer',
      authMethod: 'signup',
      authenticatedAt: new Date().toISOString()
    };

    // Synchronize with Supabase profiles
    try {
      const { getAdminClient } = await import('../../../../lib/supabase/admin.js');
      const supabaseAdmin = getAdminClient();
      if (supabaseAdmin) {
        await supabaseAdmin.from('profiles').upsert({
          full_name: name.trim(),
          phone: `+91 ${cleanPhone}`,
          email: email.toLowerCase().trim(),
          role: 'customer'
        }, { onConflict: 'email' });
      }
    } catch (dbEx) {
      console.warn('Supabase profile sync warning:', dbEx.message);
    }

    // Send Welcome Email via Resend
    try {
      const { sendEmail } = await import('../../../../utils/resend.js');
      await sendEmail({
        to: [email.toLowerCase().trim(), 'plumberindore@gmail.com'],
        subject: `[PlumberIndore] Welcome to Indore's #1 Doorstep Service Network, ${name}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
            <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
            </div>
            <div style="padding: 24px 16px;">
              <h2 style="font-size: 20px; font-weight: 800; color: #0f172a;">Welcome to PlumberIndore, ${name}!</h2>
              <p style="font-size: 13px; color: #475569; line-height: 1.6;">
                Your account has been registered with <strong>${email}</strong> and mobile <strong>+91 ${cleanPhone}</strong>.
              </p>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 16px 0; font-size: 13px;">
                <div style="font-weight: bold; color: #0f172a; margin-bottom: 6px;">Your PlumberIndore Benefits:</div>
                <div>✓ 45-Minute Doorstep Technician Arrival</div>
                <div>✓ Transparent Fixed Rate Cards (No hidden charges)</div>
                <div>✓ 30-Day Post Service Warranty on all repairs</div>
                <div>✓ Verified Background-Checked Indore Technicians</div>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.plumberindore.in" style="background-color: #f59e0b; color: #0f172a; text-decoration: none; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 10px; display: inline-block;">
                  Book Doorstep Service Now →
                </a>
              </div>
            </div>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
              PlumberIndore Helpline: +91 91749 34135 • plumberindore@gmail.com
            </div>
          </div>
        `,
        replyTo: 'plumberindore@gmail.com'
      });
    } catch (emailErr) {
      console.warn('Welcome email non-critical error:', emailErr);
    }

    return NextResponse.json({
      success: true,
      user: userSession,
      message: 'Account created successfully!'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Server error creating account.' },
      { status: 500 }
    );
  }
}
