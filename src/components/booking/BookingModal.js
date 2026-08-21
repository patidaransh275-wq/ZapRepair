'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MapPin, Calendar, Clock, ShieldCheck, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { checkPincodeServiceability } from '../../data/pincodesData';

export default function BookingModal() {
  const { isBookingModalOpen, closeBookingModal, preselectedAppliance, preselectedPackage, userPincode, addBooking, userProfile } = useBooking();

  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedAppliance || 'ac-repair');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [pincode, setPincode] = useState(userPincode || '452010');
  const [address, setAddress] = useState('Flat 402, Apollo Tower, Vijay Nagar, Indore, MP');
  const [dateOption, setDateOption] = useState('Today');
  const [timeSlot, setTimeSlot] = useState('2:00 PM - 4:00 PM');
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [createdBooking, setCreatedBooking] = useState(null);

  useEffect(() => {
    if (isBookingModalOpen) {
      setStep(1);
    }
  }, [isBookingModalOpen]);

  useEffect(() => {
    if (preselectedAppliance) {
      setSelectedServiceId(preselectedAppliance);
    }
  }, [preselectedAppliance]);

  useEffect(() => {
    if (preselectedPackage) {
      setSelectedPackage(preselectedPackage);
    } else {
      const s = SERVICES_DATA.find(srv => srv.id === selectedServiceId);
      if (s && s.packages && s.packages.length > 0) {
        setSelectedPackage(s.packages[0]);
      }
    }
  }, [selectedServiceId, preselectedPackage]);

  if (!isBookingModalOpen) return null;

  const currentService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleNextStep = () => {
    if (step === 3) {
      const check = checkPincodeServiceability(pincode);
      if (!check.valid) {
        alert(check.message);
        return;
      }
    }
    if (step < 7) {
      setStep(step + 1);
    } else if (step === 7) {
      // Create final booking
      const newB = addBooking({
        serviceId: currentService.id,
        serviceName: currentService.name,
        packageTitle: selectedPackage?.title || currentService.name,
        price: selectedPackage?.price || currentService.startingPrice,
        pincode: pincode,
        address: address,
        date: dateOption,
        timeSlot: timeSlot,
        name: name,
        phone: phone
      });
      setCreatedBooking(newB);
      setStep(8); // Success step
    }
  };

  const handleBackStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-base font-heading">Book {currentService.name}</h3>
              <p className="text-xs text-amber-400">Step {step} of 7</p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step <= 7 && (
          <div className="w-full bg-slate-100 h-1.5">
            <div
              className="bg-amber-500 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: Select Appliance */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">1. Select Appliance / Category</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES_DATA.map((srv) => (
                  <button
                    type="button"
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                      selectedServiceId === srv.id
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-900">{srv.name}</span>
                    <span className="text-[11px] text-amber-600 font-bold">From ₹{srv.startingPrice}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Job Package */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">2. Select Service Package</h4>
              <div className="space-y-3">
                {currentService.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPackage?.id === pkg.id
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900 text-sm">{pkg.title}</h5>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-slate-900">₹{pkg.price}</span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{pkg.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Est. Duration: {pkg.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Enter Pincode & Address */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">3. Doorstep Location</h4>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Indore Pincode</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-32 px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="452010"
                  />
                  <div className="flex-1 px-3 py-2 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Indore Serviceable Area</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Complete Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="House/Flat No., Building Name, Street & Landmark"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Select Date */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">4. Select Preferred Date</h4>
              <div className="grid grid-cols-3 gap-3">
                {['Today', 'Tomorrow', 'Day After'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setDateOption(opt)}
                    className={`py-3 px-4 rounded-xl border text-center font-bold text-sm transition-all ${
                      dateOption === opt
                        ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Select Time Slot */}
          {step === 5 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">5. Select Time Slot</h4>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`w-full py-3 px-4 rounded-xl border text-left font-semibold text-sm flex items-center justify-between transition-all ${
                      timeSlot === slot
                        ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span>{slot}</span>
                    {timeSlot === slot && <CheckCircle2 className="w-5 h-5 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Customer Details */}
          {step === 6 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">6. Contact Information</h4>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (For Technician Updates)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* STEP 7: Price & Booking Summary */}
          {step === 7 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">7. Review & Confirm Booking</h4>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Service:</span>
                  <span className="font-bold text-slate-900">{currentService.name}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Package:</span>
                  <span className="text-slate-900">{selectedPackage?.title || 'Standard Servicing'}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Scheduled Date & Time:</span>
                  <span className="text-slate-900">{dateOption}, {timeSlot}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">Address:</span>
                  <span className="text-slate-900 text-right max-w-xs">{address}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Item Total</span>
                  <span>₹{selectedPackage?.price || 499}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Doorstep Inspection Fee</span>
                  <span>FREE (Waived)</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-200">
                  <span>Total Payable Amount</span>
                  <span className="text-amber-600">₹{selectedPackage?.price || 499}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2 text-xs text-amber-900">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Pay after service completion via Cash, UPI, or Card to technician.</span>
              </div>
            </div>
          )}

          {/* STEP 8: Success Screen */}
          {step === 8 && createdBooking && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading">Booking Confirmed!</h3>
              <p className="text-xs text-slate-600">
                Booking ID: <span className="font-bold text-slate-900">{createdBooking.id}</span>
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left space-y-2 text-xs max-w-md mx-auto">
                <div className="font-bold text-slate-900 text-sm border-b pb-2">Assigned Indore Technician</div>
                <div className="flex items-center gap-3 pt-1">
                  <img
                    src={createdBooking.technician.photo}
                    alt={createdBooking.technician.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-400"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{createdBooking.technician.name}</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">★ {createdBooking.technician.rating} Verified Expert</div>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-sm"
                >
                  Close & View Active Bookings
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Controls */}
        {step <= 7 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBackStep}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNextStep}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm shadow-md flex items-center gap-2"
            >
              <span>{step === 7 ? 'Confirm Booking' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
