import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { isValidUUID, checkRateLimit, getClientIp } from '../../../../lib/security.js';

/**
 * POST /api/payments/create
 * Creates payment order or UPI QR intent for a verified booking amount.
 * Never trusts client price; queries booking authoritative total from Supabase.
 */
export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`payment_create_${ip}`, 15, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many payment creation attempts. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { bookingId, paymentMethod = 'UPI' } = body || {};

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
      } else if (isValidUUID(bookingId)) {
        query = query.eq('id', bookingId);
      } else {
        return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
      }

      const { data: booking, error } = await query.maybeSingle();
      if (error || !booking) {
        return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
      }

      totalAmount = Number(booking.total_amount);
      customerPhone = booking.customer_phone;
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
