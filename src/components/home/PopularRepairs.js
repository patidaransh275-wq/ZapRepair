'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';

export default function PopularRepairs() {
  const { openBookingModal } = useBooking();
  const topServices = SERVICES_DATA.slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-block mb-2">
              High Demand Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Most Booked Repairs in Indore
            </h2>
          </div>

          <Link
            href="/services"
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 shrink-0"
          >
            <span>Explore All 12 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-40 rounded-xl overflow-hidden bg-slate-900 relative">
                  <img
                    src={srv.bannerImage}
                    alt={srv.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-bold text-slate-900 text-base font-heading">{srv.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{srv.description}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Fixed Rate</span>
                  <span className="text-base font-extrabold text-slate-900 font-heading">₹{srv.startingPrice}</span>
                </div>

                <button
                  onClick={() => openBookingModal(srv.id)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
