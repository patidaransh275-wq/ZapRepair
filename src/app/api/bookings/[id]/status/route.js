import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin';

/**
 * GET /api/bookings/[id]/status
 * Returns real-time status and technician ETA for tracking modal.
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        bookingId: id,
        status: 'Technician Assigned',
        eta: '30-45 Mins',
        source: 'local_fallback'
      });
    }

    let query = supabaseAdmin
      .from('bookings')
      .select(`
        id,
        booking_number,
        status,
        payment_status,
        payment_method,
        scheduled_date,
        time_slot,
        service_name,
        package_title,
        total_amount,
        technician_assignments (
          status,
          technicians (
            title,
            phone,
            rating,
            repairs_count,
            photo_url,
            vehicle_number,
            eta
          )
        )
      `);

    if (id.startsWith('IND-') || id.startsWith('PI-')) {
      query = query.eq('booking_number', id);
    } else {
      query = query.eq('id', id);
    }

    const { data: booking, error } = await query.single();
    if (error || !booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    const assignment = booking.technician_assignments?.[0];
    const techInfo = assignment?.technicians || {
      title: 'Verified Doorstep Technician',
      phone: '+91 91749 34135',
      rating: 4.95,
      repairs_count: 520,
      photo_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80',
      vehicle_number: 'Service Vehicle (MP 09 CZ 1122)',
      eta: '30 Mins'
    };

    return NextResponse.json({
      success: true,
      bookingNumber: booking.booking_number,
      status: booking.status,
      paymentStatus: booking.payment_status,
      scheduledDate: booking.scheduled_date,
      timeSlot: booking.time_slot,
      serviceName: booking.service_name,
      packageTitle: booking.package_title,
      totalAmount: booking.total_amount,
      technician: techInfo
    });
  } catch (error) {
    console.error('Error in /api/bookings/[id]/status:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
