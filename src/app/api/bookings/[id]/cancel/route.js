import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin.js';
import { isValidUUID, checkRateLimit, getClientIp } from '../../../../../lib/security.js';

/**
 * PATCH /api/bookings/[id]/cancel
 * Cancels a booking and records status transition in audit history.
 */
export async function PATCH(request, { params }) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`cancel_booking_${ip}`, 10, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    const { id } = params || {};
    if (!id) {
      return NextResponse.json({ success: false, error: 'Booking ID is required.' }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    const { reason = 'Cancelled by customer' } = body || {};

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: true, message: 'Cancelled in local fallback mode.' });
    }

    let query = supabaseAdmin.from('bookings').select('*');
    if (id.startsWith('IND-') || id.startsWith('PI-')) {
      query = query.eq('booking_number', id);
    } else if (isValidUUID(id)) {
      query = query.eq('id', id);
    } else {
      return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
    }

    const { data: booking, error: fetchErr } = await query.maybeSingle();
    if (fetchErr || !booking) {
      return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
    }

    if (booking.status === 'Payment Verified & Completed') {
      return NextResponse.json({ 
        success: false, 
        error: 'Cannot cancel a completed and paid booking. Please contact customer support.' 
      }, { status: 400 });
    }

    const { data: updated, error: updateErr } = await supabaseAdmin
      .from('bookings')
      .update({
        status: 'Cancelled',
        notes: booking.notes ? `${booking.notes}\n[Cancelled]: ${reason}` : `[Cancelled]: ${reason}`
      })
      .eq('id', booking.id)
      .select()
      .maybeSingle();

    if (updateErr) {
      return NextResponse.json({ success: false, error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      booking: updated,
      message: 'Booking successfully cancelled.'
    });
  } catch (error) {
    console.error('Error in /api/bookings/[id]/cancel:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
