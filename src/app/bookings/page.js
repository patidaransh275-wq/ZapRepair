'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Phone, MessageSquare, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, User, Loader2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function BookingsPage() {
  const router = useRouter();
  const { userBookings, openTrackingModal, openBookingModal, cancelBooking, isAuthenticated, authLoading } = useBooking();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?returnUrl=/bookings');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="py-24 text-center space-y-3 bg-slate-50 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
        <p className="text-xs font-semibold text-slate-600">Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Customer Portal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 font-heading mt-2">
              My Bookings & Service History
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track live technician location, view invoices, and manage upcoming doorstep visits in Indore.
            </p>
          </div>

          <button
            onClick={() => openBookingModal('ac-repair')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all shrink-0"
          >
            + Book New Service
          </button>
        </div>

        {/* Bookings List */}
        {userBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold font-heading text-slate-900">No Bookings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You don't have any active or past service bookings yet. Book an Indore technician today for doorstep repair!
            </p>
            <button
              onClick={() => openBookingModal('ac-repair')}
              className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
            >
              Book Service Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 space-y-4"
              >
                {/* Top Row: Service Name & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 font-heading">{b.serviceName}</h3>
                      <span className="text-xs text-slate-400 font-mono">({b.id})</span>
                    </div>
                    <p className="text-xs text-slate-500">{b.packageTitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                      b.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : b.status === 'Cancelled'
                        ? 'bg-red-50 text-red-800 border-red-200'
                        : 'bg-amber-50 text-amber-900 border-amber-300 animate-pulse'
                    }`}>
                      ● {b.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Scheduled Date & Time</div>
                      <div>{b.date}, {b.timeSlot}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Address</div>
                      <div className="truncate max-w-[220px]">{b.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Assigned Pro</div>
                      <div>{b.technician ? b.technician.name : 'Assigning...'}</div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-500">Total Payable:</span>
                    <span className="text-base font-extrabold text-slate-900 font-heading">₹{b.price}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => openTrackingModal(b.id)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm"
                    >
                      Track Service Live
                    </button>

                    {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                      <button
                        onClick={() => {
                          if (confirm(`Cancel booking ${b.id}?`)) {
                            cancelBooking(b.id);
                          }
                        }}
                        className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-2 rounded-xl text-xs border border-red-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
