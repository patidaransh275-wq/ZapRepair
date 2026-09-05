'use client';

import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { checkPincodeServiceability, INDORE_SERVICE_AREAS } from '../../data/pincodesData';
import { IS_BOOKING_ENABLED } from '../../config/serviceArea.js';

export default function PincodeCheckerSection() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pincode) return;
    const res = checkPincodeServiceability(pincode);
    setResult(res);
  };

  return (
    <section id="pincode-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block">
              Check Serviceability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Is PlumberIndore Active In Your Indore Area?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              We cover 100% of Indore PIN codes. Enter your 6-digit postal code below to check technician availability.
            </p>
          </div>

          <form onSubmit={handleCheck} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-Digit Pincode (e.g. 452010)"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Check</span>
            </button>
          </form>

          {result && (
            <div className={`max-w-md mx-auto p-4 rounded-2xl text-xs font-semibold text-left border flex items-start gap-3 ${
              result.valid && result.serviceable && IS_BOOKING_ENABLED
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
            }`}>
              {result.valid && result.serviceable && IS_BOOKING_ENABLED ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{result.message}</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
