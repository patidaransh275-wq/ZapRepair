import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { isValidUUID, checkRateLimit, getClientIp } from '../../../../lib/security.js';

/**
 * PATCH /api/bookings/[id]
 * Updates booking status, payment status, or technician assignments in Supabase.
 */
export async function PATCH(request, { params }) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`patch_booking_${ip}`, 20, 60000);
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

    const body = await request.json();
    const { 
      status, 
      paymentStatus, 
      paymentMethod, 
      paymentRef, 
      extraParts = 0,
      scheduledDate,
      timeSlot
    } = body || {};

    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        message: 'Updated in local fallback mode.'
      });
    }

    // Safely construct lookup query avoiding Postgres 22P02 UUID syntax error
    let findQuery = supabaseAdmin.from('bookings').select('*');
    if (id.startsWith('IND-') || id.startsWith('PI-')) {
      findQuery = findQuery.eq('booking_number', id);
    } else if (isValidUUID(id)) {
      findQuery = findQuery.eq('id', id);
    } else {
      return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
    }

    const { data: existingBooking, error: fetchErr } = await findQuery.maybeSingle();

    if (fetchErr || !existingBooking) {
      return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
    }

    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (paymentStatus) updatePayload.payment_status = paymentStatus;
    if (paymentMethod) updatePayload.payment_method = paymentMethod;
    if (paymentRef) updatePayload.payment_ref = paymentRef;
    if (scheduledDate) updatePayload.scheduled_date = scheduledDate;
    if (timeSlot) updatePayload.time_slot = timeSlot;

    if (Number(extraParts) > 0) {
      updatePayload.parts_cost = Number(extraParts);
      updatePayload.total_amount = Number(existingBooking.subtotal || 0) + Number(extraParts);
    }

    const { data: updatedBooking, error: updateErr } = await supabaseAdmin
      .from('bookings')
      .update(updatePayload)
      .eq('id', existingBooking.id)
      .select()
      .maybeSingle();

    if (updateErr) {
      return NextResponse.json({ success: false, error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: 'Booking updated successfully.'
    });

  } catch (err) {
    console.error('Server error in PATCH /api/bookings/[id]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
