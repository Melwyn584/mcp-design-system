import { useState } from 'react'

// Palette names and steps — values come from tokens.css (--mariner-50, --apple-100, etc.)
const palettes = [
  { name: 'mariner', steps: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'apple',   steps: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'green',   steps: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'red',     steps: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'yellow',  steps: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'blue',    steps: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'grey',    steps: ['00','50','100','200','300','400','500','600','700','800','900','950'] },
]

// Semantic token names — values resolved at runtime from tokens.css
const semanticGroups = [
  {
    intent: 'Background / Brand (Mariner Blue)',
    tokens: [
      { name: 'default',          cssVar: '--sds-color-background-brand-default' },
      { name: 'default-hover',    cssVar: '--sds-color-background-brand-hover' },
      { name: 'secondary',        cssVar: '--sds-color-background-brand-secondary' },
      { name: 'tertiary',         cssVar: '--sds-color-background-brand-tertiary' },
    ],
  },
  {
    intent: 'Background / Danger (Red)',
    tokens: [
      { name: 'default',    cssVar: '--sds-color-background-danger-default' },
      { name: 'secondary',  cssVar: '--sds-color-background-danger-secondary' },
      { name: 'tertiary',   cssVar: '--sds-color-background-danger-tertiary' },
    ],
  },
  {
    intent: 'Background / Positive (Green)',
    tokens: [
      { name: 'default',    cssVar: '--sds-color-background-positive-default' },
      { name: 'secondary',  cssVar: '--sds-color-background-positive-secondary' },
      { name: 'tertiary',   cssVar: '--sds-color-background-positive-tertiary' },
    ],
  },
  {
    intent: 'Background / Warning (Yellow)',
    tokens: [
      { name: 'default',    cssVar: '--sds-color-background-warning-default' },
      { name: 'secondary',  cssVar: '--sds-color-background-warning-secondary' },
      { name: 'tertiary',   cssVar: '--sds-color-background-warning-tertiary' },
    ],
  },
]

const effectTokens = [
  { name: 'focused/shadow-default', cssVar: '--effects-focused-shadow-default', description: 'Focus ring fill — blue-200' },
  { name: 'focused/shadow-danger',  cssVar: '--effects-focused-shadow-danger',  description: 'Focus ring fill — red-300' },
  { name: 'focused/shadow-ring',    cssVar: '--effects-focused-shadow-ring',    description: 'Focus ring white halo' },
]

const colorThemeMap = [
  ['brand',    'mariner (blue)', 'Background/text brand, border/icon brand'],
  ['accent',   'apple (green)',  'Accent variant surfaces (secondary usage)'],
  ['danger',   'red',            'Error states, destructive actions'],
  ['positive', 'green',          'Success, confirmation states'],
  ['warning',  'yellow',         'Caution, in-progress states'],
  ['neutral',  'grey',           'Default surfaces, disabled states'],
  ['utility',  'blue (indigo)',  'Focus rings, measurement overlays'],
]

const aiRules = [
  'Never use raw swatch values in component code.',
  'Always use Color Modes (--sds-color-*) semantic tokens.',
  'Use background/* tokens for fill colors.',
  'Use text/* tokens for text colors.',
  'Use border/* tokens for border colors.',
  'Use icon/* tokens for icon fill colors.',
]

const TABS = ['Overview', 'Swatches', 'Color Theme', 'Color Modes', 'Effects']

export function ColorsPage() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div>
      <div className="doc-header">
        <span className="doc-eyebrow">Foundation</span>
        <h1 className="doc-title">Colors &amp; Tokens</h1>
        <p className="doc-desc">
          The MCP Design System uses a 3-layer color cascade: raw swatches → semantic intent aliases
          (Color Theme) → usage tokens (Color Modes). Always use Color Modes tokens in component
          code — never reference raw swatch values directly.
        </p>
      </div>

      <div className="tab-bar">
        {TABS.map(tab => (
          <button key={tab} className={`tab-btn${activeTab === tab ? ' tab-btn--active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === 'Overview' && (
        <div>
          <h2 className="doc-section-title">3-Layer Token Cascade</h2>
          <div className="three-col" style={{ marginBottom: 32 }}>
            {[
              { layer: 'Layer 1', name: 'Swatches',     prefix: '--mariner-*, --apple-*…',          desc: 'Raw hex palettes. Never used directly in components.' },
              { layer: 'Layer 2', name: 'Color Theme',  prefix: '--ct-brand-*, --ct-danger-*…',     desc: 'Maps intent names to the right palette. Only used to build Layer 3.' },
              { layer: 'Layer 3', name: 'Color Modes',  prefix: '--sds-color-background-brand-default', desc: 'Semantic usage tokens. These are the ONLY tokens used in component code.' },
            ].map(l => (
              <div key={l.layer} className="preview-card preview-card--surface">
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l.layer}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-h)' }}>{l.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.55 }}>{l.desc}</div>
                <code className="token-pill" style={{ fontSize: 10 }}>{l.prefix}</code>
              </div>
            ))}
          </div>
          <h2 className="doc-section-title">Rules for AI (MCP)</h2>
          <div className="rule-list">
            {aiRules.map((rule, i) => (
              <div key={i} className="rule-row"><span className="rule-num">{i + 1}</span><span className="rule-text">{rule}</span></div>
            ))}
          </div>
        </div>
      )}

      {/* ── Swatches ── */}
      {activeTab === 'Swatches' && (
        <div>
          <h2 className="doc-section-title">Raw Palettes</h2>
          <div className="info-box" style={{ marginBottom: 24 }}>
            <strong>Note:</strong> Swatch values are Layer 1 primitives. Never reference these directly in component code.
          </div>
          {palettes.map(palette => (
            <div key={palette.name} className="doc-section">
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-h)', marginBottom: 8, textTransform: 'capitalize' }}>{palette.name}</div>
              <div className="swatch-row">
                {palette.steps.map(step => (
                  <div key={step} className="swatch-cell" title={`--${palette.name}-${step}`}>
                    <div className="swatch-block" style={{ background: `var(--${palette.name}-${step})` }} />
                    <span className="swatch-label">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Color Theme ── */}
      {activeTab === 'Color Theme' && (
        <div>
          <h2 className="doc-section-title">Semantic Intent Aliases (Layer 2)</h2>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>{['Intent', 'Maps to Palette', 'Used for'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
              </thead>
              <tbody>
                {colorThemeMap.map(([intent, palette, usage], i) => (
                  <tr key={intent} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                    <td className="doc-td"><code className="token-pill">--ct-{intent}-*</code></td>
                    <td className="doc-td" style={{ fontWeight: 500, color: 'var(--text-h)' }}>{palette}</td>
                    <td className="doc-td" style={{ fontSize: 12 }}>{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Color Modes ── */}
      {activeTab === 'Color Modes' && (
        <div>
          <h2 className="doc-section-title">Usage Tokens (Layer 3)</h2>
          {semanticGroups.map(group => (
            <div key={group.intent} className="doc-subsection">
              <h3 className="doc-subsection-title">{group.intent}</h3>
              <div className="doc-table-wrap">
                <table className="doc-table">
                  <thead>
                    <tr>{['Variant', 'CSS Variable', 'Preview'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {group.tokens.map((t, i) => (
                      <tr key={t.name} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                        <td className="doc-td"><code className="token-pill">{t.name}</code></td>
                        <td className="doc-td"><code className="token-pill--gray">{t.cssVar}</code></td>
                        <td className="doc-td">
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: `var(${t.cssVar})`, border: '1px solid rgba(0,0,0,0.08)' }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Effects ── */}
      {activeTab === 'Effects' && (
        <div>
          <h2 className="doc-section-title">Focus Ring Colors</h2>
          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>{['Token', 'CSS Variable', 'Preview', 'Usage'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
              </thead>
              <tbody>
                {effectTokens.map((t, i) => (
                  <tr key={t.name} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                    <td className="doc-td"><code className="token-pill">{t.name}</code></td>
                    <td className="doc-td"><code className="token-pill--gray">{t.cssVar}</code></td>
                    <td className="doc-td">
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: `var(${t.cssVar})`, border: '1px solid rgba(0,0,0,0.1)' }} />
                    </td>
                    <td className="doc-td" style={{ fontSize: 12 }}>{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
