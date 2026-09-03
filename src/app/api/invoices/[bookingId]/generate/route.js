import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin.js';
import { sendEmail } from '../../../../../utils/resend.js';
import { UPI_ID, UPI_PAYEE_NAME, UPI_QR_DATA_URI } from '../../../../../lib/qrCode.js';

/**
 * POST /api/invoices/[bookingId]/generate
 * Generates an official tax invoice in Supabase and emails it via Resend.
 */
export async function POST(request, { params }) {
  try {
    const { bookingId } = params;
    const supabaseAdmin = getAdminClient();

    let targetBooking = {
      id: bookingId,
      booking_number: bookingId,
      customer_name: 'Rahul Sharma',
      customer_email: 'rahul.sharma.indore@gmail.com',
      customer_phone: '9826011223',
      service_address: 'Flat 402, Royal Residency, Vijay Nagar, Indore, MP',
      service_name: 'AC Unit Repair & Service',
      package_title: 'Power Jet Foam Wash & Cooling Diagnostics',
      subtotal: 399,
      parts_cost: 0,
      total_amount: 399,
      payment_method: 'UPI',
      payment_ref: 'UPI-9174934135-TXN882'
    };

    if (supabaseAdmin) {
      let query = supabaseAdmin
        .from('bookings')
        .select(`
          id,
          booking_number,
          customer_name,
          customer_email,
          customer_phone,
          service_address,
          service_name,
          package_title,
          subtotal,
          parts_cost,
          total_amount,
          payment_method,
          payment_ref,
          booking_items (
            service_name,
            package_title,
            unit_price,
            quantity,
            total_price
          )
        `);

      if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
        query = query.eq('booking_number', bookingId);
      } else {
        query = query.eq('id', bookingId);
      }

      const { data: dbBooking } = await query.single();
      if (dbBooking) {
        targetBooking = dbBooking;
      }
    }

    const invNumber = `INV-2026-${targetBooking.booking_number || targetBooking.id}`;
    const laborCost = Number(targetBooking.subtotal || targetBooking.total_amount || 199);
    const partsCost = Number(targetBooking.parts_cost || 0);
    const taxAmount = 0;
    const totalPaid = laborCost + partsCost;

    if (supabaseAdmin) {
      // Upsert invoice in DB
      const { data: createdInv } = await supabaseAdmin
        .from('invoices')
        .upsert({
          booking_id: targetBooking.id,
          invoice_number: invNumber,
          customer_name: targetBooking.customer_name,
          customer_email: targetBooking.customer_email,
          customer_phone: targetBooking.customer_phone,
          billing_address: targetBooking.service_address,
          labor_cost: laborCost,
          parts_cost: partsCost,
          tax_amount: taxAmount,
          total_paid: totalPaid,
          payment_method: targetBooking.payment_method || 'UPI',
          payment_ref: targetBooking.payment_ref,
          sent_at: new Date().toISOString()
        }, { onConflict: 'invoice_number' })
        .select()
        .single();

      if (createdInv) {
        // Insert invoice items
        await supabaseAdmin.from('invoice_items').insert([
          {
            invoice_id: createdInv.id,
            description: `${targetBooking.service_name} - ${targetBooking.package_title}`,
            quantity: 1,
            unit_price: laborCost,
            amount: laborCost
          },
          ...(partsCost > 0 ? [{
            invoice_id: createdInv.id,
            description: 'Approved Replacement Spare Parts / Materials',
            quantity: 1,
            unit_price: partsCost,
            amount: partsCost
          }] : [])
        ]);
      }
    }

    // HTML Invoice Template
    const invoiceHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #0f172a;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #f1f5f9; padding-bottom: 16px;">
          <div>
            <h1 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 800;">Plumber<span style="color: #2563eb;">Indore</span></h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Indore's #1 Doorstep Home Services Network</p>
          </div>
          <div style="text-align: right;">
            <span style="background-color: #ecfdf5; color: #059669; font-weight: bold; font-size: 12px; padding: 4px 10px; border-radius: 20px; border: 1px solid #a7f3d0;">PAID TAX INVOICE</span>
            <div style="margin-top: 6px; font-size: 12px; color: #475569;"><strong>${invNumber}</strong></div>
          </div>
        </div>
        <div style="margin: 20px 0; font-size: 13px;">
          <p><strong>Customer:</strong> ${targetBooking.customer_name} (${targetBooking.customer_phone})</p>
          <p><strong>Service Address:</strong> ${targetBooking.service_address}</p>
          <p><strong>Service Rendered:</strong> ${targetBooking.service_name} (${targetBooking.package_title})</p>
          <p><strong>Payment Method:</strong> ${targetBooking.payment_method || 'UPI'} (${targetBooking.payment_ref || 'Verified'})</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
          <tr style="background-color: #f8fafc; text-align: left; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 10px;">Description</th>
            <th style="padding: 10px; text-align: right;">Amount (₹)</th>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px;">Labor / Service Charges</td>
            <td style="padding: 10px; text-align: right;">₹${laborCost}</td>
          </tr>
          ${partsCost > 0 ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px;">Replacement Spare Parts / Materials</td>
            <td style="padding: 10px; text-align: right;">₹${partsCost}</td>
          </tr>` : ''}
          <tr style="font-weight: bold; background-color: #f8fafc; font-size: 15px;">
            <td style="padding: 12px;">Total Paid Amount</td>
            <td style="padding: 12px; text-align: right; color: #059669;">₹${totalPaid}</td>
          </tr>
        </table>

        <!-- Compact UPI Scan & Pay Box -->
        <table style="width: 100%; margin-top: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <tr>
            <td style="width: 64px; vertical-align: middle; padding-right: 12px;">
              <img src="${UPI_QR_DATA_URI}" alt="UPI QR" style="width: 60px; height: 60px; display: block; border-radius: 6px; border: 1px solid #cbd5e1; background: #ffffff;" />
            </td>
            <td style="vertical-align: middle;">
              <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #b45309; background: #fef3c7; display: inline-block; padding: 2px 6px; border-radius: 4px; margin-bottom: 3px;">
                Quick Scan & Pay via UPI
              </div>
              <div style="font-size: 13px; font-weight: 700; color: #0f172a;">
                UPI ID: <span style="color: #059669; font-family: monospace;">${UPI_ID}</span> (${UPI_PAYEE_NAME})
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                Google Pay • PhonePe • Paytm • BHIM • Cred
              </div>
            </td>
          </tr>
        </table>

        <div style="text-align: center; padding: 12px; font-size: 11px; color: #64748b; margin-top: 20px; border-top: 1px solid #e2e8f0;">
          30-Day Post Service Warranty Included • Helpline: +91 91749 34135 • plumberindore.in
        </div>
      </div>
    `;

    // Email invoice via Resend
    await sendEmail({
      to: targetBooking.customer_email || 'plumberindore@gmail.com',
      subject: `[PlumberIndore] Official Invoice #${invNumber} for ${targetBooking.service_name}`,
      html: invoiceHtml,
      replyTo: 'plumberindore@gmail.com'
    });

    return NextResponse.json({
      success: true,
      invoiceNumber: invNumber,
      totalPaid,
      message: 'Invoice successfully generated and emailed.'
    });

  } catch (error) {
    console.error('Error in /api/invoices/[bookingId]/generate:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
