import { SERVICES_DATA } from '../data/servicesData';
import { INDORE_AREAS_DATA } from '../data/indoreAreasData';

export default async function sitemap() {
  const baseUrl = 'https://www.plumberindore.in';

  // Static routes
  const staticRoutes = [
    '',
    '/services',
    '/about',
    '/contact',
    '/login',
    '/signup',
    '/privacy-policy',
    '/terms-and-conditions',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  // Dynamic Service routes
  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.9
  }));

  // Dynamic Area routes
  const areaRoutes = INDORE_AREAS_DATA.map((area) => ({
    url: `${baseUrl}/${area.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
