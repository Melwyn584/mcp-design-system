import styles from './button.module.css';

/**
 * Button — MCP Design System
 *
 * Props
 * ─────
 * type        'primary' | 'accent' | 'danger'   default 'primary'
 * buttonStyle 'filled'  | 'outline' | 'empty'   default 'filled'
 * size        'large'   | 'medium'  | 'small'   default 'medium'
 * disabled    boolean                            default false
 * iconOnly    boolean                            default false
 * showIconLeft  boolean                          default false
 * showIconRight boolean                          default false
 * iconLeft    ReactNode — icon to show on left
 * iconRight   ReactNode — icon to show on right
 * icon        ReactNode — used when iconOnly=true
 * children    string label (falls back to 'Button')
 * onClick     function
 * htmlType    'button' | 'submit' | 'reset'     default 'button'
 */
export function Button({
  type = 'primary',
  buttonStyle = 'filled',
  size = 'medium',
  disabled = false,
  iconOnly = false,
  showIconLeft = false,
  showIconRight = false,
  iconLeft,
  iconRight,
  icon,
  children = 'Button',
  onClick,
  htmlType = 'button',
  className,
  ...rest
}) {
  const cls = [
    styles.btn,
    styles[size],
    styles[type],
    styles[buttonStyle],
    iconOnly ? styles.iconOnly : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={htmlType}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      aria-label={iconOnly && typeof children === 'string' ? children : undefined}
      {...rest}
    >
      {iconOnly ? (
        <span className={styles.icon}>{icon}</span>
      ) : (
        <>
          {showIconLeft && iconLeft && (
            <span className={styles.icon}>{iconLeft}</span>
          )}
          <span>{children}</span>
          {showIconRight && iconRight && (
            <span className={styles.icon}>{iconRight}</span>
          )}
        </>
      )}
    </button>
  );
}
