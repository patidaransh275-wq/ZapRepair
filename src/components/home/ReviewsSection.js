'use client';

import React from 'react';
import { MessageSquare, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="reviews-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Honest "Reviews Coming Soon" Placeholder Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft-md max-w-3xl mx-auto text-center space-y-6">
          
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <MessageSquare className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200 inline-block">
              New Service Launch in Indore
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Customer Reviews Coming Soon
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              We have recently launched our digital doorstep booking platform across Indore! Genuine customer feedback and ratings will be displayed here as real completed service orders come in.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-slate-700 font-semibold max-w-lg mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Commitment to Transparent, Quality Doorstep Repairs</span>
          </div>

          <div className="pt-2">
            <a
              href="https://maps.google.com/?q=Apollo+Tower+Vijay+Nagar+Indore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
