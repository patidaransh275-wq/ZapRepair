'use client';

import React from 'react';
import { Truck, Phone, MessageSquare, ShieldCheck, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TrackingPreview() {
  const { openBookingModal } = useBooking();

  return (
    <section className="py-16 md:py-24 bg-slate-950 text-white border-b border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
              Real-Time Order Tracking
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
              Track Your Doorstep Technician Live
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              No more waiting blindly! With PlumberIndore service tracking, view technician status, estimated arrival time, vehicle details, and direct contact options right from your phone.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                <span>Live SMS & WhatsApp arrival notifications</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                <span>Direct 1-click call with helpline support desk</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                <span>Transparent rate card & digital invoice copy</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openBookingModal('ac-repair')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all inline-flex items-center gap-2"
              >
                <span>Book & Experience Live Tracking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Interactive Tracker UI Mockup */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Top Banner */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">Live Status Tracker</span>
                  <h4 className="font-bold text-white text-base">Booking #IND-84920</h4>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold px-3 py-1 rounded-full animate-pulse">
                  ● Technician En Route
                </span>
              </div>

              {/* Technician Info */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">Verified Doorstep Expert</h5>
                    <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Indore Certified Pro
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-400">★ 4.9 Rating</div>
                  <div className="text-[10px] text-slate-400">480+ Repairs</div>
                </div>
              </div>

              {/* Vehicle & ETA info */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-300">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Service Unit (MP 09)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 justify-end">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white">ETA: 18 Mins</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+919876543210"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Helpline</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
