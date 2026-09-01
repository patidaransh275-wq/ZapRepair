'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Wrench, Phone, MessageSquare, ShieldCheck, Clock, 
  MapPin, CheckCircle2, Zap, Wind, Droplets, ArrowRight 
} from 'lucide-react';

export default function UnderConstruction() {
  const PHONE_NUMBER = '+91 91749 34135';
  const RAW_PHONE = '919174934135';
  const WHATSAPP_TEXT = encodeURIComponent("Hello PlumberIndore team! I saw your website is under construction. I need urgent doorstep home repair assistance in Indore.");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-3xl pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-lg shadow-amber-500/20">
              <Wrench className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                Plumber<span className="text-amber-400">Indore</span>
              </span>
              <span className="text-[10px] text-slate-400 block font-medium -mt-1 tracking-wider uppercase">
                Doorstep Home Services
              </span>
            </div>
          </div>

          {/* Quick Helpline */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="hidden sm:flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>24x7 Helpline: {PHONE_NUMBER}</span>
          </a>
        </div>
      </header>

      {/* Main Hero / Under Construction Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl w-full mx-auto text-center space-y-8">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold px-4 py-1.5 rounded-full shadow-inner animate-pulse">
            <Clock className="w-4 h-4" />
            <span>System Upgrade in Progress</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-tight">
              Website Under Construction
            </h1>
            <p className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading">
              We&apos;ll be back soon!
            </p>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed pt-2">
              We are currently upgrading our doorstep booking platform to deliver a faster, seamless experience for home repairs across Indore.
            </p>
          </div>

          {/* Immediate Assistance Notice */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6 max-w-xl mx-auto">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Need Doorstep Service Right Now?
              </h2>
              <p className="text-xs text-slate-400">
                Our verified technicians are actively servicing all Indore areas (Vijay Nagar, Palasia, Bhawarkua, Rajendra Nagar, Rau, Super Corridor & more).
              </p>
            </div>

            {/* Action Buttons: Phone & WhatsApp */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              
              {/* WhatsApp Contact */}
              <a
                href={`https://wa.me/${RAW_PHONE}?text=${WHATSAPP_TEXT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/30 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {PHONE_NUMBER}</span>
              </a>

            </div>

            {/* Service Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-[11px] font-bold text-slate-300">
              <div className="flex items-center justify-center gap-1.5 bg-slate-800/60 p-2 rounded-xl">
                <Wrench className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Plumbing</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-slate-800/60 p-2 rounded-xl">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Electrician</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-slate-800/60 p-2 rounded-xl">
                <Wind className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>AC Repair</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-slate-800/60 p-2 rounded-xl">
                <Droplets className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Appliances</span>
              </div>
            </div>

          </div>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>45-Min Doorstep Arrival</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>30-Day Service Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Indore Local Technicians</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Bar */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} PlumberIndore Tech Services. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">
            Helpline: <a href={`tel:${PHONE_NUMBER}`} className="text-amber-400 font-bold hover:underline">{PHONE_NUMBER}</a> • <a href="mailto:plumberindore@gmail.com" className="text-slate-400 hover:text-white">plumberindore@gmail.com</a>
          </p>
        </div>
      </footer>

    </div>
  );
}
