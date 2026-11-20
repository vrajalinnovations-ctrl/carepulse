import React from 'react';

// Badge component
// Props:
// - variant: 'solid' | 'outline' | 'soft'
// - color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'purple' | 'pink' | 'teal' | 'indigo'
// - rounded: 'default' | 'pill'
// - size: 'sm' | 'md' | 'lg'
// - dot: boolean (render a small dot instead of text)
// - leftIcon: React element (icon on the left)
// - rightIcon: React element (icon on the right)
// - onlyIcon: boolean (render only icon, no text)
// - className: string
// - children: label (ignored if dot=true or onlyIcon=true)

const palette = {
  primary: {
    solid: 'bg-primary text-white',
    outline: ' border border-primary/40 text-primary',
    soft: 'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary-200 border border-primary/30',
    dot: 'bg-primary',
  },
  secondary: {
    solid: 'bg-slate-700 text-white',
    outline: 'border border-slate-500/60 text-slate-500',
    soft: 'bg-slate-100 dark:bg-slate-500/15 text-slate-700 dark:text-slate-200 border border-slate-500/40',
    dot: 'bg-slate-500',
  },
  success: {
    solid: 'bg-emerald-600 text-white',
    outline: 'border border-emerald-500/60 text-emerald-500',
    soft: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-500 border border-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  danger: {
    solid: 'bg-rose-600 text-white',
    outline: 'border border-rose-500/60 text-rose-500',
    soft: 'bg-rose-50 dark:bg-rose-500/15 text-rose-500 border border-rose-500/20',
    dot: 'bg-rose-500',
  },
  warning: {
    solid: 'bg-amber-500 text-white',
    outline: 'border border-amber-500/60 text-amber-500',
    soft: 'bg-amber-50 dark:bg-amber-500/15 text-amber-500 border border-amber-500/20',
    dot: 'bg-amber-400',
  },
  info: {
    solid: 'bg-cyan-600 text-white',
    outline: 'border border-cyan-500/60 text-cyan-500',
    soft: 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-500 border border-cyan-500/20',
    dot: 'bg-cyan-500',
  },
  purple: {
    solid: 'bg-purple-600 text-white',
    outline: 'border border-purple-500/60 text-purple-500',
    soft: 'bg-purple-50 dark:bg-purple-500/15 text-purple-500 border border-purple-500/20',
    dot: 'bg-purple-500',
  },
  pink: {
    solid: 'bg-pink-600 text-white',
    outline: 'border border-pink-500/60 text-pink-500',
    soft: 'bg-pink-50 dark:bg-pink-500/15 text-pink-500 border border-pink-500/20',
    dot: 'bg-pink-500',
  },
  teal: {
    solid: 'bg-teal-600 text-white',
    outline: 'border border-teal-500/60 text-teal-500',
    soft: 'bg-teal-50 dark:bg-teal-500/15 text-teal-500 border border-teal-500/20',
    dot: 'bg-teal-500',
  },
  indigo: {
    solid: 'bg-indigo-600 text-white',
    outline: 'border border-indigo-500/60 text-indigo-500',
    soft: 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-500 border border-indigo-500/20',
    dot: 'bg-indigo-500',
  },
}

const sizeMap = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-xs px-2.5 py-0.5',
  lg: 'text-sm px-3 py-1',
}

const iconSizeMap = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
}

const onlyIconSizeMap = {
  sm: 'w-5 h-5 p-1',
  md: 'w-6 h-6 p-1.5',
  lg: 'w-7 h-7 p-1.5',
}

const radiusMap = {
  default: 'rounded-md',
  pill: 'rounded-full',
}

const Badges = ({
  children,
  variant = 'solid',
  color = 'secondary',
  rounded = 'default',
  size = 'md',
  dot = false,
  leftIcon,
  rightIcon,
  onlyIcon = false,
  className = '',
}) => {
  const pal = palette[color] || palette.secondary
  const base = dot ? pal.dot : pal[variant]
  const sz = sizeMap[size] || sizeMap.md
  const iconSz = iconSizeMap[size] || iconSizeMap.md
  const onlyIconSz = onlyIconSizeMap[size] || onlyIconSizeMap.md
  const rd = radiusMap[rounded] || radiusMap.default

  // Dot variant
  if (dot) {
    return <span className={`inline-block h-2.5 w-2.5 ${pal.dot} ${rd} ${className}`} />
  }

  // Only icon variant
  if (onlyIcon && (leftIcon || rightIcon)) {
    const icon = leftIcon || rightIcon
    return (
      <span className={`inline-flex items-center justify-center ${onlyIconSz} ${rd} ${base} ${className}`}>
        {React.cloneElement(icon, { className: `${iconSz} ${icon.props.className || ''}` })}
      </span>
    )
  }

  // Regular badge with optional icons
  return (
    <span className={`inline-flex items-center font-medium ${sz} ${rd} ${base} ${className}`}>
      {leftIcon && (
        <span className="ltr:mr-1.5 rtl:ml-1.5">
          {React.cloneElement(leftIcon, { className: `${iconSz} ${leftIcon.props.className || ''}` })}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className="ltr:ml-1.5 rtl:mr-1.5">
          {React.cloneElement(rightIcon, { className: `${iconSz} ${rightIcon.props.className || ''}` })}
        </span>
      )}
    </span>
  )
}

// Positioned badge wrapper
Badges.Positioned = ({ children, content, position = 'top-right', ...badgeProps }) => {
  const posMap = {
    'top-right': 'top-0 ltr:right-0 rtl:left-0 ltr:translate-x-1/3 rtl:-translate-x-1/3 -translate-y-1/3',
    'top-left': 'top-0 ltr:left-0 rtl:right-0 ltr:-translate-x-1/3 rtl:translate-x-1/3 -translate-y-1/3',
    'bottom-right': 'bottom-0 ltr:right-0 rtl:left-0 ltr:translate-x-1/3 rtl:-translate-x-1/3 translate-y-1/3',
    'bottom-left': 'bottom-0 ltr:left-0 rtl:right-0 ltr:-translate-x-1/3 rtl:translate-x-1/3 translate-y-1/3',
  }
  const pos = posMap[position] || posMap['top-right']
  return (
    <div className='relative inline-flex'>
      {children}
      <span className={`absolute ${pos}`}>
        {typeof content === 'string' || typeof content === 'number'
          ? <Badges {...badgeProps}>{content}</Badges>
          : content}
      </span>
    </div>
  )
}

export default Badges;
