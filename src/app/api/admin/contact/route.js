import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/contact
 * Lists all contact desk inquiries with status.
 */
export async function GET() {
  try {
    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        messages: []
      });
    }

    const { data: messages = [], error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error in /api/admin/contact:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
