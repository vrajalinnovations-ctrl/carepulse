import React from 'react';
import { X, Check, Moon, Sun, AlignLeft, AlignRight, Sliders, Palette, Pin, ArrowDownUp, PanelTop, ArrowUp, ArrowDown, MoveVertical, } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/theme-context';
import { cx, SIDEBAR_TRANSITION, FONT_MONO, FONT_DISPLAY } from './Uihelpers';

const PRIMARY_COLOR_PRESETS = [
    { name: 'Emerald', color: '#22c55e' },
    { name: 'Purple', color: '#7c3aed' },
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Teal', color: '#14b8a6' },
];


const SettingsDrawer = ({
    theme: propTheme,
    isDark: propIsDark,
    direction: propDirection,
    navbarPosition: propNavbarPosition,
    setNavbarPosition: propSetNavbarPosition,
    settingsOpen = false,
    setSettingsOpen,
    toggleTheme: propToggleTheme,
    toggleDirection: propToggleDirection,
    primaryColor: propPrimaryColor,
    changePrimaryColor: propChangePrimaryColor,
}) => {
    const themeCtx = useTheme();
    const theme = propTheme || themeCtx?.theme || 'dark';
    const isDark = propIsDark !== undefined ? propIsDark : theme === 'dark';
    const direction = propDirection || themeCtx?.direction || 'ltr';
    const navbarPosition = propNavbarPosition || themeCtx?.navbarPosition || 'sticky';
    const setNavbarPosition = propSetNavbarPosition || themeCtx?.setNavbarPosition;
    const toggleTheme = propToggleTheme || themeCtx?.toggleTheme;
    const toggleDirection = propToggleDirection || themeCtx?.toggleDirection;
    const primaryColor = propPrimaryColor || themeCtx?.primaryColor || '#22c55e';
    const changePrimaryColor = propChangePrimaryColor || themeCtx?.changePrimaryColor;
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            if (window.lenis) {
                window.lenis.scrollTo(0, { duration: 0.8 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const scrollToBottom = () => {
        if (typeof window !== 'undefined') {
            const maxScroll = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            ) - window.innerHeight;
            if (window.lenis) {
                window.lenis.scrollTo(maxScroll, { duration: 0.8 });
            } else {
                window.scrollTo({ top: maxScroll, behavior: 'smooth' });
            }
        }
    };
    return (
        <AnimatePresence>
            {settingsOpen && (
                <>
                    {/* Backdrop overlay */}
                    <motion.div
                        onClick={() => setSettingsOpen && setSettingsOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={cx(
                            'fixed inset-0 backdrop-blur-xs z-40 transition-colors',
                            isDark ? 'bg-black/50' : 'bg-slate-900/25'
                        )}
                        aria-hidden="true"
                    />

                    {/* Off-canvas settings panel */}
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-label="Customize Console"
                        initial={{ x: direction === 'ltr' ? '100%' : '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: direction === 'ltr' ? '100%' : '-100%' }}
                        transition={SIDEBAR_TRANSITION}
                        className={cx(
                            'fixed top-0 bottom-0 z-50 h-screen w-full max-w-xs sm:max-w-sm backdrop-blur-2xl flex flex-col overflow-hidden shadow-2xl transition-colors',
                            direction === 'ltr' ? 'right-0 border-s' : 'left-0 border-r',
                            isDark
                                ? 'bg-dark-surface/85 text-white border-white/10 shadow-black/50'
                                : 'bg-white/90 text-slate-900 border-slate-200 shadow-slate-400/20'
                        )}
                    >
                        {/* Specular glass reflections on right sidebar */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                            {/* Inner border glass reflection highlight line */}
                            <div className={cx('absolute top-0 bottom-0 w-px bg-gradient-to-b',
                                direction === 'ltr' ? 'left-0' : 'right-0',
                                isDark
                                    ? 'from-white/30 via-white/10 to-transparent'
                                    : 'from-white/80 via-slate-200/50 to-transparent'
                            )}
                            />
                            {/* Top edge light rim */}
                            <div className={cx('absolute top-0 left-0 right-0 h-px', isDark ? 'bg-white/20' : 'bg-white')}
                            />
                            {/* Vertical subtle glass sheen */}
                            <div className={cx('absolute inset-0 bg-gradient-to-b opacity-40', isDark ? 'from-white/10 via-transparent to-black/20' : 'from-white/60 via-white/10 to-transparent')}
                            />
                        </div>

                        {/* Pinned Sticky Header */}
                        <div className={cx('relative z-10 flex items-center justify-between px-6 py-5 border-b shrink-0 transition-colors', isDark ? 'border-white/10' : 'border-slate-200')}>
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <Sliders size={16} />
                                </div>
                                <div>
                                    <h2 className={cx(FONT_DISPLAY, 'text-base font-bold tracking-tight', isDark ? 'text-white' : 'text-slate-900')}>
                                        Customize Console
                                    </h2>
                                    <p className={cx('text-xs', isDark ? 'text-gray-400' : 'text-slate-500')}>
                                        Theme & layout preferences
                                    </p>
                                </div>
                            </div>
                            <button
                             type="button"
                                aria-label="Close settings panel"
                                onClick={() => setSettingsOpen && setSettingsOpen(false)}
                                className={cx(
                                    `w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`,
                                    isDark
                                        ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                                        : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 shadow-2xs'
                                )}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div data-lenis-prevent className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-6 py-5 space-y-6 pb-12 drawer-scroll scrollbar-none">

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className={cx(FONT_MONO, 'text-xs font-semibold uppercase tracking-wider', isDark ? 'text-gray-400' : 'text-slate-600')}>
                                        Theme Mode
                                    </h3>
                                    <span className={cx('text-xs font-medium px-2 py-0.5 rounded-lg border', isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200')}>
                                        {isDark ? 'Dark Mode' : 'Light Mode'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                  
                                    <button type="button" aria-pressed={isDark} onClick={() => isDark || (toggleTheme && toggleTheme())} className={cx( 'p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 group', isDark ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-sm shadow-primary/20' : 'border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20' )}>
                                        {/* Mini Dark UI Window Mockup */}
                                        <div className="w-full h-14 rounded-xl bg-gray-950 border border-white/10 p-1.5 flex flex-col gap-1 overflow-hidden shadow-inner">
                                            <div className="flex items-center gap-1 pb-1 border-b border-white/10">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                                            </div>
                                            <div className="flex-1 flex gap-1 items-stretch">
                                                <div className="w-3 rounded-xs bg-white/20" />
                                                <div className="flex-1 flex flex-col gap-0.5">
                                                    <div className="h-2 rounded-xs bg-white/10" />
                                                    <div className="flex-1 rounded-xs bg-primary/30 border border-primary/40" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Label & Active Radio */}
                                        <div className="flex items-center justify-between pt-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <Moon size={14} className={isDark ? 'text-primary' : 'text-slate-500 dark:text-gray-400'} />
                                                <span className={cx('text-xs font-bold', isDark ? 'text-primary' : isDark ? 'text-white' : 'text-slate-800')}>
                                                    Dark
                                                </span>
                                            </div>
                                            <div className={cx(
                                                'w-4 h-4 rounded-full flex items-center justify-center border transition-all',
                                                isDark
                                                    ? 'border-primary bg-primary text-white shadow-xs'
                                                    : 'border-slate-300 dark:border-white/20 bg-transparent'
                                            )}>
                                                {isDark && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Light Mode Visual Tile */}
                                    <button type="button" aria-pressed={!isDark} onClick={() => !isDark || (toggleTheme && toggleTheme())} className={cx('p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 group', !isDark ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-sm shadow-primary/20' : 'border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20')}>
                                        {/* Mini Light UI Window Mockup */}
                                        <div className="w-full h-14 rounded-xl bg-slate-100 border border-slate-300/80 p-1.5 flex flex-col gap-1 overflow-hidden shadow-inner">
                                            <div className="flex items-center gap-1 pb-1 border-b border-slate-200">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            </div>
                                            <div className="flex-1 flex gap-1 items-stretch">
                                                <div className="w-3 rounded-xs bg-slate-300" />
                                                <div className="flex-1 flex flex-col gap-0.5">
                                                    <div className="h-2 rounded-xs bg-white shadow-2xs" />
                                                    <div className="flex-1 rounded-xs bg-white border border-slate-200" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Label & Active Radio */}
                                        <div className="flex items-center justify-between pt-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <Sun size={14} className={!isDark ? 'text-primary' : 'text-slate-500 dark:text-gray-400'} />
                                                <span className={cx('text-xs font-bold', !isDark ? 'text-primary' : isDark ? 'text-white' : 'text-slate-800')}>
                                                    Light
                                                </span>
                                            </div>
                                            <div className={cx(
                                                'w-4 h-4 rounded-full flex items-center justify-center border transition-all',
                                                !isDark
                                                    ? 'border-primary bg-primary text-white shadow-xs'
                                                    : 'border-slate-300 dark:border-white/20 bg-transparent'
                                            )}>
                                                {!isDark && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Layout Direction Card Selector Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className={cx(FONT_MONO, 'text-xs font-semibold uppercase tracking-wider', isDark ? 'text-gray-400' : 'text-slate-600')}>
                                        Layout Direction
                                    </h3>
                                    <span className={cx('text-xs font-medium px-2 py-0.5 rounded-lg border', isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200')}>
                                        {direction.toUpperCase()}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* LTR Visual Tile */}
                                    <button type="button" aria-pressed={direction === 'ltr'} onClick={() => direction === 'ltr' || (toggleDirection && toggleDirection())} className={cx('p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 group', direction === 'ltr' ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-sm shadow-primary/20' : 'border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20')}>
                                        {/* Mini LTR Layout Mockup */}
                                        <div className="w-full h-12 rounded-xl bg-slate-100 dark:bg-gray-950 border border-slate-200 dark:border-white/10 p-1.5 flex gap-1.5 items-stretch overflow-hidden shadow-inner">
                                            <div className="w-5 rounded-md bg-primary flex items-center justify-center text-white text-2xs font-bold shadow-xs">
                                                L
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1 justify-center">
                                                <div className="h-2 w-3/4 rounded-xs bg-slate-300 dark:bg-white/20" />
                                                <div className="h-1.5 w-1/2 rounded-xs bg-slate-200 dark:bg-white/10" />
                                            </div>
                                        </div>

                                        {/* Label & Active Radio */}
                                        <div className="flex items-center justify-between pt-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <AlignLeft size={14} className={direction === 'ltr' ? 'text-primary' : 'text-slate-500 dark:text-gray-400'} />
                                                <span className={cx('text-xs font-bold', direction === 'ltr' ? 'text-primary' : isDark ? 'text-white' : 'text-slate-800')}>
                                                    LTR
                                                </span>
                                            </div>
                                            <div className={cx(
                                                'w-4 h-4 rounded-full flex items-center justify-center border transition-all',
                                                direction === 'ltr'
                                                    ? 'border-primary bg-primary text-white shadow-xs'
                                                    : 'border-slate-300 dark:border-white/20 bg-transparent'
                                            )}>
                                                {direction === 'ltr' && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* RTL Visual Tile */}
                                    <button type="button" aria-pressed={direction === 'rtl'} onClick={() => direction === 'rtl' || (toggleDirection && toggleDirection())} className={cx('p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 group', direction === 'rtl' ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-sm shadow-primary/20' : 'border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20')}>
                                        {/* Mini RTL Layout Mockup */}
                                        <div className="w-full h-12 rounded-xl bg-slate-100 dark:bg-gray-950 border border-slate-200 dark:border-white/10 p-1.5 flex gap-1.5 items-stretch overflow-hidden shadow-inner">
                                            <div className="flex-1 flex flex-col gap-1 justify-center items-end">
                                                <div className="h-2 w-3/4 rounded-xs bg-slate-300 dark:bg-white/20" />
                                                <div className="h-1.5 w-1/2 rounded-xs bg-slate-200 dark:bg-white/10" />
                                            </div>
                                            <div className="w-5 rounded-md bg-primary flex items-center justify-center text-white text-2xs font-bold shadow-xs">
                                                R
                                            </div>
                                        </div>

                                        {/* Label & Active Radio */}
                                        <div className="flex items-center justify-between pt-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <AlignRight size={14} className={direction === 'rtl' ? 'text-primary' : 'text-slate-500 dark:text-gray-400'} />
                                                <span className={cx('text-xs font-bold', direction === 'rtl' ? 'text-primary' : isDark ? 'text-white' : 'text-slate-800')}>
                                                    RTL
                                                </span>
                                            </div>
                                            <div className={cx(
                                                'w-4 h-4 rounded-full flex items-center justify-center border transition-all',
                                                direction === 'rtl'
                                                    ? 'border-primary bg-primary text-white shadow-xs'
                                                    : 'border-slate-300 dark:border-white/20 bg-transparent'
                                            )}>
                                                {direction === 'rtl' && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Navbar Position / Behavior Card Selector Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <PanelTop size={14} className="text-primary" />
                                        <h3 className={cx(FONT_MONO, 'text-xs font-semibold uppercase tracking-wider', isDark ? 'text-gray-400' : 'text-slate-600')}>
                                            Navbar Behavior
                                        </h3>
                                    </div>
                                    <span className={cx('text-xs font-medium px-2 py-0.5 rounded-lg border', isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200')}>
                                        {navbarPosition === 'sticky' ? 'Sticky' : 'Scroll'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* Sticky Navbar Visual Tile */}
                                    <button
                                        type="button"
                                        aria-pressed={navbarPosition === 'sticky'}
                                        onClick={() => setNavbarPosition && setNavbarPosition('sticky')}
                                        className={cx(
                                            'p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 group',
                                            navbarPosition === 'sticky'
                                                ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-sm shadow-primary/20'
                                                : 'border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                                        )}
                                    >
                                        {/* Mini Sticky UI Window Mockup */}
                                        <div className="w-full h-14 rounded-xl bg-slate-100 dark:bg-gray-950 border border-slate-200 dark:border-white/10 p-1.5 flex flex-col gap-1 overflow-hidden shadow-inner">
                                            {/* Pinned Topbar Highlight */}
                                            <div className="h-3.5 rounded-xs bg-primary flex items-center justify-between px-1 shadow-xs">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                                                <Pin size={8} className="text-white" />
                                            </div>
                                            {/* Content flowing beneath */}
                                            <div className="flex-1 flex flex-col gap-1 pt-0.5">
                                                <div className="h-1.5 w-3/4 rounded-xs bg-slate-300 dark:bg-white/20" />
                                                <div className="h-1.5 w-full rounded-xs bg-slate-200 dark:bg-white/10" />
                                                <div className="h-1.5 w-1/2 rounded-xs bg-slate-200 dark:bg-white/10" />
                                            </div>
                                        </div>

                                        {/* Label & Active Radio */}
                                        <div className="flex items-center justify-between pt-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <Pin size={14} className={navbarPosition === 'sticky' ? 'text-primary' : 'text-slate-500 dark:text-gray-400'} />
                                                <span className={cx('text-xs font-bold', navbarPosition === 'sticky' ? 'text-primary' : isDark ? 'text-white' : 'text-slate-800')}>
                                                    Sticky
                                                </span>
                                            </div>
                                            <div className={cx(
                                                'w-4 h-4 rounded-full flex items-center justify-center border transition-all',
                                                navbarPosition === 'sticky'
                                                    ? 'border-primary bg-primary text-white shadow-xs'
                                                    : 'border-slate-300 dark:border-white/20 bg-transparent'
                                            )}>
                                                {navbarPosition === 'sticky' && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Scroll Navbar Visual Tile */}
                                    <button
                                        type="button"
                                        aria-pressed={navbarPosition === 'scroll'}
                                        onClick={() => setNavbarPosition && setNavbarPosition('scroll')}
                                        className={cx(
                                            'p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 group',
                                            navbarPosition === 'scroll'
                                                ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-sm shadow-primary/20'
                                                : 'border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                                        )}
                                    >
                                        {/* Mini Scroll UI Window Mockup */}
                                        <div className="w-full h-14 rounded-xl bg-slate-100 dark:bg-gray-950 border border-slate-200 dark:border-white/10 p-1.5 flex flex-col gap-1 overflow-hidden shadow-inner">
                                            {/* Scrollable Topbar indicator */}
                                            <div className="h-3.5 rounded-xs border border-dashed border-slate-300 dark:border-white/30 bg-slate-200/50 dark:bg-white/5 flex items-center justify-between px-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white/40" />
                                                <ArrowDownUp size={8} className="text-slate-400 dark:text-white/50" />
                                            </div>
                                            {/* Content flowing */}
                                            <div className="flex-1 flex flex-col gap-1 pt-0.5">
                                                <div className="h-1.5 w-full rounded-xs bg-slate-300 dark:bg-white/20" />
                                                <div className="h-1.5 w-2/3 rounded-xs bg-slate-200 dark:bg-white/10" />
                                                <div className="h-1.5 w-4/5 rounded-xs bg-slate-200 dark:bg-white/10" />
                                            </div>
                                        </div>

                                        {/* Label & Active Radio */}
                                        <div className="flex items-center justify-between pt-0.5">
                                            <div className="flex items-center gap-1.5">
                                                <ArrowDownUp size={14} className={navbarPosition === 'scroll' ? 'text-primary' : 'text-slate-500 dark:text-gray-400'} />
                                                <span className={cx('text-xs font-bold', navbarPosition === 'scroll' ? 'text-primary' : isDark ? 'text-white' : 'text-slate-800')}>
                                                    Scroll
                                                </span>
                                            </div>
                                            <div className={cx(
                                                'w-4 h-4 rounded-full flex items-center justify-center border transition-all',
                                                navbarPosition === 'scroll'
                                                    ? 'border-primary bg-primary text-white shadow-xs'
                                                    : 'border-slate-300 dark:border-white/20 bg-transparent'
                                            )}>
                                                {navbarPosition === 'scroll' && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Primary Colors Showcase & Selector Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Palette size={14} className="text-primary" />
                                        <h3 className={cx(FONT_MONO, 'text-xs font-semibold uppercase tracking-wider', isDark ? 'text-gray-400' : 'text-slate-600')}>
                                            Primary Accent Color
                                        </h3>
                                    </div>
                                    <span className={cx('text-xs font-mono font-bold px-2 py-0.5 rounded-lg border', isDark ? 'bg-white/10 text-white/90 border-white/10' : 'bg-slate-100 text-slate-800 border-slate-200 shadow-2xs')}>
                                        {primaryColor.toUpperCase()}
                                    </span>
                                </div>

                                {/* Active Color Preview Banner */}
                                <div className={cx(
                                    'mb-3.5 p-3 rounded-2xl border flex items-center justify-between shadow-2xs transition-colors',
                                    isDark
                                        ? 'border-white/10 bg-white/5'
                                        : 'border-slate-200/80 bg-slate-50/70'
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md transition-colors"
                                            style={{ backgroundColor: primaryColor }}
                                        >
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <div className={cx('text-xs font-bold flex items-center gap-1.5', isDark ? 'text-white' : 'text-slate-900')}>
                                                <span>{PRIMARY_COLOR_PRESETS.find(p => p.color.toLowerCase() === primaryColor?.toLowerCase())?.name || 'Custom'} Theme</span>
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                                            </div>
                                            <p className={cx('text-xs', isDark ? 'text-gray-400' : 'text-slate-500')}>
                                                Applied to badges, buttons & telemetry
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Preset Color Cards Grid */}
                                <div className="grid grid-cols-4 gap-2.5">
                                    {PRIMARY_COLOR_PRESETS.map((preset) => {
                                        const isSelected = primaryColor?.toLowerCase() === preset.color.toLowerCase();
                                        return (
                                            <button
                                                key={preset.name}
                                                type="button"
                                                title={preset.name}
                                                aria-label={`Select ${preset.name} primary color`}
                                                onClick={() => changePrimaryColor && changePrimaryColor(preset.color)}
                                                className={cx(
                                                    'flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all duration-200 cursor-pointer group',
                                                    isSelected
                                                        ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-sm shadow-primary/20'
                                                        : 'border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100/80 dark:hover:bg-white/10'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs',
                                                        isSelected ? 'scale-110 shadow-md' : 'group-hover:scale-105'
                                                    )}
                                                    style={{ backgroundColor: preset.color }}
                                                >
                                                    {isSelected && <Check size={14} strokeWidth={3} className="text-white drop-shadow-sm" />}
                                                </div>
                                                <span className={cx(
                                                    'text-xs font-semibold tracking-tight truncate max-w-full',
                                                    isSelected
                                                        ? 'text-primary font-bold'
                                                        : isDark ? 'text-gray-400 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'
                                                )}>
                                                    {preset.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Custom Color Dropper & Hex Input */}
                                <div className={cx(
                                    'mt-3 flex items-center gap-2 p-1.5 rounded-xl border transition-colors',
                                    isDark
                                        ? 'border-white/10 bg-white/5'
                                        : 'border-slate-200/80 bg-slate-50/70'
                                )}>
                                    <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-slate-300 dark:border-white/20 cursor-pointer shadow-2xs">
                                        <input
                                            type="color"
                                            value={primaryColor}
                                            onChange={(e) => changePrimaryColor && changePrimaryColor(e.target.value)}
                                            className="absolute -inset-2 w-12 h-12 cursor-pointer opacity-0"
                                            aria-label="Pick custom primary color"
                                        />
                                        <div className="w-full h-full rounded-lg" style={{ backgroundColor: primaryColor }} />
                                    </div>
                                    <input
                                        type="text"
                                        value={primaryColor}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                                                if (val.length === 7) changePrimaryColor && changePrimaryColor(val);
                                            }
                                        }}
                                        placeholder="#22c55e"
                                        className={cx(
                                            'flex-1 bg-transparent text-xs font-mono font-medium focus:outline-none px-1',
                                            isDark ? 'text-gray-200' : 'text-slate-800'
                                        )}
                                    />
                                    <span className={cx('text-xs pr-2 font-medium', isDark ? 'text-gray-500' : 'text-slate-400')}>
                                        Custom HEX
                                    </span>
                                </div>
                            </div>

                            {/* Quick Page Scroll Functions Section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <MoveVertical size={14} className="text-primary" />
                                        <h3 className={cx(FONT_MONO, 'text-xs font-semibold uppercase tracking-wider', isDark ? 'text-gray-400' : 'text-slate-600')}>
                                            Quick Page Scroll
                                        </h3>
                                    </div>
                                    <span className={cx('text-xs font-medium px-2 py-0.5 rounded-lg border', isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200')}>
                                        Smooth Actions
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        aria-label="Scroll to top of page"
                                        onClick={scrollToTop}
                                        className={cx(
                                            'p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1.5 group',
                                            isDark
                                                ? 'border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 text-white'
                                                : 'border-slate-200/80 bg-slate-50/70 hover:border-primary/50 hover:bg-white text-slate-800 shadow-2xs'
                                        )}
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                            <ArrowUp size={16} />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold block">Scroll to Top</span>
                                            <span className={cx('text-2xs block', isDark ? 'text-gray-400' : 'text-slate-500')}>Jump to header</span>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        aria-label="Scroll to bottom of page"
                                        onClick={scrollToBottom}
                                        className={cx(
                                            'p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1.5 group',
                                            isDark
                                                ? 'border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10 text-white'
                                                : 'border-slate-200/80 bg-slate-50/70 hover:border-primary/50 hover:bg-white text-slate-800 shadow-2xs'
                                        )}
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                            <ArrowDown size={16} />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold block">Scroll to Bottom</span>
                                            <span className={cx('text-2xs block', isDark ? 'text-gray-400' : 'text-slate-500')}>Jump to footer</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default SettingsDrawer;
