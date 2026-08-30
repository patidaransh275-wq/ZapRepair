'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ShieldCheck, Clock, Phone, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INDORE_AREAS_DATA } from '../../data/indoreAreasData';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';
import Breadcrumbs from '../../components/layout/Breadcrumbs';

export default function AreaLandingPage({ params }) {
  const { area } = params;
  const areaInfo = INDORE_AREAS_DATA.find((a) => a.slug === area);

  if (!areaInfo) {
    notFound();
  }

  const { openBookingModal } = useBooking();

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/#indore-service-areas' },
    { name: areaInfo.name, href: `/${areaInfo.slug}` }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="bg-slate-900 text-white pt-8 pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <Breadcrumbs items={breadcrumbItems} />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{areaInfo.eta} Doorstep Arrival in {areaInfo.name}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
              Doorstep Plumber & Appliance Repair in {areaInfo.name}, Indore
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {areaInfo.description} Assigned certified technicians active near {areaInfo.landmark} (Pincode: {areaInfo.pincode}).
            </p>

            <div className="flex items-center gap-4 text-xs pt-2">
              <span className="text-emerald-400 font-bold">{areaInfo.activeTechs} On-Duty Technicians</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300 font-semibold">Fixed Rate Card</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => openBookingModal('ac-repair')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg text-sm transition-all text-center"
              >
                Book Doorstep Technician ({areaInfo.name})
              </button>

              <a
                href="tel:+919174934135"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs border border-slate-700 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: +91 91749 34135</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 space-y-12">
        
        {/* Popular Services in Area */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft-md space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 font-heading">
            Popular Services Available in {areaInfo.name}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
            {SERVICES_DATA.map((srv) => (
              <div key={srv.id} className="p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between space-y-2 sm:space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-base font-heading line-clamp-1 leading-tight">{srv.name}</h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0 pt-2 sm:pt-3 border-t border-slate-100">
                  <span className="text-[10px] sm:text-xs font-extrabold text-amber-600">From ₹{srv.startingPrice}</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => openBookingModal(srv.id)}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg shadow-sm text-center"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
