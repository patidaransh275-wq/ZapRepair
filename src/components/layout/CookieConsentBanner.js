'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('plumberindore_cookie_consent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch (e) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('plumberindore_cookie_consent', 'accepted');
    } catch (e) {}
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl border border-slate-700 shadow-2xl space-y-3 animate-fade-in text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-amber-400 font-heading text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>India DPDP Privacy & Cookies</span>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="text-slate-400 hover:text-white p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-300 leading-relaxed text-[11px]">
        PlumberIndore uses cookies to ensure secure session management, location pincode serviceability checking, and order processing in compliance with the Digital Personal Data Protection (DPDP) Act.
      </p>

      <div className="flex items-center justify-between pt-1">
        <Link href="/privacy-policy" className="text-slate-400 hover:text-amber-400 underline text-[10px]">
          Privacy Policy & DPDP Rights
        </Link>
        
        <button
          onClick={handleAccept}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-1.5 rounded-xl text-xs shadow-sm"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
