'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Navigation, 
  AlertCircle,
  Plus,
  IndianRupee,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function TechnicianPortal() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [extraPartsCost, setExtraPartsCost] = useState('');
  const [partsNote, setPartsNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/technician/jobs');
      const data = await res.json();
      if (data.success && data.jobs) {
        setJobs(data.jobs);
        if (data.jobs.length > 0 && !selectedJob) {
          setSelectedJob(data.jobs[0]);
        }
      }
    } catch (e) {
      console.warn('Technician jobs fetch fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusUpdate = async (status) => {
    if (!selectedJob) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/technician/jobs/${selectedJob.assignmentId || selectedJob.bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          extraParts: Number(extraPartsCost) || 0,
          technicianNotes: partsNote || undefined
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Job status updated to: ${status.replace(/_/g, ' ').toUpperCase()}`);
        setTimeout(() => setSuccessMessage(''), 4000);
        fetchJobs();
      }
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      {/* Top Mobile App Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base leading-tight">PlumberIndore <span className="text-amber-400">Technician</span></h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online • Indore Service Area
            </p>
          </div>
        </div>

        <button 
          onClick={fetchJobs}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
          title="Refresh Jobs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {successMessage && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            {successMessage}
          </div>
        )}

        {/* Assigned Jobs List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Assigned Jobs ({jobs.length})</h2>
            <span className="text-xs text-amber-400 font-medium">Auto-dispatch Active</span>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <div 
                key={job.bookingId || job.assignmentId}
                onClick={() => setSelectedJob(job)}
                className={`p-4 rounded-2xl border transition cursor-pointer ${
                  selectedJob?.bookingId === job.bookingId 
                    ? 'bg-slate-800 border-amber-500/60 shadow-lg shadow-amber-500/5' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {job.bookingId}
                    </span>
                    <h3 className="font-bold text-base mt-2 text-white">{job.serviceName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{job.packageTitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-400">₹{job.totalAmount}</span>
                    <div className="text-[11px] text-slate-400 mt-1 capitalize">{job.bookingStatus}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{job.address}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {job.timeSlot}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Job Action Panel */}
        {selectedJob && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold text-amber-400">ACTIVE JOB WORKFLOW</span>
              <h3 className="text-lg font-bold text-white mt-1">{selectedJob.customerName}</h3>
              
              <div className="flex items-center gap-3 mt-3">
                <a 
                  href={`tel:${selectedJob.customerPhone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition"
                >
                  <Phone className="w-4 h-4" /> Call Customer ({selectedJob.customerPhone})
                </a>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedJob.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition"
                  title="Open GPS Navigation"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                </a>
              </div>
            </div>

            {/* Workflow Step Progression */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update Job Stage</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusUpdate('accepted')}
                  className="py-2.5 px-3 bg-slate-900 border border-slate-700 hover:border-amber-500 rounded-xl text-xs font-semibold text-slate-200"
                >
                  1. Accept Job
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusUpdate('on_the_way')}
                  className="py-2.5 px-3 bg-blue-950/40 border border-blue-700/60 hover:border-blue-400 text-blue-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" /> 2. On The Way
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusUpdate('arrived')}
                  className="py-2.5 px-3 bg-amber-950/30 border border-amber-700/60 hover:border-amber-400 text-amber-300 rounded-xl text-xs font-semibold"
                >
                  3. Arrived (Start)
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => handleStatusUpdate('completed')}
                  className="py-2.5 px-3 bg-emerald-950/50 border border-emerald-600 hover:border-emerald-400 text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4. Completed
                </button>
              </div>
            </div>

            {/* Extra Parts & Consumables Adder */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-amber-400" /> Add Extra Parts / Materials
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-bold">₹</span>
                  <input 
                    type="number"
                    placeholder="Parts Amount"
                    value={extraPartsCost}
                    onChange={(e) => setExtraPartsCost(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <input 
                  type="text"
                  placeholder="e.g. Spindle / Pipe"
                  value={partsNote}
                  onChange={(e) => setPartsNote(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
