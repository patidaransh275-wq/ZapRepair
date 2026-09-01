import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

/**
 * GET /api/invoices/[bookingId]
 * Returns invoice and line items for a booking.
 */
export async function GET(request, { params }) {
  try {
    const { bookingId } = params;
    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        invoice: {
          invoiceNumber: `INV-2026-${bookingId}`,
          bookingNumber: bookingId,
          totalPaid: 399,
          paymentStatus: 'Paid'
        }
      });
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
      } else {
        bQuery = bQuery.eq('id', bookingId);
      }
      const { data: bData } = await bQuery.single();
      if (bData) {
        query = query.eq('booking_id', bData.id);
      }
    }

    const { data: invoice, error } = await query.single();
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
