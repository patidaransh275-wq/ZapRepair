'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wind, Refrigerator, Shirt, Wrench, PlugZap, Droplets, Flame, 
  Microwave, Fan, UtensilsCrossed, Zap, Wheat, Sparkles, Hammer, 
  Paintbrush, ArrowRight, ChevronRight, CheckCircle2, ShieldCheck,
  Layers, FolderOpen, Plus
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

export const CATEGORY_FOLDERS = [
  {
    id: 'appliance',
    title: 'Appliance Repair',
    subtitle: 'AC, Fridge, Washing Machine, RO, Geyser & more',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    count: '10 Services',
    startingPrice: 199,
    serviceIds: [
      'ac-repair',
      'refrigerator',
      'washing-machine',
      'ro-purifier',
      'geyser',
      'microwave',
      'kitchen-chimney',
      'air-cooler',
      'inverter',
      'atta-chakki'
    ],
    primaryLink: '/services/ac-repair'
  },
  {
    id: 'plumber',
    title: 'Plumbing',
    subtitle: 'Tap & mixer, Drainage, Bath fittings, Water tank, Motor',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    count: '11+ Services',
    startingPrice: 69,
    serviceIds: ['plumber'],
    subItems: [
      { name: 'Bath Fittings & Showers', price: 69, slug: 'plumber' },
      { name: 'Tap, Nozzle & Wall Mixer', price: 149, slug: 'plumber' },
      { name: 'Basin & Sink Drain Fix', price: 149, slug: 'plumber' },
      { name: 'Toilet & Cistern Syphon', price: 199, slug: 'plumber' },
      { name: 'Tile Grouting & Anti-Leak', price: 199, slug: 'plumber' },
      { name: 'Sink & Sewer Blockage Clearing', price: 349, slug: 'plumber' },
      { name: 'Water Tank Cleaning & Motor Pump', price: 399, slug: 'plumber' },
      { name: 'Concealed Pipe Seepage Fix', price: 499, slug: 'plumber' }
    ],
    primaryLink: '/services/plumber'
  },
  {
    id: 'electrician',
    title: 'Electrician',
    subtitle: 'Switchboard, Fan, Lights, MCB, Short Circuit, Wiring',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    count: '8+ Services',
    startingPrice: 149,
    serviceIds: ['electrician'],
    subItems: [
      { name: 'Switchboard & Heavy 16A Socket', price: 149, slug: 'electrician' },
      { name: 'Ceiling & Exhaust Fan Repair', price: 199, slug: 'electrician' },
      { name: 'Lights & Chandelier Assembly', price: 249, slug: 'electrician' },
      { name: 'MCB Tripping & DB Overhaul', price: 399, slug: 'electrician' },
      { name: 'Home Wiring & Fault Finding', price: 499, slug: 'electrician' },
      { name: 'Inverter & Battery Wiring', price: 249, slug: 'electrician' }
    ],
    primaryLink: '/services/electrician'
  },
  {
    id: 'cleaning',
    title: 'Cleaning & Pest',
    subtitle: 'Deep bathroom clean, Kitchen degrease, Sofa & Pest control',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    count: '6+ Services',
    startingPrice: 299,
    serviceIds: ['cleaning-pest-control'],
    subItems: [
      { name: 'Bathroom Deep Cleaning & Descaling', price: 499, slug: 'cleaning-pest-control' },
      { name: 'Kitchen Degreasing & Exhaust Wipe', price: 799, slug: 'cleaning-pest-control' },
      { name: 'Sofa & Mattress Foam Shampoo', price: 299, slug: 'cleaning-pest-control' },
      { name: 'Cockroach & Herbal Pest Control', price: 599, slug: 'cleaning-pest-control' },
      { name: 'Full House Deep Cleaning', price: 1999, slug: 'cleaning-pest-control' }
    ],
    primaryLink: '/services/cleaning-pest-control'
  },
  {
    id: 'carpenter',
    title: 'Carpenter & Paint',
    subtitle: 'Furniture assembly, Locks, Drill & hang, Painting, Putty',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    count: '6+ Services',
    startingPrice: 199,
    serviceIds: ['carpenter', 'painting-waterproofing'],
    subItems: [
      { name: 'Door Lock, Latch & Handle Repair', price: 199, slug: 'carpenter' },
      { name: 'Cupboard Hinge & Channel Fix', price: 249, slug: 'carpenter' },
      { name: 'Drill & Hang (TV, Frames, Curtains)', price: 199, slug: 'carpenter' },
      { name: 'Bed & Flat-Pack Assembly', price: 399, slug: 'carpenter' },
      { name: 'Wall Putty & Touch-up Painting', price: 999, slug: 'painting-waterproofing' },
      { name: 'Wall Dampness & Waterproofing', price: 1499, slug: 'painting-waterproofing' }
    ],
    primaryLink: '/services/carpenter'
  }
];

export default function ServiceTabs() {
  const [activeFolderId, setActiveFolderId] = useState('appliance');
  const { openBookingModal } = useBooking();

  const currentFolder = CATEGORY_FOLDERS.find((f) => f.id === activeFolderId) || CATEGORY_FOLDERS[0];

  // Retrieve matching full service items for the current folder
  const currentServices = currentFolder.serviceIds
    .map((id) => SERVICES_DATA.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section id="services-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-block">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Doorstep Plumbing & Appliance Services
          </h2>
          <p className="text-sm text-slate-600">
            Select a service category folder below to explore nested services, transparent upfront rates, and 45-minute doorstep arrival in Indore.
          </p>
        </div>

        {/* 5 CATEGORY FOLDERS (Horizontal scroll on mobile, 5-col grid on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORY_FOLDERS.map((folder) => {
            const isSelected = activeFolderId === folder.id;
            return (
              <button
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className={`relative rounded-2xl overflow-hidden text-left transition-all duration-300 group flex flex-col justify-between border ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-400 shadow-lg scale-[1.02] bg-white'
                    : 'border-slate-200 hover:border-amber-300 bg-white hover:shadow-md'
                }`}
              >
                {/* Real Trade Photo Thumbnail */}
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-900">
                  <img
                    src={folder.image}
                    alt={folder.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isSelected ? 'scale-110' : 'group-hover:scale-105 opacity-90'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Service Count Badge */}
                  <span className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-slate-700">
                    {folder.count}
                  </span>

                  {/* Active Indicator Tag */}
                  {isSelected && (
                    <span className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                      <FolderOpen className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  )}
                </div>

                {/* Folder Content Info */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className={`text-sm sm:text-base font-extrabold font-heading leading-tight ${
                      isSelected ? 'text-amber-600' : 'text-slate-900 group-hover:text-amber-600'
                    }`}>
                      {folder.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {folder.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[10px] font-semibold">Starts</span>
                    <span className="font-extrabold text-slate-900 font-heading">
                      ₹{folder.startingPrice}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* EXPANDED NESTED SERVICES CONTAINER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-md space-y-6">
          
          {/* Active Folder Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  {currentFolder.title} Services
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {currentFolder.subtitle} • 45-Minute Arrival across Indore
              </p>
            </div>

            <Link
              href={currentFolder.primaryLink}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-all self-start sm:self-auto shrink-0"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* If current folder has main service cards (like Appliance Repair) */}
          {currentFolder.id === 'appliance' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {currentServices.map((srv) => {
                const IconComp = ICON_MAP[srv.iconName] || Wrench;
                return (
                  <div
                    key={srv.id}
                    className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shadow-sm group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <IconComp className="w-5 h-5 stroke-[2.5]" />
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-heading group-hover:text-amber-600 transition-colors">
                          {srv.name}
                        </h4>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200/70 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Starting from</span>
                        <span className="text-base font-extrabold text-slate-900 font-heading">
                          ₹{srv.startingPrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openBookingModal(srv.id)}
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs py-2 rounded-xl shadow-sm transition-all"
                        >
                          Book Service
                        </button>
                        <Link
                          href={`/services/${srv.slug}`}
                          className="p-2 bg-white hover:bg-slate-200 text-slate-700 rounded-xl text-xs border border-slate-200"
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
          ) : (
            /* Sub-services itemized grid for Plumbing, Electrician, Cleaning, Carpenter */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(currentFolder.subItems || []).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-amber-400 hover:shadow-soft-md transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 font-heading group-hover:text-amber-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                        Indore Fast
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[11px] text-slate-500 font-medium">Starts</span>
                      <span className="text-base font-extrabold text-amber-600 font-heading">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/services/${item.slug}`}
                        className="px-2.5 py-1.5 bg-white hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => openBookingModal(item.slug, { title: item.name, price: item.price })}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
