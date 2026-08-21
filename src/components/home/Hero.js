'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, Search, ArrowRight, Zap, CheckCircle2, Star, Clock } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { checkPincodeServiceability } from '../../data/pincodesData';

export default function Hero() {
  const { openBookingModal, userPincode, setUserPincode } = useBooking();
  const [selectedApplianceId, setSelectedApplianceId] = useState('ac-repair');
  const [pincodeInput, setPincodeInput] = useState(userPincode || '452010');
  const [checkResult, setCheckResult] = useState(null);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    const result = checkPincodeServiceability(pincodeInput);
    setCheckResult(result);
    if (result.valid) {
      setUserPincode(pincodeInput);
      // Open booking flow after brief delay
      setTimeout(() => {
        openBookingModal(selectedApplianceId);
      }, 500);
    }
  };

  return (
    <section className="relative bg-slate-900 text-white pt-12 pb-20 md:py-24 overflow-hidden border-b border-slate-800">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Headline & Badges */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-amber-400 backdrop-blur-sm">
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>Indore’s #1 Doorstep Appliance Service Platform</span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.15]">
              Trusted Home Appliance Repair, <span className="text-amber-400">At Your Doorstep</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Expert technicians, transparent pricing, and fast service across Indore. We fix your appliances so you can get back to your life.
            </p>

            {/* Key Value Props Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>45-Min Arrival in Indore</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Parts</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day Warranty</span>
              </div>
            </div>

            {/* Rating summary */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white text-sm">4.9/5</span> Rating from over <span className="font-bold text-white">10,000+ happy Indore homeowners</span>
              </div>
            </div>

          </div>

          {/* Right Column - Google Stitch Interactive Booking Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900 border border-slate-100">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900">Book Doorstep Service</h3>
                  <p className="text-xs text-slate-500">Check Indore technician availability in 10 seconds</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleCheckAvailability} className="space-y-4">
                
                {/* 1. Select Appliance */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    1. Select Appliance
                  </label>
                  <select
                    value={selectedApplianceId}
                    onChange={(e) => setSelectedApplianceId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} (Starts ₹{srv.startingPrice})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Enter Pincode */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    2. Enter Indore Pincode
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      placeholder="e.g. 452010 or 452001"
                      required
                    />
                  </div>
                </div>

                {/* Feedback message */}
                {checkResult && (
                  <div className={`p-3 rounded-xl text-xs font-semibold ${
                    checkResult.valid 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {checkResult.message}
                  </div>
                )}

                {/* Submit / Check Availability Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98"
                >
                  <span>Check Availability & Book</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

              </form>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Free Inspection with Repair
                </span>
                <span>No Payment Required Now</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
