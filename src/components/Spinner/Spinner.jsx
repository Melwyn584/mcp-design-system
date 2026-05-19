import styles from './spinner.module.css';

/**
 * Spinner — MCP Design System
 *
 * A loading indicator that communicates a process is in progress. It shows
 * ACTIVITY, not progress — it never displays a completion percentage and is
 * not interactive.
 *
 * Props
 * ─────
 * size       'xxl' | 'xl' | 'lg' | 'md' | 'sm'   'md'   Diameter; stroke scales with it
 * label      string                              'Loading'   Accessible name (visually hidden)
 * className  string
 */
const SIZES = {
  xxl: 40,
  xl: 32,
  lg: 24,
  md: 16,
  sm: 12,
};

export function Spinner({ size = 'md', label = 'Loading', className, ...rest }) {
  const diameter = SIZES[size] ?? SIZES.md;
  const strokeWidth = diameter * 0.125;       // thickness scales proportionally
  const radius = (diameter - strokeWidth) / 2;
  const center = diameter / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.25;      // highlight arc ≈ quarter circle

  return (
    <span
      className={[styles.spinner, className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      aria-label={label}
      {...rest}
    >
      <svg
        className={styles.svg}
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        fill="none"
        aria-hidden="true"
      >
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.arc}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference - arcLength}`}
        />
      </svg>
    </span>
  );
}
