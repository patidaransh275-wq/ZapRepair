import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin';

/**
 * GET /api/technician/jobs/[id]
 * Returns detailed assignment information for a specific job.
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        job: {
          id,
          bookingId: 'IND-72109',
          customerName: 'Priya Agrawal',
          customerPhone: '9893044556',
          address: 'Plot 24, Industry House Road, Old Palasia, Indore, MP',
          serviceName: 'Master Plumber Sanitary Fix',
          packageTitle: 'Chrome Tap & Wall Mixer Spindle Repair',
          status: 'assigned',
          totalAmount: 348
        }
      });
    }

    const { data: assignment, error } = await supabaseAdmin
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
          notes,
          booking_items (
            service_name,
            package_title,
            unit_price,
            quantity,
            total_price
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error || !assignment) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      job: {
        assignmentId: assignment.id,
        assignmentStatus: assignment.status,
        booking: assignment.bookings
      }
    });
  } catch (error) {
    console.error('Error in /api/technician/jobs/[id]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
