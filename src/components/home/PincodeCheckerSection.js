'use client';

import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { checkPincodeServiceability } from '../../data/pincodesData';
import { useBooking } from '../../context/BookingContext';

export default function PincodeCheckerSection() {
  const { openBookingModal, setUserPincode } = useBooking();
  const [pin, setPin] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    const res = checkPincodeServiceability(pin);
    setResult(res);
    if (res.valid) {
      setUserPincode(pin);
    }
  };

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-3.5 py-1 rounded-full border border-slate-700">
            Instant Coverage Check
          </span>
          <h2 className="text-3xl font-extrabold font-heading">
            Is ZapRepair Active In Your Neighborhood?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Enter your 6-digit PIN code to check instant technician availability in your city.
          </p>

          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <div className="relative flex-1">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter Pincode (e.g. 110001)"
                className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Check Now</span>
              <Search className="w-4 h-4" />
            </button>
          </form>

          {result && (
            <div className={`p-4 rounded-xl text-xs font-semibold max-w-md mx-auto mt-4 border text-left ${
              result.valid 
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' 
                : 'bg-red-950/80 border-red-700 text-red-300'
            }`}>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div>{result.message}</div>
                  {result.valid && (
                    <button
                      onClick={() => openBookingModal('ac-repair')}
                      className="mt-2 text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Proceed to Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
