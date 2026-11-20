import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, AlignJustify } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSm from '../../assets/logo/logo-sm.png';
import { cx, SIDEBAR_TRANSITION, FONT_DISPLAY, FONT_MONO, FONT_BODY } from './Uihelpers';
import { menuItems } from './Menuconfig';

const Sidebar = ({
    isDark = true,
    direction = 'ltr',
    sidebarOpen = true,
    mobileSidebar = false,
    isHovered = false,
    isLgUp = true,
    expandedMenus = {},
    sidebarRef = null,
    onHoverEnter,
    onHoverLeave,
    toggleMenu,
    goTo,
}) => {
    const location = useLocation();
    const isSidebarExpanded = sidebarOpen || isHovered || mobileSidebar;
    const sidebarWidth = isSidebarExpanded ? 260 : 72;
    const isOffscreen = !isLgUp && !mobileSidebar;
    const sidebarX = isOffscreen ? (direction === 'ltr' ? -300 : 300) : 0;

    // Smooth motion variants for label text reveal
    const textXOffset = direction === 'rtl' ? 6 : -6;
    const labelMotion = {
        animate: {
            opacity: isSidebarExpanded ? 1 : 0,
            x: isSidebarExpanded ? 0 : textXOffset,
        },
        transition: {
            duration: isSidebarExpanded ? 0.24 : 0.16,
            ease: [0.32, 0.72, 0, 1],
        },
    };

    return (
        <motion.aside
            ref={sidebarRef}
            role="navigation"
            aria-label="Sidebar Navigation"
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            animate={{ width: sidebarWidth, x: sidebarX }}
            transition={SIDEBAR_TRANSITION}
            data-lenis-prevent
            className={cx(
                'fixed z-50 lg:z-40 flex flex-col select-none overflow-hidden backdrop-blur-2xl',
                'top-0 bottom-0 h-screen',
                direction === 'ltr' ? 'left-0 border-r' : 'right-0 border-l',
                isDark
                    ? 'bg-transparent border-white/10 text-white'
                    : 'bg-transparent border-slate-200/60 text-slate-800'
            )}
        >
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                <div className={cx("absolute top-0 bottom-0 w-px bg-gradient-to-b", direction === 'ltr' ? 'right-0' : 'left-0', isDark ? 'from-white/30 via-white/10 to-transparent' : 'from-white/90 via-white/40 to-transparent')} />
                <div className={cx("absolute top-0 left-0 right-0 h-px", isDark ? "bg-white/20" : "bg-white/80")} />
                <div className={cx("absolute inset-0 bg-gradient-to-b opacity-30", isDark ? "from-white/10 via-transparent to-transparent" : "from-white/50 via-transparent to-transparent")} />
            </div>

            {isDark && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                    <div className="absolute -top-16 -left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl transition-colors duration-500" />
                    <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-primary/15 blur-3xl transition-colors duration-500" />
                </div>
            )}

            <div className={cx('relative h-16 flex items-center px-3.5 shrink-0 border-b overflow-hidden', isDark ? 'border-white/10' : 'border-slate-200/60')}>
                <div className="flex items-center flex-1 min-w-0">
                    <div className="relative shrink-0 group cursor-pointer" onClick={() => goTo && goTo('/')}>
                        <img
                            src={logoSm}
                            alt="CarePulse Logo"
                            className="w-9 h-9 rounded-xl object-contain transition-all duration-300 group-hover:scale-105"
                        />
                    </div>

                    {isSidebarExpanded && (
                        <div
                            className="ms-3 flex-1 flex flex-col justify-center cursor-pointer min-w-0"
                            onClick={() => goTo && goTo('/')}
                        >
                            <div className="flex items-center gap-1.5">
                                <span className={cx(FONT_DISPLAY, 'text-base font-bold tracking-tight text-slate-900 dark:text-white truncate')}>
                                    CarePulse
                                </span>
                                <span className="px-1.5 py-0.5 text-xs font-mono font-bold rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 leading-none shrink-0">
                                    PRO
                                </span>
                            </div>
                            <span className={cx(FONT_MONO, 'text-xs tracking-wider uppercase font-semibold leading-none mt-1 truncate',
                                isDark ? 'text-zinc-400' : 'text-slate-500')}>
                                Hospital &amp; Clinical
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <nav aria-label="Sidebar Menu" data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3 flex flex-col gap-1 drawer-scroll scrollbar-none">
                {menuItems.map((item, index) => {
                    if (item.section) {
                        const sectionTitle = typeof item.section === 'string' ? item.section : (item.title || '');
                        return (
                            <div key={`section-${index}`} className="pt-3 pb-1 first:pt-1">
                                {isSidebarExpanded ? (
                                    <div className="px-3 py-1 flex items-center justify-between">
                                        <span className={cx(FONT_MONO, 'text-xs font-bold uppercase tracking-wider block shrink-0',
                                            isDark ? 'text-zinc-400' : 'text-slate-500')}>
                                            {sectionTitle}
                                        </span>
                                        <div className={cx('flex-1 ms-3 h-px', isDark ? 'bg-white/10' : 'bg-slate-200')} />
                                    </div>
                                ) : (
                                    <div className={cx('w-6 h-px mx-auto my-2', isDark ? 'bg-white/10' : 'bg-black/10')} />
                                )}
                            </div>
                        );
                    }

                    const hasActiveChild = item.submenu?.some((sub) => sub.path === location.pathname);
                    const isExpanded = expandedMenus[item.title] !== undefined
                        ? Boolean(expandedMenus[item.title])
                        : hasActiveChild;

                    if (item.external) {
                        return (
                            <a key={item.path || `nav-${index}`}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                            >
                                <div className={cx(
                                    'relative flex items-center w-full h-11 px-3 rounded-xl transition-all duration-200 group cursor-pointer text-start',
                                    isDark
                                        ? 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-black/5 border border-transparent hover:border-black/10'
                                )}>
                                    <span className={cx(
                                        'w-5 h-5 shrink-0 flex items-center justify-center transition-colors duration-200',
                                        isDark ? 'text-white/50 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-700'
                                    )}>
                                        {item.icon}
                                    </span>
                                    <motion.div initial={false} {...labelMotion}
                                        className="overflow-hidden whitespace-nowrap ms-3 flex-1 flex items-center justify-between">
                                        <span className={cx(FONT_BODY, 'text-sm truncate font-normal')}>
                                            {item.title}
                                        </span>
                                        {item.badge && (
                                            <span className="ms-2 px-1.5 py-0.5 text-xs font-mono font-bold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 leading-none">
                                                {item.badge}
                                            </span>
                                        )}
                                    </motion.div>
                                </div>
                            </a>
                        );
                    }
                    if (!item.submenu) {
                        return (
                            <NavLink key={item.path || `nav-${index}`}
                                to={item.path}
                                onClick={() => goTo && goTo(item.path)}
                                className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                            >
                                {({ isActive }) => (
                                    <div className={cx(
                                        'relative flex items-center w-full h-11 px-3 rounded-xl transition-all duration-200 group cursor-pointer text-start',
                                        isActive
                                            ? isDark
                                                ? 'bg-white/10 border border-white/15 text-white shadow-sm backdrop-blur-md'
                                                : 'bg-slate-900/10 border border-slate-900/10 text-slate-900 shadow-sm font-medium'
                                            : isDark
                                                ? 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                                                : 'text-slate-500 hover:text-slate-900 hover:bg-black/5 border border-transparent hover:border-black/10'
                                    )}>
                                        <span className={cx(
                                            'w-5 h-5 shrink-0 flex items-center justify-center transition-colors duration-200',
                                            isActive
                                                ? isDark ? 'text-white' : 'text-slate-900'
                                                : isDark ? 'text-white/50 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-700'
                                        )}>
                                            {item.icon}
                                        </span>

                                        <motion.div
                                            initial={false}
                                            {...labelMotion}
                                            className="overflow-hidden whitespace-nowrap ms-3 flex-1 flex items-center justify-between"
                                        >
                                            <span className={cx(FONT_BODY, 'text-sm truncate', isActive ? 'font-semibold' : 'font-normal')}>
                                                {item.title}
                                            </span>
                                            <div className="flex items-center gap-1.5 ms-2 shrink-0">
                                                {item.badge && (
                                                    <span className={cx(
                                                        "px-1.5 py-0.5 text-xs font-mono font-bold rounded-md leading-none",
                                                        isActive
                                                            ? "bg-white/20 text-white"
                                                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                                    )}>
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {isActive && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-sm" aria-hidden="true" />
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </NavLink>
                        );
                    }

                    // Collapsible dropdown menu
                    return (
                        <div key={`dropdown-${item.title || index}`}>
                            <button
                                type="button"
                                aria-expanded={isExpanded}
                                aria-haspopup="true"
                                onClick={() => toggleMenu && toggleMenu(item.title)}
                                className={cx(
                                    'relative flex items-center w-full h-11 px-3 rounded-xl transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer text-start',
                                    isDark
                                        ? 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-black/5 border border-transparent hover:border-black/10'
                                )}
                            >
                                <span className={cx('w-5 h-5 shrink-0 flex items-center justify-center transition-colors', isDark ? 'text-white/50 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-700')}>
                                    {item.icon}
                                </span>

                                <motion.div
                                    initial={false}
                                    {...labelMotion}
                                    className="overflow-hidden whitespace-nowrap ms-3 flex-1 flex items-center justify-between"
                                >
                                    <span className={cx(FONT_BODY, 'text-sm truncate font-normal')}>
                                        {item.title}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={cx('transition-transform duration-300 shrink-0 ms-2', isExpanded ? 'rotate-180' : 'rotate-0',
                                            isDark ? 'text-white/40' : 'text-slate-400')}
                                        aria-hidden="true"
                                    />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isSidebarExpanded && isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className={cx(
                                            'ms-6 border-s ps-3 mt-1 flex flex-col gap-0.5 pb-1',
                                            isDark ? 'border-white/10' : 'border-slate-200'
                                        )}>
                                            {item.submenu.map((sub, sIdx) => (
                                                <NavLink
                                                    key={sub.path || `sub-${sIdx}`}
                                                    to={sub.path}
                                                    onClick={() => goTo && goTo(sub.path)}
                                                    className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                                                >
                                                    {({ isActive }) => (
                                                        <div className={cx(
                                                            'relative px-3 py-2 rounded-lg text-sm transition-all duration-200 text-start',
                                                            isActive
                                                                ? isDark
                                                                    ? 'text-white bg-white/10 font-medium'
                                                                    : 'text-slate-900 bg-black/5 font-medium'
                                                                : isDark
                                                                    ? 'text-white/50 hover:text-white hover:bg-white/5'
                                                                    : 'text-slate-500 hover:text-slate-800 hover:bg-black/5'
                                                        )}>
                                                            {isActive && (
                                                                <span
                                                                    className={cx(
                                                                        'absolute start-0 top-1/2 -translate-y-1/2 w-0.5 h-3 ltr:rounded-r-full rtl:rounded-l-full',
                                                                        isDark ? 'bg-white' : 'bg-slate-900'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            {sub.title}
                                                        </div>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </nav>

            {/* User Profile Footer Section */}
            <div className={cx(
                'mt-auto p-3 border-t overflow-hidden shrink-0 backdrop-blur-md',
                isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50/50'
            )}>
                <div className={cx(
                    'flex items-center gap-3 p-1.5 rounded-2xl transition-colors duration-200 cursor-pointer group',
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                )}>
                    <div className="relative shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-emerald-500/30">
                            Dr
                        </div>
                        <span className="absolute bottom-0 end-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-dark-surface" />
                    </div>
                    <motion.div
                        initial={false}
                        {...labelMotion}
                        className="overflow-hidden whitespace-nowrap flex-1 flex items-center justify-between text-start"
                    >
                        <div className="min-w-0 pe-2">
                            <p className="text-sm font-semibold truncate dark:text-white leading-tight">
                                Dr. Sarah Mitchell
                            </p>
                            <p className="text-xs dark:text-white/50 truncate leading-tight mt-0.5">
                                Chief Medical Officer · #CP-9082
                            </p>
                        </div>
                        <div className="dark:text-white/50 group-hover:text-white shrink-0">
                            <AlignJustify size={16} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;