'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Award, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function TechnicianTrust() {
  const trustPoints = [
    { title: 'Police Background Checked', desc: 'Every technician undergoes thorough identity & criminal verification.' },
    { title: 'Official Uniform & ID Badge', desc: 'Technicians carry PlumberIndore photo ID cards and branded uniforms.' },
    { title: 'Certified Appliance Experts', desc: 'Rigorously trained in modern inverter ACs, PCB boards & motor diagnostics.' },
    { title: 'Hygiene & Cleanliness', desc: 'Shoe covers and post-repair cleanups ensure your home stays spotless.' }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                alt="PlumberIndore Certified Technician"
                className="w-full h-[400px] object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-white space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Doorstep Safety Guaranteed</span>
                </div>
                <p className="text-xs text-slate-300">
                  Verified technicians servicing all Indore locations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200 inline-block">
              Safety & Verification
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
              100% Police Verified & Trained Doorstep Technicians
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              We know your home safety is paramount. Every PlumberIndore technician wears a company uniform, carries an official photo ID card, and follows strict hygiene & safety protocols.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {trustPoints.map((pt, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-heading">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pt.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
