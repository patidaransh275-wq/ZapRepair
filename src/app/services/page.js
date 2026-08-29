'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, ShieldCheck, MapPin, ArrowRight, Filter, Loader2 } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';
import PackageComparisonTable from '../../components/services/PackageComparisonTable';

function ServicesContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { openBookingModal } = useBooking();

  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
  }, [queryParam]);

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesQuery = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || s.id === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
          Certified Doorstep Technicians in Indore
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          All Plumbing & Appliance Services
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          Transparent fixed pricing card, 45-minute doorstep arrival, and 30-day post service warranty across all Indore sectors.
        </p>

        {/* Instant Search Bar & Category Filter */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AC PCB, Tap leakage, RO membrane..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-soft-sm"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 px-3.5 py-3 bg-white border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-soft-sm"
          >
            <option value="all">All Categories</option>
            <option value="ac-repair">Air Conditioner (AC)</option>
            <option value="refrigerator">Refrigerator</option>
            <option value="washing-machine">Washing Machine</option>
            <option value="ro-purifier">RO Water Purifier</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={srv.bannerImage}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[11px] font-extrabold px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Day Warranty</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-900 font-heading">{srv.name}</h3>
                
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                  <span className="text-slate-500 font-medium">Starts from</span>
                  <span className="text-lg font-extrabold text-amber-600 font-heading">₹{srv.startingPrice}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-2">
              <Link
                href={`/services/${srv.slug}`}
                className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                View Details
              </Link>

              <button
                onClick={() => openBookingModal(srv.id)}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all"
              >
                Book Now
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Package Comparison Matrix */}
      <PackageComparisonTable />

    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <Suspense fallback={
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 mt-2">Loading services...</p>
        </div>
      }>
        <ServicesContent />
      </Suspense>
    </div>
  );
}
