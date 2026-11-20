import React, { useState } from 'react';
import Card from '../ui/Card';
import Progress from '../ui/progressbars';
import Breadcrumb from '../ui/breadcrumbs';
import { FiHome, FiCpu, FiHardDrive, FiActivity, FiCheckCircle } from 'react-icons/fi';

const COLORS = [
  { key: 'primary', label: 'Primary', val: 75 },
  { key: 'secondary', label: 'Secondary', val: 50 },
  { key: 'success', label: 'Success', val: 90 },
  { key: 'danger', label: 'Danger', val: 35 },
  { key: 'warning', label: 'Warning', val: 65 },
  { key: 'info', label: 'Info', val: 80 },
  { key: 'purple', label: 'Purple', val: 45 },
  { key: 'pink', label: 'Pink', val: 60 },
  { key: 'teal', label: 'Teal', val: 85 },
  { key: 'indigo', label: 'Indigo', val: 70 },
];

const ProgressbarsUi = () => {
  const [bufferVal] = useState(48);
  const [bufferTrack] = useState(78);

  return (
    <div className="px-5 py-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Progress Bar Components
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Visual status indicators for task completion, storage metrics, and asynchronous operations
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UI Elements' },
            { label: 'Progress Bars' },
          ]}
        />
      </div>

      {/* Grid Row 1: Solid Color Palette & Visual Variants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solid Color Palette */}
        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Color Palette (Solid)</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Available semantic color tokens with auto-contrasting dark tracks
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COLORS.map((item) => (
              <div key={item.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{item.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">{item.val}%</span>
                </div>
                <Progress value={item.val} color={item.key} size="sm" rounded="pill" />
              </div>
            ))}
          </div>
        </Card>

        {/* Visual Variants */}
        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Visual Style Variants</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Soft tint, animated candy stripes, gradient flows, and pill borders
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span>Soft Translucent</span>
                <span className="text-indigo-600 dark:text-indigo-400">65%</span>
              </div>
              <Progress value={65} color="indigo" variant="soft" size="md" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span>Animated Striped</span>
                <span className="text-teal-600 dark:text-teal-400">55%</span>
              </div>
              <Progress value={55} color="teal" variant="striped" size="md" rounded="pill" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span>Linear Gradient</span>
                <span className="text-purple-600 dark:text-purple-400">82%</span>
              </div>
              <Progress value={82} color="purple" variant="gradient" size="md" rounded="pill" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <span>Inside Value Label</span>
                <span className="text-emerald-600 dark:text-emerald-400">70%</span>
              </div>
              <Progress value={70} color="success" size="lg" rounded="pill" showLabel labelPosition="inside" />
            </div>
          </div>
        </Card>
      </div>

      {/* Grid Row 2: Radial Circular & Sizing Scale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radial Circular Progress Gauges */}
        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Radial Circular Gauges</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Smooth SVG radial arcs with centered values and indeterminate rotation
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-around gap-6 py-2">
            <div className="flex flex-col items-center gap-2">
              <Progress type="circular" value={35} color="primary" size="sm" showLabel />
              <span className="text-xs text-gray-500 dark:text-gray-400">Small (35%)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Progress type="circular" value={68} color="indigo" size="md" showLabel />
              <span className="text-xs text-gray-500 dark:text-gray-400">Medium (68%)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Progress type="circular" value={92} color="success" size="lg" showLabel />
              <span className="text-xs text-gray-500 dark:text-gray-400">Large (92%)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Progress type="circular" color="purple" size="md" indeterminate />
              <span className="text-xs text-gray-500 dark:text-gray-400">Indeterminate</span>
            </div>
          </div>
        </Card>

        {/* Track Sizing Scale */}
        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Track Height Scale</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Available height tokens from micro (xs) to dense display bars (xl)
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Extra Small (h-1.5 / 6px)</span>
                <span>25%</span>
              </div>
              <Progress value={25} size="xs" color="info" rounded="pill" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Small (h-2 / 8px)</span>
                <span>45%</span>
              </div>
              <Progress value={45} size="sm" color="info" rounded="pill" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Medium (h-3 / 12px)</span>
                <span>65%</span>
              </div>
              <Progress value={65} size="md" color="info" rounded="pill" />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Large (h-4 / 16px)</span>
                <span>85%</span>
              </div>
              <Progress value={85} size="lg" color="info" rounded="pill" />
            </div>
          </div>
        </Card>
      </div>

      {/* Grid Row 3: Multi-Segment Storage & Milestone Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked Multi-Segment Progress */}
        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Multi-Segment & Storage Breakdown</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Proportional stacked distribution bars for disk, memory, or budget allocation
            </p>
          </div>
          <div className="space-y-5">
            {/* Storage Drive Example */}
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiHardDrive className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">NVMe Storage Allocation</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">382 GB / 512 GB</span>
              </div>

              <Progress
                size="md"
                rounded="pill"
                segments={[
                  { value: 160, color: 'primary', label: 'System Files' },
                  { value: 92, color: 'info', label: 'Documents & Databases' },
                  { value: 80, color: 'purple', label: 'Media & Backups' },
                  { value: 50, color: 'warning', label: 'Cache & Logs' },
                ]}
              />

              {/* Segment Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-gray-600 dark:text-gray-400">System (160GB)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="text-gray-600 dark:text-gray-400">Docs (92GB)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-gray-600 dark:text-gray-400">Media (80GB)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-gray-600 dark:text-gray-400">Cache (50GB)</span>
                </div>
              </div>
            </div>

            {/* Project Priority Distribution */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span className="font-medium">Incident Severity Distribution</span>
                <span>40 Total</span>
              </div>
              <Progress
                size="sm"
                rounded="pill"
                segments={[
                  { value: 5, color: 'danger' },
                  { value: 12, color: 'warning' },
                  { value: 23, color: 'success' },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Milestone Steps & Asynchronous Buffering */}
        <Card>
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Milestone Steps & Buffering</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Discrete step sequences and dual-track streaming buffer indicators
            </p>
          </div>
          <div className="space-y-5">
            {/* 4-Step KYC Flow */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">Identity Verification Flow</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Step 3 of 4</span>
              </div>
              <Progress steps={4} currentStep={3} color="success" size="sm" rounded="pill" />
            </div>

            {/* 5-Step Order Fulfillment */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">Order Dispatch Pipeline</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Step 2 of 5</span>
              </div>
              <Progress steps={5} currentStep={2} color="indigo" size="sm" rounded="pill" />
            </div>

            {/* Media Stream Buffer */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">Video Preload & Buffer Track</span>
                <span className="text-gray-500 dark:text-gray-400 font-mono">48% / 78%</span>
              </div>
              <Progress value={bufferVal} buffer={bufferTrack} color="primary" size="md" rounded="pill" />
            </div>

            {/* Indeterminate Activity Slide */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">Database Sync in Progress</span>
                <span className="text-amber-500 font-medium animate-pulse">Syncing...</span>
              </div>
              <Progress indeterminate color="warning" size="sm" rounded="pill" />
            </div>
          </div>
        </Card>
      </div>

      {/* Grid Row 4: Real-world Level & Operational Metric Card */}
      <Card>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Live System Metrics & Level Badges</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real-world contextual examples for tier progression and system telemetry
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CPU Metric */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCpu className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">CPU Cluster Load</span>
              </div>
              <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">42%</span>
            </div>
            <Progress value={42} color="info" size="sm" rounded="pill" />
            <p className="text-xs text-gray-500 dark:text-gray-400">16 Cores active · Nominal temp 48°C</p>
          </div>

          {/* Memory Metric */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiActivity className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">RAM Utilization</span>
              </div>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">88%</span>
            </div>
            <Progress value={88} color="danger" size="sm" rounded="pill" />
            <p className="text-xs text-gray-500 dark:text-gray-400">28.1 GB of 32 GB utilized · High</p>
          </div>

          {/* Level / Tier Progression */}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">Membership Tier</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Level 4</span>
            </div>
            <Progress value={68} color="success" size="sm" rounded="pill" />
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Lv. 4 Silver</span>
              <span>1,200 pts to Lv. 5 Gold</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressbarsUi;
