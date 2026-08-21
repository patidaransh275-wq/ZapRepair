'use client';

import React from 'react';
import { X, CheckCircle2, Phone, MessageSquare, MapPin, Clock, ShieldCheck, Truck, UserCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TrackingModal() {
  const { isTrackingModalOpen, closeTrackingModal, trackingBookingId, userBookings } = useBooking();

  if (!isTrackingModalOpen) return null;

  const currentBooking = userBookings.find(b => b.id === trackingBookingId) || userBookings[0];

  const steps = [
    { label: 'Booking Confirmed', done: true },
    { label: 'Technician Assigned', done: true },
    { label: 'En Route to Location', done: currentBooking?.statusStep >= 3 },
    { label: 'Repair in Progress', done: currentBooking?.statusStep >= 4 },
    { label: 'Job Completed', done: currentBooking?.statusStep >= 5 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Live Service Status</span>
            <h3 className="font-bold text-lg font-heading">Order #{currentBooking?.id || 'IND-84920'}</h3>
          </div>
          <button
            type="button"
            onClick={closeTrackingModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {/* Status Tracker Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Progress</h4>
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 py-2">
              {steps.map((st, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    st.done
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-slate-300'
                  }`}>
                    {st.done && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className={`text-xs font-bold ${st.done ? 'text-slate-900' : 'text-slate-400'}`}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Technician Status Block (No Person Name display) */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-900 font-heading">Doorstep Service Specialist</h5>
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Doorstep Pro
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-extrabold text-amber-600">★ 4.95 Rating</div>
                <div className="text-[10px] text-slate-500">500+ Indore Repairs</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-slate-600">
              <div>
                <span className="font-semibold text-slate-700">Service Vehicle:</span> MP 09 Indore Unit
              </div>
              <div className="font-bold text-slate-900 bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                ETA: 18-30 Mins
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href="tel:+919876543210"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Helpline</span>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Location & Time summary */}
          <div className="bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl text-xs space-y-1.5 text-amber-900">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold">{currentBooking?.address || 'Indore Address'}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-amber-800">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Time Slot: {currentBooking?.date || 'Today'}, {currentBooking?.timeSlot || '2:00 PM - 4:00 PM'}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
