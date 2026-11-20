import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import Card from '../components/ui/Card'
import logoSm from '../assets/logo/logo-sm.png'
import { toast } from '../context/toast-context'

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error('Please enter your email address.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      toast.success('Password reset link sent to your email!')
    }, 600)
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

        {/* ─── Forgot Password Card ─── */}
        <Card className="w-full p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Check your inbox
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  We've sent a password reset link to <span className="font-semibold text-slate-700 dark:text-zinc-200">{email}</span>.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Click here to resend
                </button>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center w-full h-10 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/25"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Forgot password?
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
                  Enter your email address and we'll send you recovery instructions
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@carepulse.com"
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 mt-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-primary/25 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Sending reset link...</span>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-zinc-800 text-center text-xs text-slate-500 dark:text-zinc-400">
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Return to Sign In
                </Link>
              </div>
            </>
          )}
        </Card>

        {/* ─── Footer ─── */}
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-zinc-500">
          <span>CarePulse Health System · Secure Clinical Access</span>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword