import { useState } from 'react'
import dcLogo from '../assets/dc-logo.svg'

const navSections = [
  {
    group: null,
    items: [
      { id: 'overview', label: 'Overview', icon: '◎' },
    ],
  },
  {
    group: 'Foundation',
    items: [
      { id: 'typography',    label: 'Typography',     icon: 'T' },
      { id: 'colors',        label: 'Colors & Tokens', icon: '◑' },
      { id: 'spacing',       label: 'Spacing',         icon: '↔' },
      { id: 'corner-radius', label: 'Corner Radius',   icon: '◻' },
      { id: 'grid',          label: 'Grids & Layouts', icon: '⊞' },
      { id: 'elevation',     label: 'Elevation',       icon: '◫' },
      { id: 'icons',         label: 'Icons',           icon: '✦' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'comp-button',         label: 'Button',           icon: '⬡' },
      { id: 'comp-link',           label: 'Link',             icon: '⬡' },
      { id: 'comp-text-input',     label: 'Text Input',       icon: '⬡' },
      { id: 'comp-password',       label: 'Password',         icon: '⬡' },
      { id: 'comp-mobile-number',  label: 'Mobile Number',    icon: '⬡' },
      { id: 'comp-textarea',       label: 'Textarea',         icon: '⬡' },
      { id: 'comp-dropdown',       label: 'Dropdown',         icon: '⬡' },
      { id: 'comp-search',         label: 'Search',           icon: '⬡' },
      { id: 'comp-checkbox',       label: 'Checkbox',         icon: '⬡' },
      { id: 'comp-radio-button',   label: 'Radio Button',     icon: '⬡' },
      { id: 'comp-toggle-switch',  label: 'Toggle Switch',    icon: '⬡' },
      { id: 'comp-badge',          label: 'Badge',            icon: '⬡' },
      { id: 'comp-spinner',        label: 'Spinner',           icon: '⬡' },
      { id: 'comp-placeholder-logo', label: 'Placeholder Logo', icon: '⬡' },
    ],
  },
]

export function Sidebar({ active, onNavigate }) {
  return (
    <aside style={styles.sidebar}>
      {/* Brand */}
      <div style={styles.brand}>
        <img src={dcLogo} alt="DC Design System" style={{ width: 30, height: 30, flexShrink: 0 }} />
        <div>
          <div style={styles.brandName}>MCP Design</div>
          <div style={styles.brandSub}>System</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        {navSections.map((section, si) => (
          <div key={si} style={si > 0 ? styles.section : undefined}>
            {section.group && (
              <div style={styles.navLabel}>{section.group}</div>
            )}
            {section.items.map(item => (
              <button
                key={item.id}
                style={{
                  ...styles.navItem,
                  ...(active === item.id ? styles.navItemActive : {}),
                }}
                onClick={() => onNavigate(item.id)}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={styles.footer}>
        <a
          href="https://www.figma.com/design/9S0hhvmvbRKS8513K2xo8H/MCP-Design-System"
          target="_blank"
          rel="noreferrer"
          style={styles.figmaLink}
        >
          <svg width="14" height="14" viewBox="0 0 38 57" fill="none" style={{ flexShrink: 0 }}>
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/>
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0acf83"/>
            <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#ff7262"/>
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/>
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/>
          </svg>
          View in Figma
        </a>
      </div>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: 240,
    minWidth: 240,
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg)',
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '20px 16px',
    borderBottom: '1px solid var(--border)',
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: 'var(--accent)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 16,
    fontFamily: 'var(--font-display)',
    flexShrink: 0,
  },
  brandName: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-h)',
    fontFamily: 'var(--font-display)',
    lineHeight: 1.2,
  },
  brandSub: {
    fontSize: 11,
    color: 'var(--text)',
    lineHeight: 1.2,
  },
  nav: {
    flex: 1,
    padding: '8px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  section: {
    marginTop: 4,
    paddingTop: 4,
    borderTop: '1px solid var(--border)',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: 'var(--text)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '10px 10px 4px',
    opacity: 0.55,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 10px',
    borderRadius: 6,
    border: 'none',
    background: 'transparent',
    color: 'var(--text)',
    fontSize: 13.5,
    fontFamily: 'var(--font-text)',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'background 0.15s, color 0.15s',
  },
  navItemActive: {
    background: 'var(--accent-bg)',
    color: 'var(--accent)',
  },
  navIcon: {
    width: 18,
    textAlign: 'center',
    fontSize: 13,
    opacity: 0.65,
    flexShrink: 0,
  },
  footer: {
    padding: '12px 16px',
    borderTop: '1px solid var(--border)',
  },
  figmaLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: 'var(--text)',
    textDecoration: 'none',
    padding: '6px 8px',
    borderRadius: 6,
    transition: 'background 0.1s',
  },
}
