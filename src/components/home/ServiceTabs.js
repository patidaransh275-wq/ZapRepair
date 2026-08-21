'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, PlugZap, Wind, Refrigerator, Shirt, Fan, Flame, Microwave, Droplets, UtensilsCrossed, Zap, Wheat, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState('all');
  const { openBookingModal } = useBooking();

  const iconMap = {
    Wind: Wind,
    Refrigerator: Refrigerator,
    Shirt: Shirt,
    Fan: Fan,
    Flame: Flame,
    Microwave: Microwave,
    Droplets: Droplets,
    UtensilsCrossed: UtensilsCrossed,
    Zap: Zap,
    Wheat: Wheat,
    PlugZap: PlugZap,
    Wrench: Wrench
  };

  const filteredServices = activeTab === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Professional Doorstep Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-3">
            What Needs Fixing Today?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Select a service to view upfront pricing and book a verified technician in under 60 seconds.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto no-scrollbar pb-2">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'appliance', label: 'Appliance Repair' },
              { id: 'electrician', label: 'Electrician' },
              { id: 'plumber', label: 'Plumber' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((srv) => {
            const IconComponent = iconMap[srv.iconName] || Wrench;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      ★ {srv.rating} ({srv.reviewCount})
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-1 group-hover:text-amber-600 transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {srv.shortDesc}
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-400 font-medium">Starts at</span>
                    <span className="text-xl font-extrabold text-slate-900 font-heading">₹{srv.startingPrice}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => openBookingModal(srv.id)}
                    className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
