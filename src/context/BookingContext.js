'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/servicesData';

const BookingContext = createContext();

const INITIAL_DEMO_BOOKINGS = [
  {
    id: 'ZAP-84920',
    serviceId: 'ac-repair',
    serviceName: 'AC Power Foam Service',
    packageTitle: 'Power Foam Jet Service',
    price: 499,
    pincode: '452010',
    address: 'Flat 402, Apollo Tower, Vijay Nagar, Indore, MP',
    date: 'Today',
    timeSlot: '2:00 PM - 4:00 PM',
    status: 'Technician En Route',
    statusStep: 3, // 1: Booked, 2: Tech Assigned, 3: En Route, 4: In Progress, 5: Completed
    technician: {
      name: 'Ramesh Kumar (Indore Pro)',
      phone: '+91 98765 43210',
      rating: 4.9,
      repairsCount: 480,
      photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=200&h=200&q=80',
      vehicle: 'Hero Splendor (MP 09 CW 4920)',
      eta: '18 Mins'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: 'ZAP-72109',
    serviceId: 'washing-machine',
    serviceName: 'Washing Machine Repair',
    packageTitle: 'Deep Descaling & Drum Service',
    price: 499,
    pincode: '452001',
    address: 'Flat 201, Industry House, AB Road, Palasia, Indore, MP',
    date: '15 Aug 2026',
    timeSlot: '10:00 AM - 12:00 PM',
    status: 'Completed',
    statusStep: 5,
    technician: {
      name: 'Sunil Sharma',
      phone: '+91 98123 45678',
      rating: 4.85,
      repairsCount: 310,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
      vehicle: 'TVS Jupiter (MP 09 EV 8812)',
      eta: 'Completed'
    },
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  }
];

export function BookingProvider({ children }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedAppliance, setPreselectedAppliance] = useState('ac-repair');
  const [preselectedPackage, setPreselectedPackage] = useState(null);
  
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingBookingId, setTrackingBookingId] = useState(null);

  const [userPincode, setUserPincodeState] = useState('452010');
  const [userBookings, setUserBookings] = useState([]);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Ansh Patidar',
    phone: '+91 98765 12345',
    email: 'ansh@zaprepair.in',
    addresses: [
      { id: 'addr-1', tag: 'Home', fullAddress: 'Flat 402, Apollo Tower, Vijay Nagar, Indore, MP - 452010' },
      { id: 'addr-2', tag: 'Office', fullAddress: 'Office 201, Industry House, AB Road, Old Palasia, Indore, MP - 452001' }
    ]
  });

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('zaprepair_bookings');
      if (savedBookings) {
        setUserBookings(JSON.parse(savedBookings));
      } else {
        setUserBookings(INITIAL_DEMO_BOOKINGS);
        localStorage.setItem('zaprepair_bookings', JSON.stringify(INITIAL_DEMO_BOOKINGS));
      }

      const savedPincode = localStorage.getItem('zaprepair_pincode');
      if (savedPincode) setUserPincodeState(savedPincode);
    } catch (e) {
      setUserBookings(INITIAL_DEMO_BOOKINGS);
    }
  }, []);

  const setUserPincode = (code) => {
    setUserPincodeState(code);
    try {
      localStorage.setItem('zaprepair_pincode', code);
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

  const addBooking = (bookingData) => {
    const randomId = `ZAP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      id: randomId,
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      packageTitle: bookingData.packageTitle || 'Standard Repair & Diagnostics',
      price: bookingData.price,
      pincode: bookingData.pincode,
      address: bookingData.address,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      customerName: bookingData.name || userProfile.name,
      customerPhone: bookingData.phone || userProfile.phone,
      status: 'Technician Assigned',
      statusStep: 2,
      technician: {
        name: 'Vikram Singh (Verified Indore Pro)',
        phone: '+91 98765 09876',
        rating: 4.95,
        repairsCount: 520,
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80',
        vehicle: 'Honda Activa (MP 09 CZ 1122)',
        eta: '30 Mins'
      },
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...userBookings];
    setUserBookings(updated);
    try {
      localStorage.setItem('zaprepair_bookings', JSON.stringify(updated));
    } catch (e) {}

    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    const updated = userBookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'Cancelled', statusStep: 0 };
      }
      return b;
    });
    setUserBookings(updated);
    try {
      localStorage.setItem('zaprepair_bookings', JSON.stringify(updated));
    } catch (e) {}
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
        userPincode,
        setUserPincode,
        userBookings,
        addBooking,
        cancelBooking,
        userProfile,
        setUserProfile
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
