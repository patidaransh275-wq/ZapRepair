'use client';

import React from 'react';
import { DollarSign, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function PricingSection() {
  const { openBookingModal } = useBooking();

  const pricingPolicies = [
    { title: 'Free Inspection With Repair', desc: 'The ₹299 inspection fee is completely waived when you proceed with the repair.' },
    { title: 'Upfront Fixed Rate Card', desc: 'Our technician presents a fixed price quote before starting any work.' },
    { title: 'No Hidden Charges', desc: 'No surcharges, travelling fees, or unexpected bill add-ons.' },
    { title: '30-Day Money Back Warranty', desc: 'Coverage on all replaced spare parts and workmanship.' }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
                Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
                Fair, Honest & Upfront Pricing Card
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                At PlumberIndore, we believe in 100% pricing transparency. You get a clear, itemized rate card before any job starts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {pricingPolicies.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{p.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl mx-auto">
                <DollarSign className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">Doorstep Inspection</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl font-extrabold text-amber-400 font-heading">₹299</span>
                <span className="text-xs text-slate-400 line-through">₹499</span>
              </div>
              <p className="text-xs text-slate-300">
                Fee is <strong className="text-amber-400">100% waived</strong> when repair is performed!
              </p>

              <button
                onClick={() => openBookingModal('ac-repair')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book Doorstep Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
