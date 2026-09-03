import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../lib/supabase/admin';
import { calculateServerPrice } from '../../../lib/pricing';
import { sendEmail } from '../../../utils/resend';

/**
 * GET /api/bookings
 * Retrieves bookings from Supabase PostgreSQL.
 * Filters by customerPhone, customerEmail, status, or booking_number if provided.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');
    const status = searchParams.get('status');
    const bookingNumber = searchParams.get('bookingNumber');

    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      // Graceful fallback if Supabase env is not configured yet
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        bookings: []
      });
    }

    let query = supabaseAdmin
      .from('bookings')
      .select(`
        *,
        items:booking_items(*),
        invoices(*),
        payments(*)
      `)
      .order('created_at', { ascending: false });

    if (bookingNumber) {
      query = query.eq('booking_number', bookingNumber);
    }
    if (phone) {
      query = query.eq('customer_phone', phone);
    }
    if (email) {
      query = query.eq('customer_email', email);
    }
    if (status && status !== 'ALL') {
      if (status === 'PAID') {
        query = query.eq('payment_status', 'Paid');
      } else if (status === 'PENDING') {
        query = query.neq('payment_status', 'Paid');
      } else {
        query = query.eq('status', status);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase fetch bookings error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      source: 'supabase',
      bookings: data || []
    });

  } catch (err) {
    console.error('Server error in GET /api/bookings:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * POST /api/bookings
 * Creates a new doorstep booking record in Supabase.
 * Strictly calculates and validates prices server-side.
 */
import { checkRateLimit, sanitizeString, validateIndianPhone, validateEmail, validatePincode, getClientIp } from '../../../lib/security';

export async function POST(request) {
  try {
    // 1. Rate Limiting (Max 10 bookings per minute per IP)
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`booking_${ip}`, 10, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many booking attempts. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const rawName = body?.name;
    const rawPhone = body?.phone;
    const rawEmail = body?.email;
    const rawAddress = body?.address;
    const rawPincode = body?.pincode;
    const rawDate = body?.date;
    const rawTimeSlot = body?.timeSlot;
    const services = Array.isArray(body?.services) ? body.services : [];
    const description = sanitizeString(body?.description);
    const serviceId = sanitizeString(body?.serviceId);
    const serviceName = sanitizeString(body?.serviceName);
    const packageTitle = sanitizeString(body?.packageTitle);

    const name = sanitizeString(rawName);
    const address = sanitizeString(rawAddress);
    const cleanedPhone = validateIndianPhone(rawPhone);
    const email = validateEmail(rawEmail);
    const pincode = validatePincode(rawPincode);

    // 1. Mandatory field validations
    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: 'Full name is required.' }, { status: 400 });
    }

    if (!cleanedPhone) {
      return NextResponse.json({ success: false, error: 'A valid 10-digit Indian mobile number is required.' }, { status: 400 });
    }

    if (!address || address.length < 5) {
      return NextResponse.json({ success: false, error: 'Doorstep service address is required (min 5 characters).' }, { status: 400 });
    }

    // 2. Server-side price calculation
    const requestedServices = services.length > 0 ? services : [{
      serviceId: serviceId || 'plumbing',
      serviceName: serviceName || 'Plumbing',
      packageTitle: packageTitle || 'Standard Inspection & Diagnostics',
      quantity: 1
    }];

    const pricing = calculateServerPrice(requestedServices);
    const totalAmount = pricing.totalAmount;
    const subtotal = pricing.subtotal;
    const validatedItems = pricing.validatedItems;

    const randomBookingNumber = `IND-${Math.floor(10000 + Math.random() * 90000)}`;
    const scheduledDate = date || new Date().toISOString().split('T')[0];
    const slot = timeSlot || '2:00 PM - 4:00 PM';
    const primaryServiceName = validatedItems.map(i => i.serviceName).filter((v, i, a) => a.indexOf(v) === i).join(' + ');
    const primaryPackageTitle = validatedItems.map(i => i.packageTitle).join(' | ');

    const supabaseAdmin = getAdminClient();

    let createdBookingRecord = {
      id: randomBookingNumber,
      booking_number: randomBookingNumber,
      customer_name: name.trim(),
      customer_phone: cleanedPhone,
      customer_email: (email || '').trim() || 'plumberindore@gmail.com',
      service_address: address.trim(),
      pincode: pincode || '452010',
      scheduled_date: scheduledDate,
      time_slot: slot,
      service_name: primaryServiceName,
      package_title: primaryPackageTitle,
      status: 'Technician Assigned',
      payment_status: 'Pending (Pay on Completion)',
      payment_method: 'Cash / UPI on Doorstep',
      subtotal: subtotal,
      parts_cost: 0,
      total_amount: totalAmount,
      price: totalAmount,
      notes: description || '',
      created_at: new Date().toISOString()
    };

    // 3. Insert into Supabase with strict validation
    if (supabaseAdmin) {
      try {
        // Insert main booking record
        const { data: dbBooking, error: bookingErr } = await supabaseAdmin
          .from('bookings')
          .insert({
            booking_number: randomBookingNumber,
            customer_name: name.trim(),
            customer_phone: cleanedPhone,
            customer_email: (email || '').trim() || null,
            service_address: address.trim(),
            pincode: pincode || '452010',
            scheduled_date: scheduledDate,
            time_slot: slot,
            service_name: primaryServiceName,
            package_title: primaryPackageTitle,
            status: 'Technician Assigned',
            payment_status: 'Pending (Pay on Completion)',
            payment_method: 'Cash / UPI on Doorstep',
            subtotal: subtotal,
            parts_cost: 0,
            total_amount: totalAmount,
            notes: description || ''
          })
          .select()
          .single();

        if (bookingErr) {
          console.error('Supabase booking insert error:', bookingErr.message);
          return NextResponse.json({
            success: false,
            error: `Failed to record booking in database: ${bookingErr.message}`
          }, { status: 500 });
        }

        if (dbBooking) {
          createdBookingRecord = {
            ...dbBooking,
            id: dbBooking.booking_number || dbBooking.id,
            price: Number(dbBooking.total_amount || dbBooking.price || totalAmount),
            customerName: dbBooking.customer_name,
            customerPhone: dbBooking.customer_phone,
            customerEmail: dbBooking.customer_email,
            serviceName: dbBooking.service_name,
            packageTitle: dbBooking.package_title,
            address: dbBooking.service_address,
            date: dbBooking.scheduled_date,
            timeSlot: dbBooking.time_slot,
            paymentStatus: dbBooking.payment_status,
            paymentMethod: dbBooking.payment_method
          };

          // Insert itemized booking records
          if (validatedItems.length > 0) {
            const itemsToInsert = validatedItems.map(item => ({
              booking_id: dbBooking.id,
              service_name: item.serviceName,
              package_title: item.packageTitle,
              unit_price: item.unitPrice,
              quantity: item.quantity,
              total_price: item.totalPrice
            }));

            const { error: itemsErr } = await supabaseAdmin.from('booking_items').insert(itemsToInsert);
            if (itemsErr) {
              console.warn('Booking items line insert notice:', itemsErr.message);
            }
          }
        }
      } catch (dbEx) {
        console.error('Supabase booking transaction exception:', dbEx.message);
        return NextResponse.json({
          success: false,
          error: `Database connection error: ${dbEx.message}`
        }, { status: 500 });
      }
    }

    // 4. Send Dedicated Admin & Customer Emails via Resend (Awaited)
    const bookingNo = createdBookingRecord.booking_number || randomBookingNumber;
    const recipientEmail = (email && email.includes('@')) ? email.trim() : null;

    // Admin Dispatch HTML
    const adminEmailSubject = `[🚨 NEW BOOKING] #${bookingNo} - ${primaryServiceName} (${name} | ${cleanedPhone})`;
    const adminEmailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">New Doorstep Booking Alert</p>
        </div>
        <div style="padding: 24px 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="background-color: #fef3c7; color: #b45309; font-size: 13px; font-weight: 800; padding: 6px 16px; border-radius: 9999px; border: 1px solid #fde68a;">
              ⚡ NEW ORDER #${bookingNo}
            </span>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">₹${totalAmount} • ${primaryServiceName}</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f8fafc; border-radius: 12px; font-size: 13px;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; width: 35%;">Customer Name:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Customer Phone:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0284c7;">
                <a href="tel:${cleanedPhone}" style="color: #0284c7; text-decoration: none;">${cleanedPhone} (Click to Call)</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Customer Email:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Service Booked:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">${primaryServiceName} (${primaryPackageTitle})</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Scheduled Slot:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #d97706;">${scheduledDate}, ${slot}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Service Address:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${address} (Pincode: ${pincode || '452010'})</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Issue Notes:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${description || 'Standard doorstep appointment'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: bold; color: #64748b;">Total Price:</td>
              <td style="padding: 12px 16px; font-weight: 800; font-size: 16px; color: #059669;">₹${totalAmount} <span style="font-size: 11px; font-weight: normal; color: #64748b;">(Cash / UPI on Doorstep)</span></td>
            </tr>
          </table>
          <div style="text-align: center; margin-top: 16px;">
            <a href="https://www.plumberindore.in/admin/bookings" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block;">
              Open Admin Dispatch Console →
            </a>
          </div>
        </div>
      </div>
    `;

    // Customer Confirmation HTML
    const customerEmailSubject = `[PlumberIndore Booking Confirmed] #${bookingNo} - ${primaryServiceName}`;
    const customerEmailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fbbf24; margin: 0; font-size: 22px; font-weight: 800;">Plumber<span style="color: #ffffff;">Indore</span></h1>
          <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Doorstep Plumbing & Home Services</p>
        </div>
        <div style="padding: 24px 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; border: 1px solid #a7f3d0;">
              ✓ BOOKING CONFIRMED (#${bookingNo})
            </span>
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 4px 0;">Doorstep Technician Assigned!</h2>
            <p style="font-size: 13px; color: #64748b; margin: 0;">Hello ${name}, your doorstep appointment has been confirmed.</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #f8fafc; border-radius: 12px; font-size: 13px;">
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b; width: 35%;">Service(s):</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">${primaryServiceName} (${primaryPackageTitle})</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Scheduled Slot:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #d97706;">${scheduledDate}, ${slot}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #64748b;">Doorstep Address:</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${address} (${pincode || 'Indore'})</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: bold; color: #64748b;">Total Amount Due:</td>
              <td style="padding: 12px 16px; font-weight: 800; font-size: 16px; color: #059669;">₹${totalAmount} <span style="font-size: 11px; font-weight: normal; color: #64748b;">(Pay on Doorstep Completion)</span></td>
            </tr>
          </table>
          <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 12px; padding: 14px; text-align: center; font-size: 12px; color: #92400e;">
            <strong>Doorstep Guarantee:</strong> 45-Min Arrival • Transparent Fixed Rates • 30-Day Service Warranty
          </div>
        </div>
      </div>
    `;

    let adminEmailResult = null;
    let customerEmailResult = null;

    try {
      // 1. Send dedicated Admin Alert to plumberindore@gmail.com
      adminEmailResult = await sendEmail({
        to: 'plumberindore@gmail.com',
        subject: adminEmailSubject,
        html: adminEmailHtml,
        replyTo: recipientEmail || 'plumberindore@gmail.com'
      });

      // 2. If customer provided email and it is not plumberindore@gmail.com, send Customer Confirmation
      if (recipientEmail && recipientEmail.toLowerCase() !== 'plumberindore@gmail.com') {
        customerEmailResult = await sendEmail({
          to: recipientEmail,
          subject: customerEmailSubject,
          html: customerEmailHtml,
          replyTo: 'plumberindore@gmail.com'
        });
      }
    } catch (emailErr) {
      console.error('Email dispatch error in POST /api/bookings:', emailErr);
    }

    return NextResponse.json({
      success: true,
      booking: createdBookingRecord,
      validatedPricing: pricing,
      emailDispatch: {
        adminAlert: adminEmailResult,
        customerConfirmation: customerEmailResult
      },
      message: 'Booking created successfully with verified server pricing.'
    });

  } catch (err) {
    console.error('Server error in POST /api/bookings:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
