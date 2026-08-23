'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Clock, Phone, Star, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INDORE_AREAS_DATA } from '../../../data/indoreAreasData';
import { SERVICES_DATA } from '../../../data/servicesData';
import { useBooking } from '../../../context/BookingContext';
import Breadcrumbs from '../../../components/layout/Breadcrumbs';

export default function AreaLandingPage({ params }) {
  const { area } = params;
  const areaInfo = INDORE_AREAS_DATA.find((a) => a.slug === area) || INDORE_AREAS_DATA[0];
  const { openBookingModal } = useBooking();

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/#indore-service-areas' },
    { name: areaInfo.name, href: `/service-areas/${areaInfo.slug}` }
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
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                4.9 / 5 Rating
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-400 font-bold">{areaInfo.activeTechs} On-Duty Technicians</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300 font-semibold">30-Day Warranty</span>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => openBookingModal('ac-repair')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg text-sm transition-all"
              >
                Book Doorstep Technician ({areaInfo.name})
              </button>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES_DATA.slice(0, 6).map((srv) => (
              <div key={srv.id} className="p-5 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-heading">{srv.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{srv.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs font-extrabold text-amber-600">From ₹{srv.startingPrice}</span>
                  <button
                    onClick={() => openBookingModal(srv.id)}
                    className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
