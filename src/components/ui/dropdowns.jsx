import React, { Fragment, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import Button from './buttons';

// Design-system aligned color map
const colorMap = {
  primary: {
    active: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-white',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  secondary: {
    active: 'bg-slate-100 text-slate-900 dark:bg-slate-800/70 dark:text-white',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  success: {
    active: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  danger: {
    active: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  indigo: {
    active: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  warning: {
    active: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  info: {
    active: 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  purple: {
    active: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  pink: {
    active: 'bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
  teal: {
    active: 'bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400',
    idle: 'text-gray-700 dark:text-gray-200',
  },
};

// placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
const alignMap = {
  'bottom-start': 'start-0 top-full mt-1 ltr:origin-top-left rtl:origin-top-right',
  'bottom-end': 'end-0 top-full mt-1 ltr:origin-top-right rtl:origin-top-left',
  'top-start': 'start-0 bottom-full mb-1 ltr:origin-bottom-left rtl:origin-bottom-right',
  'top-end': 'end-0 bottom-full mb-1 ltr:origin-bottom-right rtl:origin-bottom-left',
};

// transition: 'scale' | 'fade' | 'slide'
const TransitionClasses = {
  scale: {
    enter: 'transition ease-out duration-150',
    enterFrom: 'transform opacity-0 scale-95',
    enterTo: 'transform opacity-100 scale-100',
    leave: 'transition ease-in duration-100',
    leaveFrom: 'transform opacity-100 scale-100',
    leaveTo: 'transform opacity-0 scale-95',
  },
  fade: {
    enter: 'transition ease-out duration-150',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition ease-in duration-100',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },
  slide: {
    enter: 'transition ease-out duration-150',
    enterFrom: 'transform opacity-0 -translate-y-1',
    enterTo: 'transform opacity-100 translate-y-0',
    leave: 'transition ease-in duration-100',
    leaveFrom: 'transform opacity-100 translate-y-0',
    leaveTo: 'transform opacity-0 translate-y-1',
  },
};

// Helper component to legally track placement when menu opens
const PlacementWatcher = ({ open, onOpen }) => {
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(onOpen);
      return () => cancelAnimationFrame(id);
    }
  }, [open, onOpen]);
  return null;
};

const DropDown = ({
  label = 'Dropdown',
  items = [],
  variant = 'outline',
  color = 'primary',
  size = 'md',
  disabled = false,
  icon,
  rightIcon = <FiChevronDown className="w-4 h-4" />,
  leftIcon,
  onlyIcon = false,
  className = '',
  placement = 'bottom-start',
  transition = 'scale',
  round = 'default',
  _hoverSwap = false,
  justify = false,
  block = false,
  // New controlled-select API
  selectedItem,
  onSelect,
  placeholder,
  // Custom arbitrary panel (e.g., emoji picker)
  customPanel,
  // Optional controller to programmatically open/close
  controllerRef,
  ...props
}) => {
  const buttonRef = useRef(null);
  const itemsRef = useRef(null);
  const [computedPlacement, setComputedPlacement] = useState(placement);
  const menuAlign = useMemo(() => alignMap[computedPlacement] || alignMap['bottom-start'], [computedPlacement]);
  const T = TransitionClasses[transition] || TransitionClasses.scale;
  const c = colorMap[color] || colorMap.primary;
  const isOpenRef = useRef(false);

  // compute best placement to keep menu within viewport
  const computePlacement = useCallback(() => {
    try {
      const btn = buttonRef.current;
      const menu = itemsRef.current;
      if (!btn || !menu) return placement;
      const btnRect = btn.getBoundingClientRect();
      const prevStyle = menu.style.visibility;
      menu.style.visibility = 'hidden';
      menu.style.display = 'block';
      const menuRect = menu.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isRtl = document.documentElement.dir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl';

      let horiz = placement.endsWith('end') ? 'end' : 'start';
      let vert = placement.startsWith('top') ? 'top' : 'bottom';

      if (!isRtl) {
        const willOverflowRight = btnRect.left + menuRect.width > vw;
        const willOverflowLeft = btnRect.right - menuRect.width < 0;
        if (willOverflowRight) horiz = 'end';
        if (willOverflowLeft) horiz = 'start';
      } else {
        const willOverflowLeft = btnRect.right - menuRect.width < 0;
        const willOverflowRight = btnRect.left + menuRect.width > vw;
        if (willOverflowLeft) horiz = 'end';
        if (willOverflowRight) horiz = 'start';
      }

      const willOverflowBottom = btnRect.bottom + menuRect.height > vh;
      const willOverflowTop = btnRect.top - menuRect.height < 0;
      if (willOverflowBottom) vert = 'top';
      if (willOverflowTop) vert = 'bottom';
      menu.style.visibility = prevStyle;
      menu.style.display = '';
      return `${vert}-${horiz}`;
    } catch {
      return placement;
    }
  }, [placement]);

  useEffect(() => {
    const onResize = () => {
      setComputedPlacement(computePlacement());
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [computePlacement]);

  const handleOpenPlacement = useCallback(() => {
    setComputedPlacement(computePlacement());
  }, [computePlacement]);

  return (
    <Menu as="div" className={`relative inline-block text-start data-[open]:z-50 data-[headlessui-state*=open]:z-50 ${className}`}>
      {({ open }) => {
        isOpenRef.current = open;
        if (controllerRef && typeof controllerRef === 'object') {
          controllerRef.current = controllerRef.current || {};
          controllerRef.current.open = () => { if (!isOpenRef.current) buttonRef.current?.click(); };
          controllerRef.current.close = () => { if (isOpenRef.current) buttonRef.current?.click(); };
          controllerRef.current.toggle = () => { buttonRef.current?.click(); };
        }

        let variantToPass = variant;
        let extraClass = '';

        if (variant === 'bgNone') {
          variantToPass = 'outline';
          extraClass = 'bg-transparent border-none';
        } else if (variant === 'primary') {
          variantToPass = 'solid';
        } else if (variant === 'secondary') {
          variantToPass = 'soft';
        }

        return (
          <>
            <PlacementWatcher open={open} onOpen={handleOpenPlacement} />

            <Menu.Button
              {...props}
              as={Button}
              ref={buttonRef}
              variant={variantToPass}
              color={color}
              size={size}
              round={round}
              rightIcon={onlyIcon ? null : rightIcon}
              leftIcon={onlyIcon ? (icon || null) : leftIcon}
              iconOnly={onlyIcon}
              disabled={disabled}
              block={block}
              justify={justify}
              className={`${extraClass || ''} ${props.className || ''}`.trim()}
            >
              {onlyIcon
                ? null
                : (selectedItem?.label ?? label ?? placeholder ?? 'Select')}
            </Menu.Button>

            <Transition
              as={Fragment}
              show={Boolean(open)}
              enter={T.enter}
              enterFrom={T.enterFrom}
              enterTo={T.enterTo}
              leave={T.leave}
              leaveFrom={T.leaveFrom}
              leaveTo={T.leaveTo}
            >
              <Menu.Items
                ref={itemsRef}
                className={`absolute z-50 ${menuAlign} min-w-48 rounded-xl backdrop-blur-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl p-1 focus:outline-none`}
              >
                {customPanel ? (
                  <div className="py-1">
                    {customPanel}
                  </div>
                ) : (
                  <div className="py-1">
                    {items.map((it) => {
                      const key = it.value ?? it.id ?? it.label;
                      const isOption = typeof onSelect === 'function';
                      const isSelected = isOption && selectedItem?.value === it.value;
                      return (
                        <Menu.Item key={key} disabled={it.disabled}>
                          {({ active, disabled: itemDisabled }) => {
                            let itemCls = 'w-full text-start flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ';
                            if (itemDisabled) {
                              itemCls += 'opacity-50 cursor-not-allowed ';
                            } else if (isSelected && active) {
                              itemCls += 'bg-primary/80 text-white ';
                            } else if (isSelected) {
                              itemCls += 'bg-primary text-white ';
                            } else if (active) {
                              itemCls += `${c.active || 'bg-primary/10 text-primary'} `;
                            } else {
                              itemCls += `${c.idle || 'text-gray-700 dark:text-gray-200'} `;
                            }
                            return (
                              <button
                                type="button"
                                onClick={isOption ? () => onSelect(it) : it.onClick}
                                className={itemCls}
                              >
                                {it.icon && <span className="w-4 h-4 shrink-0">{it.icon}</span>}
                                <span className="flex-1">{it.label}</span>
                                {isOption && (
                                  <span
                                    className={`w-2 h-2 shrink-0 rounded-full ${isSelected ? 'bg-white' : 'bg-transparent border border-gray-500'}`}
                                    aria-hidden
                                  />
                                )}
                                {it.kbd && <span className="text-xs opacity-60">{it.kbd}</span>}
                              </button>
                            );
                          }}
                        </Menu.Item>
                      );
                    })}
                  </div>
                )}
              </Menu.Items>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
};

export default DropDown;
