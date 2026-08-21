'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Wrench, Phone, Menu, X, ShieldCheck, User, LogOut, ChevronDown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { openBookingModal, isAuthenticated, currentUser, logout } = useBooking();

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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-3' 
        : 'bg-slate-900 border-b border-slate-800/80 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - PlumberIndore */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Wrench className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                Plumber<span className="text-amber-400">Indore</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase -mt-1">
                Doorstep Experts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
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
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg transition-colors border border-slate-800 hover:border-amber-400/30"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+91 98765 43210</span>
            </a>

            {/* Auth User State / Sign In Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                    {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser?.name || 'Account'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50 text-xs">
                    <Link
                      href="/bookings"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-slate-200 hover:bg-slate-800 hover:text-amber-400"
                    >
                      My Bookings & Status
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-2 text-slate-200 hover:bg-slate-800 hover:text-amber-400"
                    >
                      Account Profile
                    </Link>
                    <div className="border-t border-slate-800 my-1" />
                    <button
                      type="button"
                      onClick={async () => {
                        setIsUserDropdownOpen(false);
                        await logout();
                        router.push('/login');
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold text-slate-200 hover:text-amber-400 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700"
              >
                Sign In
              </Link>
            )}

            <button
              type="button"
              onClick={() => openBookingModal('ac-repair')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => openBookingModal('ac-repair')}
              className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-2 rounded-lg"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation"
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
          <div className="pt-3 border-t border-slate-800 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white"
                >
                  My Bookings & Tracking
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white"
                >
                  My Profile ({currentUser?.name})
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setIsMobileMenuOpen(false);
                    await logout();
                    router.push('/login');
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-red-400 hover:bg-slate-800 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-amber-400 hover:underline"
              >
                Sign In / Register
              </Link>
            )}

            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-300"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline: +91 98765 43210</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
