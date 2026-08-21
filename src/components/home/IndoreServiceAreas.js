'use client';

import React from 'react';
import { MapPin, Zap, CheckSquare, Search, ArrowRight, ShieldCheck, Check } from 'lucide-react';
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

  // Teardrop pin locations matching the reference image layout
  const mapTeardropPins = [
    { name: 'Super Corridor', top: '22%', left: '26%' },
    { name: 'Vijay Nagar', top: '28%', left: '72%' },
    { name: 'Palasia', top: '48%', left: '52%' },
    { name: 'Bengali Square', top: '52%', left: '80%' },
    { name: 'Bhanwarkuan', top: '68%', left: '46%' },
    { name: 'Rau', top: '80%', left: '28%' }
  ];

  const indoreBoroughList = [
    "Vijay Nagar",
    "Palasia",
    "Bhanwarkuan",
    "Bengali Square",
    "Rau",
    "Rajendra Nagar",
    "Annapurna",
    "Sudama Nagar",
    "Nipania",
    "Super Corridor",
    "MR-10",
    "Bhawrasla"
  ];

  return (
    <section id="indore-service-areas" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Stylized City Silhouette Map with Teardrop Pins (Matching Reference Image) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full h-[380px] sm:h-[430px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-6 overflow-hidden flex flex-col justify-between">
              
              {/* Subtle background grid & city silhouette shape */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] bg-slate-800/80 rounded-[40%] border-2 border-slate-700/60 blur-[1px] transform -rotate-6 pointer-events-none" />
              
              {/* Map Road Network Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-slate-700/60 stroke-2 pointer-events-none" fill="none">
                <path d="M 50 350 Q 200 200 350 50" strokeDasharray="6 6" />
                <path d="M 100 100 Q 220 250 320 380" strokeDasharray="4 4" />
                <path d="M 30 220 C 180 180, 250 280, 380 200" />
              </svg>

              {/* Floating Teardrop Pin Badges (Matching Reference Photo) */}
              {mapTeardropPins.map((pin, idx) => (
                <div
                  key={idx}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-full z-20 group cursor-pointer"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Floating Label on Hover */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 bg-slate-950 text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-lg whitespace-nowrap border border-slate-700">
                      {pin.name}
                    </span>
                    
                    {/* Teardrop Pin Shape */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white transform hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5 fill-slate-950" />
                    </div>
                    {/* Pin pointer tail */}
                    <div className="w-2 h-2 bg-emerald-500 rotate-45 -mt-1 shadow-sm" />
                  </div>
                </div>
              ))}

              {/* Center Map Tag */}
              <div className="relative z-10 self-start bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700 text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Indore Coverage Map</span>
              </div>

              {/* Bottom Badge */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-white">Doorstep Service Active</span>
                <span className="text-emerald-400 font-extrabold">100% Indore Covered</span>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Layout Matching Reference Photo ("We serve all the major boroughs in London" -> "We serve all the major areas in Indore") */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
                Doorstep Coverage
              </span>

              {/* Exact Heading Style matching the Reference Photo */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading leading-tight tracking-tight">
                We serve all the major areas in Indore
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Get reliable home appliance repair services at your doorstep across major residential and commercial sectors of Indore.
              </p>
            </div>

            {/* Natural Local SEO Statement */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft-sm text-xs sm:text-sm text-slate-700 leading-relaxed">
              ZapRepair provides home appliance repair services across Indore, including AC repair, refrigerator repair, washing machine repair, RO repair, geyser repair and other doorstep appliance services.
            </div>

            {/* Checklist Grid matching Reference Image Layout ([✓] Green Checkbox Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              {indoreBoroughList.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-emerald-50/50 transition-colors"
                >
                  <div className="w-5 h-5 rounded border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 truncate">{area}</span>
                </div>
              ))}
            </div>

            {/* Note below list */}
            <div className="text-[11px] text-slate-500 italic pt-1">
              * Service availability may vary by exact pincode within Indore.
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={handleCheckAvailabilityClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Check Service Availability</span>
              </button>

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
