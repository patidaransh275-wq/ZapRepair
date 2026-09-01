import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../lib/supabase/admin';
import { SERVICES_DATA } from '../../../data/servicesData';

export const dynamic = 'force-dynamic';

/**
 * GET /api/services
 * Queries active services from Supabase, falling back to static servicesData if DB not connected.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');

    const supabaseAdmin = getAdminClient();
    if (supabaseAdmin) {
      let query = supabaseAdmin
        .from('services')
        .select(`
          id,
          slug,
          name,
          package_title,
          price,
          duration,
          warranty_days,
          description,
          diagnostics_checklist,
          is_active,
          service_categories (
            slug,
            name
          )
        `)
        .eq('is_active', true);

      if (categorySlug) {
        query = query.eq('slug', categorySlug);
      }

      const { data: services, error } = await query;
      if (!error && services && services.length > 0) {
        return NextResponse.json({
          success: true,
          source: 'database',
          services
        });
      }
    }

    // Fallback to static servicesData
    let servicesList = Object.entries(SERVICES_DATA).map(([slug, s]) => ({
      slug,
      name: s.name,
      packages: s.packages || []
    }));

    if (categorySlug && SERVICES_DATA[categorySlug]) {
      servicesList = [{
        slug: categorySlug,
        ...SERVICES_DATA[categorySlug]
      }];
    }

    return NextResponse.json({
      success: true,
      source: 'static_catalog',
      services: servicesList
    });
  } catch (error) {
    console.error('Error in /api/services:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
