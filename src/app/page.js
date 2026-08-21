'use client';

import React from 'react';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import ServiceTabs from '../components/home/ServiceTabs';
import PopularRepairs from '../components/home/PopularRepairs';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TechnicianTrust from '../components/home/TechnicianTrust';
import TrackingPreview from '../components/home/TrackingPreview';
import PricingSection from '../components/home/PricingSection';
import ReviewsSection from '../components/home/ReviewsSection';
import PincodeCheckerSection from '../components/home/PincodeCheckerSection';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 2. Hero */}
      <Hero />

      {/* 3. Trust Bar */}
      <TrustBar />

      {/* 4. Services (Appliance, Electrician, Plumber) */}
      <ServiceTabs />

      {/* 5. Popular Repairs */}
      <PopularRepairs />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Why Choose ZapRepair */}
      <WhyChooseUs />

      {/* 8. Technician Trust Section */}
      <TechnicianTrust />

      {/* 9. Service Tracking UI */}
      <TrackingPreview />

      {/* 10. Transparent Pricing */}
      <PricingSection />

      {/* 11. Customer Reviews */}
      <ReviewsSection />

      {/* 12. Service Location / Pincode Checker */}
      <PincodeCheckerSection />

      {/* 13. Final CTA */}
      <FinalCTA />
    </div>
  );
}
