'use client';

import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  // Generate JSON-LD BreadcrumbList Schema
  const schemaList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://plumberindore.in${item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaList) }}
      />

      <nav className="flex items-center gap-2 text-xs text-slate-400 py-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-slate-500">/</span>}
              {isLast ? (
                <span className="text-amber-400 font-bold truncate max-w-xs">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-amber-400 transition-colors">
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
