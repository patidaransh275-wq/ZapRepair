'use client';

import React from 'react';

export default function Badge({ children, variant = 'amber', className = '' }) {
  const variants = {
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    navy: 'bg-slate-900 text-amber-400 border-slate-700',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    blue: 'bg-sky-100 text-sky-800 border-sky-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${variants[variant] || variants.amber} ${className}`}>
      {children}
    </span>
  );
}
