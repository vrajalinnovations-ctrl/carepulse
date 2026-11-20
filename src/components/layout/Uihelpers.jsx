

export const FONT_DISPLAY = 'font-display';
export const FONT_BODY = 'font-body';
export const FONT_MONO = 'font-mono';

export const cx = (...p) => p.filter(Boolean).join(' ');

export const EASE = 'ease-out';
export const SIDEBAR_EASE = 'ease-in-out';
export const SIDEBAR_TRANSITION = { duration: 0.32, ease: [0.32, 0.72, 0, 1] };

export const btnNeutral = (theme, extra = '') => cx(
    `w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${EASE} hover:scale-105 active:scale-95`,
    theme === 'dark'
        ? 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 shadow-sm hover:shadow-md'
        : 'bg-black/5 border border-black/5 text-gray-500 hover:text-gray-800 hover:bg-black/10 hover:border-black/10 shadow-sm hover:shadow-md',
    extra
);

export const btnPrimary = (theme, extra = '') => cx(
    `w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${EASE} group hover:scale-105 active:scale-95`,
    theme === 'dark'
        ? 'bg-white/5 border border-white/10 text-white/60 hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/20 shadow-sm hover:shadow-purple-500/10'
        : 'bg-black/5 border border-black/5 text-gray-400 hover:text-purple-600 hover:bg-purple-500/5 hover:border-purple-500/15 shadow-sm',
    extra
);

export const sectionHeaderClass = (theme) => (theme === 'dark' ? 'text-white/30' : 'text-gray-400');

export const dividerClass = (theme) => (theme === 'dark' ? 'bg-gradient-to-r from-white/10 via-white/5 to-transparent' : 'bg-gradient-to-r from-black/10 via-black/5 to-transparent');

export const navItemClass = (theme, isActive) => cx(
    `relative w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${EASE} group`,
    isActive
        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
        : theme === 'dark'
            ? 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 hover:shadow-sm'
            : 'text-gray-500 hover:text-gray-900 hover:bg-black/5 border border-transparent hover:border-black/5 hover:shadow-sm'
);

export const dropdownBtnClass = (theme) => cx(
    `relative w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${EASE} group`,
    theme === 'dark'
        ? 'hover:bg-white/5 text-white/60 hover:text-white border border-transparent hover:border-white/10'
        : 'hover:bg-black/5 text-gray-500 hover:text-gray-900 border border-transparent hover:border-black/5'
);

export const subItemClass = (theme, isActive) => cx(
    `relative p-2.5 rounded-xl text-xs transition-all duration-300 ${EASE}`,
    isActive
        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 font-medium'
        : theme === 'dark'
            ? 'text-white/40 hover:bg-white/5 hover:text-white/80 border border-transparent hover:border-white/5'
            : 'text-gray-400 hover:bg-black/5 hover:text-gray-700 border border-transparent hover:border-black/5'
);

export const labelFade = (show) => cx(`overflow-hidden whitespace-nowrap transition-all duration-500 ${SIDEBAR_EASE}`, show ? 'max-w-36 opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0');