import React, { useState } from 'react';
import { FiHome } from 'react-icons/fi';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Bell,
  Sparkles,
  Compass,
  Clock,
  RotateCcw,
  Trash2,
  Send,
  Loader2,
} from 'lucide-react';
import Card from '../ui/Card';
import Breadcrumb from '../ui/breadcrumbs';
import { useToast, toast } from '../../context/toast-context';

const ToasterUi = () => {
  const { position, setPosition, clearToasts } = useToast();
  const [lastActionStatus, setLastActionStatus] = useState('');

  const triggerTypeToast = (type) => {
    switch (type) {
      case 'success':
        toast.success('Patient #P-10842 vitals verified and logged to EMR.', {
          title: 'Vitals Recorded Successfully',
        });
        break;
      case 'error':
        toast.error('Critical potassium reading: 7.1 mEq/L in CCU-Bed 02.', {
          title: 'STAT Laboratory Critical Alert',
        });
        break;
      case 'warning':
        toast.warning('ICU capacity is at 94%. Bed allocation constrained.', {
          title: 'Capacity Threshold Warning',
        });
        break;
      case 'info':
        toast.info('Shift handoff complete for Evening Nursing Team B.', {
          title: 'Clinical Shift Update',
        });
        break;
      default:
        toast('CarePulse hospital network running on telemetry node #4.', {
          title: 'Hospital Telemetry Active',
        });
        break;
    }
  };

  const triggerPromiseToast = () => {
    const fakeAsyncOp = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.25) {
          resolve('PACS server connected: 18 DICOM scans synchronized.');
        } else {
          reject(new Error('Network timeout reaching PACS gateway.'));
        }
      }, 2200);
    });

    toast.promise(fakeAsyncOp, {
      loading: 'Synchronizing high-resolution CT & MRI imaging...',
      success: (data) => data,
      error: (err) => err.message || 'Synchronization failed.',
    });
  };

  const triggerActionToast = () => {
    toast('Inpatient admission record #ENC-9081 moved to archive.', {
      title: 'Patient Record Archived',
      action: {
        label: 'Undo Archive',
        onClick: () => {
          setLastActionStatus('Archive undone for record #ENC-9081.');
          toast.success('Record #ENC-9081 restored to active inpatient list.', {
            title: 'Action Restored',
          });
        },
      },
    });
  };

  const triggerDurationToast = (duration, label) => {
    if (duration === Infinity) {
      toast.warning('Code Blue protocol active in Trauma Bay 1. Requires manual acknowledge.', {
        title: 'Emergency Sticky Alert',
        duration: Infinity,
      });
    } else {
      toast.info(`This notification will dismiss in ${duration / 1000} seconds.`, {
        title: `${label} Notification`,
        duration,
      });
    }
  };

  const positions = [
    { id: 'top-right', label: 'Top Right' },
    { id: 'top-center', label: 'Top Center' },
    { id: 'top-left', label: 'Top Left' },
    { id: 'bottom-right', label: 'Bottom Right' },
    { id: 'bottom-center', label: 'Bottom Center' },
    { id: 'bottom-left', label: 'Bottom Left' },
  ];

  return (
    <div className="pt-6 px-4 sm:px-6 space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Toaster & Notification Alerts
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/60">
            Interactive, stackable, animated toast notifications powered by Framer Motion.
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'UI Toolkit' },
            { label: 'UI Elements', href: '/ui-elements' },
            { label: 'Toaster' },
          ]}
        />
      </div>

      {/* Global Actions Bar */}
      <Card className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-white/60">
              Active Position:
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/15 text-primary border border-primary/30 uppercase">
              {position}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearToasts}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 size={13} className="text-rose-500" />
              <span>Clear All Toasts</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Section 1: Core Toast Variants */}
      <Card className="p-6">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-black/5 dark:border-white/5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Toast Notification Types
            </h2>
            <p className="text-xs text-slate-500 dark:text-white/60">
              Standard feedback alerts with animated icons, status border, and timer progress bar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => triggerTypeToast('success')}
            className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Success Toast
              </p>
              <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">
                Positive confirmations, completed actions, saved records.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => triggerTypeToast('error')}
            className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/20 group-hover:scale-105 transition-transform">
              <XCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                Error & Critical Alert
              </p>
              <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">
                System faults, critical clinical flags, rejected requests.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => triggerTypeToast('warning')}
            className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                Warning Toast
              </p>
              <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">
                Capacity limits, drug interaction warnings, expiry checks.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => triggerTypeToast('info')}
            className="p-4 rounded-2xl border border-sky-500/30 bg-sky-500/5 hover:bg-sky-500/10 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-500 flex items-center justify-center shrink-0 border border-sky-500/20 group-hover:scale-105 transition-transform">
              <Info size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
                Information Toast
              </p>
              <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">
                Staff handoffs, telemetry broadcast, general facility notices.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={triggerPromiseToast}
            className="p-4 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-105 transition-transform">
              <Loader2 size={18} className="animate-spin" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary">
                Async Promise Toast
              </p>
              <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">
                Loading spinner that auto-updates on promise resolution.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => triggerTypeToast('default')}
            className="p-4 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/60 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-zinc-200 flex items-center justify-center shrink-0 border border-slate-300 dark:border-zinc-600 group-hover:scale-105 transition-transform">
              <Bell size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">
                Neutral / Default Toast
              </p>
              <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5">
                System telemetry, background job updates, default toasts.
              </p>
            </div>
          </button>
        </div>
      </Card>

      {/* Section 2: Viewport Placement & Positions */}
      <Card className="p-6">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-black/5 dark:border-white/5">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
            <Compass size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Toaster Viewport Placement
            </h2>
            <p className="text-xs text-slate-500 dark:text-white/60">
              Select where toasts appear on your screen. Framer Motion animates stacking smoothly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {positions.map((pos) => {
            const isSelected = position === pos.id;
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => {
                  setPosition(pos.id);
                  toast.info(`Toaster position switched to ${pos.label}.`, {
                    title: 'Position Updated',
                    position: pos.id,
                  });
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                    : 'border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/40 hover:border-slate-300 dark:hover:border-zinc-600 text-slate-700 dark:text-white'
                }`}
              >
                <span className="text-xs font-bold">{pos.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-white/60'
                  }`}
                >
                  {isSelected ? 'Active' : 'Select'}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Section 3: Actionable Toasts & Duration Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Action Toast */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-black/5 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <RotateCcw size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Actionable & Undoable Toasts
                </h3>
                <p className="text-xs text-slate-500 dark:text-white/60">
                  Embed custom action buttons inside toast alerts.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed mb-4">
              Action buttons allow users to immediately revert destructive actions, open
              electronic records, or navigate to affected patients directly from the alert.
            </p>

            {lastActionStatus && (
              <div className="p-3 mb-4 rounded-xl bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                {lastActionStatus}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={triggerActionToast}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Send size={14} />
            <span>Archive Patient & Trigger Undo Toast</span>
          </button>
        </Card>

        {/* Duration & Persistence Presets */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-black/5 dark:border-white/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Timer & Duration Controls
                </h3>
                <p className="text-xs text-slate-500 dark:text-white/60">
                  Custom auto-dismiss durations and persistent sticky alerts.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed mb-4">
              Hovering over any toast with your cursor automatically pauses the timer countdown bar
              so critical clinical messages can be read without rushing.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => triggerDurationToast(2000, 'Fast (2s)')}
              className="py-2 px-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-center cursor-pointer"
            >
              2 Seconds
            </button>
            <button
              type="button"
              onClick={() => triggerDurationToast(8000, 'Long (8s)')}
              className="py-2 px-3 rounded-xl border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-center cursor-pointer"
            >
              8 Seconds
            </button>
            <button
              type="button"
              onClick={() => triggerDurationToast(Infinity, 'Sticky')}
              className="py-2 px-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors text-center cursor-pointer"
            >
              Sticky Alert
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ToasterUi;
