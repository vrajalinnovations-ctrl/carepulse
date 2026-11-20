import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HeartPulse,
  Users,
  Calendar,
  Clock,
  Bed,
  Activity,
  AlertTriangle,
  Plus,
  FlaskConical,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Radio,
  Building2,
  MapPin,
  Phone,
  Award,
  Stethoscope,
  Sliders,
  ShieldAlert,
  FileText,
  Maximize2,
} from 'lucide-react'
import { FiHome } from 'react-icons/fi'
import Card from '../components/ui/Card'
import Breadcrumb from '../components/ui/breadcrumbs'
import Modal from '../components/ui/modals'
import Input from '../components/ui/input'
import { SparklineMetricCard, AreaChartCard, DonutChartCard, RadarChartCard } from '../components/ui/charts'
import { toast } from '../context/toast-context'
import avatar1 from '../assets/user/1.png'
import avatar2 from '../assets/user/2.png'
import avatar3 from '../assets/user/3.png'
import avatar4 from '../assets/user/4.png'
import overviewData from '../mokdata/overview.json'

const avatarMap = {
  'avatar-1': avatar1,
  'avatar-2': avatar2,
  'avatar-3': avatar3,
  'avatar-4': avatar4,
}

export const Overview = () => {
  const navigate = useNavigate()

  // Live Telemetry Selected Patient
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0)
  const [ecgOffset, setEcgOffset] = useState(0)
  const [pagedStaff, setPagedStaff] = useState({})

  // Interactive Modals
  const [showAdmitModal, setShowAdmitModal] = useState(false)
  const [showBroadcastModal, setShowBroadcastModal] = useState(false)
  const [selectedTelemetryModal, setSelectedTelemetryModal] = useState(null)

  // Live Admissions State
  const [admissionsList, setAdmissionsList] = useState(overviewData.recentAdmissions)

  // Quick Inpatient Admission Form
  const [newAdmit, setNewAdmit] = useState({
    patient: '',
    age: 45,
    gender: 'Male',
    doctor: 'Dr. Sarah Mitchell',
    department: 'Cardiology',
    wardBed: 'CCU-Bed 05',
    acuity: 'Level 2 · Urgent',
  })

  // Emergency Broadcast Form
  const [broadcastCode, setBroadcastCode] = useState('Code Blue (Cardiac Arrest)')
  const [broadcastDept, setBroadcastDept] = useState('All Critical Care Facilities')
  const [broadcastNotes, setBroadcastNotes] = useState('Immediate resuscitation team dispatch required.')

  const handlePageStaff = (idx) => {
    const doc = onDutyStaff[idx]
    setPagedStaff((prev) => ({ ...prev, [idx]: true }))
    toast.info(`Radio pager alert broadcasted to ${doc?.name || 'Physician'} at ${doc?.station || 'Assigned Station'}.`, {
      title: 'Physician Radio Paged',
    })
    setTimeout(() => {
      setPagedStaff((prev) => ({ ...prev, [idx]: false }))
    }, 3000)
  }

  // Quick Inpatient Admission Submission
  const handleQuickAdmitSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!newAdmit.patient.trim()) {
      toast.error('Please enter the patient name.')
      return
    }

    const newEncId = `ENC-${Math.floor(10900 + Math.random() * 500)}`
    const newPatId = `P-${Math.floor(10700 + Math.random() * 300)}`

    const acuityColorMap = {
      'Level 1 · Resus': 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
      'Level 2 · Urgent': 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      'Level 3 · Emergent': 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      'Level 4 · Routine': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    }

    const newRecord = {
      id: newEncId,
      patientId: newPatId,
      patient: newAdmit.patient.trim(),
      doctor: newAdmit.doctor,
      department: newAdmit.department,
      wardBed: newAdmit.wardBed,
      acuity: newAdmit.acuity,
      acuityColor: acuityColorMap[newAdmit.acuity] || acuityColorMap['Level 2 · Urgent'],
      status: 'Admitted',
      statusColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    }

    setAdmissionsList((prev) => [newRecord, ...prev])
    setShowAdmitModal(false)
    setNewAdmit({
      patient: '',
      age: 45,
      gender: 'Male',
      doctor: 'Dr. Sarah Mitchell',
      department: 'Cardiology',
      wardBed: 'CCU-Bed 05',
      acuity: 'Level 2 · Urgent',
    })

    toast.success(
      `Inpatient ${newRecord.patient} (${newPatId}) admitted to ${newRecord.wardBed} under ${newRecord.doctor}.`,
      { title: 'Admissions Intake Complete' }
    )
  }

  // Emergency Code Broadcast Trigger
  const handleSendBroadcast = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setShowBroadcastModal(false)
    toast.warning(`${broadcastCode} activated across ${broadcastDept}. Clinical response teams dispatched.`, {
      title: 'Emergency Code Alert Active',
    })
  }

  const handleExportBriefing = () => {
    toast.success('Clinical Command Center executive briefing downloaded (PDF / CSV format).', {
      title: 'Executive Briefing Generated',
    })
  }

  // Animated ECG pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setEcgOffset((prev) => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Datasets loaded from JSON mock data
  const {
    admissionTrends,
    bedDistribution,
    telemetryPatients,
    wardsData,
    statLabAlerts,
    emergencyTriageQueue,
    todayAppointments,
    qualityMetrics,
  } = overviewData

  const onDutyStaff = overviewData.onDutyStaff.map((doc) => ({
    ...doc,
    avatar: avatarMap[doc.avatarId] || avatar1,
  }))

  const currentPatient = telemetryPatients[selectedPatientIndex] || telemetryPatients[0]

  return (
    <div className="p-3.5 sm:p-5 lg:p-6 space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* ─── Breadcrumb Navigation ─── */}
      <div className="overflow-x-auto pb-1 scrollbar-none">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Hospital Operations' },
            { label: 'Command Center Overview' },
          ]}
        />
      </div>

      {/* ─── Top Header & Global Actions ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
              Clinical &amp; Hospital Command Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
              Live Operations
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-white/60 mt-1">
            Real-time inpatient census, clinical throughput, bedside telemetry monitoring, and departmental bed allocation.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap w-full sm:w-auto shrink-0">
          <div className="hidden md:inline-flex items-center gap-1.5 h-9 text-xs font-medium text-slate-600 dark:text-white/60 bg-white/60 dark:bg-white/5 px-3 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-xs shrink-0">
            <Clock size={14} className="text-primary shrink-0" />
            <span>Shift: Day Rotation (07:00 - 19:00)</span>
          </div>

          <button
            type="button"
            onClick={handleExportBriefing}
            className="flex-1 sm:flex-initial h-9 inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <FileText size={14} className="shrink-0" />
            <span>Briefing</span>
          </button>

          <button
            type="button"
            onClick={() => setShowBroadcastModal(true)}
            className="flex-1 sm:flex-initial h-9 inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/25 transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            <Radio size={14} className="shrink-0" />
            <span>Broadcast</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAdmitModal(true)}
            className="flex-1 sm:flex-initial h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-md shadow-primary/25 hover:bg-primary/90 border border-transparent transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={14} className="shrink-0" />
            <span>Quick Admit</span>
          </button>
        </div>
      </div>

      {/* ─── Hospital Profile Card ─── */}
      <Card className="p-4 sm:p-5 lg:p-6">
        {/* Top Header: Hospital Brand, Badges & Fast Navigation */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-primary-700 via-primary-600 to-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-600/30 border border-white/20">
                <Building2 size={22} className="sm:hidden" />
                <Building2 size={26} className="hidden sm:block" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
              </span>
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  CarePulse Metro University Medical Center
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Code Green · Full Capacity Active</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-white/60 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-medium text-slate-700 dark:text-white/80">Level-1 Trauma &amp; Comprehensive Stroke Center</span>
                <span className="text-slate-300 dark:text-white/20 hidden sm:inline">·</span>
                <span className="hidden sm:inline">JCI Gold Seal Certified</span>
                <span className="text-slate-300 dark:text-white/20 hidden md:inline">·</span>
                <span className="font-mono text-slate-500 dark:text-white/50">Facility ID: #CP-9082-TX</span>
              </p>

              <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500 dark:text-white/50 pt-0.5 flex-wrap">
                <span className="flex items-center gap-1 truncate max-w-full">
                  <MapPin size={13} className="text-primary shrink-0" />
                  <span className="truncate">742 Medical Center Blvd, Campus Towers A &amp; B</span>
                </span>
                <span className="text-slate-300 dark:text-white/20 hidden sm:inline">·</span>
                <span className="flex items-center gap-1 shrink-0">
                  <Phone size={13} className="text-emerald-500 shrink-0" />
                  <span>Emergency Dispatch: +1 (800) 555-0199</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions (Top 3 Buttons) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap w-full xl:w-auto pt-2 xl:pt-0">
            <button
              type="button"
              onClick={() => navigate('/wards')}
              className="flex-1 sm:flex-initial h-9 min-w-28 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl bg-white/80 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/15 transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Bed size={14} className="text-primary shrink-0" />
              <span>Manage Wards</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/staff')}
              className="flex-1 sm:flex-initial h-9 min-w-28 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl bg-white/80 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-white hover:bg-white dark:hover:bg-white/15 transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Users size={14} className="text-emerald-500 shrink-0" />
              <span>Staff Directory</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="flex-1 sm:flex-initial h-9 min-w-28 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-semibold transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Sliders size={14} className="shrink-0" />
              <span>Facility Profile</span>
            </button>
          </div>
        </div>

        {/* Bottom Metrics: 4 Key Facility Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3 pt-4 sm:pt-5">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Bed size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs text-slate-400 dark:text-white/50 block font-medium truncate">Licensed Capacity</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">1,450 Beds</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 block truncate font-medium">166 Ready for Admit</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center shrink-0 border border-sky-500/20">
              <Stethoscope size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs text-slate-400 dark:text-white/50 block font-medium truncate">Medical Staff</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">640 Specialists</span>
              <span className="text-xs text-sky-600 dark:text-sky-400 block truncate font-medium">48 On-Duty Shift</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Activity size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs text-slate-400 dark:text-white/50 block font-medium truncate">Surgical Suites</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">24 OR Theaters</span>
              <span className="text-xs text-purple-600 dark:text-purple-400 block truncate font-medium">18 Active Operations</span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Award size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs text-slate-400 dark:text-white/50 block font-medium truncate">Quality Rating</span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block truncate">4.9 / 5.0</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 block truncate font-medium">Top 1% National Tier</span>
            </div>
          </div>
        </div>
      </Card>

      {/* ─── Metric Cards with Live Sparklines ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <SparklineMetricCard
          title="Active Inpatient Census"
          value="1,284"
          change="+3.8%"
          positive={true}
          subtitle="88.4% total bed occupancy"
          color="#22c55e"
          icon={Users}
          data={[1120, 1150, 1140, 1180, 1210, 1190, 1240, 1220, 1260, 1284]}
        />
        <SparklineMetricCard
          title="Today's Consultations"
          value="342"
          change="+14.2%"
          positive={true}
          subtitle="280 completed · 34 queue"
          color="#06b6d4"
          icon={Calendar}
          data={[280, 295, 310, 300, 320, 315, 330, 325, 338, 342]}
        />
        <SparklineMetricCard
          title="Critical Care (ICU)"
          value="28 / 32"
          change="4 Open"
          positive={false}
          subtitle="87.5% capacity · 2 inbound"
          color="#f43f5e"
          icon={HeartPulse}
          data={[24, 25, 27, 26, 28, 29, 28, 30, 29, 28]}
        />
        <SparklineMetricCard
          title="Avg. Emergency Triage"
          value="9.4 min"
          change="-18.5%"
          positive={true}
          subtitle="Standard benchmark < 15 min"
          color="#f59e0b"
          icon={Clock}
          data={[14.2, 13.5, 12.8, 12.0, 11.4, 11.0, 10.5, 10.2, 9.8, 9.4]}
        />
      </div>

      {/* ─── Admissions Flow (Area) + Bed Allocation (Donut) Analytics ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
        <div className="xl:col-span-7 2xl:col-span-8">
          <AreaChartCard
            title="Hospital Admissions & Patient Census Velocity"
            subtitle="Monthly inpatient admission curve with discharge tracking"
            data={admissionTrends}
            dataKey="value"
            labelKey="label"
            color="#22c55e"
            value="1,482 Patients"
            badgeText="+14.8%"
          />
        </div>

        <div className="xl:col-span-5 2xl:col-span-4">
          <DonutChartCard
            title="Departmental Bed Occupancy"
            subtitle="Live ward distribution across specialized clinical units"
            data={bedDistribution}
            totalLabel="Active Beds"
          />
        </div>
      </div>

      {/* ─── Main Section: Live Patient Vitals Telemetry + Ward Occupancy ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Real-time ICU & Telemetry Monitor */}
        <Card className="xl:col-span-2 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shadow-xs shrink-0">
                  <Activity size={22} className="animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                      Live Bedside Vitals &amp; Telemetry
                    </h3>
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-white/50 truncate">
                    Real-time biometric telemetry feed from intensive care monitors
                  </p>
                </div>
              </div>

              {/* Patient Selector Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200/60 dark:border-white/5 overflow-x-auto scrollbar-none w-full sm:w-auto">
                {telemetryPatients.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPatientIndex(idx)}
                    className={`flex-1 sm:flex-initial text-center px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${selectedPatientIndex === idx
                      ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                  >
                    {p.bed.includes('-') ? p.bed.split('-')[1] : p.bed}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Monitored Patient Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  {currentPatient.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {currentPatient.name}
                    </span>
                    <span className="text-xs text-slate-400 shrink-0">
                      ({currentPatient.age}y / {currentPatient.gender})
                    </span>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-slate-600 dark:text-white/70 shrink-0">
                      {currentPatient.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-white/50 truncate mt-0.5">
                    {currentPatient.bed} · Diagnosis: <strong className="text-slate-700 dark:text-white/80">{currentPatient.diagnosis}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5 dark:border-white/5">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                  {currentPatient.ecgCondition}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTelemetryModal(currentPatient)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  title="Expand Telemetry Waveform"
                >
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>

            {/* Animated ECG Waveform Canvas Display */}
            <div className="relative rounded-2xl bg-zinc-950 p-3 sm:p-4 border border-zinc-800 overflow-hidden shadow-inner mb-3 sm:mb-4">
              {/* Grid Lines Pattern */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #22c55e 1px, transparent 1px), linear-gradient(to bottom, #22c55e 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative z-10 flex items-center justify-between text-xs text-emerald-400/80 mb-2 font-mono flex-wrap gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  LEAD II · 25mm/s · 10mm/mV
                </span>
                <span className="text-emerald-300 font-bold">{currentPatient.hr} BPM</span>
              </div>

              {/* Simulated Heartbeat Waveform SVG */}
              <div className="relative w-full h-20 sm:h-24 overflow-hidden flex items-center">
                <svg
                  className="w-full h-full text-emerald-400 drop-shadow-md"
                  viewBox="0 0 600 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,50 L50,50 L58,45 L62,55 L70,50 L85,50 L92,20 L98,85 L106,10 L112,58 L120,48 L128,50 L160,50 L180,50 L188,45 L192,55 L200,50 L215,50 L222,20 L228,85 L236,10 L242,58 L250,48 L258,50 L290,50 L310,50 L318,45 L322,55 L330,50 L345,50 L352,20 L358,85 L366,10 L372,58 L380,48 L388,50 L420,50 L440,50 L448,45 L452,55 L460,50 L475,50 L482,20 L488,85 L496,10 L502,58 L510,48 L518,50 L550,50 L600,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Scanning Sweep Line */}
                <div
                  className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-emerald-400/40 pointer-events-none transition-all duration-100"
                  style={{ left: `${ecgOffset}%` }}
                />
              </div>
            </div>

            {/* Vitals Telemetry Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs font-semibold text-slate-400 dark:text-white/40 block mb-0.5 truncate">
                  HEART RATE
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-rose-500">
                  {currentPatient.hr}{' '}
                  <span className="text-xs font-normal text-slate-400">bpm</span>
                </span>
                <span className="text-xs text-emerald-500 block mt-0.5 font-medium">Normal</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs font-semibold text-slate-400 dark:text-white/40 block mb-0.5 truncate">
                  BLOOD PRESSURE
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-teal-600 dark:text-teal-400">
                  {currentPatient.bp}
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">mmHg</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs font-semibold text-slate-400 dark:text-white/40 block mb-0.5 truncate">
                  PULSE SpO2
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-cyan-500">
                  {currentPatient.spo2}%
                </span>
                <span className="text-xs text-emerald-500 block mt-0.5 font-medium">Optimal</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs font-semibold text-slate-400 dark:text-white/40 block mb-0.5 truncate">
                  RESPIRATION
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-purple-500">
                  {currentPatient.rr}{' '}
                  <span className="text-xs font-normal text-slate-400">/min</span>
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">Resting</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center col-span-2 sm:col-span-1">
                <span className="text-xs font-semibold text-slate-400 dark:text-white/40 block mb-0.5 truncate">
                  BODY TEMP
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-amber-500">
                  {currentPatient.temp}°F
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">Normothermic</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Wards & Bed Occupancy Breakdown */}
        <Card className="xl:col-span-1 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                  <Bed size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Ward Bed Occupancy
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-white/50">Capacity by Department</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md shrink-0">
                88% Total
              </span>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
              {wardsData.map((ward, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-white/80 truncate pr-2">
                      {ward.name}
                    </span>
                    <span className="font-mono text-slate-500 dark:text-white/50 shrink-0">
                      {ward.occupied}/{ward.total} ({ward.rate}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${ward.rate > 90
                        ? 'bg-rose-500'
                        : ward.rate > 80
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                        }`}
                      style={{ width: `${ward.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 sm:pt-4 mt-4 sm:mt-6 border-t border-black/5 dark:border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-white/50 gap-2">
              <span className="font-medium text-slate-600 dark:text-white/60">Total Beds: 364 Active</span>
              <button
                type="button"
                onClick={() => navigate('/wards')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto shrink-0 shadow-2xs"
              >
                <span>41 Beds Ready · Manage Wards</span>
                <ArrowUpRight size={13} className="shrink-0" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* ─── Middle Grid: STAT Lab Alerts + Emergency Triage Queue ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Real-time STAT Hospital Pharmacy & Dispensary Alerts */}
        <Card className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <FlaskConical size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  STAT Diagnostic Lab Alerts
                </h3>
                <p className="text-xs text-slate-400 dark:text-white/50 truncate">Real-time Critical Laboratory Values</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/lab-results')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto shrink-0 shadow-2xs"
            >
              <span>View Diagnostics</span>
              <ChevronRight size={13} className="shrink-0" />
            </button>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {statLabAlerts.map((alert, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {alert.test}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border shrink-0 ${alert.flagColor}`}>
                      {alert.flag}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-white/70 font-mono font-medium truncate">
                    Observed: <strong className="text-rose-500">{alert.value}</strong> · Baseline: {alert.threshold}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-white/40 truncate">
                    Patient: {alert.patient} · Ward: {alert.ward} · Attending: {alert.physician}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5 dark:border-white/5">
                  <span className="text-slate-400 font-mono text-xs">{alert.time}</span>
                  <button
                    type="button"
                    onClick={() => navigate('/lab-results')}
                    className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-all cursor-pointer whitespace-nowrap text-xs"
                  >
                    Review Panel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Emergency Triage Priority Queue */}
        <Card className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  Emergency Triage Priority Queue
                </h3>
                <p className="text-xs text-slate-400 dark:text-white/50 truncate">High-Acuity Intake Queue</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/emergency')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto shrink-0 shadow-2xs"
            >
              <span>Emergency Board</span>
              <ChevronRight size={13} className="shrink-0" />
            </button>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {emergencyTriageQueue.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 sm:p-3.5 rounded-2xl border transition-colors ${item.border}`}
              >
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${item.color}`}>
                    {item.acuity}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Wait: {item.wait}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {item.patient}
                </h4>
                <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5 truncate">
                  Chief Complaint: <strong className="text-slate-700 dark:text-white/80">{item.complaint}</strong>
                </p>
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/5 dark:border-white/5 text-xs text-slate-400 flex-wrap gap-1">
                  <span>Assigned: <strong className="text-slate-700 dark:text-white/80">{item.bay}</strong></span>
                  <span>Attending: <strong className="text-slate-700 dark:text-white/80">{item.physician}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Bottom Grid: Outpatient Consultations + On-Duty Medical Staff ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Today's Outpatient Consultations Schedule */}
        <Card className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  Today's Consultations &amp; Rounds
                </h3>
                <p className="text-xs text-slate-400 dark:text-white/50 truncate">Outpatient &amp; Specialty Schedule</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto shrink-0 shadow-2xs"
            >
              <span>Full Schedule</span>
              <ChevronRight size={13} className="shrink-0" />
            </button>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {todayAppointments.map((apt, idx) => (
              <div
                key={idx}
                className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2.5 sm:gap-3"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-12 text-center shrink-0">
                    <span className="text-xs font-bold font-mono text-slate-800 dark:text-white block">
                      {apt.time.split(' ')[0]}
                    </span>
                    <span className="text-xs text-slate-400">
                      {apt.time.split(' ')[1]}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-white/10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {apt.patient}
                      </p>
                      <span className="text-xs font-mono text-slate-400 shrink-0">
                        {apt.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/50 truncate mt-0.5">
                      {apt.type} · {apt.dept} ({apt.doctor})
                    </p>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border shrink-0 whitespace-nowrap ${apt.statusColor}`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* On-Duty Physician & Staff Coverage Roster */}
        <Card className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Users size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  Active Medical Staff Coverage
                </h3>
                <p className="text-xs text-slate-400 dark:text-white/50 truncate">Key Department Leads on Shift</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/staff')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto shrink-0 shadow-2xs"
            >
              <span>Staff Directory</span>
              <ChevronRight size={13} className="shrink-0" />
            </button>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {onDutyStaff.map((doc, idx) => (
              <div
                key={idx}
                className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-2.5 sm:gap-3 hover:border-slate-300 dark:hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200/80 dark:border-white/10"
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${doc.status === 'On Duty'
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                        }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {doc.name}
                      </p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold border shrink-0 whitespace-nowrap ${doc.statusColor}`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/50 truncate mt-0.5">
                      {doc.role} · {doc.department}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5 truncate">
                      <span className="truncate">Station: {doc.station}</span>
                      <span className="shrink-0 text-slate-300 dark:text-white/20">·</span>
                      <span className="shrink-0 font-sans text-slate-500 dark:text-white/60">
                        {doc.patients} Patients
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePageStaff(idx)}
                  className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer whitespace-nowrap ${pagedStaff[idx]
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  title={`Page ${doc.name}`}
                >
                  {pagedStaff[idx] ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span>Paged</span>
                    </>
                  ) : (
                    <>
                      <Radio size={13} className="text-primary shrink-0" />
                      <span>Page</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Clinical Admissions Registry Table + Safety Standards (Radar) ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
        <div className="xl:col-span-7 2xl:col-span-8">
          <Card className="p-0 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-3.5 sm:p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Activity size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      Recent Inpatient Admissions &amp; Encounters
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-white/50 truncate">
                      Live clinical intake, attending assignment &amp; acuity status
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/patients')}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto shrink-0 shadow-2xs"
                >
                  <span>Full Admissions Registry</span>
                  <ChevronRight size={13} className="shrink-0" />
                </button>
              </div>

              {/* Mobile Card List (screens < md) */}
              <div className="block md:hidden p-3.5 space-y-2.5">
                {admissionsList.map((row) => (
                  <div
                    key={row.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">
                          {row.patient}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {row.patientId} · {row.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${row.acuityColor}`}>
                          {row.acuity}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1.5 border-t border-black/5 dark:border-white/5">
                      <span className="truncate pr-2">
                        {row.doctor} · {row.department}
                      </span>
                      <span className="font-mono text-slate-500 dark:text-white/50 shrink-0">
                        {row.wardBed}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Responsive Table for Tablets & Desktops (>= md) */}
              <div className="hidden md:block overflow-x-auto scrollbar-none">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/75 dark:bg-gray-900/50 font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      <th className="px-4 py-3 whitespace-nowrap">Patient &amp; ID</th>
                      <th className="px-4 py-3 whitespace-nowrap">Attending &amp; Dept</th>
                      <th className="px-4 py-3 whitespace-nowrap">Ward / Bed</th>
                      <th className="px-4 py-3 whitespace-nowrap">Acuity</th>
                      <th className="px-4 py-3 whitespace-nowrap text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                    {admissionsList.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {row.patient}
                          </div>
                          <div className="text-slate-400 font-mono text-xs">
                            {row.patientId} · {row.id}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-medium text-slate-800 dark:text-gray-200">
                            {row.doctor}
                          </div>
                          <div className="text-slate-400 text-xs">
                            {row.department}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-600 dark:text-gray-300">
                          {row.wardBed}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${row.acuityColor}`}
                          >
                            {row.acuity}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${row.statusColor}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-5 2xl:col-span-4">
          <RadarChartCard
            title="Clinical Safety &amp; Quality Standards"
            subtitle="Joint Commission and hospital accreditation compliance scorecards"
            metrics={qualityMetrics}
            color="#22c55e"
          />
        </div>
      </div>

      {/* ─── Modal 1: Quick Inpatient Admission Intake ─── */}
      <Modal
        variant="glass"
        open={showAdmitModal}
        onClose={() => setShowAdmitModal(false)}
        title="Quick Inpatient Admission Intake"
        description="Rapid triage and inpatient registry assignment directly from Command Center"
        size="md"
        color="primary"
        footer={
          <div className="flex items-center justify-end gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setShowAdmitModal(false)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleQuickAdmitSubmit}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/25 cursor-pointer"
            >
              Complete Admission
            </button>
          </div>
        }
      >
        <form onSubmit={handleQuickAdmitSubmit} className="space-y-3.5 text-xs">
          <Input
            id="admit-patient"
            label="Patient Full Name"
            required
            placeholder="e.g. Jonathan Hayes"
            variant="glass"
            size="sm"
            value={newAdmit.patient}
            onChange={(e) => setNewAdmit({ ...newAdmit, patient: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id="admit-age"
              label="Age"
              type="number"
              min={1}
              max={120}
              variant="glass"
              size="sm"
              value={newAdmit.age}
              onChange={(e) => setNewAdmit({ ...newAdmit, age: e.target.value })}
            />
            <Input
              id="admit-gender"
              label="Gender"
              type="select"
              variant="glass"
              size="sm"
              value={newAdmit.gender}
              onChange={(e) => setNewAdmit({ ...newAdmit, gender: e.target.value })}
              options={['Male', 'Female', 'Other']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id="admit-department"
              label="Department"
              type="select"
              variant="glass"
              size="sm"
              value={newAdmit.department}
              onChange={(e) => setNewAdmit({ ...newAdmit, department: e.target.value })}
              options={[
                'Cardiology',
                'Intensive Care Unit',
                'Emergency & Trauma',
                'Neurology',
                'Surgical Recovery',
              ]}
            />
            <Input
              id="admit-bed"
              label="Assigned Bed"
              placeholder="e.g. ICU-04"
              variant="glass"
              size="sm"
              value={newAdmit.wardBed}
              onChange={(e) => setNewAdmit({ ...newAdmit, wardBed: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id="admit-doctor"
              label="Attending Physician"
              type="select"
              variant="glass"
              size="sm"
              value={newAdmit.doctor}
              onChange={(e) => setNewAdmit({ ...newAdmit, doctor: e.target.value })}
              options={[
                { value: 'Dr. Sarah Mitchell', label: 'Dr. Sarah Mitchell (Cardiology)' },
                { value: 'Dr. Marcus Vance', label: 'Dr. Marcus Vance (Trauma / ER)' },
                { value: 'Dr. Priya Patel', label: 'Dr. Priya Patel (Critical Care)' },
                { value: 'Dr. Carlos Mendez', label: 'Dr. Carlos Mendez (Neurology)' },
              ]}
            />
            <Input
              id="admit-acuity"
              label="Triage Acuity"
              type="select"
              variant="glass"
              size="sm"
              value={newAdmit.acuity}
              onChange={(e) => setNewAdmit({ ...newAdmit, acuity: e.target.value })}
              options={[
                { value: 'Level 1 · Resus', label: 'Level 1 · Resuscitation' },
                { value: 'Level 2 · Urgent', label: 'Level 2 · Urgent' },
                { value: 'Level 3 · Emergent', label: 'Level 3 · Emergent' },
                { value: 'Level 4 · Routine', label: 'Level 4 · Routine' },
              ]}
            />
          </div>
        </form>
      </Modal>

      {/* ─── Modal 2: Hospital Emergency Code Broadcast ─── */}
      <Modal
        variant="glass"
        open={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        title="Broadcast Emergency Code Alert"
        description="Dispatch emergency radio alerts to facility stations, trauma units, and on-duty leads"
        size="md"
        color="danger"
        footer={
          <div className="flex items-center justify-end gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setShowBroadcastModal(false)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={handleSendBroadcast}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-600/30 cursor-pointer flex items-center gap-1.5"
            >
              <Radio size={14} />
              <span>Broadcast Emergency Code</span>
            </button>
          </div>
        }
      >
        <div className="space-y-3.5 text-xs">
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
            <ShieldAlert size={18} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Hospital Wide Radio Frequency Broadcast</span>
              <p className="text-rose-600/80 dark:text-rose-300/80 text-xs mt-0.5">
                Transmitting this code overrides non-critical overhead chimes and delivers priority push pings to all active physician badges.
              </p>
            </div>
          </div>

          <Input
            id="broadcast-code"
            label="Emergency Code Protocol"
            type="select"
            variant="glass"
            color="rose"
            size="sm"
            value={broadcastCode}
            onChange={(e) => setBroadcastCode(e.target.value)}
            options={[
              { value: 'Code Blue (Cardiac Arrest)', label: 'Code Blue (Adult Cardiac / Respiratory Arrest)' },
              { value: 'Code Red (Fire / Evac)', label: 'Code Red (Active Smoke / Fire Protocol)' },
              { value: 'Code Trauma (Mass Casualty)', label: 'Code Trauma (Mass Casualty Level 1 Inbound)' },
              { value: 'Code Stroke (Hyperacute TPA)', label: 'Code Stroke (Hyperacute Neurovascular Assessment)' },
              { value: 'Code Sepsis (Rapid Response)', label: 'Code Sepsis (Stat Lactate & Antibiotic Rapid Protocol)' },
            ]}
          />

          <Input
            id="broadcast-zone"
            label="Target Broadcast Zone"
            type="select"
            variant="glass"
            color="rose"
            size="sm"
            value={broadcastDept}
            onChange={(e) => setBroadcastDept(e.target.value)}
            options={[
              'All Critical Care Facilities',
              'Emergency Department & Trauma Bays',
              'Intensive Care Unit (ICU / CCU)',
              'Operating Rooms & Surgical Suites',
              'Step-Down & Inpatient Wards',
            ]}
          />

          <Input
            id="broadcast-notes"
            label="Dispatch Instructions & Pager Note"
            type="textarea"
            rows={2}
            variant="glass"
            color="rose"
            size="sm"
            placeholder="Enter stat instructions for on-call teams..."
            value={broadcastNotes}
            onChange={(e) => setBroadcastNotes(e.target.value)}
          />
        </div>
      </Modal>

      {/* ─── Modal 3: Bedside Telemetry Diagnostics Chart Modal ─── */}
      <Modal
        variant="glass"
        open={Boolean(selectedTelemetryModal)}
        onClose={() => setSelectedTelemetryModal(null)}
        title={selectedTelemetryModal ? `Bedside Telemetry · ${selectedTelemetryModal.name} (${selectedTelemetryModal.id})` : 'Bedside Telemetry'}
        description={selectedTelemetryModal ? `High-acuity continuous biometric waveform · Bed ${selectedTelemetryModal.bed}` : ''}
        size="lg"
        color="primary"
        footer={
          <div className="flex items-center justify-end gap-2.5 w-full">
            <button
              type="button"
              onClick={() => setSelectedTelemetryModal(null)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Close Telemetry
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success(`Telemetry parameters logged to EHR for ${selectedTelemetryModal?.name}.`, {
                  title: 'EHR Chart Synced',
                })
                setSelectedTelemetryModal(null)
              }}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/25 cursor-pointer"
            >
              Sync to Electronic Health Record
            </button>
          </div>
        }
      >
        {selectedTelemetryModal && (
          <div className="space-y-4 text-xs">
            {/* Patient Telemetry Header Strip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {selectedTelemetryModal.name}
                </span>
                <p className="text-xs text-slate-500 dark:text-white/60">
                  {selectedTelemetryModal.age}y / {selectedTelemetryModal.gender} · Bed: {selectedTelemetryModal.bed} · Diagnosis: {selectedTelemetryModal.diagnosis}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 self-start sm:self-auto shrink-0">
                {selectedTelemetryModal.ecgCondition}
              </span>
            </div>

            {/* Simulated Live Waveform */}
            <div className="rounded-2xl bg-zinc-950 p-4 border border-zinc-800 text-emerald-400">
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  LEAD II CONTINUOUS ECG · SWEEP SPEED 25mm/s
                </span>
                <span className="text-emerald-300 font-bold">{selectedTelemetryModal.hr} BPM</span>
              </div>
              <div className="relative w-full h-24 overflow-hidden flex items-center">
                <svg className="w-full h-full text-emerald-400 drop-shadow-md" viewBox="0 0 600 100" preserveAspectRatio="none">
                  <path
                    d="M0,50 L50,50 L58,45 L62,55 L70,50 L85,50 L92,20 L98,85 L106,10 L112,58 L120,48 L128,50 L160,50 L180,50 L188,45 L192,55 L200,50 L215,50 L222,20 L228,85 L236,10 L242,58 L250,48 L258,50 L290,50 L310,50 L318,45 L322,55 L330,50 L345,50 L352,20 L358,85 L366,10 L372,58 L380,48 L388,50 L420,50 L440,50 L448,45 L452,55 L460,50 L475,50 L482,20 L488,85 L496,10 L502,58 L510,48 L518,50 L550,50 L600,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* 4 Quantitative Telemetry Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs text-slate-400 block font-medium">Heart Rate</span>
                <span className="text-lg font-bold text-rose-500">{selectedTelemetryModal.hr} bpm</span>
                <span className="text-xs text-emerald-500 block mt-0.5">Sinus Rhythm</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs text-slate-400 block font-medium">NIBP</span>
                <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{selectedTelemetryModal.bp}</span>
                <span className="text-xs text-slate-400 block mt-0.5">MAP 90 mmHg</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs text-slate-400 block font-medium">Pulse SpO2</span>
                <span className="text-lg font-bold text-cyan-500">{selectedTelemetryModal.spo2}%</span>
                <span className="text-xs text-emerald-500 block mt-0.5">Adequate</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                <span className="text-xs text-slate-400 block font-medium">Temperature</span>
                <span className="text-lg font-bold text-amber-500">{selectedTelemetryModal.temp}°F</span>
                <span className="text-xs text-slate-400 block mt-0.5">Oral probe</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Overview
