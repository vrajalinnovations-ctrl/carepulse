import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './buttons';

// Color tokens aligned with theme and Button palette
const colorTokens = {
  primary: { ring: 'ring-primary-400/50', border: 'border-primary/40', head: 'text-primary', soft: 'bg-primary/10 text-primary', solid: 'bg-primary text-white' },
  secondary: { ring: 'ring-slate-400/50', border: 'border-slate-400/40 dark:border-slate-600', head: 'text-slate-700 dark:text-slate-200', soft: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300', solid: 'bg-slate-700 text-white' },
  success: { ring: 'ring-emerald-400/50', border: 'border-emerald-500/40', head: 'text-emerald-600 dark:text-emerald-400', soft: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', solid: 'bg-emerald-600 text-white' },
  danger: { ring: 'ring-rose-400/50', border: 'border-rose-500/40', head: 'text-rose-600 dark:text-rose-400', soft: 'bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400', solid: 'bg-rose-600 text-white' },
  warning: { ring: 'ring-amber-400/50', border: 'border-amber-500/40', head: 'text-amber-600 dark:text-amber-400', soft: 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400', solid: 'bg-amber-500 text-white' },
  info: { ring: 'ring-cyan-400/50', border: 'border-cyan-500/40', head: 'text-cyan-600 dark:text-cyan-400', soft: 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400', solid: 'bg-cyan-600 text-white' },
  purple: { ring: 'ring-violet-400/50', border: 'border-violet-500/40', head: 'text-purple-600 dark:text-purple-400', soft: 'bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400', solid: 'bg-purple-600 text-white' },
  pink: { ring: 'ring-pink-400/50', border: 'border-pink-500/40', head: 'text-pink-600 dark:text-pink-400', soft: 'bg-pink-50 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400', solid: 'bg-pink-600 text-white' },
  cyan: { ring: 'ring-cyan-400/50', border: 'border-cyan-500/40', head: 'text-cyan-600 dark:text-cyan-400', soft: 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-400', solid: 'bg-cyan-600 text-white' },
  teal: { ring: 'ring-teal-400/50', border: 'border-teal-500/40', head: 'text-teal-600 dark:text-teal-400', soft: 'bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400', solid: 'bg-teal-600 text-white' },
  indigo: { ring: 'ring-indigo-400/50', border: 'border-indigo-500/40', head: 'text-indigo-600 dark:text-indigo-400', soft: 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', solid: 'bg-indigo-600 text-white' },
};

const sizeMap = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
};

const drawerSizeMap = {
  sm: 'w-11/12 sm:w-80',
  md: 'w-11/12 sm:w-96',
  lg: 'w-11/12 sm:max-w-lg',
  xl: 'w-11/12 sm:max-w-xl',
};

// position: 'center' | 'top'
const containerAlign = {
  center: 'items-center',
  top: 'items-start pt-12 sm:pt-16',
};

// transition: 'scale' | 'fade' | 'slide-up' | 'slide-start' | 'slide-end'
const TransitionCfg = {
  scale: {
    enter: 'transition ease-out duration-200', enterFrom: 'opacity-0 scale-95', enterTo: 'opacity-100 scale-100',
    leave: 'transition ease-in duration-150', leaveFrom: 'opacity-100 scale-100', leaveTo: 'opacity-0 scale-95',
  },
  fade: {
    enter: 'transition ease-out duration-200', enterFrom: 'opacity-0', enterTo: 'opacity-100',
    leave: 'transition ease-in duration-150', leaveFrom: 'opacity-100', leaveTo: 'opacity-0',
  },
  'slide-up': {
    enter: 'transition ease-out duration-250', enterFrom: 'opacity-0 translate-y-6', enterTo: 'opacity-100 translate-y-0',
    leave: 'transition ease-in duration-150', leaveFrom: 'opacity-100 translate-y-0', leaveTo: 'opacity-0 translate-y-6',
  },
  'slide-start': {
    enter: 'transition ease-out duration-250', enterFrom: 'opacity-0 -translate-x-full', enterTo: 'opacity-100 translate-x-0',
    leave: 'transition ease-in duration-150', leaveFrom: 'opacity-100 translate-x-0', leaveTo: 'opacity-0 -translate-x-full',
  },
  'slide-end': {
    enter: 'transition ease-out duration-250', enterFrom: 'opacity-0 translate-x-full', enterTo: 'opacity-100 translate-x-0',
    leave: 'transition ease-in duration-150', leaveFrom: 'opacity-100 translate-x-0', leaveTo: 'opacity-0 translate-x-full',
  },
};

// variant: 'soft' | 'outline' | 'solid' | 'glass'
const getPanelClasses = (variant, color) => {
  const tok = colorTokens[color] || colorTokens.primary;
  switch (variant) {
    case 'solid':
      return 'bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 shadow-2xl';
    case 'outline':
      return `bg-white dark:bg-gray-900 border-2 ${tok.border} shadow-2xl`;
    case 'glass':
      return 'bg-white/80 dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl backdrop-blur-2xl';
    case 'soft':
      return `bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 shadow-2xl`;
    default:
      return 'bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/10 shadow-2xl';
  }
};

const Modal = ({
  open,
  isOpen,
  show,
  onClose,
  title,
  description,
  icon,
  children,
  size = 'md', // sm | md | lg | xl
  color = 'primary',
  variant = 'solid', // soft | outline | solid | glass
  position = 'center', // center | top
  transition = 'scale', // scale | fade | slide-up | slide-start | slide-end
  mode = 'dialog', // dialog | drawer-left | drawer-right
  showClose = true,
  primaryAction,
  secondaryAction,
  isRTL = false,
  isOverflow = true,
  footer,
}) => {
  const isModalOpen = Boolean(open ?? isOpen ?? show ?? false);
  const tok = colorTokens[color] || colorTokens.primary;
  const isDrawer = mode === 'drawer-left' || mode === 'drawer-right';

  let effectiveTransition = transition;
  let drawerPosition = '';
  let actualSide = '';

  if (isDrawer) {
    if (isRTL) {
      if (mode === 'drawer-right') {
        actualSide = 'left';
        drawerPosition = 'justify-start';
        effectiveTransition = transition === 'scale' ? 'slide-end' : transition;
      } else {
        actualSide = 'right';
        drawerPosition = 'justify-end';
        effectiveTransition = transition === 'scale' ? 'slide-start' : transition;
      }
    } else {
      if (mode === 'drawer-right') {
        actualSide = 'right';
        drawerPosition = 'justify-end';
        effectiveTransition = transition === 'scale' ? 'slide-end' : transition;
      } else {
        actualSide = 'left';
        drawerPosition = 'justify-start';
        effectiveTransition = transition === 'scale' ? 'slide-start' : transition;
      }
    }
  }

  const T = TransitionCfg[effectiveTransition] || TransitionCfg.scale;
  const drawerRounding = isDrawer
    ? (actualSide === 'right' ? 'rounded-s-3xl' : 'rounded-e-3xl')
    : 'rounded-2xl sm:rounded-3xl';

  return (
    <Transition show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className={`fixed inset-0 flex ${isDrawer ? 'items-stretch' : (containerAlign[position] || containerAlign.center)} ${isDrawer ? drawerPosition : 'justify-center'} ${isDrawer ? '' : 'p-4 sm:p-6'}`}>
          <Transition.Child
            as={Fragment}
            enter={T.enter}
            enterFrom={T.enterFrom}
            enterTo={T.enterTo}
            leave={T.leave}
            leaveFrom={T.leaveFrom}
            leaveTo={T.leaveTo}
          >
            <Dialog.Panel className={`
              ${isDrawer ? `h-full flex flex-col min-h-screen max-h-screen ${drawerSizeMap[size] || drawerSizeMap.md}` : `w-full ${sizeMap[size] || sizeMap.md} max-h-full flex flex-col`}
              ${getPanelClasses(variant, color)}
              ${drawerRounding}
              focus:outline-none ${isOverflow ? 'overflow-hidden' : ''}
            `}>
              {/* Header */}
              {(title || showClose || icon) && (
                <div className="shrink-0 px-6 py-5 border-b border-slate-200/80 dark:border-white/10 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    {icon && (
                      <div className={`p-2.5 rounded-xl shrink-0 ${tok.soft}`}>
                        {icon}
                      </div>
                    )}
                    <div>
                      {title && <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">{title}</Dialog.Title>}
                      {description && <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</Dialog.Description>}
                    </div>
                  </div>
                  {showClose && (
                    <button
                      onClick={onClose}
                      className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shrink-0"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="px-6 py-5 flex-1 overflow-y-auto text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {children}
              </div>

              {/* Footer */}
              {(footer || primaryAction || secondaryAction) && (
                <div className="shrink-0 px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center justify-end gap-3">
                  {footer ? (
                    footer
                  ) : (
                    <>
                      {secondaryAction && (
                        <Button
                          variant={secondaryAction.variant || 'outline'}
                          color={secondaryAction.color || color}
                          onClick={secondaryAction.onClick}
                          size="md"
                        >
                          {secondaryAction.label || 'Cancel'}
                        </Button>
                      )}
                      {primaryAction && (
                        <Button
                          variant={primaryAction.variant || 'solid'}
                          color={primaryAction.color || color}
                          onClick={primaryAction.onClick}
                          size="md"
                        >
                          {primaryAction.label || 'Confirm'}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
