'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, Sparkles, ArrowRight, Clock, ChevronRight, Plus, FolderOpen, ShieldCheck, 
  Layers, ExternalLink 
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

export const MEGA_MENU_CATEGORIES = [
  {
    id: 'appliance',
    title: 'Appliance Repair',
    subtitle: 'AC, Refrigerator, Washing Machine, RO & more',
    count: '10 Services',
    startingPrice: 199,
    FolderIcon: ToolboxFolderIcon,
    primaryLink: '/appliance',
    services: [
      { id: 'ac-repair', name: 'AC Unit Repair & Service', desc: 'Power jet wash, gas leak fix & cooling check', price: 399, link: '/appliance/ac-repair', bookingService: 'ac-repair', Icon: ACUnitIcon },
      { id: 'refrigerator', name: 'Refrigerator Repair', desc: 'Gas charging, defrost thermostat & inverter PCB', price: 299, link: '/appliance/refrigerator', bookingService: 'refrigerator', Icon: RefrigeratorUnitIcon },
      { id: 'washing-machine', name: 'Washing Machine Service', desc: 'Drum descaling, drain pump & motor belt fix', price: 299, link: '/appliance/washing-machine', bookingService: 'washing-machine', Icon: WashingMachineUnitIcon },
      { id: 'ro-purifier', name: 'RO Purifier Filter Change', desc: 'Sediment, carbon filters & membrane renewal', price: 199, link: '/appliance/ro-purifier', bookingService: 'ro-purifier', Icon: ROPurifierIcon },
      { id: 'geyser', name: 'Geyser & Water Heater Fix', desc: 'Copper heating element, thermostat & mounting', price: 249, link: '/appliance/geyser', bookingService: 'geyser', Icon: GeyserIcon },
      { id: 'microwave', name: 'Microwave Oven Repair', desc: 'Magnetron heating, diode, touchpad & PCB', price: 249, link: '/appliance/microwave', bookingService: 'microwave', Icon: MicrowaveUnitIcon },
      { id: 'air-cooler', name: 'Air Cooler Servicing', desc: 'Honeycomb pad change, pump & motor overhaul', price: 199, link: '/appliance/air-cooler', bookingService: 'air-cooler', Icon: AirCoolerIcon },
      { id: 'kitchen-chimney', name: 'Kitchen Chimney Deep Clean', desc: 'Degreasing, baffle filter scrub & motor suction', price: 499, link: '/appliance/kitchen-chimney', bookingService: 'kitchen-chimney', Icon: KitchenChimneyIcon },
      { id: 'inverter', name: 'Inverter Battery Checkup', desc: 'Charging circuit, battery gravity & acid top-up', price: 249, link: '/appliance/inverter', bookingService: 'inverter', Icon: InverterBatteryIcon },
      { id: 'atta-chakki', name: 'Atta Chakki Motor Repair', desc: 'Cutter sharpening, stone alignment & motor check', price: 249, link: '/appliance/atta-chakki', bookingService: 'atta-chakki', Icon: AttaChakkiIcon }
    ]
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    subtitle: 'Tap, Flush tank, Drain pipe, Water tank & Fittings',
    count: '6 Key Services',
    startingPrice: 69,
    FolderIcon: ChromeTapFolderIcon,
    primaryLink: '/plumber',
    services: [
      { id: 'plm-main', name: 'Plumber Full Service & Inspection', desc: 'Complete home pipeline & sanitary checkup', price: 149, link: '/plumber', bookingService: 'plumber', Icon: ChromeTapFolderIcon },
      { id: 'plm-tap', name: 'Chrome Tap & Mixer Repair', desc: 'Spindle change, leaking tap & wall mixer fix', price: 149, link: '/plumber/tap-mixer-repair', bookingService: 'plumber', Icon: ChromeTapFolderIcon },
      { id: 'plm-toilet', name: 'Toilet Flush Tank & Cistern', desc: 'Syphon replacement, push button & jet spray', price: 199, link: '/plumber/toilet-flush-repair', bookingService: 'plumber', Icon: ToiletFlushIcon },
      { id: 'plm-drain', name: 'Drain Pipe & Sink Blockage', desc: 'Heavy-duty steel snake blockage clearing', price: 349, link: '/plumber/drain-blockage', bookingService: 'plumber', Icon: DrainPipeIcon },
      { id: 'plm-tank', name: 'Overhead Water Tank Clean', desc: 'Pressure wash, sludge removal & UV sanitize', price: 499, link: '/plumber/water-tank-cleaning', bookingService: 'plumber', Icon: WaterTankIcon },
      { id: 'plm-fittings', name: 'Bathroom Fitting & Shower', desc: 'Overhead shower arm, towel rods & soap holder', price: 69, link: '/plumber/bathroom-fittings', bookingService: 'plumber', Icon: BathroomFittingIcon }
    ]
  },
  {
    id: 'electrician',
    title: 'Electrician',
    subtitle: 'Switchboard, Fan, Chandelier, MCB & Wiring',
    count: '6 Key Services',
    startingPrice: 149,
    FolderIcon: SwitchboardFolderIcon,
    primaryLink: '/electrician',
    services: [
      { id: 'elec-main', name: 'Electrician Full Service Inspection', desc: 'Doorstep electrical diagnostics & multimeter check', price: 149, link: '/electrician', bookingService: 'electrician', Icon: SwitchboardFolderIcon },
      { id: 'elec-switch', name: 'Switchboard & Socket Repair', desc: 'Modular switch replacement & 16A power socket', price: 149, link: '/electrician/switchboard-socket', bookingService: 'electrician', Icon: SwitchboardFolderIcon },
      { id: 'elec-fan', name: 'Ceiling Fan Installation & Fix', desc: 'Capacitor change, bearing greasing & mounting', price: 199, link: '/electrician/ceiling-fan', bookingService: 'electrician', Icon: CeilingFanIcon },
      { id: 'elec-light', name: 'Chandelier & LED Lighting', desc: 'False ceiling COB lights, batten & chandelier', price: 249, link: '/electrician/lights-chandelier', bookingService: 'electrician', Icon: ChandelierIcon },
      { id: 'elec-mcb', name: 'MCB Box & Distribution Panel', desc: 'Tripping breaker fix, RCCB & DB box overhaul', price: 399, link: '/electrician/mcb-db-box', bookingService: 'electrician', Icon: MCBBoxIcon },
      { id: 'elec-wiring', name: 'Home Wiring & Fault Finding', desc: 'Short circuit tracing, casing & concealed copper wiring', price: 499, link: '/electrician/wiring-short-circuit', bookingService: 'electrician', Icon: WiringIcon }
    ]
  },
  {
    id: 'pest',
    title: 'Pest Control',
    subtitle: 'Cockroaches, Ants, Bed Bugs & Termite Treatment',
    count: '4 Key Services',
    startingPrice: 599,
    FolderIcon: SprayBottleFolderIcon,
    primaryLink: '/pest-control',
    services: [
      { 
        id: 'pest-main', 
        name: 'Pest Control Full Service Inspection', 
        desc: 'Odorless inspection & customized extermination plan', 
        price: 499, 
        link: '/pest-control', 
        bookingService: 'pest-control', 
        Icon: SprayBottleFolderIcon 
      },
      { 
        id: 'pest-cockroach', 
        name: 'Cockroaches, Ants & General Pest Control', 
        desc: 'Odorless spray & gel bait for complete roach and ant elimination', 
        price: 599, 
        link: '/pest-control/cockroach-ants', 
        bookingService: 'pest-control', 
        Icon: CockroachSprayIcon 
      },
      { 
        id: 'pest-bedbugs', 
        name: 'Bed Bugs Control', 
        desc: 'Advanced two-stage chemical spray for mattress, furniture & cracks', 
        price: 799, 
        link: '/pest-control/bed-bugs', 
        bookingService: 'pest-control', 
        Icon: BedBugsIcon 
      },
      { 
        id: 'pest-termite', 
        name: 'Termite Control', 
        desc: 'Drill-and-inject anti-termite wall & wood barrier with warranty', 
        price: 999, 
        link: '/pest-control/termite-control', 
        bookingService: 'pest-control', 
        Icon: TermiteKitIcon 
      }
    ]
  },
  {
    id: 'carpenter',
    title: 'Carpenter & Paint',
    subtitle: 'Furniture kit, Hinge, Lock, Paint roller & Waterproofing',
    count: '6 Key Services',
    startingPrice: 199,
    FolderIcon: HammerPaintbrushFolderIcon,
    primaryLink: '/carpenter-paint',
    services: [
      { id: 'crp-main', name: 'Carpenter Full Service & Drill', desc: 'Precision woodwork, hardware & furniture repairs', price: 199, link: '/carpenter-paint', bookingService: 'carpenter', Icon: HammerPaintbrushFolderIcon },
      { id: 'crp-furn', name: 'Furniture Toolkit & Assembly', desc: 'IKEA / Wakefit / Pepperfry bed & table setup', price: 399, link: '/carpenter-paint/furniture-assembly', bookingService: 'carpenter', Icon: FurnitureKitIcon },
      { id: 'crp-hinge', name: 'Door Hinge & Hydraulic Slider', desc: 'Wardrobe soft-close hinge & drawer channel fix', price: 249, link: '/carpenter-paint/carpenter', bookingService: 'carpenter', Icon: DoorHingeIcon },
      { id: 'crp-lock', name: 'Door Lock & Security Latch', desc: 'Main door mortise lock & cylindrical latch repair', price: 199, link: '/carpenter-paint/door-locks', bookingService: 'carpenter', Icon: DoorLockIcon },
      { id: 'crp-roller', name: 'Paint Roller Wall Touch-up', desc: 'Wall putty, crack filing & 2-coat paint touch-up', price: 999, link: '/carpenter-paint/painting-waterproofing', bookingService: 'painting-waterproofing', Icon: PaintRollerIcon },
      { id: 'crp-waterproof', name: 'Waterproofing Tub & Anti-Damp', desc: 'SmartCare moisture barrier for wet wall patches', price: 1499, link: '/carpenter-paint/wall-waterproofing', bookingService: 'painting-waterproofing', Icon: WaterproofingTubIcon }
    ]
  }
];

export default function ServicesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const [selectedFolderId, setSelectedFolderId] = useState('appliance');
  const { openBookingModal } = useBooking();

  if (!isOpen) return null;

  const currentFolder = MEGA_MENU_CATEGORIES.find((f) => f.id === selectedFolderId) || MEGA_MENU_CATEGORIES[0];

  const handleBookingClick = (serviceId, title, price) => {
    onClose?.();
    openBookingModal(serviceId, { title, price });
  };

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[calc(100vw-2rem)] max-w-6xl z-50 transition-all duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-slate-900/5">
        
        {/* Top Header with 5 Distinct Folder Tabs & Direct Category Links */}
        <div className="bg-slate-900 text-white px-6 pt-5 pb-0 border-b border-slate-800">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>All Service Categories</span>
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                Click any category hub or switch tabs below:
              </span>
            </div>

            {/* Direct Category Page Links Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {MEGA_MENU_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.primaryLink}
                  onClick={onClose}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all shrink-0 flex items-center gap-1 ${
                    selectedFolderId === cat.id 
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold' 
                      : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-700'
                  }`}
                  title={`Go to ${cat.title} Category Page`}
                >
                  <span>{cat.title}</span>
                  <ArrowRight className="w-2.5 h-2.5 opacity-70" />
                </Link>
              ))}
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 5 Tab Buttons across Desktop Header */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
            {MEGA_MENU_CATEGORIES.map((folder) => {
              const isSelected = selectedFolderId === folder.id;
              const FolderIconComponent = folder.FolderIcon;
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolderId(folder.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold transition-all shrink-0 cursor-pointer border-t border-x ${
                    isSelected
                      ? 'bg-slate-50 text-slate-900 border-slate-200 font-extrabold shadow-sm translate-y-[1px]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border-transparent'
                  }`}
                >
                  <FolderIconComponent className="w-5 h-5" />
                  <span>{folder.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                    isSelected ? 'bg-amber-100 text-amber-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {folder.count.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Body (Studio-Lit Service Grid) */}
        <div className="bg-slate-50 p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Sub-Header info for Active Folder with Direct Link to Category Page */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={currentFolder.primaryLink}
                  onClick={onClose}
                  className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-amber-600 font-heading flex items-center gap-1.5 transition-colors"
                >
                  <span>{currentFolder.title} Category Hub</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </Link>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentFolder.subtitle}
              </p>
            </div>

            <Link
              href={currentFolder.primaryLink}
              onClick={onClose}
              className="text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>Explore Full {currentFolder.title} Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service Cards with Matching Studio Icons, Working Links & Book Buttons - 2 Columns on Mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {currentFolder.services.map((srv) => {
              const ServiceIconComp = srv.Icon;
              return (
                <div
                  key={srv.id}
                  className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-amber-50/40 border border-slate-200/80 hover:border-amber-400 transition-all duration-200 flex flex-col justify-between gap-2 sm:gap-3 shadow-sm hover:shadow-md group"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                    {/* Clean Studio-lit Icon */}
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/70 group-hover:bg-white flex items-center justify-center p-1.5 sm:p-2 shrink-0 transition-transform group-hover:scale-105 shadow-inner">
                      <ServiceIconComp className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" />
                    </div>

                    {/* Service Name & Description */}
                    <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
                      <Link
                        href={srv.link}
                        onClick={onClose}
                        className="text-[11px] sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 font-heading block transition-colors leading-tight hover:underline line-clamp-2"
                      >
                        {srv.name}
                      </Link>
                      <p className="hidden sm:block text-[11px] text-slate-500 leading-snug line-clamp-2">
                        {srv.desc}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Links */}
                  <div className="pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">Starts</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 font-heading">
                        ₹{srv.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleBookingClick(srv.bookingService, srv.name, srv.price)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[10px] sm:text-xs px-2 sm:px-3.5 py-1 rounded-md sm:rounded-lg shadow-sm transition-all flex items-center gap-0.5 sm:gap-1 cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Mega Menu Footer Bar with Category Landing Links */}
        <div className="bg-slate-900 text-white px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Categories:</span>
            {MEGA_MENU_CATEGORIES.map((cat, idx) => (
              <React.Fragment key={cat.id}>
                <Link
                  href={cat.primaryLink}
                  onClick={onClose}
                  className="text-slate-300 hover:text-amber-400 font-semibold transition-colors"
                >
                  {cat.title}
                </Link>
                {idx < MEGA_MENU_CATEGORIES.length - 1 && <span className="text-slate-600">•</span>}
              </React.Fragment>
            ))}
          </div>

          <Link
            href="/services"
            onClick={onClose}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>View All 13 Indore Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
