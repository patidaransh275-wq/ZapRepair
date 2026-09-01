import { NextResponse } from 'next/server';
import { getAdminClient } from '../../../../lib/supabase/admin';
import { SERVICES_DATA } from '../../../../data/servicesData';

/**
 * GET /api/services/[slug]
 * Queries specific service by slug with its packages and checklist.
 */
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const supabaseAdmin = getAdminClient();

    if (supabaseAdmin) {
      const { data: dbServices, error } = await supabaseAdmin
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true);

      if (!error && dbServices && dbServices.length > 0) {
        return NextResponse.json({
          success: true,
          slug,
          service: {
            slug,
            name: dbServices[0].name,
            packages: dbServices.map(p => ({
              id: p.id,
              title: p.package_title,
              price: Number(p.price),
              duration: p.duration,
              warranty: `${p.warranty_days} Days`,
              description: p.description,
              diagnostics: p.diagnostics_checklist
            }))
          }
        });
      }
    }

    // Fallback to static catalog
    const staticService = SERVICES_DATA[slug];
    if (!staticService) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      slug,
      service: staticService
    });
  } catch (error) {
    console.error('Error in /api/services/[slug]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
