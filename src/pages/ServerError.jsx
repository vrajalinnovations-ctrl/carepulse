import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ServerCrash,
  AlertOctagon,
  RefreshCw,
  Home,
  Ambulance,
  PhoneCall,
} from 'lucide-react'
import Card from '../components/ui/Card'
import logoSm from '../assets/logo/logo-sm.png'
import { toast } from '../context/toast-context'

export const ServerError = () => {
  const navigate = useNavigate()
  const [isReconnecting, setIsReconnecting] = useState(false)

  const handleReconnect = () => {
    setIsReconnecting(true)
    setTimeout(() => {
      setIsReconnecting(false)
      toast.success('Handshake re-established with secondary failover cluster #CP-TX-9083.', {
        title: 'Telemetry Node Reconnected',
      })
    }, 1200)
  }

  const handleEscalate = () => {
    toast.error('Emergency dispatch sent to On-Call Bio-Medical Systems Engineer (Pager: 4492).', {
      title: 'Incident Escalated',
    })
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-rose-500/20 overflow-hidden">
      {/* ─── Ambient Background Glows (Lush depth, not flat black) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Central Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-500/15 dark:bg-rose-500/20 blur-3xl" />
        {/* Top-Start Amber Orb */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-amber-500/15 dark:bg-amber-500/20 blur-3xl" />
        {/* Bottom-End Rose Orb */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-rose-500/10 dark:bg-rose-500/15 blur-3xl" />
        {/* Atmospheric Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/5 via-transparent to-amber-500/5 dark:from-rose-500/10 dark:via-transparent dark:to-amber-500/10" />
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

        {/* ─── Main 500 Hero Card (Clean & Focused) ─── */}
        <Card className="w-full max-w-2xl p-6 sm:p-10 relative overflow-hidden text-center flex flex-col items-center justify-center">
          {/* Decorative Grid Glow Background */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none bg-gradient-to-b from-rose-500/15 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 mb-4 sm:mb-6 shadow-2xs">
            <AlertOctagon size={14} className="shrink-0" />
            <span>Code Amber · Clinical Infrastructure Interruption</span>
          </div>

          {/* Big Stylized 500 Header with Server Crash Pulse */}
          <div className="relative mb-4 sm:mb-6 select-none">
            <div className="text-7xl sm:text-9xl font-black tracking-tighter text-slate-200 dark:text-zinc-800/80 leading-none">
              500
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20 backdrop-blur-md">
                <ServerCrash size={36} className="animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title & Clinical Explanation */}
          <div className="max-w-md mx-auto space-y-2 mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Hospital Telemetry & Core Gateway Offline
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-white/60 leading-relaxed">
              The central clinical message bus experienced an unexpected interruption. Bedside telemetry monitors are caching vitals locally while our failover node re-establishes synchronization.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 mt-1">
              <span>Incident Ref: INC-2026-9042 · FHIR_SOCKET_ERR</span>
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReconnect}
              disabled={isReconnecting}
              className="flex-1 sm:flex-initial h-10 inline-flex items-center justify-center gap-2 px-5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/25 cursor-pointer whitespace-nowrap disabled:opacity-60"
            >
              <RefreshCw size={15} className={isReconnecting ? 'animate-spin' : ''} />
              <span>{isReconnecting ? 'Reconnecting Gateway...' : 'Retry Telemetry Sync'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-initial h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-700 text-xs font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Home size={15} />
              <span>Command Center</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/emergency')}
              className="flex-1 sm:flex-initial h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Ambulance size={15} />
              <span>Emergency Board</span>
            </button>

            <button
              type="button"
              onClick={handleEscalate}
              className="flex-1 sm:flex-initial h-10 inline-flex items-center justify-center gap-2 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <PhoneCall size={15} />
              <span>Escalate to Bio-Med IT</span>
            </button>
          </div>
        </Card>

        {/* ─── Minimal Footnote Text (No Cards) ─── */}
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-zinc-500 font-mono">
          <span>CarePulse Health Network · Failover Node: #CP-TX-9083 · HTTP 500</span>
        </div>
      </div>
    </div>
  )
}

export default ServerError