import { useId, useRef, useState } from 'react';
import SearchIcon from '../../icons/line_icons/line_search.svg?react';
import ClearIcon  from '../../icons/fill_icons/fill_cross-circle.svg?react';
import styles from './search.module.css';

/**
 * Search — MCP Design System
 *
 * Structure (derived from Figma Search Variants grid):
 *   Search
 *   └── Input Field
 *         ├── Icon Left  (search icon — ONLY when input is empty)
 *         ├── Text / Placeholder
 *         └── Clear button (× — ONLY when value exists)
 *
 * Behavior rules (per Figma):
 *   • Empty   → search icon visible, no clear button.
 *   • Has value → no search icon, clear button visible.
 *   • Search icon and clear button are mutually exclusive — never both.
 *   • Clicking clear → empties value → input focused → search icon reappears.
 *   • No labels, help text, or error states.
 *   • Disabled → muted (40 % opacity), non-interactive.
 *
 * Supports both controlled (value + onChange) and uncontrolled (defaultValue).
 *
 * Props
 * ─────
 * placeholder   string            default 'Search'
 * value         string            Controlled value
 * defaultValue  string            Uncontrolled initial value
 * onChange      function(e)       Native input change handler
 * onClear       function()        Called after the value is cleared
 * onSearch      function(value)   Called on Enter / form submit
 * disabled      boolean           default false
 * id            string            Input id (auto-generated if omitted)
 * name          string            Native input name
 * className     string            Extra class on the root element
 */
export function Search({
  placeholder = 'Search',
  value,
  defaultValue,
  onChange,
  onClear,
  onSearch,
  disabled = false,
  id,
  name,
  className,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const inputRef = useRef(null);

  /* ── Controlled / uncontrolled dual-mode ─────────────────────────────── */
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const currentValue = isControlled ? value : internalValue;
  const hasValue = Boolean(currentValue);

  function handleChange(e) {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  }

  function handleClear() {
    if (!isControlled) setInternalValue('');
    /* Simulate a synthetic change event so controlled callers can reset */
    onChange?.({ target: { value: '', name: name || '' } });
    onClear?.();
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onSearch?.(currentValue);
    }
    if (e.key === 'Escape' && hasValue) {
      handleClear();
    }
  }

  const rootCls = [
    styles.root,
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls} role="search">
      <div className={styles.box}>
        <div className={styles.content}>
          {/* Search icon — only when empty */}
          {!hasValue && (
            <SearchIcon className={styles.searchIcon} aria-hidden="true" />
          )}

          {/* Text input */}
          <input
            ref={inputRef}
            id={inputId}
            name={name}
            type="search"
            className={styles.input}
            placeholder={placeholder}
            value={isControlled ? value : undefined}
            defaultValue={!isControlled ? defaultValue : undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-label={placeholder}
            autoComplete="off"
            {...rest}
          />

          {/* Clear button — only when has value */}
          {hasValue && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear search"
              tabIndex={disabled ? -1 : 0}
            >
              <ClearIcon className={styles.clearIcon} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
