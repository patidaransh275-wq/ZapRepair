'use client';

import React from 'react';
import { Zap, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function PopularRepairs() {
  const { openBookingModal } = useBooking();

  const popularIssues = [
    {
      id: 'ac-cooling',
      serviceId: 'ac-repair',
      title: 'AC Power Foam Jet Service',
      category: 'AC Repair',
      problem: 'Water leakage or poor cooling in indoor unit',
      price: 499,
      tag: 'Best Seller'
    },
    {
      id: 'ref-gas',
      serviceId: 'refrigerator',
      title: 'Refrigerator Gas Charging & Leak Repair',
      category: 'Refrigerator',
      problem: 'Freezer ice melting & lower compartment not cooling',
      price: 1499,
      tag: '60-Day Gas Warranty'
    },
    {
      id: 'wm-spin',
      serviceId: 'washing-machine',
      title: 'Washing Machine Drum Descaling & Spin Fix',
      category: 'Washing Machine',
      problem: 'Vibration noise, drum stuck, or water drain fault',
      price: 499,
      tag: 'Same-Day'
    },
    {
      id: 'ro-kit',
      serviceId: 'ro-purifier',
      title: 'RO Purifier All-Filter Replacement Kit',
      category: 'RO Water Purifier',
      problem: 'Bad water taste, low drop flow, high TDS',
      price: 799,
      tag: 'Pure Water Guarantee'
    },
    {
      id: 'chim-degrease',
      serviceId: 'kitchen-chimney',
      title: 'Kitchen Chimney Chemical Degreasing',
      category: 'Kitchen Chimney',
      problem: 'Oil dripping, clogged baffle filters, poor suction',
      price: 599,
      tag: 'Deep Cleaning'
    },
    {
      id: 'geyser-element',
      serviceId: 'geyser',
      title: 'Geyser Heavy Copper Element & Thermostat Fix',
      category: 'Water Heater',
      problem: 'No hot water or MCB tripping on turning on',
      price: 499,
      tag: 'Safety Tested'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Instant Price Estimator
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading mt-2">
              Popular Doorstep Repairs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Fixed rate cards for everyday home appliance issues. Inspection fee waived on repair!
            </p>
          </div>
        </div>

        {/* Issue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularIssues.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:bg-white shadow-soft-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4 flex items-start gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Fixes: {item.problem}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Fixed Price</span>
                  <span className="text-xl font-extrabold text-slate-900 font-heading">₹{item.price}</span>
                </div>

                <button
                  onClick={() => openBookingModal(item.serviceId)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
