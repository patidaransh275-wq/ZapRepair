'use client';

import React from 'react';
import { MapPin, Wrench, Search, ArrowRight, Check, ExternalLink } from 'lucide-react';
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
          
          {/* LEFT SIDE: Interactive Embedded Google Map of Indore Coverage Hub */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full h-[380px] sm:h-[430px] bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Embedded Interactive Google Map Iframe */}
              <iframe
                title="PlumberIndore Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.55160867823!2d75.81156828551465!3d22.724109724128526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Map Overlay Label */}
              <div className="absolute top-4 left-4 z-10 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700 text-xs font-bold text-amber-400 flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Indore Hub Map</span>
              </div>

              {/* Bottom Interactive Google Maps Button Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-slate-300 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 shadow-lg">
                <div className="flex flex-col">
                  <span className="font-bold text-white">Apollo Tower, Vijay Nagar</span>
                  <span className="text-emerald-400 font-extrabold">100% Indore Covered</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Apollo+Tower+Vijay+Nagar+Indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shrink-0"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Layout ("We serve all the major areas in Indore") */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
                Doorstep Coverage
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading leading-tight tracking-tight">
                We serve all the major areas in Indore
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Get reliable home plumbing & appliance repair services at your doorstep across major residential and commercial sectors of Indore.
              </p>
            </div>

            {/* Natural Local SEO Statement */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft-sm text-xs sm:text-sm text-slate-700 leading-relaxed">
              PlumberIndore provides home plumbing & appliance repair services across Indore, including AC repair, refrigerator repair, washing machine repair, RO repair, geyser repair, electrician, and plumbing services.
            </div>

            {/* Checklist Grid ([✓] Green Checkbox Style) */}
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
