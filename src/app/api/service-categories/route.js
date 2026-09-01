import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/service-categories
 * Returns active service categories catalog.
 */
export async function GET() {
  try {
    const supabaseAdmin = getAdminClient();
    if (supabaseAdmin) {
      const { data: categories, error } = await supabaseAdmin
        .from('service_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && categories && categories.length > 0) {
        return NextResponse.json({
          success: true,
          source: 'database',
          categories
        });
      }
    }

    // Default static categories
    const defaultCategories = [
      { slug: 'plumber', name: 'Plumbing Services', starting_price: 149 },
      { slug: 'electrician', name: 'Electrician Services', starting_price: 149 },
      { slug: 'ac-repair', name: 'AC Repair & Service', starting_price: 399 },
      { slug: 'refrigerator', name: 'Refrigerator Repair', starting_price: 299 },
      { slug: 'washing-machine', name: 'Washing Machine Repair', starting_price: 299 },
      { slug: 'ro-water-purifier', name: 'RO Water Purifier Repair', starting_price: 249 },
      { slug: 'geyser-water-heater', name: 'Geyser & Water Heater', starting_price: 249 },
      { slug: 'pest-control', name: 'Pest Control Services', starting_price: 499 },
      { slug: 'carpenter-paint', name: 'Carpenter & Painting', starting_price: 199 }
    ];

    return NextResponse.json({
      success: true,
      source: 'static_fallback',
      categories: defaultCategories
    });
  } catch (error) {
    console.error('Error in /api/service-categories:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
