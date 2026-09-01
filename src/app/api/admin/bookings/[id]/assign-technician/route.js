import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../../lib/supabase/admin';

/**
 * POST /api/admin/bookings/[id]/assign-technician
 * Assigns or reassigns a technician to a booking and updates technician_assignments.
 */
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { technicianId, notes } = body;

    if (!technicianId) {
      return NextResponse.json({ success: false, error: 'Technician ID is required.' }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Technician assigned in local fallback mode.'
      });
    }

    // Find booking
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

    // Upsert assignment record
    const { data: assignment, error: assignErr } = await supabaseAdmin
      .from('technician_assignments')
      .insert({
        booking_id: booking.id,
        technician_id: technicianId,
        status: 'assigned',
        notes: notes || 'Assigned by admin'
      })
      .select(`
        id,
        status,
        technicians (
          id,
          title,
          phone,
          rating,
          vehicle_number,
          eta
        )
      `)
      .single();

    if (assignErr) {
      return NextResponse.json({ success: false, error: assignErr.message }, { status: 500 });
    }

    // Update booking status
    await supabaseAdmin
      .from('bookings')
      .update({ status: 'Technician Assigned' })
      .eq('id', booking.id);

    return NextResponse.json({
      success: true,
      assignment,
      message: 'Technician successfully assigned to booking.'
    });

  } catch (error) {
    console.error('Error in /api/admin/bookings/[id]/assign-technician:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
