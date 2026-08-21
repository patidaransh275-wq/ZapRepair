'use client';

import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function ProfilePage() {
  const { userProfile, setUserProfile, userBookings } = useBooking();
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      name,
      phone,
      email
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Account Management
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-heading mt-2">
            My Profile & Saved Addresses
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update personal contact details and doorstep service addresses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column Profile Summary */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-4 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-2xl mx-auto border-4 border-amber-400">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-heading">{userProfile.name}</h3>
              <p className="text-xs text-slate-500">{userProfile.phone}</p>
              <p className="text-xs text-slate-400">{userProfile.email}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Repairs Booked:</span>
                <span className="font-bold text-slate-900">{userBookings.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Verification Status:</span>
                <span className="font-bold text-emerald-600">Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Edit Personal Info */}
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Personal Details</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-sm"
              >
                Save Profile Changes
              </button>
            </form>

            {/* Saved Addresses */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 font-heading">Saved Addresses</h3>
              </div>

              <div className="space-y-3">
                {userProfile.addresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
                        {addr.tag}
                      </span>
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">{addr.fullAddress}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
