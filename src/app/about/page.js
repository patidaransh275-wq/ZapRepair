'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function AboutPage() {
  const { openBookingModal } = useBooking();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-3.5 py-1 rounded-full border border-slate-700">
            About ZapRepair
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading">
            Redefining Home Services Across India
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            ZapRepair was founded with a single mission: to bring speed, transparency, and top-tier technical excellence to doorstep home appliance repair.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-heading">10,000+</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Repairs Completed</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-heading">500+</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Verified Technicians</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-heading">4.9 / 5</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Average Customer Rating</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-heading">45 Mins</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Average Doorstep Arrival</div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              Our Core Promises
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Before ZapRepair, homeowners faced endless delays, hidden charges, unverified mechanics, and non-genuine parts. We changed that by combining technology with rigorous technician training.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Hidden Costs</h4>
                  <p className="text-xs text-slate-500">Upfront rate cards provided before work begins.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">100% Genuine Spare Parts</h4>
                  <p className="text-xs text-slate-500">Original manufacturer spares with 30-day to 90-day warranty.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Customer Safety Guarantee</h4>
                  <p className="text-xs text-slate-500">Police-verified engineers with uniform and official ID credentials.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="ZapRepair Team"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-2xl p-10 text-center space-y-4">
          <h2 className="text-2xl font-bold font-heading">Experience Premium Doorstep Service Today</h2>
          <button
            onClick={() => openBookingModal('ac-repair')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-md"
          >
            Book Technician Now
          </button>
        </div>

      </div>
    </div>
  );
}
