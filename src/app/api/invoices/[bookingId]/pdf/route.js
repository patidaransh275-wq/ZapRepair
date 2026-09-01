import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin';

/**
 * GET /api/invoices/[bookingId]/pdf
 * Generates and returns printable PDF/HTML invoice representation with PlumberIndore branding.
 */
export async function GET(request, { params }) {
  try {
    const { bookingId } = params;
    const supabaseAdmin = getAdminClient();

    let inv = {
      invoice_number: `INV-2026-${bookingId}`,
      booking_number: bookingId,
      customer_name: 'Customer',
      customer_phone: '+91 91749 34135',
      billing_address: 'Indore, Madhya Pradesh',
      service_name: 'Home Repair Service',
      package_title: 'Standard Diagnostics',
      labor_cost: 199,
      parts_cost: 0,
      total_paid: 199,
      payment_method: 'Cash / UPI Verified',
      payment_ref: 'VERIFIED',
      issued_at: new Date().toLocaleDateString('en-IN')
    };

    if (supabaseAdmin) {
      let bQuery = supabaseAdmin
        .from('bookings')
        .select(`
          booking_number,
          customer_name,
          customer_phone,
          service_address,
          service_name,
          package_title,
          total_amount,
          subtotal,
          parts_cost,
          payment_method,
          payment_ref,
          invoices (
            invoice_number,
            issued_at,
            total_paid
          )
        `);

      if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
        bQuery = bQuery.eq('booking_number', bookingId);
      } else {
        bQuery = bQuery.eq('id', bookingId);
      }

      const { data: bData } = await bQuery.single();
      if (bData) {
        inv = {
          invoice_number: bData.invoices?.[0]?.invoice_number || `INV-2026-${bData.booking_number}`,
          booking_number: bData.booking_number,
          customer_name: bData.customer_name,
          customer_phone: bData.customer_phone,
          billing_address: bData.service_address,
          service_name: bData.service_name,
          package_title: bData.package_title,
          labor_cost: Number(bData.subtotal || bData.total_amount),
          parts_cost: Number(bData.parts_cost || 0),
          total_paid: Number(bData.total_amount),
          payment_method: bData.payment_method,
          payment_ref: bData.payment_ref,
          issued_at: bData.invoices?.[0]?.issued_at ? new Date(bData.invoices[0].issued_at).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN')
        };
      }
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice - ${inv.invoice_number}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0f172a; max-width: 750px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
          .logo { font-size: 26px; font-weight: 800; color: #0f172a; }
          .logo span { color: #2563eb; }
          .badge { background: #ecfdf5; color: #059669; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 13px; border: 1px solid #a7f3d0; }
          .details { margin: 30px 0; font-size: 14px; line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #f8fafc; padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; font-size: 13px; }
          td { padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .total-row td { font-weight: bold; font-size: 16px; background: #f8fafc; color: #059669; }
          .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">Plumber<span>Indore</span></div>
            <div style="color: #64748b; font-size: 13px; margin-top: 4px;">Indore's #1 Doorstep Home Services</div>
          </div>
          <div style="text-align: right;">
            <span class="badge">PAID TAX INVOICE</span>
            <div style="margin-top: 8px; font-weight: bold;">${inv.invoice_number}</div>
            <div style="font-size: 12px; color: #64748b;">Date: ${inv.issued_at}</div>
          </div>
        </div>

        <div class="details">
          <strong>Billed To:</strong><br>
          ${inv.customer_name}<br>
          Phone: ${inv.customer_phone}<br>
          Address: ${inv.billing_address}<br>
          Booking Ref: <strong>${inv.booking_number}</strong>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th style="text-align: right;">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${inv.service_name} (${inv.package_title})</td>
              <td style="text-align: right;">₹${inv.labor_cost}</td>
            </tr>
            ${inv.parts_cost > 0 ? `
            <tr>
              <td>Replacement Parts / Consumables</td>
              <td style="text-align: right;">₹${inv.parts_cost}</td>
            </tr>` : ''}
            <tr class="total-row">
              <td>Total Paid</td>
              <td style="text-align: right;">₹${inv.total_paid}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 25px; font-size: 13px; color: #475569;">
          <strong>Payment Method:</strong> ${inv.payment_method || 'UPI / Doorstep Verified'}<br>
          <strong>Transaction Ref:</strong> ${inv.payment_ref || 'CONFIRMED'}
        </div>

        <!-- Compact Quick Scan & Pay UPI Box -->
        <div style="margin-top: 20px; padding: 12px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 64px; height: 64px; background: #ffffff; padding: 4px; border: 1px solid #cbd5e1; border-radius: 8px; flex-shrink: 0; text-align: center;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3D9174934135%40yescred%26pn%3Dsarthak%20patidar" alt="UPI QR" style="width: 100%; height: 100%; object-fit: contain;" />
            </div>
            <div>
              <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #b45309; background: #fef3c7; display: inline-block; padding: 2px 6px; border-radius: 4px; margin-bottom: 3px;">
                Quick Scan & Pay
              </div>
              <div style="font-size: 13px; font-weight: 700; color: #0f172a;">
                UPI ID: <span style="color: #059669; font-family: monospace;">9174934135@yescred</span> (sarthak patidar)
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                Accepts Google Pay, PhonePe, Paytm, BHIM, Cred & Mobile Banking
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          Verified Service Guarantee: 30-Day Post Service Warranty Included.<br>
          Helpline: +91 91749 34135 • Website: https://www.plumberindore.in
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });

  } catch (error) {
    console.error('Error in /api/invoices/[bookingId]/pdf:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
