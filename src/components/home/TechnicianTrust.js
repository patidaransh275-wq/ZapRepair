'use client';

import React from 'react';
import { ShieldCheck, Award, CheckCircle2, UserCheck, Star } from 'lucide-react';

export default function TechnicianTrust() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
                alt="ZapRepair Certified Technician"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm font-heading">100% Background Verified Engineers</h4>
                    <p className="text-xs text-slate-300">Police verified, ID verified & trained for top appliance brands</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Rating Card */}
            <div className="absolute -top-6 -right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 hidden sm:flex items-center gap-3">
              <div className="text-3xl font-extrabold text-amber-400 font-heading">4.9★</div>
              <div className="text-xs">
                <div className="font-bold">Technician Rating</div>
                <div className="text-slate-400">From 10,000+ reviews</div>
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Safety & Expertise First
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
              Only Certified & Background-Checked Professionals At Your Door
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              We know your home safety is paramount. Every ZapRepair technician wears a company uniform, carries an official photo ID card, and follows strict hygiene & safety protocols.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Mandatory Police Verification</h4>
                  <p className="text-xs text-slate-500">Zero criminal record tolerance with official police verification.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Brand-Specific Technical Training</h4>
                  <p className="text-xs text-slate-500">Certified for Daikin, LG, Samsung, Whirlpool, Bosch, IFB & Godrej.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Standardized Tools & Genuine Spares</h4>
                  <p className="text-xs text-slate-500">Equipped with digital multi-meters, pressure gauges, & factory sealed spares.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
