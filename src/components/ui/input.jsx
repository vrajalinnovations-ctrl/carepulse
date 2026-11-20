import React, { useId, useMemo, useRef, useState } from 'react';
import { FiEye, FiEyeOff, FiSearch, FiX, FiUpload, FiPlus, FiMinus, FiChevronDown } from 'react-icons/fi';

// Color tokens aligned to design system palette
const palette = {
  primary: {
    ring: 'focus:ring-2 focus:ring-primary/20',
    border: 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20',
    text: 'text-primary',
    soft: 'bg-primary/5 dark:bg-primary/10 border-primary/20',
    focus: 'focus:border-primary focus:bg-white dark:focus:bg-white/10',
    caret: 'caret-primary',
  },
  emerald: {
    ring: 'focus:ring-2 focus:ring-emerald-500/20',
    border: 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    soft: 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20',
    focus: 'focus:border-emerald-500 focus:bg-white dark:focus:bg-white/10',
    caret: 'caret-emerald-500',
  },
  rose: {
    ring: 'focus:ring-2 focus:ring-rose-500/20',
    border: 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20',
    text: 'text-rose-600 dark:text-rose-400',
    soft: 'bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/20',
    focus: 'focus:border-rose-500 focus:bg-white dark:focus:bg-white/10',
    caret: 'caret-rose-500',
  },
  indigo: {
    ring: 'focus:ring-2 focus:ring-indigo-500/20',
    border: 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    soft: 'bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500/20',
    focus: 'focus:border-indigo-500 focus:bg-white dark:focus:bg-white/10',
    caret: 'caret-indigo-500',
  },
  amber: {
    ring: 'focus:ring-2 focus:ring-amber-500/20',
    border: 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20',
    text: 'text-amber-600 dark:text-amber-400',
    soft: 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20',
    focus: 'focus:border-amber-500 focus:bg-white dark:focus:bg-white/10',
    caret: 'caret-amber-500',
  },
  cyan: {
    ring: 'focus:ring-2 focus:ring-cyan-500/20',
    border: 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    soft: 'bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/20',
    focus: 'focus:border-cyan-500 focus:bg-white dark:focus:bg-white/10',
    caret: 'caret-cyan-500',
  },
  slate: {
    ring: 'focus:ring-2 focus:ring-slate-500/20',
    border: 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20',
    text: 'text-slate-600 dark:text-slate-300',
    soft: 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700',
    focus: 'focus:border-slate-500 focus:bg-white dark:focus:bg-white/10',
    caret: 'caret-slate-500',
  },
};

const sizeMap = {
  sm: { input: 'h-9 text-xs sm:text-sm', padding: 'px-3', radius: 'rounded-xl', icon: 'text-sm', gap: 'gap-2', textarea: 'text-sm', addon: 'px-3 text-xs' },
  md: { input: 'h-10 text-sm', padding: 'px-3.5', radius: 'rounded-xl', icon: 'text-base', gap: 'gap-2.5', textarea: 'text-sm', addon: 'px-3.5 text-xs font-medium' },
  lg: { input: 'h-12 text-base', padding: 'px-4', radius: 'rounded-2xl', icon: 'text-lg', gap: 'gap-3', textarea: 'text-base', addon: 'px-4 text-sm' },
};

// Flexible, unified Input component with improved design and structure
const Input = ({
  id,
  type = 'text',
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  size = 'md',
  variant = 'outline', // outline | soft | underline | ghost
  color = 'primary',
  required = false,
  disabled = false,
  readOnly = false,
  error,
  success = false,
  helper,
  options = [],
  rows = 3,
  min,
  max,
  step,
  clearable = false,
  showCount = false,
  maxLength,
  leadingIcon,
  trailingIcon,
  addonStart,
  addonEnd,
  inputClassName = '',
  className = '',
  iconInside = true,
  floating = false,
  noBorder = false,
  fullWidth,
  children,
  ...rest
}) => {
  const pal = palette[color] || palette.primary;
  const sz = sizeMap[size] || sizeMap.md;
  const [showPw, setShowPw] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);
  const generatedId = useId();
  const inputId = id || generatedId;

  const isInvalid = !!error;

  const baseField = useMemo(() => {
    const ring = pal.ring;
    const caret = pal.caret;
    const bg =
      variant === 'glass'
        ? 'glass-input'
        : variant === 'soft'
        ? `${pal.soft}`
        : variant === 'ghost'
        ? 'bg-transparent border-transparent'
        : 'bg-slate-100/70 dark:bg-white/5 backdrop-blur-md hover:bg-slate-100/90 dark:hover:bg-white/8';
    const underline =
      variant === 'underline'
        ? 'border-0 border-b-2 border-slate-300 dark:border-white/10 rounded-none bg-transparent px-0 focus:border-primary focus:ring-0'
        : '';
    const outline =
      variant === 'glass'
        ? ''
        : variant === 'outline' || variant === 'soft' || variant === 'ghost'
        ? noBorder
          ? ''
          : `border ${pal.border}`
        : '';
    const round = variant === 'underline' ? '' : sz.radius;
    const padX = variant === 'underline' ? 'px-0' : sz.padding;
    const height = type === 'textarea' ? '' : sz.input;
    const state = isInvalid
      ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500'
      : success
      ? 'border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
      : pal.focus;

    return `block w-full ${height} ${padX} ${round} ${bg} ${outline} ${underline} ${ring} ${state} ${caret} text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200 focus:outline-none shadow-xs disabled:opacity-50 disabled:cursor-not-allowed`;
  }, [variant, pal, sz, type, isInvalid, success, noBorder]);

  const wrapBase = `flex items-stretch ${sz.gap} ${variant === 'underline' ? 'pb-1' : ''}`;
  const addonCls = `inline-flex items-center ${sz.addon} ${sz.radius} bg-slate-100/70 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-slate-200 dark:border-white/10 shrink-0 select-none backdrop-blur-md`;

  const padLeftClass =
    iconInside && leadingIcon
      ? size === 'sm'
        ? 'ltr:pl-9 rtl:pr-9'
        : size === 'lg'
        ? 'ltr:pl-12 rtl:pr-12'
        : 'ltr:pl-10 rtl:pr-10'
      : '';
  const padRightClassBase = (szName) =>
    szName === 'sm' ? 'ltr:pr-9 rtl:pl-9' : szName === 'lg' ? 'ltr:pr-12 rtl:pl-12' : 'ltr:pr-10 rtl:pl-10';
  const padRightForTrailing = iconInside && trailingIcon ? padRightClassBase(size) : '';

  const renderControl = () => {
    // textarea
    if (type === 'textarea') {
      return (
        <div className="relative w-full">
          <textarea
            id={inputId}
            ref={inputRef}
            className={`${baseField} ${sz.textarea} min-h-24 py-2.5 resize-y ${inputClassName}`}
            placeholder={placeholder}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
          />
          {showCount && typeof maxLength === 'number' && (
            <span className="absolute bottom-2 ltr:right-2.5 rtl:left-2.5 text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              {`${value?.length ?? 0}/${maxLength}`}
            </span>
          )}
        </div>
      );
    }

    // select
    if (type === 'select') {
      return (
        <div className="relative w-full">
          <select
            id={inputId}
            ref={inputRef}
            className={`${baseField} appearance-none pr-9 cursor-pointer ${inputClassName}`}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            {...rest}
          >
            {children ? (
              children
            ) : (
              <>
                {placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options.map((opt, i) => (
                  <option
                    key={i}
                    value={typeof opt === 'string' ? opt : opt.value}
                    className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  >
                    {typeof opt === 'string' ? opt : opt.label}
                  </option>
                ))}
              </>
            )}
          </select>
          <span className="pointer-events-none absolute inset-y-0 ltr:right-3 rtl:left-3 flex items-center text-gray-400">
            <FiChevronDown className="w-4 h-4" />
          </span>
        </div>
      );
    }

    // file upload
    if (type === 'file') {
      return (
        <label className={`flex items-center justify-between ${sz.gap} ${sz.radius} border border-dashed ${pal.border} ${pal.ring} ${pal.focus} px-4 py-2.5 cursor-pointer bg-slate-50/50 dark:bg-gray-900/40 hover:bg-slate-100/70 dark:hover:bg-gray-800/50 transition-colors`}>
          <div className="flex items-center gap-2.5 truncate">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
              <FiUpload className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {fileName || placeholder || 'Choose file or drag & drop...'}
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shrink-0">
            Browse
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            {...rest}
          />
        </label>
      );
    }

    // color picker
    if (type === 'color') {
      return (
        <div className="flex items-center gap-3">
          <input
            id={inputId}
            ref={inputRef}
            type="color"
            className={`h-10 w-16 p-1 border ${pal.border} ${sz.radius} bg-white dark:bg-gray-900 cursor-pointer shadow-xs`}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
          />
          <span className="text-xs font-mono px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700">
            {value || '#6366f1'}
          </span>
        </div>
      );
    }

    // range slider
    if (type === 'range') {
      return (
        <div className="w-full py-2">
          <input
            id={inputId}
            ref={inputRef}
            type="range"
            min={min ?? 0}
            max={max ?? 100}
            step={step ?? 1}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-slate-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
            {...rest}
          />
        </div>
      );
    }

    // password with toggle
    if (type === 'password') {
      return (
        <div className="relative w-full">
          <input
            id={inputId}
            ref={inputRef}
            type={showPw ? 'text' : 'password'}
            className={`${baseField} ${padLeftClass} ${padRightClassBase(size)} ${inputClassName}`}
            placeholder={placeholder || ''}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            {...rest}
          />
          {iconInside && leadingIcon && (
            <span className={`pointer-events-none absolute inset-y-0 ltr:left-3.5 rtl:right-3.5 flex items-center ${sz.icon} text-gray-400`}>
              {leadingIcon}
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className={`absolute inset-y-0 ltr:right-2 rtl:left-2 my-auto h-7 w-7 inline-flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors`}
          >
            {showPw ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
      );
    }

    // number with integrated stepper
    if (type === 'number') {
      const inc = () => {
        const curr = parseFloat(inputRef.current?.value || value || 0);
        const next = isNaN(curr) ? 0 : curr + (step || 1);
        onChange && onChange({ target: { value: String(next) } });
      };
      const dec = () => {
        const curr = parseFloat(inputRef.current?.value || value || 0);
        const next = isNaN(curr) ? 0 : curr - (step || 1);
        onChange && onChange({ target: { value: String(next) } });
      };
      const numWrapBg =
        variant === 'glass'
          ? 'glass-input'
          : `border ${pal.border} bg-white dark:bg-gray-900/60`;
      return (
        <div className={`relative flex items-center w-full ${numWrapBg} ${sz.radius} overflow-hidden shadow-xs focus-within:ring-2 ${pal.ring} focus-within:${pal.focus}`}>
          <button
            type="button"
            onClick={dec}
            aria-label="Decrease value"
            className="h-10 px-3.5 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 border-r border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
          >
            <FiMinus className="w-3.5 h-3.5" />
          </button>
          <input
            id={inputId}
            ref={inputRef}
            type="number"
            className="w-full text-center bg-transparent border-none text-gray-900 dark:text-white focus:outline-none text-sm font-semibold py-2"
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            min={min}
            max={max}
            step={step}
            {...rest}
          />
          <button
            type="button"
            onClick={inc}
            aria-label="Increase value"
            className="h-10 px-3.5 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 border-l border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    }

    // search with clear button
    if (type === 'search') {
      const doClear = () => {
        if (onChange) onChange({ target: { value: '' } });
        if (inputRef.current) inputRef.current.value = '';
      };
      return (
        <div className="relative w-full">
          <input
            id={inputId}
            ref={inputRef}
            type="search"
            className={`${baseField} ${padLeftClass || 'pl-10'} ${clearable ? padRightClassBase(size) : ''} ${inputClassName}`}
            placeholder={placeholder || 'Search records...'}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            {...rest}
          />
          <span className={`pointer-events-none absolute inset-y-0 ltr:left-3.5 rtl:right-3.5 flex items-center ${sz.icon} text-gray-400`}>
            <FiSearch className="w-4 h-4" />
          </span>
          {clearable && (value || defaultValue) && (
            <button
              type="button"
              onClick={doClear}
              className="absolute inset-y-0 ltr:right-2.5 rtl:left-2.5 my-auto h-6 w-6 inline-flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      );
    }

    // standard text-like inputs
    return (
      <div className="relative w-full">
        <input
          id={inputId}
          ref={inputRef}
          type={type}
          className={`${baseField} ${padLeftClass} ${padRightForTrailing} ${inputClassName}`}
          placeholder={placeholder || ''}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          min={min}
          max={max}
          step={step}
          {...rest}
        />
        {iconInside && leadingIcon && (
          <span className={`pointer-events-none absolute inset-y-0 ltr:left-3.5 rtl:right-3.5 flex items-center ${sz.icon} text-gray-400`}>
            {leadingIcon}
          </span>
        )}
        {iconInside && trailingIcon && (
          <span className={`pointer-events-none absolute inset-y-0 ltr:right-3.5 rtl:left-3.5 flex items-center ${sz.icon} text-gray-400`}>
            {trailingIcon}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className={wrapBase}>
        {addonStart && <span className={addonCls}>{addonStart}</span>}
        <div className="flex-1 min-w-0">{renderControl()}</div>
        {addonEnd && <span className={addonCls}>{addonEnd}</span>}
      </div>
      {(helper || error) && (
        <div className="mt-1.5 text-xs">
          {error ? (
            <span className="text-rose-500 font-medium flex items-center gap-1">
              {typeof error === 'string' ? error : 'Invalid field input'}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{helper}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
