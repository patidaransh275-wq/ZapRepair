'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, PlusCircle, CalendarCheck, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { openBookingModal } = useBooking();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Wrench },
    { name: 'Book', action: () => openBookingModal('ac-repair'), icon: PlusCircle, isHighlight: true },
    { name: 'Bookings', href: '/bookings', icon: CalendarCheck },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-5 items-center justify-items-center">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.href && pathname === item.href;

          if (item.isHighlight) {
            return (
              <button
                key={index}
                onClick={item.action}
                className="flex flex-col items-center justify-center group -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 group-active:scale-95 transition-transform border-4 border-slate-900">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-amber-400 mt-0.5">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
