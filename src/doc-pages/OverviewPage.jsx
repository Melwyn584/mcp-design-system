const quickLinks = [
  { id: 'colors',     label: 'Colors & Tokens',  desc: '6 color tokens across 5 groups',  icon: '◑' },
  { id: 'typography', label: 'Typography',         desc: '11 type steps + 4 weight styles', icon: 'T' },
  { id: 'spacing',    label: 'Spacing & Shadows',  desc: '12 spacing steps + 4 shadows',   icon: '⬡' },
  { id: 'icons',      label: 'Icons',              desc: '2900+ icons in 3 styles',        icon: '✦' },
  { id: 'components', label: 'Components',         desc: 'Coming soon',                    icon: '⬜' },
  { id: 'grid',       label: 'Grid & Layout',      desc: 'Column grid + breakpoints',      icon: '⊞' },
]

export function OverviewPage({ onNavigate }) {
  return (
    <div>
      <PageHeader
        eyebrow="MCP Design System"
        title="Foundation"
        description="A cohesive set of design tokens, typography, spacing, and components built in Figma and documented here for engineering handoff."
      />

      <div style={styles.metaRow}>
        <MetaBadge label="Font" value="Manrope" />
        <MetaBadge label="Figma tokens" value="42+" />
        <MetaBadge label="Icons" value="2900+" />
        <MetaBadge label="Version" value="1.0" />
      </div>

      <SectionTitle>Quick navigation</SectionTitle>
      <div style={styles.grid}>
        {quickLinks.map(link => (
          <button key={link.id} style={styles.card} onClick={() => onNavigate(link.id)}>
            <span style={styles.cardIcon}>{link.icon}</span>
            <div style={styles.cardLabel}>{link.label}</div>
            <div style={styles.cardDesc}>{link.desc}</div>
          </button>
        ))}
      </div>

      <SectionTitle>About this system</SectionTitle>
      <div style={styles.prose}>
        <p>
          The MCP Design System provides a single source of truth for design decisions.
          All tokens on this site are extracted directly from the Figma variables panel and
          kept in sync with the CSS custom properties in <code>src/index.css</code>.
        </p>
        <p style={{ marginTop: 16 }}>
          The type scale uses <strong>Manrope</strong> for both display and body text, with
          11 steps ranging from <code>text-xs</code> (12px) to <code>display-2xl</code> (72px).
        </p>
      </div>

      <SectionTitle>Figma source</SectionTitle>
      <a
        href="https://www.figma.com/design/9S0hhvmvbRKS8513K2xo8H/MCP-Design-System"
        target="_blank"
        rel="noreferrer"
        style={styles.figmaCard}
      >
        <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0acf83"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#ff7262"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/>
        </svg>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-h)', fontSize: 14 }}>MCP Design System</div>
          <div style={{ fontSize: 12, color: 'var(--text)', marginTop: 2 }}>figma.com/design/9S0hhvmvbRKS8513K2xo8H</div>
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--accent)' }}>Open ↗</span>
      </a>
    </div>
  )
}

function MetaBadge({ label, value }) {
  return (
    <div style={styles.badge}>
      <span style={styles.badgeLabel}>{label}</span>
      <span style={styles.badgeValue}>{value}</span>
    </div>
  )
}

export function PageHeader({ eyebrow, title, description }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {eyebrow && <div style={styles.eyebrow}>{eyebrow}</div>}
      <h1 style={styles.title}>{title}</h1>
      {description && <p style={styles.description}>{description}</p>}
      <hr style={styles.divider} />
    </div>
  )
}

export function SectionTitle({ children }) {
  return <h2 style={styles.sectionTitle}>{children}</h2>
}

const styles = {
  eyebrow: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    color: 'var(--text-h)',
    lineHeight: 1.15,
    marginBottom: 12,
    fontFamily: 'var(--font-display)',
  },
  description: {
    fontSize: 16,
    color: 'var(--text)',
    lineHeight: 1.6,
    maxWidth: 600,
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--border)',
    marginTop: 32,
    marginBottom: 0,
  },
  metaRow: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 40,
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 12px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    fontSize: 13,
  },
  badgeLabel: {
    color: 'var(--text)',
  },
  badgeValue: {
    fontWeight: 600,
    color: 'var(--text-h)',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 16,
    marginTop: 40,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12,
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '20px 20px 18px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    fontFamily: 'var(--font-text)',
  },
  cardIcon: {
    fontSize: 18,
    display: 'block',
    marginBottom: 10,
    color: 'var(--accent)',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-h)',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: 'var(--text)',
  },
  prose: {
    fontSize: 15,
    color: 'var(--text)',
    lineHeight: 1.65,
    padding: '20px 24px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
  },
  figmaCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    textDecoration: 'none',
    transition: 'border-color 0.15s',
  },
}
