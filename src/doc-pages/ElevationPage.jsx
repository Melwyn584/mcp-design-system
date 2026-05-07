// Elevation tokens — values live in tokens.css (--elevation-sm, --elevation-md, etc.)
const elevationTokens = [
  { token: 'elevation-sm', style: 'shadow-sm', cssVar: '--elevation-sm', figmaBlur: '2',  description: 'Cards, surfaces' },
  { token: 'elevation-md', style: 'shadow-md', cssVar: '--elevation-md', figmaBlur: '6',  description: 'Popovers, tooltips' },
  { token: 'elevation-lg', style: 'shadow-lg', cssVar: '--elevation-lg', figmaBlur: '15', description: 'Modals, dialogs' },
  { token: 'elevation-xl', style: 'shadow-xl', cssVar: '--elevation-xl', figmaBlur: '25', description: 'Full-screen overlays' },
]

// Focus shadow tokens — values live in tokens.css (--focus-shadow-default, --focus-shadow-error)
const focusShadowTokens = [
  {
    style: 'focused-default',
    cssVar: '--focus-shadow-default',
    ringColor: 'var(--effects-focused-shadow-ring)',
    accentColor: 'var(--effects-focused-shadow-default)',
    accentBorder: 'var(--sds-color-border-brand-tertiary)',
    description: 'Default focus ring — interactive elements (inputs, buttons)',
  },
  {
    style: 'focused-error',
    cssVar: '--focus-shadow-error',
    ringColor: 'var(--effects-focused-shadow-ring)',
    accentColor: 'var(--effects-focused-shadow-danger)',
    accentBorder: 'var(--sds-color-border-danger-tertiary)',
    description: 'Error focus ring — invalid input states',
  },
]

const shadowRules = [
  'Always use predefined shadow styles.',
  'Do not create custom shadow values.',
  'Do not manually define blur, spread, or opacity.',
  'Always map shadows from elevation variables.',
  'Maintain consistent elevation across similar components.',
]

const focusRules = [
  'Do not generate focus shadows from elevation variables.',
  'Always use predefined focus shadow styles.',
  'Focus shadows must include both: ring shadow and colored shadow.',
  'Do not use standard shadow styles for focus states.',
]

export function ElevationPage() {
  return (
    <div>
      <div className="doc-header">
        <span className="doc-eyebrow">Foundation</span>
        <h1 className="doc-title">Elevation &amp; Shadow</h1>
        <p className="doc-desc">
          Shadows are visual representations of elevation used to create depth.
          Elevation values are defined as variables and applied through shadow styles.
        </p>
      </div>

      {/* Shadow preview grid — boxShadow uses CSS var directly */}
      <div style={{ padding: '32px 24px', background: 'white', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
        {elevationTokens.map(e => (
          <div key={e.token} style={{ width: 180, height: 160, padding: 20, background: 'white', outline: '1px solid var(--border)', outlineOffset: -1, borderRadius: 4, boxShadow: `var(${e.cssVar})`, flexShrink: 0 }}>
            <div style={{ color: 'var(--text-h)', fontSize: 14, fontFamily: 'var(--font-family-text)', fontWeight: 500 }}>{e.style}</div>
          </div>
        ))}
        {focusShadowTokens.map(f => (
          <div key={f.style} style={{ width: 180, height: 160, padding: 20, background: 'white', outline: `1px solid ${f.accentBorder}`, outlineOffset: -1, borderRadius: 4, boxShadow: `var(${f.cssVar})`, flexShrink: 0 }}>
            <div style={{ color: 'var(--text-h)', fontSize: 14, fontFamily: 'var(--font-family-text)', fontWeight: 500 }}>{f.style}</div>
          </div>
        ))}
      </div>

      {/* Shadow section */}
      <h2 className="doc-section-title">Shadow</h2>

      <div className="four-col" style={{ marginBottom: 32 }}>
        {elevationTokens.map(e => (
          <div key={e.token} className="preview-card" style={{ boxShadow: `var(${e.cssVar})` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <code className="token-pill">{e.style}</code>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-family-mono,monospace)', color: 'var(--text)', opacity: 0.6 }}>blur {e.figmaBlur}px</span>
            </div>
            <code className="token-pill--gray">{e.cssVar}</code>
            <div style={{ fontSize: 11, color: 'var(--text)', opacity: 0.7 }}>{e.description}</div>
          </div>
        ))}
      </div>

      <div className="doc-subsection">
        <h3 className="doc-subsection-title">Mapping</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {elevationTokens.map(e => (
            <div key={e.token} className="spec-row">
              <code className="token-pill">{e.style}</code>
              <span className="spec-arrow">→</span>
              <code className="token-pill--gray">{e.cssVar}</code>
              <span className="spec-desc">{e.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-subsection">
        <h3 className="doc-subsection-title">Rules for AI (MCP)</h3>
        <div className="rule-list">
          {shadowRules.map((rule, i) => (
            <div key={i} className="rule-row"><span className="rule-num">{i + 1}</span><span className="rule-text">{rule}</span></div>
          ))}
        </div>
      </div>

      <div className="doc-divider" />

      {/* Focus Shadows section */}
      <h2 className="doc-section-title">Focus Shadows</h2>

      <div className="doc-subsection">
        <h3 className="doc-subsection-title">Structure</h3>
        <div className="two-col">
          <div className="preview-card preview-card--surface">
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-h)' }}>a. Ring Shadow</div>
            <div className="focus-token-row">
              <div className="color-swatch-lg" style={{ background: 'var(--effects-focused-shadow-ring)', border: '1px solid var(--border)' }} />
              <div className="focus-token-info">
                <code className="token-pill">--effects-focused-shadow-ring</code>
                <span className="focus-token-hex">white halo</span>
              </div>
            </div>
          </div>
          <div className="preview-card preview-card--surface">
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-h)' }}>b. Focus Color</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="focus-token-row">
                <div className="color-swatch-lg" style={{ background: 'var(--effects-focused-shadow-default)' }} />
                <div className="focus-token-info">
                  <code className="token-pill">--effects-focused-shadow-default</code>
                  <span className="focus-token-hex">blue (default)</span>
                </div>
              </div>
              <div className="focus-token-row">
                <div className="color-swatch-lg" style={{ background: 'var(--effects-focused-shadow-danger)' }} />
                <div className="focus-token-info">
                  <code className="token-pill">--effects-focused-shadow-danger</code>
                  <span className="focus-token-hex">red (error)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-subsection">
        <h3 className="doc-subsection-title">Variants</h3>
        <div className="two-col">
          {focusShadowTokens.map(f => (
            <div key={f.style} className="preview-card" style={{ boxShadow: `var(${f.cssVar})`, outline: `1px solid ${f.accentBorder}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-family-display)', color: 'var(--text-h)' }}>{f.style}</div>
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{f.description}</div>
              <div className="focus-token-row" style={{ marginTop: 4 }}>
                <span className="color-chip" style={{ background: 'var(--effects-focused-shadow-ring)', border: '1px solid var(--border)' }} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-family-mono,monospace)', color: 'var(--text)' }}>ring: white</span>
              </div>
              <div className="focus-token-row">
                <span className="color-chip" style={{ background: f.accentColor }} />
                <span style={{ fontSize: 11, fontFamily: 'var(--font-family-mono,monospace)', color: 'var(--text)' }}>color: {f.accentColor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-subsection">
        <h3 className="doc-subsection-title">Rules for AI (MCP)</h3>
        <div className="rule-list">
          {focusRules.map((rule, i) => (
            <div key={i} className="rule-row"><span className="rule-num">{i + 1}</span><span className="rule-text">{rule}</span></div>
          ))}
        </div>
      </div>

      {/* Reference table */}
      <div className="doc-divider" />
      <h2 className="doc-section-title">Token Reference</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>{['Token / Style', 'CSS Variable', 'Figma Blur', 'Usage'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {elevationTokens.map((e, i) => (
              <tr key={e.token} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                <td className="doc-td"><div><code className="token-pill">{e.style}</code></div><div style={{ marginTop: 3 }}><code className="token-pill--gray">{e.token}</code></div></td>
                <td className="doc-td"><code className="token-pill--gray">{e.cssVar}</code></td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontWeight: 700, color: 'var(--text-h)' }}>{e.figmaBlur}px</td>
                <td className="doc-td" style={{ fontSize: 12 }}>{e.description}</td>
              </tr>
            ))}
            {focusShadowTokens.map((f, i) => (
              <tr key={f.style} className={(elevationTokens.length + i) % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                <td className="doc-td"><code className="token-pill">{f.style}</code></td>
                <td className="doc-td"><code className="token-pill--gray">{f.cssVar}</code></td>
                <td className="doc-td" style={{ fontSize: 12 }}>—</td>
                <td className="doc-td" style={{ fontSize: 12 }}>{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
