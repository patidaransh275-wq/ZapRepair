'use client';

import React from 'react';
import { Phone, ArrowRight, Wrench } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function FinalCTA() {
  const { openBookingModal } = useBooking();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="w-14 h-14 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold mx-auto shadow-xl">
          <Wrench className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950">
            Fix Your Plumbing & Appliances Today with PlumberIndore
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-900/90">
            45-minute doorstep technician arrival in Vijay Nagar, Palasia, Bhanwarkuan, Rau, and all Indore areas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => openBookingModal('ac-repair')}
            className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-8 py-4 rounded-xl text-sm shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            <span>Book Technician Now</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <a
            href="tel:+919876543210"
            className="w-full sm:w-auto bg-white/90 hover:bg-white text-slate-950 font-bold px-8 py-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-slate-950/20"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Call Helpline: +91 98765 43210</span>
          </a>
        </div>

      </div>
    </section>
  );
}
