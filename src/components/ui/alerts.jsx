import React from 'react';
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiXCircle, FiX } from 'react-icons/fi';
import Button from "./buttons";

const COLOR_MAP = {
  primary: {
    solid: "bg-primary text-white hover:opacity-90",
    outline: "text-primary border border-primary/30 hover:bg-primary/10",
    soft: "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20",
    link: "text-primary underline decoration-primary/60 hover:decoration-primary",
    linkOutline: "text-primary underline decoration-primary/60 hover:decoration-primary",
    icon: "text-primary",
  },


  success: {
    solid: "bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-300",
    outline: "border border-emerald-500/30 text-emerald-600  hover:bg-emerald-500/10",
    soft: "bg-emerald-500/10 text-emerald-700  border border-emerald-500/30 hover:bg-emerald-500/20",
    link: "text-emerald-600   underline decoration-emerald-400 hover:decoration-emerald-600",
    linkOutline: "text-emerald-700   underline decoration-emerald-400 hover:decoration-emerald-600",
    icon: "text-emerald-500   ",
  },

  danger: {
    solid: "bg-rose-500 text-white hover:bg-rose-400  active:bg-rose-300",
    outline: "border border-rose-500/30 text-rose-600 hover:bg-rose-500/10",
    soft: "bg-rose-500/10 text-rose-700   border border-rose-500/30 hover:bg-rose-500/20",
    link: "text-rose-600   underline decoration-rose-400 hover:decoration-rose-600",
    linkOutline: "text-rose-700   underline decoration-rose-400 hover:decoration-rose-600",
    icon: "text-rose-500   ",
  },

  warning: {
    solid: "bg-amber-400 text-white hover:bg-amber-300 active:bg-amber-200",
    outline: "border border-amber-500/30 text-amber-600   hover:bg-amber-400/10",
    soft: "bg-amber-500/10 text-amber-600  border border-amber-500/30 hover:bg-amber-600/20",
    link: "text-amber-600  underline decoration-amber-400 hover:decoration-amber-600",
    linkOutline: "text-amber-700   underline decoration-amber-400 hover:decoration-amber-600",
    icon: "text-amber-500   ",
  },

  info: {
    solid: "bg-cyan-500 text-white hover:bg-cyan-400 active:bg-cyan-300",
    outline: "border border-cyan-500/30 text-cyan-600   hover:bg-cyan-500/10",
    soft: "bg-indigo-500/10 text-cyan-600  border border-cyan-500/30 hover:bg-cyan-600/20",
    link: "text-cyan-600  underline decoration-cyan-400 hover:decoration-cyan-600",
    linkOutline: "text-cyan-700   underline decoration-cyan-400 hover:decoration-cyan-600",
    icon: "text-cyan-500   ",
  },

  purple: {
    solid: "bg-purple-600 text-white hover:bg-purple-500 active:bg-purple-700",
    outline: "border border-purple-500/30 text-purple-600   hover:bg-purple-600/10",
    soft: "bg-purple-500/10 text-purple-600  border border-purple-500/30 hover:bg-purple-600/20",
    link: "text-purple-600  underline decoration-purple-400 hover:decoration-purple-600",
    linkOutline: "text-purple-700   underline decoration-purple-400 hover:decoration-purple-600",
    icon: "text-purple-500   ",
  },

  pink: {
    solid: "bg-pink-600 text-white hover:bg-pink-500 active:bg-pink-700",
    outline: "border border-pink-500/30 text-pink-600 hover:bg-pink-600/10",
    soft: "bg-pink-500/10 text-pink-600 border border-pink-500/30 hover:bg-pink-600/20",
    link: "text-pink-600 underline decoration-pink-400 hover:decoration-pink-600",
    linkOutline: "text-pink-700 underline decoration-pink-400 hover:decoration-pink-600",
    icon: "text-pink-500 ",
  },

  teal: {
    solid: "bg-teal-600 text-white hover:bg-teal-500 active:bg-teal-700",
    outline: "border border-teal-500/30 text-teal-600 hover:bg-teal-600/10",
    soft: "bg-teal-500/10 text-teal-600 border border-teal-500/30 hover:bg-teal-600/20",
    link: "text-teal-600 underline decoration-teal-400 hover:decoration-teal-600",
    linkOutline: "text-teal-700 underline decoration-teal-400 hover:decoration-teal-600",
    icon: "text-teal-500",
  },

  indigo: {
    solid: "bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700",
    outline: "border border-indigo-500/30 text-indigo-600 hover:bg-indigo-600/10",
    soft: "bg-indigo-500/10 text-indigo-600 border border-indigo-500/30 hover:bg-indigo-600/20",
    link: "text-indigo-600 underline decoration-indigo-400 hover:decoration-indigo-600",
    linkOutline: "text-indigo-700 underline decoration-indigo-400 hover:decoration-indigo-600",
    icon: "text-indigo-500 ",
  },
};

const Default_Icon = {
  success: <FiCheckCircle />,
  info: <FiInfo />,
  warning: <FiAlertTriangle />,
  danger: <FiXCircle />,

}


const Alerts = ({
  variant = 'solid',
  color = 'primary',
  title,
  children,
  withIcon = false,
  icon,
  onClose,
  className = '',
}) => {

  const c = COLOR_MAP[color] || COLOR_MAP.primary
  const base = 'rounded-lg p-4 text-sm flex items-start gap-3 ltr:text-left rtl:text-right'
  // Look up the class string directly by variant name so every variant
  // (including link/linkOutline) gets its own styling instead of
  // silently falling back to the solid style.
  const style = c[variant] ?? c.solid

  return (
    <div className={`${base} ${style} ${className}`}>
      {withIcon && (
        <span className={`text-xl leading-none ${variant === 'outline' ? '' : c.icon}`}>
          {icon || (color === 'success' ? Default_Icon.success : color === 'warning' ? Default_Icon.warning : color === 'danger' ? Default_Icon.danger : Default_Icon.info)}
        </span>
      )}
      <div className='flex-1'>
        {title && <div className='font-medium mb-0.5'>{title}</div>}
        {children && <div className='leading-relaxed'>{children}</div>}
      </div>
      {onClose && (
        <Button iconOnly leftIcon={<FiX />} variant='ghost' size='xs' onClick={onClose} aria-label='Dismiss' />
      )}
    </div>
  )
}

export default Alerts;