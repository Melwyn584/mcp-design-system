import styles from './toggleSwitch.module.css';

/**
 * ToggleSwitch — MCP Design System
 *
 * A binary control that toggles a setting on/off with immediate effect.
 * It is NOT a form-submission input and has NO built-in label — provide a
 * label externally and associate it via `id` / `aria-label` / `aria-labelledby`.
 *
 * Props
 * ─────
 * checked    boolean              false    On (true) / Off (false)
 * disabled   boolean              false    Mutes interaction and reduces opacity
 * size       'small' | 'medium'   'small'  Track + thumb scale
 * onChange   function             —        Change handler (event) => void
 * id         string               —        Native input id (for external label)
 * className  string               —        Extra class on the wrapper
 */
export function ToggleSwitch({
  checked = false,
  disabled = false,
  size = 'small',
  onChange,
  id,
  className,
  ...rest
}) {
  const wrapperCls = [
    styles.wrapper,
    styles[size],
    checked ? styles.checked : styles.unchecked,
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <label className={wrapperCls}>
      <input
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        onChange={onChange ?? (() => {})}
        id={id}
        {...rest}
      />
      <span className={styles.track} />
      <span className={styles.thumb} />
    </label>
  );
}
