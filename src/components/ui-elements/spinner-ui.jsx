import React, { useState } from 'react';
import Card from '../ui/Card';
import Spinner from '../ui/spinner';
import Breadcrumb from '../ui/breadcrumbs';
import Button from '../ui/buttons';
import { FiHome, FiRefreshCw, FiServer, FiActivity } from 'react-icons/fi';

const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'purple', 'pink', 'teal', 'indigo'];

const ALL_TYPES = [
  { type: 'ring', label: 'Ring', color: 'primary' },
  { type: 'dual-ring', label: 'Dual Ring', color: 'indigo' },
  { type: 'dots', label: 'Dots', color: 'emerald' },
  { type: 'bars', label: 'Bars', color: 'amber' },
  { type: 'pulse', label: 'Pulse', color: 'rose' },
  { type: 'ripple', label: 'Ripple', color: 'cyan' },
  { type: 'wave', label: 'Wave', color: 'purple' },
  { type: 'bounce', label: 'Bounce', color: 'pink' },
  { type: 'grid', label: 'Grid', color: 'teal' },
  { type: 'orbit', label: 'Orbit', color: 'primary' },
  { type: 'comet', label: 'Comet', color: 'indigo' },
  { type: 'hourglass', label: 'Hourglass', color: 'amber' },
  { type: 'infinity', label: 'Infinity', color: 'cyan' },
  { type: 'circle-dots', label: 'Circle Dots', color: 'purple' },
  { type: 'arc', label: 'Arc', color: 'rose' },
  { type: 'radar', label: 'Radar', color: 'emerald' },
  { type: 'helix', label: 'Helix', color: 'teal' },
  { type: 'aurora', label: 'Aurora', color: 'indigo' },
  { type: 'hologram', label: 'Hologram', color: 'primary' },
  { type: 'neural', label: 'Neural', color: 'rose' },
  { type: 'stock', label: 'Stock', color: 'emerald' },
  { type: 'pulseBars', label: 'Pulse Bars', color: 'warning' },
  { type: 'modernStock', label: 'Modern Stock', color: 'cyan' },
  { type: 'matrix', label: 'Matrix', color: 'purple' },
];

const SIZES = [
  { size: 'xs', px: '14px', label: 'Extra Small' },
  { size: 'sm', px: '18px', label: 'Small' },
  { size: 'md', px: '22px', label: 'Medium' },
  { size: 'lg', px: '28px', label: 'Large' },
  { size: 'xl', px: '36px', label: 'Extra Large' },
];

const SpinnerUi = () => {
  const [selectedType, setSelectedType] = useState('dual-ring');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedSpeed, setSelectedSpeed] = useState(1);

  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Spinner Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Loading indicators, status animations, and asynchronous activity spinners
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Spinner' },
          ]}
        />
      </div>

      {/* 01: All Animation Types Gallery */}
      <div className="mb-6">
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Animation Styles Gallery
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                24 distinct animated loaders with vector geometry and fluid keyframes
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
              24 Animations
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {ALL_TYPES.map(({ type, label, color }) => (
              <div
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === type
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-xs ring-2 ring-primary/20'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50/50 dark:bg-gray-900/40 hover:bg-slate-100/60 dark:hover:bg-gray-800/40'
                }`}
              >
                <div className="h-12 flex items-center justify-center">
                  <Spinner type={type} color={color} size="md" />
                </div>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-2 text-center">
                  {label}
                </span>
                <span className="text-xs text-gray-400 font-mono mt-0.5">
                  type="{type}"
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 02: Interactive Live Preview Playground */}
      <div className="mb-6">
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Interactive Customizer
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Preview any spinner type with real-time color and animation speed adjustments
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 items-center">
            {/* Live Preview Box */}
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-100/70 dark:bg-gray-900/80 border border-slate-200 dark:border-white/10 min-h-48">
              <Spinner type={selectedType} color={selectedColor} size="xl" speed={selectedSpeed} />
              <div className="mt-4 text-center">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-slate-200 dark:border-white/10 font-mono">
                  {selectedType} · {selectedColor} · {selectedSpeed}x
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Select Theme Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all capitalize ${
                        selectedColor === c
                          ? 'bg-primary text-white shadow-xs ring-2 ring-primary/30'
                          : 'bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Animation Speed Multiplier
                  </label>
                  <span className="text-xs font-mono font-semibold text-primary">
                    {selectedSpeed}x
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {[0.5, 1, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setSelectedSpeed(spd)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-mono font-medium transition-colors ${
                        selectedSpeed === spd
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-gray-900'
                          : 'bg-slate-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 03: Sizing Scale */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Component Sizing Scale
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            5 standardized dimensions from inline text badges to large modal overlays
          </p>
          <div className="flex flex-wrap items-end gap-6 mt-5 p-4 rounded-2xl bg-slate-50/50 dark:bg-gray-900/30 border border-slate-200 dark:border-white/10">
            {SIZES.map(({ size, px, label }) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Spinner type="ring" size={size} color="info" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase">
                  {size}
                </span>
                <span className="text-xs text-gray-400 font-mono">{px}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 04: Contextual Text Labels */}
        <Card>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Spinners with Text Labels
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Paired indicators for user feedback during asynchronous loading
          </p>
          <div className="flex flex-col gap-3.5 mt-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <Spinner type="ring" color="primary" showLabel label="Loading clinical records..." />
              <span className="text-xs text-gray-400">EHR Sync</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <Spinner type="dual-ring" color="emerald" showLabel label="Verifying physician credentials..." />
              <span className="text-xs text-gray-400">Auth Gate</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <Spinner type="dots" color="teal" showLabel label="Calculating lab panel biomarkers..." />
              <span className="text-xs text-gray-400">Telemetry</span>
            </div>
          </div>
        </Card>

        {/* 05: Color Accents */}
        <Card className="md:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Design System Color Accents
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Consistent palette harmony matching Buttons, Badges, and Alert states
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 mt-4">
            {COLORS.map((c) => (
              <div
                key={c}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50/50 dark:bg-gray-900/30 border border-slate-200 dark:border-white/10"
              >
                <Spinner type="ring" color={c} size="md" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpinnerUi;
