'use client';

import React from 'react';
import { X, Phone, MessageSquare, ShieldCheck, MapPin, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TrackingModal() {
  const { isTrackingModalOpen, closeTrackingModal, trackingBookingId, userBookings, cancelBooking } = useBooking();

  if (!isTrackingModalOpen || !trackingBookingId) return null;

  const booking = userBookings.find(b => b.id === trackingBookingId);

  if (!booking) return null;

  const statusSteps = [
    { title: 'Booking Confirmed', step: 1 },
    { title: 'Technician Assigned', step: 2 },
    { title: 'Technician En Route', step: 3 },
    { title: 'Service In Progress', step: 4 },
    { title: 'Job Completed', step: 5 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Live Service Tracker</span>
            <h3 className="text-lg font-bold font-heading">{booking.serviceName}</h3>
            <p className="text-xs text-slate-400">Order ID: {booking.id}</p>
          </div>
          <button
            onClick={closeTrackingModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Status Tracker Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Order Progress</h4>
            <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {statusSteps.map((s) => {
                const isPassed = booking.statusStep >= s.step;
                const isCurrent = booking.statusStep === s.step;
                return (
                  <div key={s.step} className="flex items-center gap-3 relative z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                    </div>
                    <span className={`text-xs font-semibold ${
                      isCurrent ? 'text-amber-600 font-bold' : isPassed ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technician Details */}
          {booking.technician && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Professional</div>
              <div className="flex items-center gap-3">
                <img
                  src={booking.technician.photo}
                  alt={booking.technician.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-sm"
                />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">{booking.technician.name}</div>
                  <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>★ {booking.technician.rating} ({booking.technician.repairsCount}+ Repairs)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{booking.technician.vehicle}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <a
                  href={`tel:${booking.technician.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Technician</span>
                </a>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20ZapRepair,%20checking%20status%20for%20Booking%20${booking.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Status</span>
                </a>
              </div>
            </div>
          )}

          {/* Booking Info */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="font-semibold">Scheduled Date:</span>
              <span className="font-bold text-slate-900">{booking.date}, {booking.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Service Address:</span>
              <span className="text-slate-900 text-right max-w-xs">{booking.address}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900 text-sm">
              <span>Total Price:</span>
              <span className="text-amber-600">₹{booking.price}</span>
            </div>
          </div>

          {/* Cancel Option */}
          {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this booking?')) {
                    cancelBooking(booking.id);
                    closeTrackingModal();
                  }
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center justify-center gap-1 w-full py-2"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Cancel Booking</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
