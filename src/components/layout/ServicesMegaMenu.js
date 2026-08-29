'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  PlugZap, 
  Wind, 
  Sparkles, 
  Hammer, 
  Paintbrush, 
  Refrigerator, 
  UtensilsCrossed, 
  Flame, 
  ChevronRight, 
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const MEGA_MENU_CATEGORIES = [
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    headerTitle: 'PLUMBING SERVICES',
    serviceKey: 'plumber',
    icon: Wrench,
    services: [
      {
        title: 'Tap, Nozzle & Mixer Repair',
        description: 'Fixing dripping taps, washer replacement & single lever basin mixer repair'
      },
      {
        title: 'Toilet & Flush Tank Service',
        description: 'Cistern syphon, flush button, jet spray & Western/Indian commode leak fix'
      },
      {
        title: 'Drainage & Blockage Removal',
        description: 'Heavy snake unblocking for clogged kitchen sinks, washbasins & floor traps'
      },
      {
        title: 'Water Tank & Motor Pump Fitting',
        description: 'Tank deep cleaning (up to 1000L), auto level controller & pump connection'
      },
      {
        title: 'Bathroom Fittings & Shower',
        description: 'Overhead shower arm replacement, towel rod, mirror & health faucet fitting'
      },
      {
        title: 'Concealed Pipe Seepage Fix',
        description: 'Wall dampness detection, CPVC/PVC pipeline leak repair & pressure jointing'
      }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical Services',
    headerTitle: 'ELECTRICAL SERVICES',
    serviceKey: 'electrician',
    icon: PlugZap,
    services: [
      {
        title: 'Switchboard & Power Socket Repair',
        description: 'Modular switch replacement, 16A heavy power sockets & fan regulator fix'
      },
      {
        title: 'Ceiling Fan & Wall Fan Repair',
        description: 'Fan installation/uninstallation, motor capacitor change & bearing greasing'
      },
      {
        title: 'Lights & Chandelier Installation',
        description: 'False ceiling LED cob lights, tube lights & decorative chandelier assembly'
      },
      {
        title: 'MCB & Distribution Box Safety',
        description: 'Tripping MCB replacement, main RCCB breaker & 3-phase DB box overhaul'
      },
      {
        title: 'Home Wiring & Short Circuit Fix',
        description: 'Emergency short circuit fault finding with digital multimeter & copper wiring'
      },
      {
        title: 'Inverter & UPS Line Wiring',
        description: 'Dedicated inverter input/output wiring, bypass switch & battery socket'
      }
    ]
  },
  {
    id: 'ac-cooling',
    name: 'AC & Cooling',
    headerTitle: 'AC & COOLING SERVICES',
    serviceKey: 'ac-repair',
    icon: Wind,
    services: [
      {
        title: 'Power Foam Jet Service',
        description: 'Deep foam jet cleaning of indoor cooling coils, outdoor condenser & drain flush'
      },
      {
        title: 'Gas Refill & Leak Fix',
        description: 'Nitrogen pressure testing, copper brazing & full R32 / R410 refrigerant charging'
      },
      {
        title: 'AC Inspection & Diagnostics',
        description: 'Complete electrical, PCB, compressor & cooling temperature checkup'
      },
      {
        title: 'Split AC Installation / Removal',
        description: 'Precision wall mounting, outdoor bracket installation & copper pipe connectivity'
      },
      {
        title: 'Air Cooler Repair & Service',
        description: 'Honeycomb pad replacement, submersible pump change & motor overhaul'
      }
    ]
  },
  {
    id: 'cleaning-pest',
    name: 'Cleaning & Pest Control',
    headerTitle: 'CLEANING & PEST CONTROL',
    serviceKey: 'cleaning-pest-control',
    icon: Sparkles,
    services: [
      {
        title: 'Bathroom Deep Cleaning',
        description: 'Hard water tile stain removal, toilet bowl sanitization & chrome tap shine'
      },
      {
        title: 'Kitchen Deep Degreasing',
        description: 'Oil grease removal from tiles, slab, cabinets, gas stove & exhaust'
      },
      {
        title: 'Sofa & Carpet Shampooing',
        description: 'High-pressure foam injection & vacuum extraction for fabric and leather sofas'
      },
      {
        title: 'Full Home Deep Cleaning',
        description: 'Complete 1/2/3 BHK floor scrub, dusting, cobweb removal & window tracks'
      },
      {
        title: 'Herbal Cockroach Pest Control',
        description: '100% odorless herbal gel baiting & kitchen drain pest treatment'
      }
    ]
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Repairs',
    headerTitle: 'CARPENTRY & WOODWORK',
    serviceKey: 'carpenter',
    icon: Hammer,
    services: [
      {
        title: 'Door Locks & Latches Fix',
        description: 'Main door mortise lock, handle, digital lock & tower bolt installation'
      },
      {
        title: 'Cupboard & Drawer Hinges',
        description: 'Hydraulic soft-close hinges, drawer channel & slider alignment'
      },
      {
        title: 'Bed & Furniture Assembly',
        description: 'Wooden double bed assembly, wardrobe dismantle & modular furniture re-fixing'
      },
      {
        title: 'Drill & Wall Hanging Service',
        description: 'Wall art, mirror, LCD TV bracket, curtain rods & wall shelves mounting'
      }
    ]
  },
  {
    id: 'painting',
    name: 'Painting & Waterproofing',
    headerTitle: 'PAINTING & WATERPROOFING',
    serviceKey: 'painting-waterproofing',
    icon: Paintbrush,
    services: [
      {
        title: 'Wall Putty & Crack Touch-Up',
        description: 'Wall crack filling, Birla white putty leveling & sandpaper smoothness'
      },
      {
        title: 'Wall Dampness & Moisture Fix',
        description: 'Waterproofing chemical primer barrier, anti-fungal coat & seepage treatment'
      },
      {
        title: 'Full Room / Home Painting',
        description: 'Premium emulsion roller painting with Asian Paints & Berger interior finishes'
      },
      {
        title: 'Ceiling Water Leakage Seal',
        description: 'Terrace & bathroom ceiling waterproofing coating & elastomeric membrane'
      }
    ]
  },
  {
    id: 'large-appliances',
    name: 'Large Appliances',
    headerTitle: 'LARGE APPLIANCES',
    serviceKey: 'refrigerator',
    icon: Refrigerator,
    services: [
      {
        title: 'Refrigerator Repair & Gas Refill',
        description: 'Single/double door cooling fix, inverter PCB & defrost thermostat change'
      },
      {
        title: 'Washing Machine Repair',
        description: 'Front/top load drum descaling, motor belt & drain pump replacement'
      },
      {
        title: 'Deep Freezer & Chiller Repair',
        description: 'Commercial chest freezer cooling coil, thermostat & compressor servicing'
      }
    ]
  },
  {
    id: 'kitchen-appliances',
    name: 'Kitchen & Small Appliances',
    headerTitle: 'KITCHEN & SMALL APPLIANCES',
    serviceKey: 'ro-purifier',
    icon: UtensilsCrossed,
    services: [
      {
        title: 'RO Water Purifier Repair',
        description: 'Complete filter replacement kit, RO membrane, booster pump & TDS adjustment'
      },
      {
        title: 'Kitchen Chimney Repair',
        description: 'Deep degreasing, baffle filter cleaning & heavy suction motor servicing'
      },
      {
        title: 'Microwave Oven Repair',
        description: 'Magnetron heating replacement, high-voltage diode & touchpad PCB fix'
      },
      {
        title: 'Domestic Atta Chakki Repair',
        description: 'Flour mill motor repair, cutter sharpening & grinding stone alignment'
      }
    ]
  },
  {
    id: 'utilities',
    name: 'Geyser & Power Utilities',
    headerTitle: 'GEYSER & POWER UTILITIES',
    serviceKey: 'geyser',
    icon: Flame,
    services: [
      {
        title: 'Geyser Repair & Element Change',
        description: 'Copper heating element replacement, thermostat calibration & wall mounting'
      },
      {
        title: 'Inverter & Battery Diagnostics',
        description: 'Inverter PCB repair, battery gravity test & distilled acid top-up'
      },
      {
        title: 'Solar Water Heater Maintenance',
        description: 'Manifold tube descaling, temperature sensor & tank leak fix'
      }
    ]
  }
];

export default function ServicesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const [activeCategoryId, setActiveCategoryId] = useState('plumbing');
  const { openBookingModal } = useBooking();

  if (!isOpen) return null;

  const activeCategory = MEGA_MENU_CATEGORIES.find((cat) => cat.id === activeCategoryId) || MEGA_MENU_CATEGORIES[0];

  const handleServiceClick = (serviceTitle) => {
    onClose?.();
    openBookingModal(activeCategory.serviceKey);
  };

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[calc(100vw-2rem)] max-w-5xl z-50 transition-all duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
        
        {/* Mega Menu Body */}
        <div className="flex min-h-[420px]">
          
          {/* Left Column: Categories List */}
          <div className="w-[34%] max-w-[290px] bg-slate-50/80 border-r border-slate-200/80 p-3 space-y-1 overflow-y-auto max-h-[490px] scrollbar-thin scrollbar-thumb-slate-200">
            <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              CATEGORIES
            </div>

            {MEGA_MENU_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              const isSelected = category.id === activeCategoryId;

              return (
                <button
                  key={category.id}
                  onMouseEnter={() => setActiveCategoryId(category.id)}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 text-xs font-semibold ${
                    isSelected
                      ? 'bg-slate-200/90 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <IconComponent className={`w-4 h-4 shrink-0 transition-colors ${
                      isSelected ? 'text-amber-600 stroke-[2.2]' : 'text-slate-500'
                    }`} />
                    <span className="truncate">{category.name}</span>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-slate-950 translate-x-0.5' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}

            {/* Bottom "See all skills / See all services" link */}
            <div className="pt-3 px-3">
              <Link
                href="/services"
                onClick={onClose}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 transition-colors"
              >
                <span>See all services</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2-Column Services Grid */}
          <div className="flex-1 p-6 sm:p-7 bg-white flex flex-col justify-between overflow-y-auto max-h-[490px] scrollbar-thin scrollbar-thumb-slate-200">
            <div className="space-y-4">
              
              {/* Category Header Heading */}
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  {activeCategory.headerTitle}
                </span>
              </div>

              {/* 2-Column Grid with Bold Titles and Descriptions Underneath */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-1">
                {activeCategory.services.map((srv, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleServiceClick(srv.title)}
                    className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group space-y-0.5"
                  >
                    {/* Bold Service Title */}
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {srv.title}
                    </h4>

                    {/* Short Description Underneath */}
                    <p className="text-[11px] text-slate-500 leading-relaxed group-hover:text-slate-600">
                      {srv.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Quick booking link banner at bottom of right panel */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>45-Minute Doorstep Arrival across Indore</span>
              </div>

              <Link
                href={`/services/${activeCategory.serviceKey}`}
                onClick={onClose}
                className="font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 group"
              >
                <span>View Category Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
