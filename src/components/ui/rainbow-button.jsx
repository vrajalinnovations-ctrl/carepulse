import React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export function RainbowButton({
  children,
  className = "",
  size = "md",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  ...props
}) {
  const sizeClasses = {
    sm: "h-10 px-5 text-sm gap-2",
    md: "h-12 px-7 text-base gap-2.5",
    lg: "h-14 px-9 text-lg gap-3",
  };

  return (
    <>
      <style>{`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-rainbow {
          animation: rainbow 3s linear infinite;
        }
        .bg-rainbow-gradient {
          background-image: linear-gradient(90deg, #00d2ff, #7928ca, #ff0080, #ff4d4d, #f5a623, #50e3c2, #00d2ff);
          background-size: 200% auto;
        }
      `}</style>
      <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "group relative isolate inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-300 ease-out select-none cursor-pointer",
        "active:scale-95 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        "disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {/* 1. Diffused Rainbow Glow Shadow Beneath the Button */}
      <span
        className="absolute -bottom-2 inset-x-2 h-6 -z-20 animate-rainbow rounded-full bg-rainbow-gradient blur-md opacity-85 transition-all duration-300 group-hover:opacity-100 group-hover:blur-lg"
        aria-hidden="true"
      />

      {/* 2. Rainbow Base Layer with Crisp White Surface */}
      <span
        className="absolute inset-0 -z-10 rounded-2xl animate-rainbow bg-rainbow-gradient p-0.5 shadow-sm"
        aria-hidden="true"
      >
        <span className="block h-full w-full rounded-xl bg-white transition-colors duration-200 group-hover:bg-slate-50" />
      </span>

      {/* Button Content */}
      {leftIcon && <span className="relative z-10 shrink-0 text-slate-900">{leftIcon}</span>}
      <span className="relative z-10 flex items-center gap-2 text-slate-900 font-semibold tracking-tight">
        {children}
      </span>
      {rightIcon && <span className="relative z-10 shrink-0 text-slate-900">{rightIcon}</span>}
    </button>
    </>
  );
}

export default RainbowButton;
