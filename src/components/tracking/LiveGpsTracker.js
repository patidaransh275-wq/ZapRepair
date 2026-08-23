'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Phone, MessageSquare, Truck } from 'lucide-react';

export default function LiveGpsTracker({ booking }) {
  const [etaMinutes, setEtaMinutes] = useState(18);
  const [distanceKm, setDistanceKm] = useState(3.4);
  const [progressPercent, setProgressPercent] = useState(65);

  // Simulate live GPS movement updates
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 5 ? prev - 1 : 5));
      setDistanceKm((prev) => (prev > 0.8 ? +(prev - 0.2).toFixed(1) : 0.8));
      setProgressPercent((prev) => (prev < 90 ? prev + 3 : 90));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 text-white space-y-4 shadow-2xl">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="font-bold text-sm font-heading">Live GPS Route Tracker</h3>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold px-3 py-1 rounded-full">
          ● Signal Live (Indore GPS)
        </span>
      </div>

      {/* Simulated GPS Canvas Map Container */}
      <div className="relative w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
        
        {/* Radar & Street Grid Animation */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        
        {/* Animated Simulated Route Line */}
        <svg className="absolute inset-0 w-full h-full stroke-emerald-500/80 stroke-2 pointer-events-none" fill="none">
          <path d="M 50 180 C 150 140, 220 80, 380 40" strokeDasharray="6 6" />
        </svg>

        {/* Customer Destination Pin */}
        <div className="absolute top-8 right-12 z-10 flex flex-col items-center">
          <div className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
            Customer Address (Indore)
          </div>
          <MapPin className="w-6 h-6 text-amber-400 fill-amber-400/20" />
        </div>

        {/* Moving Technician Vehicle Icon */}
        <div
          className="absolute z-20 flex flex-col items-center transition-all duration-1000 ease-out"
          style={{ bottom: `${progressPercent / 1.8}%`, left: `${progressPercent / 1.3}%` }}
        >
          <div className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-bounce">
            Technician Unit (MP 09)
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        {/* Bottom Live Metrics Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-30 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] text-slate-400">Distance Remaining</div>
            <div className="font-extrabold text-white font-heading">{distanceKm} km away</div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-400">Estimated Doorstep Arrival</div>
            <div className="font-extrabold text-amber-400 font-heading">{etaMinutes} Mins</div>
          </div>
        </div>

      </div>

    </div>
  );
}
