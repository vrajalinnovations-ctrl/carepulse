import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

// Utility to clamp
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Create pagination range with ellipsis
const DOTS = '…';
const getRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  return [firstPageIndex, DOTS, ...Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i), DOTS, lastPageIndex];
};

// Color tokens aligned to theme and palette presets
const colorTokens = {
  primary: {
    solid: 'bg-primary text-white hover:bg-primary/90',
    text: 'text-primary dark:text-primary-400',
    border: 'border-primary',
    soft: 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400',
    ring: 'focus-visible:ring-primary/40',
  },
  secondary: {
    solid: 'bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600',
    text: 'text-slate-800 dark:text-slate-200',
    border: 'border-slate-800 dark:border-slate-600',
    soft: 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
    ring: 'focus-visible:ring-slate-400/40',
  },
  success: {
    solid: 'bg-emerald-600 text-white hover:bg-emerald-700',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-600',
    soft: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    ring: 'focus-visible:ring-emerald-500/40',
  },
  danger: {
    solid: 'bg-rose-600 text-white hover:bg-rose-700',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-600',
    soft: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
    ring: 'focus-visible:ring-rose-500/40',
  },
  warning: {
    solid: 'bg-amber-500 text-white hover:bg-amber-600',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500',
    soft: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    ring: 'focus-visible:ring-amber-500/40',
  },
  info: {
    solid: 'bg-cyan-600 text-white hover:bg-cyan-700',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-600',
    soft: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400',
    ring: 'focus-visible:ring-cyan-500/40',
  },
  purple: {
    solid: 'bg-purple-600 text-white hover:bg-purple-700',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-600',
    soft: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
    ring: 'focus-visible:ring-purple-500/40',
  },
  pink: {
    solid: 'bg-pink-600 text-white hover:bg-pink-700',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-600',
    soft: 'bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400',
    ring: 'focus-visible:ring-pink-500/40',
  },
  teal: {
    solid: 'bg-teal-600 text-white hover:bg-teal-700',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-600',
    soft: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400',
    ring: 'focus-visible:ring-teal-500/40',
  },
  indigo: {
    solid: 'bg-indigo-600 text-white hover:bg-indigo-700',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-600',
    soft: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
    ring: 'focus-visible:ring-indigo-500/40',
  },
};

const sizeMap = {
  sm: 'h-8 min-w-8 text-xs px-2.5',
  md: 'h-9 min-w-9 text-sm px-3',
  lg: 'h-10 min-w-10 text-base px-3.5',
};

const baseItemCls = 'inline-flex items-center justify-center select-none focus:outline-none transition-all duration-150 font-medium';

const PageBtn = ({ children, active, disabled, onClick, size = 'md', color = 'primary', variant, ...props }) => {
  const tok = colorTokens[color] || colorTokens.primary;
  const sizing = sizeMap[size] || sizeMap.md;

  // Determine border-radius shape
  let shapeCls = 'rounded-xl';
  if (variant === 'pill') shapeCls = 'rounded-full';
  if (variant === 'minimal' || variant === 'segmented') shapeCls = 'rounded-none';

  // Determine appearance based on variant and active state
  let variantCls;

  if (active) {
    if (variant === 'minimal') {
      variantCls = `border-b-2 ${tok.border} ${tok.text} font-bold bg-transparent`;
    } else if (variant === 'soft') {
      variantCls = `${tok.soft} font-semibold shadow-xs`;
    } else if (variant === 'outline' || variant === 'bordered') {
      variantCls = `${tok.solid} font-semibold shadow-xs border border-transparent`;
    } else {
      // solid, basic, pill, compact, segmented, icons, default
      variantCls = `${tok.solid} font-semibold shadow-xs`;
    }
  } else {
    // Inactive button styling: clean, readable neutral colors for all non-active pages and controls
    if (variant === 'outline' || variant === 'bordered') {
      variantCls = 'border border-slate-200 dark:border-white/10 bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5';
    } else if (variant === 'soft') {
      variantCls = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white';
    } else if (variant === 'minimal') {
      variantCls = 'border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600';
    } else if (variant === 'segmented') {
      variantCls = 'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10';
    } else {
      // basic, pill, compact, solid, icons, default
      variantCls = 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10';
    }
  }

  const disabledCls = disabled
    ? 'opacity-30 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  return (
    <button
      type="button"
      className={`${baseItemCls} ${sizing} ${shapeCls} ${tok.ring} focus-visible:ring-2 ${variantCls} ${disabledCls}`}
      onClick={disabled ? undefined : onClick}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

const Icon = ({ type }) => {
  if (type === 'first') return <FiChevronsLeft className="w-4 h-4" />;
  if (type === 'prev') return <FiChevronLeft className="w-4 h-4" />;
  if (type === 'next') return <FiChevronRight className="w-4 h-4" />;
  if (type === 'last') return <FiChevronsRight className="w-4 h-4" />;
  return null;
};

const Pagination = ({
  total = 120,
  page = 1,
  onChange = () => { },
  pageSize = 10,
  siblingCount = 1,
  variant = 'basic',
  color = 'primary',
  size = 'md',
  showEdges = false,
  showFirstLast = false,
  className = '',
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = clamp(page, 1, totalPages);
  const range = getRange(current, totalPages, siblingCount);

  const itemVariant = (
    variant === 'basic' ? undefined :
      variant === 'pill' ? 'pill' :
        variant === 'outline' ? 'outline' :
          variant === 'soft' ? 'soft' :
            variant === 'solid' ? 'solid' :
              variant === 'minimal' ? 'minimal' :
                variant === 'bordered' ? 'bordered' :
                  variant === 'compact' ? 'compact' :
                    variant === 'segmented' ? 'segmented' : undefined
  );

  const withIcons = variant === 'icons';
  const segmented = variant === 'segmented';
  const containerCls = segmented
    ? 'inline-flex rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-xs divide-x divide-slate-200 dark:divide-white/10'
    : 'inline-flex flex-wrap items-center gap-1.5';

  const jump = (p) => onChange(clamp(p, 1, totalPages));

  return (
    <nav className={className} aria-label="Pagination">
      <div className={containerCls}>
        {(showEdges || showFirstLast || withIcons || segmented) && (
          <PageBtn size={size} color={color} variant={itemVariant} disabled={current === 1} onClick={() => jump(1)} aria-label="First page">
            {withIcons || showFirstLast ? <Icon type="first" /> : 'First'}
          </PageBtn>
        )}
        <PageBtn size={size} color={color} variant={itemVariant} disabled={current === 1} onClick={() => jump(current - 1)} aria-label="Previous page">
          {withIcons || segmented ? <Icon type="prev" /> : 'Prev'}
        </PageBtn>

        {range.map((p, idx) => (
          p === DOTS ? (
            <span key={`d-${idx}`} className="inline-flex items-center justify-center px-2 text-slate-400 dark:text-slate-500 select-none text-xs" aria-hidden>
              {DOTS}
            </span>
          ) : (
            <PageBtn key={p} size={size} color={color} variant={itemVariant} active={p === current} onClick={() => jump(p)} aria-label={`Page ${p}`}>
              {p}
            </PageBtn>
          )
        ))}

        <PageBtn size={size} color={color} variant={itemVariant} disabled={current === totalPages} onClick={() => jump(current + 1)} aria-label="Next page">
          {withIcons || segmented ? <Icon type="next" /> : 'Next'}
        </PageBtn>
        {(showEdges || showFirstLast || withIcons || segmented) && (
          <PageBtn size={size} color={color} variant={itemVariant} disabled={current === totalPages} onClick={() => jump(totalPages)} aria-label="Last page">
            {withIcons || showFirstLast ? <Icon type="last" /> : 'Last'}
          </PageBtn>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
