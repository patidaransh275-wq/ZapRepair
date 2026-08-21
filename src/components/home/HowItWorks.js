'use client';

import React from 'react';
import { CalendarCheck, UserCheck, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Book Service',
      desc: 'Select your appliance, pick a convenient date & time slot, and enter your address in 60 seconds.',
      icon: CalendarCheck
    },
    {
      num: '02',
      title: 'Technician Arrives',
      desc: 'A background-verified, uniformed ZapRepair engineer arrives at your doorstep in 45 minutes.',
      icon: UserCheck
    },
    {
      num: '03',
      title: 'Problem Solved',
      desc: 'Get transparent diagnosis, original spare parts repair, and 30-day post-service warranty.',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-3.5 py-1 rounded-full border border-slate-700">
            Hassle-Free Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-3">
            How ZapRepair Works
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            3 simple steps to get your home appliances working like new again.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/80 relative flex flex-col items-start hover:border-amber-500/50 transition-colors"
              >
                <div className="flex items-center justify-between w-full mb-6">
                  <span className="text-4xl font-extrabold text-amber-400/80 font-heading">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-heading text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
