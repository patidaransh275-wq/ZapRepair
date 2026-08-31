'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Wrench, Calendar, MapPin, Phone, User, CheckCircle2, ArrowRight, ShieldCheck, Upload, Plus, Trash2, Tag } from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { useBooking } from '../../context/BookingContext';
import { checkPincodeServiceability } from '../../data/pincodesData';

export default function BookingModal() {
  const { isBookingModalOpen, closeBookingModal, preselectedAppliance, preselectedPackage, userPincode, addBooking, userProfile } = useBooking();

  const [step, setStep] = useState(1);
  const [selectedAppliance, setSelectedAppliance] = useState('ac-repair');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  
  const [pincode, setPincode] = useState(userPincode || '452010');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const [address, setAddress] = useState('Vijay Nagar, Indore, MP');
  const [customerName, setCustomerName] = useState(userProfile?.name || 'Ansh Patidar');
  const [customerPhone, setCustomerPhone] = useState(userProfile?.phone || '+91 91749 34135');
  const [issueDescription, setIssueDescription] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Date and Time slot picker
  const [selectedDate, setSelectedDate] = useState('2026-08-30');
  const [selectedSlot, setSelectedSlot] = useState('2:00 PM - 4:00 PM');

  const [createdBooking, setCreatedBooking] = useState(null);

  // Initialize selected services when modal opens
  useEffect(() => {
    if (isBookingModalOpen) {
      const activeApplianceId = preselectedAppliance || 'ac-repair';
      setSelectedAppliance(activeApplianceId);
      
      const serviceObj = SERVICES_DATA.find((s) => s.id === activeApplianceId || s.slug === activeApplianceId) || SERVICES_DATA[0];
      const pkgObj = preselectedPackage || (serviceObj.packages && serviceObj.packages[0]);

      if (pkgObj) {
        setSelectedPackage(pkgObj);
        setSelectedServices([
          {
            id: `${serviceObj.id}-${pkgObj.id || 'std'}`,
            serviceId: serviceObj.id,
            serviceName: serviceObj.name,
            packageId: pkgObj.id || 'std',
            packageTitle: pkgObj.title || 'Standard Service',
            price: pkgObj.price || serviceObj.startingPrice
          }
        ]);
      } else {
        setSelectedServices([
          {
            id: `${serviceObj.id}-std`,
            serviceId: serviceObj.id,
            serviceName: serviceObj.name,
            packageId: 'std',
            packageTitle: 'Standard Doorstep Repair',
            price: serviceObj.startingPrice
          }
        ]);
      }
    }
  }, [preselectedAppliance, preselectedPackage, isBookingModalOpen]);

  useEffect(() => {
    if (userPincode) setPincode(userPincode);
  }, [userPincode]);

  if (!isBookingModalOpen) return null;

  const currentServiceObj = SERVICES_DATA.find((s) => s.id === selectedAppliance || s.slug === selectedAppliance) || SERVICES_DATA[0];

  const handlePincodeValidate = (e) => {
    e.preventDefault();
    const res = checkPincodeServiceability(pincode);
    setPincodeStatus(res);
    if (res.valid) {
      setStep(2);
    }
  };

  const handleToggleService = (pkg) => {
    const itemUniqueId = `${currentServiceObj.id}-${pkg.id}`;
    const exists = selectedServices.some((s) => s.id === itemUniqueId);

    if (exists) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s.id !== itemUniqueId));
      }
    } else {
      setSelectedServices([
        ...selectedServices,
        {
          id: itemUniqueId,
          serviceId: currentServiceObj.id,
          serviceName: currentServiceObj.name,
          packageId: pkg.id,
          packageTitle: pkg.title,
          price: pkg.price
        }
      ]);
    }
  };

  const handleRemoveService = (uniqueId) => {
    if (selectedServices.length > 1) {
      setSelectedServices(selectedServices.filter((s) => s.id !== uniqueId));
    }
  };

  const totalPrice = selectedServices.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleCreateBooking = () => {
    const primaryService = selectedServices[0] || {
      serviceId: currentServiceObj.id,
      serviceName: currentServiceObj.name,
      packageTitle: 'Standard Repair'
    };

    const newBooking = addBooking({
      serviceId: primaryService.serviceId,
      serviceName: selectedServices.map((s) => s.serviceName).filter((v, i, a) => a.indexOf(v) === i).join(' + '),
      packageTitle: selectedServices.map((s) => s.packageTitle).join(' | '),
      services: selectedServices,
      price: totalPrice,
      pincode: pincode,
      address: address,
      date: selectedDate,
      timeSlot: selectedSlot,
      name: customerName,
      phone: customerPhone,
      description: issueDescription
    });

    setCreatedBooking({
      ...newBooking,
      services: selectedServices
    });
    setStep(5); // Confirmation screen
  };

  const availableDates = [
    { date: '2026-08-30', label: 'Today', day: 'Sun' },
    { date: '2026-08-31', label: 'Tomorrow', day: 'Mon' },
    { date: '2026-09-01', label: '01 Sep', day: 'Tue' },
    { date: '2026-09-02', label: '02 Sep', day: 'Wed' },
    { date: '2026-09-03', label: '03 Sep', day: 'Thu' },
    { date: '2026-09-04', label: '04 Sep', day: 'Fri' }
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
              <p className="text-[10px] text-slate-400">Multi-Service Booking • 45-Min Arrival • 30-Day Warranty</p>
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
            <span className={step >= 2 ? 'text-amber-600 font-extrabold' : ''}>2. Services ({selectedServices.length})</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-amber-600 font-extrabold' : ''}>3. Address</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-amber-600 font-extrabold' : ''}>4. Slot & Summary</span>
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

          {/* STEP 2: Multi-Service Selection & Cart */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-heading">Select Services for Single Checkout</h4>
                <p className="text-xs text-slate-500">Add one or more services. All will be handled in a single doorstep visit.</p>
              </div>

              {/* Selected Services Cart Pills */}
              {selectedServices.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-amber-950 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      <span>Selected Services ({selectedServices.length}):</span>
                    </span>
                    <span className="font-extrabold text-amber-700 text-sm">₹{totalPrice}</span>
                  </div>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedServices.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-2.5 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs shadow-2xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-slate-900 truncate">{item.serviceName}</div>
                          <div className="text-[11px] text-slate-500 truncate">{item.packageTitle}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-extrabold text-slate-900">₹{item.price}</span>
                          {selectedServices.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveService(item.id)}
                              className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                              title="Remove service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Choose Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Add Another Service Category</label>
                <select
                  value={selectedAppliance}
                  onChange={(e) => {
                    setSelectedAppliance(e.target.value);
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
                <label className="block text-xs font-bold text-slate-700">Click to Select / Add {currentServiceObj.name} Packages</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {currentServiceObj.packages.map((pkg) => {
                    const itemUniqueId = `${currentServiceObj.id}-${pkg.id}`;
                    const isSelected = selectedServices.some((s) => s.id === itemUniqueId);

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => handleToggleService(pkg)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/30 shadow-sm'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="pr-2">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${isSelected ? 'bg-amber-500 text-slate-950 font-extrabold' : 'border border-slate-300'}`}>
                              {isSelected ? '✓' : '+'}
                            </span>
                            <span>{pkg.title}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 ml-5">{pkg.description}</div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <div className="font-extrabold text-amber-600 text-sm">₹{pkg.price}</div>
                          <div className="text-[10px] text-slate-400">{pkg.duration}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                  disabled={selectedServices.length === 0}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md disabled:opacity-50"
                >
                  Continue with {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} (₹{totalPrice})
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Address, Problem Details & Photo Upload */}
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
                <label className="block font-bold text-slate-700 mb-1">Describe Appliance/Repair Issue (Optional)</label>
                <input
                  type="text"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="e.g. AC water leaking, dripping washbasin tap, switch spark..."
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
                    {photoUploaded ? '✓ Photo Uploaded (repair_issue.jpg)' : 'Click to attach photo/video of appliance error code'}
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

          {/* STEP 4: Date & Slot Picker with Multi-Service Summary */}
          {step === 4 && (
            <div className="space-y-5 text-xs">
              <div className="text-center space-y-1">
                <h4 className="text-lg font-bold text-slate-900 font-heading">Choose Service Appointment Date & Time</h4>
                <p className="text-xs text-slate-500">Select date and time window for technician arrival.</p>
              </div>

              {/* Date Picker Grid */}
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

              {/* Itemized Multi-Service Checkout Summary Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs border-b border-slate-200 pb-2">
                  Itemized Order Checkout ({selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'})
                </div>

                <div className="space-y-1.5 divide-y divide-slate-100 max-h-32 overflow-y-auto">
                  {selectedServices.map((srv, idx) => (
                    <div key={idx} className="flex justify-between items-center pt-1.5 first:pt-0">
                      <div>
                        <span className="font-bold text-slate-900">{srv.serviceName}</span>
                        <span className="text-[10px] text-slate-500 block">{srv.packageTitle}</span>
                      </div>
                      <span className="font-extrabold text-slate-900">₹{srv.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-extrabold text-base text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount Payable:</span>
                  <span className="text-amber-600">₹{totalPrice}</span>
                </div>
                <p className="text-[10px] text-slate-500">Pay online via UPI/Card or cash after doorstep service completion.</p>
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

          {/* STEP 5: Booking Confirmed Screen with Itemized Multi-Service List */}
          {step === 5 && createdBooking && (
            <div className="text-center space-y-5 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  Booking Confirmed (#{createdBooking.id})
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 font-heading pt-2">
                  Doorstep Technician Assigned!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Instant SMS & Email confirmation dispatched to <strong>{createdBooking.customerPhone}</strong>.
                </p>
              </div>

              {/* Itemized Services Confirmation List */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-3 max-w-md mx-auto">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                    Booked Services ({createdBooking.services?.length || 1})
                  </span>
                  
                  <div className="space-y-2 divide-y divide-slate-200/60">
                    {createdBooking.services && createdBooking.services.length > 0 ? (
                      createdBooking.services.map((srv, idx) => (
                        <div key={idx} className="flex justify-between items-center pt-1.5 first:pt-0">
                          <div>
                            <div className="font-bold text-slate-900">{srv.serviceName}</div>
                            <div className="text-[11px] text-slate-500">{srv.packageTitle}</div>
                          </div>
                          <div className="font-extrabold text-amber-600">₹{srv.price}</div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-slate-900">{createdBooking.serviceName}</div>
                        <div className="font-extrabold text-amber-600">₹{createdBooking.price}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-bold text-slate-900">{createdBooking.date}, {createdBooking.timeSlot}</span>
                </div>
                
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Doorstep Location:</span>
                  <span className="font-bold text-slate-900 text-right">{createdBooking.address} ({createdBooking.pincode})</span>
                </div>

                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-1">
                  <span>Total Amount Payable:</span>
                  <span className="text-emerald-700">₹{createdBooking.price}</span>
                </div>
              </div>

              {/* Automated Notification Dispatch Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant SMS & WhatsApp confirmation sent to <strong>{createdBooking.customerPhone}</strong></span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCreatedBooking(null);
                    setSelectedServices([]);
                    setStep(2);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ Book Another Service</span>
                </button>

                <a
                  href={`https://wa.me/919174934135?text=${encodeURIComponent(`Hello PlumberIndore, I just booked service #${createdBooking.id} (${createdBooking.serviceName}) for ${createdBooking.customerName} at ${createdBooking.address}. Please confirm technician visit.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs text-center flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </a>

                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-5 rounded-xl text-xs cursor-pointer"
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
