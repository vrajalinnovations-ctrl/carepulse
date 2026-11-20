import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/theme-context';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import SettingsDrawer from './Settingsdrawer';
import Toaster from '../ui/toaster';
import { cx, SIDEBAR_TRANSITION, FONT_BODY } from './Uihelpers';


const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {  theme, direction, toggleTheme, toggleDirection, primaryColor, changePrimaryColor, navbarPosition, setNavbarPosition,  toggleNavbarPosition, } = useTheme();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
    const [mobileSidebar, setMobileSidebar] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [isLgUp, setIsLgUp] = useState(window.innerWidth >= 1024);
    const sidebarRef = useRef(null);
    const hoverTimeoutRef = useRef(null);

    const isSidebarExpanded = sidebarOpen || isHovered || mobileSidebar;
    const isDark = theme === 'dark';

    
    const contentPush = isLgUp ? (sidebarOpen ? 260 : 72) : 0;
    const contentMargin = {
        marginLeft: direction === 'ltr' ? contentPush : 0,
        marginRight: direction === 'rtl' ? contentPush : 0,
    };

    const toggleMenu = (title) => setExpandedMenus((prev) => {
        if (prev[title]) return { ...prev, [title]: false };
        const closed = Object.fromEntries(Object.keys(prev).map((k) => [k, false]));
        return { ...closed, [title]: true };
    });

    const goTo = (path) => {
        setMobileSidebar(false);
        setTimeout(() => navigate(path), 250);
    };

    useEffect(() => {
        setMobileSidebar(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setSidebarOpen(width >= 1024);
            setIsLgUp(width >= 1024);
            if (width >= 1024) {
                setMobileSidebar(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onHoverEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setIsHovered(true);
    };

    const onHoverLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 120);
    };

    return (
        <div dir={direction} className={cx(FONT_BODY, 'min-h-screen flex relative w-full', isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900')}>

    
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
                <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/25 blur-3xl transition-all duration-700" />
                <div className="absolute -top-20 -start-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-teal-500/15 dark:bg-teal-500/10 blur-3xl transition-all duration-700" />
                <div className="absolute -bottom-20 -end-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-emerald-500/15 dark:bg-emerald-500/10 blur-3xl transition-all duration-700" />       
                <div className="absolute top-2/3 -start-20 w-80 h-80 rounded-full bg-primary/15 dark:bg-primary/10 blur-3xl transition-all duration-700" />           
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-teal-500/5 dark:from-primary/10 dark:via-transparent dark:to-teal-500/10 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/10 dark:from-white/5 to-transparent blur-2xl pointer-events-none" />
            </div>

            <AnimatePresence>
                {mobileSidebar && (
                    <motion.div  initial={{ opacity: 0 }}   animate={{ opacity: 1 }}  exit={{ opacity: 0 }}  transition={{ duration: 0.25 }}  onClick={() => setMobileSidebar(false)}  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"aria-hidden="true"/>
                )}
            </AnimatePresence>

            {/* Sticky Docked Sidebar */}
            <Sidebar
                isDark={isDark}
                direction={direction}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                mobileSidebar={mobileSidebar}
                isHovered={isHovered}
                isLgUp={isLgUp}
                expandedMenus={expandedMenus}
                sidebarRef={sidebarRef}
                onHoverEnter={onHoverEnter}
                onHoverLeave={onHoverLeave}
                toggleMenu={toggleMenu}
                goTo={goTo}
            />

            {/* Main Content Viewport */}
            <motion.div
                animate={contentMargin}
                transition={SIDEBAR_TRANSITION}
                className="flex-1 flex flex-col min-h-screen relative z-10 min-w-0 w-full"
            >
                <Navbar
                    isDark={isDark}
                    direction={direction}
                    navbarPosition={navbarPosition}
                    isSidebarExpanded={isSidebarExpanded}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    setMobileSidebar={setMobileSidebar}
                    toggleTheme={toggleTheme}
                    settingsOpen={settingsOpen}
                    setSettingsOpen={setSettingsOpen}
                />

                {/* Primary Page Outlet & Footer */}
                <main role="main" className="flex-1 flex flex-col justify-between relative min-w-0 w-full">
                    <div className="flex-1 relative z-10 min-w-0 w-full">
                        <Outlet />
                    </div>
                    <div className="relative z-10 mt-6">
                        <Footer />
                    </div>
                </main>
            </motion.div>

            {/* Settings Customization Drawer */}
            <SettingsDrawer
                theme={theme}
                isDark={isDark}
                direction={direction}
                navbarPosition={navbarPosition}
                setNavbarPosition={setNavbarPosition}
                toggleNavbarPosition={toggleNavbarPosition}
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
                toggleTheme={toggleTheme}
                toggleDirection={toggleDirection}
                primaryColor={primaryColor}
                changePrimaryColor={changePrimaryColor}
            />

            {/* Global Toaster Alerts */}
            <Toaster />
        </div>
    );
};

export default MainLayout;