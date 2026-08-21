'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Heart, MessageSquare } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white font-heading">
                Plumber<span className="text-amber-400">Indore</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              PlumberIndore is Indore’s premier doorstep plumbing, appliance repair & electrical service platform. Verified technicians, transparent pricing, and fast 45-minute service across Indore, Madhya Pradesh.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Technicians</span>
              </div>
              <div className="text-xs text-amber-400 bg-amber-950/50 border border-amber-800/40 px-3 py-1.5 rounded-lg">
                ★ 4.9 Rating in Indore
              </div>
            </div>
          </div>

          {/* Core Services Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Doorstep Services
            </h3>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-amber-400 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services Column */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              More Services
            </h3>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.slice(7).map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-amber-400 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Indore Support Desk
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-amber-400 transition-colors text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors text-slate-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp Chat Support</span>
                </a>
              </li>
              <li>
                <a href="mailto:plumberindore@gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>plumberindore@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Vijay Nagar, Palasia, Bhanwarkuan, Rau & All Indore Sectors, MP</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} PlumberIndore Tech Services (Indore, MP). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-amber-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Help Center
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
