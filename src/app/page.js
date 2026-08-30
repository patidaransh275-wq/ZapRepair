'use client';

import React from 'react';
import Hero from '../components/home/Hero';
import TrustBar from '../components/home/TrustBar';
import ServiceTabs from '../components/home/ServiceTabs';
import PopularRepairs from '../components/home/PopularRepairs';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TechnicianTrust from '../components/home/TechnicianTrust';
import PricingSection from '../components/home/PricingSection';
import IndoreServiceAreas from '../components/home/IndoreServiceAreas';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Services (Appliance, Electrician, Plumber) */}
      <ServiceTabs />

      {/* 4. Popular Repairs */}
      <PopularRepairs />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Why Choose PlumberIndore */}
      <WhyChooseUs />

      {/* 7. Technician Trust Section */}
      <TechnicianTrust />

      {/* 8. Transparent Pricing */}
      <PricingSection />

      {/* 9. Service Areas in Indore */}
      <IndoreServiceAreas />

      {/* 10. Final CTA */}
      <FinalCTA />
    </div>
  );
}
