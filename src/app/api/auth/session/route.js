import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('plumberindore_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ isAuthenticated: false, user: null });
    }

    const user = JSON.parse(sessionCookie.value);
    return NextResponse.json({ isAuthenticated: true, user });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false, user: null });
  }
}
