import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';

/**
 * GET /api/admin/reviews — Lists all reviews with verification status
 * PATCH /api/admin/reviews — Toggles verification/moderation status
 */
export async function GET() {
  try {
    const supabaseAdmin = getAdminClient();

    if (!supabaseAdmin) {
      return NextResponse.json({
        success: true,
        source: 'local_fallback',
        reviews: [
          {
            id: 'rev_1',
            customerName: 'Anand Verma',
            rating: 5,
            comment: 'Plumber arrived in 35 mins at Vijay Nagar and fixed mixer tap with 30 days warranty.',
            isVerified: true,
            createdAt: '2026-08-30'
          }
        ]
      });
    }

    const { data: reviews = [], error } = await supabaseAdmin
      .from('reviews')
      .select(`
        id,
        customer_name,
        rating,
        comment,
        is_verified,
        created_at,
        bookings (
          booking_number,
          service_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      reviews: reviews.map(r => ({
        id: r.id,
        customerName: r.customer_name,
        rating: r.rating,
        comment: r.comment,
        isVerified: r.is_verified,
        bookingNumber: r.bookings?.booking_number || 'N/A',
        serviceName: r.bookings?.service_name || 'Service',
        createdAt: r.created_at
      }))
    });
  } catch (error) {
    console.error('Error in GET /api/admin/reviews:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, isVerified } = body;

    const supabaseAdmin = getAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: true, message: 'Updated in fallback mode.' });
    }

    const { data: updated, error } = await supabaseAdmin
      .from('reviews')
      .update({ is_verified: !!isVerified })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      review: updated,
      message: 'Review verification status updated.'
    });
  } catch (error) {
    console.error('Error in PATCH /api/admin/reviews:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
