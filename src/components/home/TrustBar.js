'use client';

import React from 'react';
import { ShieldCheck, Clock, Award, ThumbsUp, Wrench } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Verified Technicians',
      desc: 'Police & ID background verified'
    },
    {
      icon: Clock,
      title: '45-Min Doorstep Arrival',
      desc: 'Prompt response across Indore'
    },
    {
      icon: Award,
      title: '30-Day Repair Warranty',
      desc: '100% genuine spare parts'
    },
    {
      icon: ThumbsUp,
      title: 'Fixed Rate Transparency',
      desc: 'No hidden charges or surprise fees'
    }
  ];

  return (
    <div className="bg-slate-900 border-y border-slate-800 py-6 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-heading">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
