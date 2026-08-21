import React from 'react';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MobileNav from '../components/layout/MobileNav';
import BookingModal from '../components/booking/BookingModal';
import TrackingModal from '../components/booking/TrackingModal';
import { BookingProvider } from '../context/BookingContext';

export const metadata = {
  title: 'PlumberIndore | Trusted Doorstep Plumbing & Appliance Repair in Indore',
  description: 'Indore premier doorstep plumbing, AC repair, washing machine, refrigerator, RO purifier & electrician services across Indore. Verified technicians in 45 mins.',
  keywords: 'PlumberIndore, plumber indore, appliance repair indore, AC repair doorstep indore, refrigerator repair, washing machine service, electrician indore',
  openGraph: {
    title: 'PlumberIndore | Doorstep Plumbing & Appliance Repair in Indore',
    description: '45-Minute doorstep plumbing, electrical, and appliance repair services in Vijay Nagar, Palasia, Bhanwarkuan, Rau, and all Indore areas.',
    url: 'https://plumberindore.in',
    siteName: 'PlumberIndore',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col selection:bg-amber-400 selection:text-slate-950">
        <BookingProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <BookingModal />
          <TrackingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
