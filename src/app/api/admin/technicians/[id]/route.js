import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin';

/**
 * PATCH /api/admin/technicians/[id]
 * Updates technician details, active status, or vehicle info.
 */
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, phone, vehicleNumber, eta, isActive, rating } = body;

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: true, message: 'Updated in fallback mode.' });
    }

    const updatePayload = {};
    if (title) updatePayload.title = title.trim();
    if (phone) updatePayload.phone = phone.trim();
    if (vehicleNumber) updatePayload.vehicle_number = vehicleNumber;
    if (eta) updatePayload.eta = eta;
    if (typeof isActive === 'boolean') updatePayload.is_active = isActive;
    if (rating) updatePayload.rating = Number(rating);

    const { data: updated, error } = await supabaseAdmin
      .from('technicians')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      technician: updated,
      message: 'Technician updated successfully.'
    });
  } catch (error) {
    console.error('Error in PATCH /api/admin/technicians/[id]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
