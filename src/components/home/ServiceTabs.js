'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wind, Refrigerator, Shirt, Wrench, PlugZap, Droplets, Flame, 
  Microwave, Fan, UtensilsCrossed, Zap, Wheat, Sparkles, Hammer, 
  Paintbrush, ArrowRight 
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';

const ICON_MAP = {
  Wind,
  Refrigerator,
  Shirt,
  Wrench,
  PlugZap,
  Droplets,
  Flame,
  Microwave,
  Fan,
  UtensilsCrossed,
  Zap,
  Wheat,
  Sparkles,
  Hammer,
  Paintbrush
};

export default function ServiceTabs() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { openBookingModal } = useBooking();

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'appliance', label: 'Appliance Repair' },
    { id: 'plumber', label: 'Plumbing' },
    { id: 'electrician', label: 'Electrician' },
    { id: 'cleaning', label: 'Cleaning & Pest' },
    { id: 'carpenter', label: 'Carpenter & Paint' }
  ];

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'appliance') return ['ac-repair', 'refrigerator', 'washing-machine', 'ro-purifier', 'geyser', 'microwave', 'air-cooler', 'kitchen-chimney', 'inverter', 'atta-chakki'].includes(s.id);
    if (activeCategory === 'plumber') return s.id === 'plumber';
    if (activeCategory === 'electrician') return s.id === 'electrician';
    if (activeCategory === 'cleaning') return s.id === 'cleaning-pest-control';
    if (activeCategory === 'carpenter') return ['carpenter', 'painting-waterproofing'].includes(s.id);
    return true;
  });

  return (
    <section id="services-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-block">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Doorstep Plumbing & Appliance Services
          </h2>
          <p className="text-sm text-slate-600">
            Select your required home service in Indore for fixed upfront rates and 45-minute arrival.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((srv) => {
            const IconComp = ICON_MAP[srv.iconName] || Wrench;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between group hover:border-amber-400"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-md group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <IconComp className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    {srv.badge && (
                      <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-amber-600 transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                      {srv.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Starting from</span>
                    <span className="text-base font-extrabold text-slate-900 font-heading">
                      ₹{srv.startingPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openBookingModal(srv.id)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs py-2.5 rounded-xl shadow-sm transition-all"
                    >
                      Book Service
                    </button>
                    <Link
                      href={`/services/${srv.slug}`}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
