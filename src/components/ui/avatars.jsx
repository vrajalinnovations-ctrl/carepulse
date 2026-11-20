import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useTheme } from '../../context/theme-context';

const SIZE_MAP = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
    '2xl': 'w-16 h-16 text-2xl',
};

const RING_SOLID_MAP = {
    primary: 'ring-2 ring-primary-500',
    emerald: 'ring-2 ring-emerald-500',
    rose: 'ring-2 ring-rose-500',
    amber: 'ring-2 ring-amber-500',
    cyan: 'ring-2 ring-cyan-500',
    slate: 'ring-2 ring-slate-500',
    purple: 'ring-2 ring-purple-500',
    pink: 'ring-2 ring-pink-500',
    teal: 'ring-2 ring-teal-500',
    indigo: 'ring-2 ring-indigo-500',
};

const RING_GRADIENT_MAP = {
    primary: 'bg-linear-to-br from-primary-500 via-indigo-500 to-indigo-700',
    emerald: 'bg-linear-to-br from-emerald-500 via-teal-500 to-teal-700',
    rose: 'bg-linear-to-br from-rose-500 via-pink-500 to-pink-700',
    amber: 'bg-linear-to-br from-amber-400 via-orange-500 to-orange-600',
    cyan: 'bg-linear-to-br from-cyan-500 via-sky-500 to-blue-600',
    slate: 'bg-linear-to-br from-slate-500 via-slate-600 to-slate-800',
    purple: 'bg-linear-to-br from-fuchsia-500 via-violet-600 to-purple-700',
    pink: 'bg-linear-to-br from-pink-500 via-rose-500 to-rose-700',
    teal: 'bg-linear-to-br from-teal-500 via-emerald-500 to-emerald-700',
    indigo: 'bg-linear-to-br from-indigo-500 via-blue-600 to-blue-700',
};

const STATUS_DOT_MAP = {
    online: 'bg-emerald-500',
    idle: 'bg-amber-400',
    busy: 'bg-rose-500',
    offline: 'bg-gray-500',
};

const RADIUS_MAP = {
    full: 'rounded-full',
    lg: 'rounded-xl',
    md: 'rounded-lg',
};

const COLOR_MAP = {
    primary: {
        solid: 'bg-primary-600 text-white',
        soft: 'bg-primary-500/15 text-primary-200',
        outline: 'ring-1 ring-primary',
        border: 'border border-primary',
    },
    emerald: {
        solid: 'bg-emerald-600 text-white',
        soft: 'bg-emerald-500/15 border border-emerald-400/10 text-emerald-500',
        outline: 'border border-emerald-400/40 text-emerald-500',
        border: 'border-emerald-500/40',
    },
    rose: {
        solid: 'bg-rose-600 text-white',
        soft: 'bg-rose-500/15 border border-rose-400/10 text-rose-500',
        outline: 'border border-rose-400/40 text-rose-500',
        border: 'border-rose-500/40',
    },
    amber: {
        solid: 'bg-amber-600 text-white',
        soft: 'bg-amber-500/15 border border-amber-400/10 text-amber-500',
        outline: 'border border-amber-400/40 text-amber-500',
        border: 'border-amber-500/40',
    },
    cyan: {
        solid: 'bg-cyan-600 text-white',
        soft: 'bg-cyan-500/15 border border-cyan-400/10 text-cyan-500',
        outline: 'border border-cyan-400/40 text-cyan-500',
        border: 'border-cyan-500/40',
    },
    slate: {
        solid: 'bg-slate-600 text-white',
        soft: 'bg-slate-500/15 border border-slate-400/10 text-slate-500',
        outline: 'border border-slate-400/40 text-slate-500',
        border: 'border-slate-500/40',
    },
    purple: {
        solid: 'bg-purple-600 text-white',
        soft: 'bg-purple-500/15 border border-purple-400/10 text-purple-500',
        outline: 'border border-purple-400/40 text-purple-500',
        border: 'border-purple-500/40',
    },
    pink: {
        solid: 'bg-pink-600 text-white',
        soft: 'bg-pink-500/15 border border-pink-400/10 text-pink-500',
        outline: 'border border-pink-400/40 text-pink-500',
        border: 'border-pink-500/40',
    },
    teal: {
        solid: 'bg-teal-600 text-white',
        soft: 'bg-teal-500/15 border border-teal-400/10 text-teal-500',
        outline: 'border border-teal-400/40 text-teal-500',
        border: 'border-teal-500/40',
    },
    indigo: {
        solid: 'bg-indigo-600 text-white',
        soft: 'bg-indigo-500/15 border border-indigo-400/10 text-indigo-500',
        outline: 'border border-indigo-400/40 text-indigo-500',
        border: 'border-indigo-500/40',
    },
};

const getInitial = (name, letter) => {
    if (letter) return String(letter).slice(0, 1).toUpperCase();
    if (!name) return 'A';
    return String(name).trim().charAt(0).toUpperCase();
};

const Avatar = ({
    src,
    alt = '',
    name,
    type,
    icon,
    letter,
    size = 'md',
    rounded = 'full',
    variant = 'solid',
    color = 'primary',
    bordered = false,
    className = '',
    status,
    ring = 'none',
    elevated = false,
}) => {
    const { theme } = useTheme();

    const sizeCls = SIZE_MAP[size] || SIZE_MAP.md;
    const radCls = RADIUS_MAP[rounded] || RADIUS_MAP.full;
    const c = COLOR_MAP[color] || COLOR_MAP.slate;

    let mode = type;

    if (!mode) {
        mode = src ? 'image' : icon ? 'icon' : 'letter';
    }

    const surface =
        mode === 'image'
            ? ''
            : variant === 'outline'
                ? c.outline
                : variant === 'soft'
                    ? c.soft
                    : c.solid;

    const borderCls = bordered ? `border-2 ${c.border}` : '';

    const core = (
        <div
            className={`relative inline-flex items-center justify-center ${sizeCls} ${radCls} ${surface} ${borderCls} ${elevated ? 'shadow-sm' : ''
                } ${className}`}
            aria-label={name || alt}
        >
            {mode === 'image' ? (
                <img src={src} alt={alt || name || ''} className={`h-full w-full object-cover ${radCls}`} />
            ) : mode === 'icon' ? (
                <span className={`flex items-center justify-center rounded-full h-full w-full `}>
                    {icon || <FiUser />}
                </span>
            ) : (
                <span className='font-semibold select-none'>
                    {getInitial(name, letter)}
                </span>
            )}

            {!!status && (
                <span className={`absolute bottom-0 ltr:right-0 rtl:left-0 h-2.5 w-2.5 rounded-full ring-2 ring-gray-900 ${STATUS_DOT_MAP[status] || ''}`} />
            )}
        </div>
    );

    if (ring === 'solid') {
        const ringCls = RING_SOLID_MAP[color] || RING_SOLID_MAP.slate;

        return (
            <span className={`inline-flex items-center justify-center ${radCls} ${ringCls} p-1px`}>
                {core}
            </span>
        );
    }

    if (ring === 'gradient') {
        const grad = RING_GRADIENT_MAP[color] || RING_GRADIENT_MAP.indigo;

        return (
            <span className={`inline-flex items-center justify-center ${radCls} p-0.5px ${grad}`}>
                <span className={`bg-gray-900 ${radCls} p-px`}>
                    {core}
                </span>
            </span>
        );
    }

    return core;
};

// Avatar Group
Avatar.Group = ({ children, max = 5, size = 'md', overlap = '-ms-5', }) => {
    const all = React.Children.toArray(children);
    const visible = all.slice(0, max);
    const extra = all.length - visible.length;

    return (
        <div className='flex items-center'>
            {visible.map((child, i) => (
                <div key={i} className={`${i > 0 ? overlap : ''} inline-flex`}>
                    {child}
                </div>
            ))}

            {extra > 0 && (
                <div className={`${overlap} inline-flex`}>
                    <Avatar type='letter' letter={`+${extra}`} size={size} variant='soft' color='slate' />
                </div>
            )}
        </div>
    );
};

export default Avatar; 