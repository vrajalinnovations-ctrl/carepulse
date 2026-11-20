import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft,} from 'lucide-react'
import Card from '../components/ui/Card'
import logoSm from '../assets/logo/logo-sm.png'
import { toast } from '../context/toast-context'

export const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please re-enter.')
      return
    }

    if (!agreeTerms) {
      toast.error('Please agree to the Terms of Service to continue.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Account created successfully! Welcome to CarePulse.')
      navigate('/')
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
        {/* ─── Back to Dashboard Link ─── */}
        <div className="w-full mb-4 flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </button>
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

        {/* ─── Register Card ─── */}
        <Card className="w-full p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Sign up to access clinical records and portal tools
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Sarah Jenkins"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-xs transition-all"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded-md border-slate-300 dark:border-zinc-700 text-primary focus:ring-primary/30 accent-primary cursor-pointer shrink-0"
                />
                <span className="text-slate-600 dark:text-zinc-400 leading-tight">
                  I agree to the <span className="text-primary font-medium">Terms of Service</span> and <span className="text-primary font-medium">Privacy Policy</span>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-primary/25 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Creating account...</span>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Switch Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-zinc-800 text-center text-xs text-slate-500 dark:text-zinc-400">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
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

export default Register