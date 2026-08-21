'use client';

import React from 'react';
import { MapPin, Zap, CheckCircle2, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { INDORE_SERVICE_AREAS } from '../../data/pincodesData';
import { useBooking } from '../../context/BookingContext';

export default function IndoreServiceAreas() {
  const { openBookingModal } = useBooking();

  const handleCheckAvailabilityClick = () => {
    const pincodeSec = document.getElementById('pincode-section');
    if (pincodeSec) {
      pincodeSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      openBookingModal('ac-repair');
    }
  };

  const mapPins = [
    { name: 'Super Corridor', x: '22%', y: '25%', zone: 'West Zone' },
    { name: 'Vijay Nagar', x: '68%', y: '28%', zone: 'North Zone' },
    { name: 'MR-10', x: '58%', y: '18%', zone: 'North East' },
    { name: 'Palasia', x: '50%', y: '48%', zone: 'Central Zone' },
    { name: 'Bengali Square', x: '78%', y: '52%', zone: 'East Zone' },
    { name: 'Bhanwarkuan', x: '45%', y: '68%', zone: 'South Zone' },
    { name: 'Sudama Nagar', x: '30%', y: '62%', zone: 'South West' },
    { name: 'Rau', x: '25%', y: '82%', zone: 'South Zone' }
  ];

  return (
    <section id="indore-service-areas" className="py-16 md:py-24 bg-slate-100/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Mobile Heading Header (Visible on Mobile First) */}
        <div className="lg:hidden text-center mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200 inline-block">
            Service Areas in Indore
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
            We Serve Across Indore
          </h2>
          <p className="text-xs text-slate-600">
            Get reliable home appliance repair services at your doorstep across major areas of Indore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Stylized Illustrated Map of Indore */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl relative overflow-hidden text-white">
              
              {/* Outer Map Frame Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5 fill-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm font-heading text-white">Indore Coverage Map</h3>
                    <p className="text-[10px] text-amber-400">Doorstep Technicians Active Now</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/90 border border-emerald-700/60 px-2.5 py-1 rounded-full">
                  100% Indore Active
                </span>
              </div>

              {/* Vector City Map Box */}
              <div className="relative w-full h-[340px] sm:h-[390px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                
                {/* Glowing Overlay & City Boundary Silhouette */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-amber-500/5 to-slate-950 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[80%] rounded-[45%] border-2 border-dashed border-amber-500/30 bg-amber-500/5 animate-pulse-subtle pointer-events-none" />

                {/* Major Arterial Roads SVG */}
                <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-[1.5]" fill="none">
                  {/* AB Road Line */}
                  <line x1="20%" y1="90%" x2="80%" y2="15%" stroke="#334155" strokeWidth="2.5" strokeDasharray="6 4" />
                  {/* Ring Road Line */}
                  <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="#334155" strokeWidth="2" />
                  {/* Super Corridor Line */}
                  <line x1="10%" y1="20%" x2="60%" y2="25%" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.4" />
                  {/* Bypass Line */}
                  <path d="M 75 350 Q 300 200 350 50" stroke="#334155" strokeWidth="2" fill="none" />
                </svg>

                {/* Road Label Tags */}
                <div className="absolute top-[20%] left-[25%] text-[9px] font-mono text-slate-500 rotate-[-8deg] pointer-events-none">
                  Super Corridor
                </div>
                <div className="absolute top-[42%] right-[15%] text-[9px] font-mono text-slate-500 rotate-[45deg] pointer-events-none">
                  A.B. Road
                </div>
                <div className="absolute bottom-[25%] left-[15%] text-[9px] font-mono text-slate-500 pointer-events-none">
                  Bypass Road
                </div>

                {/* Center Hub Indicator */}
                <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-amber-400/30 animate-ping" />
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg border-2 border-slate-900 z-10">
                      <Zap className="w-4 h-4 fill-slate-950" />
                    </div>
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded bg-slate-900/90 text-amber-400 text-[10px] font-extrabold border border-amber-500/40 shadow-md">
                    Central Indore Hub
                  </span>
                </div>

                {/* Interactive Area Map Pins */}
                {mapPins.map((pin, i) => (
                  <div
                    key={i}
                    style={{ left: pin.x, top: pin.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
                  >
                    <div className="flex items-center gap-1 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 border border-slate-700 hover:border-amber-400 px-2 py-1 rounded-lg shadow-md transition-all">
                      <MapPin className="w-3 h-3 text-amber-400 group-hover:text-slate-950 shrink-0" />
                      <span className="text-[10px] font-bold whitespace-nowrap">{pin.name}</span>
                    </div>
                  </div>
                ))}

              </div>

              {/* Map Footer Info */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Coverage: 100% Indore Urban & Suburbs
                </span>
                <span className="text-amber-400 font-bold">Fast 45-Min Arrival</span>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Content & Service Area Checklist */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Desktop Section Header */}
            <div className="hidden lg:block space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200 inline-block">
                Service Areas in Indore
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
                We Serve Across Indore
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get reliable home appliance repair services at your doorstep across major areas of Indore.
              </p>
            </div>

            {/* Natural Local SEO Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft-sm">
              ZapRepair provides home appliance repair services across Indore, including AC repair, refrigerator repair, washing machine repair, RO repair, geyser repair and other doorstep appliance services.
            </p>

            {/* Checklist Grid of 12 Indore Service Areas */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft-sm">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">
                Active Doorstep Coverage Areas
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INDORE_SERVICE_AREAS.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-amber-400 hover:bg-amber-50/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-900 truncate">{area}</span>
                  </div>
                ))}
              </div>

              {/* Note below list */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
                * Service availability may vary by exact pincode.
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              
              {/* Primary CTA */}
              <button
                onClick={handleCheckAvailabilityClick}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all transform active:scale-98"
              >
                <Search className="w-4 h-4" />
                <span>Check Service Availability</span>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => openBookingModal('ac-repair')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
              >
                <span>Book a Technician</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
