import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartPulse } from 'lucide-react'

export const InitialLoader = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = useState(20)
  const [statusMessage, setStatusMessage] = useState('Initializing Clinical Core Engine...')

  useEffect(() => {
    if (!isLoading) return

    const t1 = setTimeout(() => {
      setProgress(80)
      setStatusMessage('Synchronizing Inpatient EHR Records & Telemetry...')
    }, 850)

    const t2 = setTimeout(() => {
      setProgress(100)
      setStatusMessage('Clinical Environment Ready.')
    }, 1900)

    const t3 = setTimeout(() => {
      onComplete?.()
    }, 2600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [isLoading, onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="carepulse-initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Ambient Multi-Orb Background Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -top-16 -start-16 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl" />
            <div className="absolute -bottom-16 -end-16 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
            {/* Pulsing Clinical Logo Badge */}
            <div className="relative mb-6">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-teal-500/20 border border-emerald-500/40 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 relative"
              >
                <HeartPulse className="w-10 h-10 text-emerald-400" />
              </motion.div>

              {/* Pulsing Orbit Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2.5 rounded-3xl border border-dashed border-emerald-400/40 pointer-events-none"
              />
            </div>

            {/* Brand Title & Headline */}
            <div className="space-y-1 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  CarePulse
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  v1.0
                </span>
              </div>
              <p className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                Hospital &amp; Clinical Operations Command Center
              </p>
            </div>

            {/* Animated ECG Pulse Rhythm Wave */}
            <div className="w-full max-w-[240px] h-9 mb-5 relative flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 240 40"
                className="w-full h-full text-emerald-400/50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0,20 L60,20 L70,16 L76,24 L84,20 L100,20 L108,6 L116,34 L126,2 L134,26 L142,16 L150,20 L180,20 L190,16 L196,24 L204,20 L240,20" />
              </svg>
              {/* Scan Beam */}
              <motion.div
                animate={{ x: [-120, 120] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent pointer-events-none"
              />
            </div>

            {/* Smooth Progress Bar Container */}
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-white/5 mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full shadow-sm shadow-emerald-400/50"
                initial={{ width: '20%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>

            {/* Live Telemetry Status Feedback */}
            <div className="flex items-center justify-between w-full text-xs text-slate-400">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="truncate text-slate-300 font-mono text-[11px]">
                  {statusMessage}
                </span>
              </div>
              <span className="font-mono text-emerald-400 font-bold shrink-0 ms-2 text-[11px]">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InitialLoader
