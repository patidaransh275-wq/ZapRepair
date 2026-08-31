import { SERVICES_DATA } from '../data/servicesData';
import { INDORE_AREAS_DATA } from '../data/indoreAreasData';
import { BLOG_POSTS_DATA } from '../data/blogData';

export default async function sitemap() {
  const baseUrl = 'https://www.plumberindore.in';

  // Core indexable website pages
  const coreRoutes = [
    '',
    '/services',
    '/about',
    '/contact',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  // Dynamic Service routes (all 13 services)
  const serviceRoutes = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.9
  }));

  // Dynamic Indore Location routes (all 12 areas)
  const areaRoutes = INDORE_AREAS_DATA.map((area) => ({
    url: `${baseUrl}/${area.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  // Dynamic Blog Post routes
  const blogRoutes = BLOG_POSTS_DATA.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...coreRoutes, ...serviceRoutes, ...areaRoutes, ...blogRoutes];
}
