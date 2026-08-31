'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/servicesData';

const BookingContext = createContext();

const INITIAL_DEMO_BOOKINGS = [];

export function BookingProvider({ children }) {
  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedAppliance, setPreselectedAppliance] = useState('ac-repair');
  const [preselectedPackage, setPreselectedPackage] = useState(null);
  
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingBookingId, setTrackingBookingId] = useState(null);

  // Reschedule Modal state
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleBookingId, setRescheduleBookingId] = useState(null);

  // All Services Categorized Modal state
  const [isAllServicesModalOpen, setIsAllServicesModalOpen] = useState(false);

  const [userPincode, setUserPincodeState] = useState('452010');
  const [userBookings, setUserBookings] = useState([]);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Ansh Patidar',
    phone: '+91 91749 34135',
    email: 'plumberindore@gmail.com',
    addresses: [
      { id: 'addr-1', tag: 'Home', fullAddress: 'Vijay Nagar, Indore, MP - 452010' },
      { id: 'addr-2', tag: 'Office', fullAddress: 'Office 201, Industry House, AB Road, Old Palasia, Indore, MP - 452001' }
    ]
  });

  const checkSession = async () => {
    try {
      setAuthLoading(true);
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      if (data.isAuthenticated && data.user) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setUserProfile(prev => ({
          ...prev,
          name: data.user.name || prev.name,
          phone: data.user.phone || prev.phone,
          email: data.user.email || prev.email
        }));
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('plumberindore_bookings');
      if (savedBookings) {
        const parsed = JSON.parse(savedBookings);
        // Exclude legacy demo IDs if any existed
        const filtered = Array.isArray(parsed) ? parsed.filter(b => b.id !== 'IND-84920' && b.id !== 'IND-72109') : [];
        setUserBookings(filtered);
      } else {
        setUserBookings([]);
      }

      const savedPincode = localStorage.getItem('plumberindore_pincode');
      if (savedPincode) setUserPincodeState(savedPincode);
    } catch (e) {
      setUserBookings([]);
    }
  }, []);

  const requestPhoneOtp = async (phone) => {
    const res = await fetch('/api/auth/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'request', phone })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to request OTP');
    return data;
  };

  const verifyPhoneOtp = async (phone, otp, name) => {
    const res = await fetch('/api/auth/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'verify', phone, otp, name })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');

    setIsAuthenticated(true);
    setCurrentUser(data.user);
    setUserProfile(prev => ({
      ...prev,
      name: data.user.name || prev.name,
      phone: data.user.phone || prev.phone,
      email: data.user.email || prev.email
    }));
    return data;
  };

  const loginWithEmail = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid email or password');

    setIsAuthenticated(true);
    setCurrentUser(data.user);
    setUserProfile(prev => ({
      ...prev,
      name: data.user.name || prev.name,
      email: data.user.email || prev.email
    }));
    return data;
  };

  const signupUser = async ({ name, phone, email, password }) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create account');

    setIsAuthenticated(true);
    setCurrentUser(data.user);
    setUserProfile(prev => ({
      ...prev,
      name: data.user.name,
      phone: data.user.phone,
      email: data.user.email
    }));
    return data;
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const setUserPincode = (code) => {
    setUserPincodeState(code);
    try {
      localStorage.setItem('plumberindore_pincode', code);
    } catch (e) {}
  };

  const openBookingModal = (applianceId = 'ac-repair', packageObj = null) => {
    setPreselectedAppliance(applianceId);
    setPreselectedPackage(packageObj);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setPreselectedPackage(null);
  };

  const openTrackingModal = (bookingId) => {
    setTrackingBookingId(bookingId);
    setIsTrackingModalOpen(true);
  };

  const closeTrackingModal = () => {
    setIsTrackingModalOpen(false);
    setTrackingBookingId(null);
  };

  const openRescheduleModal = (bookingId) => {
    setRescheduleBookingId(bookingId);
    setIsRescheduleModalOpen(true);
  };

  const closeRescheduleModal = () => {
    setIsRescheduleModalOpen(false);
    setRescheduleBookingId(null);
  };

  const openAllServicesModal = () => {
    setIsAllServicesModalOpen(true);
  };

  const closeAllServicesModal = () => {
    setIsAllServicesModalOpen(false);
  };

  const addBooking = (bookingData) => {
    const randomId = `IND-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      id: randomId,
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      packageTitle: bookingData.packageTitle || 'Standard Repair & Diagnostics',
      services: bookingData.services || [],
      price: bookingData.price,
      pincode: bookingData.pincode,
      address: bookingData.address,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      isSubscription: bookingData.isSubscription || false,
      subscriptionPlan: bookingData.subscriptionPlan || null,
      customerName: bookingData.name || userProfile.name,
      customerPhone: bookingData.phone || userProfile.phone,
      customerEmail: userProfile.email,
      status: 'Technician Assigned',
      statusStep: 2,
      confirmationSent: { sms: true, email: true },
      technician: {
        title: 'Verified Doorstep Technician',
        phone: '+91 91749 34135',
        rating: 4.95,
        repairsCount: 520,
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80',
        vehicle: 'Service Vehicle (MP 09 CZ 1122)',
        eta: '30 Mins'
      },
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...userBookings];
    setUserBookings(updated);
    try {
      localStorage.setItem('plumberindore_bookings', JSON.stringify(updated));
    } catch (e) {}

    // Send confirmation email via Resend
    fetch('/api/booking/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', booking: newBooking })
    }).catch(err => console.warn('Booking create email dispatch error:', err));

    return newBooking;
  };

  const rescheduleBooking = (bookingId, newDate, newTimeSlot) => {
    let targetBooking = null;
    const updated = userBookings.map(b => {
      if (b.id === bookingId) {
        targetBooking = {
          ...b,
          date: newDate,
          timeSlot: newTimeSlot,
          status: 'Rescheduled',
          confirmationSent: { sms: true, email: true }
        };
        return targetBooking;
      }
      return b;
    });
    setUserBookings(updated);
    try {
      localStorage.setItem('plumberindore_bookings', JSON.stringify(updated));
    } catch (e) {}

    if (targetBooking) {
      fetch('/api/booking/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reschedule',
          booking: targetBooking,
          newDate,
          newTimeSlot
        })
      }).catch(err => console.warn('Booking reschedule email dispatch error:', err));
    }
  };

  const cancelBooking = (bookingId) => {
    let targetBooking = null;
    const updated = userBookings.map(b => {
      if (b.id === bookingId) {
        targetBooking = { ...b, status: 'Cancelled', statusStep: 0 };
        return targetBooking;
      }
      return b;
    });
    setUserBookings(updated);
    try {
      localStorage.setItem('plumberindore_bookings', JSON.stringify(updated));
    } catch (e) {}

    if (targetBooking) {
      fetch('/api/booking/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', booking: targetBooking })
      }).catch(err => console.warn('Booking cancel email dispatch error:', err));
    }
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        preselectedAppliance,
        preselectedPackage,
        isTrackingModalOpen,
        openTrackingModal,
        closeTrackingModal,
        trackingBookingId,
        isRescheduleModalOpen,
        openRescheduleModal,
        closeRescheduleModal,
        rescheduleBookingId,
        rescheduleBooking,
        isAllServicesModalOpen,
        openAllServicesModal,
        closeAllServicesModal,
        userPincode,
        setUserPincode,
        userBookings,
        addBooking,
        cancelBooking,
        userProfile,
        setUserProfile,
        isAuthenticated,
        currentUser,
        authLoading,
        requestPhoneOtp,
        verifyPhoneOtp,
        loginWithEmail,
        signupUser,
        logout
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
