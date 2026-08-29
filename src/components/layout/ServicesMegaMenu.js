'use client';

import React from 'react';
import Link from 'next/link';
import { 
  X, Sparkles, ArrowRight, Clock, ChevronRight
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
      { 
        id: 'ac-repair', 
        name: 'AC Repair & Service', 
        description: 'Power jet wash, gas refill, cooling diagnostics & split AC installation',
        slug: 'ac-repair', 
        startingPrice: 399, 
        Icon: ACIcon 
      },
      { 
        id: 'washing-machine', 
        name: 'Washing Machine Repair', 
        description: 'Front & top load drum descaling, motor belt & spin drainage repair',
        slug: 'washing-machine', 
        startingPrice: 349, 
        Icon: WashingMachineIcon 
      },
      { 
        id: 'refrigerator', 
        name: 'Refrigerator Repair', 
        description: 'Gas charging, inverter PCB repair, defrost thermostat & cooling fixes',
        slug: 'refrigerator', 
        startingPrice: 299, 
        Icon: RefrigeratorIcon 
      },
      { 
        id: 'air-cooler', 
        name: 'Air Cooler Repair', 
        description: 'Honeycomb pad replacement, submersible pump & complete overhaul',
        slug: 'air-cooler', 
        startingPrice: 199, 
        Icon: AirCoolerIcon 
      }
    ]
  },
  {
    sectionTitle: 'Other appliances & Utilities',
    services: [
      { 
        id: 'ro-purifier', 
        name: 'RO / Water Purifier', 
        description: 'Complete filter kit replacement, RO membrane, pump & TDS balancing',
        slug: 'ro-purifier', 
        startingPrice: 299, 
        Icon: ROPurifierIcon 
      },
      { 
        id: 'geyser', 
        name: 'Geyser Repair', 
        description: 'Copper heating element, thermostat replacement & wall mounting',
        slug: 'geyser', 
        startingPrice: 299, 
        Icon: GeyserIcon 
      },
      { 
        id: 'microwave', 
        name: 'Microwave Repair', 
        description: 'Magnetron heating repair, high-voltage diode, touchpad & PCB fix',
        slug: 'microwave', 
        startingPrice: 299, 
        Icon: MicrowaveIcon 
      },
      { 
        id: 'kitchen-chimney', 
        name: 'Kitchen Chimney', 
        description: 'Deep degreasing, baffle filter cleaning, suction motor & duct service',
        slug: 'kitchen-chimney', 
        startingPrice: 399, 
        Icon: ChimneyIcon 
      },
      { 
        id: 'inverter', 
        name: 'Inverter & Battery', 
        description: 'Inverter PCB troubleshooting, battery gravity check & acid top-up',
        slug: 'inverter', 
        startingPrice: 299, 
        Icon: InverterIcon 
      },
      { 
        id: 'atta-chakki', 
        name: 'Atta Chakki Repair', 
        description: 'Domestic flour mill motor repair, cutter sharpening & stone alignment',
        slug: 'atta-chakki', 
        startingPrice: 349, 
        Icon: AttaChakkiIcon 
      }
    ]
  },
  {
    sectionTitle: 'Electrician, Plumber & Home Care',
    services: [
      { 
        id: 'plumber', 
        name: 'Plumber Services', 
        description: 'Taps, wall mixers, toilet flush leakage & drain blockage unblocking',
        slug: 'plumber', 
        startingPrice: 149, 
        Icon: PlumberIcon 
      },
      { 
        id: 'electrician', 
        name: 'Electrician Services', 
        description: 'Switchboard wiring, ceiling fans, MCB fuse box & short circuit fix',
        slug: 'electrician', 
        startingPrice: 149, 
        Icon: ElectricianIcon 
      },
      { 
        id: 'carpenter', 
        name: 'Carpenter Services', 
        description: 'Door locks, handles, wardrobe hinges, bed assembly & wall drilling',
        slug: 'carpenter', 
        startingPrice: 199, 
        Icon: CarpenterIcon 
      },
      { 
        id: 'cleaning-pest-control', 
        name: 'Cleaning & Pest Control', 
        description: 'Bathroom deep scrub, kitchen degreasing, sofa wash & cockroach control',
        slug: 'cleaning-pest-control', 
        startingPrice: 499, 
        Icon: CleaningIcon 
      },
      { 
        id: 'painting-waterproofing', 
        name: 'Painting & Dampness Fix', 
        description: 'Wall dampness moisture barrier, wall putty & full room painting',
        slug: 'painting-waterproofing', 
        startingPrice: 999, 
        Icon: PaintingIcon 
      }
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
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[calc(100vw-2rem)] max-w-6xl z-50 transition-all duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white border border-slate-200/90 rounded-3xl md:rounded-[32px] shadow-2xl overflow-hidden text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
        
        {/* Mega Menu Header */}
        <div className="px-6 sm:px-8 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Doorstep Catalogue
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 45-minute arrival across Indore
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
              Home Services & Appliance Repair
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

        {/* Mega Menu Body: Categorized Sections with Service Descriptions & Icons */}
        <div className="p-6 sm:p-8 space-y-7 max-h-[72vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          {UC_SERVICES_SECTIONS.map((sec, idx) => (
            <div key={idx} className="space-y-3.5">
              
              {/* Section Subheading */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>{sec.sectionTitle}</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  {sec.services.length} Services
                </span>
              </div>

              {/* Service Cards Responsive Grid with Icons, Names, Descriptions & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {sec.services.map((item) => {
                  const IconComp = item.Icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item.id)}
                      className="p-3.5 rounded-2xl bg-slate-50/60 hover:bg-amber-50/50 border border-slate-200/70 hover:border-amber-400/80 transition-all duration-200 group cursor-pointer flex items-center gap-3.5 shadow-sm hover:shadow-md"
                    >
                      {/* Gray Icon Container (#F3F4F6) with vector appliance graphic */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F3F4F6] group-hover:bg-white border border-slate-200/60 group-hover:border-amber-200 flex items-center justify-center p-2 shrink-0 transition-all duration-200 group-hover:scale-105 shadow-inner">
                        <IconComp className="w-full h-full max-h-[38px] object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-110" />
                      </div>

                      {/* Service Details: Name, Description & Starting Price */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 font-heading transition-colors truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-extrabold text-slate-800 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shrink-0">
                            ₹{item.startingPrice}
                          </span>
                        </div>

                        {/* Service Description */}
                        <p className="text-[11px] text-slate-500 group-hover:text-slate-700 leading-snug line-clamp-2 transition-colors">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 group-hover:text-amber-700 pt-0.5">
                          <span>Book Doorstep Pro</span>
                          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
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
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
