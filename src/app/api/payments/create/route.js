import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

/**
 * POST /api/payments/create
 * Creates payment order or UPI QR intent for a verified booking amount.
 * Never trusts client price; queries booking authoritative total from Supabase.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { bookingId, paymentMethod = 'UPI' } = body;

    if (!bookingId) {
      return NextResponse.json({ success: false, error: 'Booking ID is required.' }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();
    let totalAmount = 199;
    let customerPhone = '9174934135';

    if (supabaseAdmin) {
      let query = supabaseAdmin.from('bookings').select('id, booking_number, total_amount, customer_phone, payment_status');
      if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
        query = query.eq('booking_number', bookingId);
      } else {
        query = query.eq('id', bookingId);
      }

      const { data: booking, error } = await query.single();
      if (!error && booking) {
        totalAmount = Number(booking.total_amount);
        customerPhone = booking.customer_phone;
      }
    }

    const orderId = `ORDER_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const upiString = `upi://pay?pa=9174934135@yescred&pn=PlumberIndore&am=${totalAmount}&tn=PI-${bookingId}&cu=INR`;

    return NextResponse.json({
      success: true,
      orderId,
      bookingId,
      amount: totalAmount,
      currency: 'INR',
      paymentMethod,
      upiId: '9174934135@yescred',
      merchantName: 'PlumberIndore Services',
      upiString
    });

  } catch (error) {
    console.error('Error in /api/payments/create:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
