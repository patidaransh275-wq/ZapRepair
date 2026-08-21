'use client';

import React from 'react';
import { Zap, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function FinalCTA() {
  const { openBookingModal } = useBooking();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-slate-950/10 px-3 py-1 rounded-full border border-slate-950/20">
              Need Instant Repair?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-950">
              Fix Your Appliance Today with ZapRepair
            </h2>
            <p className="text-sm font-medium text-slate-900">
              Verified technicians available in 45 minutes across Delhi NCR, Mumbai, Bangalore, Pune & more.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => openBookingModal('ac-repair')}
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl flex items-center gap-2 text-sm transition-all transform hover:-translate-y-0.5"
            >
              <span>Book Service Now</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <a
              href="tel:+919876543210"
              className="bg-white/90 hover:bg-white text-slate-950 font-bold px-6 py-4 rounded-xl shadow-md flex items-center gap-2 text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>+91 98765 43210</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
