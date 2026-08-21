import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In-memory OTP storage & rate-limiting tracker
const otpStore = new Map(); // phone -> { code, expiresAt, attempts, requestCount, firstRequestTime }

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, phone, otp, name } = body;

    // Validate Indian 10-digit phone format (starts with 6,7,8,9)
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    const now = Date.now();
    let record = otpStore.get(cleanPhone) || {
      code: '123456',
      expiresAt: 0,
      attempts: 0,
      requestCount: 0,
      firstRequestTime: now
    };

    // ACTION 1: REQUEST OTP
    if (action === 'request') {
      // Rate limiting: Reset count if 1 hour has passed
      if (now - record.firstRequestTime > 3600000) {
        record.requestCount = 0;
        record.firstRequestTime = now;
      }

      // Check max 5 requests per hour limit
      if (record.requestCount >= 5) {
        return NextResponse.json(
          { error: 'Too many OTP requests. Maximum 5 requests allowed per hour.' },
          { status: 429 }
        );
      }

      const generatedCode = '123456'; // Standard demo OTP code for instant testing
      record.code = generatedCode;
      record.expiresAt = now + 5 * 60 * 1000; // 5 minutes expiry
      record.attempts = 0;
      record.requestCount += 1;

      otpStore.set(cleanPhone, record);

      return NextResponse.json({
        success: true,
        message: `OTP sent successfully to +91 ${cleanPhone}. (Use demo OTP: 123456)`,
        expiresInSeconds: 300
      });
    }

    // ACTION 2: VERIFY OTP
    if (action === 'verify') {
      if (!record.expiresAt || now > record.expiresAt) {
        return NextResponse.json(
          { error: 'OTP has expired. Please request a new OTP.' },
          { status: 400 }
        );
      }

      if (record.attempts >= 3) {
        return NextResponse.json(
          { error: 'Maximum 3 verification attempts exceeded. Please request a new OTP.' },
          { status: 400 }
        );
      }

      record.attempts += 1;
      otpStore.set(cleanPhone, record);

      if (otp !== record.code && otp !== '123456') {
        return NextResponse.json(
          { error: `Invalid OTP code. ${3 - record.attempts} attempt(s) remaining.` },
          { status: 400 }
        );
      }

      // OTP Verification Success -> Clear OTP record
      otpStore.delete(cleanPhone);

      const userSession = {
        id: `usr_${cleanPhone}`,
        name: name || 'Indore Customer',
        phone: `+91 ${cleanPhone}`,
        email: `user_${cleanPhone.slice(-4)}@zaprepair.in`,
        role: 'user',
        authMethod: 'phone',
        authenticatedAt: new Date().toISOString()
      };

      // Set httpOnly session cookie
      const cookieStore = cookies();
      cookieStore.set('zaprepair_session', JSON.stringify(userSession), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      });

      return NextResponse.json({
        success: true,
        user: userSession,
        message: 'Mobile number verified successfully!'
      });
    }

    return NextResponse.json({ error: 'Invalid action specified.' }, { status: 400 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Server error processing request.' },
      { status: 500 }
    );
  }
}
