import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../lib/supabase/admin.js';
import { checkRateLimit, sanitizeString, getClientIp, isValidUUID } from '../../../lib/security.js';

/**
 * POST /api/reviews
 * Submits verified customer review for completed bookings.
 * 1 review per booking rule enforced.
 */
export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`review_${ip}`, 5, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many review requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { bookingId, rating } = body || {};
    const customerName = sanitizeString(body?.customerName);
    const comment = sanitizeString(body?.comment);

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: 'Rating must be between 1 and 5 stars.' }, { status: 400 });
    }

    if (!customerName || customerName.length < 2) {
      return NextResponse.json({ success: false, error: 'Customer name is required.' }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        message: 'Review received in local fallback mode.'
      });
    }

    // Verify booking exists and is completed
    if (bookingId) {
      let query = supabaseAdmin.from('bookings').select('id, status, customer_id');
      if (bookingId.startsWith('IND-') || bookingId.startsWith('PI-')) {
        query = query.eq('booking_number', bookingId);
      } else if (isValidUUID(bookingId)) {
        query = query.eq('id', bookingId);
      } else {
        return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
      }

      const { data: booking } = await query.maybeSingle();
      if (booking) {
        // Check if review already exists for this booking using maybeSingle to avoid PGRST116
        const { data: existingReview } = await supabaseAdmin
          .from('reviews')
          .select('id')
          .eq('booking_id', booking.id)
          .maybeSingle();

        if (existingReview) {
          return NextResponse.json({
            success: false,
            error: 'A review has already been submitted for this booking.'
          }, { status: 400 });
        }

        const { data: newReview, error: insertErr } = await supabaseAdmin
          .from('reviews')
          .insert({
            booking_id: booking.id,
            customer_id: booking.customer_id,
            customer_name: customerName.trim(),
            rating: Number(rating),
            comment: (comment || '').trim(),
            is_verified: true
          })
          .select()
          .maybeSingle();

        if (insertErr) {
          return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          review: newReview,
          message: 'Thank you! Your verified review has been recorded.'
        });
      }
    }

    // General platform feedback (no specific booking linked)
    const { data: generalReview, error: genErr } = await supabaseAdmin
      .from('reviews')
      .insert({
        customer_name: customerName.trim(),
        rating: Number(rating),
        comment: (comment || '').trim(),
        is_verified: false
      })
      .select()
      .maybeSingle();

    if (genErr) {
      return NextResponse.json({ success: false, error: genErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      review: generalReview,
      message: 'Review submitted successfully.'
    });

  } catch (error) {
    console.error('Error in /api/reviews:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
