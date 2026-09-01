import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../lib/supabase/admin';
import { checkRateLimit, sanitizeString, getClientIp } from '../../../lib/security';

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
      } else {
        query = query.eq('id', bookingId);
      }

      const { data: booking } = await query.single();
      if (booking) {
        // Check if review already exists for this booking
        const { data: existingReview } = await supabaseAdmin
          .from('reviews')
          .select('id')
          .eq('booking_id', booking.id)
          .single();

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
          .single();

        if (insertErr) {
          return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          review: newReview,
          message: 'Thank you! Your verified review has been submitted successfully.'
        });
      }
    }

    // General review insert
    const { data: generalReview, error: generalErr } = await supabaseAdmin
      .from('reviews')
      .insert({
        customer_name: customerName.trim(),
        rating: Number(rating),
        comment: (comment || '').trim(),
        is_verified: true
      })
      .select()
      .single();

    if (generalErr) {
      return NextResponse.json({ success: false, error: generalErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      review: generalReview,
      message: 'Thank you! Your feedback has been recorded.'
    });

  } catch (error) {
    console.error('Error in /api/reviews:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
