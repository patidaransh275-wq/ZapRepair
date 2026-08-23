'use client';

import React, { useState } from 'react';
import { X, Star, CheckCircle2, Send } from 'lucide-react';

export default function ReviewSubmissionModal({ isOpen, onClose, booking }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base font-heading">Rate Doorstep Service</h3>
            <p className="text-xs text-amber-400 font-semibold">Booking #{booking.id}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          <div className="text-center space-y-2">
            <label className="block text-xs font-bold text-slate-700">How was your repair experience?</label>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-[11px] font-bold text-amber-600">{rating} Out of 5 Stars</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Review & Comments</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about technician punctuality, work quality, and behavior..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              required
            />
          </div>

          {submitted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your verified review has been submitted.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitted}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl shadow-md text-xs transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-amber-400" />
            <span>Submit Review</span>
          </button>

        </form>

      </div>
    </div>
  );
}
