'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, FolderOpen, Plus, Clock, CheckCircle2 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

import {
  // 5 Main Folder Icons
  ToolboxFolderIcon,
  ChromeTapFolderIcon,
  SwitchboardFolderIcon,
  SprayBottleFolderIcon,
  HammerPaintbrushFolderIcon,

  // Appliance Repair Icons (10)
  ACUnitIcon,
  RefrigeratorUnitIcon,
  WashingMachineUnitIcon,
  ROPurifierIcon,
  GeyserIcon,
  MicrowaveUnitIcon,
  AirCoolerIcon,
  KitchenChimneyIcon,
  InverterBatteryIcon,
  AttaChakkiIcon,

  // Plumbing Icons (5)
  ToiletFlushIcon,
  DrainPipeIcon,
  WaterTankIcon,
  BathroomFittingIcon,

  // Electrician Icons (5)
  CeilingFanIcon,
  ChandelierIcon,
  MCBBoxIcon,
  WiringIcon,

  // Pest Control Icons (3)
  CockroachSprayIcon,
  BedBugsIcon,
  TermiteKitIcon,

  // Carpenter & Paint Icons (5)
  FurnitureKitIcon,
  DoorHingeIcon,
  DoorLockIcon,
  PaintRollerIcon,
  WaterproofingTubIcon
} from '../ui/StudioProductIcons';

export const CATEGORY_FOLDERS_DATA = [
  {
    id: 'appliance',
    title: 'Appliance Repair',
    subtitle: 'AC, Refrigerator, Washing Machine, RO & more',
    count: '10 Services',
    startingPrice: 199,
    FolderIcon: ToolboxFolderIcon,
    primaryLink: '/services/ac-repair',
    services: [
      { id: 'ac-repair', name: 'AC Unit Repair & Service', price: 399, slug: 'ac-repair', Icon: ACUnitIcon },
      { id: 'refrigerator', name: 'Refrigerator Repair', price: 299, slug: 'refrigerator', Icon: RefrigeratorUnitIcon },
      { id: 'washing-machine', name: 'Washing Machine Service', price: 299, slug: 'washing-machine', Icon: WashingMachineUnitIcon },
      { id: 'ro-purifier', name: 'RO Purifier Filter Change', price: 199, slug: 'ro-purifier', Icon: ROPurifierIcon },
      { id: 'geyser', name: 'Geyser & Water Heater Fix', price: 249, slug: 'geyser', Icon: GeyserIcon },
      { id: 'microwave', name: 'Microwave Oven Repair', price: 249, slug: 'microwave', Icon: MicrowaveUnitIcon },
      { id: 'air-cooler', name: 'Air Cooler Servicing', price: 199, slug: 'air-cooler', Icon: AirCoolerIcon },
      { id: 'kitchen-chimney', name: 'Kitchen Chimney Deep Clean', price: 499, slug: 'kitchen-chimney', Icon: KitchenChimneyIcon },
      { id: 'inverter', name: 'Inverter Battery Checkup', price: 249, slug: 'inverter', Icon: InverterBatteryIcon },
      { id: 'atta-chakki', name: 'Atta Chakki Motor Repair', price: 249, slug: 'atta-chakki', Icon: AttaChakkiIcon }
    ]
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    subtitle: 'Tap, Flush tank, Drain pipe, Water tank & Fittings',
    count: '5 Key Services',
    startingPrice: 69,
    FolderIcon: ChromeTapFolderIcon,
    primaryLink: '/services/plumber',
    services: [
      { id: 'plm-tap', name: 'Chrome Tap & Mixer Repair', price: 149, slug: 'plumber', Icon: ChromeTapFolderIcon },
      { id: 'plm-toilet', name: 'Toilet Flush Tank & Cistern', price: 199, slug: 'plumber', Icon: ToiletFlushIcon },
      { id: 'plm-drain', name: 'Drain Pipe & Sink Blockage', price: 349, slug: 'plumber', Icon: DrainPipeIcon },
      { id: 'plm-tank', name: 'Overhead Water Tank Clean', price: 499, slug: 'plumber', Icon: WaterTankIcon },
      { id: 'plm-fittings', name: 'Bathroom Fitting & Shower', price: 69, slug: 'plumber', Icon: BathroomFittingIcon }
    ]
  },
  {
    id: 'electrician',
    title: 'Electrician',
    subtitle: 'Switchboard, Fan, Chandelier, MCB & Wiring',
    count: '5 Key Services',
    startingPrice: 149,
    FolderIcon: SwitchboardFolderIcon,
    primaryLink: '/services/electrician',
    services: [
      { id: 'elec-switch', name: 'Switchboard & Socket Repair', price: 149, slug: 'electrician', Icon: SwitchboardFolderIcon },
      { id: 'elec-fan', name: 'Ceiling Fan Installation & Fix', price: 199, slug: 'electrician', Icon: CeilingFanIcon },
      { id: 'elec-light', name: 'Chandelier & LED Lighting', price: 249, slug: 'electrician', Icon: ChandelierIcon },
      { id: 'elec-mcb', name: 'MCB Box & Distribution Panel', price: 399, slug: 'electrician', Icon: MCBBoxIcon },
      { id: 'elec-wiring', name: 'Home Wiring & Fault Finding', price: 499, slug: 'electrician', Icon: WiringIcon }
    ]
  },
  {
    id: 'pest',
    title: 'Pest Control',
    subtitle: 'Cockroaches, Ants, Bed Bugs & Termite Treatment',
    count: '3 Services',
    startingPrice: 599,
    FolderIcon: SprayBottleFolderIcon,
    primaryLink: '/services/cleaning-pest-control',
    services: [
      { 
        id: 'pest-cockroach', 
        name: 'Cockroaches, Ants & General Pest Control', 
        price: 599, 
        slug: 'cleaning-pest-control', 
        rating: '★ 2.00 (6K bookings)',
        Icon: CockroachSprayIcon 
      },
      { 
        id: 'pest-bedbugs', 
        name: 'Bed Bugs Control', 
        price: 799, 
        slug: 'cleaning-pest-control', 
        rating: '★ 2.00 (6K bookings)',
        Icon: BedBugsIcon 
      },
      { 
        id: 'pest-termite', 
        name: 'Termite Control', 
        price: 999, 
        slug: 'cleaning-pest-control', 
        rating: '★ 2.00 (6K bookings)',
        Icon: TermiteKitIcon 
      }
    ]
  },
  {
    id: 'carpenter',
    title: 'Carpenter & Paint',
    subtitle: 'Furniture kit, Hinge, Lock, Paint roller & Waterproofing',
    count: '5 Key Services',
    startingPrice: 199,
    FolderIcon: HammerPaintbrushFolderIcon,
    primaryLink: '/services/carpenter',
    services: [
      { id: 'crp-furn', name: 'Furniture Toolkit & Assembly', price: 399, slug: 'carpenter', Icon: FurnitureKitIcon },
      { id: 'crp-hinge', name: 'Door Hinge & Hydraulic Slider', price: 249, slug: 'carpenter', Icon: DoorHingeIcon },
      { id: 'crp-lock', name: 'Door Lock & Security Latch', price: 199, slug: 'carpenter', Icon: DoorLockIcon },
      { id: 'crp-roller', name: 'Paint Roller Wall Touch-up', price: 999, slug: 'painting-waterproofing', Icon: PaintRollerIcon },
      { id: 'crp-waterproof', name: 'Waterproofing Tub & Anti-Damp', price: 1499, slug: 'painting-waterproofing', Icon: WaterproofingTubIcon }
    ]
  }
];

export default function ServiceTabs() {
  const [activeFolderId, setActiveFolderId] = useState('appliance');
  const { openBookingModal } = useBooking();

  const currentFolder = CATEGORY_FOLDERS_DATA.find((f) => f.id === activeFolderId) || CATEGORY_FOLDERS_DATA[0];

  return (
    <section id="services-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200 inline-block font-heading">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Doorstep Plumbing & Appliance Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select a service category folder to view studio-inspected trade options, instant fixed rates, and 45-minute arrival across Indore.
          </p>
        </div>

        {/* 5 CATEGORY FOLDERS (E-COMMERCE STUDIO-LIT PRODUCT ICON STYLE) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORY_FOLDERS_DATA.map((folder) => {
            const isSelected = activeFolderId === folder.id;
            const FolderIconComponent = folder.FolderIcon;

            return (
              <div
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className={`relative rounded-3xl p-4 sm:p-5 text-center transition-all duration-300 flex flex-col items-center justify-between border bg-white cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 ring-4 ring-amber-400/30 shadow-soft-md scale-[1.03] z-10'
                    : 'border-slate-200 hover:border-amber-300 hover:shadow-soft-sm group'
                }`}
              >
                {/* Photorealistic Product Icon on Clean White Background */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white flex items-center justify-center p-2 mb-3 shadow-inner border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                  <FolderIconComponent className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-sm" />
                </div>

                {/* Text & Badges */}
                <div className="space-y-1 w-full">
                  <h3 className={`text-sm sm:text-base font-extrabold font-heading leading-tight ${
                    isSelected ? 'text-amber-600' : 'text-slate-900 group-hover:text-amber-600'
                  }`}>
                    {folder.title}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
                    <span>{folder.count}</span>
                    <span>•</span>
                    <span className="text-slate-900 font-extrabold font-heading">From ₹{folder.startingPrice}</span>
                  </div>
                </div>

                {/* Book Now Button on Folder Card */}
                <div className="mt-3 w-full">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openBookingModal(folder.primaryLink.replace('/services/', ''));
                    }}
                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* EXPANDED NESTED SERVICES DIRECTORY (STUDIO-LIT ICONS ON WHITE CARDS) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-md space-y-6">
          
          {/* Active Folder Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  {currentFolder.title} Catalog
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {currentFolder.subtitle}
              </p>
            </div>

            <Link
              href={currentFolder.primaryLink}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-900 hover:text-amber-600 bg-slate-100 hover:bg-amber-100 px-4 py-2.5 rounded-xl transition-all self-start sm:self-auto shrink-0"
            >
              <span>Explore All {currentFolder.title} Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
            </Link>
          </div>

          {/* Nested Photorealistic Service Icons Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${currentFolder.services.length <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-5'} gap-4`}>
            {currentFolder.services.map((srv) => {
              const ServiceIconComp = srv.Icon;
              return (
                <div
                  key={srv.id}
                  className="bg-slate-50/70 hover:bg-white rounded-2xl p-4 border border-slate-200 hover:border-amber-400 hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between items-center text-center group"
                >
                  {/* Clean Studio-lit Icon Box */}
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-2 mb-3 group-hover:scale-105 transition-transform duration-300">
                    <ServiceIconComp className="w-12 h-12 drop-shadow-sm" />
                  </div>

                  {/* Title, Rating & Price */}
                  <div className="space-y-1 w-full flex-1 flex flex-col justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading group-hover:text-amber-600 transition-colors line-clamp-2">
                      {srv.name}
                    </h4>

                    {/* Star Rating & Booking count */}
                    {srv.rating && (
                      <div className="mt-1 inline-flex items-center justify-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200/60">
                        <span>{srv.rating}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between w-full mt-2">
                      <span className="text-[11px] font-bold text-slate-500">Starts</span>
                      <span className="text-sm font-extrabold text-slate-900 font-heading">
                        ₹{srv.price}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center gap-1.5 w-full mt-2">
                    <button
                      onClick={() => openBookingModal(srv.slug, { title: srv.name, price: srv.price })}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs py-2 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </button>
                    <Link
                      href={`/services/${srv.slug}`}
                      className="p-2 bg-white hover:bg-slate-200 text-slate-700 rounded-xl text-xs border border-slate-200"
                      title="View Details"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
