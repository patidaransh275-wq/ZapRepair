'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, MapPin, ShieldCheck, LogOut, Wallet, Gift, Copy, Check, Plus, Trash2, CreditCard, Clock, Loader2, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, setUserProfile, userBookings, isAuthenticated, authLoading, logout, openBookingModal } = useBooking();

  const [activeTab, setActiveTab] = useState('addresses'); // 'addresses' | 'wallet' | 'referral'
  const [copied, setCopied] = useState(false);
  const [walletBalance, setWalletBalance] = useState(250); // ₹250 PlumberIndore Cash
  const [loyaltyPoints, setLoyaltyPoints] = useState(120);
  
  // New address input state
  const [newTag, setNewTag] = useState('Home');
  const [newAddressStr, setNewAddressStr] = useState('');
  const [showAddAddr, setShowAddAddr] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?returnUrl=/profile');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="py-24 text-center space-y-3 bg-slate-50 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
        <p className="text-xs font-semibold text-slate-600">Loading user profile...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('INDORE50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressStr.trim()) return;

    const newAddrObj = {
      id: `addr-${Date.now()}`,
      tag: newTag,
      fullAddress: newAddressStr.trim()
    };

    setUserProfile((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddrObj]
    }));

    setNewAddressStr('');
    setShowAddAddr(false);
  };

  const handleDeleteAddress = (id) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id)
    }));
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Profile Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-2xl shadow-lg border-2 border-slate-700 font-heading">
              {userProfile.name ? userProfile.name.charAt(0) : 'A'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold font-heading text-white">{userProfile.name}</h1>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  ✓ Verified Account
                </span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-3">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-amber-400" />{userProfile.phone}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-amber-400" />{userProfile.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Wallet Cash</div>
              <div className="text-lg font-extrabold text-amber-400 font-heading">₹{walletBalance}</div>
            </div>

            <button
              onClick={async () => {
                await logout();
                router.push('/login');
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 p-3 rounded-2xl border border-slate-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Saved Doorstep Addresses ({userProfile.addresses.length})
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'wallet'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Wallet & Saved Cards
          </button>

          <button
            onClick={() => setActiveTab('referral')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'referral'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Refer & Earn (Rewards)
          </button>
        </div>

        {/* TAB 1: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-heading">Saved Doorstep Locations in Indore</h3>
                <p className="text-xs text-slate-500">Fast one-tap selection during booking checkout</p>
              </div>

              <button
                onClick={() => setShowAddAddr(!showAddAddr)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Add Address Form */}
            {showAddAddr && (
              <form onSubmit={handleAddAddress} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-slate-700">Tag:</label>
                  {['Home', 'Office', 'Other'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setNewTag(t)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                        newTag === t ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={newAddressStr}
                  onChange={(e) => setNewAddressStr(e.target.value)}
                  placeholder="Flat/House No., Building Name, Area (e.g. Vijay Nagar, Indore, MP - 452010)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  required
                />

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddAddr(false)} className="text-xs text-slate-500 px-3 py-1.5">
                    Cancel
                  </button>
                  <button type="submit" className="bg-slate-900 text-white font-bold text-xs px-4 py-1.5 rounded-xl">
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* Saved Address Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProfile.addresses.map((addr) => (
                <div key={addr.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                      {addr.tag}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed pt-1">{addr.fullAddress}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                    title="Delete Address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WALLET & SAVED CARDS */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-sm space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl flex items-center justify-between border border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase">PlumberIndore Cash Wallet</span>
                <h4 className="text-3xl font-extrabold font-heading text-white">₹{walletBalance}</h4>
                <p className="text-xs text-slate-400">Usable for instant discounts on all Indore doorstep repair bookings</p>
              </div>

              <button
                onClick={() => openBookingModal('ac-repair')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md"
              >
                Use Wallet in Booking
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm font-heading">Saved Payment Instruments</h4>
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-bold text-xs text-slate-900">HDFC Bank Visa Card (•••• 8492)</div>
                    <div className="text-[10px] text-slate-500">Expires 08/29</div>
                  </div>
                </div>
                <span className="text-xs text-emerald-600 font-bold">Default</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REFER & EARN LOYALTY */}
        {activeTab === 'referral' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-sm space-y-6">
            <div className="text-center max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading">Refer Friends & Earn ₹100 Cashback</h3>
              <p className="text-xs text-slate-600">
                Share your unique referral code with friends and family in Indore. Both you and your friend get ₹100 added to your PlumberIndore Wallet on their first booking!
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl max-w-sm mx-auto flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Your Referral Code</span>
                <div className="text-lg font-extrabold font-mono text-slate-900">INDORE50</div>
              </div>

              <button
                onClick={handleCopyReferral}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center text-xs">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="font-bold text-slate-900">Total Referrals</div>
                <div className="text-2xl font-extrabold text-amber-600 font-heading mt-1">3 Friends</div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="font-bold text-slate-900">Loyalty Rewards Earned</div>
                <div className="text-2xl font-extrabold text-emerald-700 font-heading mt-1">{loyaltyPoints} Points (₹{loyaltyPoints})</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
