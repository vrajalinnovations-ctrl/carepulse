import React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const variants = {
  default:
    "border border-slate-200/90 bg-white/85 shadow-xs hover:border-primary/40 hover:bg-white hover:shadow-md hover:shadow-slate-900/5 dark:border-gray-800/80 dark:bg-gray-900/50 dark:hover:bg-gray-900 dark:hover:border-primary/40 dark:shadow-none",
  glass:
    "backdrop-blur-xl border border-slate-300/40 rounded-2xl bg-white/70 shadow-xs hover:border-primary/40 hover:bg-white/95 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/20 dark:shadow-none",
  gradient:
    "border border-primary/20 bg-linear-to-br from-primary/5 via-white to-primary/10 shadow-xs hover:border-primary/40 hover:from-primary/10 hover:to-primary/20 hover:shadow-lg hover:shadow-primary/10 dark:border-primary/30 dark:from-primary/10 dark:via-gray-900/70 dark:to-primary/5 dark:hover:from-primary/20 dark:hover:to-primary/10",
  elevated:
    "border border-slate-100/90 bg-white shadow-md shadow-slate-900/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-gray-800/60 dark:bg-gray-900 dark:shadow-lg dark:shadow-black/40 dark:hover:shadow-2xl dark:hover:shadow-black/60",
  bordered:
    "border-2 border-slate-200 bg-white/60 hover:border-primary hover:bg-primary/5 dark:border-gray-800 dark:bg-transparent dark:hover:border-primary dark:hover:bg-primary/5",
  glow:
    "border border-slate-200/90 bg-white shadow-xs hover:border-primary hover:shadow-lg hover:shadow-primary/20 dark:border-gray-800 dark:bg-gray-900/90 dark:hover:border-primary dark:hover:shadow-lg dark:hover:shadow-primary/30",
  flat:
    "border border-slate-200/80 bg-slate-50/90 hover:bg-slate-100/90 hover:border-slate-300 dark:border-gray-800/60 dark:bg-gray-900/40 dark:hover:bg-gray-900/80 dark:hover:border-gray-700",
};

const InnerCard = ({
  children,
  variant = "default",
  topAccent = "",
  interactive = true,
  padding = "p-4",
  rounded = "rounded-2xl",
  className = "",
  ...props
}) => (
  <div
    className={cn(
      "group relative overflow-hidden flex items-center gap-4 transition-all duration-300",
      rounded,
      padding,
      interactive && "hover:-translate-y-0.5 cursor-pointer",
      variants[variant] || variants.default,
      className
    )}
    {...props}
  >
    {topAccent && (
      <div
        className={cn(
          "absolute top-0 left-0 right-0 z-10 h-1 rounded-t-2xl",
          topAccent
        )}
      />
    )}
    {children}
  </div>
);

export { InnerCard };
export default InnerCard;
