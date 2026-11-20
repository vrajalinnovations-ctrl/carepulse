import React, { forwardRef, memo } from "react";
import { FiLoader } from "react-icons/fi";
import RainbowButton from "./rainbow-button";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const variants = {
  buy: {
    solid: "bg-emerald-500 text-white hover:bg-emerald-400  border border-emerald-400/20 shadow-xl shadow-emerald-500/25",
    outline: "text-emerald-400 border border-emerald-400/30 hover:bg-emerald-500/10 hover:border-emerald-500/40   ",
    ghost: "text-emerald-400 hover:text-emerald-400 hover:bg-emerald-500/10 ",
    soft: "text-emerald-400 bg-emerald-500/20 border border-emerald-400/30 hover:bg-emerald-500/30 hover:text-emerald-500 hover:border-emerald-500/40",
    gradient: "bg-linear-to-r from-emerald-400 to-green-500 text-gray-950 hover:opacity-95 shadow-2xl shadow-emerald-500/35",
    iconGhost: "text-emerald-500 hover:bg-emerald-500/15 rounded-lg",
  },

  sell: {
    solid: "bg-rose-500 text-white hover:bg-rose-400  border border-rose-400/20 shadow-xl shadow-rose-500/25",
    outline: "text-rose-400 border border-rose-400/30 hover:bg-rose-500 hover:border-rose-400/40 hover:text-rose-100 ",
    ghost: " text-rose-400 hover:text-white hover:bg-rose-500/40 ",
    soft: "text-rose-400 bg-rose-500/20 border border-rose-400/30 hover:bg-rose-500/30 hover:text-rose-500 hover:border-rose-500/40",
    gradient: "bg-linear-to-r from-rose-500 to-red-600 text-white hover:opacity-95 shadow-2xl shadow-rose-500/35",
    iconGhost: "text-rose-500 hover:bg-rose-500/15 rounded-lg",
  },

  purple: {
    solid: "bg-violet-600 text-white border-violet-500 hover:bg-violet-500 shadow-xl shadow-violet-500/25",
    outline: "text-violet-400 border border-violet-400/30 hover:bg-violet-500/20  hover:border-violet-500/40",
    ghost: " text-violet-400  hover:bg-violet-500/20",
    soft: "text-violet-500 bg-violet-500/30 border border-violet-400/30 hover:bg-violet-500/30 hover:text-violet-400 hover:border-violet-400/30",
    gradient: "bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:opacity-95",
    iconGhost: "text-violet-400 hover:bg-violet-500/15 rounded-lg",
  },
  pink: {
    solid: "bg-pink-600 text-white border-pink-500 hover:bg-pink-500 shadow-xl shadow-pink-500/25",
    outline: "text-pink-400 border border-pink-400/30 hover:bg-pink-500/20 hover:text-pink-500 hover:border-pink-500/40",
    ghost: "text-pink-400 hover:bg-pink-500/10",
    soft: "text-pink-500 bg-pink-500/20 border border-pink-400/30 hover:bg-pink-500/30 hover:text-pink-500 hover:border-pink-400/30",
    gradient: "bg-linear-to-r from-pink-500 to-rose-500 text-white hover:opacity-95 shadow-2xl shadow-pink-500/35",
    iconGhost: "text-pink-400 hover:bg-pink-500/15 rounded-lg",
  },
  teal: {
    solid: "bg-teal-600 text-white border-teal-500 hover:bg-teal-500 shadow-xl shadow-teal-500/25",
    outline: "text-teal-400 border border-teal-400/30 hover:bg-teal-500/20 hover:text-teal-500 hover:border-teal-500/40",
    ghost: "text-teal-400 hover:bg-teal-500/10",
    soft: "text-teal-500 bg-teal-500/20 border border-teal-400/30 hover:bg-teal-500/30 hover:text-teal-500 hover:border-teal-400/30",
    gradient: "bg-linear-to-r from-teal-500 to-emerald-600 text-white hover:opacity-95 shadow-2xl shadow-teal-500/35",
    iconGhost: "text-teal-400 hover:bg-teal-500/15 rounded-lg",
  },
  indigo: {
    solid: "bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 shadow-xl shadow-indigo-500/25",
    outline: "text-indigo-400 border border-indigo-400/30 hover:bg-indigo-500/30 hover:text-indigo-500 hover:border-indigo-400/30",
    ghost: "text-indigo-400 hover:bg-indigo-500/10",
    soft: "text-indigo-600 bg-indigo-500/20 border border-indigo-400/30 hover:bg-indigo-500/30 hover:text-indigo-400 hover:border-indigo-400/30",
    gradient: "bg-linear-to-r from-indigo-600 to-blue-600 text-white hover:opacity-95 shadow-2xl shadow-indigo-500/35",
    iconGhost: "text-indigo-400 hover:bg-indigo-500/15 rounded-lg",
  },

  cyan:{
    solid: "bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500 shadow-xl shadow-cyan-500/25",
    outline: "text-cyan-400 border border-cyan-400/30 hover:bg-cyan-500/20 hover:text-cyan-500 hover:border-cyan-500/40",
    ghost: "text-cyan-400 hover:bg-cyan-500/10",
    soft: "text-cyan-500 bg-cyan-500/20 border border-cyan-400/30 hover:bg-cyan-500/30 hover:text-cyan-500 hover:border-cyan-400/30",
    gradient: "bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:opacity-95 shadow-2xl shadow-cyan-500/35",
    iconGhost: "text-cyan-400 hover:bg-cyan-500/15 rounded-lg",
  },

  primary: {
    solid: "bg-primary text-white hover:opacity-90 active:opacity-80 border-primary shadow-xl shadow-primary-500/20",
    outline: " text-primary hover:text-primary-500 hover:bg-primary/20 border border-primary/40",
    ghost: " text-primary  hover:bg-primary/20",
    soft: "text-primary bg-primary/20 border border-primary/30 hover:bg-primary/30 hover:text-primary hover:border-primary/40",
    gradient: "bg-linear-to-r from-primary to-primary/80 text-white hover:opacity-95 shadow-2xl shadow-primary/35",
    iconGhost: " hover:bg-primary/15 rounded-lg",
  },

  neutral: {
    solid: "bg-zinc-500/80 text-white hover:bg-zinc-500/90 border border-zinc-400/40 shadow-xl shadow-zinc-500/25",
    outline: "text-zinc-500 dark:text-zinc-300 border border-zinc-400/40 hover:text-zinc-900 dark:hover:text-zinc-50   hover:bg-zinc-500/10",
    ghost: "hover:bg-zinc-700/10",
    soft: "dark:text-white text-gray-600 hover:text-gray-900 dark:hover:text-gray-50 bg-zinc-500/10 border border-zinc-500/10 hover:bg-zinc-500/30",
    gradient: "bg-linear-to-r from-zinc-800 to-gray-950 text-white border border-zinc-700 hover:opacity-95",
    iconGhost: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-zinc-500/15 rounded-lg",
  },

  warning: {
    solid: "bg-amber-400 text-white hover:bg-amber-300 border border-amber-300/20 shadow-xl shadow-amber-500/25",
    outline: " border border-amber-400/40 text-amber-500 hover:bg-amber-500/20 ",
    ghost: "text-amber-500 hover:bg-amber-400/30 ",
    soft: "text-amber-500 bg-amber-500/20 border border-amber-400/30 hover:bg-amber-500/30 hover:text-amber-500 hover:border-amber-400/20",
    gradient: "bg-linear-to-r from-amber-300 to-yellow-500 text-amber-900 shadow-2xl shadow-amber-500/35",
    iconGhost: "text-amber-500 hover:bg-amber-500/15 rounded-lg",
  },
  success: {
    solid: "bg-emerald-500 text-white hover:bg-emerald-400 border border-emerald-400/20 shadow-xl shadow-emerald-500/25",
    outline: "text-emerald-400 border border-emerald-400/30 hover:bg-emerald-500/10 hover:border-emerald-500/40",
    ghost: "text-emerald-400 hover:text-emerald-400 hover:bg-emerald-500/10",
    soft: "text-emerald-400 bg-emerald-500/20 border border-emerald-400/30 hover:bg-emerald-500/30 hover:text-emerald-500 hover:border-emerald-500/40",
    gradient: "bg-linear-to-r from-emerald-400 to-green-500 text-gray-950 hover:opacity-95 shadow-2xl shadow-emerald-500/35",
    iconGhost: "text-emerald-500 hover:bg-emerald-500/15 rounded-lg",
  },

  danger: {
    solid: "bg-rose-500 text-white hover:bg-rose-400 border border-rose-400/20 shadow-xl shadow-rose-500/25",
    outline: "text-rose-400 border border-rose-400/30 hover:bg-rose-500 hover:border-rose-400/40 hover:text-rose-100",
    ghost: "text-rose-400 hover:text-white hover:bg-rose-500/40",
    soft: "text-rose-400 bg-rose-500/20 border border-rose-400/30 hover:bg-rose-500/30 hover:text-rose-500 hover:border-rose-500/40",
    gradient: "bg-linear-to-r from-rose-500 to-red-600 text-white hover:opacity-95 shadow-2xl shadow-rose-500/35",
    iconGhost: "text-rose-500 hover:bg-rose-500/15 rounded-lg",
  },
};

// Map variants aliases
variants.emerald = variants.buy;
variants.rose = variants.sell;
variants.info = variants.cyan;
variants.amber = variants.warning;

// Focus ring color per intent
const focusRingByIntent = {
  buy: "focus-visible:ring-emerald-400/40",
  sell: "focus-visible:ring-rose-400/40",
  success: "focus-visible:ring-emerald-400/40",
  danger: "focus-visible:ring-rose-400/40",
  emerald: "focus-visible:ring-emerald-400/40",
  rose: "focus-visible:ring-rose-400/40",
  amber: "focus-visible:ring-amber-400/40",
  cyan: "focus-visible:ring-cyan-400/40",
  info: "focus-visible:ring-cyan-400/40",
  purple: "focus-visible:ring-violet-400/40",
  pink: "focus-visible:ring-pink-400/40",
  teal: "focus-visible:ring-teal-400/40",
  indigo: "focus-visible:ring-indigo-400/40",
  primary: "focus-visible:ring-primary/40",
  neutral: "focus-visible:ring-zinc-400/40",
  warning: "focus-visible:ring-amber-400/40",
};

const colorToIntent = {
  primary: "primary",
  secondary: "neutral",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "cyan",
  cyan: "cyan",
  violet: "purple",
  pink: "pink",
  teal: "teal",
  indigo: "indigo",
  purple: "purple",
  blue: "indigo",
  emerald: "success",
  rose: "danger",
  amber: "warning",
};

const sizes = {
  xs: "h-8 px-3 text-xs",
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-lg",
};

// iconOnly size map — square dimensions for each size
const iconOnlySizes = {
  xs: "h-7 w-7 p-0",
  sm: "h-8 w-8 p-0",
  md: "h-9 w-9 p-0",
  lg: "h-10 w-10 p-0",
  xl: "h-11 w-11 p-0",
};

const TradingButton = memo(
  forwardRef(
    (
      {
        onClick,
        children,
        intent = "neutral",
        variant = "solid",
        size = "md",
        fullWidth = false,
        block = false,
        rounded = "xl",
        loading = false,
        disabled = false,
        leftIcon = null,
        rightIcon = null,
        iconOnly = false,
        glow = true,
        type = "button",
        className = "",
        gap = "gap-2",
        color, // optional color prop to set button color directly
        justify = false, // pull justify out of props so it doesn't get spread to DOM element
        ...props
      },
      ref
    ) => {
      const isDisabled = disabled || loading;

      // Determine final intent based on optional color prop
      const finalIntent = color ? (colorToIntent[color] ?? color) : intent;

      // Map soft variant to ghost; handle iconGhost passthrough
      const resolvedVariant = variant === "gradient" ? "solid" : variant;

      const roundedClass =
        rounded === "full"
          ? "rounded-full"
          : rounded === "lg"
            ? "rounded-xl"
            : "rounded-2xl";

      const focusRingClass = focusRingByIntent[finalIntent] ?? focusRingByIntent.neutral;

      return (
        <button
          onClick={onClick}
          ref={ref}
          type={type}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={loading}

          className={cn(
            // Base
            "group relative isolate inline-flex items-center gap-2",
            justify ? "justify-between" : "justify-center",
            "overflow-hidden  font-semibold tracking-wide",
            "transition-all duration-200 ease-out select-none",
            "active:scale-95 hover:-translate-y-px",

            // Focus
            "focus-visible:outline-none focus-visible:ring-2",
            focusRingClass,
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-slate-950",



            // Size
            iconOnly ? (iconOnlySizes[size] ?? iconOnlySizes.md) : sizes[size],

            // Width
            (fullWidth || block) && "w-full",


            // Radius
            roundedClass,

            // Variant (intent may be derived from color)
            variants[finalIntent]?.[resolvedVariant],

            // Glow effect
            glow &&
            "before:absolute before:inset-0 before:-z-10 before:bg-linear-to-r before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",

            // Disabled
            isDisabled &&
            "cursor-not-allowed opacity-50 hover:translate-y-0 active:scale-100",

            className
          )}
          {...props}
        >
          {loading ? (
            <FiLoader className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {/* Left Icon */}
              {leftIcon && (
                <span className="flex items-center justify-center text-xl shrink-0">
                  {leftIcon}
                </span>
              )}

              {/* Button Text */}
              {!iconOnly && (
                <span className={cn("relative  inline-flex items-center", gap)}>
                  {children}
                </span>
              )}

              {/* Right Icon */}
              {rightIcon && (
                <span className="flex items-center justify-center text-xl shrink-0">
                  {rightIcon}
                </span>
              )}

              {/* Icon Only */}
              {iconOnly && !leftIcon && !rightIcon && children}
            </>
          )}
        </button>
      );
    }
  )
);

TradingButton.displayName = "TradingButton";

export { TradingButton, TradingButton as Button, RainbowButton };
export default TradingButton;