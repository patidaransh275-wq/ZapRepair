'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Zap, ArrowRight, Clock, Award } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function SubscriptionPlans() {
  const { openBookingModal } = useBooking();

  const plans = [
    {
      id: 'amc-ac-quarterly',
      title: 'Quarterly AC Care Plan',
      badge: 'Most Popular',
      price: 1499,
      period: 'per year',
      savings: 'Save ₹800/yr',
      description: '4 Deep Foam Jet Services per year + Priority 30-min doorstep arrival in Indore.',
      features: [
        '4 Scheduled Deep Foam Jet Servicings',
        'Free Gas Leak Inspection & Pressure Check',
        '15% Discount on Original Spare Replacement',
        'Zero Emergency Visit Charges across Indore'
      ]
    },
    {
      id: 'amc-plumbing-ro',
      title: 'Bi-Annual Plumbing & RO AMC',
      badge: 'Best Value',
      price: 1899,
      period: 'per year',
      savings: 'Save ₹1,200/yr',
      description: '2 Complete RO Filter Kit replacements + unlimited free doorstep plumbing fixes.',
      features: [
        '2 Complete RO Purifier Filter Replacement Kits',
        'Unlimited Doorstep Tap & Pipe Leakage Visits',
        'TDS Balancing & Water Tank Health Checks',
        '100% Free Labor on All Plumbing Fits'
      ]
    },
    {
      id: 'amc-total-home',
      title: 'Total Home Care AMC',
      badge: 'All-In-One Protection',
      price: 3499,
      period: 'per year',
      savings: 'Save ₹2,500/yr',
      description: 'Complete annual coverage for AC, Fridge, Washing Machine, RO, Plumbing & Electrical.',
      features: [
        'Quarterly AC Jet Servicing + RO Filter Change',
        'Annual Washing Machine & Fridge Overhaul',
        'Unlimited Free Plumbing & Electrician Calls',
        'Dedicated Priority Relationship Manager'
      ]
    }
  ];

  return (
    <section id="amc-subscription-plans" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20 inline-block">
            Recurring Care & AMC
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Quarterly & Annual Maintenance Contracts (AMC)
          </h2>
          <p className="text-sm text-slate-300">
            Never worry about unexpected appliance breakdowns or plumbing leaks again. Enjoy priority doorstep response and hassle-free scheduled care in Indore.
          </p>
        </div>

        {/* 3 Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((pl) => (
            <div
              key={pl.id}
              className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 hover:border-amber-400 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between relative group space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                    {pl.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">{pl.savings}</span>
                </div>

                <h3 className="text-xl font-extrabold text-white font-heading">{pl.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{pl.description}</p>

                <div className="pt-4 border-t border-slate-700/60 my-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-amber-400 font-heading">₹{pl.price}</span>
                  <span className="text-xs text-slate-400 font-semibold">{pl.period}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-200">
                  {pl.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-700/60">
                <button
                  onClick={() => openBookingModal('ac-repair', { title: pl.title, price: pl.price, duration: '1 Year AMC' })}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe & Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
