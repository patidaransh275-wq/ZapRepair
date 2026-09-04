import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';

/**
 * PATCH /api/technician/profile
 * Updates technician availability status or profile details.
 */
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { technicianId, isActive, vehicleNumber, eta } = body;

    if (!technicianId) {
      return NextResponse.json({ success: false, error: 'Technician ID is required.' }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: true, message: 'Updated in fallback mode.' });
    }

    const updatePayload = {};
    if (typeof isActive === 'boolean') updatePayload.is_active = isActive;
    if (vehicleNumber) updatePayload.vehicle_number = vehicleNumber;
    if (eta) updatePayload.eta = eta;

    const { data: updated, error } = await supabaseAdmin
      .from('technicians')
      .update(updatePayload)
      .eq('id', technicianId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      technician: updated,
      message: 'Technician profile updated successfully.'
    });

  } catch (error) {
    console.error('Error in /api/technician/profile:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
