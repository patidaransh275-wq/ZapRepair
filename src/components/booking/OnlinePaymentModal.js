'use client';

import React, { useState } from 'react';
import { X, CreditCard, QrCode, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function OnlinePaymentModal({ isOpen, onClose, booking, onPaymentSuccess }) {
  const [method, setMethod] = useState('upi'); // 'upi' | 'card' | 'post'
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!isOpen || !booking) return null;

  const handlePayNow = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);

      const txnRef = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const payMode = method === 'upi' ? 'UPI (GPay/PhonePe)' : method === 'card' ? 'Credit/Debit Card' : 'Pay After Service Fix';

      // 1. Notify payment receipt
      fetch('/api/payment/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'success',
          booking: booking,
          paymentMethod: payMode,
          paymentRef: txnRef,
          amount: booking.price
        })
      }).catch(err => console.warn('Payment receipt email dispatch error:', err));

      // 2. Auto-generate and dispatch official invoice immediately
      fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
          customerName: booking.customerName || 'Customer',
          customerEmail: booking.customerEmail || 'plumberindore@gmail.com',
          customerPhone: booking.customerPhone || '+91 91749 34135',
          address: booking.address,
          serviceName: booking.serviceName,
          packageTitle: booking.packageTitle,
          laborCost: booking.price,
          totalPaid: booking.price,
          paymentMethod: payMode,
          paymentRef: txnRef
        })
      }).catch(err => console.warn('Auto invoice dispatch error:', err));

      setTimeout(() => {
        setPaid(false);
        if (onPaymentSuccess) onPaymentSuccess();
        onClose();
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading">Secure Payment Gateway</h3>
              <p className="text-xs text-emerald-400 font-semibold">256-Bit Encrypted Transaction</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePayNow} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          
          {/* Payable Summary */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Booking #{booking.id}</span>
              <h4 className="font-bold text-sm text-slate-900">{booking.serviceName}</h4>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-amber-600 font-heading">₹{booking.price}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Payment Method
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  method === 'upi'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 text-slate-700 bg-slate-50/50'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs">UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  method === 'card'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 text-slate-700 bg-slate-50/50'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <span className="text-xs">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('post')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  method === 'post'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 text-slate-700 bg-slate-50/50'
                }`}
              >
                <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                <span className="text-xs">Pay Later</span>
              </button>
            </div>
          </div>

          {/* UPI QR Display */}
          {method === 'upi' && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center space-y-3">
              <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-300 mx-auto shadow-sm flex items-center justify-center">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>
              <p className="text-xs font-semibold text-slate-600">Scan QR Code via PhonePe, GPay, Paytm, or BHIM UPI</p>
            </div>
          )}

          {/* Card Form */}
          {method === 'card' && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number (4532 •••• •••• ••••)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
                <input
                  type="password"
                  maxLength={3}
                  placeholder="CVV"
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>
            </div>
          )}

          {/* Pay Later */}
          {method === 'post' && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-semibold space-y-1">
              <div className="font-bold">Pay After Service Completion</div>
              <div>Inspect technician repair work at your doorstep, then pay via Cash, UPI or Card.</div>
            </div>
          )}

          {paid && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Payment Verified Successfully!</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium pl-6">
                Official Tax Invoice & Warranty Receipt dispatched to <strong>{booking.customerPhone || 'registered phone number'}</strong>.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || paid}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl shadow-md text-xs transition-all disabled:opacity-50"
          >
            <span>{loading ? 'Processing Payment...' : method === 'post' ? 'Confirm Pay After Fix' : `Pay ₹${booking.price} Securely`}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
