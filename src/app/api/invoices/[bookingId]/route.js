import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { isValidUUID } from '../../../../lib/security.js';

/**
 * GET /api/invoices/[bookingId]
 * Returns invoice and line items for a booking.
 */
export async function GET(request, { params }) {
  try {
    const { bookingId } = params || {};
    if (!bookingId) {
      return NextResponse.json({ success: false, error: 'Booking ID is required.' }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });
    }

    // Find invoice by booking_id or booking_number
    let query = supabaseAdmin
      .from('invoices')
      .select(`
        id,
        invoice_number,
        customer_name,
        customer_email,
        customer_phone,
        billing_address,
        labor_cost,
        parts_cost,
        tax_amount,
        total_paid,
        payment_method,
        payment_ref,
        issued_at,
        sent_at,
        bookings (
          id,
          booking_number,
          service_name,
          package_title,
          scheduled_date,
          status
        ),
        invoice_items (
          description,
          quantity,
          unit_price,
          amount
        )
      `);

    if (bookingId.startsWith('INV-')) {
      query = query.eq('invoice_number', bookingId);
    } else {
      // Find booking first
      let bQuery = supabaseAdmin.from('bookings').select('id');
      if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
        bQuery = bQuery.eq('booking_number', bookingId);
      } else if (isValidUUID(bookingId)) {
        bQuery = bQuery.eq('id', bookingId);
      } else {
        return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });
      }

      const { data: bData } = await bQuery.maybeSingle();
      if (!bData) {
        return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });
      }
      query = query.eq('booking_id', bData.id);
    }

    const { data: invoice, error } = await query.maybeSingle();
    if (error || !invoice) {
      return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      invoice
    });
  } catch (error) {
    console.error('Error in GET /api/invoices/[bookingId]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
