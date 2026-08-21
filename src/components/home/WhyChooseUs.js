'use client';

import React from 'react';
import { ShieldCheck, Zap, Tag, Home, CheckCircle2, Headset } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: 'Verified Technicians',
      desc: 'All engineers undergo stringent background verification, police check, and skill certification.',
      icon: ShieldCheck
    },
    {
      title: 'Fast Booking',
      desc: 'Book service in under 60 seconds with instant time slot confirmation and technician tracking.',
      icon: Zap
    },
    {
      title: 'Transparent Pricing',
      desc: 'Fixed rate card pricing with zero hidden charges. Inspection fee waived when repair is accepted.',
      icon: Tag
    },
    {
      title: 'Doorstep Service',
      desc: 'No need to transport heavy appliances. 95% of repairs are completed right inside your home.',
      icon: Home
    },
    {
      title: 'Quality Parts',
      desc: 'We strictly use 100% original manufacturer spare parts with up to 90 days warranty.',
      icon: CheckCircle2
    },
    {
      title: 'Service Support',
      desc: 'Dedicated 24/7 customer helpline and instant WhatsApp support for all ongoing bookings.',
      icon: Headset
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Why ZapRepair
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-3">
            Why 10,000+ Indian Homes Trust Us
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Built for reliability, speed, and complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
