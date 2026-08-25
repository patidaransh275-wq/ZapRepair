'use client';

import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Wrench, Building2 } from 'lucide-react';

export default function DigitalInvoiceModal({ isOpen, onClose, booking }) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const laborCost = booking.price ? Math.round(booking.price * 0.85) : 399;
  const taxCost = Math.round(booking.price * 0.15) || 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Action Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm font-heading">Digital Invoice Viewer</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>

            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-900 text-xs bg-white print:p-0">
          
          {/* Invoice Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold font-heading text-slate-900">
                Plumber<span className="text-amber-500">Indore</span>
              </h2>
              <p className="text-slate-500 font-medium">PlumberIndore Tech Services Private Limited</p>
              <p className="text-slate-500">Doorstep Home Service Network, Indore, MP</p>
              <p className="text-slate-500">Helpline: +91 91749 34135 | plumberindore@gmail.com</p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-xs border border-emerald-200">
                OFFICIAL RECEIPT
              </span>
              <div className="text-slate-500 pt-1 font-mono">Invoice #: INV-{booking.id}</div>
              <div className="text-slate-500">Date: {booking.date || '2026-08-25'}</div>
            </div>
          </div>

          {/* Billed To Details */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Billed Customer</span>
              <div className="font-bold text-slate-900 text-sm">{booking.customerName || 'Ansh Patidar'}</div>
              <div className="text-slate-600">{booking.address}</div>
              <div className="text-slate-600">Pincode: {booking.pincode} (Indore)</div>
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Service Order Summary</span>
              <div className="font-bold text-slate-900">{booking.serviceName}</div>
              <div className="text-slate-600">{booking.packageTitle}</div>
              <div className="text-emerald-700 font-bold mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                30-Day Doorstep Warranty Included
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase">
                <th className="py-2">Description</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold">
                  <div>{booking.serviceName} - {booking.packageTitle}</div>
                  <div className="text-[10px] text-slate-400">Includes 45-min doorstep arrival, diagnostic inspection & labor</div>
                </td>
                <td className="py-3 text-center">1</td>
                <td className="py-3 text-right font-bold">₹{laborCost}</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold">
                  <div>Service Tax & Eco-Handling Fee</div>
                  <div className="text-[10px] text-slate-400">Standard service processing</div>
                </td>
                <td className="py-3 text-center">1</td>
                <td className="py-3 text-right font-bold">₹{taxCost}</td>
              </tr>
            </tbody>
          </table>

          {/* Total Calculation */}
          <div className="border-t border-slate-200 pt-4 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{laborCost + taxCost}</span>
              </div>
              <div className="flex justify-between font-extrabold text-base text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Paid</span>
                <span className="text-amber-600">₹{booking.price}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-[11px] text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you for choosing PlumberIndore! For warranty claims or support, call +91 91749 34135.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
