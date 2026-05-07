import { useState } from 'react'

// Grid layout data — inlined from removed src/tokens/spacing.js
const gridTokens = {
  desktop: { columns: 12, marginHorizontal: 80, gutter: 32, containerMaxWidth: 1280, sectionSpacing: 64 },
  tab:     { columns: 8,  marginHorizontal: 32, gutter: 20, sectionSpacing: 32 },
  mobile:  { columns: 4,  marginHorizontal: 16, gutter: 16, sectionSpacing: 32 },
}

const breakpoints = [
  { id: 'desktop', label: 'Desktop', width: '≥ 1280px' },
  { id: 'tab',     label: 'Tablet',  width: '768–1279px' },
  { id: 'mobile',  label: 'Mobile',  width: '< 768px' },
]

const containerPatterns = [
  { name: 'Full-width',  desc: 'Spans the entire viewport width. No margin or container limit.' },
  { name: 'Constrained', desc: 'Max-width container, centered, with horizontal margin.' },
  { name: 'Fluid',       desc: 'Stretches to fill, but stops at containerMaxWidth.' },
]

const layoutRules = [
  'Always use the grid system for page-level layout. Never freestyle-position major sections.',
  'Gutters are fixed — do not increase or decrease gutter values per breakpoint.',
  'Content must stay within the container bounds; do not overflow the margin zones.',
  'Maintain 12-column grid on desktop; collapse to 8 on tablet and 4 on mobile.',
  'Section spacing defines the vertical rhythm between major page sections.',
]

export function GridPage() {
  const [active, setActive] = useState('desktop')
  const grid = gridTokens[active]
  const bp = breakpoints.find(b => b.id === active)

  return (
    <div>
      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Foundation</span>
        <h1 className="doc-title">Grids &amp; Layouts</h1>
        <p className="doc-desc">
          The MCP Design System uses a responsive column grid to ensure consistent alignment across all screen sizes.
          Grid tokens define columns, gutters, margins, and container widths per breakpoint.
        </p>
      </div>

      {/* Breakpoint selector */}
      <div className="breakpoint-bar">
        {breakpoints.map(b => (
          <button
            key={b.id}
            className={`breakpoint-btn${active === b.id ? ' breakpoint-btn--active' : ''}`}
            onClick={() => setActive(b.id)}
          >
            {b.label} <span style={{ opacity: 0.55, fontSize: 11, marginLeft: 4 }}>{b.width}</span>
          </button>
        ))}
      </div>

      {/* Visual column grid */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 0', marginBottom: 32, overflow: 'hidden' }}>
        <div style={{ padding: `0 ${Math.min(grid.marginHorizontal, 48)}px` }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid.columns}, 1fr)`, gap: grid.gutter / 2 }}>
            {Array.from({ length: grid.columns }).map((_, i) => (
              <div key={i} style={{
                height: 48,
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: 'var(--accent)',
                fontWeight: 600,
              }}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text)', opacity: 0.6 }}>
          {grid.columns} columns · {grid.gutter}px gutter · {grid.marginHorizontal}px margin
        </div>
      </div>

      {/* Spec table */}
      <h2 className="doc-section-title">{bp.label} Specifications</h2>
      <div className="doc-table-wrap" style={{ marginBottom: 40 }}>
        <table className="doc-table">
          <thead>
            <tr>
              {['Property', 'Value', 'CSS Variable'].map(h => (
                <th key={h} className="doc-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Columns',            grid.columns,                     '—'],
              ['Horizontal margin',  `${grid.marginHorizontal}px`,     '—'],
              ['Gutter width',       `${grid.gutter}px`,               '—'],
              ['Section spacing',    `${grid.sectionSpacing}px`,        '—'],
              ...(grid.containerMaxWidth ? [['Container max-width', `${grid.containerMaxWidth}px`, '—']] : []),
            ].map(([prop, val, cssVar], i) => (
              <tr key={prop} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                <td className="doc-td" style={{ fontWeight: 500 }}>{prop}</td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontWeight: 700, color: 'var(--text-h)' }}>{val}</td>
                <td className="doc-td"><code className="token-pill--gray">{cssVar}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Container patterns */}
      <h2 className="doc-section-title">Container Patterns</h2>
      <div className="three-col" style={{ marginBottom: 40 }}>
        {containerPatterns.map(p => (
          <div key={p.name} className="preview-card preview-card--surface">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-h)', marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.55 }}>{p.desc}</div>
          </div>
        ))}
      </div>

      {/* Rules for AI */}
      <h2 className="doc-section-title">Rules for AI (MCP)</h2>
      <div className="rule-list">
        {layoutRules.map((rule, i) => (
          <div key={i} className="rule-row">
            <span className="rule-num">{i + 1}</span>
            <span className="rule-text">{rule}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
