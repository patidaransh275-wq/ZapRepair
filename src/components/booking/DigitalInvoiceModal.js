'use client';

import React from 'react';
import { X, Download, Printer, ShieldCheck, Wrench, CheckCircle2 } from 'lucide-react';

export default function DigitalInvoiceModal({ isOpen, onClose, booking }) {
  if (!isOpen || !booking) return null;

  const handleDownloadInvoice = () => {
    alert(`Downloading Digital GST Tax Invoice #${booking.id}.pdf...`);
  };

  const gstTax = +(booking.price * 0.18).toFixed(2);
  const basePrice = +(booking.price - gstTax).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Printer className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading">Digital GST Tax Invoice</h3>
              <p className="text-xs text-amber-400 font-semibold">Invoice #{booking.id}</p>
            </div>
          </div>
          
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Printable View */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Company & Bill Details */}
          <div className="flex justify-between border-b border-slate-200 pb-4">
            <div>
              <h4 className="font-extrabold text-slate-900 text-base font-heading">PlumberIndore Tech Services</h4>
              <p className="text-slate-500">304 Apollo Tower, MG Road / Vijay Nagar Square</p>
              <p className="text-slate-500">Indore, MP - 452010 | GSTIN: 23AAAAA0000A1Z5</p>
              <p className="text-slate-500">Helpline: +91 98765 43210 | plumberindore@gmail.com</p>
            </div>

            <div className="text-right">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded">
                PAID & VERIFIED
              </span>
              <p className="text-slate-500 mt-2">Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Customer Billed To */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 text-sm">Customer Billed To:</div>
            <div className="font-semibold text-slate-800">{booking.customerName || 'Indore Homeowner'}</div>
            <div className="text-slate-600">{booking.customerPhone}</div>
            <div className="text-slate-600">{booking.address}</div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-700 bg-slate-100">
                <th className="p-2 font-bold">Item & Description</th>
                <th className="p-2 font-bold text-right">Qty</th>
                <th className="p-2 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-2 font-semibold text-slate-900">{booking.serviceName} ({booking.packageTitle})</td>
                <td className="p-2 text-right">1</td>
                <td className="p-2 text-right font-bold">₹{basePrice}</td>
              </tr>
              <tr className="border-b border-slate-200 text-slate-500">
                <td className="p-2">Doorstep Inspection & Diagnostics</td>
                <td className="p-2 text-right">1</td>
                <td className="p-2 text-right text-emerald-600 font-bold">FREE (Waived)</td>
              </tr>
              <tr className="border-b border-slate-200 text-slate-500">
                <td className="p-2">18% GST Tax (CGST 9% + SGST 9%)</td>
                <td className="p-2 text-right">1</td>
                <td className="p-2 text-right font-semibold">₹{gstTax}</td>
              </tr>
            </tbody>
          </table>

          {/* Grand Total */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between text-sm">
            <span className="font-bold">Total Net Paid Amount</span>
            <span className="text-xl font-extrabold text-amber-400 font-heading">₹{booking.price}</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Includes 30-Day Doorstep Service & Spare Parts Warranty</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button onClick={onClose} className="text-xs font-bold text-slate-600 hover:text-slate-900">
            Close Preview
          </button>
          
          <button
            onClick={handleDownloadInvoice}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
