import styles from './badge.module.css';
import BoltIcon from '../../icons/fill_icons/fill_bolt-alt.svg?react';

/**
 * Badge — MCP Design System
 *
 * Highlights status, category, or short metadata in a compact, fully-rounded
 * pill. Badge is PURELY INFORMATIONAL — it is not interactive and must never
 * behave like a button.
 *
 * Props
 * ─────
 * text          string                                                  'Badge'
 * variant       'filled' | 'stroke'                                     'filled'
 * color         'brand'|'accent'|'danger'|'warning'|'success'|'neutral' 'brand'
 * disabled      boolean   — forces neutral styling + reduced contrast    false
 * showLeftIcon  boolean                                                  false
 * showRightIcon boolean                                                  false
 * leftIcon      ReactNode — overrides the default bolt icon (left)
 * rightIcon     ReactNode — overrides the default bolt icon (right)
 * className     string
 */
export function Badge({
  text = 'Badge',
  variant = 'filled',
  color = 'brand',
  disabled = false,
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon,
  rightIcon,
  className,
  ...rest
}) {
  // Disabled is neutral-only per the design spec.
  const effectiveColor = disabled ? 'neutral' : color;

  const cls = [
    styles.badge,
    styles[variant],
    styles[effectiveColor],
    disabled ? styles.disabled : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <span className={cls} {...rest}>
      {showLeftIcon && (
        <span className={styles.icon}>
          {leftIcon ?? <BoltIcon />}
        </span>
      )}
      <span className={styles.text}>{text}</span>
      {showRightIcon && (
        <span className={styles.icon}>
          {rightIcon ?? <BoltIcon />}
        </span>
      )}
    </span>
  );
}
