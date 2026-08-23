'use client';

import React, { useState } from 'react';
import { Bell, X, ShieldCheck, CheckCircle2, Truck, Wrench } from 'lucide-react';

export default function PushNotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    { id: 1, title: 'Technician Assigned', message: 'Verified technician assigned for your AC Power Foam Service (#IND-84920).', time: '10 mins ago' },
    { id: 2, title: 'En Route to Vijay Nagar', message: 'Technician is en route with ETA 18 mins.', time: '2 mins ago' }
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setUnreadCount(0);
        }}
        className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors relative"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white font-heading">Push Notifications</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    {n.title}
                  </span>
                  <span className="text-[9px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
