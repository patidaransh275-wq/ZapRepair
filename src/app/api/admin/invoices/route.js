import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin.js';
import { validateAdminRequest } from '../../../../lib/adminAuth.js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/invoices
 * Returns all generated tax invoices with itemized line items and booking references.
 */
export async function GET(request) {
  try {
    const auth = validateAdminRequest(request);
    if (!auth.authorized) {
      return auth.response;
    }

    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        invoices: [
          {
            id: 'inv_1',
            invoiceNumber: 'INV-2026-IND-84920',
            bookingNumber: 'IND-84920',
            customerName: 'Rahul Sharma',
            customerPhone: '9826011223',
            totalPaid: 399,
            issuedAt: '2026-09-01T14:30:00Z',
            sentAt: '2026-09-01T14:31:00Z'
          }
        ]
      });
    }

    const { data: invoices = [], error } = await supabaseAdmin
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
          booking_number,
          service_name
        ),
        invoice_items (
          description,
          quantity,
          unit_price,
          amount
        )
      `)
      .order('issued_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      invoices: invoices.map(i => ({
        id: i.id,
        invoiceNumber: i.invoice_number,
        bookingNumber: i.bookings?.booking_number || 'N/A',
        serviceName: i.bookings?.service_name || 'Home Service',
        customerName: i.customer_name,
        customerEmail: i.customer_email,
        customerPhone: i.customer_phone,
        billingAddress: i.billing_address,
        laborCost: Number(i.labor_cost),
        partsCost: Number(i.parts_cost),
        taxAmount: Number(i.tax_amount),
        totalPaid: Number(i.total_paid),
        paymentMethod: i.payment_method,
        paymentRef: i.payment_ref,
        issuedAt: i.issued_at,
        sentAt: i.sent_at,
        items: i.invoice_items || []
      }))
    });
  } catch (error) {
    console.error('Error in /api/admin/invoices:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
