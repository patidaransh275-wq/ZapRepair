import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkRateLimit, getClientIp } from '../../../../lib/security';

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`login_${ip}`, 5, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait 1 minute before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Validate email format
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!password || password.length < 4) {
      return NextResponse.json(
        { error: 'Please enter your password.' },
        { status: 400 }
      );
    }

    const userSession = {
      id: `usr_${email.split('@')[0]}`,
      name: email.split('@')[0].toUpperCase(),
      email: email.toLowerCase(),
      phone: '+91 98765 12345',
      role: 'user',
      authMethod: 'email',
      authenticatedAt: new Date().toISOString()
    };

    // Set httpOnly session cookie
    const cookieStore = cookies();
    cookieStore.set('plumberindore_session', JSON.stringify(userSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return NextResponse.json({
      success: true,
      user: userSession,
      message: 'Logged in successfully!'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Server error during login.' },
      { status: 500 }
    );
  }
}
