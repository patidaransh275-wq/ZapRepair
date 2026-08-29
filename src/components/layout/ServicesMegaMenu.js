'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, Sparkles, ArrowRight, ShieldCheck, Clock, ChevronRight
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { 
  ACIcon, 
  WashingMachineIcon, 
  RefrigeratorIcon, 
  MicrowaveIcon, 
  ROPurifierIcon, 
  GeyserIcon, 
  PlumberIcon, 
  ElectricianIcon, 
  CleaningIcon, 
  CarpenterIcon, 
  PaintingIcon, 
  ChimneyIcon, 
  AirCoolerIcon, 
  InverterIcon, 
  AttaChakkiIcon 
} from '../ui/ApplianceIcons';

export const UC_SERVICES_SECTIONS = [
  {
    sectionTitle: 'Large appliances',
    services: [
      { id: 'ac-repair', name: 'AC', slug: 'ac-repair', startingPrice: 399, Icon: ACIcon },
      { id: 'washing-machine', name: 'Washing Machine', slug: 'washing-machine', startingPrice: 349, Icon: WashingMachineIcon },
      { id: 'refrigerator', name: 'Refrigerator Repair', slug: 'refrigerator', startingPrice: 299, Icon: RefrigeratorIcon },
      { id: 'air-cooler', name: 'Air Cooler', slug: 'air-cooler', startingPrice: 199, Icon: AirCoolerIcon }
    ]
  },
  {
    sectionTitle: 'Other appliances',
    services: [
      { id: 'microwave', name: 'Microwave', slug: 'microwave', startingPrice: 299, Icon: MicrowaveIcon },
      { id: 'ro-purifier', name: 'RO/Water Purifier', slug: 'ro-purifier', startingPrice: 299, Icon: ROPurifierIcon },
      { id: 'geyser', name: 'Geyser', slug: 'geyser', startingPrice: 299, Icon: GeyserIcon },
      { id: 'kitchen-chimney', name: 'Kitchen Chimney', slug: 'kitchen-chimney', startingPrice: 399, Icon: ChimneyIcon },
      { id: 'inverter', name: 'Inverter & Battery', slug: 'inverter', startingPrice: 299, Icon: InverterIcon },
      { id: 'atta-chakki', name: 'Atta Chakki', slug: 'atta-chakki', startingPrice: 349, Icon: AttaChakkiIcon }
    ]
  },
  {
    sectionTitle: 'Electrician, Plumber & Home Care',
    services: [
      { id: 'plumber', name: 'Plumber Services', slug: 'plumber', startingPrice: 149, Icon: PlumberIcon },
      { id: 'electrician', name: 'Electrician Services', slug: 'electrician', startingPrice: 149, Icon: ElectricianIcon },
      { id: 'carpenter', name: 'Carpenter Services', slug: 'carpenter', startingPrice: 199, Icon: CarpenterIcon },
      { id: 'cleaning-pest-control', name: 'Cleaning & Pest', slug: 'cleaning-pest-control', startingPrice: 499, Icon: CleaningIcon },
      { id: 'painting-waterproofing', name: 'Painting & Dampness', slug: 'painting-waterproofing', startingPrice: 999, Icon: PaintingIcon }
    ]
  }
];

export default function ServicesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const { openBookingModal } = useBooking();

  if (!isOpen) return null;

  const handleCardClick = (serviceId) => {
    onClose?.();
    openBookingModal(serviceId);
  };

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[calc(100vw-2rem)] max-w-5xl z-50 transition-all duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white border border-slate-200/90 rounded-3xl md:rounded-[32px] shadow-2xl overflow-hidden text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
        
        {/* Mega Menu Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Doorstep Catalogue
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 45-min arrival in Indore
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
              AC & Appliance Repair
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close mega menu"
            className="w-9 h-9 rounded-full bg-[#F3F4F6] hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all duration-150 focus:outline-none"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mega Menu Body: Urban Company Style Categorized Sections */}
        <div className="p-6 sm:p-8 space-y-7 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          {UC_SERVICES_SECTIONS.map((sec, idx) => (
            <div key={idx} className="space-y-3.5">
              
              {/* Section Subheading */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                <span>{sec.sectionTitle}</span>
              </h3>

              {/* Service Cards Responsive Grid matching Urban Company visual layout */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3.5 sm:gap-5">
                {sec.services.map((item) => {
                  const IconComp = item.Icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleCardClick(item.id)}
                      className="flex flex-col items-center group cursor-pointer focus:outline-none text-center"
                    >
                      {/* Light Gray Container (#F3F4F6) with rounded corners */}
                      <div className="w-full aspect-[4/3] max-h-[85px] sm:max-h-[95px] rounded-2xl bg-[#F3F4F6] hover:bg-amber-50/60 border border-transparent hover:border-amber-300/80 flex items-center justify-center p-2.5 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md shrink-0">
                        <IconComp className="w-full h-full max-h-[50px] object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
                      </div>

                      {/* Clean Small Sans-Serif Text Label Centered Below */}
                      <span className="text-[11px] sm:text-xs font-medium text-slate-700 group-hover:text-slate-950 group-hover:font-bold text-center mt-2 leading-tight line-clamp-2 transition-colors max-w-[100px]">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Mega Menu Footer Bar */}
        <div className="bg-slate-900 text-white px-6 sm:px-8 py-3.5 flex items-center justify-between border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Transparent fixed rate cards & 30-day post service warranty across all Indore Sectors</span>
            <span className="sm:hidden">Fixed rates & 30-day warranty in Indore</span>
          </div>

          <Link
            href="/services"
            onClick={onClose}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
