'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, CheckCircle2, AlertCircle, Search, Printer, 
  Mail, MessageSquare, ArrowRight, ShieldCheck, CreditCard, 
  QrCode, Banknote, Calendar, MapPin, User, Phone, X, Loader2, 
  Plus, Download, RefreshCw, Send, Check, Eye, Clock, CheckCircle
} from 'lucide-react';
import { useBooking } from '../../../context/BookingContext';
import { UPI_ID, UPI_PAYEE_NAME, UPI_QR_DATA_URI } from '../../../lib/qrCode';

export default function AdminBookingsDashboard() {
  const { userBookings, updateBookingPayment, updateBookingStatus, sendInvoiceForBooking } = useBooking();

  // Local fallback demo bookings if userBookings is empty initially
  const [bookingsList, setBookingsList] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'PENDING' | 'PAID' | 'COMPLETED'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState(null);
  const [markPaidModalBooking, setMarkPaidModalBooking] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
  const [extraPartsCost, setExtraPartsCost] = useState(0);
  const [paymentRefInput, setPaymentRefInput] = useState('');
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);

  // Email sending state
  const [sendingInvoiceId, setSendingInvoiceId] = useState(null);
  const [invoiceNotification, setInvoiceNotification] = useState(null);

  // Sync bookings from API and context
  useEffect(() => {
    fetch('/api/bookings')
      .then(r => r.json())
      .then(data => {
        if (data.bookings && data.bookings.length > 0) {
          const mapped = data.bookings.map(b => ({
            id: b.booking_number || b.id,
            customerName: b.customer_name,
            customerPhone: b.customer_phone,
            customerEmail: b.customer_email,
            address: b.service_address,
            pincode: b.pincode,
            serviceName: b.service_name,
            packageTitle: b.package_title,
            price: Number(b.total_amount || b.price),
            date: b.scheduled_date,
            timeSlot: b.time_slot,
            status: b.status,
            paymentStatus: b.payment_status,
            paymentMethod: b.payment_method,
            paymentRef: b.payment_ref,
            invoiceNumber: b.invoices?.[0]?.invoice_number || null,
            invoiceSentAt: b.invoices?.[0]?.sent_at || null,
            description: b.notes,
            createdAt: b.created_at
          }));
          setBookingsList(mapped);
          return;
        }
        if (userBookings && userBookings.length > 0) {
          setBookingsList(userBookings);
        }
      })
      .catch(() => {
        if (userBookings && userBookings.length > 0) {
          setBookingsList(userBookings);
        }
      });
  }, [userBookings]);

  // Search & Filter Logic
  const filteredBookings = bookingsList.filter((b) => {
    const isPaid = b.paymentStatus === 'Paid' || b.paymentStatus === 'PAID';
    const isCompleted = b.status?.toLowerCase().includes('completed') || b.statusStep === 4;

    const matchesTab = 
      activeTab === 'ALL' ? true :
      activeTab === 'PAID' ? isPaid :
      activeTab === 'PENDING' ? !isPaid :
      activeTab === 'COMPLETED' ? isCompleted : true;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesTab;

    const matchesSearch =
      (b.id && b.id.toLowerCase().includes(query)) ||
      (b.customerName && b.customerName.toLowerCase().includes(query)) ||
      (b.customerPhone && b.customerPhone.includes(query)) ||
      (b.customerEmail && b.customerEmail.toLowerCase().includes(query)) ||
      (b.serviceName && b.serviceName.toLowerCase().includes(query)) ||
      (b.address && b.address.toLowerCase().includes(query)) ||
      (b.invoiceNumber && b.invoiceNumber.toLowerCase().includes(query));

    return matchesTab && matchesSearch;
  });

  // Calculate Metrics
  const totalRevenue = bookingsList
    .filter(b => b.paymentStatus === 'Paid' || b.paymentStatus === 'PAID')
    .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

  const pendingRevenue = bookingsList
    .filter(b => b.paymentStatus !== 'Paid' && b.paymentStatus !== 'PAID')
    .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

  const totalBookingsCount = bookingsList.length;
  const paidBookingsCount = bookingsList.filter(b => b.paymentStatus === 'Paid' || b.paymentStatus === 'PAID').length;
  const pendingBookingsCount = bookingsList.filter(b => b.paymentStatus !== 'Paid' && b.paymentStatus !== 'PAID').length;

  // Handle Mark as Paid
  const handleConfirmMarkPaid = (e) => {
    e.preventDefault();
    if (!markPaidModalBooking) return;

    setIsMarkingPaid(true);
    setTimeout(() => {
      const invNum = `INV-2026-${markPaidModalBooking.id}`;
      const newTotal = (Number(markPaidModalBooking.price) || 0) + Number(extraPartsCost || 0);
      const generatedRef = paymentRefInput.trim() || (selectedPaymentMethod === 'Cash' ? `CASH-VERIFIED/${Math.floor(100000 + Math.random() * 900000)}` : `UPI-${Math.floor(10000000 + Math.random() * 90000000)}`);

      if (updateBookingPayment) {
        updateBookingPayment(markPaidModalBooking.id, {
          paymentMethod: selectedPaymentMethod,
          paymentRef: generatedRef,
          extraParts: extraPartsCost
        });
      }

      const updated = bookingsList.map(b => {
        if (b.id === markPaidModalBooking.id) {
          return {
            ...b,
            paymentStatus: 'Paid',
            paymentMethod: selectedPaymentMethod,
            paymentRef: generatedRef,
            invoiceNumber: invNum,
            price: newTotal,
            status: 'Payment Verified & Completed'
          };
        }
        return b;
      });

      setBookingsList(updated);
      setIsMarkingPaid(false);
      setMarkPaidModalBooking(null);
      setExtraPartsCost(0);
      setPaymentRefInput('');
    }, 600);
  };

  // Manual Trigger: Send Invoice Email to Customer
  const handleManualSendInvoice = async (booking) => {
    setSendingInvoiceId(booking.id);
    setInvoiceNotification(null);

    const invNum = booking.invoiceNumber || `INV-2026-${booking.id}`;
    const recipientEmail = booking.customerEmail || 'plumberindore@gmail.com';

    try {
      const res = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber: invNum,
          customerName: booking.customerName || 'Valued Customer',
          customerEmail: recipientEmail,
          customerPhone: booking.customerPhone,
          address: booking.address,
          serviceName: booking.serviceName,
          packageTitle: booking.packageTitle || 'Doorstep Service',
          laborCost: booking.price,
          partsCost: 0,
          taxCost: 0,
          discountCost: 0,
          totalPaid: booking.price,
          paymentMethod: booking.paymentMethod || 'UPI / Cash Verified',
          paymentRef: booking.paymentRef || `TXN-${booking.id}`,
          date: booking.date
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const nowStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        
        const updated = bookingsList.map(b => {
          if (b.id === booking.id) {
            return {
              ...b,
              paymentStatus: 'Paid',
              invoiceNumber: invNum,
              invoiceSentAt: nowStr
            };
          }
          return b;
        });

        setBookingsList(updated);
        setInvoiceNotification({
          type: 'success',
          message: `✓ Invoice ${invNum} successfully emailed to ${recipientEmail}!`
        });
      } else {
        setInvoiceNotification({
          type: 'error',
          message: data.error || 'Failed to dispatch invoice email. Please check internet connection.'
        });
      }
    } catch (error) {
      setInvoiceNotification({
        type: 'error',
        message: error.message || 'Connection error while dispatching invoice.'
      });
    } finally {
      setSendingInvoiceId(null);
      setTimeout(() => {
        setInvoiceNotification(null);
      }, 5000);
    }
  };

  // Status Change Handler
  const handleStatusChange = (bookingId, newStatus) => {
    if (updateBookingStatus) {
      updateBookingStatus(bookingId, newStatus);
    }
    const updated = bookingsList.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setBookingsList(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Top Banner & Secret Admin Notice */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                🔒 Private Admin Console
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 text-xs font-mono">Unlinked Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Customer Bookings & Invoicing Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Manage incoming doorstep service requests, track payment status, and dispatch official PDF tax invoices manually.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <Link
              href="/"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-1 cursor-pointer"
            >
              <span>View Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Global Notification Banner */}
        {invoiceNotification && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between animate-fade-in ${
            invoiceNotification.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-red-950/80 border-red-500/50 text-red-300'
          }`}>
            <div className="flex items-center gap-2">
              {invoiceNotification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
              <span>{invoiceNotification.message}</span>
            </div>
            <button onClick={() => setInvoiceNotification(null)} className="p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Bookings</span>
            <div className="text-2xl font-extrabold text-white font-heading">{totalBookingsCount}</div>
            <p className="text-[11px] text-slate-500">Live & archived appointments</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">Pending Payments</span>
            <div className="text-2xl font-extrabold text-amber-400 font-heading">₹{pendingRevenue}</div>
            <p className="text-[11px] text-slate-500">{pendingBookingsCount} bookings due at doorstep</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Collected Revenue</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-heading">₹{totalRevenue}</div>
            <p className="text-[11px] text-slate-500">{paidBookingsCount} paid & invoiced orders</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">Helpline / Support</span>
            <div className="text-lg font-bold text-white font-mono">+91 91749 34135</div>
            <p className="text-[11px] text-slate-500">plumberindore@gmail.com</p>
          </div>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Name, Mobile, Email, Address, or ID..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === 'ALL'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All ({bookingsList.length})
              </button>
              <button
                onClick={() => setActiveTab('PENDING')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === 'PENDING'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Pending Payment ({pendingBookingsCount})
              </button>
              <button
                onClick={() => setActiveTab('PAID')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === 'PAID'
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Paid & Invoiced ({paidBookingsCount})
              </button>
            </div>
          </div>

          {/* Bookings List Table / Cards */}
          <div className="space-y-3">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-dashed border-slate-800">
                <FileText className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-300">No bookings match your filter</h4>
                <p className="text-xs text-slate-500 mt-0.5">Try resetting search query or tab selection.</p>
              </div>
            ) : (
              filteredBookings.map((b) => {
                const isPaid = b.paymentStatus === 'Paid' || b.paymentStatus === 'PAID';
                const isSending = sendingInvoiceId === b.id;

                return (
                  <div
                    key={b.id}
                    className="bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 rounded-2xl p-4 sm:p-5 transition-all space-y-4"
                  >
                    {/* Top Row: ID, Badges, Scheduled Time */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-extrabold text-sm text-amber-400">
                          #{b.id}
                        </span>
                        
                        {isPaid ? (
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-700/50 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>PAID (₹{b.price})</span>
                          </span>
                        ) : (
                          <span className="bg-amber-950/80 text-amber-400 border border-amber-600/50 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>PAYMENT PENDING (₹{b.price})</span>
                          </span>
                        )}

                        {b.invoiceSentAt && (
                          <span className="bg-blue-950 text-blue-300 border border-blue-700/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Mail className="w-3 h-3 text-blue-400" />
                            <span>Invoice Emailed</span>
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-300 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-bold">{b.date || 'Today'}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-amber-300 font-semibold">{b.timeSlot || 'Slot'}</span>
                      </div>
                    </div>

                    {/* Middle Row: Customer Info & Booked Services */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      
                      {/* Customer Contact */}
                      <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Customer Information
                        </span>
                        <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{b.customerName || 'Customer'}</span>
                        </div>
                        <div className="text-slate-300 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`tel:${b.customerPhone}`} className="hover:text-amber-400 font-mono font-bold">
                            {b.customerPhone}
                          </a>
                        </div>
                        {b.customerEmail && (
                          <div className="text-slate-400 flex items-center gap-1.5 truncate">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <a href={`mailto:${b.customerEmail}`} className="hover:text-amber-400 truncate">
                              {b.customerEmail}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Doorstep Address */}
                      <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Doorstep Location
                        </span>
                        <div className="text-slate-200 font-medium flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{b.address || 'Indore Address'} ({b.pincode || 'Indore'})</span>
                        </div>
                        {b.description && (
                          <p className="text-[11px] text-amber-300/80 italic pt-1 line-clamp-2">
                            Note: &ldquo;{b.description}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Booked Services Summary */}
                      <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-700/40 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Services & Total
                          </span>
                          <div className="font-bold text-white text-xs">
                            {b.serviceName}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {b.packageTitle}
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                          <span className="text-slate-400 font-bold">Amount:</span>
                          <span className="text-base font-extrabold text-amber-400 font-heading">₹{b.price}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Row: Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      
                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-bold">Status:</span>
                        <select
                          value={b.status || 'Technician Assigned'}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold px-2.5 py-1 text-slate-200 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="Technician Assigned">Technician Assigned</option>
                          <option value="On The Way (45-Min)">On The Way (45-Min)</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Payment Verified & Completed">Completed & Paid</option>
                          <option value="Rescheduled">Rescheduled</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        
                        {/* WhatsApp Contact */}
                        <a
                          href={`https://wa.me/91${b.customerPhone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${b.customerName || 'Sir/Madam'}, this is regarding your PlumberIndore doorstep service booking #${b.id} (${b.serviceName}). Our verified technician is assigned.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 border border-emerald-600/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Mark Paid Button (if unpaid) */}
                        {!isPaid && (
                          <button
                            type="button"
                            onClick={() => setMarkPaidModalBooking(b)}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <Banknote className="w-3.5 h-3.5" />
                            <span>Mark as Paid</span>
                          </button>
                        )}

                        {/* Manual Send Invoice Button */}
                        <button
                          type="button"
                          disabled={isSending}
                          onClick={() => handleManualSendInvoice(b)}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          title="Dispatch official PDF invoice to customer email"
                        >
                          {isSending ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Invoice</span>
                            </>
                          )}
                        </button>

                        {/* View Invoice Modal Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedInvoiceBooking(b)}
                          className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview Invoice</span>
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

      {/* MARK AS PAID MODAL */}
      {markPaidModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-4 p-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-amber-400 font-heading">Record Customer Payment</h3>
                <p className="text-xs text-slate-400">Booking #{markPaidModalBooking.id} • {markPaidModalBooking.customerName}</p>
              </div>
              <button onClick={() => setMarkPaidModalBooking(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmMarkPaid} className="space-y-4 text-xs">
              
              {/* Payment Method Selector */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">Select Received Payment Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI', 'Cash', 'Card'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(mode)}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                        selectedPaymentMethod === mode
                          ? 'border-amber-500 bg-amber-500/20 text-amber-400 ring-1 ring-amber-500'
                          : 'border-slate-800 bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Spare Parts Cost */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Additional Materials / Spare Parts Cost (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={extraPartsCost}
                  onChange={(e) => setExtraPartsCost(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl font-bold text-white text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Transaction Ref / UTR */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Transaction Ref / UTR Number (Optional)
                </label>
                <input
                  type="text"
                  value={paymentRefInput}
                  onChange={(e) => setPaymentRefInput(e.target.value)}
                  placeholder="e.g. UPI-9174934135-TXN882"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Total Calculation */}
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-bold">Total Paid Amount:</span>
                <span className="text-base font-extrabold text-emerald-400 font-heading">
                  ₹{(Number(markPaidModalBooking.price) || 0) + Number(extraPartsCost || 0)}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMarkPaidModalBooking(null)}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isMarkingPaid}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{isMarkingPaid ? 'Saving...' : 'Confirm Paid & Generate Invoice'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* INVOICE PREVIEW MODAL */}
      {selectedInvoiceBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-slate-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">
                  Invoice Preview: {selectedInvoiceBooking.invoiceNumber || `INV-2026-${selectedInvoiceBooking.id}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button onClick={() => setSelectedInvoiceBooking(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-950 font-heading">
                    Plumber<span className="text-amber-500">Indore</span>
                  </h2>
                  <p className="text-slate-500 text-[11px]">PlumberIndore Tech Services Private Limited</p>
                  <p className="text-slate-500 text-[11px]">Indore, MP • Helpline: +91 91749 34135</p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase border border-emerald-200">
                    TAX INVOICE
                  </span>
                  <p className="font-mono font-bold text-slate-900 mt-2">
                    {selectedInvoiceBooking.invoiceNumber || `INV-2026-${selectedInvoiceBooking.id}`}
                  </p>
                  <p className="text-slate-500 text-[11px]">Date: {selectedInvoiceBooking.date || 'Today'}</p>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Billed To:</span>
                  <div className="font-bold text-slate-900 text-sm">{selectedInvoiceBooking.customerName || 'Customer'}</div>
                  <div className="text-slate-600">{selectedInvoiceBooking.customerPhone}</div>
                  <div className="text-slate-600">{selectedInvoiceBooking.address}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Payment Status:</span>
                  <div className="font-extrabold text-emerald-700 text-sm">
                    {selectedInvoiceBooking.paymentStatus === 'Paid' ? '● Verified Paid' : '● Due on Doorstep'}
                  </div>
                  <div className="text-slate-600">Mode: {selectedInvoiceBooking.paymentMethod || 'Cash / UPI'}</div>
                  <div className="text-slate-500 font-mono text-[10px] truncate">Ref: {selectedInvoiceBooking.paymentRef || `TXN-${selectedInvoiceBooking.id}`}</div>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-slate-500 text-[10px] uppercase">
                    <th className="py-2">Service Description</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5">
                      <div className="font-bold text-slate-900">{selectedInvoiceBooking.serviceName}</div>
                      <div className="text-[11px] text-slate-500">{selectedInvoiceBooking.packageTitle}</div>
                    </td>
                    <td className="py-2.5 text-right font-bold text-slate-900">₹{selectedInvoiceBooking.price}</td>
                  </tr>
                </tbody>
              </table>

              {/* Total Card */}
              <div className="flex justify-end border-t border-slate-200 pt-3">
                <div className="w-56 bg-slate-900 text-white p-3 rounded-xl space-y-1">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Subtotal:</span>
                    <span>₹{selectedInvoiceBooking.price}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-amber-400 border-t border-slate-700 pt-1">
                    <span>Total Paid:</span>
                    <span>₹{selectedInvoiceBooking.price}</span>
                  </div>
                </div>
              </div>

              {/* Compact Quick Scan & Pay UPI Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 shrink-0 shadow-sm flex items-center justify-center">
                    <img
                      src={UPI_QR_DATA_URI}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                      Quick Scan & Pay
                    </span>
                    <div className="text-xs font-bold text-slate-900">
                      UPI ID: <span className="font-mono text-emerald-700 select-all">{UPI_ID}</span> ({UPI_PAYEE_NAME})
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Google Pay • PhonePe • Paytm • BHIM • Cred
                    </div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-semibold text-slate-400 block">Instant Settlement</span>
                  <span className="text-[11px] font-bold text-emerald-600">✓ 0% Surcharge</span>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center text-[10px] text-slate-500">
                This is a computer-generated tax invoice issued by PlumberIndore Tech Services.<br />
                For warranty assistance or support, call <strong>+91 91749 34135</strong> or email <strong>plumberindore@gmail.com</strong>.
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-100 p-4 flex justify-between items-center shrink-0 border-t border-slate-200">
              <button
                onClick={() => setSelectedInvoiceBooking(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleManualSendInvoice(selectedInvoiceBooking);
                  setSelectedInvoiceBooking(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Email Invoice to Customer</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
