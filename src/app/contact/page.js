'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Official Helpline Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Contact PlumberIndore Tech Services
          </h1>
          <p className="text-sm text-slate-600">
            Have a question or need assistance with your booking in Indore? Reach out to our customer support desk.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto font-bold">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-heading">Business Helpline</h3>
            <p className="text-xs text-slate-500">Instant Booking & Status Updates</p>
            <a href="tel:+919174934135" className="inline-block text-sm font-extrabold text-amber-600 hover:underline pt-1">
              +91 91749 34135
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto font-bold">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-heading">WhatsApp Helpline</h3>
            <p className="text-xs text-slate-500">Quick Chat & Location Sharing</p>
            <a href="https://wa.me/919174934135" target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-extrabold text-emerald-600 hover:underline pt-1">
              +91 91749 34135
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto font-bold">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-heading">Corporate Email</h3>
            <p className="text-xs text-slate-500">For Business & Customer Inquiries</p>
            <a href="mailto:support@plumberindore.in" className="inline-block text-xs font-extrabold text-slate-900 hover:underline pt-1">
              support@plumberindore.in
            </a>
          </div>

        </div>

        {/* Doorstep Operations Block */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-soft-md grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-heading">Indore Operations Desk</h3>
            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>PlumberIndore Tech Services, Doorstep Home Service Network across Indore, MP</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>Operating Hours: Monday – Sunday, 8:00 AM – 9:00 PM</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 font-semibold space-y-1">
              <div className="text-slate-900 font-bold">Doorstep Service Coverage:</div>
              <div>Vijay Nagar, Palasia, Bhanwarkuan, Bengali Square, Rau, Rajendra Nagar, Annapurna, Sudama Nagar, Nipania, Super Corridor, MR-10, Bhawrasla</div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Send a Message</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Ansh Patidar"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 91749 34135"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Service Query</label>
                <textarea
                  rows={3}
                  required
                  placeholder="How can we help you with your appliance repair or plumbing in Indore?"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Message submitted! Our Indore support team will call you back shortly.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Submit Message</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
