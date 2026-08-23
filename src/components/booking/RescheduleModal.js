'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, RefreshCw } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export default function RescheduleModal() {
  const { isRescheduleModalOpen, closeRescheduleModal, rescheduleBookingId, userBookings, rescheduleBooking } = useBooking();

  const currentBooking = userBookings.find(b => b.id === rescheduleBookingId);

  // Date selection state
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // default tomorrow
    return d.toISOString().split('T')[0];
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('2:00 PM - 4:00 PM');
  const [success, setSuccess] = useState(false);

  if (!isRescheduleModalOpen || !currentBooking) return null;

  // Generate 14 selectable upcoming days for calendar grid
  const upcomingDays = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      fullDate: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    rescheduleBooking(currentBooking.id, selectedDate, selectedTimeSlot);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      closeRescheduleModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Self-Service Portal</span>
            <h3 className="font-bold text-lg font-heading">Reschedule Booking #{currentBooking.id}</h3>
          </div>
          <button
            type="button"
            onClick={closeRescheduleModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleConfirmReschedule} className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {/* Current Schedule Summary */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-1">
            <div className="font-bold text-slate-900">{currentBooking.serviceName}</div>
            <div className="text-slate-500">
              Current Slot: <strong className="text-slate-700">{currentBooking.date}, {currentBooking.timeSlot}</strong>
            </div>
          </div>

          {/* Visual Interactive 14-Day Calendar Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Select New Date</span>
            </label>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-1">
              {upcomingDays.map((day) => {
                const isSelected = selectedDate === day.fullDate;
                return (
                  <button
                    type="button"
                    key={day.fullDate}
                    onClick={() => setSelectedDate(day.fullDate)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-extrabold ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-slate-400">{day.dayName}</div>
                    <div className="text-base font-extrabold font-heading text-slate-900">{day.dayNumber}</div>
                    <div className="text-[9px] text-slate-500">{day.monthName}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Select New Time Slot</span>
            </label>

            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                    selectedTimeSlot === slot
                      ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span>{slot}</span>
                  {selectedTimeSlot === slot && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Booking rescheduled successfully! SMS & Email notifications dispatched.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={closeRescheduleModal}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={success}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Confirm New Schedule</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
