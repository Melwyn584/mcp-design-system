// Typography tokens — values live in tokens.css (--font-size-display-2xl, --line-height-text-sm, etc.)
const typeScale = [
  { name: 'Display 2XL', token: 'display-2xl', cssVarSize: '--font-size-display-2xl', cssVarLine: '--line-height-display-2xl', sizeLabel: '72px', lineLabel: '90px', category: 'display' },
  { name: 'Display XL',  token: 'display-xl',  cssVarSize: '--font-size-display-xl',  cssVarLine: '--line-height-display-xl',  sizeLabel: '60px', lineLabel: '72px', category: 'display' },
  { name: 'Display LG',  token: 'display-lg',  cssVarSize: '--font-size-display-lg',  cssVarLine: '--line-height-display-lg',  sizeLabel: '48px', lineLabel: '60px', category: 'display' },
  { name: 'Display MD',  token: 'display-md',  cssVarSize: '--font-size-display-md',  cssVarLine: '--line-height-display-md',  sizeLabel: '36px', lineLabel: '44px', category: 'display' },
  { name: 'Display SM',  token: 'display-sm',  cssVarSize: '--font-size-display-sm',  cssVarLine: '--line-height-display-sm',  sizeLabel: '30px', lineLabel: '38px', category: 'display' },
  { name: 'Display XS',  token: 'display-xs',  cssVarSize: '--font-size-display-xs',  cssVarLine: '--line-height-display-xs',  sizeLabel: '24px', lineLabel: '32px', category: 'display' },
  { name: 'Text XL',     token: 'text-xl',     cssVarSize: '--font-size-text-xl',     cssVarLine: '--line-height-text-xl',     sizeLabel: '20px', lineLabel: '30px', category: 'text' },
  { name: 'Text LG',     token: 'text-lg',     cssVarSize: '--font-size-text-lg',     cssVarLine: '--line-height-text-lg',     sizeLabel: '18px', lineLabel: '28px', category: 'text' },
  { name: 'Text MD',     token: 'text-md',     cssVarSize: '--font-size-text-md',     cssVarLine: '--line-height-text-md',     sizeLabel: '16px', lineLabel: '22px', category: 'text' },
  { name: 'Text SM',     token: 'text-sm',     cssVarSize: '--font-size-text-sm',     cssVarLine: '--line-height-text-sm',     sizeLabel: '14px', lineLabel: '20px', category: 'text' },
  { name: 'Text XS',     token: 'text-xs',     cssVarSize: '--font-size-text-xs',     cssVarLine: '--line-height-text-xs',     sizeLabel: '12px', lineLabel: '18px', category: 'text' },
]

const fontWeights = [
  { name: 'Light',    cssVar: '--font-weight-light',    label: '300' },
  { name: 'Regular',  cssVar: '--font-weight-regular',  label: '400' },
  { name: 'Medium',   cssVar: '--font-weight-medium',   label: '500' },
  { name: 'Semibold', cssVar: '--font-weight-semibold', label: '600' },
  { name: 'Bold',     cssVar: '--font-weight-bold',     label: '700' },
]

const typographyRules = [
  'Always use a type scale token — never set a hardcoded font-size in component CSS.',
  'Use display-* tokens for headings and marketing text.',
  'Use text-* tokens for body copy, labels, and UI text.',
  'Pair each font-size with its corresponding line-height token.',
  'Use font-weight-semibold (600) or bold (700) for headings; regular (400) for body text.',
  'Do not use font-weight-light (300) for body copy — reserve it for large display text only.',
]

export function TypographyPage() {
  return (
    <div>
      <div className="doc-header">
        <span className="doc-eyebrow">Foundation</span>
        <h1 className="doc-title">Typography</h1>
        <p className="doc-desc">
          The MCP Design System uses Manrope for all text. Type tokens define font size, line height,
          weight, and family. Always reference these tokens — never hardcode typographic values in component code.
        </p>
      </div>

      {/* Live scale preview — uses CSS vars for actual font sizes */}
      <h2 className="doc-section-title">Type Scale</h2>
      <div className="doc-section" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
        {typeScale.map(item => (
          <div key={item.token} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ minWidth: 96, fontSize: 11, color: 'var(--text)', opacity: 0.6, flexShrink: 0 }}>
              {item.sizeLabel}/{item.lineLabel}
            </span>
            <span style={{
              fontSize: `var(${item.cssVarSize})`,
              lineHeight: `var(${item.cssVarLine})`,
              fontFamily: 'var(--font-family-display)',
              color: 'var(--text-h)',
              fontWeight: 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Token table */}
      <h2 className="doc-section-title" style={{ marginTop: 40 }}>Token Reference</h2>
      <div className="doc-table-wrap" style={{ marginBottom: 40 }}>
        <table className="doc-table">
          <thead>
            <tr>{['Token', 'Font Size', 'Line Height', 'Size Var', 'LH Var', 'Category'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {typeScale.map((item, i) => (
              <tr key={item.token} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                <td className="doc-td"><code className="token-pill">{item.token}</code></td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontWeight: 700, color: 'var(--text-h)' }}>{item.sizeLabel}</td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', color: 'var(--text)' }}>{item.lineLabel}</td>
                <td className="doc-td"><code className="token-pill--gray">{item.cssVarSize}</code></td>
                <td className="doc-td"><code className="token-pill--gray">{item.cssVarLine}</code></td>
                <td className="doc-td" style={{ fontSize: 11, textTransform: 'capitalize' }}>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Font families */}
      <h2 className="doc-section-title">Font Families</h2>
      <div className="two-col" style={{ marginBottom: 40 }}>
        {[
          { name: 'Display', cssVar: '--font-family-display', description: 'Headings & display text' },
          { name: 'Text',    cssVar: '--font-family-text',    description: 'Body & UI text' },
        ].map(f => (
          <div key={f.name} className="preview-card preview-card--surface">
            <div style={{ fontSize: 32, fontFamily: 'var(--font-family-display)', fontWeight: 700, color: 'var(--text-h)', lineHeight: 1.2 }}>Aa</div>
            <code className="token-pill">{f.cssVar}</code>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-h)' }}>Manrope</div>
            <div style={{ fontSize: 12, color: 'var(--text)' }}>{f.description}</div>
          </div>
        ))}
      </div>

      {/* Font weights — weight applied via CSS var */}
      <h2 className="doc-section-title">Font Weights</h2>
      <div className="doc-table-wrap" style={{ marginBottom: 40 }}>
        <table className="doc-table">
          <thead>
            <tr>{['Weight', 'Value', 'CSS Variable', 'Preview'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {fontWeights.map((w, i) => (
              <tr key={w.name} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                <td className="doc-td" style={{ fontWeight: 600 }}>{w.name}</td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontWeight: 700, color: 'var(--text-h)' }}>{w.label}</td>
                <td className="doc-td"><code className="token-pill--gray">{w.cssVar}</code></td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-text)', fontWeight: `var(${w.cssVar})`, fontSize: 16, color: 'var(--text-h)' }}>
                  The quick brown fox
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="doc-section-title">Rules for AI (MCP)</h2>
      <div className="rule-list">
        {typographyRules.map((rule, i) => (
          <div key={i} className="rule-row"><span className="rule-num">{i + 1}</span><span className="rule-text">{rule}</span></div>
        ))}
      </div>
    </div>
  )
}
