import { useRef, useEffect } from 'react';
import styles from './checkbox.module.css';
import CheckIcon from '../../icons/line_icons/line_check.svg?react';
import MinusIcon from '../../icons/line_icons/line_minus.svg?react';

/**
 * Checkbox — MCP Design System
 *
 * Props
 * ─────
 * checked        boolean                   false    Checked state
 * indeterminate  boolean                   false    Partial-selection state (overrides check icon)
 * disabled       boolean                   false    Mutes interaction and reduces opacity
 * size           'small' | 'medium'        'small'  Control size
 * label          string                    —        Label text
 * showLabel      boolean                   true     Show or hide the label
 * onChange       function                  —        Change handler (event) => void
 * id             string                    —        Native input id
 * className      string                    —        Extra class on the wrapper
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  size = 'small',
  label,
  showLabel = true,
  onChange,
  id,
  className,
  ...rest
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isFilled = checked || indeterminate;

  const wrapperCls = [
    styles.wrapper,
    styles[size],
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  const controlCls = [
    styles.control,
    isFilled ? styles.filled : styles.empty,
  ].join(' ');

  return (
    <label className={wrapperCls}>
      <span className={controlCls}>
        <input
          ref={inputRef}
          type="checkbox"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          onChange={onChange ?? (() => {})}
          id={id}
          {...rest}
        />
        <span className={styles.box} />
        {isFilled && (
          <span className={styles.icon}>
            {indeterminate ? <MinusIcon /> : <CheckIcon />}
          </span>
        )}
      </span>
      {showLabel && label && (
        <span className={styles.label}>{label}</span>
      )}
    </label>
  );
}
