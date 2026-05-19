import { useState } from 'react';
import { Badge } from '../components/Badge/Badge';

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

// ─── Playground helpers ───────────────────────────────────────────────────
function ControlGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function Seg({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`tab-btn${active ? ' tab-btn--active' : ''}`}>
      {children}
    </button>
  );
}

const COLORS = ['brand', 'accent', 'danger', 'warning', 'success', 'neutral'];
const VARIANTS = ['filled', 'stroke'];

// ─── Color × Style Matrix ──────────────────────────────────────────────────
function Matrix() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', minWidth: 420 }}>
        <thead>
          <tr>
            <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
              Color
            </th>
            {VARIANTS.map(v => (
              <th key={v} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLORS.map((c, i) => (
            <tr key={c} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
              <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', fontWeight: 600, textTransform: 'capitalize' }}>
                {c}
              </td>
              {VARIANTS.map(v => (
                <td key={v} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                  <Badge text="Badge" variant={v} color={c} showLeftIcon showRightIcon />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
              Neutral, Disabled
            </td>
            {VARIANTS.map(v => (
              <td key={v} style={{ padding: '14px 20px' }}>
                <Badge text="Badge" variant={v} color="neutral" disabled showLeftIcon showRightIcon />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Interactive Demo (props playground) ───────────────────────────────────
function InteractiveDemo() {
  const [variant, setVariant] = useState('filled');
  const [color, setColor] = useState('brand');
  const [disabled, setDisabled] = useState(false);
  const [leftIcon, setLeftIcon] = useState(false);
  const [rightIcon, setRightIcon] = useState(false);

  const lines = ['<Badge', '  text="Badge"', `  variant="${variant}"`, `  color="${color}"`];
  if (disabled) lines.push('  disabled');
  if (leftIcon) lines.push('  showLeftIcon');
  if (rightIcon) lines.push('  showRightIcon');
  lines.push('/>');
  const code = lines.join('\n');

  return (
    <div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 28,
        padding: '20px 24px', marginBottom: 16,
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
      }}>
        <ControlGroup label="Variant">
          {VARIANTS.map(v => (
            <Seg key={v} active={variant === v} onClick={() => setVariant(v)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Seg>
          ))}
        </ControlGroup>
        <ControlGroup label="Color">
          {COLORS.map(c => (
            <Seg key={c} active={color === c} onClick={() => setColor(c)}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </Seg>
          ))}
        </ControlGroup>
        <ControlGroup label="Disabled">
          <Seg active={!disabled} onClick={() => setDisabled(false)}>Off</Seg>
          <Seg active={disabled} onClick={() => setDisabled(true)}>On</Seg>
        </ControlGroup>
        <ControlGroup label="Icons">
          <Seg active={leftIcon} onClick={() => setLeftIcon(v => !v)}>Left</Seg>
          <Seg active={rightIcon} onClick={() => setRightIcon(v => !v)}>Right</Seg>
        </ControlGroup>
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
        padding: '48px 24px', display: 'flex', justifyContent: 'center', marginBottom: 16,
      }}>
        <Badge
          text="Badge"
          variant={variant}
          color={color}
          disabled={disabled}
          showLeftIcon={leftIcon}
          showRightIcon={rightIcon}
        />
      </div>

      <CodeBlock title="JSX — current configuration" code={code} />
    </div>
  );
}

// ─── Snippets ──────────────────────────────────────────────────────────────
const snippets = {
  import: `import { Badge } from '@mcp/design-system';`,

  basic: `// Defaults: filled · brand · no icons
<Badge text="New" />

// Explicit variant + color
<Badge text="Beta" variant="stroke" color="accent" />`,

  colors: `<Badge text="Brand"   color="brand" />
<Badge text="Accent"  color="accent" />
<Badge text="Danger"  color="danger" />
<Badge text="Warning" color="warning" />
<Badge text="Success" color="success" />
<Badge text="Neutral" color="neutral" />`,

  variants: `// Filled — solid tinted background
<Badge text="Active" variant="filled" color="success" />

// Stroke — transparent background + colored border
<Badge text="Draft" variant="stroke" color="neutral" />`,

  icons: `// Optional icons on either side (default bolt icon)
<Badge text="Energy" showLeftIcon showRightIcon />

// Custom icons override the default
<Badge text="Verified" showLeftIcon leftIcon={<CheckIcon />} />`,

  disabled: `// Disabled forces neutral styling at 40% opacity
<Badge text="Archived" disabled />`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function BadgePage() {
  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Badge</h1>
        <p className="doc-desc">
          Badge is used to highlight status, category, or short metadata in a compact,
          non-interactive format. It is purely informational — it never triggers actions
          and must not behave like a button.
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
        <InteractiveDemo />
      </div>

      {/* ── Matrix ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Colors &amp; Styles</h2>
        <p className="doc-body-text">Every color in both styles. Disabled applies neutral styling only, at 40% opacity.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '4px 0', overflow: 'hidden' }}>
          <Matrix />
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">Defaults to <code className="token-pill">filled · brand</code> with no icons.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <Badge text="New" />
          <Badge text="Beta" variant="stroke" color="accent" />
        </div>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Colors ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Colors</h2>
        <p className="doc-body-text">Six semantic colors map to status meaning. Use <code className="token-pill">color</code> to set them.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {COLORS.map(c => <Badge key={c} text={c.charAt(0).toUpperCase() + c.slice(1)} color={c} />)}
        </div>
        <CodeBlock title="JSX — color prop" code={snippets.colors} />
      </div>

      {/* ── Variants ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Variants</h2>
        <p className="doc-body-text">Use <code className="token-pill">variant</code> for visual weight. Never mix filled and stroke in the same group.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          {COLORS.map(c => <Badge key={`f-${c}`} text="Filled" variant="filled" color={c} />)}
          <div style={{ flexBasis: '100%', height: 0 }} />
          {COLORS.map(c => <Badge key={`s-${c}`} text="Stroke" variant="stroke" color={c} />)}
        </div>
        <CodeBlock title="JSX — variant prop" code={snippets.variants} />
      </div>

      {/* ── Icons ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Icons</h2>
        <p className="doc-body-text">
          Optional icons on either side via <code className="token-pill">showLeftIcon</code> / <code className="token-pill">showRightIcon</code>.
          They default to a bolt icon; pass <code className="token-pill">leftIcon</code> / <code className="token-pill">rightIcon</code> to override. Icons inherit the badge text color.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <Badge text="Left" color="brand" showLeftIcon />
          <Badge text="Right" color="success" showRightIcon />
          <Badge text="Both" color="warning" showLeftIcon showRightIcon />
          <Badge text="Both" variant="stroke" color="danger" showLeftIcon showRightIcon />
        </div>
        <CodeBlock title="JSX — icon props" code={snippets.icons} />
      </div>

      {/* ── Disabled ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Disabled</h2>
        <p className="doc-body-text">
          <code className="token-pill">disabled</code> forces <strong>neutral</strong> styling at 40% opacity, regardless of the <code className="token-pill">color</code> prop.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <Badge text="Disabled" disabled showLeftIcon showRightIcon />
          <Badge text="Disabled" variant="stroke" disabled showLeftIcon showRightIcon />
          <Badge text="Was brand" color="brand" disabled />
        </div>
        <CodeBlock title="JSX — disabled" code={snippets.disabled} />
      </div>

      {/* ── Props Reference ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Props Reference</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>{['Prop', 'Type', 'Default', 'Description'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ['text',          'string',                                                  '"Badge"',  'Label text'],
                ['variant',       '"filled" | "stroke"',                                     '"filled"', 'Tinted background vs. transparent + border'],
                ['color',         '"brand" | "accent" | "danger" | "warning" | "success" | "neutral"', '"brand"', 'Semantic color'],
                ['disabled',      'boolean',                                                 'false',    'Forces neutral styling at 40% opacity'],
                ['showLeftIcon',  'boolean',                                                 'false',    'Render an icon before the text'],
                ['showRightIcon', 'boolean',                                                 'false',    'Render an icon after the text'],
                ['leftIcon',      'ReactNode',                                               '— (bolt)', 'Override the default left icon'],
                ['rightIcon',     'ReactNode',                                               '— (bolt)', 'Override the default right icon'],
                ['className',     'string',                                                  '—',        'Extra class applied to the badge'],
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
            'Badge is purely informational — never make it clickable or treat it like a button.',
            'Never mix filled and stroke styles within the same badge or group.',
            'Use design tokens for all colors — never hardcode hex values.',
            'Disabled uses neutral styling only, with reduced contrast (40% opacity).',
            'Padding, gap, and pill radius are fixed — do not add extra spacing.',
            'Icons are optional on both sides and must align vertically with the text.',
            'Do not infer states or behavior not present in the usage grid.',
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
            'Making the badge clickable or attaching actions to it',
            'Treating the badge like a button',
            'Mixing filled and stroke styles together',
            'Ignoring the disabled neutral styling rule',
            'Adding extra padding or spacing not defined in the grid',
            'Hardcoding colors instead of using semantic tokens',
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
