import React from 'react';

// High quality minimalist appliance & service vector illustrations

export function ACIcon({ className = "w-14 h-10" }) {
  return (
    <svg viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* AC Indoor Unit Body */}
      <rect x="6" y="8" width="68" height="32" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
      <rect x="8" y="10" width="64" height="20" rx="2" fill="#F8FAFC" />
      {/* Brand logo & LED temperature */}
      <rect x="36" y="14" width="8" height="3" rx="1" fill="#CBD5E1" />
      <circle cx="62" cy="15" r="2.5" fill="#10B981" />
      <rect x="58" y="21" width="8" height="2" rx="1" fill="#64748B" />
      {/* Bottom Air Louver / Vent */}
      <rect x="10" y="32" width="60" height="5" rx="1.5" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
      <line x1="14" y1="34.5" x2="66" y2="34.5" stroke="#64748B" strokeWidth="1" strokeLinecap="round" />
      {/* Air Breeze lines */}
      <path d="M22 42C24 44 26 44 28 42" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M36 42C38 45 40 45 42 42" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M50 42C52 44 54 44 56 42" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function WashingMachineIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Cabinet */}
      <rect x="10" y="6" width="44" height="52" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
      {/* Top Control Panel */}
      <rect x="10" y="6" width="44" height="14" rx="4" fill="#E2E8F0" />
      <line x1="10" y1="20" x2="54" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Detergent Drawer */}
      <rect x="14" y="9" width="10" height="7" rx="1.5" fill="#CBD5E1" />
      {/* Rotary Dial */}
      <circle cx="32" cy="13" r="3.5" fill="#334155" />
      {/* LED Display */}
      <rect x="42" y="10" width="8" height="5" rx="1" fill="#0F172A" />
      <line x1="44" y1="12.5" x2="48" y2="12.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Front Round Glass Door */}
      <circle cx="32" cy="38" r="14" fill="#334155" stroke="#94A3B8" strokeWidth="2.5" />
      <circle cx="32" cy="38" r="10.5" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.5" />
      {/* Drum Reflection / Bubbles */}
      <path d="M26 34C28 30 36 30 38 34" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Door Handle */}
      <path d="M43 35C44 36.5 44 39.5 43 41" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" />
      {/* Base Legs */}
      <rect x="14" y="56" width="5" height="3" rx="1" fill="#475569" />
      <rect x="45" y="56" width="5" height="3" rx="1" fill="#475569" />
    </svg>
  );
}

export function RefrigeratorIcon({ className = "w-10 h-14" }) {
  return (
    <svg viewBox="0 0 48 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Main Body */}
      <rect x="8" y="4" width="32" height="60" rx="5" fill="#F1F5F9" stroke="#64748B" strokeWidth="2.5" />
      {/* Top Freezer Door */}
      <rect x="8" y="4" width="32" height="22" rx="4" fill="#E2E8F0" />
      <line x1="8" y1="26" x2="40" y2="26" stroke="#475569" strokeWidth="2" />
      {/* Top Handle */}
      <rect x="11" y="16" width="2" height="7" rx="1" fill="#334155" />
      {/* Bottom Fridge Door */}
      <rect x="8" y="27" width="32" height="37" rx="3" fill="#F8FAFC" />
      {/* Bottom Handle */}
      <rect x="11" y="30" width="2" height="12" rx="1" fill="#334155" />
      {/* Brand Badge */}
      <rect x="22" y="8" width="6" height="2" rx="0.5" fill="#94A3B8" />
      {/* Water Dispenser (Modern Touch) */}
      <rect x="28" y="34" width="8" height="11" rx="2" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="32" cy="38" r="1.5" fill="#0284C7" />
      {/* Legs */}
      <rect x="11" y="63" width="4" height="3" rx="1" fill="#475569" />
      <rect x="33" y="63" width="4" height="3" rx="1" fill="#475569" />
    </svg>
  );
}

export function MicrowaveIcon({ className = "w-14 h-11" }) {
  return (
    <svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Body */}
      <rect x="6" y="6" width="56" height="36" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
      {/* Glass Door */}
      <rect x="10" y="10" width="36" height="28" rx="2.5" fill="#1E293B" />
      <rect x="13" y="13" width="30" height="22" rx="1.5" fill="#0F172A" />
      <line x1="16" y1="18" x2="34" y2="30" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Door Handle */}
      <rect x="42" y="14" width="2.5" height="20" rx="1" fill="#E2E8F0" />
      {/* Control Panel Area */}
      <rect x="49" y="10" width="10" height="28" rx="1.5" fill="#E2E8F0" />
      {/* Digital Display */}
      <rect x="51" y="13" width="6" height="4" rx="0.5" fill="#0284C7" />
      {/* Buttons */}
      <circle cx="54" cy="22" r="1.5" fill="#64748B" />
      <circle cx="54" cy="27" r="1.5" fill="#64748B" />
      {/* Rotary Dial */}
      <circle cx="54" cy="33" r="2.5" fill="#334155" />
      {/* Feet */}
      <rect x="10" y="41" width="5" height="2" rx="1" fill="#475569" />
      <rect x="53" y="41" width="5" height="2" rx="1" fill="#475569" />
    </svg>
  );
}

export function ROPurifierIcon({ className = "w-11 h-14" }) {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Wall mounted cabinet */}
      <rect x="8" y="4" width="32" height="54" rx="5" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
      {/* Top Header */}
      <rect x="8" y="4" width="32" height="12" rx="4" fill="#0284C7" />
      <circle cx="24" cy="10" r="2.5" fill="#38BDF8" />
      {/* Transparent Water Tank */}
      <rect x="12" y="20" width="24" height="24" rx="3" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
      {/* Water Wave */}
      <path d="M14 34C17 32 20 36 24 34C28 32 31 36 34 34" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 38C17 36 20 40 24 38C28 36 31 40 34 38" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Dispenser Tap */}
      <rect x="22" y="47" width="4" height="6" rx="1" fill="#334155" />
      <circle cx="24" cy="56" r="1.5" fill="#0284C7" />
    </svg>
  );
}

export function GeyserIcon({ className = "w-11 h-14" }) {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cylindrical Tank */}
      <rect x="10" y="6" width="28" height="46" rx="12" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
      {/* Center Band & Temp Dial */}
      <rect x="10" y="24" width="28" height="12" fill="#E2E8F0" />
      <circle cx="24" cy="30" r="3.5" fill="#F97316" stroke="#EA580C" strokeWidth="1" />
      <circle cx="16" cy="30" r="1.5" fill="#EF4444" />
      <circle cx="32" cy="30" r="1.5" fill="#10B981" />
      {/* Bottom Inlet / Outlet Pipes */}
      <rect x="16" y="52" width="4" height="7" rx="1" fill="#3B82F6" />
      <rect x="28" y="52" width="4" height="7" rx="1" fill="#EF4444" />
      {/* Safety Valve */}
      <circle cx="24" cy="46" r="1.5" fill="#64748B" />
    </svg>
  );
}

export function PlumberIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#EFF6FF" />
      {/* Pipe wrench & tap */}
      <path d="M22 42L36 28M36 28L32 24L38 18L46 26L40 32L36 28Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="20" cy="44" r="4" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.5" />
      {/* Water Droplet */}
      <path d="M44 38C44 42.4183 40.4183 46 36 46C31.5817 46 28 42.4183 28 38C28 34 36 26 36 26C36 26 44 34 44 38Z" fill="#0284C7" fillOpacity="0.85" />
    </svg>
  );
}

export function ElectricianIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FEF3C7" />
      {/* Electrical Plug / Tester */}
      <path d="M24 16V26M40 16V26" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <rect x="20" y="26" width="24" height="16" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <path d="M32 42V52" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
      {/* High-Voltage Lightning Bolt */}
      <path d="M34 29L28 35H34L32 40L38 34H32L34 29Z" fill="#FFFFFF" />
    </svg>
  );
}

export function CleaningIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#F0FDF4" />
      {/* Spray Bottle */}
      <path d="M26 24H38L36 48H24L26 24Z" fill="#10B981" stroke="#059669" strokeWidth="2" />
      <path d="M28 24V18H34V24" fill="#059669" />
      <path d="M28 18L22 22M34 18H40L42 20L34 20" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
      {/* Sparkles */}
      <path d="M46 16L47.5 20.5L52 22L47.5 23.5L46 28L44.5 23.5L40 22L44.5 20.5L46 16Z" fill="#F59E0B" />
      <circle cx="44" cy="36" r="3" fill="#38BDF8" />
      <circle cx="20" cy="32" r="2" fill="#38BDF8" />
    </svg>
  );
}

export function CarpenterIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FFFBEB" />
      {/* Hammer */}
      <rect x="29" y="24" width="6" height="28" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
      <path d="M20 18C20 16 22 14 26 14H38C42 14 44 16 44 18V24H20V18Z" fill="#475569" stroke="#1E293B" strokeWidth="2" />
      {/* Nail & Wood block */}
      <rect x="14" y="48" width="36" height="6" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
    </svg>
  );
}

export function PaintingIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="28" fill="#FAF5FF" />
      {/* Paint Roller */}
      <rect x="18" y="16" width="28" height="12" rx="4" fill="#A855F7" stroke="#7E22CE" strokeWidth="2" />
      <path d="M46 22H50V36H34V46" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
      <rect x="31" y="46" width="6" height="12" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
    </svg>
  );
}

export function ChimneyIcon({ className = "w-14 h-12" }) {
  return (
    <svg viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chimney Duct */}
      <rect x="26" y="4" width="16" height="20" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      {/* Triangular Hood Body */}
      <path d="M12 36L24 24H44L56 36H12Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" strokeLinejoin="round" />
      {/* Baffle Filter & LED */}
      <rect x="12" y="36" width="44" height="6" rx="2" fill="#334155" />
      <circle cx="20" cy="39" r="1.5" fill="#38BDF8" />
      <circle cx="48" cy="39" r="1.5" fill="#38BDF8" />
      <line x1="28" y1="39" x2="40" y2="39" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AirCoolerIcon({ className = "w-12 h-14" }) {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cooler Body */}
      <rect x="8" y="6" width="32" height="52" rx="5" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
      {/* Louver Grill */}
      <rect x="12" y="10" width="24" height="24" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="24" cy="22" r="8" fill="#0284C7" fillOpacity="0.2" stroke="#0284C7" strokeWidth="1.5" />
      <circle cx="24" cy="22" r="3" fill="#0284C7" />
      {/* Honeycomb Lower Panels */}
      <rect x="12" y="38" width="24" height="14" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
      <line x1="12" y1="42" x2="36" y2="42" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="12" y1="46" x2="36" y2="46" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

export function InverterIcon({ className = "w-14 h-12" }) {
  return (
    <svg viewBox="0 0 68 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Inverter Unit */}
      <rect x="10" y="6" width="48" height="24" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <rect x="14" y="10" width="12" height="6" rx="1" fill="#0284C7" />
      <circle cx="48" cy="18" r="2.5" fill="#10B981" />
      {/* Heavy Tubular Battery Base */}
      <rect x="6" y="32" width="56" height="18" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <rect x="12" y="28" width="6" height="4" rx="1" fill="#EF4444" />
      <rect x="50" y="28" width="6" height="4" rx="1" fill="#3B82F6" />
      <circle cx="24" cy="41" r="2" fill="#F59E0B" />
      <circle cx="34" cy="41" r="2" fill="#F59E0B" />
      <circle cx="44" cy="41" r="2" fill="#F59E0B" />
    </svg>
  );
}

export function AttaChakkiIcon({ className = "w-12 h-14" }) {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Wooden Cabinet */}
      <rect x="8" y="6" width="32" height="52" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="2.5" />
      {/* Grain Hopper on top */}
      <path d="M14 6L18 18H30L34 6H14Z" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
      {/* Grinding Chamber */}
      <circle cx="24" cy="28" r="8" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="3" fill="#FFFBEB" />
      {/* Flour Outlet / Chute */}
      <rect x="14" y="40" width="20" height="12" rx="2" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
      <rect x="18" y="44" width="12" height="4" rx="1" fill="#FDE68A" />
    </svg>
  );
}

export const APPLIANCE_ILLUSTRATIONS = {
  'ac-repair': ACIcon,
  'washing-machine': WashingMachineIcon,
  'refrigerator': RefrigeratorIcon,
  'microwave': MicrowaveIcon,
  'ro-purifier': ROPurifierIcon,
  'geyser': GeyserIcon,
  'plumber': PlumberIcon,
  'electrician': ElectricianIcon,
  'pest-control': CleaningIcon,
  'cleaning-pest-control': CleaningIcon,
  'carpenter': CarpenterIcon,
  'painting-waterproofing': PaintingIcon,
  'kitchen-chimney': ChimneyIcon,
  'air-cooler': AirCoolerIcon,
  'inverter': InverterIcon,
  'atta-chakki': AttaChakkiIcon
};
