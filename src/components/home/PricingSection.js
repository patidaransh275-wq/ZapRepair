'use client';

import React from 'react';
import { Tag, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function PricingSection() {
  const { openBookingModal } = useBooking();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Zero Hidden Surprises
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-3">
            Transparent Pricing Policy
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No unexpected charges. Know exactly what you pay before work starts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-soft-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">Doorstep Inspection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nominal ₹199 inspection fee to cover technician travel and thorough fault diagnosis.
              </p>
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Inspection Fee WAIVED 100% when repair is accepted!</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">
              Standard Policy
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-xl font-bold font-heading text-white">Fixed Rate Card</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard rate cards for labor and spare parts. Technician shares the exact total estimate before starting any work.
              </p>
              <div className="p-3 bg-slate-800 border border-slate-700 text-amber-400 rounded-xl text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>30-Day Free Re-repair Warranty</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-soft-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">Genuine Parts Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All replacement components are 100% original factory sealed parts with manufacturer warranty invoice.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Original Part MRP Billing Only</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
