import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/ui/Card';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import vitalsData from '../mokdata/vitals.json';
import {
  FiHome,
  FiActivity,
  FiClock,
  FiHeart,
  FiShield,
  FiAlertTriangle,
  FiVolume2,
  FiVolumeX,
  FiSliders,
  FiCheckCircle,
  FiTrendingUp,
} from 'react-icons/fi';

const { bedsTelemetry: initialBedsTelemetry } = vitalsData;

const VitalsPage = () => {
  const [bedsList, setBedsList] = useState(initialBedsTelemetry);
  const [alarmSilenced, setAlarmSilenced] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('ICU');
  const [acknowledgedAlert, setAcknowledgedAlert] = useState(false);
  const [showThresholdsModal, setShowThresholdsModal] = useState(false);
  const [ecgTick, setEcgTick] = useState(0);

  // Thresholds state
  const [thresholds, setThresholds] = useState({
    hrHigh: 120,
    hrLow: 50,
    bpSystolicHigh: 160,
    bpSystolicLow: 90,
    spo2Floor: 92,
    rrHigh: 28,
  });

  // Animated ECG wave simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setEcgTick((prev) => (prev + 1) % 100);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAlarmAudio = () => {
    const nextState = !alarmSilenced;
    setAlarmSilenced(nextState);
    if (nextState) {
      toast.warning('Audible telemetry bed alarms temporarily muted for 3 minutes.', {
        title: 'Audible Alarms Muted',
      });
    } else {
      toast.info('Audible telemetry bed alarms restored to full alert volume.', {
        title: 'Audible Alarms Active',
      });
    }
  };

  const handleAcknowledgeAlert = () => {
    setAcknowledgedAlert(true);
    setBedsList((prev) =>
      prev.map((bed) =>
        bed.bed === 'ICU-Bed 02'
          ? { ...bed, alarm: false, status: 'Response Dispatched' }
          : bed
      )
    );
    toast.success('Bed ICU-02 critical event acknowledged. Medical Response Team dispatched to bedside.', {
      title: 'Alert Acknowledged & Dispatched',
    });
  };

  const handleSaveThresholds = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShowThresholdsModal(false);
    toast.success('Bedside telemetry alarm thresholds calibrated across monitoring network.', {
      title: 'Alarm Thresholds Updated',
    });
  };

  const filteredBeds = useMemo(() => {
    return bedsList;
  }, [bedsList]);

  const activeAlarmsCount = useMemo(() => {
    return bedsList.filter((b) => b.alarm).length;
  }, [bedsList]);

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
              Vitals &amp; Telemetry Surveillance
            </h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{bedsList.length} Monitors Active</span>
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Continuous bedside biometric telemetry, waveform telemetry streams, and critical event monitoring
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={handleToggleAlarmAudio}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
              alarmSilenced
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-white dark:bg-gray-900 text-slate-700 dark:text-white border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800'
            }`}
          >
            {alarmSilenced ? <FiVolumeX className="w-3.5 h-3.5 shrink-0" /> : <FiVolume2 className="w-3.5 h-3.5 shrink-0" />}
            <span>{alarmSilenced ? 'Alarms Muted (3m)' : 'Audio Alarms On'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowThresholdsModal(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer whitespace-nowrap"
          >
            <FiSliders className="w-3.5 h-3.5 shrink-0" />
            <span>Alarm Thresholds</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Vitals & Telemetry' },
          ]}
        />
      </div>

      {/* Critical Alert Warning Strip */}
      {!acknowledgedAlert && activeAlarmsCount > 0 && (
        <Card className="p-3.5 sm:p-4 bg-red-500/10 border border-red-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/30 mt-0.5 sm:mt-0">
                <FiAlertTriangle className="w-4 h-4 animate-bounce" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-red-700 dark:text-red-400 block truncate">
                  Bed ICU-02: Acute Tachycardia &amp; SpO2 Desaturation Threshold Breached
                </span>
                <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5 line-clamp-2">
                  Patient Marcus Vance (P-10492) · HR reached 112 bpm (threshold 100) · SpO2 dropped to 91% (threshold 92%).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAcknowledgeAlert}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-sm hover:bg-red-700 transition-all cursor-pointer shrink-0 text-center whitespace-nowrap"
            >
              Acknowledge &amp; Dispatch
            </button>
          </div>
        </Card>
      )}

      {/* Unit Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
        {['ICU (Critical Care)', 'Cardiac Care Unit (CCU)', 'Emergency Trauma', 'Post-Op Recovery'].map(
          (unit, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedUnit(unit)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedUnit.startsWith(unit.slice(0, 3))
                  ? 'bg-primary text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-gray-900 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-gray-800 hover:bg-slate-100 dark:hover:bg-gray-800'
              }`}
            >
              {unit}
            </button>
          )
        )}
      </div>

      {/* 6 Bedside Telemetry Monitors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {filteredBeds.map((bed, idx) => (
          <Card
            key={idx}
            className={`p-3.5 sm:p-5 transition-all flex flex-col justify-between ${
              bed.alarm
                ? 'border-red-500/60 shadow-lg shadow-red-500/10 ring-2 ring-red-500/20'
                : 'hover:border-primary/40'
            }`}
          >
            <div>
              {/* Monitor Header */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-black/5 dark:border-white/5 gap-2">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                    {bed.bed}
                  </span>
                  <span className="text-xs text-slate-400 truncate block">
                    {bed.patient} ({bed.age}y)
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider shrink-0 ${
                    bed.alarm
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {bed.status}
                </span>
              </div>

              {/* Animated ECG Canvas Simulator */}
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 mb-3 text-emerald-400 font-mono text-xs flex items-center justify-between gap-2 overflow-hidden relative">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs text-slate-400 truncate">{bed.rhythm}</span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0">{bed.hr} BPM</span>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-3 gap-2 text-center mb-2.5 sm:mb-3">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 min-w-0">
                  <span className="text-xs text-slate-400 font-semibold block truncate">HEART</span>
                  <span
                    className={`text-base sm:text-lg font-bold truncate block ${
                      bed.hrStatus === 'high' ? 'text-red-500' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {bed.hr}
                  </span>
                  <span className="text-xs text-slate-400 block truncate">bpm</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 min-w-0">
                  <span className="text-xs text-slate-400 font-semibold block truncate">BP</span>
                  <span
                    className={`text-base sm:text-lg font-bold truncate block ${
                      bed.bpStatus === 'high' ? 'text-amber-500' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {bed.bp}
                  </span>
                  <span className="text-xs text-slate-400 block truncate">mmHg</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 min-w-0">
                  <span className="text-xs text-slate-400 font-semibold block truncate">SpO2</span>
                  <span
                    className={`text-base sm:text-lg font-bold truncate block ${
                      bed.spo2Status === 'warning' ? 'text-red-500' : 'text-cyan-500'
                    }`}
                  >
                    {bed.spo2}%
                  </span>
                  <span className="text-xs text-slate-400 block truncate">O2 Sat</span>
                </div>
              </div>
            </div>

            {/* Footer condition info */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-white/50 pt-2 border-t border-black/5 dark:border-white/5 gap-2">
              <span className="truncate">Diagnosis: {bed.condition}</span>
              <span className="font-mono text-slate-400 shrink-0">RR: {bed.rr}/m</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Alarm Thresholds Configuration Modal */}
      <Modal
        open={showThresholdsModal}
        onClose={() => setShowThresholdsModal(false)}
        title="Telemetry Biometric Alarm Thresholds"
        description="Set upper and lower physiological thresholds for critical bedside telemetry alert triggers."
        size="md"
        color="primary"
        primaryAction={{
          label: 'Save Thresholds',
          onClick: handleSaveThresholds,
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setShowThresholdsModal(false),
        }}
      >
        <form onSubmit={handleSaveThresholds} className="space-y-3 text-xs pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Heart Rate High Limit (bpm)
              </label>
              <input
                type="number"
                value={thresholds.hrHigh}
                onChange={(e) => setThresholds((prev) => ({ ...prev, hrHigh: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Heart Rate Low Limit (bpm)
              </label>
              <input
                type="number"
                value={thresholds.hrLow}
                onChange={(e) => setThresholds((prev) => ({ ...prev, hrLow: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Systolic BP Upper (mmHg)
              </label>
              <input
                type="number"
                value={thresholds.bpSystolicHigh}
                onChange={(e) => setThresholds((prev) => ({ ...prev, bpSystolicHigh: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Systolic BP Lower (mmHg)
              </label>
              <input
                type="number"
                value={thresholds.bpSystolicLow}
                onChange={(e) => setThresholds((prev) => ({ ...prev, bpSystolicLow: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pulse Oximetry SpO2 Floor (%)
              </label>
              <input
                type="number"
                value={thresholds.spo2Floor}
                onChange={(e) => setThresholds((prev) => ({ ...prev, spo2Floor: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-1">
                Respiratory Rate High (/min)
              </label>
              <input
                type="number"
                value={thresholds.rrHigh}
                onChange={(e) => setThresholds((prev) => ({ ...prev, rrHigh: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VitalsPage;
