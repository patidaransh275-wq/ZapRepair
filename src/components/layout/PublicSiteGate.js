'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import UnderConstruction from './UnderConstruction';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import BookingModal from '../booking/BookingModal';
import TrackingModal from '../booking/TrackingModal';
import AllServicesModal from '../services/AllServicesModal';

/**
 * Public Site Gate:
 * Toggle UNDER_CONSTRUCTION to true/false to temporarily show the Under Construction page
 * or restore the original website across all routes.
 */
export const UNDER_CONSTRUCTION = true;

export default function PublicSiteGate({ children }) {
  const pathname = usePathname();

  // Allow admin portal even when under construction
  const isAdminRoute = pathname?.startsWith('/admin');

  if (UNDER_CONSTRUCTION && !isAdminRoute) {
    return <UnderConstruction />;
  }

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileNav />}
      {!isAdminRoute && <BookingModal />}
      {!isAdminRoute && <TrackingModal />}
      {!isAdminRoute && <AllServicesModal />}
    </>
  );
}
