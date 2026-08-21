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
      role: 'user',
      authMethod: 'signup',
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
      message: 'Account created successfully!'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Server error creating account.' },
      { status: 500 }
    );
  }
}
