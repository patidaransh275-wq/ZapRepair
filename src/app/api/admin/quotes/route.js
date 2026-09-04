import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { validateAdminRequest } from '../../../../lib/adminAuth.js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/quotes
 * Returns all cost calculator repair estimate leads.
 */
export async function GET(request) {
  try {
    const auth = validateAdminRequest(request);
    if (!auth.authorized) {
      return auth.response;
    }

    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        quotes: []
      });
    }

    const { data: quotes = [], error } = await supabaseAdmin
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      quotes
    });
  } catch (error) {
    console.error('Error in /api/admin/quotes:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
