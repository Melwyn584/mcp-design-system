// Spacing tokens — values live in tokens.css (--spacing-pt-1 = 4px … --spacing-pt-64 = 256px)
const spacingScale = [
  { token: 'pt-1',  cssVar: '--spacing-pt-1',  label: '4px'   },
  { token: 'pt-2',  cssVar: '--spacing-pt-2',  label: '8px'   },
  { token: 'pt-3',  cssVar: '--spacing-pt-3',  label: '12px'  },
  { token: 'pt-4',  cssVar: '--spacing-pt-4',  label: '16px'  },
  { token: 'pt-5',  cssVar: '--spacing-pt-5',  label: '20px'  },
  { token: 'pt-6',  cssVar: '--spacing-pt-6',  label: '24px'  },
  { token: 'pt-8',  cssVar: '--spacing-pt-8',  label: '32px'  },
  { token: 'pt-10', cssVar: '--spacing-pt-10', label: '40px'  },
  { token: 'pt-12', cssVar: '--spacing-pt-12', label: '48px'  },
  { token: 'pt-14', cssVar: '--spacing-pt-14', label: '56px'  },
  { token: 'pt-16', cssVar: '--spacing-pt-16', label: '64px'  },
  { token: 'pt-20', cssVar: '--spacing-pt-20', label: '80px'  },
  { token: 'pt-24', cssVar: '--spacing-pt-24', label: '96px'  },
  { token: 'pt-32', cssVar: '--spacing-pt-32', label: '128px' },
  { token: 'pt-40', cssVar: '--spacing-pt-40', label: '160px' },
  { token: 'pt-48', cssVar: '--spacing-pt-48', label: '192px' },
  { token: 'pt-56', cssVar: '--spacing-pt-56', label: '224px' },
  { token: 'pt-64', cssVar: '--spacing-pt-64', label: '256px' },
]

const usageRules = [
  'Always use a spacing token — never hardcode arbitrary pixel values.',
  'Choose the closest token to the intended spacing; do not invent intermediate values.',
  'pt-1 (4px) and pt-2 (8px) are for tight internal component padding.',
  'pt-4 (16px) through pt-8 (32px) are standard layout gaps.',
  'pt-12 (48px) and above are for section-level spacing.',
]

export function SpacingPage() {
  return (
    <div>
      <div className="doc-header">
        <span className="doc-eyebrow">Foundation · Dimension</span>
        <h1 className="doc-title">Spacing</h1>
        <p className="doc-desc">
          Spacing tokens from the Figma dimensions variable collection.
          Use these tokens for margin, padding, and gap values — never use arbitrary pixel values in components.
        </p>
      </div>

      {/* Visual scale — bar width equals the actual token value */}
      <div className="doc-section" style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowX: 'hidden' }}>
        {spacingScale.map(item => (
          <div key={item.token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              height: 14,
              width: `var(${item.cssVar})`,
              maxWidth: '60%',
              background: 'var(--accent)',
              borderRadius: 3,
              opacity: 0.7,
              flexShrink: 0,
            }} />
            <code className="token-pill">{item.cssVar}</code>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-family-mono,monospace)', color: 'var(--text)', fontWeight: 600 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Full table */}
      <h2 className="doc-section-title" style={{ marginTop: 40 }}>All Spacing Tokens</h2>
      <div className="doc-table-wrap">
        <table className="doc-table">
          <thead>
            <tr>{['Token', 'CSS Variable', 'Value', 'Visual'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
          </thead>
          <tbody>
            {spacingScale.map((item, i) => (
              <tr key={item.token} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                <td className="doc-td"><code className="token-pill">{item.token}</code></td>
                <td className="doc-td"><code className="token-pill--gray">{item.cssVar}</code></td>
                <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontWeight: 700, color: 'var(--text-h)' }}>{item.label}</td>
                <td className="doc-td">
                  <div style={{ height: 10, width: `var(${item.cssVar})`, maxWidth: 240, background: 'var(--accent)', borderRadius: 3, opacity: 0.65 }} />
                </td>
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
