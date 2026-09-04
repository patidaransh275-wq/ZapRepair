import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../../lib/supabase/admin.js';
import { sendEmail } from '../../../../../utils/resend.js';
import { UPI_ID, UPI_PAYEE_NAME, UPI_QR_DATA_URI } from '../../../../../lib/qrCode.js';
import { isValidUUID, checkRateLimit, getClientIp } from '../../../../../lib/security.js';

/**
 * POST /api/invoices/[bookingId]/generate
 * Generates an official tax invoice in Supabase and emails it via Resend.
 */
export async function POST(request, { params }) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`invoice_gen_${ip}`, 10, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many invoice generation requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    const { bookingId } = params || {};
    if (!bookingId) {
      return NextResponse.json({ success: false, error: 'Booking ID is required.' }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({
        success: false,
        error: 'Database connection is not available.'
      }, { status: 503 });
    }

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
    } else if (isValidUUID(bookingId)) {
      query = query.eq('id', bookingId);
    } else {
      return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
    }

    const { data: dbBooking, error: fetchErr } = await query.maybeSingle();
    if (fetchErr || !dbBooking) {
      return NextResponse.json({ success: false, error: 'Booking not found.' }, { status: 404 });
    }

    const targetBooking = dbBooking;
    const invNumber = `INV-2026-${targetBooking.booking_number || targetBooking.id}`;
    const laborCost = Number(targetBooking.subtotal || targetBooking.total_amount || 199);
    const partsCost = Number(targetBooking.parts_cost || 0);
    const taxAmount = 0;
    const totalPaid = laborCost + partsCost;

    // Upsert invoice in DB
    const { data: createdInv, error: invErr } = await supabaseAdmin
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
      .maybeSingle();

    if (invErr) {
      console.error('Invoice upsert error:', invErr.message);
    }

    if (createdInv) {
      // Insert invoice items
      await supabaseAdmin.from('invoice_items').insert([
        {
          invoice_id: createdInv.id,
          description: `${targetBooking.service_name} - ${targetBooking.package_title || 'Standard Service'}`,
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

    // Build Email Template
    const recipientEmail = targetBooking.customer_email && targetBooking.customer_email.includes('@')
      ? targetBooking.customer_email
      : 'plumberindore@gmail.com';

    const invoiceHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Official Paid Service Invoice</p>
        </div>
        <div style="padding: 24px 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 20px;">
            <div>
              <span style="background-color: #ecfdf5; color: #047857; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; border: 1px solid #a7f3d0; text-transform: uppercase;">
                ✓ PAID & VERIFIED
              </span>
              <p style="font-size: 15px; font-weight: 800; font-family: monospace; color: #0f172a; margin: 8px 0 0 0;">${invNumber}</p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 12px; color: #64748b; margin: 0;">Date: ${new Date().toISOString().split('T')[0]}</p>
              <p style="font-size: 12px; color: #64748b; margin: 4px 0 0 0;">Method: ${targetBooking.payment_method || 'UPI'}</p>
            </div>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f8fafc; border-radius: 12px; font-size: 13px;">
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; width: 35%;">Customer:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">${targetBooking.customer_name} (${targetBooking.customer_phone})</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Service Address:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${targetBooking.service_address}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Item / Work:</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${targetBooking.service_name} (${targetBooking.package_title || 'Service'})</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; color: #64748b;">Total Amount Paid:</td>
              <td style="padding: 10px 14px; font-weight: 800; font-size: 16px; color: #047857;">₹${totalPaid}</td>
            </tr>
          </table>
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 24px;">
            PlumberIndore Tech Services • Helpline: +91 91749 34135 • Indore, Madhya Pradesh
          </p>
        </div>
      </div>
    `;

    // Dispatch email
    const emailResult = await sendEmail({
      to: [recipientEmail, 'plumberindore@gmail.com'],
      subject: `[PlumberIndore Invoice] ${invNumber} - ₹${totalPaid} (${targetBooking.service_name})`,
      html: invoiceHtml,
      replyTo: 'plumberindore@gmail.com'
    });

    return NextResponse.json({
      success: true,
      invoiceNumber: invNumber,
      totalPaid,
      customerName: targetBooking.customer_name,
      emailSent: emailResult.success,
      emailRecipient: recipientEmail
    });

  } catch (error) {
    console.error('Error in /api/invoices/[bookingId]/generate:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
