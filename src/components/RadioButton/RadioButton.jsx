import styles from './radioButton.module.css';

/**
 * RadioButton — MCP Design System
 *
 * A selection control for mutually exclusive choices. Group radios by
 * sharing the same `name`.
 *
 * Props
 * ─────
 * checked    boolean              false    Selected state
 * disabled   boolean              false    Mutes interaction and reduces opacity
 * size       'small' | 'medium'   'small'  Label size (control is fixed 20px)
 * label      string               —        Label text
 * showLabel  boolean              true     Show or hide the label
 * name       string               —        Radio group name (mutual exclusivity)
 * value      string               —        Value submitted when selected
 * onChange   function             —        Change handler (event) => void
 * id         string               —        Native input id
 * className  string               —        Extra class on the wrapper
 */
export function RadioButton({
  checked = false,
  disabled = false,
  size = 'small',
  label,
  showLabel = true,
  name,
  value,
  onChange,
  id,
  className,
  ...rest
}) {
  const wrapperCls = [
    styles.wrapper,
    styles[size],
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  const controlCls = [
    styles.control,
    checked ? styles.selected : styles.unselected,
  ].join(' ');

  return (
    <label className={wrapperCls}>
      <span className={controlCls}>
        <input
          type="radio"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={onChange ?? (() => {})}
          id={id}
          {...rest}
        />
        <span className={styles.box} />
      </span>
      {showLabel && label && (
        <span className={styles.label}>{label}</span>
      )}
    </label>
  );
}
