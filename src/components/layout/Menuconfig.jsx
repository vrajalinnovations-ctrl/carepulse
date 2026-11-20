import {
    HeartPulse,
    Users,
    Calendar,
    Activity,
    Stethoscope,
    Bed,
    FlaskConical,
    Pill,
    Ambulance,
    Sliders,
    KeyRound,
    AlertCircle,
    Layers,
    BarChart3,
    Table2,
    BookOpen,
} from 'lucide-react';

export const menuItems = [
    { section: 'Dashboards & Clinical', title: 'Dashboards & Clinical' },
    { title: 'Clinical Overview', icon: <HeartPulse size={18} />, path: '/' },
    { title: 'Patient Directory', icon: <Users size={18} />, path: '/patients' },
    { title: 'Appointments', icon: <Calendar size={18} />, path: '/appointments' },
    { title: 'Vitals & Telemetry', icon: <Activity size={18} />, path: '/vitals' },

    { section: 'Hospital Operations', title: 'Hospital Operations' },
    { title: 'Physicians & Staff', icon: <Stethoscope size={18} />, path: '/staff' },
    { title: 'Wards & Beds', icon: <Bed size={18} />, path: '/wards' },
    { title: 'Lab Diagnostics', icon: <FlaskConical size={18} />, path: '/lab-results' },
    { title: 'Pharmacy & Meds', icon: <Pill size={18} />, path: '/pharmacy' },
    { title: 'Emergency & Triage', icon: <Ambulance size={18} />, path: '/emergency', badge: 'Live' },
    { title: 'Facility Settings', icon: <Sliders size={18} />, path: '/settings' },

    { section: 'Analytics & Records', title: 'Analytics & Records' },
    { title: 'Clinical Charts', icon: <BarChart3 size={18} />, path: '/charts' },
    { title: 'Records Table', icon: <Table2 size={18} />, path: '/tables' },

    { section: 'UI Components', title: 'UI Components' },
    {
        title: 'UI Elements',
        icon: <Layers size={18} />,
        submenu: [
            { title: 'Accordion', path: '/ui-elements/accordion' },
            { title: 'Alerts', path: '/ui-elements/alerts' },
            { title: 'Avatars', path: '/ui-elements/avatars' },
            { title: 'Badges', path: '/ui-elements/badges' },
            { title: 'Buttons', path: '/ui-elements/buttons' },
            { title: 'Breadcrumbs', path: '/ui-elements/breadcrumbs' },
            { title: 'Card', path: '/ui-elements/card' },
            { title: 'Dropdowns', path: '/ui-elements/dropdowns' },
            { title: 'Input', path: '/ui-elements/input' },
            { title: 'Modals', path: '/ui-elements/modals' },
            { title: 'Progress Bars', path: '/ui-elements/progressbars' },
            { title: 'Pagination', path: '/ui-elements/pagination' },
            { title: 'Spinner', path: '/ui-elements/spinner' },
            { title: 'Toasts', path: '/ui-elements/toaster' },
        ]
    },

    { section: 'Authentication & Pages', title: 'Authentication & Pages' },
    {
        title: 'Authentication',
        icon: <KeyRound size={18} />,
        submenu: [
            { title: 'Login', path: '/login' },
            { title: 'Register', path: '/register' },
            { title: 'Forgot Password', path: '/forgot-password' },
            { title: 'Reset Password', path: '/reset-password' },
            { title: 'Verify Email', path: '/verify-email' },
        ]
    },
    {
        title: 'Error Pages',
        icon: <AlertCircle size={18} />,
        submenu: [
            { title: '404 Not Found', path: '/404' },
            { title: '500 Server Error', path: '/500' }
        ]
    },

    { section: 'Documentation & Help', title: 'Documentation & Help' },
    { title: 'Documentation', icon: <BookOpen size={18} />, path: '/documentation/document.html', external: true, badge: 'v1.0' },
];