'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, Search, Star, Clock, CheckCircle2, PhoneCall, ArrowRight, Wrench } from 'lucide-react';
import { checkPincodeServiceability } from '../../data/pincodesData';
import { useBooking } from '../../context/BookingContext';

export default function Hero() {
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const { openBookingModal } = useBooking();

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode) return;
    const result = checkPincodeServiceability(pincode);
    setPincodeResult(result);
  };

  return (
    <section className="relative bg-slate-950 text-white pt-10 pb-16 md:py-24 overflow-hidden">
      
      {/* Background Decorative Lighting Effect */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Indore Location Exclusive Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Doorstep Plumbing & Appliance Repair in Indore, MP</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1]">
              Indore's Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">Doorstep Plumbing & Appliance</span> Repair
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Certified technicians reach your home in <strong className="text-white font-bold">45 minutes</strong> across Vijay Nagar, Palasia, Bhanwarkuan, Rau, and all Indore sectors. Fixed rates with 30-day repair warranty.
            </p>

            {/* Pincode Availability Checker Widget */}
            <div className="pt-2 max-w-md mx-auto lg:mx-0">
              <form onSubmit={handleCheckPincode} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter Indore Pincode (e.g. 452010)"
                    className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 shrink-0 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Availability</span>
                </button>
              </form>

              {/* Pincode Result Alert */}
              {pincodeResult && (
                <div className={`mt-3 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                  pincodeResult.valid
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/80 border-red-500/50 text-red-300'
                }`}>
                  {pincodeResult.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>{pincodeResult.message}</span>
                </div>
              )}
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 text-left border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading">45 Mins</div>
                <div className="text-[11px] text-slate-400 font-medium">Fast Arrival</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading">10,000+</div>
                <div className="text-[11px] text-slate-400 font-medium">Indore Repairs</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading">★ 4.9/5</div>
                <div className="text-[11px] text-slate-400 font-medium">Rating in Indore</div>
              </div>
            </div>

          </div>

          {/* Right Hero Card / Quick Booking Entry */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">Book Doorstep Service</h3>
                  <p className="text-xs text-amber-400 font-medium">Instant 60-Second Booking</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Wrench className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Service Selection Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => openBookingModal('plumber')}
                  className="p-3 rounded-xl bg-slate-800/70 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 text-left transition-all duration-200 group"
                >
                  <div className="font-extrabold text-xs group-hover:text-slate-950">Plumber Service</div>
                  <div className="text-[10px] text-slate-400 group-hover:text-slate-900 mt-0.5">From ₹149</div>
                </button>

                <button
                  type="button"
                  onClick={() => openBookingModal('ac-repair')}
                  className="p-3 rounded-xl bg-slate-800/70 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 text-left transition-all duration-200 group"
                >
                  <div className="font-extrabold text-xs group-hover:text-slate-950">AC Repair</div>
                  <div className="text-[10px] text-slate-400 group-hover:text-slate-900 mt-0.5">From ₹399</div>
                </button>

                <button
                  type="button"
                  onClick={() => openBookingModal('washing-machine')}
                  className="p-3 rounded-xl bg-slate-800/70 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 text-left transition-all duration-200 group"
                >
                  <div className="font-extrabold text-xs group-hover:text-slate-950">Washing Machine</div>
                  <div className="text-[10px] text-slate-400 group-hover:text-slate-900 mt-0.5">From ₹349</div>
                </button>

                <button
                  type="button"
                  onClick={() => openBookingModal('refrigerator')}
                  className="p-3 rounded-xl bg-slate-800/70 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 text-left transition-all duration-200 group"
                >
                  <div className="font-extrabold text-xs group-hover:text-slate-950">Refrigerator</div>
                  <div className="text-[10px] text-slate-400 group-hover:text-slate-900 mt-0.5">From ₹299</div>
                </button>
              </div>

              {/* Main CTA */}
              <button
                type="button"
                onClick={() => openBookingModal('ac-repair')}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 text-sm transition-all duration-200"
              >
                <span>Book Technician Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 font-medium">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Indore Helpline: <strong>+91 98765 43210</strong></span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
