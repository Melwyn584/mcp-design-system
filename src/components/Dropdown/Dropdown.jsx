import { useId, useRef, useState, useEffect } from 'react';
import ChevronDownIcon from '../../icons/line_icons/line_angle-down.svg?react';
import ChevronUpIcon from '../../icons/line_icons/line_angle-up.svg?react';
import styles from './dropdown.module.css';

/**
 * Dropdown — MCP Design System
 *
 * Structure (derived strictly from Figma's Dropdown Variants grid):
 *   Dropdown
 *   ├── Label Row (optional)
 *   │     ├── Label (left)
 *   │     └── Secondary Label (right)
 *   ├── Trigger Button (shows selected value or placeholder + chevron)
 *   ├── Menu (rendered below trigger when open)
 *   │     └── Option items
 *   ├── Help Message (optional)
 *   └── Error Message (optional)
 *
 * Key behavior (per Figma "Notes"):
 *   • User does NOT type freely — value is selected via menu.
 *   • Chevron points down when closed, up when open.
 *   • Error styling: border + focus ring change to danger.
 *   • Disabled: 40% opacity, non-interactive.
 *   • Help and Error are independent — both can show at once.
 *   • Message order is strict: Help first, then Error.
 *
 * Props
 * ─────
 * options           Array<string|{value,label}>  List of selectable options
 * label             string                        Optional label above the trigger
 * secondaryLabel    string                        Optional right-aligned hint in the label row
 * value             string                        Controlled selected value
 * defaultValue      string                        Uncontrolled initial value
 * onChange          function(value)               Called when selection changes
 * placeholder       string                        Shown when no option is selected
 * disabled          boolean                       default false
 * showHelpMessage   boolean                       default false
 * helpMessage       string                        Help text shown below the trigger
 * showErrorMessage  boolean                       default false
 * errorMessage      string                        Error text shown below help
 * id                string                        id for the trigger (auto-generated if omitted)
 * name              string                        name attribute for a hidden <input>
 * className         string                        Additional class on the root wrapper
 */
export function Dropdown({
  options = [],
  label,
  secondaryLabel,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  showHelpMessage = false,
  helpMessage,
  showErrorMessage = false,
  errorMessage,
  id,
  name,
  className,
}) {
  const generatedId = useId();
  const triggerId = id || generatedId;
  const menuId    = `${triggerId}-menu`;
  const helpId    = `${triggerId}-help`;
  const errorId   = `${triggerId}-error`;

  const normalizedOptions = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o
  );

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const selectedValue = isControlled ? value : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const rootRef    = useRef(null);
  const triggerRef = useRef(null);
  const menuRef    = useRef(null);

  const hasHelp  = showHelpMessage  && Boolean(helpMessage);
  const hasError = showErrorMessage && Boolean(errorMessage);

  const selectedLabel = normalizedOptions.find((o) => o.value === selectedValue)?.label ?? '';

  const describedBy = [
    hasHelp  ? helpId  : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  /* ── close on outside click ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  /* ── focus the highlighted menu item ── */
  useEffect(() => {
    if (!isOpen || focusedIndex < 0) return;
    const items = menuRef.current?.querySelectorAll('[role="option"]');
    items?.[focusedIndex]?.focus();
  }, [isOpen, focusedIndex]);

  function open() {
    if (disabled) return;
    const currentIndex = normalizedOptions.findIndex((o) => o.value === selectedValue);
    setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function select(optValue) {
    if (!isControlled) setInternalValue(optValue);
    onChange?.(optValue);
    close();
  }

  function handleTriggerKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      open();
    }
    if (e.key === 'Escape') close();
  }

  function handleOptionKeyDown(e, optValue, index) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(optValue);
    }
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(Math.min(index + 1, normalizedOptions.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) close();
      else setFocusedIndex(index - 1);
    }
    if (e.key === 'Tab') close();
  }

  const rootCls = [
    styles.root,
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  const triggerCls = [
    styles.trigger,
    isOpen    ? styles['trigger--open']  : '',
    hasError  ? styles['trigger--error'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls} ref={rootRef}>
      {/* Hidden native input for form submission */}
      {name && <input type="hidden" name={name} value={selectedValue} />}

      {/* Label row */}
      {(label || secondaryLabel) && (
        <div className={styles.labelRow}>
          {label && (
            <label className={styles.label} htmlFor={triggerId}>
              {label}
            </label>
          )}
          {secondaryLabel && (
            <span className={styles.secondaryLabel}>{secondaryLabel}</span>
          )}
        </div>
      )}

      {/* Trigger */}
      <div className={styles.triggerWrap}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-disabled={disabled || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          className={triggerCls}
          onClick={() => (isOpen ? close() : open())}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={selectedLabel ? styles.value : styles.placeholder}>
            {selectedLabel || placeholder}
          </span>
          <span className={styles.chevron} aria-hidden="true">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
        </button>

        {/* Menu */}
        {isOpen && (
          <ul
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-label={label || 'Options'}
            className={styles.menu}
          >
            {normalizedOptions.map((opt, i) => {
              const isSelected = opt.value === selectedValue;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  className={[
                    styles.option,
                    isSelected ? styles['option--selected'] : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => select(opt.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, opt.value, i)}
                >
                  {opt.label}
                </li>
              );
            })}
            {normalizedOptions.length === 0 && (
              <li className={styles.empty} role="option" aria-disabled="true">
                No options available
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Messages */}
      {hasHelp && (
        <p id={helpId} className={`${styles.message} ${styles.help}`}>
          {helpMessage}
        </p>
      )}
      {hasError && (
        <p id={errorId} className={`${styles.message} ${styles.error}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
