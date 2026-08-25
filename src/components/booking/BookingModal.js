'use client';

import React, { useState, useEffect } from 'react';
import { X, Wrench, Calendar, MapPin, Phone, User, CheckCircle2, ArrowRight, ShieldCheck, Upload, AlertCircle, RefreshCw } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';
import { checkPincodeServiceability } from '../../data/pincodesData';

export default function BookingModal() {
  const { isBookingModalOpen, closeBookingModal, preselectedAppliance, preselectedPackage, userPincode, addBooking, userProfile } = useBooking();

  const [step, setStep] = useState(1);
  const [selectedAppliance, setSelectedAppliance] = useState('ac-repair');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pincode, setPincode] = useState(userPincode || '452010');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const [address, setAddress] = useState('Vijay Nagar, Indore, MP');
  const [customerName, setCustomerName] = useState(userProfile?.name || 'Ansh Patidar');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '+91 731 492 8800');
  const [issueDescription, setIssueDescription] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Date and Time slot picker
  const [selectedDate, setSelectedDate] = useState('2026-08-25');
  const [selectedSlot, setSelectedSlot] = useState('2:00 PM - 4:00 PM');
  
  // AMC Subscription toggle
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState('Standard AMC (2 Services/Yr)');

  const [createdBooking, setCreatedBooking] = useState(null);

  useEffect(() => {
    if (preselectedAppliance) {
      setSelectedAppliance(preselectedAppliance);
    }
    if (preselectedPackage) {
      setSelectedPackage(preselectedPackage);
    }
  }, [preselectedAppliance, preselectedPackage, isBookingModalOpen]);

  useEffect(() => {
    if (userPincode) setPincode(userPincode);
  }, [userPincode]);

  if (!isBookingModalOpen) return null;

  const currentServiceObj = SERVICES_DATA.find((s) => s.id === selectedAppliance) || SERVICES_DATA[0];

  const handlePincodeValidate = (e) => {
    e.preventDefault();
    const res = checkPincodeServiceability(pincode);
    setPincodeStatus(res);
    if (res.valid) {
      setStep(2);
    }
  };

  const handleCreateBooking = () => {
    const finalPrice = isSubscription ? 1499 : (selectedPackage ? selectedPackage.price : currentServiceObj.startingPrice);
    
    const newBooking = addBooking({
      serviceId: currentServiceObj.id,
      serviceName: currentServiceObj.name,
      packageTitle: isSubscription ? `AMC Plan: ${subscriptionPlan}` : (selectedPackage ? selectedPackage.title : 'Standard Repair & Diagnostics'),
      price: finalPrice,
      pincode: pincode,
      address: address,
      date: selectedDate,
      timeSlot: selectedSlot,
      isSubscription: isSubscription,
      subscriptionPlan: isSubscription ? subscriptionPlan : null,
      name: customerName,
      phone: customerPhone,
      description: issueDescription
    });

    setCreatedBooking(newBooking);
    setStep(5); // Confirmation screen
  };

  const availableDates = [
    { date: '2026-08-25', label: 'Today', day: 'Tue' },
    { date: '2026-08-26', label: 'Tomorrow', day: 'Wed' },
    { date: '2026-08-27', label: '27 Aug', day: 'Thu' },
    { date: '2026-08-28', label: '28 Aug', day: 'Fri' },
    { date: '2026-08-29', label: '29 Aug', day: 'Sat' },
    { date: '2026-08-30', label: '30 Aug', day: 'Sun' }
  ];

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading">Book Doorstep Technician</h3>
              <p className="text-[10px] text-slate-400">45-Minute Arrival • 30-Day Warranty</p>
            </div>
          </div>

          <button onClick={closeBookingModal} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span className={step >= 1 ? 'text-amber-600 font-extrabold' : ''}>1. Pincode</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-amber-600 font-extrabold' : ''}>2. Appliance</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-amber-600 font-extrabold' : ''}>3. Issue & Photos</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-amber-600 font-extrabold' : ''}>4. Date & Slot</span>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Pincode Check */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-heading">Verify Indore Location Pincode</h4>
                <p className="text-xs text-slate-500">Enter your 6-digit Indore pincode to check technician availability.</p>
              </div>

              <form onSubmit={handlePincodeValidate} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Indore Pincode</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="452010"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {pincodeStatus && (
                  <div className={`p-3 rounded-xl text-xs font-semibold border ${
                    pincodeStatus.valid ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                  }`}>
                    {pincodeStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Verify Pincode & Continue</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Appliance & Package Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-heading">Select Appliance & Package</h4>
                <p className="text-xs text-slate-500">Service available in Pincode {pincode}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Choose Service Category</label>
                <select
                  value={selectedAppliance}
                  onChange={(e) => {
                    setSelectedAppliance(e.target.value);
                    setSelectedPackage(null);
                  }}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} (Starts ₹{s.startingPrice})</option>
                  ))}
                </select>
              </div>

              {/* Service Packages Options */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Select Service Package</label>
                {currentServiceObj.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">{pkg.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{pkg.description}</div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <div className="font-extrabold text-amber-600 text-sm">₹{pkg.price}</div>
                        <div className="text-[10px] text-slate-400">{pkg.duration}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AMC Annual Subscription Toggle Option */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Save with AMC Subscription (2 Servicings/Year)
                  </span>
                  <input
                    type="checkbox"
                    checked={isSubscription}
                    onChange={(e) => setIsSubscription(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                  />
                </div>
                {isSubscription && (
                  <p className="text-[11px] text-slate-700 leading-tight">
                    Get 2 complete deep foam jet servicings per year + free unlimited priority breakdown visits for ₹1499/year.
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
                >
                  Continue to Address & Details
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Address, Issue Description & Photo Upload */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-heading">Doorstep Address & Problem Details</h4>
                <p className="text-xs text-slate-500">Provide exact address for 45-min doorstep arrival.</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Doorstep Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat No, Building Name, Street Landmark, Indore"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Hotline</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Describe Appliance Issue (Optional)</label>
                <input
                  type="text"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="e.g. AC water leaking indoors, fridge not cooling..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900"
                />
              </div>

              {/* Photo Upload for Issue Reporting */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Attach Issue Photo (Optional)</label>
                <div
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                  className={`p-3 rounded-xl border border-dashed text-center cursor-pointer transition-colors ${
                    photoUploaded ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-300 text-slate-600'
                  }`}
                >
                  <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                  <span className="font-bold">
                    {photoUploaded ? '✓ Photo Uploaded (ac_leakage.jpg)' : 'Click to attach photo/video of appliance error code'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
                >
                  Proceed to Schedule Slot
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Interactive Calendar & Time Slot Picker */}
          {step === 4 && (
            <div className="space-y-5 text-xs">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-heading">Choose Service Appointment Date & Time</h4>
                <p className="text-xs text-slate-500">Select visual date grid and time slot for technician arrival.</p>
              </div>

              {/* 14-Day Visual Date Picker Grid */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Select Date</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.date;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => setSelectedDate(d.date)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 text-amber-900 font-extrabold shadow-sm'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 uppercase">{d.day}</div>
                        <div className="text-xs font-bold">{d.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Selection */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Select Arrival Time Window</label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl border text-center transition-all font-bold ${
                          isSelected
                            ? 'border-amber-500 bg-slate-900 text-amber-400 shadow-sm'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Total Amount Payable:</span>
                  <span className="text-amber-600 text-sm font-extrabold">
                    ₹{isSubscription ? 1499 : (selectedPackage ? selectedPackage.price : currentServiceObj.startingPrice)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">Pay via UPI QR / Card online or cash to technician after repair completion.</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCreateBooking}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all"
                >
                  Confirm & Book Appointment
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmed Screen */}
          {step === 5 && createdBooking && (
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  Booking Confirmed (# {createdBooking.id})
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 font-heading pt-2">
                  Doorstep Technician Assigned!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Instant SMS & Email confirmation dispatched to <strong>{createdBooking.customerPhone}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{createdBooking.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-bold text-slate-900">{createdBooking.date}, {createdBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pincode:</span>
                  <span className="font-bold text-emerald-700">{createdBooking.pincode} (Indore)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
