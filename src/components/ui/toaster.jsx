import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  X,
  Loader2,
  Bell,
} from 'lucide-react';
import { useToast } from '../../context/toast-context';
import { useTheme } from '../../context/theme-context';

const TOAST_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
  default: Bell,
};

const TOAST_STYLES = {
  success: {
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    iconBg: 'bg-emerald-500/15 border-emerald-500/30 dark:bg-emerald-500/20 dark:border-emerald-500/50',
    cardBorder: 'border-emerald-500/40 dark:border-emerald-500/60',
    indicatorBg: 'bg-emerald-500 dark:bg-emerald-400',
    progressBg: 'bg-emerald-500 dark:bg-emerald-400',
    defaultTitle: 'Success',
  },
  error: {
    iconColor: 'text-rose-500 dark:text-rose-400',
    iconBg: 'bg-rose-500/15 border-rose-500/30 dark:bg-rose-500/20 dark:border-rose-500/50',
    cardBorder: 'border-rose-500/40 dark:border-rose-500/60',
    indicatorBg: 'bg-rose-500 dark:bg-rose-400',
    progressBg: 'bg-rose-500 dark:bg-rose-400',
    defaultTitle: 'Error Alert',
  },
  warning: {
    iconColor: 'text-amber-500 dark:text-amber-400',
    iconBg: 'bg-amber-500/15 border-amber-500/30 dark:bg-amber-500/20 dark:border-amber-500/50',
    cardBorder: 'border-amber-500/40 dark:border-amber-500/60',
    indicatorBg: 'bg-amber-500 dark:bg-amber-400',
    progressBg: 'bg-amber-500 dark:bg-amber-400',
    defaultTitle: 'Warning',
  },
  info: {
    iconColor: 'text-sky-500 dark:text-sky-400',
    iconBg: 'bg-sky-500/15 border-sky-500/30 dark:bg-sky-500/20 dark:border-sky-500/50',
    cardBorder: 'border-sky-500/40 dark:border-sky-500/60',
    indicatorBg: 'bg-sky-500 dark:bg-sky-400',
    progressBg: 'bg-sky-500 dark:bg-sky-400',
    defaultTitle: 'Information',
  },
  loading: {
    iconColor: 'text-primary dark:text-primary-400',
    iconBg: 'bg-primary/15 border-primary/30 dark:bg-primary/20 dark:border-primary/50',
    cardBorder: 'border-primary/40 dark:border-primary/60',
    indicatorBg: 'bg-primary dark:bg-primary-400',
    progressBg: 'bg-primary dark:bg-primary-400',
    defaultTitle: 'Processing Request',
  },
  default: {
    iconColor: 'text-slate-500 dark:text-zinc-400',
    iconBg: 'bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700',
    cardBorder: 'border-slate-300 dark:border-zinc-700',
    indicatorBg: 'bg-slate-400 dark:bg-zinc-500',
    progressBg: 'bg-slate-400 dark:bg-zinc-500',
    defaultTitle: 'Notification',
  },
};

const POSITION_CLASSES = {
  'top-right': 'top-5 right-5 items-end',
  'top-center': 'top-5 left-1/2 -translate-x-1/2 items-center',
  'top-left': 'top-5 left-5 items-start',
  'bottom-right': 'bottom-5 right-5 items-end',
  'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-5 left-5 items-start',
};

const ToastItem = ({ toast, onDismiss, isTop }) => {
  const { id, type = 'default', title, message, duration = 4000, action, dismissible } = toast;
  const style = TOAST_STYLES[type] || TOAST_STYLES.default;
  const IconComponent = TOAST_ICONS[type] || TOAST_ICONS.default;

  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const remainingTimeRef = useRef(duration);
  const lastTickRef = useRef(0);

  const isFinite = duration > 0 && duration !== Infinity;

  useEffect(() => {
    if (!isFinite) return;

    lastTickRef.current = Date.now();
    const interval = setInterval(() => {
      if (!paused) {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;

        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - delta);
        const nextProgress = Math.max(0, (remainingTimeRef.current / duration) * 100);
        setProgress(nextProgress);

        if (remainingTimeRef.current <= 0) {
          clearInterval(interval);
          onDismiss(id);
        }
      } else {
        lastTickRef.current = Date.now();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [id, duration, isFinite, paused, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isTop ? -16 : 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        lastTickRef.current = Date.now();
        setPaused(false);
      }}
      className={`pointer-events-auto relative w-80 sm:w-96 max-w-full rounded-2xl border ${style.cardBorder} bg-white/95 dark:bg-zinc-900/95 shadow-xl shadow-slate-900/10 dark:shadow-2xl dark:shadow-black/80 backdrop-blur-md overflow-hidden text-slate-800 dark:text-white`}
    >
      {/* Left Colored Accent Status Strip */}
      <div className={`absolute top-0 bottom-0 start-0 w-1.5 ${style.indicatorBg}`} />

      <div className="p-3.5 sm:p-4 ps-4 sm:ps-4.5 flex items-start gap-3">
        {/* Status Icon */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${style.iconBg} ${style.iconColor}`}
        >
          <IconComponent
            size={18}
            className={type === 'loading' ? 'animate-spin' : ''}
          />
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white truncate">
            {title || style.defaultTitle}
          </h4>
          {message && (
            <p className="text-xs text-slate-600 dark:text-zinc-300 mt-0.5 leading-relaxed break-words">
              {message}
            </p>
          )}

          {/* Action Button */}
          {action && (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  action.onClick?.();
                  onDismiss(id);
                }}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-white transition-colors cursor-pointer"
              >
                {action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        {dismissible && (
          <button
            type="button"
            onClick={() => onDismiss(id)}
            aria-label="Dismiss toast"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Visual Duration Progress Bar */}
      {isFinite && (
        <div className="h-0.5 w-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
          <div
            className={`h-full ${style.progressBg} transition-all duration-75`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
};

export const Toaster = ({ position: propPosition }) => {
  const { toasts, dismissToast, position: contextPosition } = useToast();
  const { direction } = useTheme();

  const activePosition = propPosition || contextPosition || 'top-right';
  const isTop = activePosition.startsWith('top');
  const positionClass = POSITION_CLASSES[activePosition] || POSITION_CLASSES['top-right'];

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      dir={direction}
      aria-live="polite"
      className={`fixed z-50 pointer-events-none flex flex-col gap-2.5 max-w-full px-3 ${positionClass}`}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={dismissToast}
            isTop={isTop}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
