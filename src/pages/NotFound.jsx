import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, Search, Activity, FileQuestion, HelpCircle,} from 'lucide-react'
import Card from '../components/ui/Card'
import logoSm from '../assets/logo/logo-sm.png'
import { toast } from '../context/toast-context'

export const NotFound = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const query = searchQuery.toLowerCase().trim()
    if (query.includes('patient')) {
      navigate('/patients')
    } else if (query.includes('emergen') || query.includes('triage') || query.includes('trauma')) {
      navigate('/emergency')
    } else if (query.includes('lab') || query.includes('result') || query.includes('test')) {
      navigate('/lab-results')
    } else if (query.includes('ward') || query.includes('bed')) {
      navigate('/wards')
    } else if (query.includes('staff') || query.includes('doctor') || query.includes('nurse')) {
      navigate('/staff')
    } else if (query.includes('vital')) {
      navigate('/vitals')
    } else if (query.includes('appoint') || query.includes('sched')) {
      navigate('/appointments')
    } else if (query.includes('pharm')) {
      navigate('/pharmacy')
    } else if (query.includes('setting')) {
      navigate('/settings')
    } else {
      navigate('/')
    }
  }

  const handleReportMissing = () => {
    toast.info('Route ticket #INC-8092 dispatched to Hospital Health IT & PACS Systems Support.', {
      title: 'Missing Route Dispatched',
    })
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-primary/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 dark:bg-primary/25 blur-3xl" />
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-teal-500/15 dark:bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-teal-500/5 dark:from-primary/10 dark:via-transparent dark:to-teal-500/10" />
      </div>

      {/* ─── Foreground Content ─── */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {/* ─── CarePulse Hospital Brand Header ─── */}
        <div className="flex items-center gap-2.5 mb-6 select-none cursor-pointer" onClick={() => navigate('/')}>
          <img src={logoSm} alt="CarePulse Logo" className="w-10 h-10 rounded-xl object-contain" />
          <div className="text-left">
            <div className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              CarePulse Hospital
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Clinical Telemetry Network
            </div>
          </div>
        </div>

        {/* ─── Main 404 Hero Card (No Bottom Cards) ─── */}
        <Card className="w-full max-w-2xl p-6 sm:p-10 relative overflow-hidden text-center flex flex-col items-center justify-center">
          {/* Decorative Grid Glow Background */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none bg-gradient-to-b from-primary/15 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-4 sm:mb-6 shadow-2xs">
            <FileQuestion size={14} className="shrink-0" />
            <span>Code 404 · Unresolved Clinical Route</span>
          </div>

          {/* Big Stylized 404 Header with ECG Pulse */}
          <div className="relative mb-4 sm:mb-6 select-none">
            <div className="text-7xl sm:text-9xl font-black tracking-tighter text-slate-200 dark:text-zinc-800/80 leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shadow-lg shadow-primary/20 backdrop-blur-md">
                <Activity size={36} className="animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title & Clinical Explanation */}
          <div className="max-w-md mx-auto space-y-2 mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Clinical Record or Route Not Located
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-white/60 leading-relaxed">
              The requested electronic patient chart, medical subsystem route, or clinical department module does not exist or has been relocated within the hospital network.
            </p>
          </div>

          {/* Search Input for Rapid Clinical Triage */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-md mx-auto mb-6 sm:mb-8">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search department, patient, or route (e.g. emergency, lab)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/90 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
              >
                Locate
              </button>
            </div>
          </form>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-initial h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-700 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft size={15} />
              <span>Previous Station</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-initial h-10 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/25 cursor-pointer whitespace-nowrap"
            >
              <Home size={15} />
              <span>Command Center</span>
            </button>

            <button
              type="button"
              onClick={handleReportMissing}
              className="flex-1 sm:flex-initial h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <HelpCircle size={15} />
              <span>Report Missing Chart</span>
            </button>
          </div>
        </Card>

        {/* ─── Minimal Footnote Text (No Cards) ─── */}
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-zinc-500 font-mono">
          <span>CarePulse Health Network · Facility Node: #CP-TX-9082 · HTTP 404</span>
        </div>
      </div>
    </div>
  )
}

export default NotFound