'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  Wrench, 
  PlugZap, 
  Wind, 
  Refrigerator, 
  Shirt, 
  Fan, 
  Droplets, 
  Microwave, 
  UtensilsCrossed, 
  Wheat, 
  Flame, 
  BatteryCharging,
  Sparkles,
  Hammer,
  Paintbrush
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const ALL_SERVICES_CATEGORIZED = [
  {
    category: 'Core Home Services',
    services: [
      {
        id: 'plumber',
        name: 'Plumber Services',
        slug: 'plumber',
        icon: Wrench,
        startingPrice: 149
      },
      {
        id: 'electrician',
        name: 'Electrician Services',
        slug: 'electrician',
        icon: PlugZap,
        startingPrice: 149
      },
      {
        id: 'carpenter',
        name: 'Carpenter Services',
        slug: 'carpenter',
        icon: Hammer,
        startingPrice: 199
      }
    ]
  },
  {
    category: 'Large Appliances',
    services: [
      {
        id: 'ac-repair',
        name: 'AC Repair & Service',
        slug: 'ac-repair',
        icon: Wind,
        startingPrice: 399
      },
      {
        id: 'refrigerator',
        name: 'Refrigerator Repair',
        slug: 'refrigerator',
        icon: Refrigerator,
        startingPrice: 299
      },
      {
        id: 'washing-machine',
        name: 'Washing Machine Repair',
        slug: 'washing-machine',
        icon: Shirt,
        startingPrice: 349
      },
      {
        id: 'air-cooler',
        name: 'Air Cooler Repair',
        slug: 'air-cooler',
        icon: Fan,
        startingPrice: 199
      }
    ]
  },
  {
    category: 'Kitchen & Small Appliances',
    services: [
      {
        id: 'ro-purifier',
        name: 'RO Purifier Repair',
        slug: 'ro-purifier',
        icon: Droplets,
        startingPrice: 299
      },
      {
        id: 'microwave',
        name: 'Microwave Repair',
        slug: 'microwave',
        icon: Microwave,
        startingPrice: 299
      },
      {
        id: 'kitchen-chimney',
        name: 'Kitchen Chimney Repair',
        slug: 'kitchen-chimney',
        icon: UtensilsCrossed,
        startingPrice: 399
      },
      {
        id: 'atta-chakki',
        name: 'Atta Chakki Repair',
        slug: 'atta-chakki',
        icon: Wheat,
        startingPrice: 349
      }
    ]
  },
  {
    category: 'Cleaning & Home Care',
    services: [
      {
        id: 'cleaning-pest-control',
        name: 'Cleaning & Pest Control',
        slug: 'cleaning-pest-control',
        icon: Sparkles,
        startingPrice: 499
      },
      {
        id: 'painting-waterproofing',
        name: 'Painting & Waterproofing',
        slug: 'painting-waterproofing',
        icon: Paintbrush,
        startingPrice: 999
      }
    ]
  },
  {
    category: 'Utilities',
    services: [
      {
        id: 'geyser',
        name: 'Geyser Repair',
        slug: 'geyser',
        icon: Flame,
        startingPrice: 299
      },
      {
        id: 'inverter',
        name: 'Inverter & Battery',
        slug: 'inverter',
        icon: BatteryCharging,
        startingPrice: 299
      }
    ]
  }
];

export default function AllServicesModal({ isOpen: propIsOpen, onClose: propOnClose, onSelectService }) {
  const bookingCtx = useBooking() || {};
  const { isAllServicesModalOpen, closeAllServicesModal, openBookingModal } = bookingCtx;

  const isOpen = propIsOpen !== undefined ? propIsOpen : isAllServicesModalOpen;
  const onClose = propOnClose || closeAllServicesModal;

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCardClick = (service) => {
    if (onSelectService) {
      onSelectService(service);
    } else if (openBookingModal) {
      openBookingModal(service.id);
    }
    onClose?.();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-all-services-title"
    >
      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl md:rounded-[32px] max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Urban Company Equivalent Indore Catalogue
              </span>
            </div>
            <h2 
              id="modal-all-services-title" 
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight"
            >
              All Services
            </h2>
          </div>

          {/* Close (X) Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close All Services modal"
            className="w-10 h-10 rounded-full bg-[#F3F4F6] hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body: Categorized Sections */}
        <div className="overflow-y-auto py-6 space-y-8 pr-1 flex-1 scrollbar-thin scrollbar-thumb-slate-200">
          {ALL_SERVICES_CATEGORIZED.map((section, idx) => (
            <div key={idx} className="space-y-4">
              
              {/* Category Title */}
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 font-heading flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>{section.category}</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">
                  {section.services.length} {section.services.length === 1 ? 'Service' : 'Services'}
                </span>
              </div>

              {/* Service Cards Responsive Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {section.services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleCardClick(service)}
                      className="flex flex-col items-center group cursor-pointer focus:outline-none text-left"
                    >
                      {/* Gray Container (#F3F4F6) with rounded corners and fixed dimensions */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-[#F3F4F6] flex items-center justify-center transition-all duration-200 group-hover:bg-amber-50 group-hover:shadow-md group-hover:scale-105 border border-transparent group-hover:border-amber-200/80 shrink-0">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-slate-800 group-hover:text-amber-600 transition-colors stroke-[1.75]" />
                      </div>

                      {/* Clean Small Sans-Serif Text Label Centered Below */}
                      <span className="text-[11px] sm:text-xs font-medium text-slate-700 text-center mt-2 leading-tight line-clamp-2 max-w-[76px] sm:max-w-[96px] group-hover:text-slate-950 group-hover:font-semibold transition-colors">
                        {service.name}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">45-minute doorstep arrival across Indore</span>
            <span className="sm:hidden">45-min arrival in Indore</span>
          </div>

          <div className="text-[11px] font-semibold text-amber-600">
            Fixed Upfront Rate Cards
          </div>
        </div>

      </div>
    </div>
  );
}
