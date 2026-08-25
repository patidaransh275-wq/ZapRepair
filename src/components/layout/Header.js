'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Wrench, Phone, Menu, X, Search, Calculator } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import PushNotificationCenter from './PushNotificationCenter';
import CostCalculatorModal from '../booking/CostCalculatorModal';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { openBookingModal } = useBooking();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: t.navHome, href: '/' },
    { name: t.navServices, href: '/services' },
    { name: t.navHowItWorks, href: '/#how-it-works' },
    { name: t.navAbout, href: '/about' },
    { name: t.navContact, href: '/contact' },
  ];

  return (
    <>
      <CostCalculatorModal isOpen={isCostModalOpen} onClose={() => setIsCostModalOpen(false)} />

      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-2.5' 
          : 'bg-slate-900 border-b border-slate-800/80 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo - PlumberIndore */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
                <Wrench className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                  Plumber<span className="text-amber-400">Indore</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase -mt-1">
                  {t.tagline}
                </span>
              </div>
            </Link>

            {/* Global Search Bar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-xs relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </form>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors duration-200 ${
                      isActive 
                        ? 'text-amber-400 font-bold' 
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* Cost Estimator Calculator Button */}
              <button
                type="button"
                onClick={() => setIsCostModalOpen(true)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition-colors"
                title="Calculate Repair Cost"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden xl:inline">{t.costEstimator}</span>
              </button>

              {/* Push Notification Center Bell */}
              <PushNotificationCenter />

              <a
                href="tel:+919174934135"
                className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-lg transition-colors border border-slate-800 hover:border-amber-400/30"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+91 91749 34135</span>
              </a>

              <button
                type="button"
                onClick={() => openBookingModal('ac-repair')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {t.bookNow}
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
