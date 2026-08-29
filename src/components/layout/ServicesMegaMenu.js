'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, Sparkles, ArrowRight, Clock, ChevronRight, Plus, FolderOpen, ShieldCheck
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

  // Cleaning & Pest Icons (5)
  VacuumCleanerIcon,
  SofaBrushIcon,
  BathroomKitIcon,
  CockroachSprayIcon,
  TermiteKitIcon,

  // Carpenter & Paint Icons (5)
  FurnitureKitIcon,
  DoorHingeIcon,
  DoorLockIcon,
  PaintRollerIcon,
  WaterproofingTubIcon
} from '../ui/StudioProductIcons';

export const MEGA_MENU_CATEGORIES = [
  {
    id: 'appliance',
    title: 'Appliance Repair',
    subtitle: 'AC, Refrigerator, Washing Machine, RO & more',
    count: '10 Services',
    startingPrice: 199,
    FolderIcon: ToolboxFolderIcon,
    primaryLink: '/services/ac-repair',
    services: [
      { id: 'ac-repair', name: 'AC Unit Repair & Service', desc: 'Power jet wash, gas leak fix & cooling check', price: 399, slug: 'ac-repair', Icon: ACUnitIcon },
      { id: 'refrigerator', name: 'Refrigerator Repair', desc: 'Gas charging, defrost thermostat & inverter PCB', price: 299, slug: 'refrigerator', Icon: RefrigeratorUnitIcon },
      { id: 'washing-machine', name: 'Washing Machine Service', desc: 'Drum descaling, drain pump & motor belt fix', price: 299, slug: 'washing-machine', Icon: WashingMachineUnitIcon },
      { id: 'ro-purifier', name: 'RO Purifier Filter Change', desc: 'Sediment, carbon filters & membrane renewal', price: 199, slug: 'ro-purifier', Icon: ROPurifierIcon },
      { id: 'geyser', name: 'Geyser & Water Heater Fix', desc: 'Copper heating element, thermostat & mounting', price: 249, slug: 'geyser', Icon: GeyserIcon },
      { id: 'microwave', name: 'Microwave Oven Repair', desc: 'Magnetron heating, diode, touchpad & PCB', price: 249, slug: 'microwave', Icon: MicrowaveUnitIcon },
      { id: 'air-cooler', name: 'Air Cooler Servicing', desc: 'Honeycomb pad change, pump & motor overhaul', price: 199, slug: 'air-cooler', Icon: AirCoolerIcon },
      { id: 'kitchen-chimney', name: 'Kitchen Chimney Deep Clean', desc: 'Degreasing, baffle filter scrub & motor suction', price: 499, slug: 'kitchen-chimney', Icon: KitchenChimneyIcon },
      { id: 'inverter', name: 'Inverter Battery Checkup', desc: 'Charging circuit, battery gravity & acid top-up', price: 249, slug: 'inverter', Icon: InverterBatteryIcon },
      { id: 'atta-chakki', name: 'Atta Chakki Motor Repair', desc: 'Cutter sharpening, stone alignment & motor check', price: 249, slug: 'atta-chakki', Icon: AttaChakkiIcon }
    ]
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    subtitle: 'Tap, Flush tank, Drain pipe, Water tank & Fittings',
    count: '6 Key Services',
    startingPrice: 69,
    FolderIcon: ChromeTapFolderIcon,
    primaryLink: '/services/plumber',
    services: [
      { id: 'plm-main', name: 'Plumber Full Service & Inspection', desc: 'Complete home pipeline & sanitary checkup', price: 149, slug: 'plumber', Icon: ChromeTapFolderIcon },
      { id: 'plm-tap', name: 'Chrome Tap & Mixer Repair', desc: 'Spindle change, leaking tap & wall mixer fix', price: 149, slug: 'plumber', Icon: ChromeTapFolderIcon },
      { id: 'plm-toilet', name: 'Toilet Flush Tank & Cistern', desc: 'Syphon replacement, push button & jet spray', price: 199, slug: 'plumber', Icon: ToiletFlushIcon },
      { id: 'plm-drain', name: 'Drain Pipe & Sink Blockage', desc: 'Heavy-duty steel snake blockage clearing', price: 349, slug: 'plumber', Icon: DrainPipeIcon },
      { id: 'plm-tank', name: 'Overhead Water Tank Clean', desc: 'Pressure wash, sludge removal & UV sanitize', price: 499, slug: 'plumber', Icon: WaterTankIcon },
      { id: 'plm-fittings', name: 'Bathroom Fitting & Shower', desc: 'Overhead shower arm, towel rods & soap holder', price: 69, slug: 'plumber', Icon: BathroomFittingIcon }
    ]
  },
  {
    id: 'electrician',
    title: 'Electrician',
    subtitle: 'Switchboard, Fan, Chandelier, MCB & Wiring',
    count: '6 Key Services',
    startingPrice: 149,
    FolderIcon: SwitchboardFolderIcon,
    primaryLink: '/services/electrician',
    services: [
      { id: 'elec-main', name: 'Electrician Full Service Inspection', desc: 'Doorstep electrical diagnostics & multimeter check', price: 149, slug: 'electrician', Icon: SwitchboardFolderIcon },
      { id: 'elec-switch', name: 'Switchboard & Socket Repair', desc: 'Modular switch replacement & 16A power socket', price: 149, slug: 'electrician', Icon: SwitchboardFolderIcon },
      { id: 'elec-fan', name: 'Ceiling Fan Installation & Fix', desc: 'Capacitor change, bearing greasing & mounting', price: 199, slug: 'electrician', Icon: CeilingFanIcon },
      { id: 'elec-light', name: 'Chandelier & LED Lighting', desc: 'False ceiling COB lights, batten & chandelier', price: 249, slug: 'electrician', Icon: ChandelierIcon },
      { id: 'elec-mcb', name: 'MCB Box & Distribution Panel', desc: 'Tripping breaker fix, RCCB & DB box overhaul', price: 399, slug: 'electrician', Icon: MCBBoxIcon },
      { id: 'elec-wiring', name: 'Home Wiring & Fault Finding', desc: 'Short circuit tracing, casing & concealed copper wiring', price: 499, slug: 'electrician', Icon: WiringIcon }
    ]
  },
  {
    id: 'cleaning',
    title: 'Cleaning & Pest',
    subtitle: 'Vacuum, Sofa brush, Bath kit, Pest spray & Termite',
    count: '6 Key Services',
    startingPrice: 299,
    FolderIcon: SprayBottleFolderIcon,
    primaryLink: '/services/cleaning-pest-control',
    services: [
      { id: 'cln-main', name: 'Cleaning & Pest Control Package', desc: 'Hospital-grade sanitization & doorstep care', price: 499, slug: 'cleaning-pest-control', Icon: SprayBottleFolderIcon },
      { id: 'cln-vacuum', name: 'Vacuum Cleaner Full House', desc: 'Deep extraction floor, window & corner vacuuming', price: 1999, slug: 'cleaning-pest-control', Icon: VacuumCleanerIcon },
      { id: 'cln-sofa', name: 'Sofa Cleaning Brush & Foam', desc: 'Mechanized fabric shampooing & dust mite removal', price: 299, slug: 'cleaning-pest-control', Icon: SofaBrushIcon },
      { id: 'cln-bath', name: 'Bathroom Cleaning Kit Descale', desc: 'Hard water tile descaling, commode & chrome shine', price: 499, slug: 'cleaning-pest-control', Icon: BathroomKitIcon },
      { id: 'cln-roach', name: 'Cockroach Spray & Gel Bait', desc: '100% odorless herbal kitchen cabinet treatment', price: 599, slug: 'cleaning-pest-control', Icon: CockroachSprayIcon },
      { id: 'cln-termite', name: 'Termite Control Kit Treatment', desc: 'Drill-and-inject wood & wall termite barrier', price: 999, slug: 'cleaning-pest-control', Icon: TermiteKitIcon }
    ]
  },
  {
    id: 'carpenter',
    title: 'Carpenter & Paint',
    subtitle: 'Furniture kit, Hinge, Lock, Paint roller & Waterproofing',
    count: '6 Key Services',
    startingPrice: 199,
    FolderIcon: HammerPaintbrushFolderIcon,
    primaryLink: '/services/carpenter',
    services: [
      { id: 'crp-main', name: 'Carpenter Full Service & Drill', desc: 'Precision woodwork, hardware & furniture repairs', price: 199, slug: 'carpenter', Icon: HammerPaintbrushFolderIcon },
      { id: 'crp-furn', name: 'Furniture Toolkit & Assembly', desc: 'IKEA / Wakefit / Pepperfry bed & table setup', price: 399, slug: 'carpenter', Icon: FurnitureKitIcon },
      { id: 'crp-hinge', name: 'Door Hinge & Hydraulic Slider', desc: 'Wardrobe soft-close hinge & drawer channel fix', price: 249, slug: 'carpenter', Icon: DoorHingeIcon },
      { id: 'crp-lock', name: 'Door Lock & Security Latch', desc: 'Main door mortise lock & cylindrical latch repair', price: 199, slug: 'carpenter', Icon: DoorLockIcon },
      { id: 'crp-roller', name: 'Paint Roller Wall Touch-up', desc: 'Wall putty, crack filing & 2-coat paint touch-up', price: 999, slug: 'painting-waterproofing', Icon: PaintRollerIcon },
      { id: 'crp-waterproof', name: 'Waterproofing Tub & Anti-Damp', desc: 'SmartCare moisture barrier for wet wall patches', price: 1499, slug: 'painting-waterproofing', Icon: WaterproofingTubIcon }
    ]
  }
];

export default function ServicesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const [selectedFolderId, setSelectedFolderId] = useState('appliance');
  const { openBookingModal } = useBooking();

  if (!isOpen) return null;

  const currentFolder = MEGA_MENU_CATEGORIES.find((f) => f.id === selectedFolderId) || MEGA_MENU_CATEGORIES[0];

  const handleBookingClick = (slug, title, price) => {
    onClose?.();
    openBookingModal(slug, { title, price });
  };

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[calc(100vw-2rem)] max-w-6xl z-50 transition-all duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white border border-slate-200/90 rounded-3xl md:rounded-[32px] shadow-2xl overflow-hidden text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
        
        {/* Mega Menu Top Header */}
        <div className="px-6 sm:px-8 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Interactive Mega Menu
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 45-minute doorstep arrival in Indore
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
              Explore Home Services by Category
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

        {/* 5 CATEGORY TABS / FOLDERS BAR */}
        <div className="bg-slate-50/80 px-6 sm:px-8 py-3 border-b border-slate-200/80 flex items-center gap-2.5 overflow-x-auto [scrollbar-width:none]">
          {MEGA_MENU_CATEGORIES.map((folder) => {
            const isSelected = selectedFolderId === folder.id;
            const FolderIconComp = folder.FolderIcon;
            return (
              <button
                key={folder.id}
                type="button"
                onClick={() => setSelectedFolderId(folder.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-slate-100'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                  <FolderIconComp className="w-5 h-5" />
                </div>
                <span>{folder.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-amber-400 text-slate-950 font-extrabold' : 'bg-slate-100 text-slate-500'
                }`}>
                  {folder.services.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CATEGORY SERVICES PANEL */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[62vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>{currentFolder.title} Services</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentFolder.subtitle}
              </p>
            </div>

            <Link
              href={currentFolder.primaryLink}
              onClick={onClose}
              className="text-xs font-extrabold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 shrink-0"
            >
              <span>View Full {currentFolder.title} Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service Cards with Matching Studio Icons, Working Links & Book Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {currentFolder.services.map((srv) => {
              const ServiceIconComp = srv.Icon;
              return (
                <div
                  key={srv.id}
                  className="p-3.5 rounded-2xl bg-white hover:bg-amber-50/40 border border-slate-200/80 hover:border-amber-400 transition-all duration-200 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    {/* Clean Studio-lit Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/70 group-hover:bg-white flex items-center justify-center p-2 shrink-0 transition-transform group-hover:scale-105 shadow-inner">
                      <ServiceIconComp className="w-10 h-10 drop-shadow-sm" />
                    </div>

                    {/* Service Name & Description */}
                    <div className="min-w-0 flex-1 space-y-1">
                      <Link
                        href={`/services/${srv.slug}`}
                        onClick={onClose}
                        className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 font-heading block transition-colors leading-tight hover:underline"
                      >
                        {srv.name}
                      </Link>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                        {srv.desc}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Links */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] text-slate-400 font-semibold">Starts</span>
                      <span className="text-sm font-extrabold text-slate-900 font-heading">
                        ₹{srv.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/services/${srv.slug}`}
                        onClick={onClose}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleBookingClick(srv.slug, srv.name, srv.price)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-3.5 py-1 rounded-lg shadow-sm transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Mega Menu Footer Bar */}
        <div className="bg-slate-900 text-white px-6 sm:px-8 py-3.5 flex items-center justify-between border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Transparent fixed rate cards & 30-day post service warranty across all Indore Sectors</span>
            <span className="sm:hidden">Fixed rates & 30-day warranty</span>
          </div>

          <Link
            href="/services"
            onClick={onClose}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>View All Indore Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
