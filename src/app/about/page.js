'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Clock, Users, Wrench, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function AboutPage() {
  const { openBookingModal } = useBooking();

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            About Our Company
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            About PlumberIndore
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            PlumberIndore was founded with a single mission: to bring speed, transparency, and top-tier technical excellence to doorstep plumbing & home appliance repair across Indore, Madhya Pradesh.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft-md grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              Our Vision for Indore Homes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Home appliance breakdowns and plumbing issues can disrupt your daily routine. We eliminate long wait times, unfair pricing, and unverified mechanics by offering a 100% background-verified technician team with guaranteed 45-minute arrival.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700 font-semibold space-y-2">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Police Verified Technicians</span>
              </div>
              <div className="flex items-center gap-2 text-amber-700">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>45-Minute Arrival Guarantee</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="PlumberIndore Team"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Local SEO Statement */}
        <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed">
          PlumberIndore provides home plumbing & appliance repair services across Indore, including AC repair, refrigerator repair, washing machine repair, RO repair, geyser repair, electrician, and plumbing services.
        </div>

        {/* Action Call */}
        <div className="text-center">
          <button
            onClick={() => openBookingModal('ac-repair')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Book Service in Indore</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
