'use client';

import React from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import { REVIEWS_DATA } from '../../data/reviewsData';

export default function ReviewsSection() {
  return (
    <section id="reviews-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
            Customer Feedback
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            What Homeowners Say About PlumberIndore
          </h2>
          <p className="text-sm text-slate-600">
            Verified feedback from homeowners across Vijay Nagar, Palasia, Bhanwarkuan, Sudama Nagar & Indore sectors.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Source Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {rev.appliance}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Verified Order
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-heading">{rev.name}</h4>
                    <div className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5 text-amber-500" />
                      <span>{rev.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Guarantee Notice Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">100% Satisfaction & 30-Day Warranty</h4>
              <p className="text-xs text-slate-500">Every doorstep plumbing and appliance repair is backed by a 30-day PlumberIndore post-service warranty.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
