import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { validateAdminRequest } from '../../../../lib/adminAuth.js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/payments
 * Financial ledger of all verified customer transactions.
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
        payments: [
          {
            id: 'pay_1',
            bookingNumber: 'IND-84920',
            amount: 399,
            method: 'UPI',
            ref: 'UPI-9174934135-TXN882',
            status: 'verified',
            verifiedAt: '2026-09-01T14:30:00Z'
          }
        ]
      });
    }

    const { data: payments = [], error } = await supabaseAdmin
      .from('payments')
      .select(`
        id,
        amount,
        payment_method,
        payment_status,
        payment_ref,
        verified_at,
        created_at,
        bookings (
          booking_number,
          customer_name,
          customer_phone,
          service_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      payments: payments.map(p => ({
        id: p.id,
        bookingNumber: p.bookings?.booking_number || 'N/A',
        customerName: p.bookings?.customer_name || 'Customer',
        customerPhone: p.bookings?.customer_phone || 'N/A',
        serviceName: p.bookings?.service_name || 'Service',
        amount: Number(p.amount),
        paymentMethod: p.payment_method,
        paymentStatus: p.payment_status,
        paymentRef: p.payment_ref,
        verifiedAt: p.verified_at
      }))
    });
  } catch (error) {
    console.error('Error in /api/admin/payments:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
