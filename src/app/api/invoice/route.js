import { NextResponse } from 'next/server';
import { sendNotificationEmail } from '../../../utils/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      invoiceNumber,
      customerName,
      customerEmail,
      customerPhone,
      address,
      serviceName,
      packageTitle,
      laborCost = 0,
      partsCost = 0,
      taxCost = 0,
      discountCost = 0,
      totalPaid = 0,
      paymentMethod = 'UPI',
      paymentRef,
      date
    } = body || {};

    if (!invoiceNumber || !customerName || !totalPaid) {
      return NextResponse.json(
        { success: false, error: 'Invoice number, customer name, and total paid amount are required.' },
        { status: 400 }
      );
    }

    const issueDate = date || new Date().toISOString().split('T')[0];

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 24px; font-weight: 800; margin: 0; color: #0f172a;">Plumber<span style="color: #f59e0b;">Indore</span></h1>
            <p style="font-size: 12px; color: #64748b; margin: 4px 0 0 0;">PlumberIndore Tech Services Private Limited</p>
            <p style="font-size: 11px; color: #64748b; margin: 2px 0 0 0;">Indore, Madhya Pradesh • Helpline: +91 91749 34135</p>
          </div>
          <div style="text-align: right;">
            <span style="background-color: #ecfdf5; color: #047857; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; border: 1px solid #a7f3d0; text-transform: uppercase;">
              PAID SERVICE INVOICE
            </span>
            <p style="font-size: 14px; font-weight: 700; font-family: monospace; color: #0f172a; margin: 8px 0 0 0;">${invoiceNumber}</p>
            <p style="font-size: 11px; color: #64748b; margin: 2px 0 0 0;">Date: ${issueDate}</p>
          </div>
        </div>

        <!-- Customer & Service Overview -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #f8fafc; border-radius: 12px; overflow: hidden; font-size: 12px;">
          <tr>
            <td style="padding: 16px; width: 50%; vertical-align: top; border-right: 1px solid #e2e8f0;">
              <strong style="color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Billed To:</strong>
              <div style="font-size: 14px; font-weight: 700; color: #0f172a;">${customerName}</div>
              <div style="color: #475569; margin-top: 2px;">${customerPhone || '+91 91749 34135'}</div>
              <div style="color: #475569; margin-top: 2px;">${address || 'Indore, MP'}</div>
            </td>
            <td style="padding: 16px; width: 50%; vertical-align: top;">
              <strong style="color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Payment Summary:</strong>
              <div style="font-size: 13px; font-weight: 700; color: #047857;">● Payment Verified</div>
              <div style="color: #475569; margin-top: 2px;">Method: <strong>${paymentMethod}</strong></div>
              <div style="color: #64748b; font-size: 11px; margin-top: 2px;">Ref: ${paymentRef || 'TXN-' + Math.floor(100000 + Math.random() * 900000)}</div>
            </td>
          </tr>
        </table>

        <!-- Itemized Table -->
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
          <thead>
            <tr style="border-bottom: 2px solid #e2e8f0; color: #475569; font-size: 11px; text-transform: uppercase; text-align: left;">
              <th style="padding: 10px 8px;">Service Item & Description</th>
              <th style="padding: 10px 8px; text-align: center;">Qty</th>
              <th style="padding: 10px 8px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px;">
                <div style="font-weight: 700; color: #0f172a;">${serviceName} - ${packageTitle}</div>
                <div style="font-size: 11px; color: #64748b; margin-top: 2px;">45-min doorstep visit, diagnostic check & verified labor work</div>
              </td>
              <td style="padding: 12px 8px; text-align: center;">1</td>
              <td style="padding: 12px 8px; text-align: right; font-weight: 600;">₹${totalPaid}</td>
            </tr>
            ${partsCost > 0 ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px;">
                <div style="font-weight: 700; color: #0f172a;">Original Spare Parts / Materials</div>
                <div style="font-size: 11px; color: #64748b; margin-top: 2px;">OEM certified replacement components with warranty</div>
              </td>
              <td style="padding: 12px 8px; text-align: center;">1</td>
              <td style="padding: 12px 8px; text-align: right; font-weight: 600;">₹${partsCost}</td>
            </tr>` : ''}
            ${discountCost > 0 ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; color: #059669;">
                <div style="font-weight: 700;">Promotional / First-Order Discount</div>
              </td>
              <td style="padding: 12px 8px; text-align: center; color: #059669;">-</td>
              <td style="padding: 12px 8px; text-align: right; font-weight: 700; color: #059669;">-₹${discountCost}</td>
            </tr>` : ''}
          </tbody>
        </table>

        <!-- Total Calculation Box -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
          <div style="width: 260px; background-color: #0f172a; color: #ffffff; padding: 16px; border-radius: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; color: #94a3b8;">
              <span>Total Amount:</span>
              <span>₹${totalPaid}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; border-top: 1px solid #334155; padding-top: 8px; color: #fbbf24;">
              <span>Amount Paid:</span>
              <span>₹${totalPaid}</span>
            </div>
          </div>
        </div>

        <!-- Compact UPI Scan & Pay Box -->
        <table style="width: 100%; margin-bottom: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <tr>
            <td style="width: 64px; vertical-align: middle; padding-right: 12px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3D9174934135%40yescred%26pn%3Dsarthak%20patidar" alt="UPI QR" style="width: 60px; height: 60px; display: block; border-radius: 6px; border: 1px solid #cbd5e1; background: #ffffff;" />
            </td>
            <td style="vertical-align: middle;">
              <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #b45309; background: #fef3c7; display: inline-block; padding: 2px 6px; border-radius: 4px; margin-bottom: 3px;">
                Quick Scan & Pay via UPI
              </div>
              <div style="font-size: 13px; font-weight: 700; color: #0f172a;">
                UPI ID: <span style="color: #059669; font-family: monospace;">9174934135@yescred</span> (sarthak patidar)
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                Google Pay • PhonePe • Paytm • BHIM • Cred
              </div>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; font-size: 11px; color: #475569; text-align: center; line-height: 1.5;">
          This is a computer-generated tax invoice issued by PlumberIndore Tech Services.<br />
          For doorstep re-inspection or 24x7 customer support, call <strong>+91 91749 34135</strong> or email <strong>plumberindore@gmail.com</strong>.
        </div>
      </div>
    `;

    const recipient = customerEmail || 'plumberindore@gmail.com';

    // 1. Persist in Supabase PostgreSQL
    try {
      const { getAdminClient } = await import('../../../lib/supabase/admin');
      const supabaseAdmin = getAdminClient();
      if (supabaseAdmin) {
        // Find booking if exists
        const bookingNum = invoiceNumber.replace('INV-2026-', '').replace('INV-', '');
        const { data: bData } = await supabaseAdmin.from('bookings').select('id').or(`booking_number.eq.${bookingNum},id.eq.${bookingNum}`).maybeSingle();

        const { data: invRecord, error: invErr } = await supabaseAdmin.from('invoices').insert({
          booking_id: bData ? bData.id : null,
          invoice_number: invoiceNumber,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone || '+91 91749 34135',
          billing_address: address || 'Indore, MP',
          labor_cost: Number(laborCost || totalPaid),
          parts_cost: Number(partsCost || 0),
          tax_amount: Number(taxCost || 0),
          discount_amount: Number(discountCost || 0),
          total_paid: Number(totalPaid),
          payment_method: paymentMethod || 'Cash / UPI Verified',
          payment_ref: paymentRef || `TXN-${invoiceNumber}`,
          sent_at: new Date().toISOString()
        }).select().single();

        if (invRecord) {
          await supabaseAdmin.from('invoice_items').insert({
            invoice_id: invRecord.id,
            description: `${serviceName} - ${packageTitle || 'Service Package'}`,
            quantity: 1,
            unit_price: Number(totalPaid),
            amount: Number(totalPaid)
          });
        }

        if (bData) {
          await supabaseAdmin.from('bookings').update({
            payment_status: 'Paid',
            status: 'Payment Verified & Completed'
          }).eq('id', bData.id);
        }
      }
    } catch (dbEx) {
      console.warn('Supabase invoice save exception (continuing email dispatch):', dbEx.message);
    }

    // 2. Dispatch Email via Resend
    const { sendEmail } = await import('../../../utils/resend');
    const result = await sendEmail({
      to: [recipient, 'plumberindore@gmail.com'],
      subject: `[PlumberIndore Tax Invoice] ${invoiceNumber} - ₹${totalPaid} (${serviceName})`,
      html: htmlContent,
      replyTo: 'plumberindore@gmail.com'
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Invoice ${invoiceNumber} successfully emailed to ${recipient}!`,
        data: result.data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending invoice email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
