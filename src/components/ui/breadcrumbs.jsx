import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({
  items = [],
  separator = <FiChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />,
  variant = 'ghost',
  size = 'md',
  className = '',
}) => {
  if (!items || items.length === 0) return null;

  const containerStyles = {
    ghost: '',
    solid: 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-gray-800 px-3.5 py-1.5 rounded-xl backdrop-blur-sm',
    bordered: 'border border-slate-200 dark:border-gray-800 px-3.5 py-1.5 rounded-xl',
  };

  const sizeStyles = {
    sm: 'text-xs gap-1 sm:gap-1.5',
    md: 'text-xs sm:text-sm gap-1.5 sm:gap-2',
    lg: 'text-sm sm:text-base gap-2 sm:gap-2.5',
  };

  return (
    <nav aria-label="Breadcrumb" className={`inline-flex items-center font-medium ${containerStyles[variant] || ''} ${className}`}>
      <ol className={`flex items-center flex-wrap ${sizeStyles[size] || sizeStyles.md}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && <span className="flex items-center text-gray-400 dark:text-gray-500" aria-hidden="true">{separator}</span>}

              {isLast || !item.href ? (
                <span className="flex items-center gap-1.5 text-primary font-semibold truncate">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors truncate"
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

