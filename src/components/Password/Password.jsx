import { useId, useState } from 'react';
import EyeIcon from '../../icons/line_icons/line_eye.svg?react';
import EyeSlashIcon from '../../icons/line_icons/line_eye-slash.svg?react';
import styles from './password.module.css';

/**
 * Password — MCP Design System
 *
 * Structure (derived from Figma Password Field Variants grid):
 *   Password
 *   ├── Label Row (optional)
 *   │     ├── Label (left)
 *   │     └── Secondary Label (right)
 *   ├── Input Field
 *   │     ├── Password input (type toggled by show/hide)
 *   │     └── Eye toggle button (right)
 *   ├── Help Message  (optional)
 *   └── Error Message (optional)
 *
 * Behavior rules (per Figma):
 *   • type="password" when hidden (dots), type="text" when shown.
 *   • Eye icon = password hidden; Eye-slash icon = password visible.
 *   • Error styling applied ONLY when showErrorMessage = true.
 *   • Help and Error are independent — both can exist at the same time.
 *   • Message order is strict: Help first, then Error.
 *   • Focus + error → use error focus ring (not default blue).
 *   • Disabled → 40% opacity, non-interactive.
 *
 * Props
 * ─────
 * label             string          Optional label above the input
 * secondaryLabel    string          Optional right-aligned hint in the label row
 * placeholder       string          Placeholder text
 * value             string          Controlled value
 * defaultValue      string          Uncontrolled initial value
 * onChange          function(e)     Change handler
 * disabled          boolean         default false
 * showHelpMessage   boolean         default false
 * helpMessage       string          Help text shown below the input
 * showErrorMessage  boolean         default false
 * errorMessage      string          Error text shown below help
 * id                string          Input element id (auto-generated if omitted)
 * name              string          Input name attribute
 * className         string          Additional class names on the root element
 */
export function Password({
  label,
  secondaryLabel,
  placeholder,
  value,
  defaultValue,
  onChange,
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
  const inputId = id || generatedId;
  const helpId  = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  const [showPassword, setShowPassword] = useState(false);

  const hasHelp  = showHelpMessage  && Boolean(helpMessage);
  const hasError = showErrorMessage && Boolean(errorMessage);

  const describedBy = [
    hasHelp  ? helpId  : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  const rootCls = [
    styles.root,
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  const boxCls = [
    styles.box,
    hasError ? styles['box--error'] : '',
    disabled ? styles['box--disabled'] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
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

      <div className={boxCls}>
        <input
          id={inputId}
          name={name}
          type={showPassword ? 'text' : 'password'}
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
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShowPassword(s => !s)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={disabled ? -1 : 0}
        >
          {showPassword
            ? <EyeSlashIcon className={styles.toggleIcon} aria-hidden="true" />
            : <EyeIcon      className={styles.toggleIcon} aria-hidden="true" />
          }
        </button>
      </div>

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
