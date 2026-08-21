'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Banner */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-800 px-3.5 py-1 rounded-full border border-slate-700">
            Support Center
          </span>
          <h1 className="text-4xl font-extrabold font-heading">
            Contact ZapRepair Customer Care
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Have questions about an active booking, invoice, or partnership? We are here 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Helpline Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Direct Helplines</h3>
              
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">+91 98765 43210</div>
                  <div className="text-[11px] text-slate-500">24/7 Customer Support Line</div>
                </div>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-900">WhatsApp Instant Support</div>
                  <div className="text-[11px] text-emerald-700">Chat directly with support desk</div>
                </div>
              </a>

              <a
                href="mailto:support@zaprepair.in"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">support@zaprepair.in</div>
                  <div className="text-[11px] text-slate-500">Email Response within 2 hours</div>
                </div>
              </a>

            </div>

            {/* Office Address */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-3">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Corporate Office</h3>
              <div className="flex items-start gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>ZapRepair Tech Services Pvt Ltd, Tower B, 7th Floor, DLF Cyber City, Gurugram, HR - 122001</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-soft-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-heading">Send Us a Message</h3>

              {submitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ansh Patidar"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="ansh@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Inquiry</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs shadow-md"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
