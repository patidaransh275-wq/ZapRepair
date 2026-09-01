import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/customers
 * Returns customer profiles with their booking histories and spend metrics.
 */
export async function GET() {
  try {
    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        customers: [
          {
            id: 'c1',
            name: 'Rahul Sharma',
            phone: '9826011223',
            email: 'rahul.sharma.indore@gmail.com',
            totalBookings: 2,
            totalSpend: 798,
            createdAt: '2026-08-15'
          },
          {
            id: 'c2',
            name: 'Priya Agrawal',
            phone: '9893044556',
            email: 'priya.agrawal@gmail.com',
            totalBookings: 1,
            totalSpend: 348,
            createdAt: '2026-08-20'
          }
        ]
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
