import React from 'react';

export const metadata = {
  title: 'Privacy Policy | PlumberIndore',
  description: 'Privacy policy and customer data security guidelines of PlumberIndore Tech Services Private Limited.',
  alternates: {
    canonical: 'https://www.plumberindore.in/privacy-policy'
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-soft-sm">
        
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Legal & Compliance
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading mt-3">
            Privacy Policy - PlumberIndore
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 font-heading">1. Information We Collect</h2>
            <p>
              PlumberIndore Tech Services ("PlumberIndore", "we", "us") collects information when you use our website, mobile application, and doorstep home services in Indore. This includes your name, phone number, email address, physical service address, pincode, and service booking history.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 font-heading">2. How We Use Your Information</h2>
            <p>
              Your contact details and service address are used exclusively to dispatch verified Indian technicians to your home, provide live service tracking updates, issue digital invoices, and communicate regarding customer support queries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 font-heading">3. Data Security & Contact</h2>
            <p>
              We do not sell, rent, or lease customer data to third-party marketing companies. For any privacy-related queries, please email us at <span className="font-bold">plumberindore@gmail.com</span>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
