import React from 'react';

// Color tokens aligned with design system & Button palette
const colorTokens = {
  primary: {
    track: 'bg-primary/15',
    bar: 'bg-primary',
    text: 'text-primary',
    stroke: 'text-primary',
  },
  secondary: {
    track: 'bg-slate-200 dark:bg-slate-800',
    bar: 'bg-slate-600 dark:bg-slate-400',
    text: 'text-slate-600 dark:text-slate-400',
    stroke: 'text-slate-600 dark:text-slate-400',
  },
  success: {
    track: 'bg-emerald-100 dark:bg-emerald-950/40',
    bar: 'bg-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    stroke: 'text-emerald-500',
  },
  danger: {
    track: 'bg-rose-100 dark:bg-rose-950/40',
    bar: 'bg-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    stroke: 'text-rose-500',
  },
  warning: {
    track: 'bg-amber-100 dark:bg-amber-950/40',
    bar: 'bg-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    stroke: 'text-amber-500',
  },
  info: {
    track: 'bg-cyan-100 dark:bg-cyan-950/40',
    bar: 'bg-cyan-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    stroke: 'text-cyan-500',
  },
  purple: {
    track: 'bg-purple-100 dark:bg-purple-950/40',
    bar: 'bg-purple-500',
    text: 'text-purple-600 dark:text-purple-400',
    stroke: 'text-purple-500',
  },
  pink: {
    track: 'bg-pink-100 dark:bg-pink-950/40',
    bar: 'bg-pink-500',
    text: 'text-pink-600 dark:text-pink-400',
    stroke: 'text-pink-500',
  },
  teal: {
    track: 'bg-teal-100 dark:bg-teal-950/40',
    bar: 'bg-teal-500',
    text: 'text-teal-600 dark:text-teal-400',
    stroke: 'text-teal-500',
  },
  indigo: {
    track: 'bg-indigo-100 dark:bg-indigo-950/40',
    bar: 'bg-indigo-500',
    text: 'text-indigo-600 dark:text-indigo-400',
    stroke: 'text-indigo-500',
  },
};

const gradientMap = {
  primary: 'from-primary to-primary-600',
  secondary: 'from-slate-500 to-slate-700',
  success: 'from-emerald-400 to-emerald-600',
  danger: 'from-rose-400 to-rose-600',
  warning: 'from-amber-400 to-orange-500',
  info: 'from-cyan-400 to-blue-600',
  purple: 'from-purple-400 to-indigo-600',
  pink: 'from-pink-400 to-rose-500',
  teal: 'from-teal-400 to-emerald-600',
  indigo: 'from-indigo-400 to-violet-600',
};

const sizeMap = {
  xs: { h: 'h-1.5', radius: 14, stroke: 3, font: 'text-xs', px: 36 },
  sm: { h: 'h-2', radius: 20, stroke: 4, font: 'text-xs', px: 48 },
  md: { h: 'h-3', radius: 28, stroke: 5, font: 'text-sm', px: 66 },
  lg: { h: 'h-4', radius: 36, stroke: 6, font: 'text-base', px: 84 },
  xl: { h: 'h-5', radius: 46, stroke: 8, font: 'text-lg', px: 108 },
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const Progress = ({
  value = 40,
  max = 100,
  color = 'indigo',
  variant = 'solid', // 'solid' | 'soft' | 'striped' | 'gradient'
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rounded = 'default', // 'default' | 'pill'
  showLabel = false,
  indeterminate = false,
  buffer = undefined, // number 0-100 for secondary track
  type = 'linear', // 'linear' | 'circular'
  className = '',
  label = undefined, // custom label string
  labelPosition = 'outside', // 'outside' | 'inside'
  animateStripes = true,
  segments, // [{ value: number, color: string, label?: string }]
  steps, // number of equal steps
  currentStep, // current completed step (1..steps)
}) => {
  const tok = colorTokens[color] || colorTokens.indigo;
  const sz = sizeMap[size] || sizeMap.md;
  const pct = clamp((value / max) * 100, 0, 100);
  const pctBuf = buffer !== undefined ? clamp((buffer / max) * 100, 0, 100) : undefined;
  const radiusCls = rounded === 'pill' ? 'rounded-full' : 'rounded-md';

  // Circular Progress
  if (type === 'circular') {
    const radius = sz.radius;
    const stroke = sz.stroke;
    const sizePx = sz.px;
    const circumference = 2 * Math.PI * radius;
    const dash = indeterminate ? circumference * 0.35 : (pct / 100) * circumference;
    const gap = circumference - dash;

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: sizePx, height: sizePx }}>
        <svg
          width={sizePx}
          height={sizePx}
          viewBox={`0 0 ${sizePx} ${sizePx}`}
          className={`block transform -rotate-90 ${indeterminate ? 'animate-spin' : ''}`}
        >
          {/* Track Circle */}
          <circle
            cx={sizePx / 2}
            cy={sizePx / 2}
            r={radius}
            className={`stroke-current ${tok.track.replace('bg-', 'text-')}`}
            fill="transparent"
            strokeWidth={stroke}
          />
          {/* Animated Progress Circle */}
          <circle
            cx={sizePx / 2}
            cy={sizePx / 2}
            r={radius}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            className={`stroke-current transition-all duration-500 ease-out ${tok.stroke}`}
            strokeDasharray={`${dash} ${gap}`}
          />
        </svg>
        {showLabel && !indeterminate && (
          <span className={`absolute inset-0 flex items-center justify-center font-semibold text-gray-900 dark:text-white ${sz.font}`}>
            {label ?? `${Math.round(pct)}%`}
          </span>
        )}
      </div>
    );
  }

  // Multi-Segment Stacked Progress
  if (Array.isArray(segments) && segments.length > 0) {
    const sum = segments.reduce((s, seg) => s + (seg.value || 0), 0) || 1;
    return (
      <div className={`w-full ${className}`}>
        <div className={`relative w-full ${sz.h} ${radiusCls} bg-gray-100 dark:bg-gray-800/80 overflow-hidden flex`}>
          {segments.map((seg, i) => {
            const segTok = colorTokens[seg.color] || tok;
            const w = Math.max(0, Math.min(100, (seg.value / sum) * 100));
            return (
              <div
                key={i}
                className={`h-full transition-all duration-500 ${segTok.bar}`}
                style={{ width: `${w}%` }}
                title={seg.label ? `${seg.label}: ${seg.value}` : undefined}
              />
            );
          })}
        </div>
        {showLabel && (
          <div className="mt-1.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{label ?? `${Math.round(pct)}%`}</span>
          </div>
        )}
      </div>
    );
  }

  // Steps Progress Bar
  if (typeof steps === 'number' && steps > 0) {
    const current = clamp(currentStep || 0, 0, steps);
    return (
      <div className={`w-full ${className}`}>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps}, minmax(0, 1fr))` }}>
          {Array.from({ length: steps }).map((_, i) => {
            const filled = i < current;
            return (
              <div
                key={i}
                className={`${sz.h} ${radiusCls} transition-all duration-300 ${
                  filled ? tok.bar : tok.track
                }`}
              />
            );
          })}
        </div>
        {showLabel && (
          <div className="mt-1.5 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
            <span>{label ?? `Step ${current} of ${steps}`}</span>
            <span>{Math.round((current / steps) * 100)}%</span>
          </div>
        )}
      </div>
    );
  }

  // Determine Bar Styling Variant
  let barCls = tok.bar;
  if (variant === 'soft') {
    barCls = `${tok.bar} opacity-75`;
  } else if (variant === 'striped') {
    barCls = `${tok.bar} ${animateStripes ? 'animate-progress-stripe' : ''}`;
  } else if (variant === 'gradient') {
    barCls = `bg-gradient-to-r ${gradientMap[color] || gradientMap.indigo}`;
  }

  return (
    <div className={`w-full ${className}`}>
      <style>{`
        @keyframes progress-indeterminate {
          0% { background-position: 0% 0; }
          100% { background-position: 2rem 0; }
        }
        @keyframes bar-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
        .animate-progress-stripe {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.22) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.22) 50%,
            rgba(255, 255, 255, 0.22) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
          animation: progress-indeterminate 1.2s linear infinite;
        }
      `}</style>
      <div className={`relative w-full ${sz.h} ${radiusCls} ${tok.track} overflow-hidden`}>
        {/* Optional Buffer Bar */}
        {pctBuf !== undefined && (
          <div
            className={`absolute left-0 top-0 h-full ${radiusCls} ${tok.bar} opacity-35 transition-all duration-300`}
            style={{ width: `${pctBuf}%` }}
          />
        )}
        {/* Main Progress Indicator */}
        <div
          className={`h-full ${radiusCls} ${barCls} transition-all duration-300 ease-out`}
          style={
            indeterminate
              ? { width: '35%', animation: 'bar-slide 1.5s ease-in-out infinite' }
              : { width: `${pct}%` }
          }
        />
        {/* Inside Centered Label */}
        {showLabel && labelPosition === 'inside' && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-xs">
            {label ?? `${Math.round(pct)}%`}
          </div>
        )}
      </div>
      {/* Outside Label */}
      {showLabel && labelPosition !== 'inside' && (
        <div className={`mt-1.5 flex items-center justify-between text-xs font-medium ${tok.text}`}>
          <span>{label ?? `${Math.round(pct)}%`}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
    </div>
  );
};

export default Progress;
