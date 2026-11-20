import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Badges from '../components/ui/badges';
import Breadcrumb from '../components/ui/breadcrumbs';
import Modal from '../components/ui/modals';
import { toast } from '../context/toast-context';
import {
  FiHome,
  FiSave,
  FiCheckCircle,
  FiSliders,
  FiShield,
  FiActivity,
  FiServer,
  FiClock,
  FiLock,
  FiRadio,
  FiDownload,
  FiFileText,
} from 'react-icons/fi';

const mockAuditLogs = [
  { id: 'LOG-8941', user: 'Dr. Sarah Mitchell', event: 'Emergency Resus Bay 01 EHR Record Access', time: '4 mins ago', status: 'Authorized', color: 'success' },
  { id: 'LOG-8940', user: 'Pharmacist Lin Chen', event: 'Schedule II Narcotic Vault Dual-Biometric Unlock', time: '18 mins ago', status: 'Dual Signed', color: 'primary' },
  { id: 'LOG-8939', user: 'Epic Systems Bridge', event: 'FHIR R4 Diagnostic Patient Encounter Dual-Sync', time: '35 mins ago', status: 'Sync Complete', color: 'info' },
  { id: 'LOG-8938', user: 'Nurse Arthur Pendelton', event: 'STAT Code Blue Alert Audio Protocol Triggered', time: '1 hr ago', status: 'Broadcasted', color: 'danger' },
  { id: 'LOG-8937', user: 'System Telemetry Daemon', event: 'Automated 256-Bit Encrypted Data Backup Created', time: '2 hrs ago', status: 'Encrypted', color: 'success' },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'fhir' | 'shifts' | 'security'
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Settings toggles state
  const [autoCodeBlue, setAutoCodeBlue] = useState(true);
  const [fhirLiveSync, setFhirLiveSync] = useState(true);
  const [biometricVault, setBiometricVault] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [overtimeAlerts, setOvertimeAlerts] = useState(true);

  // General profile inputs
  const [facilityName, setFacilityName] = useState('CarePulse Metropolitan Hospital Center');
  const [npiNumber, setNpiNumber] = useState('1942084920');
  const [traumaLevel, setTraumaLevel] = useState('Level 1 Trauma Center');
  const [campusAddress, setCampusAddress] = useState('742 Healthcare Boulevard, Metro District, NY 10021');
  const [emergencyPhone, setEmergencyPhone] = useState('+1 (555) 911-0000');

  // FHIR / HL7 inputs
  const [fhirEndpoint, setFhirEndpoint] = useState('https://fhir.carepulse.health/v4/R4');
  const [pacsHost, setPacsHost] = useState('pacs-dicom.hospital.internal:104');
  const [limsAdapter, setLimsAdapter] = useState('HL7 MLLP v2.5.1 Adapter');

  const handleSaveSettings = () => {
    toast.success('Hospital facility parameters and security policies saved successfully.', {
      title: 'Configuration Saved',
    });
  };

  const handleExportAudit = () => {
    toast.success('Cryptographic HIPAA compliance audit log archive downloaded.', {
      title: 'Audit Log Exported',
    });
  };

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
            Hospital Facility &amp; Network Settings
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Configure departmental shifts, HL7 / FHIR healthcare interoperability integrations, and security access policies
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setShowAuditModal(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FiActivity className="w-3.5 h-3.5 shrink-0" />
            <span>Audit Trail</span>
          </button>
          <button
            type="button"
            onClick={handleSaveSettings}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 cursor-pointer whitespace-nowrap"
          >
            <FiSave className="w-3.5 h-3.5 shrink-0" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Facility Settings' },
          ]}
        />
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Campus Designation</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">Level 1 Trauma</div>
            <span className="text-xs text-primary font-semibold truncate block">Verified State Accreditation</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <FiShield className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">FHIR Interoperability</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">HL7 R4 Online</div>
            <span className="text-xs text-cyan-500 font-semibold truncate block">12 External Systems Synced</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/20">
            <FiServer className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">Shift Scheduling</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">3 Active Rotations</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">Mandatory 1:4 Nurse Ratio</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiClock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-3.5 sm:p-4">
          <div className="min-w-0 pr-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate block">HIPAA Security Audit</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 truncate">100% Compliant</div>
            <span className="text-xs text-emerald-500 font-semibold truncate block">256-Bit Encrypted Vault</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <FiLock className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-800 pb-1 sm:pb-0 overflow-x-auto scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'general'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Facility Profile &amp; Campus
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fhir')}
          className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'fhir'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          HL7 &amp; FHIR Interoperability
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shifts')}
          className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'shifts'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Department Shifts &amp; Staffing Rules
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`pb-2.5 sm:pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'security'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          HIPAA Access &amp; Biometrics
        </button>
      </div>

      {/* Tab 1: Facility Profile & Campus */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              Hospital Campus Identity
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                  Official Facility Name
                </label>
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                    National Provider Identifier (NPI)
                  </label>
                  <input
                    type="text"
                    value={npiNumber}
                    onChange={(e) => setNpiNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                    Trauma Accreditation
                  </label>
                  <input
                    type="text"
                    value={traumaLevel}
                    onChange={(e) => setTraumaLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                  Campus Physical Address
                </label>
                <input
                  type="text"
                  value={campusAddress}
                  onChange={(e) => setCampusAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                  Emergency Command Direct Line
                </label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                />
              </div>
            </div>
          </Card>

          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              Emergency Operations Triggers
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Automated Code Blue Audio Override
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Broadcast critical resuscitation alerts across hospital PA systems instantly
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoCodeBlue(!autoCodeBlue)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    autoCodeBlue ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      autoCodeBlue ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Mass Casualty Triage Expansion
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Automatically convert ambulatory recovery suites to acute trauma overflow
                  </span>
                </div>
                <Badges color="success" variant="soft" size="sm" rounded="pill" className="shrink-0">
                  Standby Ready
                </Badges>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Air Ambulance Helipad Beacon
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Coordinates automated GPS telemetry beacons for medevac flight landings
                  </span>
                </div>
                <Badges color="info" variant="soft" size="sm" rounded="pill" className="shrink-0">
                  FAA Certified
                </Badges>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: HL7 & FHIR Interoperability */}
      {activeTab === 'fhir' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              FHIR Core Rest API Endpoints
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                  Base FHIR R4 Endpoint URL
                </label>
                <input
                  type="text"
                  value={fhirEndpoint}
                  onChange={(e) => setFhirEndpoint(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                  PACS DICOM Radiological Host Gateway
                </label>
                <input
                  type="text"
                  value={pacsHost}
                  onChange={(e) => setPacsHost(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-mono focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400 block mb-1 font-medium">
                  Laboratory LIMS Protocol Adapter
                </label>
                <input
                  type="text"
                  value={limsAdapter}
                  onChange={(e) => setLimsAdapter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          </Card>

          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              Active Interoperability Bridges
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Epic Systems EHR Integration Bridge
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Direct dual-sync of clinical notes, encounter orders, and diagnosis
                  </span>
                </div>
                <Badges color="success" variant="solid" size="sm" rounded="pill" className="shrink-0">
                  Connected
                </Badges>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Cerner Millennium Telemetry Feeder
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Real-time vitals wave stream and ICU bedside telemetry exporter
                  </span>
                </div>
                <Badges color="success" variant="solid" size="sm" rounded="pill" className="shrink-0">
                  Connected
                </Badges>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    National Health Information Exchange (HIE)
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Statewide immunization registry and patient allergy checks
                  </span>
                </div>
                <Badges color="info" variant="solid" size="sm" rounded="pill" className="shrink-0">
                  Polling Sync
                </Badges>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Department Shifts & Staffing Rules */}
      {activeTab === 'shifts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              Shift Rotations &amp; Core Hours
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 dark:text-white truncate">Day Shift (Alpha)</span>
                  <Badges color="primary" variant="soft" size="sm" rounded="pill" className="shrink-0">07:00 - 15:30</Badges>
                </div>
                <p className="text-gray-400">Primary outpatient clinics, elective surgery suites, and general rounds.</p>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 dark:text-white truncate">Evening Shift (Bravo)</span>
                  <Badges color="info" variant="soft" size="sm" rounded="pill" className="shrink-0">15:00 - 23:30</Badges>
                </div>
                <p className="text-gray-400">Post-operative recoveries, emergency surges, and inpatient medication rounds.</p>
              </div>

              <div className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 dark:text-white truncate">Night Shift (Charlie)</span>
                  <Badges color="warning" variant="soft" size="sm" rounded="pill" className="shrink-0">23:00 - 07:30</Badges>
                </div>
                <p className="text-gray-400">Critical care overnight coverage, urgent admissions, and trauma resuscitation.</p>
              </div>
            </div>
          </Card>

          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              Acuity Staffing Enforcements
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    ICU 1:1 &amp; 1:2 Nursing Ratio Lock
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Blocks inpatient bed admissions if nurse-to-patient safety threshold is breached
                  </span>
                </div>
                <Badges color="danger" variant="solid" size="sm" rounded="pill" className="shrink-0">
                  Enforced
                </Badges>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Automated Fatigue &amp; Overtime Warnings
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Flags clinicians exceeding 12 consecutive hours on duty
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOvertimeAlerts(!overtimeAlerts)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    overtimeAlerts ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      overtimeAlerts ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 4: HIPAA Access & Biometrics */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              Clinical Security &amp; Authentication
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Pharmacy Vault Biometric Dual-Sign Lock
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Mandates two authorized fingerprint scans before Schedule II narcotics unlock
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBiometricVault(!biometricVault)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    biometricVault ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      biometricVault ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Continuous HIPAA Audit Logging
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Immutable cryptographically signed records for every patient chart access
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAuditLogging(!auditLogging)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    auditLogging ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                      auditLogging ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 gap-3">
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">
                    Automatic Terminal Lockout
                  </span>
                  <span className="text-gray-400 block text-xs line-clamp-2">
                    Locks workstation sessions after 3 minutes of physical inactivity
                  </span>
                </div>
                <Badges color="info" variant="soft" size="sm" rounded="pill" className="shrink-0">
                  180 Seconds
                </Badges>
              </div>
            </div>
          </Card>

          <Card className="p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
              Role-Based Access Control (RBAC)
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">Attending Physicians</span>
                  <span className="text-gray-400 text-xs truncate block">Full Diagnostic, Rx Ordering, &amp; Surgical Privileges</span>
                </div>
                <Badges color="primary" variant="soft" size="sm" rounded="pill" className="shrink-0">Tier 1 Admin</Badges>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">Clinical Staff &amp; Nurses</span>
                  <span className="text-gray-400 text-xs truncate block">Vitals Input, Medication Administration Records (MAR)</span>
                </div>
                <Badges color="info" variant="soft" size="sm" rounded="pill" className="shrink-0">Tier 2 Clinical</Badges>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 gap-2">
                <div className="min-w-0">
                  <span className="font-bold text-gray-900 dark:text-white block truncate">Pharmacy Specialists</span>
                  <span className="text-gray-400 text-xs truncate block">Formulary Dispense &amp; Narcotic Vault Authorization</span>
                </div>
                <Badges color="warning" variant="soft" size="sm" rounded="pill" className="shrink-0">Tier 2 Vault</Badges>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Hospital Audit Trail Modal */}
      <Modal
        open={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        title="Hospital HIPAA Security & Compliance Audit Trail"
        description="Immutable cryptographic transaction log of all clinical record access, biometric verifications, and HL7 exchanges."
        size="lg"
        color="primary"
        primaryAction={{
          label: 'Export Signed Log',
          onClick: handleExportAudit,
        }}
        secondaryAction={{
          label: 'Close Audit',
          onClick: () => setShowAuditModal(false),
        }}
      >
        <div className="space-y-3 text-xs pt-1">
          <div className="divide-y divide-gray-100 dark:divide-gray-800/80 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="p-3 flex items-center justify-between gap-3 bg-white dark:bg-gray-900/50">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-gray-400 text-xs">{log.id}</span>
                    <span className="font-bold text-gray-900 dark:text-white truncate">{log.user}</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 truncate">{log.event}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badges color={log.color} variant="soft" size="sm" rounded="pill" className="mb-0.5">
                    {log.status}
                  </Badges>
                  <span className="text-gray-400 block text-xs">{log.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span>Cryptographic Checksum: <strong>SHA-256 (Valid)</strong></span>
            <span>Logs Retained: <strong>7 Years (HIPAA Standard)</strong></span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
