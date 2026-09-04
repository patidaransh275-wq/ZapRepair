import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/technician/jobs
 * Returns all assigned jobs for technician execution.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const technicianId = searchParams.get('technicianId');

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        jobs: [
          {
            id: 'job_1',
            bookingId: 'IND-72109',
            customerName: 'Priya Agrawal',
            customerPhone: '9893044556',
            address: 'Plot 24, Industry House Road, Old Palasia, Indore, MP',
            serviceName: 'Master Plumber Sanitary Fix',
            packageTitle: 'Chrome Tap & Wall Mixer Spindle Repair',
            status: 'assigned',
            scheduledDate: '2026-09-01',
            timeSlot: '4:00 PM - 6:00 PM',
            totalAmount: 348
          }
        ]
      });
    }

    let query = supabaseAdmin
      .from('technician_assignments')
      .select(`
        id,
        status,
        assigned_at,
        notes,
        bookings (
          id,
          booking_number,
          customer_name,
          customer_phone,
          customer_email,
          service_address,
          pincode,
          scheduled_date,
          time_slot,
          service_name,
          package_title,
          status,
          payment_status,
          total_amount,
          notes
        )
      `)
      .order('assigned_at', { ascending: false });

    if (technicianId) {
      query = query.eq('technician_id', technicianId);
    }

    const { data: assignments = [], error } = await query;
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      jobs: assignments.map(a => ({
        assignmentId: a.id,
        assignmentStatus: a.status,
        bookingId: a.bookings?.booking_number || a.bookings?.id,
        customerName: a.bookings?.customer_name,
        customerPhone: a.bookings?.customer_phone,
        address: a.bookings?.service_address,
        pincode: a.bookings?.pincode,
        serviceName: a.bookings?.service_name,
        packageTitle: a.bookings?.package_title,
        bookingStatus: a.bookings?.status,
        paymentStatus: a.bookings?.payment_status,
        scheduledDate: a.bookings?.scheduled_date,
        timeSlot: a.bookings?.time_slot,
        totalAmount: Number(a.bookings?.total_amount || 0),
        notes: a.bookings?.notes
      }))
    });
  } catch (error) {
    console.error('Error in /api/technician/jobs:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
