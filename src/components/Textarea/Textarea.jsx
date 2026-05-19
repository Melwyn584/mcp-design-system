import { useId } from 'react';
import styles from './textarea.module.css';

/**
 * Textarea — MCP Design System
 *
 * Structure (derived strictly from Figma's Textarea Variants grid):
 *   Textarea
 *   ├── Label Row (optional)
 *   │     ├── Label (left)
 *   │     └── Secondary Label (right)
 *   ├── Textarea Field (multi-line)
 *   ├── Help Message  (optional)
 *   └── Error Message (optional)
 *
 * Behavior rules (per Figma "Notes" frame):
 *   • Error styling (red border + shadow) applies ONLY when showErrorMessage = true.
 *   • Help and Error are independent — both can exist at the same time.
 *   • Message order is strict: Help first, then Error.
 *   • Focus + error → use error focus ring (not default blue).
 *   • Disabled → muted + non-interactive (40% opacity).
 *   • Fixed height — no auto-resize unless explicitly implemented.
 *
 * Props
 * ─────
 * label             string              Optional label above the textarea
 * secondaryLabel    string              Optional right-aligned hint in the label row
 * placeholder       string              Placeholder text
 * value             string              Controlled value
 * defaultValue      string              Uncontrolled initial value
 * onChange          function(e)         Change handler
 * disabled          boolean             default false
 * showHelpMessage   boolean             default false
 * helpMessage       string              Help text shown below the textarea
 * showErrorMessage  boolean             default false
 * errorMessage      string              Error text shown below help
 * id                string              Textarea element id (auto-generated if omitted)
 * name              string              Textarea name attribute
 * rows              number              Number of visible rows (default: 5)
 * className         string              Additional class names on the root element
 */
export function Textarea({
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
  rows = 5,
  className,
  ...rest
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const helpId  = `${textareaId}-help`;
  const errorId = `${textareaId}-error`;

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
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      {(label || secondaryLabel) && (
        <div className={styles.labelRow}>
          {label && (
            <label className={styles.label} htmlFor={textareaId}>
              {label}
            </label>
          )}
          {secondaryLabel && (
            <span className={styles.secondaryLabel}>{secondaryLabel}</span>
          )}
        </div>
      )}

      <div className={boxCls}>
        <textarea
          id={textareaId}
          name={name}
          rows={rows}
          className={styles.textarea}
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
