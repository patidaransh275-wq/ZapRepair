import React from 'react';
import { notFound } from 'next/navigation';
import { BLOG_POSTS_DATA } from '../../../data/blogData';
import BlogPostDetailClient from '../../../components/blog/BlogPostDetailClient';

export function generateStaticParams() {
  return BLOG_POSTS_DATA.map((post) => ({
    slug: post.slug
  }));
}

export function generateMetadata({ params }) {
  const { slug } = params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | PlumberIndore Blog',
      description: 'The requested blog post could not be found.'
    };
  }

  const title = `${post.title} | PlumberIndore Blog`;
  const description = post.summary;

  return {
    title: title,
    description: description,
    keywords: [
      post.title,
      'PlumberIndore guide',
      'Indore home repair',
      'doorstep appliance tips Indore'
    ],
    alternates: {
      canonical: `https://www.plumberindore.in/blog/${post.slug}`
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.plumberindore.in/blog/${post.slug}`,
      siteName: 'PlumberIndore',
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title
        }
      ],
      locale: 'en_IN',
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [post.image]
    }
  };
}

export default function BlogPostDetail({ params }) {
  const { slug } = params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.summary,
    'image': post.image,
    'author': {
      '@type': 'Person',
      'name': post.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'PlumberIndore',
      'url': 'https://www.plumberindore.in'
    },
    'datePublished': post.date,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.plumberindore.in/blog/${post.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostDetailClient post={post} />
    </>
  );
}
