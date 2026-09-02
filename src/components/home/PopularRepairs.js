'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';
import { getLegacyServiceRedirect } from '../../data/categoriesData';

export default function PopularRepairs() {
  const { openBookingModal } = useBooking();

  // The 4 top high-demand repairs requested: AC Repair, Plumbing, Electrician, Carpenter & Paint
  const featuredIds = ['ac-repair', 'plumber', 'electrician', 'carpenter'];

  const topServices = featuredIds.map((id) => {
    const srv = SERVICES_DATA.find((s) => s.id === id);
    if (!srv) return null;

    if (id === 'carpenter') {
      return {
        ...srv,
        name: 'Carpenter & Paint',
        description: 'Door locks, furniture assembly, hinge fixes, custom woodwork repairs, and paint touch-ups across Indore.',
        customUrl: '/carpenter-paint',
        bannerImage: '/images/services/carpenter-paint.jpg',
      };
    }

    return srv;
  }).filter(Boolean);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
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
            <span>Explore All 13 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Featured Service Cards with 16:9 Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {topServices.map((srv) => {
            const targetUrl = srv.customUrl || getLegacyServiceRedirect(srv.slug);
            return (
              <div
                key={srv.id}
                className="group bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* High-Resolution 16:9 Image with Rounded Corners */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-inner">
                    <img
                      src={srv.bannerImage}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-amber-300 flex items-center gap-1 border border-slate-700/50">
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                      <span>{srv.badge || 'Popular'}</span>
                    </div>
                  </div>

                  {/* Title and Short Description */}
                  <div>
                    <Link href={targetUrl} className="block group-hover:text-amber-600 transition-colors">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading line-clamp-1 leading-tight group-hover:text-amber-600 transition-colors">
                        {srv.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-1.5">
                      {srv.description}
                    </p>
                  </div>

                </div>

                {/* Bottom Card Action & Price */}
                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      Starting At
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
                      ₹{srv.startingPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBookingModal(srv.id)}
                    className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
