'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '../../data/blogData';
import Breadcrumbs from '../../components/layout/Breadcrumbs';

export default function BlogPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog & Home Guides', href: '/blog' }
  ];

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
            Expert Insights & DIY Guides
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
            PlumberIndore Home Care Blog
          </h1>
          <p className="text-sm text-slate-600">
            Troubleshooting tips, appliance maintenance hacks, and plumbing advice for homeowners in Indore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS_DATA.map((post) => (
            <div key={post.slug} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between">
              <div>
                <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
                <div className="p-6 space-y-3">
                  <div className="text-[11px] text-amber-600 font-bold">{post.readTime} • {post.date}</div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">{post.title}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">{post.summary}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-800"
                >
                  Read Full Article
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
