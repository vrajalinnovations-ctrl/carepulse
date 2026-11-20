import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  MailCheck,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react'
import Card from '../components/ui/Card'
import logoSm from '../assets/logo/logo-sm.png'
import { toast } from '../context/toast-context'

export const VerifyEmail = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim() || code.length < 4) {
      toast.error('Please enter the verification code sent to your email.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Email verified successfully! Welcome to CarePulse.')
      navigate('/')
    }, 600)
  }

  const handleResend = () => {
    setIsResending(true)
    setTimeout(() => {
      setIsResending(false)
      toast.info('A new verification code has been dispatched to your email.')
    }, 800)
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* ─── Ambient Background Glows (Lush depth, not flat black) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Central Primary Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 dark:bg-primary/25 blur-3xl" />
        {/* Top-Start Teal Orb */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-teal-500/15 dark:bg-teal-500/20 blur-3xl" />
        {/* Bottom-End Emerald Orb */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 blur-3xl" />
        {/* Atmospheric Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-teal-500/5 dark:from-primary/10 dark:via-transparent dark:to-teal-500/10" />
      </div>

      {/* ─── Foreground Content ─── */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* ─── Back to Login Link ─── */}
        <div className="w-full mb-4 flex items-center justify-start">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Sign In</span>
          </Link>
        </div>

        {/* ─── Brand Logo ─── */}
        <div className="flex items-center gap-2.5 mb-6 select-none cursor-pointer" onClick={() => navigate('/')}>
          <img src={logoSm} alt="CarePulse Logo" className="w-10 h-10 rounded-xl object-contain" />
          <div className="text-left">
            <div className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              CarePulse
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Clinical Health Portal
            </div>
          </div>
        </div>

        {/* ─── Verify Email Card ─── */}
        <Card className="w-full p-6 sm:p-8">
          <div className="mb-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <MailCheck size={26} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Verify your email
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Please enter the 6-digit verification code sent to your registered clinical email address.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-center">
              <input
                type="text"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                placeholder="0 0 0 0 0 0"
                className="w-full text-center tracking-widest text-lg sm:text-xl font-bold font-mono py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-primary/25 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Verifying code...</span>
              ) : (
                <span>Verify & Continue</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>Didn't receive the email?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-60"
            >
              <RotateCcw size={12} className={isResending ? 'animate-spin' : ''} />
              <span>{isResending ? 'Resending...' : 'Resend Code'}</span>
            </button>
          </div>
        </Card>

        {/* ─── Footer ─── */}
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-zinc-500">
          <span>CarePulse Health System · Secure Clinical Access</span>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail