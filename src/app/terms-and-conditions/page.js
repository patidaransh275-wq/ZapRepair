'use client';

import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-soft-sm text-slate-800">
        
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 border-b pb-4">
          Terms & Conditions
        </h1>

        <p className="text-xs text-slate-500">Last updated: August 21, 2026</p>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-lg font-bold font-heading text-slate-900">1. Service Scope</h2>
          <p>
            ZapRepair provides doorstep repair, maintenance, and installation services for household appliances, electrical fixtures, and plumbing systems.
          </p>

          <h2 className="text-lg font-bold font-heading text-slate-900">2. Inspection Fee Policy</h2>
          <p>
            A nominal doorstep inspection fee of ₹199 is charged if a customer chooses not to proceed with the proposed repair following diagnosis. If the customer accepts the repair quote, the inspection fee is completely waived.
          </p>

          <h2 className="text-lg font-bold font-heading text-slate-900">3. Warranty Terms</h2>
          <p>
            All completed repairs carry a standard 30-day service warranty covering the specific fault fixed and parts replaced. Re-servicing during the warranty period is free of charge.
          </p>

          <h2 className="text-lg font-bold font-heading text-slate-900">4. Payment & Billing</h2>
          <p>
            Payments are due upon service completion. Customers can pay technicians directly via Cash, UPI, or Card.
          </p>
        </section>

      </div>
    </div>
  );
}
