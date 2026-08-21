import './globals.css';
import { Manrope, Inter } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MobileNav from '../components/layout/MobileNav';
import { BookingProvider } from '../context/BookingContext';
import BookingModal from '../components/booking/BookingModal';
import TrackingModal from '../components/booking/TrackingModal';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'ZapRepair | Trusted Home Appliance Repair & Doorstep Services',
  description: 'Expert doorstep AC repair, refrigerator, washing machine, RO purifier, electrician & plumber services. Verified technicians, transparent pricing, 45-min arrival.',
  keywords: 'ZapRepair, appliance repair, AC repair doorstep, refrigerator repair, washing machine service, electrician, plumber, home services India',
  openGraph: {
    title: 'ZapRepair | Doorstep Home Appliance Repair',
    description: '45-minute doorstep repair service with verified technicians and 30-day warranty.',
    url: 'https://zaprepair.in',
    siteName: 'ZapRepair',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="bg-slate-50 text-slate-900 font-body antialiased min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950">
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
      </body>
    </html>
  );
}
