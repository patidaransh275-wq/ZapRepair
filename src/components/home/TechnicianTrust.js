'use client';

import React from 'react';
import { UserCheck, ShieldCheck, Award, CheckCircle2, MapPin } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function TechnicianTrust() {
  const { openBookingModal } = useBooking();

  const techs = [
    {
      name: 'Ramesh Verma',
      title: 'Senior HVAC & AC Engineer',
      location: 'Vijay Nagar Hub, Indore',
      exp: '8+ Yrs Experience',
      repairs: '500+ Indore Repairs',
      specialty: 'Daikin, Voltas, LG Inverter AC Specialists',
      image: '/images/technicians/ramesh_verma.jpg',
      imagePosition: 'object-top'
    },
    {
      name: 'Suresh Sharma',
      title: 'Master Plumbing Technician',
      location: 'Palasia Hub, Indore',
      exp: '10+ Yrs Experience',
      repairs: '650+ Indore Repairs',
      specialty: 'Sanitary Fittings & Concealed Leakage Detection',
      image: '/images/technicians/suresh_sharma.jpg',
      imagePosition: 'object-top'
    },
    {
      name: 'Rajesh Patel',
      title: 'Certified Electrical Specialist',
      location: 'Bhanwarkuan Hub, Indore',
      exp: '7+ Yrs Experience',
      repairs: '420+ Indore Repairs',
      specialty: '3-Phase Wiring, MCB & Short Circuit Fixes',
      image: '/images/technicians/rajesh_patel.jpg',
      imagePosition: 'object-top'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200 inline-block font-heading">
            VERIFIED EXPERTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Technicians
          </h2>
          <p className="text-sm text-slate-600">
            Our engineers carry digital ID badges, uniformed work wear, and diagnostic tools to deliver 100% safe doorstep repairs in Indore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techs.map((tc, idx) => (
            <div key={idx} className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden mx-auto border-2 border-amber-400 shadow-md bg-slate-200">
                  <img 
                    src={tc.image} 
                    alt={tc.name} 
                    className={`w-full h-full object-cover ${tc.imagePosition || 'object-center'}`} 
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-lg font-heading">{tc.name}</h3>
                  <div className="text-xs font-bold text-amber-600 flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{tc.location}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-700 font-heading pt-0.5">{tc.title}</div>
                  <div className="text-[11px] font-bold text-emerald-600 flex items-center justify-center gap-1 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{tc.exp} • {tc.repairs}</span>
                  </div>
                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">{tc.specialty}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-center">
                <button
                  onClick={() => openBookingModal('ac-repair')}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
                >
                  Book Expert Technician
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
