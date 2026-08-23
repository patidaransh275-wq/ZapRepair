import React from 'react';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MobileNav from '../components/layout/MobileNav';
import BookingModal from '../components/booking/BookingModal';
import TrackingModal from '../components/booking/TrackingModal';
import { BookingProvider } from '../context/BookingContext';
import { LanguageProvider } from '../context/LanguageContext';

export const metadata = {
  title: 'PlumberIndore - Indore’s #1 Doorstep Plumbing & Appliance Repair Service',
  description: 'Book certified plumbers, electricians, AC repair, refrigerator repair, washing machine & RO repair in Indore. 45-minute arrival with 30-day post service warranty.',
  keywords: 'plumber indore, AC repair Vijay Nagar, electrician Indore, refrigerator repair Palasia, washing machine service Indore, RO purifier repair Indore',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-white selection:bg-amber-400 selection:text-slate-950 flex flex-col min-h-screen">
        <LanguageProvider>
          <BookingProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <MobileNav />
            <BookingModal />
            <TrackingModal />
          </BookingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
