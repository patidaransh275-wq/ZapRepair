import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

/**
 * GET /api/payments/[bookingId]
 * Returns payment history and status for a specific booking.
 */
export async function GET(request, { params }) {
  try {
    const { bookingId } = params;
    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        bookingId,
        paymentStatus: 'Pending',
        source: 'local_fallback'
      });
    }

    let query = supabaseAdmin.from('bookings').select('id, booking_number, payment_status, payment_method, payment_ref, total_amount');
    if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
      query = query.eq('booking_number', bookingId);
    } else {
      query = query.eq('id', bookingId);
    }

    const { data: booking, error: fetchErr } = await query.single();
    if (fetchErr || !booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    const { data: payments = [] } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('booking_id', booking.id);

    return NextResponse.json({
      success: true,
      bookingNumber: booking.booking_number,
      paymentStatus: booking.payment_status,
      paymentMethod: booking.payment_method,
      paymentRef: booking.payment_ref,
      totalAmount: booking.total_amount,
      payments
    });
  } catch (error) {
    console.error('Error in GET /api/payments/[bookingId]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
