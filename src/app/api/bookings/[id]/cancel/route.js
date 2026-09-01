import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin';

/**
 * PATCH /api/bookings/[id]/cancel
 * Cancels a booking and records status transition in audit history.
 */
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const { reason = 'Cancelled by customer' } = body;

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: true, message: 'Cancelled in local fallback mode.' });
    }

    let query = supabaseAdmin.from('bookings').select('*');
    if (id.startsWith('IND-') || id.startsWith('PI-')) {
      query = query.eq('booking_number', id);
    } else {
      query = query.eq('id', id);
    }

    const { data: booking, error: fetchErr } = await query.single();
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
      .single();

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
