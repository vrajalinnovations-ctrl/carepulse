import React, { useState, useCallback, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Accordion = ({
  items = [],
  defaultOpenIds = [],
  variant = 'default',
  rounded = 'lg',
  allowMultiple = false,
  className = '',
  color = '',
  density = 'md',
  separated = false,
  showControls = false,
  chevronPosition = 'right',
}) => {
  const [openIds, setOpenIds] = useState(new Set(defaultOpenIds))
  const headerRefs = useRef([])

  const toggle = useCallback((id) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) next.clear()
        next.add(id)
      }
      return next
    })
  }, [allowMultiple])

  const containerBase = 'w-full overflow-hidden'
  const r = rounded === 'xl' ? 'rounded-xl' : rounded === 'md' ? 'rounded-md' : 'rounded-lg'
  const pad = density === 'sm' ? 'px-4 py-2' : density === 'lg' ? 'px-5 py-4' : 'px-4 py-3'

  const colorMap = {
    Indigo: {
      softBg: 'bg-indigo-500/5',
      softText: 'text-indigo-500',
      softBorder: 'border border-indigo-500/10',
      border: 'border-indigo-500',
      grad: 'from-indigo-500 via-blue-600 to-blue-700',
      divide: 'divide-indigo-500/20',
    },
    Emerald: {
      softBg: 'bg-emerald-500/5',
      softText: 'text-emerald-500',
      softBorder: 'border border-emerald-500/10',
      border: 'border-emerald-500',
      grad: 'from-emerald-500 via-teal-500 to-teal-700',
      divide: 'divide-emerald-500/20',
    },
    Rose: {
      softBg: 'bg-rose-500/5',
      softText: 'text-rose-500',
      softBorder: 'border border-rose-500/10',
      border: 'border-rose-500',
      grad: 'from-rose-500 via-pink-500 to-pink-700',
      divide: 'divide-rose-500/20',
    },
    Amber: {
      softBg: 'bg-amber-500/5',
      softText: 'text-amber-500',
      softBorder: 'border border-amber-500/10',
      border: 'border-amber-500',
      grad: 'from-amber-400 via-orange-500 to-orange-700',
      divide: 'divide-amber-500/20',
    },
    Cyan: {
      softBg: 'bg-cyan-500/5',
      softText: 'text-cyan-500',
      softBorder: 'border border-cyan-500/10',
      border: 'border-cyan-500',
      grad: 'from-cyan-500 via-sky-500 to-blue-600',
      divide: 'divide-cyan-500/20',
    },
    Slate: {
      softBg: 'bg-slate-500/5',
      softText: 'text-slate-800 dark:text-slate-200',
      softBorder: 'border border-slate-500/10',
      border: 'border-slate-500',
      grad: 'from-slate-600 via-slate-700 to-slate-900',
      divide: 'divide-slate-500/20',
    },
    Purple: {
      softBg: 'bg-purple-500/5',
      softText: 'text-purple-500',
      softBorder: 'border border-purple-500/10',
      border: 'border-purple-500',
      grad: 'from-fuchsia-500 via-violet-600 to-purple-700',
      divide: 'divide-purple-500/20',
    },
    Pink: {
      softBg: 'bg-pink-500/5',
      softText: 'text-pink-500',
      softBorder: 'border border-pink-500/10',
      border: 'border-pink-500',
      grad: 'from-pink-500 via-rose-500 to-rose-700',
      divide: 'divide-pink-500/20',
    },
    Teal: {
      softBg: 'bg-teal-500/5',
      softText: 'text-teal-500',
      softBorder: 'border border-teal-500/10',
      border: 'border-teal-500',
      grad: 'from-teal-500 via-emerald-500 to-emerald-700',
      divide: 'divide-teal-500/20',
    },
    Primary: {
      softBg: 'bg-primary/10',
      softText: 'text-primary',
      softBorder: 'border border-primary/10',
      border: 'border-primary',
      grad: 'from-primary to-primary/60',
      divide: 'divide-primary/20',
    },
  }

  const col = colorMap[color] || colorMap.Indigo

  // Simplified wrapper classes
  const getWrapperClasses = () => {
    if (separated) return ''

    const baseClasses = `${r} overflow-hidden`

    switch (variant) {
      case 'bordered':
        return `${baseClasses} border border-gray-500/20 divide-y divide-gray-300/20 `
      case 'shadow':
        return `${baseClasses} border border-gray-500/20 divide-y divide-gray-300/20  shadow-sm`
      case 'flush':
        return `${baseClasses} border border-gray-500/20 divide-y divide-gray-300/20 `
      case 'ghost':
        return `${baseClasses} divide-y divide-gray-300/20 `
      case 'soft-color':
        return `${baseClasses} ${col.softBg} ${col.softText} ${col.softBorder} divide-y ${col.divide}`
      case 'left-accent':
        return `${baseClasses} border border-transparent`
      case 'gradient':
        return `${baseClasses}`
      default:
        return `${baseClasses} border border-gray-300 divide-y divide-gray-300 dark:border-white/10 dark:divide-white/10`
    }
  }

  const wrapperCls = getWrapperClasses()

  return (
    <div className={`${containerBase} ${className}`}>
      {showControls && allowMultiple && (
        <div className='mb-3 flex items-center gap-2'>
          <button type='button' onClick={() => setOpenIds(new Set(items.map((i, idx) => i.id ?? idx)))} className='px-3 py-1.5 text-sm rounded-md border border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'>Expand all</button>
          <button type='button' onClick={() => setOpenIds(new Set())} className='px-3 py-1.5 text-sm rounded-md border border-gray-700 hover:bg-gray-800'>Collapse all</button>
        </div>
      )}

      <div className={wrapperCls}>
        {items.map((it, idx) => {
          const itemId = it.id ?? idx
          const isOpen = openIds.has(itemId)
          const disabled = !!it.disabled

          // Simplified header styling
          const getHeaderClasses = () => {
            let classes = `w-full ${pad} flex items-center gap-3 ltr:text-left rtl:text-right select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 transition-colors`

            if (chevronPosition === 'left') {
              classes += ' flex-row-reverse justify-between'
            } else {
              classes += ' justify-between'
            }

            if (disabled) {
              classes += ' opacity-50 cursor-not-allowed'
            }

            // Variant-specific styles
            switch (variant) {
              case 'soft-color':
                classes += ` ${col.softBg} ${col.softText}`
                break
              case 'left-accent':
                classes += ` ltr:border-l-4 rtl:border-r-4 ${col.border}`
                break
              case 'gradient':
                classes += ` text-white bg-linear-to-r ${col.grad}`
                break
            }
            return classes
          }

          const headerId = `acc-h-${itemId}`
          const panelId = `acc-p-${itemId}`

          // Match panel background to the header's variant color
          const getPanelClasses = () => {
            switch (variant) {
              case 'soft-color':
                return `${col.softBg} ${col.softText}`
              case 'left-accent':
                return `ltr:border-l-4 rtl:border-r-4 ${col.border}`
              case 'gradient':
                return `${col.softBg} ${col.softBorder || ''}`
              default:
                return ''
            }
          }

          return (
            <div key={itemId} className={`${separated ? `${r} border border-gray-700 last:mb-0` : ''}`}>
              <button type="button" id={headerId} aria-controls={panelId}
                disabled={disabled}
                onClick={() => {
                  if (!disabled) {
                    toggle(itemId)
                  }
                }}
                onKeyDown={(e) => {
                  if (disabled) return
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggle(itemId)
                  }
                  // Arrow key navigation
                  else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault()
                    const next = Math.min(items.length - 1, idx + 1)
                    headerRefs.current[next]?.focus()
                  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault()
                    const prev = Math.max(0, idx - 1)
                    headerRefs.current[prev]?.focus()
                  } else if (e.key === 'Home') {
                    e.preventDefault()
                    headerRefs.current[0]?.focus()
                  } else if (e.key === 'End') {
                    e.preventDefault()
                    headerRefs.current[items.length - 1]?.focus()
                  }
                }}
                ref={(el) => (headerRefs.current[idx] = el)}
                className={getHeaderClasses()}
                aria-expanded={isOpen}
              >
                <div className='flex items-center gap-3 min-w-0 flex-1'>
                  {it.icon && (
                    <span className='text-xl shrink-0'>{it.icon}</span>
                  )}
                  <span className='font-medium  truncate'>{it.title}</span>
                  {it.badge && (
                    <span className='ms-2 shrink-0'>{it.badge}</span>
                  )}
                </div>

                {chevronPosition !== 'none' && (
                  <FiChevronDown
                    className={`shrink-0  transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                      }`}
                  />
                )}
              </button>

              <div id={panelId} role="region" aria-labelledby={headerId}
                className={`grid transition-all duration-300 ease-in-out ${getPanelClasses()} ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
              >
                <div className='overflow-hidden'>
                  <div className={`${density === 'lg' ? 'px-5 pb-5 pt-2' :
                    density === 'sm' ? 'px-4 pb-3 pt-1' :
                      'px-4 pb-4 pt-1'
                    } text-gray-500 space-y-3`}>
                    {it.media && (
                      <div className='rounded-lg overflow-hidden'>
                        {it.media}
                      </div>
                    )}
                    <div >{it.content}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Accordion;