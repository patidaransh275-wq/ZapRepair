'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Phone, ShieldCheck, ArrowRight, CheckCircle2, User, Loader2, RefreshCw, Mail, MessageSquare, Printer, CreditCard, Star, ShieldAlert } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import RescheduleModal from '../../components/booking/RescheduleModal';
import DigitalInvoiceModal from '../../components/booking/DigitalInvoiceModal';
import OnlinePaymentModal from '../../components/booking/OnlinePaymentModal';
import ReviewSubmissionModal from '../../components/booking/ReviewSubmissionModal';
import DisputeTicketModal from '../../components/booking/DisputeTicketModal';
import InAppChatDrawer from '../../components/tracking/InAppChatDrawer';

export default function BookingsPage() {
  const router = useRouter();
  const { userBookings, openTrackingModal, openBookingModal, openRescheduleModal, cancelBooking, isAuthenticated, authLoading } = useBooking();

  const [activeInvoiceBooking, setActiveInvoiceBooking] = useState(null);
  const [activePaymentBooking, setActivePaymentBooking] = useState(null);
  const [activeReviewBooking, setActiveReviewBooking] = useState(null);
  const [activeTicketBooking, setActiveTicketBooking] = useState(null);
  const [activeChatBooking, setActiveChatBooking] = useState(null);

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

  if (!isAuthenticated) return null;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      
      {/* Modals & Drawers */}
      <RescheduleModal />

      <DigitalInvoiceModal
        isOpen={!!activeInvoiceBooking}
        onClose={() => setActiveInvoiceBooking(null)}
        booking={activeInvoiceBooking}
      />

      <OnlinePaymentModal
        isOpen={!!activePaymentBooking}
        onClose={() => setActivePaymentBooking(null)}
        booking={activePaymentBooking}
        onPaymentSuccess={() => alert('Payment completed successfully!')}
      />

      <ReviewSubmissionModal
        isOpen={!!activeReviewBooking}
        onClose={() => setActiveReviewBooking(null)}
        booking={activeReviewBooking}
      />

      <DisputeTicketModal
        isOpen={!!activeTicketBooking}
        onClose={() => setActiveTicketBooking(null)}
        booking={activeTicketBooking}
      />

      <InAppChatDrawer
        isOpen={!!activeChatBooking}
        onClose={() => setActiveChatBooking(null)}
        booking={activeChatBooking}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Customer Self-Service Portal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 font-heading mt-2">
              My Bookings & Invoices
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Live GPS tracking, digital invoices, online payment, reschedule/cancellation, and dispute ticket support.
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
                        : b.status === 'Rescheduled'
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-amber-50 text-amber-900 border-amber-300 animate-pulse'
                    }`}>
                      ● {b.status}
                    </span>
                  </div>
                </div>

                {/* Notification Sent Alert Bar */}
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      SMS Confirmation Sent
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      Email Receipt Sent
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Verified Indore Order</span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Scheduled Date & Time</div>
                      <div className="font-semibold text-slate-800">{b.date}, {b.timeSlot}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Doorstep Location</div>
                      <div className="truncate max-w-[220px]">{b.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Assigned Pro</div>
                      <div>{b.technician ? b.technician.title : 'Assigning...'}</div>
                    </div>
                  </div>
                </div>

                {/* Secondary Action Toolbar: Invoices, Pay Online, Chat, Dispute */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveInvoiceBooking(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-600" />
                    <span>Digital Invoice PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentBooking(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pay Online (UPI/Card)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveChatBooking(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                    <span>Chat In-App</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveReviewBooking(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold rounded-lg border border-blue-200 transition-colors"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>Submit Review</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTicketBooking(b)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg border border-red-200 transition-colors ml-auto"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Dispute Ticket</span>
                  </button>
                </div>

                {/* Primary Actions Footer */}
                <div className="bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-500">Total Amount:</span>
                    <span className="text-base font-extrabold text-slate-900 font-heading">₹{b.price}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                    <button
                      type="button"
                      onClick={() => openTrackingModal(b.id)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm"
                    >
                      Live GPS Tracking
                    </button>

                    {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                      <>
                        <button
                          type="button"
                          onClick={() => openRescheduleModal(b.id)}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm transition-all"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Reschedule Date</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to cancel booking ${b.id}?`)) {
                              cancelBooking(b.id);
                            }
                          }}
                          className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-2 rounded-xl text-xs border border-red-200 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      </>
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
