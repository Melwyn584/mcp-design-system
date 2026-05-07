// Corner radius tokens — values live in tokens.css (--corner-radius-none = 0, --corner-radius-full = 9999px, etc.)
const radiusScale = [
  { token: 'radius-none', cssVar: '--corner-radius-none', label: '0px',     description: 'No rounding — sharp edges' },
  { token: 'radius-xs',   cssVar: '--corner-radius-xs',   label: '4px',     description: 'Extra small — checkboxes, tags' },
  { token: 'radius-sm',   cssVar: '--corner-radius-sm',   label: '8px',     description: 'Small — inputs, buttons, cards' },
  { token: 'radius-md',   cssVar: '--corner-radius-md',   label: '12px',    description: 'Medium — panels, dropdowns' },
  { token: 'radius-lg',   cssVar: '--corner-radius-lg',   label: '16px',    description: 'Large — modals, large cards' },
  { token: 'radius-xl',   cssVar: '--corner-radius-xl',   label: '24px',    description: 'Extra large — feature surfaces' },
  { token: 'radius-2xl',  cssVar: '--corner-radius-2xl',  label: '32px',    description: '2XL — modals, hero cards' },
  { token: 'radius-full', cssVar: '--corner-radius-full', label: '9999px',  description: 'Full pill — badges, avatars' },
]

const usageRules = [
  'Always use a radius token — never write a hardcoded border-radius in component CSS.',
  'radius-none (0) for elements that must have sharp corners (e.g. full-bleed dividers).',
  'radius-xs (4px) for small controls: checkboxes, tags, chips.',
  'radius-sm (8px) for input fields, buttons, and cards.',
  'radius-md / radius-lg for modals, panels, and larger surface areas.',
  'radius-full for pill buttons, badges, and avatars.',
]

export function CornerRadiusPage() {
  return (
    <div>
      <div className="doc-header">
        <span className="doc-eyebrow">Foundation · Dimension</span>
        <h1 className="doc-title">Corner Radius</h1>
        <p className="doc-desc">
          Corner radius tokens from the Figma dimensions variable collection.
          Apply these tokens via the <code className="token-pill">--corner-radius-*</code> CSS variables — never hardcode border-radius values.
        </p>
      </div>

      {/* Visual preview cards */}
      <h2 className="doc-section-title">Token Previews</h2>
      <div className="four-col" style={{ marginBottom: 40 }}>
        {radiusScale.map(item => (
          <div key={item.token} className="preview-card preview-card--surface" style={{ gap: 6 }}>
            <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', borderRadius: 8, marginBottom: 4 }}>
              <div style={{
                width: 48,
                height: 48,
                background: 'var(--accent)',
                opacity: 0.7,
                borderRadius: `var(${item.cssVar})`,
              }} />
            </div>
            <code className="token-pill" style={{ fontSize: 10 }}>{item.cssVar}</code>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-h)' }}>{item.token}</div>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-family-mono,monospace)', color: 'var(--text)' }}>{item.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text)', opacity: 0.7, lineHeight: 1.4 }}>{item.description}</div>
          </div>
        ))}
      </div>

      {/* Full table */}
      <h2 className="doc-section-title">All Radius Tokens</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>{['Token', 'CSS Variable', 'Value', 'Preview', 'Description'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {radiusScale.map((item, i) => (
              <tr key={item.token} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                <td className="doc-td"><code className="token-pill">{item.token}</code></td>
                <td className="doc-td"><code className="token-pill--gray">{item.cssVar}</code></td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontWeight: 700, color: 'var(--text-h)' }}>{item.label}</td>
                <td className="doc-td">
                  <div style={{ width: 36, height: 36, background: 'var(--accent)', opacity: 0.65, borderRadius: `var(${item.cssVar})` }} />
                </td>
                <td className="doc-td" style={{ fontSize: 12 }}>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="doc-section-title" style={{ marginTop: 40 }}>Usage Rules</h2>
      <div className="rule-list">
        {usageRules.map((rule, i) => (
          <div key={i} className="rule-row"><span className="rule-num">{i + 1}</span><span className="rule-text">{rule}</span></div>
        ))}
      </div>
    </div>
  )
}
