import { NextResponse } from 'next/server';
import { sendEmail } from '../../../../utils/resend.js';
import { checkRateLimit, getClientIp } from '../../../../lib/security.js';

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`booking_notify_${ip}`, 15, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many notification requests. Please wait a minute.' },
        { status: 429 }
      );
    }
    const body = await request.json();
    const { 
      action = 'create', // 'create' | 'reschedule' | 'cancel' | 'complete' | 'claim'
      booking,
      newDate,
      newTimeSlot,
      claimReason,
      claimDescription
    } = body || {};

    if (!booking || !booking.id) {
      return NextResponse.json(
        { success: false, error: 'Booking data with valid ID is required.' },
        { status: 400 }
      );
    }

    const customerEmail = booking.customerEmail || 'plumberindore@gmail.com';
    const customerName = booking.customerName || 'Valued Customer';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    let emailSubject = '';
    let emailHtml = '';

    if (action === 'create') {
      emailSubject = `[PlumberIndore Booking Confirmed] #${booking.id} - ${booking.serviceName}`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          
          <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Doorstep Plumbing & Appliance Repair Services</p>
          </div>

          <div style="padding: 24px 16px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; border: 1px solid #a7f3d0;">
                ✓ BOOKING CONFIRMED (#${booking.id})
              </span>
              <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">Doorstep Technician Assigned!</h2>
              <p style="font-size: 13px; color: #64748b; margin: 0;">Hello ${customerName}, your doorstep service request has been confirmed.</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f8fafc; border-radius: 12px; font-size: 13px;">
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; width: 35%;">Service(s) Booked:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">
                  ${booking.services && booking.services.length > 0
                    ? booking.services.map(s => `<div>• ${s.serviceName} - <em>${s.packageTitle}</em> (₹${s.price})</div>`).join('')
                    : `${booking.serviceName} (${booking.packageTitle || 'Standard Repair'})`}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Scheduled Slot:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #d97706;">${booking.date}, ${booking.timeSlot}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Service Address:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155;">${booking.address} (Pincode: ${booking.pincode})</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Total Payable:</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 800; font-size: 15px; color: #059669;">₹${booking.price}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: bold; color: #64748b;">Assigned Pro:</td>
                <td style="padding: 12px 16px; color: #334155;">${booking.technician?.title || 'Verified Doorstep Specialist'} (Helpline: +91 91749 34135)</td>
              </tr>
            </table>

            <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 10px; padding: 14px; margin-bottom: 20px; font-size: 12px; color: #92400e;">
              <strong>Doorstep Service Protocol:</strong> Our technician carries verified digital ID, company tools, and sanitized gear. Pay via Cash or UPI QR only after inspecting completed repair work.
            </div>

            <div style="text-align: center;">
              <a href="https://www.plumberindore.in/bookings" style="background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 10px; display: inline-block;">
                Track Live GPS & Manage Booking →
              </a>
            </div>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
            PlumberIndore Tech Services Private Limited • 24x7 Helpline: +91 91749 34135<br/>
            Official Domain: plumberindore.in
          </div>
        </div>
      `;
    } else if (action === 'reschedule') {
      emailSubject = `[PlumberIndore Rescheduled] #${booking.id} - New Slot: ${newDate}, ${newTimeSlot}`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          </div>
          <div style="padding: 24px 16px;">
            <span style="background-color: #fef3c7; color: #b45309; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; border: 1px solid #fde68a;">
              ● BOOKING RESCHEDULED (#${booking.id})
            </span>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">Appointment Slot Updated</h2>
            <p style="font-size: 13px; color: #64748b;">Your booking for <strong>${booking.serviceName}</strong> has been successfully moved to:</p>
            
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 16px 0; font-size: 14px;">
              <div><strong>New Date:</strong> ${newDate}</div>
              <div style="margin-top: 4px;"><strong>New Time Slot:</strong> ${newTimeSlot}</div>
              <div style="margin-top: 4px;"><strong>Location:</strong> ${booking.address}</div>
            </div>
            
            <p style="font-size: 12px; color: #64748b;">Our assigned technician will arrive at the newly scheduled time. For changes, call +91 91749 34135.</p>
          </div>
        </div>
      `;
    } else if (action === 'cancel') {
      emailSubject = `[PlumberIndore Cancelled] Booking #${booking.id} has been cancelled`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          </div>
          <div style="padding: 24px 16px;">
            <span style="background-color: #fee2e2; color: #991b1b; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; border: 1px solid #fca5a5;">
              ✕ BOOKING CANCELLED (#${booking.id})
            </span>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">Service Booking Cancelled</h2>
            <p style="font-size: 13px; color: #64748b;">Booking #${booking.id} for <strong>${booking.serviceName}</strong> has been cancelled as requested.</p>
            <p style="font-size: 12px; color: #64748b;">If you need to book a new appointment, visit <a href="https://www.plumberindore.in">plumberindore.in</a> or call +91 91749 34135.</p>
          </div>
        </div>
      `;
    } else if (action === 'claim') {
      emailSubject = `[PlumberIndore Warranty Claim] Booking #${booking.id} - ${claimReason || 'Re-inspection'}`;
      emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          </div>
          <div style="padding: 24px 16px;">
            <span style="background-color: #fef3c7; color: #b45309; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; border: 1px solid #fde68a;">
              🛡️ WARRANTY CLAIM FILED (#${booking.id})
            </span>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">30-Day Warranty Re-inspection Request</h2>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 16px 0; font-size: 13px;">
              <div><strong>Customer:</strong> ${customerName} (${booking.customerPhone})</div>
              <div style="margin-top: 4px;"><strong>Service:</strong> ${booking.serviceName}</div>
              <div style="margin-top: 4px;"><strong>Claim Reason:</strong> ${claimReason || 'Re-inspection'}</div>
              <div style="margin-top: 4px;"><strong>Description:</strong> ${claimDescription || 'No description provided'}</div>
              <div style="margin-top: 4px;"><strong>Filed At:</strong> ${timestamp}</div>
            </div>
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
        message: `Notification for action "${action}" sent via Resend.`,
        data: result.data 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/booking/notify route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
