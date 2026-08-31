'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ChevronDown, MapPin, Wrench, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { getLegacyServiceRedirect } from '../../data/categoriesData';
import { INDORE_AREAS_DATA } from '../../data/indoreAreasData';
import ServicesMegaMenu from './ServicesMegaMenu';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const timeoutRef = useRef(null);
  const megaMenuContainerRef = useRef(null);
  const searchContainerRef = useRef(null);

  const { openBookingModal } = useBooking();
  const { t } = useLanguage();

  // Filter matching services and Indore areas starting from first typed letter
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const matchingServices = trimmedQuery.length >= 1 
    ? SERVICES_DATA.filter((s) => 
        s.name.toLowerCase().includes(trimmedQuery) || 
        s.slug.toLowerCase().includes(trimmedQuery) ||
        (s.description && s.description.toLowerCase().includes(trimmedQuery))
      ).slice(0, 4)
    : [];

  const matchingAreas = trimmedQuery.length >= 1
    ? INDORE_AREAS_DATA.filter((a) =>
        a.name.toLowerCase().includes(trimmedQuery) ||
        a.landmark.toLowerCase().includes(trimmedQuery) ||
        a.pincode.includes(trimmedQuery) ||
        a.slug.toLowerCase().includes(trimmedQuery)
      ).slice(0, 4)
    : [];

  const showSuggestions = isSearchFocused && trimmedQuery.length >= 1 && (matchingServices.length > 0 || matchingAreas.length > 0);

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

  // Handle click outside to close mega menu and search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuContainerRef.current && !megaMenuContainerRef.current.contains(event.target)) {
        setIsMegaMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (trimmedQuery) {
      setIsSearchFocused(false);
      router.push(`/services?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleSelectService = (slug) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    router.push(getLegacyServiceRedirect(slug));
  };

  const handleSelectArea = (slug) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    router.push(`/${slug}`);
  };

  const handleMouseEnterServices = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveServices = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-2.5' 
        : 'bg-slate-900 border-b border-slate-800/80 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={megaMenuContainerRef}>
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo - PlumberIndore */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/logo.png"
              alt="PlumberIndore Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                Plumber<span className="text-amber-400">Indore</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase -mt-1">
                {t.tagline}
              </span>
            </div>
          </Link>

          {/* Global Search Bar with Instant Auto-Suggest Dropdown */}
          <div className="hidden lg:block flex-1 max-w-sm relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </form>

            {/* Instant Auto-suggest Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800 animate-in fade-in slide-in-from-top-1 duration-150">
                {matchingServices.length > 0 && (
                  <div className="p-2 space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                      Services & Repairs
                    </div>
                    {matchingServices.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => handleSelectService(srv.slug)}
                        className="w-full text-left px-2.5 py-2 hover:bg-slate-800 rounded-xl flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                            <Wrench className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-amber-400 block transition-colors">
                              {srv.name}
                            </span>
                            <span className="text-[10px] text-slate-400">Starts from ₹{srv.startingPrice}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}

                {matchingAreas.length > 0 && (
                  <div className="p-2 space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Indore Hubs & Localities
                    </div>
                    {matchingAreas.map((area) => (
                      <button
                        key={area.slug}
                        type="button"
                        onClick={() => handleSelectArea(area.slug)}
                        className="w-full text-left px-2.5 py-2 hover:bg-slate-800 rounded-xl flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-emerald-400 block transition-colors">
                              {area.name} (Pincode {area.pincode})
                            </span>
                            <span className="text-[10px] text-slate-400">Doorstep ETA: {area.eta}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === '/' ? 'text-amber-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.navHome}
            </Link>

            {/* Services Link with Mega Menu Trigger */}
            <div 
              className="py-1"
              onMouseEnter={handleMouseEnterServices}
              onMouseLeave={handleMouseLeaveServices}
            >
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`text-sm font-semibold transition-colors duration-200 inline-flex items-center gap-1 focus:outline-none py-1 ${
                  pathname.startsWith('/services') || isMegaMenuOpen
                    ? 'text-amber-400 font-bold' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{t.navServices}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>
            </div>

            <Link
              href="/about"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname === '/about' ? 'text-amber-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.navAbout}
            </Link>

            <Link
              href="/blog"
              className={`text-sm font-semibold transition-colors duration-200 ${
                pathname.startsWith('/blog') ? 'text-amber-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {t.navBlog || 'Blog'}
            </Link>
          </nav>

          {/* Right Action CTA Button (Book Now) */}
          <div className="hidden md:flex items-center gap-3">
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

        {/* Mega Menu Dropdown anchored to header container */}
        <ServicesMegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onMouseEnter={handleMouseEnterServices}
          onMouseLeave={handleMouseLeaveServices}
        />
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Search Input */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AC, Plumber, Area..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
            {trimmedQuery.length >= 1 && (
              <div className="mt-2 bg-slate-950 border border-slate-800 rounded-xl p-2 space-y-2 max-h-56 overflow-y-auto">
                {matchingServices.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSelectService(srv.slug);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-between text-xs text-white"
                  >
                    <span className="font-bold">{srv.name}</span>
                    <span className="text-amber-400 font-extrabold">₹{srv.startingPrice}</span>
                  </button>
                ))}
                {matchingAreas.map((area) => (
                  <button
                    key={area.slug}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSelectArea(area.slug);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-between text-xs text-white"
                  >
                    <span className="font-bold">{area.name}</span>
                    <span className="text-emerald-400">{area.eta}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg"
          >
            {t.navHome}
          </Link>

          <Link
            href="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-amber-400 hover:bg-slate-800/50 rounded-lg"
          >
            {t.navServices}
          </Link>

          {/* Mobile Categories Links */}
          <div className="pl-3 pr-2 py-1 space-y-1 bg-slate-950/60 rounded-xl border border-slate-800/80 my-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-2 pt-1">
              Main Categories
            </span>
            <div className="grid grid-cols-2 gap-1 pb-1">
              <Link
                href="/appliance"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-2 py-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg block"
              >
                Appliance Repair
              </Link>
              <Link
                href="/plumber"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-2 py-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg block"
              >
                Plumbing
              </Link>
              <Link
                href="/electrician"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-2 py-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg block"
              >
                Electrician
              </Link>
              <Link
                href="/pest-control"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-2 py-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg block"
              >
                Pest Control
              </Link>
              <Link
                href="/carpenter-paint"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-2 py-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-lg col-span-2 block"
              >
                Carpenter & Paint
              </Link>
            </div>
          </div>

          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg"
          >
            {t.navAbout}
          </Link>

          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg"
          >
            {t.navBlog || 'Blog'}
          </Link>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBookingModal('ac-repair');
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm text-center block shadow-md"
            >
              {t.bookNow}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
