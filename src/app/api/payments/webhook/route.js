import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

/**
 * POST /api/payments/webhook
 * Webhook endpoint for external payment gateways (Razorpay / UPI / Cashfree).
 */
export async function POST(request) {
  try {
    const rawBody = await request.text();
    let event;
    try {
      event = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { eventType, bookingId, paymentRef, amount } = event;
    const supabaseAdmin = getAdminClient();

    if (supabaseAdmin && bookingId && eventType === 'payment.captured') {
      let query = supabaseAdmin.from('bookings').select('id, total_amount');
      if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
        query = query.eq('booking_number', bookingId);
      } else {
        query = query.eq('id', bookingId);
      }

      const { data: booking } = await query.single();
      if (booking) {
        await supabaseAdmin.from('payments').insert({
          booking_id: booking.id,
          amount: amount || booking.total_amount,
          payment_method: 'Gateway / Online',
          payment_status: 'verified',
          payment_ref: paymentRef || `GW-${Date.now()}`
        });

        await supabaseAdmin.from('bookings').update({
          payment_status: 'Paid',
          payment_ref: paymentRef || `GW-${Date.now()}`,
          status: 'Payment Verified & Completed'
        }).eq('id', booking.id);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error in /api/payments/webhook:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
