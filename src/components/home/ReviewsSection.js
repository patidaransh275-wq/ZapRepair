'use client';

import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { REVIEWS_DATA } from '../../data/reviewsData';

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Real Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-3">
            What Homeowners Say About ZapRepair
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Over 10,000+ repairs completed with a 4.9 star average rating across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.name}</h4>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{rev.city}</span>
                  </div>
                  <div className="text-[10px] text-amber-600 font-semibold">{rev.appliance}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
