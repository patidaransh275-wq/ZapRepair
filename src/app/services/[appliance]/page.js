'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, MapPin, Clock, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Wrench, HelpCircle, PhoneCall } from 'lucide-react';
import { SERVICES_DATA } from '../../../data/servicesData';
import { useBooking } from '../../../context/BookingContext';
import { checkPincodeServiceability } from '../../../data/pincodesData';

export default function ServiceDetailPage({ params }) {
  const { appliance } = params;
  const service = SERVICES_DATA.find((s) => s.slug === appliance || s.id === appliance);

  const { openBookingModal, userPincode, setUserPincode } = useBooking();
  const [pinInput, setPinInput] = useState(userPincode || '452010');
  const [pinResult, setPinResult] = useState(null);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  if (!service) {
    return (
      <div className="py-24 text-center space-y-4 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-slate-900 font-heading">Service Not Found</h1>
        <p className="text-xs text-slate-600">The requested appliance service page could not be found.</p>
        <Link href="/services" className="inline-block bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs">
          View All Indore Services
        </Link>
      </div>
    );
  }

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    const res = checkPincodeServiceability(pinInput);
    setPinResult(res);
    if (res.valid) {
      setUserPincode(pinInput);
    }
  };

  // Structured Data Schema for Google SEO
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': service.name,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'PlumberIndore',
      'telephone': '+91-9876543210',
      'email': 'plumberindore@gmail.com',
      'priceRange': '₹₹',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '304 Apollo Tower, MG Road / Vijay Nagar Square',
        'addressLocality': 'Indore',
        'addressRegion': 'Madhya Pradesh',
        'postalCode': '452010',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 22.7533,
        'longitude': 75.8937
      }
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Indore'
    },
    'description': service.description,
    'offers': {
      '@type': 'Offer',
      'price': service.startingPrice,
      'priceCurrency': 'INR'
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Inject Google SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white pt-8 pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-amber-400 font-semibold">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>30-Day Post Service Warranty in Indore</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white leading-tight">
                {service.name} in Indore
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {service.description}
              </p>

              <div className="flex items-center gap-4 text-xs pt-2">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{service.rating} / 5</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300 font-semibold">{service.reviewCount}+ Indore Repairs</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-400 font-semibold">100% Genuine Spare Parts</span>
              </div>

              {/* Quick Book Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => openBookingModal(service.id)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg text-sm transition-all"
                >
                  Book Service (Starts ₹{service.startingPrice})
                </button>
                <a
                  href="tel:+919876543210"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs border border-slate-700 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call Helpline</span>
                </a>
              </div>

            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                <img
                  src={service.bannerImage}
                  alt={`${service.name} Indore`}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700">
                  ⚡ <span className="font-bold text-amber-400">45-Minute Doorstep Arrival</span> guaranteed across all Vijay Nagar, Palasia & Indore pincodes.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 space-y-12">
        
        {/* Pincode Availability Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
          <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-heading shrink-0">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>Check Indore Pincode Availability:</span>
            </div>
            <div className="flex-1 w-full flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 6-digit Pincode (e.g. 452010)"
                className="w-full sm:w-48 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0"
              >
                Check
              </button>
            </div>
            {pinResult && (
              <div className={`text-xs font-semibold px-3 py-2 rounded-xl w-full sm:w-auto ${
                pinResult.valid ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
              }`}>
                {pinResult.message}
              </div>
            )}
          </form>
        </div>

        {/* Pricing / Packages Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-heading">
                Service Packages & Fixed Pricing
              </h2>
              <p className="text-xs text-slate-500">
                Transparent labor & service charges. Doorstep inspection fee waived if repair is approved.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 font-heading">{pkg.title}</h3>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-slate-900 font-heading">₹{pkg.price}</div>
                      {pkg.originalPrice && (
                        <div className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{pkg.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Duration: {pkg.duration}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    30-Day Warranty Included
                  </span>

                  <button
                    onClick={() => openBookingModal(service.id, pkg)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
                  >
                    Select & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Issues Solved */}
        {service.issues && service.issues.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-soft-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Common {service.name} Problems Solved in Indore
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {service.issues.map((iss, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-900">{iss.title}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 shrink-0">From ₹{iss.startingPrice}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-soft-sm space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-slate-900 font-heading">
                Frequently Asked Questions ({service.name} - Indore)
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Local Service Coverage Notice */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 text-center space-y-4">
          <h3 className="text-xl font-bold font-heading">Need Doorstep {service.name} in Indore?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            PlumberIndore technicians are active across Vijay Nagar, Palasia, Bhanwarkuan, Rau, Sudama Nagar, Annapurna, and all Indore sectors with guaranteed 45-minute arrival.
          </p>
          <button
            onClick={() => openBookingModal(service.id)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-8 py-3 rounded-xl text-sm shadow-md"
          >
            Book Doorstep Technician Now
          </button>
        </div>

      </div>
    </div>
  );
}
