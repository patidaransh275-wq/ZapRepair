'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, Mail, Lock, ShieldCheck, Zap, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, KeyRound } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/bookings';

  const { isAuthenticated, requestPhoneOtp, verifyPhoneOtp, loginWithEmail } = useBooking();

  const [activeTab, setActiveTab] = useState('phone'); // 'phone' | 'email'
  
  // Phone OTP States
  const [phone, setPhone] = useState('');
  const [otpStep, setOtpStep] = useState('request'); // 'request' | 'verify'
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  // Email States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status & Error Message States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl);
    }
  }, [isAuthenticated, router, returnUrl]);

  // Resend OTP Countdown Timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  // Handle Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);

    try {
      const res = await requestPhoneOtp(phone);
      setOtpStep('verify');
      setInfoMsg(res.message);
      setOtpTimer(30);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);

    try {
      await verifyPhoneOtp(phone, otp);
      router.push(returnUrl);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      router.push(returnUrl);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 font-bold mb-3">
            <Zap className="w-7 h-7 fill-slate-950" />
          </div>
          <h1 className="text-2xl font-extrabold font-heading text-white">Welcome to ZapRepair</h1>
          <p className="text-xs text-amber-400 font-semibold">Doorstep Appliance Repair in Indore</p>
        </div>

        {/* Tab Selector */}
        <div className="p-6 space-y-6">
          
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab('phone');
                setErrorMsg('');
                setInfoMsg('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'phone'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('email');
                setErrorMsg('');
                setInfoMsg('');
              }}
              className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'email'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {infoMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{infoMsg}</span>
            </div>
          )}

          {/* TAB 1: PHONE OTP FLOW */}
          {activeTab === 'phone' && (
            <div>
              {otpStep === 'request' ? (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Enter 10-Digit Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-xs font-extrabold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 12345"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">We will send a 6-digit OTP code to verify your mobile number.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phone.length !== 10}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
                  >
                    <span>{loading ? 'Sending OTP...' : 'Send OTP Code'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Enter 6-Digit OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpStep('request')}
                        className="text-[11px] font-bold text-amber-600 hover:underline"
                      >
                        Change Number (+91 {phone})
                      </button>
                    </div>

                    <div className="relative">
                      <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="123456"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-center tracking-[0.4em] font-mono text-lg font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl mt-2 flex items-center justify-between text-xs text-amber-900">
                      <span className="font-semibold">Demo Test OTP Code: <strong className="font-mono">123456</strong></span>
                      {otpTimer > 0 ? (
                        <span className="text-[11px] text-slate-500 font-semibold">Resend in {otpTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleRequestOtp}
                          className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend OTP</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl shadow-md text-sm transition-all disabled:opacity-50"
                  >
                    <span>{loading ? 'Verifying...' : 'Verify OTP & Continue'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: EMAIL & PASSWORD FLOW */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ansh@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl shadow-md text-sm transition-all disabled:opacity-50"
              >
                <span>{loading ? 'Logging in...' : 'Sign In with Email'}</span>
              </button>
            </form>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 text-center space-y-3">
            <p className="text-xs text-slate-600">
              Don't have an account yet?{' '}
              <Link href={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`} className="font-bold text-amber-600 hover:underline">
                Create Account
              </Link>
            </p>

            {/* Continue as Guest option */}
            <div>
              <Link
                href={returnUrl || '/'}
                className="inline-block text-xs font-bold text-slate-500 hover:text-slate-900 hover:underline"
              >
                Continue as Guest →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs font-semibold text-slate-500">Loading authentication page...</div>}>
      <LoginContent />
    </Suspense>
  );
}
