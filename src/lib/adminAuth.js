import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Validates whether an incoming HTTP request is authorized as an Admin.
 * Checks for:
 * 1. Admin secret header (x-admin-key) or Bearer token (Authorization: Bearer <ADMIN_SECRET>)
 * 2. Active httpOnly session cookie with role === 'admin'
 * 
 * Returns { authorized: true } or { authorized: false, response: NextResponse }
 */
export function validateAdminRequest(request) {
  // 1. Check for Admin Secret in headers
  const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.ADMIN_KEY;
  const headerKey = request.headers.get('x-admin-key');
  const authHeader = request.headers.get('authorization');

  if (adminSecret) {
    if (headerKey === adminSecret) {
      return { authorized: true };
    }
    if (authHeader && authHeader.startsWith('Bearer ') && authHeader.slice(7) === adminSecret) {
      return { authorized: true };
    }
  }

  // 2. Check for authenticated admin session cookie
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('plumberindore_session');
    if (sessionCookie?.value) {
      const session = JSON.parse(sessionCookie.value);
      if (session?.role === 'admin' || session?.role === 'superadmin') {
        return { authorized: true, user: session };
      }
    }
  } catch (err) {
    // Malformed session cookie
  }

  // In development mode, if no secret is configured, allow local inspection with a warning
  if (process.env.NODE_ENV === 'development' && !adminSecret) {
    return { authorized: true, devMode: true };
  }

  return {
    authorized: false,
    response: NextResponse.json(
      { 
        success: false, 
        error: 'Unauthorized: Admin authentication required to access this resource.' 
      },
      { status: 401 }
    )
  };
}
