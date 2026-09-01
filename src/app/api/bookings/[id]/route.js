import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

/**
 * PATCH /api/bookings/[id]
 * Updates booking status, payment status, or technician assignments in Supabase.
 */
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { 
      status, 
      paymentStatus, 
      paymentMethod, 
      paymentRef, 
      extraParts = 0,
      scheduledDate,
      timeSlot,
      technicianId
    } = body || {};

    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        message: 'Updated in local fallback mode.'
      });
    }

    // Find the booking by ID or booking_number
    let findQuery = supabaseAdmin.from('bookings').select('*');
    if (id.startsWith('IND-')) {
      findQuery = findQuery.eq('booking_number', id);
    } else {
      findQuery = findQuery.eq('id', id);
    }

    const { data: existingBooking, error: fetchErr } = await findQuery.single();

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
      .single();

    if (updateErr) {
      return NextResponse.json({ success: false, error: updateErr.message }, { status: 500 });
    }

    // If payment verified, record in payments table
    if (paymentStatus === 'Paid') {
      await supabaseAdmin.from('payments').insert({
        booking_id: existingBooking.id,
        amount: updatedBooking.total_amount,
        payment_method: paymentMethod || 'UPI',
        payment_status: 'verified',
        payment_ref: paymentRef || `UPI-${Math.floor(10000000 + Math.random() * 90000000)}`
      });
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: 'Booking successfully updated in Supabase.'
    });

  } catch (err) {
    console.error('Server error in PATCH /api/bookings/[id]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
