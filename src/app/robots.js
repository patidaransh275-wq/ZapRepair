export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/profile/',
        '/admin/',
        '/login',
        '/signup',
        '/privacy-policy',
        '/terms-and-conditions'
      ],
    },
    sitemap: 'https://www.plumberindore.in/sitemap.xml',
  };
}
