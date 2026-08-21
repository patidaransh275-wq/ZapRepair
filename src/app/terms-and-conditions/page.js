'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-soft-sm">
        
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Terms of Service
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading mt-3">
            Terms & Conditions - PlumberIndore
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last updated: August 21, 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 font-heading">1. Scope of Services</h2>
            <p>
              PlumberIndore provides doorstep repair, maintenance, and installation services for household plumbing, electrical fixtures, and home appliances across Indore, Madhya Pradesh.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 font-heading">2. Inspection & Payment</h2>
            <p>
              An inspection fee of ₹299 applies if no repair is undertaken. If the customer accepts the repair rate card, the inspection fee is 100% waived. Payment can be made post-service completion via Cash, UPI, or Card.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 font-heading">3. Service Warranty</h2>
            <p>
              PlumberIndore offers a 30-day service warranty on all completed repairs and replaced spare parts. Re-inspection is free within the 30-day warranty window for the same reported issue.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
