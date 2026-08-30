'use client';

import React from 'react';

// ==========================================
// 1. FIVE MAIN CATEGORY FOLDER ICONS (STUDIO-LIT)
// ==========================================

// Toolbox for Appliance Repair
export function ToolboxFolderIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="tbShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tbRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="tbLidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="tbSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="tbHandleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      {/* Floor Cast Shadow */}
      <ellipse cx="50" cy="86" rx="38" ry="7" fill="url(#tbShadow)" />
      {/* Toolbox Main Body */}
      <rect x="18" y="44" width="64" height="38" rx="6" fill="url(#tbRedGrad)" stroke="#7F1D1D" strokeWidth="2" />
      {/* Body Inner Ribs */}
      <rect x="22" y="52" width="56" height="4" rx="2" fill="#7F1D1D" fillOpacity="0.3" />
      <rect x="22" y="62" width="56" height="4" rx="2" fill="#7F1D1D" fillOpacity="0.3" />
      {/* Toolbox Lid */}
      <path d="M14 42C14 37 18 33 24 33H76C82 33 86 37 86 42V45H14V42Z" fill="url(#tbLidGrad)" stroke="#7F1D1D" strokeWidth="1.5" />
      <line x1="16" y1="38" x2="84" y2="38" stroke="#FECACA" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Metal Latches */}
      <rect x="30" y="40" width="8" height="12" rx="2" fill="url(#tbSteelGrad)" stroke="#475569" strokeWidth="1" />
      <circle cx="34" cy="46" r="1.2" fill="#0F172A" />
      <rect x="62" y="40" width="8" height="12" rx="2" fill="url(#tbSteelGrad)" stroke="#475569" strokeWidth="1" />
      <circle cx="66" cy="46" r="1.2" fill="#0F172A" />
      {/* Handle Base & Bar */}
      <path d="M38 33V20C38 17 41 15 44 15H56C59 15 62 17 62 20V33" stroke="url(#tbHandleGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="42" y="13" width="16" height="8" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
    </svg>
  );
}

// Chrome Tap for Plumbing
export function ChromeTapFolderIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="tapShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="75%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#tapShadow)" />
      {/* Base Flange / Deck Mount */}
      <ellipse cx="38" cy="80" rx="18" ry="6" fill="url(#chromeGrad)" stroke="#64748B" strokeWidth="1.5" />
      <rect x="28" y="72" width="20" height="8" fill="url(#chromeGrad)" />
      {/* Upright Pillar */}
      <rect x="30" y="44" width="16" height="30" fill="url(#chromeGrad)" stroke="#475569" strokeWidth="1.5" />
      <line x1="33" y1="46" x2="33" y2="72" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      {/* Curved Gooseneck Spout */}
      <path d="M38 44C38 24 54 16 68 18C78 20 82 28 82 42V52" fill="none" stroke="url(#chromeGrad)" strokeWidth="12" strokeLinecap="round" />
      <path d="M38 44C38 26 52 20 66 22C74 24 78 30 78 42V50" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Spout Aerator Tip */}
      <rect x="74" y="50" width="14" height="8" rx="2" fill="url(#chromeGrad)" stroke="#334155" strokeWidth="1.5" />
      {/* Water Droplet */}
      <path d="M81 64C81 64 85 70 85 73C85 75.2 83.2 77 81 77C78.8 77 77 75.2 77 73C77 70 81 64 81 64Z" fill="#38BDF8" />
      {/* Sleek Top Lever Handle */}
      <path d="M22 36L44 40L32 44" fill="url(#chromeGrad)" stroke="#475569" strokeWidth="1.5" />
      <rect x="18" y="33" width="14" height="6" rx="2.5" fill="url(#chromeGrad)" stroke="#334155" strokeWidth="1.2" transform="rotate(-15 18 33)" />
      <circle cx="37" cy="41" r="2.5" fill="url(#brassGold)" />
    </svg>
  );
}

// Switchboard for Electrician
export function SwitchboardFolderIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="sbShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sbFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="87" rx="36" ry="6" fill="url(#sbShadow)" />
      {/* Modular Plate Outer Rim */}
      <rect x="14" y="20" width="72" height="60" rx="8" fill="url(#sbFaceGrad)" stroke="#CBD5E1" strokeWidth="2.5" />
      <rect x="18" y="24" width="64" height="52" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Switch 1 (Active with Amber LED) */}
      <rect x="24" y="32" width="12" height="20" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="24" y1="42" x2="36" y2="42" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="30" cy="36" r="1.5" fill="#10B981" />
      {/* Switch 2 */}
      <rect x="40" y="32" width="12" height="20" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="40" y1="42" x2="52" y2="42" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* 3-Pin Heavy Power Socket */}
      <rect x="56" y="32" width="22" height="22" rx="4" fill="#0F172A" />
      <circle cx="67" cy="38" r="2.2" fill="#F8FAFC" />
      <circle cx="62" cy="46" r="1.8" fill="#F8FAFC" />
      <circle cx="72" cy="46" r="1.8" fill="#F8FAFC" />
      {/* Rotary Fan Regulator Dial */}
      <circle cx="30" cy="64" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="30" y1="64" x2="34" y2="60" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      {/* Indicator Light */}
      <rect x="58" y="61" width="18" height="6" rx="2" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
      <circle cx="67" cy="64" r="1.5" fill="#FEF08A" />
    </svg>
  );
}

// Spray Bottle for Cleaning & Pest
export function SprayBottleFolderIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="spShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="6" fill="url(#spShadow)" />
      {/* Bottle Body */}
      <path d="M38 46C38 42 42 38 48 38H52C58 38 62 42 62 46L66 78C66 83 62 86 56 86H44C38 86 34 83 34 78L38 46Z" fill="url(#bottleGrad)" stroke="#0284C7" strokeWidth="2" />
      {/* Liquid Reflection */}
      <path d="M40 50L37 76C37 80 40 82 44 82" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      {/* Measurement Scale */}
      <line x1="58" y1="56" x2="62" y2="56" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="64" x2="62" y2="64" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="72" x2="62" y2="72" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      {/* Neck */}
      <rect x="46" y="28" width="8" height="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Trigger Spray Head */}
      <path d="M34 20C34 16 38 14 46 14H62C68 14 74 18 74 22L70 28H46L34 20Z" fill="#1E293B" />
      {/* Spray Nozzle */}
      <rect x="26" y="16" width="10" height="7" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
      {/* Trigger Lever */}
      <path d="M44 28C44 28 38 34 40 42" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      {/* Fine Spray Mist */}
      <circle cx="20" cy="18" r="1.5" fill="#38BDF8" opacity="0.8" />
      <circle cx="15" cy="14" r="1.2" fill="#38BDF8" opacity="0.6" />
      <circle cx="14" cy="22" r="1.2" fill="#38BDF8" opacity="0.7" />
    </svg>
  );
}

// Hammer and Paintbrush for Carpenter & Paint
export function HammerPaintbrushFolderIcon({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="hpShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F172A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="woodHandle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="steelHead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="87" rx="34" ry="6" fill="url(#hpShadow)" />
      {/* Crossed Hammer (Left to Right) */}
      <g transform="rotate(-30 50 50)">
        <rect x="46" y="24" width="8" height="52" rx="3" fill="url(#woodHandle)" stroke="#78350F" strokeWidth="1.5" />
        {/* Steel Hammer Head */}
        <path d="M34 20H66C68 20 70 22 70 24V28C70 30 68 32 66 32H34C32 32 30 30 30 28V24C30 22 32 20 34 20Z" fill="url(#steelHead)" />
        {/* Claw curve */}
        <path d="M30 24C24 24 20 28 18 34" stroke="url(#steelHead)" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* Crossed Paintbrush (Right to Left) */}
      <g transform="rotate(30 50 50)">
        <rect x="47" y="38" width="6" height="38" rx="2" fill="url(#woodHandle)" stroke="#78350F" strokeWidth="1.2" />
        {/* Metal Ferrule */}
        <rect x="44" y="26" width="12" height="12" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
        {/* Bristles with Paint Tip */}
        <path d="M44 26C44 26 43 14 50 14C57 14 56 26 56 26H44Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="1.2" />
        <circle cx="50" cy="18" r="1.5" fill="#93C5FD" />
      </g>
    </svg>
  );
}

// ==========================================
// 2. NESTED APPLIANCE REPAIR ICONS (10)
// ==========================================

export function ACUnitIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="24" width="64" height="32" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.2" />
      <rect x="12" y="28" width="56" height="18" rx="3" fill="#FFFFFF" />
      <circle cx="60" cy="34" r="2" fill="#10B981" />
      <rect x="54" y="40" width="8" height="2" rx="1" fill="#94A3B8" />
      {/* Louver Vent */}
      <rect x="12" y="48" width="56" height="4" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      {/* Cool breeze waves */}
      <path d="M24 60C26 63 28 63 30 60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 60C40 63 42 63 44 60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 60C54 63 56 63 58 60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function RefrigeratorUnitIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="22" y="10" width="36" height="60" rx="5" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.2" />
      <rect x="22" y="10" width="36" height="22" rx="4" fill="#E2E8F0" />
      <line x1="22" y1="32" x2="58" y2="32" stroke="#475569" strokeWidth="2" />
      <rect x="25" y="20" width="3" height="8" rx="1" fill="#334155" />
      <rect x="25" y="38" width="3" height="14" rx="1" fill="#334155" />
      <circle cx="48" cy="46" r="2" fill="#0284C7" />
    </svg>
  );
}

export function WashingMachineUnitIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="18" y="12" width="44" height="56" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.2" />
      <rect x="18" y="12" width="44" height="14" rx="4" fill="#E2E8F0" />
      <circle cx="40" cy="19" r="3.5" fill="#334155" />
      <rect x="48" y="16" width="8" height="5" rx="1" fill="#0284C7" />
      <circle cx="40" cy="44" r="15" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="40" cy="44" r="11" fill="#0284C7" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="1.5" />
    </svg>
  );
}

export function ROPurifierIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="22" y="14" width="36" height="52" rx="6" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2.2" />
      <rect x="26" y="18" width="28" height="24" rx="4" fill="#E0F2FE" />
      <circle cx="34" cy="30" r="3" fill="#38BDF8" />
      <circle cx="44" cy="26" r="2" fill="#38BDF8" />
      {/* Purifier Tap */}
      <rect x="36" y="52" width="8" height="4" rx="1" fill="#64748B" />
      <line x1="40" y1="56" x2="40" y2="60" stroke="#0284C7" strokeWidth="2" />
      <circle cx="40" cy="62" r="1.5" fill="#38BDF8" />
    </svg>
  );
}

export function GeyserIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="24" y="12" width="32" height="48" rx="14" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.2" />
      <circle cx="40" cy="32" r="6" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1.5" />
      <path d="M40 28C40 28 37 32 37 34C37 35.6 38.4 37 40 37C41.6 37 43 35.6 43 34C43 32 40 28 40 28Z" fill="#EF4444" />
      {/* In/Out Pipes */}
      <rect x="28" y="60" width="5" height="8" fill="#3B82F6" />
      <rect x="47" y="60" width="5" height="8" fill="#EF4444" />
    </svg>
  );
}

export function MicrowaveUnitIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="14" y="20" width="52" height="40" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.2" />
      <rect x="18" y="25" width="32" height="30" rx="3" fill="#1E293B" />
      <rect x="54" y="25" width="8" height="30" rx="2" fill="#E2E8F0" />
      <circle cx="58" cy="32" r="2" fill="#0284C7" />
      <circle cx="58" cy="40" r="1.5" fill="#64748B" />
      <circle cx="58" cy="47" r="2.5" fill="#334155" />
    </svg>
  );
}

export function AirCoolerIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="14" width="40" height="52" rx="6" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2.2" />
      {/* Top Fan Grill */}
      <circle cx="40" cy="34" r="12" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <circle cx="40" cy="34" r="3" fill="#0284C7" />
      {/* Honeycomb Honey Pads */}
      <line x1="26" y1="52" x2="54" y2="52" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="26" y1="58" x2="54" y2="58" stroke="#94A3B8" strokeWidth="1.5" />
    </svg>
  );
}

export function KitchenChimneyIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chimney Duct */}
      <rect x="32" y="12" width="16" height="24" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
      {/* Curved Glass Hood */}
      <path d="M12 48L24 36H56L68 48H12Z" fill="#1E293B" stroke="#475569" strokeWidth="2" />
      <rect x="12" y="48" width="56" height="8" rx="2" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
      {/* Baffle Filter */}
      <rect x="24" y="56" width="32" height="4" fill="#94A3B8" />
    </svg>
  );
}

export function InverterBatteryIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top Inverter Unit */}
      <rect x="18" y="16" width="44" height="18" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      <circle cx="26" cy="25" r="2" fill="#10B981" />
      <rect x="42" y="22" width="14" height="6" rx="1" fill="#0284C7" />
      {/* Bottom Tubular Battery */}
      <rect x="16" y="38" width="48" height="28" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <rect x="22" y="34" width="6" height="4" fill="#94A3B8" />
      <rect x="52" y="34" width="6" height="4" fill="#94A3B8" />
    </svg>
  );
}

export function AttaChakkiIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="22" y="12" width="36" height="56" rx="6" fill="#F8FAFC" stroke="#D97706" strokeWidth="2.2" />
      <rect x="26" y="16" width="28" height="16" rx="3" fill="#FEF3C7" />
      <circle cx="40" cy="24" r="4" fill="#D97706" />
      <rect x="30" y="40" width="20" height="22" rx="3" fill="#E2E8F0" />
      <line x1="30" y1="46" x2="50" y2="46" stroke="#94A3B8" strokeWidth="1.5" />
    </svg>
  );
}

// ==========================================
// 3. NESTED PLUMBING ICONS (5)
// ==========================================

export function ToiletFlushIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Flush Tank */}
      <rect x="20" y="12" width="40" height="26" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <circle cx="40" cy="20" r="3" fill="#0284C7" />
      {/* Commode Bowl */}
      <path d="M26 38H54L50 64H30L26 38Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
      <ellipse cx="40" cy="38" rx="14" ry="5" fill="#E2E8F0" />
    </svg>
  );
}

export function DrainPipeIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* S-Trap Pipe */}
      <path d="M20 20V38C20 48 34 48 34 38V32C34 22 48 22 48 32V60" fill="none" stroke="#64748B" strokeWidth="10" strokeLinecap="round" />
      <path d="M20 20V38C20 48 34 48 34 38V32C34 22 48 22 48 32V60" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function WaterTankIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="16" width="40" height="48" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <line x1="20" y1="28" x2="60" y2="28" stroke="#475569" strokeWidth="2" />
      <line x1="20" y1="40" x2="60" y2="40" stroke="#475569" strokeWidth="2" />
      <line x1="20" y1="52" x2="60" y2="52" stroke="#475569" strokeWidth="2" />
      {/* Top Cap */}
      <rect x="30" y="10" width="20" height="6" rx="2" fill="#F59E0B" />
    </svg>
  );
}

export function BathroomFittingIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Overhead Shower Head */}
      <path d="M20 18H50V28" fill="none" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="50" cy="32" rx="16" ry="6" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
      {/* Water Spray Rays */}
      <line x1="42" y1="40" x2="38" y2="60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="50" y1="40" x2="50" y2="64" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="58" y1="40" x2="62" y2="60" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

// ==========================================
// 4. NESTED ELECTRICIAN ICONS (5)
// ==========================================

export function CeilingFanIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Center Motor */}
      <circle cx="40" cy="40" r="10" fill="#D97706" stroke="#92400E" strokeWidth="2" />
      <circle cx="40" cy="40" r="4" fill="#FDE68A" />
      {/* 3 Blades */}
      <path d="M40 30V10C40 8 44 8 44 10V30" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <path d="M48 45L66 55C68 56 66 60 64 59L46 49" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 45L14 55C12 56 14 60 16 59L34 49" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function ChandelierIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chain */}
      <line x1="40" y1="10" x2="40" y2="28" stroke="#D97706" strokeWidth="2" strokeDasharray="2 2" />
      {/* Ring */}
      <ellipse cx="40" cy="34" rx="20" ry="6" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      {/* Lights */}
      <circle cx="26" cy="44" r="4" fill="#F59E0B" />
      <circle cx="40" cy="46" r="5" fill="#F59E0B" />
      <circle cx="54" cy="44" r="4" fill="#F59E0B" />
      {/* Crystals */}
      <path d="M40 52L40 64" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MCBBoxIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="18" y="16" width="44" height="48" rx="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      {/* MCB Switches inside */}
      <rect x="24" y="26" width="8" height="28" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
      <rect x="25" y="32" width="6" height="8" rx="1" fill="#10B981" />
      <rect x="36" y="26" width="8" height="28" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
      <rect x="37" y="32" width="6" height="8" rx="1" fill="#10B981" />
      <rect x="48" y="26" width="8" height="28" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
      <rect x="49" y="38" width="6" height="8" rx="1" fill="#EF4444" />
    </svg>
  );
}

export function WiringIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 3 Braided insulated copper wires */}
      <path d="M16 26C30 26 34 54 64 54" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 40C30 40 34 40 64 40" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 54C30 54 34 26 64 26" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
      {/* Copper core tip */}
      <circle cx="64" cy="54" r="2.5" fill="#F59E0B" />
      <circle cx="64" cy="40" r="2.5" fill="#F59E0B" />
      <circle cx="64" cy="26" r="2.5" fill="#F59E0B" />
    </svg>
  );
}

// ==========================================
// 5. NESTED CLEANING & PEST ICONS (5)
// ==========================================

export function VacuumCleanerIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Canister Body */}
      <rect x="36" y="34" width="30" height="24" rx="8" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="44" cy="56" r="6" fill="#334155" />
      <circle cx="58" cy="56" r="6" fill="#334155" />
      {/* Hose & Nozzle */}
      <path d="M36 44C20 44 20 24 30 20H36" fill="none" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 44L14 62H26" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SofaBrushIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ergonomic Brush Handle */}
      <path d="M18 36C18 30 24 26 34 26H54C60 26 64 30 64 36H18Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      {/* Dense Bristles */}
      <rect x="20" y="38" width="42" height="18" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="26" y1="38" x2="26" y2="56" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="34" y1="38" x2="34" y2="56" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="42" y1="38" x2="42" y2="56" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="50" y1="38" x2="50" y2="56" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Shampoo foam bubbles */}
      <circle cx="58" cy="24" r="3" fill="#BAE6FD" />
      <circle cx="64" cy="20" r="2" fill="#BAE6FD" />
    </svg>
  );
}

export function BathroomKitIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bucket */}
      <path d="M22 34L28 64H52L58 34H22Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
      {/* Squeegee Stick */}
      <line x1="28" y1="20" x2="46" y2="50" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <rect x="20" y="16" width="16" height="5" rx="1.5" fill="#1E293B" transform="rotate(-30 20 16)" />
    </svg>
  );
}

export function CockroachSprayIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="28" y="24" width="24" height="42" rx="6" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <rect x="34" y="16" width="12" height="8" rx="2" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="40" cy="44" r="6" fill="#FEF2F2" />
      {/* Cross mark */}
      <line x1="36" y1="40" x2="44" y2="48" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="40" x2="36" y2="48" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BedBugsIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Mattress / Pillow with Protection Barrier */}
      <rect x="20" y="22" width="40" height="38" rx="8" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <path d="M26 30H54M26 40H54M26 50H54" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Bug Shield Silhouette */}
      <circle cx="40" cy="40" r="10" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.5" />
      <ellipse cx="40" cy="40" rx="5" ry="6" fill="#991B1B" />
      <circle cx="40" cy="32" r="3" fill="#7F1D1D" />
      <line x1="33" y1="36" x2="47" y2="36" stroke="#991B1B" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="42" x2="48" y2="42" stroke="#991B1B" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="34" y1="48" x2="46" y2="48" stroke="#991B1B" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function TermiteKitIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="22" y="28" width="36" height="38" rx="5" fill="#D97706" stroke="#92400E" strokeWidth="2" />
      {/* Pressure Pump Rod */}
      <line x1="40" y1="12" x2="40" y2="28" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      <rect x="30" y="10" width="20" height="5" rx="2" fill="#1E293B" />
      {/* Pressure Gauge */}
      <circle cx="40" cy="46" r="6" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
      <line x1="40" y1="46" x2="43" y2="43" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ==========================================
// 6. NESTED CARPENTER & PAINT ICONS (5)
// ==========================================

export function FurnitureKitIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Hex Wrench / Allen Key */}
      <path d="M22 20H48V58" fill="none" stroke="#64748B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Wood Screw */}
      <line x1="56" y1="24" x2="56" y2="52" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <rect x="52" y="20" width="8" height="4" rx="1" fill="#B45309" />
    </svg>
  );
}

export function DoorHingeIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left Leaf */}
      <rect x="18" y="20" width="18" height="40" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <circle cx="26" cy="28" r="2" fill="#0F172A" />
      <circle cx="26" cy="52" r="2" fill="#0F172A" />
      {/* Center Knuckle / Pin */}
      <rect x="36" y="16" width="8" height="48" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
      {/* Right Leaf */}
      <rect x="44" y="20" width="18" height="40" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <circle cx="54" cy="28" r="2" fill="#0F172A" />
      <circle cx="54" cy="52" r="2" fill="#0F172A" />
    </svg>
  );
}

export function DoorLockIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shackle */}
      <path d="M28 36V24C28 17 33 12 40 12C47 12 52 17 52 24V36" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
      {/* Lock Body */}
      <rect x="22" y="34" width="36" height="34" rx="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
      <circle cx="40" cy="48" r="4" fill="#1E293B" />
      <rect x="38" y="48" width="4" height="8" fill="#1E293B" />
    </svg>
  );
}

export function PaintRollerIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Roller Cylinder */}
      <rect x="18" y="16" width="44" height="16" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      {/* Steel Arm */}
      <path d="M62 24H68V42H44V60" fill="none" stroke="#64748B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Plastic Grip */}
      <rect x="40" y="52" width="8" height="18" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
    </svg>
  );
}

export function WaterproofingTubIcon({ className = "w-12 h-12" }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Waterproofing Compound Bucket */}
      <path d="M20 30L26 64H54L60 30H20Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <rect x="18" y="24" width="44" height="6" rx="2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      {/* Water Shield Badge */}
      <circle cx="40" cy="48" r="6" fill="#38BDF8" />
      <path d="M40 44L43 47L39 52" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
