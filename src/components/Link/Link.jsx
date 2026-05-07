import styles from './link.module.css';

/**
 * Link — MCP Design System
 *
 * Inline interactive text element used for navigation. Links are
 * lightweight and do NOT use container styling (no background, padding,
 * or elevation). They rely on typography and color tokens only.
 *
 * Props
 * ─────
 * type           'primary' | 'danger'                default 'primary'
 * size           'large'   | 'medium' | 'small'      default 'medium'
 * href           string — if provided, renders <a>.  Otherwise renders <button>.
 * disabled       boolean                              default false
 * showIconLeft   boolean                              default false
 * showIconRight  boolean                              default false
 * iconLeft       ReactNode — icon to show on left
 * iconRight      ReactNode — icon to show on right
 * children       label text
 * onClick        function
 * className      string — additional class names
 */
export function Link({
  type = 'primary',
  size = 'medium',
  href,
  disabled = false,
  showIconLeft = false,
  showIconRight = false,
  iconLeft,
  iconRight,
  children,
  onClick,
  className,
  target,
  rel,
  ...rest
}) {
  const cls = [
    styles.link,
    styles[type],
    styles[size],
    disabled ? styles.disabled : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {showIconLeft && iconLeft && (
        <span className={styles.icon} aria-hidden="true">{iconLeft}</span>
      )}
      <span>{children}</span>
      {showIconRight && iconRight && (
        <span className={styles.icon} aria-hidden="true">{iconRight}</span>
      )}
    </>
  );

  if (href && !disabled) {
    const safeRel = target === '_blank' ? (rel || 'noopener noreferrer') : rel;
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        target={target}
        rel={safeRel}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}
