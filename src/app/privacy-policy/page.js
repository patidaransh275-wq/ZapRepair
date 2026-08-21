'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-soft-sm text-slate-800">
        
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 border-b pb-4">
          Privacy Policy
        </h1>

        <p className="text-xs text-slate-500">Last updated: August 21, 2026</p>

        <section className="space-y-3 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-lg font-bold font-heading text-slate-900">1. Information We Collect</h2>
          <p>
            ZapRepair Tech Services Pvt Ltd ("ZapRepair", "we", "us") collects information when you use our website, mobile application, and doorstep home services. This includes your name, phone number, email address, physical service address, pincode, and service history.
          </p>

          <h2 className="text-lg font-bold font-heading text-slate-900">2. How We Use Your Information</h2>
          <p>
            We use your personal data exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Dispatch verified doorstep technicians to your location.</li>
            <li>Send real-time booking confirmation, ETA status, and invoice details.</li>
            <li>Provide customer support and post-repair warranty service.</li>
            <li>Improve appliance diagnostic protocols and customer experience.</li>
          </ul>

          <h2 className="text-lg font-bold font-heading text-slate-900">3. Data Security & Protection</h2>
          <p>
            We implement strict security measures to protect your credentials. We do not sell or rent your personal information to third-party marketing companies.
          </p>

          <h2 className="text-lg font-bold font-heading text-slate-900">4. Contact Us</h2>
          <p>
            For any privacy-related queries, please email us at <span className="font-bold">privacy@zaprepair.in</span>.
          </p>
        </section>

      </div>
    </div>
  );
}
