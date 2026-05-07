import { useState } from 'react';
import { Link } from '../components/Link/Link';
import AngleLeftFillIcon  from '../icons/fill_icons/fill_angle-left.svg?react';
import AngleRightLineIcon from '../icons/line_icons/line_angle-right.svg?react';

// ─── CodeBlock ─────────────────────────────────────────────────────────────
function CodeBlock({ title, code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.7 }}>
          {title || 'Code'}
        </span>
        <button
          onClick={copy}
          style={{
            background: copied ? 'var(--accent-bg)' : 'transparent',
            color: copied ? 'var(--accent)' : 'var(--text)',
            border: `1px solid ${copied ? 'var(--accent-border)' : 'var(--border)'}`,
            borderRadius: 5, padding: '2px 10px',
            fontSize: 11, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'var(--font-family-mono, monospace)',
            transition: 'all 0.15s',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: '16px 18px', overflowX: 'auto',
        background: '#FAFBFC',
        fontFamily: 'var(--font-family-mono, ui-monospace, monospace)',
        fontSize: 13, lineHeight: 1.75, color: '#1F2328',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Demo Row ──────────────────────────────────────────────────────────────
function DemoRow({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}

const TYPES = ['primary', 'danger'];
const SIZES = ['large', 'medium', 'small'];
const typeColors = { primary: '#1E54AF', danger: '#BF2916' };

// ─── Code snippets ─────────────────────────────────────────────────────────
const snippets = {
  import: `import { Link } from '@mcp/design-system';`,

  basic: `// Basic usage — default: primary, medium
<Link href="/profile">View profile</Link>

// Explicit type + size
<Link type="primary" size="large" href="/docs">
  Read the docs
</Link>`,

  types: `// Primary — default brand link
<Link type="primary" href="/docs">Continue</Link>

// Danger — destructive / warning link
<Link type="danger" href="/delete">Delete account</Link>`,

  sizes: `<Link size="large">Large</Link>
<Link size="medium">Medium</Link>   {/* default */}
<Link size="small">Small</Link>`,

  icons: `// Icon on the left
<Link showIconLeft iconLeft={<AngleLeftFillIcon />}>Back</Link>

// Icon on the right
<Link showIconRight iconRight={<AngleRightLineIcon />}>Next</Link>

// Both icons
<Link
  showIconLeft  iconLeft={<AngleLeftFillIcon />}
  showIconRight iconRight={<AngleRightLineIcon />}
>
  Link Button
</Link>`,

  states: `// Default link
<Link href="/docs">Read more</Link>

// Disabled — 40% opacity, no pointer events
<Link disabled>Unavailable</Link>

// As a button (no href) — fires onClick only
<Link onClick={handleJump}>Jump to section</Link>`,

  focus: `// Focus ring is applied automatically on keyboard focus.
// Do not apply focus styles manually — they are token-driven:
//   --sds-color-effects-focused-shadow-default
//   --sds-color-effects-focused-shadow-ring`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function LinkPage() {
  const [activeType, setActiveType] = useState('primary');

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Link</h1>
        <p className="doc-desc">
          Links are inline interactive text elements used for navigation. They are
          lightweight and do not use container styling such as background, padding,
          or elevation.
        </p>
      </div>

      <div className="doc-divider" />

      {/* ── Import ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Import</h2>
        <CodeBlock title="Install & import" code={snippets.import} />
      </div>

      {/* ── Interactive Demo ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Interactive Demo</h2>
        <div className="tab-bar" style={{ marginBottom: 20 }}>
          {TYPES.map(t => (
            <button
              key={t}
              className={`tab-btn${activeType === t ? ' tab-btn--active' : ''}`}
              onClick={() => setActiveType(t)}
              style={activeType === t ? { color: typeColors[t], borderBottomColor: typeColors[t] } : {}}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 24px' }}>
          <DemoRow label="Default">
            {SIZES.map(size => (
              <Link
                key={size}
                type={activeType}
                size={size}
                showIconLeft iconLeft={<AngleLeftFillIcon />}
                showIconRight iconRight={<AngleRightLineIcon />}
              >
                Link Button
              </Link>
            ))}
          </DemoRow>
          <DemoRow label="Disabled">
            {SIZES.map(size => (
              <Link
                key={size}
                type={activeType}
                size={size}
                disabled
                showIconLeft iconLeft={<AngleLeftFillIcon />}
                showIconRight iconRight={<AngleRightLineIcon />}
              >
                Link Button
              </Link>
            ))}
          </DemoRow>
          <div className="doc-divider" style={{ margin: '12px 0' }} />
          <DemoRow label="Icon Left Only">
            {SIZES.map(size => (
              <Link key={size} type={activeType} size={size} showIconLeft iconLeft={<AngleLeftFillIcon />}>
                Back
              </Link>
            ))}
          </DemoRow>
          <DemoRow label="Icon Right Only">
            {SIZES.map(size => (
              <Link key={size} type={activeType} size={size} showIconRight iconRight={<AngleRightLineIcon />}>
                Next
              </Link>
            ))}
          </DemoRow>
          <DemoRow label="Text Only">
            {SIZES.map(size => (
              <Link key={size} type={activeType} size={size}>
                Link Button
              </Link>
            ))}
          </DemoRow>
          <div className="doc-divider" style={{ margin: '12px 0' }} />
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>
            Try It — Tab / hover
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Link type={activeType} size="medium" showIconLeft iconLeft={<AngleLeftFillIcon />} showIconRight iconRight={<AngleRightLineIcon />}>
              Link Button
            </Link>
          </div>
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">Defaults to <code className="token-pill">primary · medium</code>. Pass <code className="token-pill">href</code> to render an anchor, omit it to render a button.</p>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Types ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Types</h2>
        <p className="doc-body-text">Use <code className="token-pill">type</code> to control the semantic variant of the link.</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
          <Link type="primary" showIconLeft iconLeft={<AngleLeftFillIcon />} showIconRight iconRight={<AngleRightLineIcon />}>Primary link</Link>
          <Link type="danger"  showIconLeft iconLeft={<AngleLeftFillIcon />} showIconRight iconRight={<AngleRightLineIcon />}>Danger link</Link>
        </div>
        <CodeBlock title="JSX — type prop" code={snippets.types} />
      </div>

      {/* ── Sizes ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Sizes</h2>
        <p className="doc-body-text">Use <code className="token-pill">size</code> to match link scale to its context. <code className="token-pill">medium</code> is the default.</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <Link size="large">Large link</Link>
          <Link size="medium">Medium link</Link>
          <Link size="small">Small link</Link>
        </div>
        <CodeBlock title="JSX — size prop" code={snippets.sizes} />
      </div>

      {/* ── Icons ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Icons</h2>
        <p className="doc-body-text">Use <code className="token-pill">showIconLeft</code> / <code className="token-pill">showIconRight</code> with the matching icon prop. Icons align with the text baseline and spacing is driven by spacing tokens.</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
          <Link showIconLeft iconLeft={<AngleLeftFillIcon />}>Back</Link>
          <Link showIconRight iconRight={<AngleRightLineIcon />}>Next</Link>
          <Link showIconLeft iconLeft={<AngleLeftFillIcon />} showIconRight iconRight={<AngleRightLineIcon />}>Link Button</Link>
        </div>
        <CodeBlock title="JSX — showIconLeft / showIconRight" code={snippets.icons} />
      </div>

      {/* ── States ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">States</h2>
        <div className="doc-table-wrap" style={{ marginBottom: 16 }}>
          <table className="doc-table">
            <thead><tr>{['State','Behavior','How to trigger'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr></thead>
            <tbody>
              {[
                ['default',  'Text color token, no decoration',               'Resting state'],
                ['hover',    'Underline applied, color preserved',            'Automatic on mouse hover'],
                ['focus',    'Focus ring (ring + colored shadow)',             'Keyboard Tab'],
                ['disabled', 'Opacity 40%, pointer-events none',               'Add disabled prop'],
              ].map(([state, behavior, how], i) => (
                <tr key={state} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                  <td className="doc-td"><code className="token-pill">{state}</code></td>
                  <td className="doc-td" style={{ fontSize: 13 }}>{behavior}</td>
                  <td className="doc-td" style={{ fontSize: 12, color: 'var(--text)' }}>{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
          <Link>Default</Link>
          <Link disabled>Disabled</Link>
        </div>
        <CodeBlock title="JSX — disabled & onClick" code={snippets.states} />
      </div>

      {/* ── Focus & Accessibility ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Focus &amp; Accessibility</h2>
        <div className="info-box" style={{ marginBottom: 16 }}>
          Focus rings are applied automatically via <strong>CSS token-driven styles</strong>. Do not apply custom focus styles. Links with <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>href</code> render as <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>&lt;a&gt;</code>; without <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>href</code> they render as <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>&lt;button&gt;</code> so keyboard activation always works.
        </div>
        <CodeBlock title="Notes — focus is token-driven" code={snippets.focus} />
      </div>

      {/* ── Props Reference ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Props Reference</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>{['Prop','Type','Default','Description'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ['type',          '"primary" | "danger"',            '"primary"', 'Semantic colour variant'],
                ['size',          '"large" | "medium" | "small"',    '"medium"',  'Text size scale'],
                ['href',          'string',                           '—',         'If provided, renders an <a>; otherwise a <button>'],
                ['disabled',      'boolean',                          'false',     'Reduces opacity, disables interaction'],
                ['showIconLeft',  'boolean',                          'false',     'Render icon before text'],
                ['showIconRight', 'boolean',                          'false',     'Render icon after text'],
                ['iconLeft',      'ReactNode',                        '—',         'Icon element (left position)'],
                ['iconRight',     'ReactNode',                        '—',         'Icon element (right position)'],
                ['children',      'ReactNode',                        '—',         'Link text content'],
                ['onClick',       'function',                         '—',         'Click handler'],
                ['target',        'string',                           '—',         'Anchor target (e.g., "_blank")'],
                ['rel',           'string',                           'auto',      'Auto-sets noopener noreferrer when target="_blank"'],
                ['className',     'string',                           '—',         'Additional CSS class names'],
              ].map(([prop, type, def, desc], i) => (
                <tr key={prop} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                  <td className="doc-td"><code className="token-pill">{prop}</code></td>
                  <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontSize: 11, color: 'var(--text)' }}>{type}</td>
                  <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontSize: 11, color: 'var(--text-h)', fontWeight: 600 }}>{def}</td>
                  <td className="doc-td" style={{ fontSize: 12 }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Rules for AI ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Rules for AI (MCP)</h2>
        <div className="rule-list">
          {[
            'Do not treat links as buttons — they have no background, padding, or elevation.',
            'Always use text color tokens from the variables panel — never hardcode colors.',
            'Use typography styles for text (font-family, size, weight, line-height).',
            'Use spacing variables for the gap between text and icon.',
            'Always use predefined icon tokens — do not generate or infer icons.',
            'Icons must align with the text baseline.',
            'Focus state must use the focus shadow tokens.',
            'Disabled state must reduce opacity and disable interaction.',
            'Do not render both icons unless explicitly required by the design.',
          ].map((rule, i) => (
            <div key={i} className="rule-row"><span className="rule-num">{i + 1}</span><span className="rule-text">{rule}</span></div>
          ))}
        </div>
      </div>

      {/* ── Common Mistakes ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Common Mistakes to Avoid</h2>
        <div className="bullet-list">
          {[
            'Adding background, padding, or elevation to a link',
            'Treating a link like a button (using button styles or container chrome)',
            'Misaligning icon and text due to custom flex layout',
            'Using arbitrary spacing instead of spacing tokens',
            'Hardcoding colors instead of using text-brand or text-danger tokens',
            'Rendering both icons when only one is specified by the design',
          ].map((item, i) => (
            <div key={i} className="bullet-row">
              <span className="bullet-dot bullet-dot--danger">•</span>
              <span className="bullet-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
