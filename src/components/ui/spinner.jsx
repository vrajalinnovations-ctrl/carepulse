import React from 'react';

// Palette tokens aligned with Button
const palette = {
  primary: 'text-primary',
  secondary: 'text-slate-500 dark:text-slate-400',
  success: 'text-emerald-500',
  danger: 'text-rose-500',
  warning: 'text-amber-500',
  info: 'text-cyan-500',
  purple: 'text-purple-500',
  pink: 'text-pink-500',
  teal: 'text-teal-500',
  indigo: 'text-indigo-500',
};

const sizeMap = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 28,
  xl: 36,
};

const Spinner = ({
  type = 'ring',
  color = 'indigo',
  size = 'md',
  speed = 1,
  label,
  showLabel = false,
  className = '',
}) => {
  const px = sizeMap[size] || sizeMap.md;
  const colorCls = palette[color] || palette.indigo;

  const labelNode = showLabel && (
    <span className="text-sm font-medium text-gray-900 dark:text-white">{label ?? 'Loading...'}</span>
  );

  // Individual renderers
  const render = {
    ring: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className={`absolute inset-0 rounded-full border-2 opacity-30 border-current`} />
        <div className={`absolute inset-0 rounded-full border-2 border-t-transparent border-current`} style={{ animation: `spin360 ${1 / speed}s linear infinite` }} />
      </div>
    ),
    hologram: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px, }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="absolute inset-0 border border-current rounded-2xl" style={{ animation: `hologram ${1.8 / speed}s ease-out ${i * 0.4}s infinite`, opacity: 0, }}></span>
        ))}
      </div>
    ),
    'dual-ring': () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className={`absolute inset-0 rounded-full border-2 border-t-transparent border-current`} style={{ animation: `spin360 ${1 / speed}s linear infinite` }} />
        <div className={`absolute inset-1 rounded-full border-2 border-b-transparent border-current opacity-60`} style={{ animation: `spin-rev ${1 / speed}s linear infinite` }} />
      </div>
    ),
    dots: () => (
      <div className={`flex ${colorCls}`} style={{ gap: px / 6 }}>
        {[0, 1, 2].map(i => (
          <span key={i} className={`rounded-full bg-current`} style={{ width: px / 4, height: px / 4, animation: `dots 1s ease-in-out ${i * 0.15}s infinite` }} />
        ))}
      </div>
    ),
    bounce: () => (
      <div className={`flex items-end ${colorCls}`} style={{ gap: px / 6, height: px }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="bg-current rounded-full" style={{ width: px / 5, height: px / 2, animation: `bounce ${0.9 / speed}s ease-in-out ${i * 0.1}s infinite` }} />
        ))}
      </div>
    ),
    stock: () => (
      <div className={`flex items-end ${colorCls}`} style={{ gap: px / 8, height: px }}>
        {[40, 65, 45, 80, 60, 95, 75].map((h, i) => (
          <span key={i} className="bg-current rounded-t-md" style={{ width: px / 10, height: `${h}%`, animation: `stockJump ${1.2 / speed}s ease-in-out ${i * 0.08}s infinite alternate` }}
          />
        ))}
      </div>
    ),
    neural: () => (
      <div
        className={`relative ${colorCls}`}
        style={{
          width: px,
          height: px,
        }}
      >
        {[20, 50, 80].map((x, i) => (
          <span key={i} className="absolute bg-current rounded-full" style={{
            width: px / 8, height: px / 8, left: `${x}%`, top: `${20 + i * 25}%`, transform: "translate(-50%, -50%)", animation: `neural ${1.2 / speed}s ease-in-out ${i * 0.1
              }s infinite alternate`, boxShadow: "0 0 14px currentColor",
          }}></span>
        ))}

        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 100 100"
        >
          <line x1="20" y1="20" x2="50" y2="45" stroke="currentColor" />
          <line x1="50" y1="45" x2="80" y2="70" stroke="currentColor" />
        </svg>
      </div>
    ),
    wave: () => (
      <div className={`flex items-center ${colorCls}`} style={{ gap: px / 8, height: px }}>
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} className="bg-current rounded-full" style={{ width: px / 8, height: px / 8, animation: `wave ${1 / speed}s ease-in-out ${i * 0.1}s infinite` }} />
        ))}
      </div>
    ),
    pulseBars: () => (
      <div
        className={`flex items-end ${colorCls}`}
        style={{ gap: px / 10, height: px }}
      >
        {[50, 80, 60, 90].map((h, i) => (
          <span
            key={i}
            className="bg-current rounded-md"
            style={{
              width: px / 7,
              height: `${h}%`,
              animation: `pulseBars ${0.8 / speed}s ease-in-out ${i * 0.12
                }s infinite alternate`,
            }}
          />
        ))}
      </div>
    ),
    modernStock: () => (
      <div
        className={`relative flex items-end ${colorCls}`}
        style={{
          gap: px / 9,
          height: px,
          paddingInline: px / 12,
        }}
      >
        {[35, 75, 55, 95, 70].map((h, i) => (
          <span
            key={i}
            className="bg-current rounded-full"
            style={{
              width: px / 8,
              height: `${h}%`,
              opacity: 0.9,
              filter: "blur(0.2px)",
              boxShadow: "0 0 12px currentColor",
              animation: `modernStock ${1.4 / speed}s cubic-bezier(.4,0,.2,1) ${i * 0.12
                }s infinite alternate`,
            }}
          />
        ))}
      </div>
    ),
    bars: () => (
      <div className={`flex items-end ${colorCls}`} style={{ gap: px / 6, height: px }}>
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} className="bg-current rounded" style={{ width: px / 8, height: px / 2, animation: `bar ${1 / speed}s ease-in-out ${i * 0.06}s infinite`, transformOrigin: 'center bottom' }} />
        ))}
      </div>
    ),
    pulse: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className={`absolute inset-0 rounded-full bg-current`} style={{ opacity: .4 }} />
        <div className={`absolute inset-0 rounded-full bg-current`} style={{ animation: `pulse ${1.2 / speed}s ease-in-out infinite` }} />
      </div>
    ),
    ripple: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className={`absolute inset-0 rounded-full border-2 border-current`} style={{ animation: `ripple ${1.4 / speed}s ease-out infinite` }} />
        <div className={`absolute inset-2 rounded-full border-2 border-current opacity-60`} style={{ animation: `ripple ${1.6 / speed}s ease-out .2s infinite` }} />
      </div>
    ),
    cube: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className={`w-full h-full bg-current`} style={{ transformOrigin: 'center', animation: `flip ${1.2 / speed}s ease-in-out infinite` }} />
      </div>
    ),
    grid: () => (
      <div className={`grid grid-cols-3 grid-rows-3 ${colorCls}`} style={{ width: px, height: px, gap: 2 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className={`w-full h-full bg-current`} style={{ opacity: (i % 2 ? .6 : .9), animation: `pulse ${1 / speed}s ease-in-out ${i * 0.04}s infinite` }} />
        ))}
      </div>
    ),
    matrix: () => (
      <div
        className={`relative overflow-hidden ${colorCls}`}
        style={{
          width: px,
          height: px,
        }}
      >
        {[0, 1, 2, 3, 4].map(i => (
          <span
            key={i}
            className="absolute bg-current rounded-full"
            style={{
              width: 2,
              height: px / 3,
              left: `${i * 20}%`,
              opacity: 0.7,
              filter: "blur(0.4px)",
              animation: `matrix ${1 / speed}s linear ${i * 0.15
                }s infinite`,
            }}
          />
        ))}
      </div>
    ),
    orbit: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className="absolute inset-0 rounded-full border-2 opacity-30 border-current" />
        <div className="absolute inset-0" style={{ animation: `spin360 ${1.2 / speed}s linear infinite` }}>
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" style={{ width: px / 4.5, height: px / 4.5 }} />
        </div>
      </div>
    ),
    comet: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className="absolute inset-0 rounded-full border-2 opacity-30 border-current" />
        <div className="absolute inset-0" style={{ animation: `spin360 ${1 / speed}s linear infinite` }}>
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" style={{ width: px / 5.5, height: px / 5.5, boxShadow: '0 0 10px currentColor' }} />
        </div>
      </div>
    ),
    hourglass: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className='w-full h-full border-2 border-current' style={{ clipPath: 'polygon(0 0, 100% 0, 65% 35%, 65% 65%, 100% 100%, 0 100%, 35% 65%, 35% 35%)', animation: `spin360 ${1.2 / speed}s linear infinite` }} />
      </div>
    ),
    infinity: () => (
      <div
        className={`relative ${colorCls}`}
        style={{ width: px, height: px / 2 }}
      >
        <span
          className="absolute inset-0 border-2 border-current rounded-full opacity-20"
          style={{
            clipPath: "inset(0 50% 0 0)",
          }}
        />

        <span
          className="absolute inset-0 border-2 border-current rounded-full opacity-20"
          style={{
            clipPath: "inset(0 0 0 50%)",
            transform: `translateX(${px / 3}px)`,
          }}
        />

        <span
          className="absolute bg-current rounded-full"
          style={{
            width: px / 6,
            height: px / 6,
            animation: `infinity ${2 / speed}s linear infinite`,
            boxShadow: "0 0 10px currentColor",
          }}
        />
      </div>
    ),
    'circle-dots': () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * 2 * Math.PI
          const r = px / 2
          const x = r + (r - 2) * Math.cos(angle)
          const y = r + (r - 2) * Math.sin(angle)
          return <span key={i} className='absolute rounded-full bg-current' style={{ width: px / 8, height: px / 8, left: x - px / 16, top: y - px / 16, opacity: .3 + i * 0.08, animation: `pulse ${1 / speed}s ease-in-out ${i * 0.05}s infinite` }} />
        })}
      </div>
    ),
    arc: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className='absolute inset-0 rounded-full border-2 border-current border-t-transparent' style={{ clipPath: 'inset(0 0 50% 0)', animation: `spin360 ${0.8 / speed}s linear infinite` }} />
      </div>
    ),
    radar: () => (
      <div className={`relative ${colorCls}`} style={{ width: px, height: px }}>
        <div className='absolute inset-0 rounded-full border-2 border-current opacity-20' />
        <div className='absolute inset-0 rounded-full' style={{ background: 'conic-gradient(from 0deg, currentColor, transparent 60%)', animation: `radar ${1.2 / speed}s linear infinite` }} />
      </div>
    ),
    helix: () => (
      <div className={`relative overflow-hidden ${colorCls}`} style={{ width: px * 1.8, height: px / 1.2 }}>
        <div className='absolute inset-0 flex items-center' style={{ animation: `helix ${1.2 / speed}s linear infinite` }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className='mx-0.5 rounded-full bg-current' style={{ width: px / 8, height: px / 8, opacity: .4 + (i % 2) * .4 }} />
          ))}
        </div>
      </div>
    ),
    aurora: () => (
      <div className={`relative rounded ${colorCls}`} style={{ width: px * 2, height: px / 1.2, background: 'linear-gradient(90deg, currentColor, transparent, currentColor)', backgroundSize: '200% 100%', animation: `aurora ${2 / speed}s ease-in-out infinite` }} />
    ),
  }

  const View = render[type] || render.ring

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <style>{`
        @keyframes spin360 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-rev { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @keyframes hologram { 0% { transform: scale(0.6); opacity: 0.85; } 100% { transform: scale(1.45); opacity: 0; } }
        @keyframes dots { 0%, 100% { transform: scale(0.3); opacity: 0.3; } 50% { transform: scale(1); opacity: 1; } }
        @keyframes stockJump { 0% { transform: scaleY(0.35); } 100% { transform: scaleY(1); } }
        @keyframes neural { 0% { transform: translate(-50%, -50%) scale(0.75); opacity: 0.35; } 100% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; } }
        @keyframes wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-50%); } }
        @keyframes pulseBars { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }
        @keyframes modernStock { 0% { transform: scaleY(0.35); opacity: 0.45; } 100% { transform: scaleY(1); opacity: 1; } }
        @keyframes bar { 0%, 100% { transform: scaleY(0.25); } 50% { transform: scaleY(1); } }
        @keyframes ripple { 0% { transform: scale(0.75); opacity: 0.9; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes flip { 0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); } 50% { transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); } 100% { transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg); } }
        @keyframes matrix { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(220%); opacity: 0; } }
        @keyframes orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes comet { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes infinity { 0% { transform: translateX(0) scale(0.85); } 50% { transform: translateX(110%) scale(1.2); } 100% { transform: translateX(0) scale(0.85); } }
        @keyframes radar { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes helix { 0% { transform: translateX(0); } 50% { transform: translateX(-24%); } 100% { transform: translateX(0); } }
        @keyframes aurora { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
      {View()}
      {labelNode}
    </div>
  )
}

export default Spinner;
