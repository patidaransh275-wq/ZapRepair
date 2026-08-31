import { MAIN_CATEGORIES, getAllSubcategories } from '../data/categoriesData';
import { INDORE_AREAS_DATA } from '../data/indoreAreasData';
import { BLOG_POSTS_DATA } from '../data/blogData';

export default async function sitemap() {
  const baseUrl = 'https://www.plumberindore.in';
  const today = new Date().toISOString().split('T')[0];

  // Core indexable website pages
  const coreRoutes = [
    '',
    '/services',
    '/about',
    '/contact',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: today,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  // Main 5 Category Hub Pages
  const categoryRoutes = MAIN_CATEGORIES.map((cat) => ({
    url: `${baseUrl}${cat.url}`,
    lastModified: today,
    changeFrequency: 'daily',
    priority: 0.95
  }));

  // All Subcategory Service Pages
  const subcategoryRoutes = getAllSubcategories().map((sub) => ({
    url: `${baseUrl}${sub.url}`,
    lastModified: today,
    changeFrequency: 'daily',
    priority: 0.9
  }));

  // Dynamic Indore Location routes (all 12 area hubs)
  const areaRoutes = INDORE_AREAS_DATA.map((area) => ({
    url: `${baseUrl}/${area.slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  // Dynamic Blog Post routes
  const blogRoutes = BLOG_POSTS_DATA.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [
    ...coreRoutes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...areaRoutes,
    ...blogRoutes
  ];
}
