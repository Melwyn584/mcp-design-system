import { useId } from 'react';
import styles from './textInput.module.css';

/**
 * TextInput — MCP Design System
 *
 * Structure (derived strictly from Figma's Input Field Variants grid):
 *   TextInput
 *   ├── Label Row (optional)
 *   │     ├── Label (left)
 *   │     └── Secondary Label (right)
 *   ├── Input Field
 *   ├── Help Message  (optional)
 *   └── Error Message (optional)
 *
 * Behavior rules (per Figma "Notes" frame):
 *   • Error styling is applied ONLY when showErrorMessage = true.
 *   • Help and Error are independent — both can exist at the same time.
 *   • Message order is strict: Help first, then Error.
 *   • Focus + error → use error focus ring (not default blue).
 *   • Disabled → muted + non-interactive (40% opacity).
 *
 * Props
 * ─────
 * label             string              Optional label above the input
 * secondaryLabel    string              Optional right-aligned hint in the label row
 * placeholder       string              Placeholder text
 * value             string              Controlled value
 * defaultValue      string              Uncontrolled initial value
 * onChange          function(e)         Change handler
 * disabled          boolean             default false
 * showHelpMessage   boolean             default false
 * helpMessage       string              Help text shown below the input
 * showErrorMessage  boolean             default false
 * errorMessage      string              Error text shown below help
 * id                string              Input element id (auto-generated if omitted)
 * name              string              Input name attribute
 * type              string              default 'text'
 * className         string              Additional class names on the root element
 */
export function TextInput({
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
  type = 'text',
  className,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helpId  = `${inputId}-help`;
  const errorId = `${inputId}-error`;

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
          type={type}
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
