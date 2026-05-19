import { useState, useRef, useEffect, useId } from 'react';
import { countries } from 'countries-list';
import 'flag-icons/css/flag-icons.min.css';
import ChevronIcon from '../../icons/line_icons/line_caret-down.svg?react';
import styles from './mobileNumber.module.css';

/**
 * Build a sorted country list once at module load.
 * countries-list v3 — phone is an array of numbers.
 */
const COUNTRY_LIST = Object.entries(countries)
  .map(([iso, data]) => ({
    iso,
    name: data.name,
    dialCode: `+${data.phone[0]}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

/** Circular flag using flag-icons CSS background. */
function FlagIcon({ iso, size = 20 }) {
  return (
    <span
      className={`fi fi-${iso.toLowerCase()} fis`}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * MobileNumber — MCP Design System
 *
 * Structure (derived from Figma Mobile Number Variants grid):
 *   MobileNumber
 *   ├── Label Row (optional)
 *   │     ├── Label (left)
 *   │     └── Secondary Label (right)
 *   ├── Input Field
 *   │     ├── Country trigger (flag + dial code + chevron)
 *   │     ├── Divider (1 px vertical line)
 *   │     └── Phone number input (tel)
 *   ├── Country Dropdown (portal-less, absolute)
 *   ├── Help Message  (optional)
 *   └── Error Message (optional)
 *
 * Behavior rules (per Figma Notes):
 *   • Help and Error are independent — both can appear simultaneously.
 *   • Message order: Help first, then Error.
 *   • Error styling applied ONLY when showErrorMessage = true.
 *   • Focused + error → danger focus ring.
 *   • Disabled → 40 % opacity, non-interactive.
 *   • User cannot type the dial code — it comes from the country selector.
 *
 * Props
 * ─────
 * label             string            Optional label above the input
 * secondaryLabel    string            Optional right-aligned hint
 * placeholder       string            Phone-number placeholder
 * value             string            Controlled phone-number value
 * defaultValue      string            Uncontrolled initial value
 * onChange          function(e)       Phone-number change handler
 * defaultCountry    string            ISO-2 code, default 'IN'
 * onCountryChange   function({iso, name, dialCode})
 * disabled          boolean           default false
 * showHelpMessage   boolean           default false
 * helpMessage       string
 * showErrorMessage  boolean           default false
 * errorMessage      string
 * id                string            Input id (auto-generated if omitted)
 * name              string            Native input name
 * className         string            Extra class on root element
 */
export function MobileNumber({
  label,
  secondaryLabel,
  placeholder = 'Enter number',
  value,
  defaultValue,
  onChange,
  defaultCountry = 'IN',
  onCountryChange,
  disabled = false,
  showHelpMessage = false,
  helpMessage,
  showErrorMessage = false,
  errorMessage,
  id,
  name,
  className,
  ...rest
}) {
  const generatedId = useId();
  const inputId  = id || generatedId;
  const helpId   = `${inputId}-help`;
  const errorId  = `${inputId}-error`;

  const [selectedIso, setSelectedIso] = useState(
    defaultCountry.toUpperCase()
  );
  const [isOpen, setIsOpen]   = useState(false);
  const [search, setSearch]   = useState('');
  const wrapRef   = useRef(null);
  const searchRef = useRef(null);

  const selectedCountry =
    COUNTRY_LIST.find(c => c.iso === selectedIso) || COUNTRY_LIST[0];

  const filtered = search.trim()
    ? COUNTRY_LIST.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dialCode.includes(search.trim())
      )
    : COUNTRY_LIST;

  const hasHelp  = showHelpMessage  && Boolean(helpMessage);
  const hasError = showErrorMessage && Boolean(errorMessage);

  const describedBy =
    [hasHelp ? helpId : null, hasError ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  /* ── Close dropdown on outside click / Escape ─────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    function onMouseDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
      }
    }

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    /* Auto-focus the search field when dropdown opens */
    const t = setTimeout(() => searchRef.current?.focus(), 0);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(t);
    };
  }, [isOpen]);

  function selectCountry(country) {
    setSelectedIso(country.iso);
    setIsOpen(false);
    setSearch('');
    onCountryChange?.(country);
  }

  function toggleOpen() {
    if (!disabled) setIsOpen(o => !o);
  }

  /* ── Class names ─────────────────────────────────────────────────────── */
  const rootCls = [
    styles.root,
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  const boxCls = [
    styles.box,
    hasError ? styles['box--error'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      {/* ── Label row ──────────────────────────────────────────────────── */}
      {(label || secondaryLabel) && (
        <div className={styles.labelRow}>
          {label && (
            <label className={styles.label} htmlFor={inputId}>
              {label}
            </label>
          )}
          {secondaryLabel && (
            <span className={styles.secondaryLabel}>{secondaryLabel}</span>
          )}
        </div>
      )}

      {/* ── Input wrap (anchor for the absolute dropdown) ─────────────── */}
      <div className={styles.inputWrap} ref={wrapRef}>
        <div className={boxCls}>
          {/* Country trigger */}
          <button
            type="button"
            className={styles.trigger}
            onClick={toggleOpen}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={`Country: ${selectedCountry.name} (${selectedCountry.dialCode})`}
            tabIndex={disabled ? -1 : 0}
          >
            <FlagIcon iso={selectedIso} size={20} />
            <span className={styles.dialCode}>{selectedCountry.dialCode}</span>
            <ChevronIcon
              className={styles.chevron}
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
              aria-hidden="true"
            />
          </button>

          {/* Vertical divider */}
          <div className={styles.divider} aria-hidden="true" />

          {/* Phone number input */}
          <input
            id={inputId}
            name={name}
            type="tel"
            inputMode="numeric"
            className={styles.input}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            {...rest}
          />
        </div>

        {/* ── Country dropdown ─────────────────────────────────────────── */}
        {isOpen && (
          <div
            className={styles.dropdown}
            role="listbox"
            aria-label="Select country"
          >
            {/* Search */}
            <div className={styles.searchWrap}>
              <input
                ref={searchRef}
                type="search"
                className={styles.searchInput}
                placeholder="Search country or code…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search countries"
              />
            </div>

            {/* Country list */}
            <ul className={styles.list}>
              {filtered.length === 0 ? (
                <li className={styles.empty}>No countries found</li>
              ) : (
                filtered.map(c => (
                  <li
                    key={`${c.iso}-${c.dialCode}`}
                    role="option"
                    aria-selected={c.iso === selectedIso}
                    className={[
                      styles.item,
                      c.iso === selectedIso ? styles['item--active'] : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => selectCountry(c)}
                    onKeyDown={e => e.key === 'Enter' && selectCountry(c)}
                    tabIndex={0}
                  >
                    <FlagIcon iso={c.iso} size={18} />
                    <span className={styles.itemName}>{c.name}</span>
                    <span className={styles.itemDial}>{c.dialCode}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* ── Messages ─────────────────────────────────────────────────────── */}
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
