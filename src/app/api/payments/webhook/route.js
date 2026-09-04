import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { isValidUUID } from '../../../../lib/security.js';

/**
 * POST /api/payments/webhook
 * Webhook endpoint for external payment gateways (Razorpay / UPI / Cashfree).
 */
export async function POST(request) {
  try {
    // Check webhook secret authorization if configured
    const webhookSecret = process.env.PAYMENT_WEBHOOK_SECRET;
    if (webhookSecret) {
      const authHeader = request.headers.get('x-webhook-secret') || request.headers.get('authorization');
      if (authHeader !== webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
        return NextResponse.json({ success: false, error: 'Unauthorized webhook request.' }, { status: 401 });
      }
    }

    const rawBody = await request.text();
    let event;
    try {
      event = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { eventType, bookingId, paymentRef, amount } = event || {};
    const supabaseAdmin = getAdminClient();

    if (supabaseAdmin && bookingId && eventType === 'payment.captured') {
      let query = supabaseAdmin.from('bookings').select('id, total_amount');
      if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
        query = query.eq('booking_number', bookingId);
      } else if (isValidUUID(bookingId)) {
        query = query.eq('id', bookingId);
      } else {
        return NextResponse.json({ success: false, error: 'Invalid booking identifier' }, { status: 400 });
      }

      const { data: booking } = await query.maybeSingle();
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
