'use client';

import React from 'react';
import { Clock, ShieldCheck, Phone, MessageSquare, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TrackingPreview() {
  const { openTrackingModal, userBookings } = useBooking();
  const sampleBooking = userBookings[0] || {
    id: 'ZAP-84920',
    serviceName: 'AC Power Foam Service',
    status: 'Technician En Route',
    statusStep: 3,
    technician: {
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      rating: 4.9,
      vehicle: 'Hero Splendor (DL 3S CW 4920)',
      eta: '18 Mins',
      photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&h=200&q=80'
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Info */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-3.5 py-1 rounded-full border border-slate-700">
              Live Order Status
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading leading-tight">
              Track Your Technician In Real-Time
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              No more waiting blindly! With ZapRepair service tracking, view technician profile, estimated arrival time, vehicle details, and direct contact options right from your phone.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant ETA Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1-Click Call & WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Transparent Invoice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Digital Service History</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openTrackingModal(sampleBooking.id)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow-md flex items-center gap-2"
              >
                <span>View Live Tracker Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column - Real-time Tracking Widget Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Active Booking Tracker</span>
                  <h3 className="text-lg font-bold font-heading text-white">{sampleBooking.serviceName}</h3>
                  <p className="text-xs text-slate-400">Booking ID: {sampleBooking.id}</p>
                </div>
                <div className="bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{sampleBooking.status}</span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="space-y-1">
                  <div className="h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-slate-300 font-bold">Booked</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-slate-300 font-bold">Assigned</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-amber-400 rounded-full" />
                  <span className="text-amber-400 font-extrabold">En Route</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-slate-800 rounded-full" />
                  <span className="text-slate-500 font-medium">Completed</span>
                </div>
              </div>

              {/* Technician Info Card */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={sampleBooking.technician.photo}
                    alt={sampleBooking.technician.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <div className="font-bold text-white text-sm">{sampleBooking.technician.name}</div>
                    <div className="text-xs text-amber-400 font-semibold">★ {sampleBooking.technician.rating} HVAC Master Technician</div>
                    <div className="text-[11px] text-slate-400">{sampleBooking.technician.vehicle}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Arrival In</div>
                  <div className="text-lg font-extrabold text-emerald-400 font-heading">{sampleBooking.technician.eta}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${sampleBooking.technician.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Technician</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Support</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
