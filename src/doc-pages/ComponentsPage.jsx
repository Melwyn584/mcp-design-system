import { PageHeader, SectionTitle } from './OverviewPage'

const planned = [
  { name: 'Button',       status: 'planned',      desc: 'Primary, secondary, ghost, destructive variants with size and icon options' },
  { name: 'Badge',        status: 'planned',      desc: 'Status badges, count indicators, and label chips' },
  { name: 'Input',        status: 'planned',      desc: 'Text input with label, helper text, and validation states' },
  { name: 'Select',       status: 'planned',      desc: 'Dropdown select with search and multi-select support' },
  { name: 'Card',         status: 'planned',      desc: 'Content container with header, body, footer slots' },
  { name: 'Modal',        status: 'planned',      desc: 'Overlay dialog with focus trap and accessible close behavior' },
  { name: 'Tooltip',      status: 'planned',      desc: 'Hover and focus triggered tooltip with directional placement' },
  { name: 'Avatar',       status: 'planned',      desc: 'User avatar with image, initials fallback, and size variants' },
  { name: 'Toggle',       status: 'planned',      desc: 'Boolean switch control with on/off/indeterminate states' },
  { name: 'Checkbox',     status: 'planned',      desc: 'Form checkbox with indeterminate state support' },
  { name: 'Alert',        status: 'planned',      desc: 'Inline alert for info, success, warning, and error states' },
  { name: 'Tabs',         status: 'planned',      desc: 'Horizontal tab navigation with underline and pill variants' },
]

const statusColors = {
  done:      { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
  progress:  { bg: '#fef9c3', text: '#854d0e', border: '#fef08a' },
  planned:   { bg: 'var(--surface)', text: 'var(--text)', border: 'var(--border)' },
}

export function ComponentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Components"
        title="UI Components"
        description="Reusable interface components built on top of the design tokens. This section is actively being developed."
      />

      <div style={styles.banner}>
        <span style={styles.bannerIcon}>🚧</span>
        <div>
          <div style={styles.bannerTitle}>In development</div>
          <div style={styles.bannerText}>
            Components are being designed in Figma and will be published here with code examples, props tables, and usage guidelines.
          </div>
        </div>
      </div>

      <SectionTitle>Planned components ({planned.length})</SectionTitle>
      <div style={styles.list}>
        {planned.map(c => {
          const sc = statusColors[c.status]
          return (
            <div key={c.name} style={styles.row}>
              <div style={styles.rowLeft}>
                <div style={styles.compName}>{c.name}</div>
                <div style={styles.compDesc}>{c.desc}</div>
              </div>
              <span style={{ ...styles.status, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  banner: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start',
    padding: '20px 24px',
    background: 'var(--accent-bg)',
    border: '1px solid var(--accent-border)',
    borderRadius: 10,
    marginBottom: 8,
  },
  bannerIcon: {
    fontSize: 24,
    flexShrink: 0,
    lineHeight: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-h)',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 13,
    color: 'var(--text)',
    lineHeight: 1.55,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '14px 18px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
  },
  rowLeft: {
    flex: 1,
    minWidth: 0,
  },
  compName: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-h)',
    marginBottom: 2,
  },
  compDesc: {
    fontSize: 12,
    color: 'var(--text)',
    lineHeight: 1.45,
  },
  status: {
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: 20,
    flexShrink: 0,
    textTransform: 'capitalize',
  },
}
