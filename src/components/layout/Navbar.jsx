import { useState, useRef, useEffect } from 'react';
import {
    Search, Bell, Mail, Sun, Moon, Settings, Command,
    X, User, Shield, Sliders, CreditCard, LogOut,
    ShieldAlert, Activity, Maximize2, Minimize2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSm from '../../assets/logo/logo-sm.png';
import { useTheme } from '../../context/theme-context';
import { cx, FONT_MONO } from './Uihelpers';
import AnimatedThemeToggler from '@/components/ui/animated-theme-toggler';


const Navbar = ({
    isDark = true,
    navbarPosition: propNavbarPosition,
    isSidebarExpanded = true,
    sidebarOpen = true,
    setSidebarOpen,
    setMobileSidebar,
    toggleTheme,
    settingsOpen = false,
    setSettingsOpen,
}) => {
    const themeCtx = useTheme();
    const navbarPosition = propNavbarPosition || themeCtx?.navbarPosition || 'sticky';
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [messagesOpen, setMessagesOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const profileRef = useRef(null);
    const notificationsRef = useRef(null);
    const messagesRef = useRef(null);

    // Track native fullscreen state
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(() => {});
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
        }
    };

    // Close dropdowns on outside click or Escape key
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
                setNotificationsOpen(false);
            }
            if (messagesRef.current && !messagesRef.current.contains(e.target)) {
                setMessagesOpen(false);
            }
        };
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setProfileOpen(false);
                setNotificationsOpen(false);
                setMessagesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <header
            role="banner"
            className={cx(
                navbarPosition === 'sticky' ? 'sticky top-0 z-40' : 'relative z-20',
                'h-16 flex items-center justify-between border-b transition-colors backdrop-blur-2xl relative',
                isDark
                    ? 'bg-transparent border-white/10'
                    : 'bg-transparent border-slate-200/60'
            )}
        >
            {/* Specular glass reflection & top light highlight */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {/* Top specular light reflection rim */}
                <div
                    className={cx(
                        "absolute top-0 left-0 right-0 h-px bg-gradient-to-r",
                        isDark
                            ? "from-transparent via-white/40 to-transparent"
                            : "from-transparent via-white to-transparent"
                    )}
                />
                {/* Subtle glass light sheen reflection */}
                <div
                    className={cx(
                        "absolute inset-0 bg-gradient-to-b opacity-30",
                        isDark
                            ? "from-white/10 via-transparent to-transparent"
                            : "from-white/60 via-transparent to-transparent"
                    )}
                />
                {/* Bottom glass reflection edge */}
                <div
                    className={cx(
                        "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r",
                        isDark
                            ? "from-white/5 via-white/15 to-white/5"
                            : "from-black/5 via-black/10 to-black/5"
                    )}
                />
            </div>

            {/* ─── LEFT: Animated 2-Line Menu Toggle Button & Mobile Logo ─── */}
            <div className="flex items-center gap-2.5 ps-2 lg:ps-4 shrink-0">
                <button
                    type="button"
                    aria-label={sidebarOpen ? 'Collapse navigation sidebar' : 'Expand navigation sidebar'}
                    aria-expanded={isSidebarExpanded}
                    onClick={() => {
                        if (window.innerWidth < 1024) {
                            setMobileSidebar && setMobileSidebar((prev) => !prev);
                        } else {
                            setSidebarOpen && setSidebarOpen(!sidebarOpen);
                        }
                    }}
                    className={cx(
                        'group w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer',
                        isDark
                            ? 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                            : 'text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 shadow-sm'
                    )}
                >
                    {/* Animated Top Line */}
                    <span
                        className={cx(
                            'h-0.5 rounded-full bg-current transition-all duration-300 ease-out',
                            isSidebarExpanded
                                ? 'w-4 translate-x-0'
                                : 'w-3 -translate-x-0.5 group-hover:w-4 group-hover:translate-x-0'
                        )}
                        aria-hidden="true"
                    />
                    {/* Animated Bottom Line */}
                    <span
                        className={cx(
                            'h-0.5 rounded-full bg-current transition-all duration-300 ease-out',
                            isSidebarExpanded
                                ? 'w-3 translate-x-0.5 group-hover:w-4 group-hover:translate-x-0'
                                : 'w-4 translate-x-0'
                        )}
                        aria-hidden="true"
                    />
                </button>

                {/* Mobile Brand Logo */}
                <div className="lg:hidden flex items-center gap-1.5">
                    <img src={logoSm} alt="CarePulse Logo" className="w-8 h-8 rounded-lg object-contain" />
                </div>
            </div>

            {/* ─── CENTER: Command Palette Search ─── */}
            <div className="flex-1 flex justify-center px-2 sm:px-4 max-w-xl mx-auto min-w-0">
                <form
                    role="search"
                    aria-label="Console search"
                    onSubmit={(e) => e.preventDefault()}
                    className={cx(
                        'group relative w-full flex items-center gap-2.5 rounded-2xl px-3.5 py-2 transition-all duration-300',
                        searchFocused
                            ? isDark
                                ? 'bg-white/10 border border-purple-500/50 shadow-lg shadow-purple-500/10 ring-2 ring-purple-500/20 backdrop-blur-md'
                                : 'bg-white border border-purple-400/60 shadow-lg shadow-purple-400/10 ring-2 ring-purple-400/20'
                            : isDark
                                ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md'
                                : 'bg-white/80 border border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm'
                    )}
                >
                    <Search
                        size={15}
                        className={cx('shrink-0 transition-colors duration-200',
                            searchFocused
                                ? isDark ? 'text-purple-400' : 'text-purple-600'
                                : isDark ? 'text-white/30' : 'text-slate-400'
                        )}
                        aria-hidden="true"
                    />

                    <input
                        type="search"
                        placeholder="Search patients, doctors, records, wards…"
                        aria-label="Search patients, doctors, and medical records"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className={cx(
                            'bg-transparent outline-none w-full text-sm font-medium placeholder:transition-colors placeholder:truncate text-start',
                            isDark
                                ? 'text-white'
                                : 'text-slate-800'
                        )}
                    />

                    {/* Clear button */}
                    {searchValue && (
                        <button
                            type="button"
                            aria-label="Clear search input"
                            onClick={() => setSearchValue('')}
                            className={cx('shrink-0 transition-colors p-0.5 rounded cursor-pointer', isDark ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-700')}
                        >
                            <X size={13} />
                        </button>
                    )}

                    {/* Keyboard shortcut badge */}
                    {!searchFocused && !searchValue && (
                        <div
                            className={cx(
                                'hidden sm:flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded-md border',
                                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                            )}
                            aria-hidden="true"
                        >
                            <Command size={10} className={isDark ? 'text-white/30' : 'text-slate-400'} />
                            <span className={cx(FONT_MONO, 'text-xs', isDark ? 'text-white/30' : 'text-slate-400')}>K</span>
                        </div>
                    )}
                </form>
            </div>

            {/* ─── RIGHT: Actions ─── */}
            <div className="flex items-center gap-1.5 pe-4 shrink-0">
                {/* System status badge */}
                <div className={cx(
                    'hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border me-1',
                    isDark ? 'bg-emerald-500/10 border-emerald-500/20 backdrop-blur-md' : 'bg-emerald-50 border-emerald-200 shadow-sm'
                )}>
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className={cx(FONT_MONO, 'text-xs font-medium', isDark ? 'text-emerald-400' : 'text-emerald-700')}>
                        Clinical Active
                    </span>
                </div>

                {/* Fullscreen mode toggle */}
                <button
                    type="button"
                    aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
                    onClick={toggleFullscreen}
                    className={cx(
                        'hidden md:flex w-9 h-9 rounded-xl items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer',
                        isFullscreen
                            ? isDark
                                ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 backdrop-blur-md'
                                : 'bg-purple-50 border border-purple-300 text-purple-700 shadow-sm'
                            : isDark
                                ? 'text-white/60 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                                : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 shadow-sm'
                    )}
                >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Theme mode toggle (Magic UI Animated Theme Toggler) */}
                <AnimatedThemeToggler
                    aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                    theme={isDark ? 'dark' : 'light'}
                    blur={90}
                    duration={1400}
                    onThemeChange={(newTheme) => {
                        if (themeCtx?.setTheme) {
                            themeCtx.setTheme(newTheme);
                        } else if (toggleTheme) {
                            toggleTheme();
                        }
                    }}
                    className={cx(
                        'hidden md:flex w-9 h-9 rounded-xl items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer',
                        isDark
                            ? 'text-white/60 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                            : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 shadow-sm'
                    )}
                />

                {/* Messages / Mail Dropdown */}
                <div className="relative hidden md:block" ref={messagesRef}>
                    <button
                        type="button"
                        aria-label="View messages"
                        aria-expanded={messagesOpen}
                        onClick={() => setMessagesOpen(!messagesOpen)}
                        className={cx(
                            'relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer',
                            messagesOpen
                                ? isDark
                                    ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 backdrop-blur-md'
                                    : 'bg-purple-50 border border-purple-300 text-purple-700 shadow-sm'
                                : isDark
                                    ? 'text-white/60 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                                    : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 shadow-sm'
                        )}
                    >
                        <Mail size={16} />
                        <span className="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm" aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                        {messagesOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className={cx(
                                    'absolute end-0 top-full mt-2 w-80 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl border z-50',
                                    isDark
                                        ? 'bg-zinc-900/95 border-white/10 shadow-black/60 text-white'
                                        : 'bg-white/95 border-slate-200 shadow-slate-300/50 text-slate-800'
                                )}
                            >
                                <div className={cx('flex items-center justify-between pb-2 mb-2 border-b', isDark ? 'border-white/10' : 'border-slate-200')}>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xs font-bold tracking-wide">Clinical Messages</h3>
                                        <span className="px-1.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400">
                                            3 New
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-xs text-purple-400 hover:underline font-medium cursor-pointer"
                                        onClick={() => setMessagesOpen(false)}
                                    >
                                        Mark all read
                                    </button>
                                </div>

                                <div className="space-y-1.5">
                                    <div className={cx('p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-colors cursor-pointer', isDark ? 'hover:bg-white/5 bg-white/5' : 'hover:bg-slate-50 bg-slate-50/50')}>
                                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                            AP
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-xs leading-tight">Dr. Arthur Pendelton</p>
                                                <span className="text-xs text-slate-400">10m ago</span>
                                            </div>
                                            <p className="text-xs text-slate-400 dark:text-gray-400 truncate mt-0.5">STAT Troponin I panel requested for Bay 01.</p>
                                        </div>
                                    </div>

                                    <div className={cx('p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-colors cursor-pointer', isDark ? 'hover:bg-white/5 bg-white/5' : 'hover:bg-slate-50 bg-slate-50/50')}>
                                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                            ER
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-xs leading-tight">Nurse Elena Rostova</p>
                                                <span className="text-xs text-slate-400">35m ago</span>
                                            </div>
                                            <p className="text-xs text-slate-400 dark:text-gray-400 truncate mt-0.5">ICU Bed 02 arterial line recalibrated.</p>
                                        </div>
                                    </div>

                                    <div className={cx('p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-colors cursor-pointer', isDark ? 'hover:bg-white/5 bg-white/5' : 'hover:bg-slate-50 bg-slate-50/50')}>
                                        <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                            RX
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-xs leading-tight">Central Pharmacy</p>
                                                <span className="text-xs text-slate-400">1h ago</span>
                                            </div>
                                            <p className="text-xs text-slate-400 dark:text-gray-400 truncate mt-0.5">Batch RX-7041 Atorvastatin ready.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('mt-2 pt-2 border-t text-center', isDark ? 'border-white/10' : 'border-slate-200')}>
                                    <button
                                        type="button"
                                        onClick={() => setMessagesOpen(false)}
                                        className="text-xs font-semibold text-purple-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                                    >
                                        <span>View all communications</span>
                                        <span className="inline-block rtl:rotate-180">&rarr;</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Notifications Dropdown */}
                <div className="relative hidden sm:block" ref={notificationsRef}>
                    <button
                        type="button"
                        aria-label="View notifications"
                        aria-expanded={notificationsOpen}
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className={cx(
                            'relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer',
                            notificationsOpen
                                ? isDark
                                    ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 backdrop-blur-md'
                                    : 'bg-purple-50 border border-purple-300 text-purple-700 shadow-sm'
                                : isDark
                                    ? 'text-white/60 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                                    : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 shadow-sm'
                        )}
                    >
                        <Bell size={16} />
                        <span className="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm" aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                        {notificationsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className={cx(
                                    'absolute end-0 top-full mt-2 w-80 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl border z-50',
                                    isDark
                                        ? 'bg-zinc-900/95 border-white/10 shadow-black/60 text-white'
                                        : 'bg-white/95 border-slate-200 shadow-slate-300/50 text-slate-800'
                                )}
                            >
                                <div className={cx('flex items-center justify-between pb-2 mb-2 border-b', isDark ? 'border-white/10' : 'border-slate-200')}>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xs font-bold tracking-wide">Clinical Alerts</h3>
                                        <span className="px-1.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                                            2 New
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-xs text-purple-400 hover:underline font-medium cursor-pointer"
                                        onClick={() => setNotificationsOpen(false)}
                                    >
                                        Mark all read
                                    </button>
                                </div>

                                <div className="space-y-1.5">
                                    <div className={cx('p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-colors cursor-pointer', isDark ? 'hover:bg-white/5 bg-white/5' : 'hover:bg-slate-50 bg-slate-50/50')}>
                                        <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <ShieldAlert size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-xs leading-tight">ICU-04 Telemetry Alert</p>
                                            <p className="text-xs text-slate-400 truncate">Patient SpO2 dropped below 91% in Room 4B</p>
                                            <span className="text-xs text-slate-400 mt-1 inline-block">2 min ago</span>
                                        </div>
                                    </div>

                                    <div className={cx('p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-colors cursor-pointer', isDark ? 'hover:bg-white/5 bg-white/5' : 'hover:bg-slate-50 bg-slate-50/50')}>
                                        <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <Activity size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-xs leading-tight">Diagnostic Lab Results Ready</p>
                                            <p className="text-xs text-slate-400 truncate">Cardiology panel completed for Patient #892</p>
                                            <span className="text-xs text-slate-400 mt-1 inline-block">25 min ago</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Settings Drawer Toggle Button */}
                <button
                    type="button"
                    aria-label="Open customization settings"
                    aria-expanded={settingsOpen}
                    onClick={() => setSettingsOpen && setSettingsOpen(!settingsOpen)}
                    className={cx(
                        'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer',
                        settingsOpen
                            ? isDark
                                ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-sm shadow-purple-500/10 backdrop-blur-md'
                                : 'bg-purple-50 border border-purple-300 text-purple-700 shadow-sm shadow-purple-500/10'
                            : isDark
                                ? 'text-white/60 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                                : 'text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 shadow-sm'
                    )}
                >
                    <Settings
                        size={16}
                        className={cx('transition-transform duration-300', settingsOpen ? 'rotate-90 text-purple-400' : 'rotate-0')}
                        aria-hidden="true"
                    />
                </button>

                {/* Divider */}
                <div className={cx('w-px h-5 mx-1', isDark ? 'bg-white/10' : 'bg-slate-200')} aria-hidden="true" />

                {/* Separate Small User Profile/Admin Button with Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        type="button"
                        aria-label="User profile options"
                        aria-expanded={profileOpen}
                        onClick={() => setProfileOpen(!profileOpen)}
                        className={cx(
                            'relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group border focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer',
                            profileOpen
                                ? isDark
                                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 backdrop-blur-md shadow-sm shadow-purple-500/10'
                                    : 'bg-purple-50 border-purple-300 text-purple-700 shadow-sm'
                                : isDark
                                    ? 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                                    : 'text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 shadow-sm'
                        )}
                    >
                        <User size={16} />
                        {/* Subtle online status dot */}
                        <span className="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" aria-hidden="true" />
                    </button>

                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className={cx(
                                    'absolute end-0 top-full mt-2 w-64 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl border z-50',
                                    isDark
                                        ? 'bg-zinc-900/95 border-white/10 shadow-black/60 text-white'
                                        : 'bg-white/95 border-slate-200 shadow-slate-300/50 text-slate-800'
                                )}
                            >
                                {/* User Info Header */}
                                <div className={cx(
                                    'p-3 rounded-xl border mb-2',
                                    isDark ? 'bg-linear-to-br from-purple-500/15 via-violet-500/5 to-transparent border-purple-500/20' : 'bg-purple-50/80 border-purple-100'
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-emerald-500/30">
                                                Dr
                                            </div>
                                            <span className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-900" aria-hidden="true" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <p className="text-xs font-bold truncate">Dr. Sarah Mitchell</p>
                                                <span className="text-xs uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                                    CMO
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 truncate">s.mitchell@carepulse.health</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="space-y-0.5">
                                    <button
                                        type="button"
                                        onClick={() => setProfileOpen(false)}
                                        className={cx(
                                            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer',
                                            isDark ? 'hover:bg-white/10 text-white/80 hover:text-white' : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                                        )}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <User size={15} className="text-purple-400" />
                                            <span>My Profile</span>
                                        </div>
                                        <span className="text-xs text-slate-400">View</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setProfileOpen(false)}
                                        className={cx(
                                            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer',
                                            isDark ? 'hover:bg-white/10 text-white/80 hover:text-white' : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                                        )}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Shield size={15} className="text-emerald-400" />
                                            <span>Security & 2FA</span>
                                        </div>
                                        <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                                            Active
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProfileOpen(false);
                                            setSettingsOpen && setSettingsOpen(true);
                                        }}
                                        className={cx(
                                            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer',
                                            isDark ? 'hover:bg-white/10 text-white/80 hover:text-white' : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                                        )}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Sliders size={15} className="text-amber-400" />
                                            <span>Preferences</span>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setProfileOpen(false)}
                                        className={cx(
                                            'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer',
                                            isDark ? 'hover:bg-white/10 text-white/80 hover:text-white' : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                                        )}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <CreditCard size={15} className="text-blue-400" />
                                            <span>Billing & Plan</span>
                                        </div>
                                        <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded-md">
                                            Pro
                                        </span>
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className={cx('my-1.5 h-px', isDark ? 'bg-white/10' : 'bg-slate-200')} />

                                {/* Logout */}
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen(false)}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                                >
                                    <LogOut size={15} />
                                    <span>Sign Out</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Navbar;