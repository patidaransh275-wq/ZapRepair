import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { validateAdminRequest } from '../../../../lib/adminAuth.js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/customers
 * Returns customer profiles with their booking histories and spend metrics.
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
        customers: []
      });
    }

    const { data: customers = [], error } = await supabaseAdmin
      .from('profiles')
      .select(`
        id,
        full_name,
        phone,
        email,
        created_at,
        customers (
          loyalty_tier,
          total_bookings
        )
      `)
      .eq('role', 'customer')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      customers: customers.map(c => ({
        id: c.id,
        name: c.full_name,
        phone: c.phone,
        email: c.email,
        loyaltyTier: c.customers?.[0]?.loyalty_tier || 'standard',
        totalBookings: c.customers?.[0]?.total_bookings || 1,
        createdAt: c.created_at
      }))
    });
  } catch (error) {
    console.error('Error in /api/admin/customers:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
