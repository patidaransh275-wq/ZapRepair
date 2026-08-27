'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wind, Wrench, PlugZap, Refrigerator, Shirt, Droplets, Flame, 
  Microwave, Fan, UtensilsCrossed, Zap, Wheat, ChevronRight, ArrowRight, Sparkles 
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';

const ICON_MAP = {
  Wind,
  Wrench,
  PlugZap,
  Refrigerator,
  Shirt,
  Droplets,
  Flame,
  Microwave,
  Fan,
  UtensilsCrossed,
  Zap,
  Wheat
};

export default function ServicesMegaMenu({ isOpen, onClose }) {
  const [activeCategoryId, setActiveCategoryId] = useState('ac-repair');
  const { openBookingModal } = useBooking();

  const activeCategory = SERVICES_DATA.find((item) => item.id === activeCategoryId) || SERVICES_DATA[0];
  const ActiveCategoryIcon = ICON_MAP[activeCategory.iconName] || Wrench;

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-5xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
      onMouseLeave={onClose}
    >
      {/* Mega Menu Body */}
      <div className="flex min-h-[420px]">
        
        {/* Left Column - Category Sidebar */}
        <div className="w-1/3 max-w-[280px] bg-slate-50/90 border-r border-slate-200/80 p-3 space-y-1 overflow-y-auto max-h-[480px] scrollbar-thin">
          <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Select Service Category
          </div>

          {SERVICES_DATA.map((category) => {
            const IconComponent = ICON_MAP[category.iconName] || Wrench;
            const isSelected = category.id === activeCategoryId;

            return (
              <button
                key={category.id}
                onMouseEnter={() => setActiveCategoryId(category.id)}
                onClick={() => setActiveCategoryId(category.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all duration-150 text-xs font-semibold ${
                  isSelected
                    ? 'bg-slate-200/80 text-slate-950 font-bold shadow-sm border-l-4 border-amber-500'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white text-slate-600 border border-slate-200'
                  }`}>
                    <IconComponent className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="truncate">{category.name}</span>
                </div>

                {category.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 ml-1.5 ${
                    isSelected ? 'bg-slate-900 text-amber-400' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {category.badge}
                  </span>
                )}

                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  isSelected ? 'text-slate-950 translate-x-0.5' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Column - Service Details & 2-Column Grid */}
        <div className="flex-1 p-6 bg-white space-y-6 flex flex-col justify-between overflow-y-auto max-h-[480px]">
          <div className="space-y-5">
            
            {/* Category Header Banner */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <ActiveCategoryIcon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <span>{activeCategory.name}</span>
                    {activeCategory.badge && (
                      <span className="text-[10px] bg-slate-900 text-amber-400 font-bold px-2 py-0.5 rounded-full">
                        {activeCategory.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{activeCategory.heroSubtitle}</p>
                </div>
              </div>

              <Link
                href={`/services/${activeCategory.slug}`}
                onClick={onClose}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Category Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2-Column Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {activeCategory.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    onClose();
                    openBookingModal(activeCategory.id);
                  }}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-amber-300 bg-slate-50/50 hover:bg-amber-50/40 transition-all duration-200 cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-700 font-heading transition-colors">
                      {pkg.title}
                    </h4>
                    <span className="text-[11px] font-extrabold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-lg shrink-0">
                      ₹{pkg.price}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Duration: {pkg.duration}</span>
                    <span className="text-amber-600 font-bold group-hover:underline flex items-center gap-0.5">
                      Book Now <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Common Doorstep Issues Tags */}
            {activeCategory.issues && activeCategory.issues.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Common Doorstep Repairs:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.issues.map((issue, idx) => (
                    <span
                      key={idx}
                      onClick={() => {
                        onClose();
                        openBookingModal(activeCategory.id);
                      }}
                      className="text-[11px] bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 px-2.5 py-1 rounded-xl cursor-pointer transition-colors border border-slate-200/80"
                    >
                      {issue.title} (From ₹{issue.startingPrice})
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Mega Menu Footer Bar */}
      <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>45-Minute Doorstep Arrival & 30-Day Post Service Guarantee across all Indore Sectors</span>
        </div>

        <Link
          href="/services"
          onClick={onClose}
          className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1.5 shrink-0"
        >
          <span>View All Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
