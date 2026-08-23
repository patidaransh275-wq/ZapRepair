'use client';

import React from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { REVIEWS_DATA } from '../../data/reviewsData';

export default function ReviewsSection() {
  return (
    <section id="reviews-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Google Business Profile Rating Badge */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-soft-sm">
            <span className="text-xs font-extrabold text-slate-900">Google Business Score:</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>4.9 / 5</span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">(480+ Reviews)</span>
          </div>

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
                
                {/* Rating Stars & Source Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Google Verified
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

        {/* Google Business Profile External Link Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
              G
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-heading">Verified Google Business Profile</h4>
              <p className="text-xs text-slate-500">Read all verified customer reviews and location ratings on Google Maps.</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Plumber+Indore"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0"
          >
            <span>View Google Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
