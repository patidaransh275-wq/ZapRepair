import { NextResponse } from 'next/server';
import { sendEmail } from '../../../../utils/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      status = 'success', // 'success' | 'failed' | 'pending'
      booking,
      paymentMethod = 'UPI / Online',
      paymentRef,
      amount
    } = body || {};

    if (!booking || !booking.id) {
      return NextResponse.json(
        { success: false, error: 'Booking details required.' },
        { status: 400 }
      );
    }

    const customerEmail = booking.customerEmail || 'plumberindore@gmail.com';
    const customerName = booking.customerName || 'Valued Customer';
    const paidAmount = amount || booking.price || 499;
    const refCode = paymentRef || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    let emailSubject = '';
    let emailHtml = '';

    if (status === 'success') {
      emailSubject = `[PlumberIndore Payment Received] ₹${paidAmount} for Order #${booking.id}`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          </div>
          <div style="padding: 24px 16px;">
            <span style="background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; border: 1px solid #a7f3d0;">
              ✓ PAYMENT SUCCESSFUL (₹${paidAmount})
            </span>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">Payment Receipt & Verification</h2>
            <p style="font-size: 13px; color: #64748b;">Hello ${customerName}, your payment for <strong>${booking.serviceName}</strong> has been successfully received and verified.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0; background-color: #f8fafc; border-radius: 12px; font-size: 13px;">
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; width: 35%;">Order ID:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">#${booking.id}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Amount Paid:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 800; font-size: 16px; color: #059669;">₹${paidAmount}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Payment Method:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155;">${paymentMethod}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Transaction Ref:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-family: monospace; color: #0f172a;">${refCode}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: bold; color: #64748b;">Payment Date:</td>
                <td style="padding: 12px 16px; color: #334155;">${timestamp}</td>
              </tr>
            </table>

            <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 14px; margin-bottom: 20px; font-size: 12px; color: #065f46;">
              <strong>30-Day Warranty Active:</strong> Your doorstep repair is covered under our 30-day post service warranty. Re-inspection is 100% free for the same reported issue.
            </div>

            <div style="text-align: center;">
              <a href="https://www.plumberindore.in/bookings" style="background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 10px; display: inline-block;">
                Download Tax Invoice & Receipt →
              </a>
            </div>
          </div>
        </div>
      `;
    } else {
      emailSubject = `[PlumberIndore Payment Alert] Payment Pending/Failed for Order #${booking.id}`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          </div>
          <div style="padding: 24px 16px;">
            <span style="background-color: #fee2e2; color: #991b1b; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; border: 1px solid #fca5a5;">
              ✕ PAYMENT NOT COMPLETED
            </span>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">Payment Transaction Pending</h2>
            <p style="font-size: 13px; color: #64748b;">The payment transaction of ₹${paidAmount} for Order #${booking.id} was not completed. You can pay online or choose cash to technician after service.</p>
          </div>
        </div>
      `;
    }

    const result = await sendEmail({
      to: [customerEmail, 'plumberindore@gmail.com'],
      subject: emailSubject,
      html: emailHtml,
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
        message: `Payment notification (${status}) dispatched successfully.`,
        data: result.data 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/payment/notify route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
