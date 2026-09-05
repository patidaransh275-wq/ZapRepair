'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { IS_BOOKING_ENABLED, SERVICE_UNAVAILABLE_MESSAGE } from '../config/serviceArea.js';

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
    name: '',
    phone: '',
    email: '',
    addresses: []
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

  // Clear cached bookings helper
  const clearBookingCache = () => {
    setUserBookings([]);
    try {
      localStorage.removeItem('plumberindore_bookings');
    } catch (e) {}
  };

  // Fetch bookings from Supabase API on load
  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.bookings)) {
          if (data.bookings.length > 0) {
            const normalized = data.bookings.map(b => ({
              id: b.booking_number || b.id,
              serviceId: b.service_name?.toLowerCase().includes('plumb') ? 'plumber' : 'ac-repair',
              serviceName: b.service_name,
              packageTitle: b.package_title || 'Standard Package',
              price: Number(b.total_amount || b.price),
              pincode: b.pincode,
              address: b.service_address || b.address,
              date: b.scheduled_date || b.date,
              timeSlot: b.time_slot || b.timeSlot,
              customerName: b.customer_name || b.customerName,
              customerPhone: b.customer_phone || b.customerPhone,
              customerEmail: b.customer_email || b.customerEmail,
              description: b.notes || b.description,
              paymentStatus: b.payment_status || b.paymentStatus,
              paymentMethod: b.payment_method || b.paymentMethod,
              paymentRef: b.payment_ref || b.paymentRef,
              invoiceNumber: b.invoices?.[0]?.invoice_number || b.invoiceNumber || null,
              invoiceSentAt: b.invoices?.[0]?.sent_at || b.invoiceSentAt || null,
              status: b.status,
              createdAt: b.created_at || b.createdAt
            }));
            setUserBookings(normalized);
            try {
              localStorage.setItem('plumberindore_bookings', JSON.stringify(normalized));
            } catch (e) {}
          } else {
            // DB is empty: reset in-memory state and purge stale localStorage cache
            setUserBookings([]);
            try {
              localStorage.removeItem('plumberindore_bookings');
            } catch (e) {}
          }
          return;
        }
      }
    } catch (err) {
      console.warn('API bookings fetch notice (using cache):', err.message);
    }

    // Fallback to local cache only if network fetch completely failed
    try {
      const savedBookings = localStorage.getItem('plumberindore_bookings');
      if (savedBookings) {
        const parsed = JSON.parse(savedBookings);
        setUserBookings(Array.isArray(parsed) ? parsed : []);
      } else {
        setUserBookings([]);
      }
    } catch (e) {
      setUserBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
    try {
      const savedPincode = localStorage.getItem('plumberindore_pincode');
      if (savedPincode) setUserPincodeState(savedPincode);
    } catch (e) {}
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
    if (!IS_BOOKING_ENABLED) {
      console.warn('Booking attempted while services are suspended:', SERVICE_UNAVAILABLE_MESSAGE);
      throw new Error(SERVICE_UNAVAILABLE_MESSAGE);
    }

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
      customerName: bookingData.name || '',
      customerPhone: bookingData.phone || '',
      customerEmail: bookingData.email || '',
      description: bookingData.description || '',
      paymentStatus: 'Pending (Pay on Completion)',
      paymentMethod: 'Cash / UPI on Doorstep',
      paymentRef: null,
      invoiceNumber: null,
      invoiceSentAt: null,
      status: 'Technician Assigned',
      statusStep: 2,
      createdAt: new Date().toISOString()
    };

    // Optimistic local update
    const updated = [newBooking, ...userBookings];
    setUserBookings(updated);
    try {
      localStorage.setItem('plumberindore_bookings', JSON.stringify(updated));
    } catch (e) {}

    // Asynchronously persist to Supabase & calculate server prices
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
        address: bookingData.address,
        pincode: bookingData.pincode,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        services: bookingData.services,
        description: bookingData.description,
        serviceId: bookingData.serviceId,
        serviceName: bookingData.serviceName,
        packageTitle: bookingData.packageTitle
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.booking) {
          const canonical = {
            ...newBooking,
            id: data.booking.booking_number || data.booking.id,
            price: data.booking.total_amount || newBooking.price
          };
          setUserBookings(prev => prev.map(b => b.id === randomId ? canonical : b));
        }
      })
      .catch(err => console.warn('Supabase booking POST warning:', err.message));

    return newBooking;
  };

  const updateBookingPayment = (bookingId, { paymentMethod = 'UPI', paymentRef, extraParts = 0 }) => {
    let targetBooking = null;
    const invNum = `INV-2026-${bookingId}`;
    const updated = userBookings.map(b => {
      if (b.id === bookingId) {
        const newTotal = (b.price || 0) + Number(extraParts || 0);
        targetBooking = {
          ...b,
          paymentStatus: 'Paid',
          paymentMethod,
          paymentRef: paymentRef || (paymentMethod === 'Cash' ? `CASH-VERIFIED/${Math.floor(100000 + Math.random() * 900000)}` : `UPI-${Math.floor(10000000 + Math.random() * 90000000)}`),
          invoiceNumber: invNum,
          price: newTotal,
          status: 'Payment Verified & Completed'
        };
        return targetBooking;
      }
      return b;
    });
    setUserBookings(updated);
    try {
      localStorage.setItem('plumberindore_bookings', JSON.stringify(updated));
    } catch (e) {}

    // Persist payment update to Supabase
    fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentStatus: 'Paid',
        paymentMethod,
        paymentRef: targetBooking?.paymentRef,
        extraParts,
        status: 'Payment Verified & Completed'
      })
    }).catch(err => console.warn('Payment update API notice:', err.message));

    return targetBooking;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    const updated = userBookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    setUserBookings(updated);
    try {
      localStorage.setItem('plumberindore_bookings', JSON.stringify(updated));
    } catch (e) {}

    // Persist status update to Supabase
    fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(err => console.warn('Status update API notice:', err.message));
  };

  const sendInvoiceForBooking = async (booking) => {
    const invNumber = booking.invoiceNumber || `INV-2026-${booking.id}`;
    const res = await fetch('/api/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoiceNumber: invNumber,
        customerName: booking.customerName || 'Customer',
        customerEmail: booking.customerEmail || 'plumberindore@gmail.com',
        customerPhone: booking.customerPhone,
        address: booking.address,
        serviceName: booking.serviceName,
        packageTitle: booking.packageTitle,
        laborCost: booking.price,
        totalPaid: booking.price,
        paymentMethod: booking.paymentMethod || 'UPI / Cash Verified',
        paymentRef: booking.paymentRef || `TXN-${booking.id}`,
        date: booking.date
      })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      const nowStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const updated = userBookings.map(b => {
        if (b.id === booking.id) {
          return { ...b, invoiceNumber: invNumber, invoiceSentAt: nowStr, paymentStatus: 'Paid' };
        }
        return b;
      });
      setUserBookings(updated);
      try {
        localStorage.setItem('plumberindore_bookings', JSON.stringify(updated));
      } catch (e) {}
      return { success: true, invoiceNumber: invNumber, message: data.message };
    }
    return { success: false, error: data.error || 'Failed to send invoice email' };
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
        isBookingEnabled: IS_BOOKING_ENABLED,
        serviceUnavailableMessage: SERVICE_UNAVAILABLE_MESSAGE,
        clearBookingCache,
        fetchBookings,
        addBooking,
        updateBookingPayment,
        updateBookingStatus,
        sendInvoiceForBooking,
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
