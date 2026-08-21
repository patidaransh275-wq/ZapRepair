'use client';

import React from 'react';
import { ShieldCheck, Zap, Tag, Award } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Verified Technicians',
      subtitle: 'Background checked & police verified'
    },
    {
      icon: Zap,
      title: 'Same-Day Service',
      subtitle: 'Technician arrives in 45 minutes'
    },
    {
      icon: Tag,
      title: 'Transparent Pricing',
      subtitle: 'Fixed rate cards, no hidden charges'
    },
    {
      icon: Award,
      title: '10,000+ Repairs',
      subtitle: '4.9 Star average customer rating'
    }
  ];

  return (
    <section className="bg-slate-900 border-b border-slate-800 py-6 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-heading">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
