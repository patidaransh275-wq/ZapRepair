'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, ExternalLink } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-bold text-slate-950">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white font-heading">
                Plumber<span className="text-amber-400">Indore</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              PlumberIndore Tech Services Private Limited is Indore’s premier doorstep plumbing and home appliance repair network. Certified HVAC engineers and plumbing specialists at your doorstep in 45 minutes.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>304 Apollo Tower, MG Road / Vijay Nagar Square, Indore, MP - 452010</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+917314928800" className="hover:text-amber-400 font-bold">+91 731 492 8800 / +91 91114 92880</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:support@plumberindore.in" className="hover:text-amber-400 font-semibold">support@plumberindore.in / plumberindore@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white font-heading">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <Link href={`/services/${srv.slug}`} className="hover:text-amber-400 transition-colors">
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white font-heading">
              Indore Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/service-areas/vijay-nagar" className="hover:text-amber-400">Vijay Nagar (Apollo Tower)</Link></li>
              <li><Link href="/service-areas/palasia" className="hover:text-amber-400">Palasia (Industry House)</Link></li>
              <li><Link href="/service-areas/bhanwarkuan" className="hover:text-amber-400">Bhanwarkuan (DAVV)</Link></li>
              <li><Link href="/service-areas/rau" className="hover:text-amber-400">Rau Bypass</Link></li>
              <li><Link href="/service-areas/sudama-nagar" className="hover:text-amber-400">Sudama Nagar</Link></li>
            </ul>
          </div>

          {/* Col 4: Business Registration & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white font-heading">
              Business Registration
            </h4>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="text-amber-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Registered Entity</span>
              </div>
              <p className="text-[11px] text-slate-300">PlumberIndore Tech Services Private Limited</p>
              <p className="text-[10px] text-slate-400">Doorstep Home Services Network across Indore</p>
              <a
                href="https://maps.google.com/?q=Apollo+Tower+Vijay+Nagar+Indore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-400 font-bold text-[11px] hover:underline pt-1"
              >
                <span>View Google Maps Pin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} PlumberIndore Tech Services Private Limited. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy & DPDP</Link>
            <Link href="/terms-and-conditions" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
