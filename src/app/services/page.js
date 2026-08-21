'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Wrench, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { openBookingModal } = useBooking();

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Complete Service Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading mt-3">
            All Home Services & Repairs
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Transparent pricing, 100% genuine spare parts, and 30-day post-service warranty on all 12 services.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AC, Refrigerator, Washing Machine, Electrician..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10 overflow-x-auto no-scrollbar pb-2">
          <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1">
            {[
              { id: 'all', label: 'All Services (12)' },
              { id: 'appliance', label: 'Appliance Repair (10)' },
              { id: 'electrician', label: 'Electrician' },
              { id: 'plumber', label: 'Plumber' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  categoryFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={srv.bannerImage}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-slate-700">
                    ★ {srv.rating} ({srv.reviewCount})
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Top Services</div>
                    {srv.packages.slice(0, 2).map((pkg) => (
                      <div key={pkg.id} className="flex justify-between items-center text-xs text-slate-700">
                        <span className="truncate max-w-[200px]">• {pkg.title}</span>
                        <span className="font-bold text-slate-900">₹{pkg.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Starts From</span>
                  <span className="text-lg font-extrabold text-slate-900 font-heading">₹{srv.startingPrice}</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => openBookingModal(srv.id)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-sm transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
