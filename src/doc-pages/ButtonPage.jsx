import { useState } from 'react';
import { Button } from '../components/Button/Button';
import PlusIcon from '../icons/line_icons/line_plus.svg?react';
import ArrowRightIcon from '../icons/line_icons/line_arrow-right.svg?react';

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
      {/* Title bar */}
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
      {/* Code area */}
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}

const VARIANTS = ['primary', 'accent', 'danger'];
const STYLES   = ['filled', 'outline', 'empty'];
const SIZES    = ['large', 'medium', 'small'];
const variantColors = { primary: '#1E54AF', accent: '#219829', danger: '#E33620' };

// ─── Code snippets ─────────────────────────────────────────────────────────
const snippets = {
  import: `import { Button } from '@mcp/design-system';`,

  basic: `// Basic usage — default: primary, filled, medium
<Button>Submit</Button>

// Explicit variant + style + size
<Button type="primary" buttonStyle="filled" size="large">
  Save Changes
</Button>`,

  variants: `// Primary — default brand action
<Button type="primary" buttonStyle="filled">Continue</Button>

// Accent — secondary / positive action
<Button type="accent" buttonStyle="filled">Confirm</Button>

// Danger — destructive action
<Button type="danger" buttonStyle="filled">Delete</Button>`,

  styles: `// Filled — highest visual weight, primary actions
<Button type="primary" buttonStyle="filled">Save</Button>

// Outline — medium weight, secondary actions
<Button type="primary" buttonStyle="outline">Cancel</Button>

// Empty / Ghost — lowest weight, tertiary actions
<Button type="primary" buttonStyle="empty">Learn more</Button>`,

  sizes: `<Button size="large">Large</Button>
<Button size="medium">Medium</Button>   {/* default */}
<Button size="small">Small</Button>`,

  icons: `// Icon on the left
<Button showIconLeft iconLeft={<PlusIcon />}>Add item</Button>

// Icon on the right
<Button showIconRight iconRight={<ArrowRightIcon />}>Continue</Button>

// Both icons
<Button
  showIconLeft  iconLeft={<PlusIcon />}
  showIconRight iconRight={<ArrowRightIcon />}
>
  Add &amp; Continue
</Button>`,

  iconOnly: `// Icon-only — square button, label used as aria-label
<Button iconOnly icon={<PlusIcon />} size="large">Add item</Button>
<Button iconOnly icon={<PlusIcon />} size="medium">Add item</Button>
<Button iconOnly icon={<PlusIcon />} size="small">Add item</Button>`,

  states: `// Disabled — 40% opacity, no pointer events
<Button disabled>Unavailable</Button>

// Submit form button
<Button htmlType="submit" type="primary" buttonStyle="filled">
  Submit form
</Button>`,

  focus: `// Focus ring is applied automatically on keyboard focus.
// Do not apply focus styles manually — they are token-driven:
//   --focus-shadow-default  (blue ring for standard elements)
//   --focus-shadow-error    (red ring for invalid states)`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function ButtonPage() {
  const [activeVariant, setActiveVariant] = useState('primary');

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Button</h1>
        <p className="doc-desc">
          Buttons are interactive elements used to trigger actions. They support multiple variants,
          styles, sizes, and states to cover different use cases.
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
          {VARIANTS.map(v => (
            <button
              key={v}
              className={`tab-btn${activeVariant === v ? ' tab-btn--active' : ''}`}
              onClick={() => setActiveVariant(v)}
              style={activeVariant === v ? { color: variantColors[v], borderBottomColor: variantColors[v] } : {}}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 24px', marginBottom: 0 }}>
          {STYLES.map(style => (
            <DemoRow key={style} label={style}>
              {SIZES.map(size => (
                <Button key={size} type={activeVariant} buttonStyle={style} size={size}>Button</Button>
              ))}
            </DemoRow>
          ))}
          <div className="doc-divider" style={{ margin: '12px 0' }} />
          <DemoRow label="Icon Left">
            {SIZES.map(size => <Button key={size} type={activeVariant} buttonStyle="filled" size={size} showIconLeft iconLeft={<PlusIcon />}>Button</Button>)}
          </DemoRow>
          <DemoRow label="Icon Right">
            {SIZES.map(size => <Button key={size} type={activeVariant} buttonStyle="filled" size={size} showIconRight iconRight={<ArrowRightIcon />}>Button</Button>)}
          </DemoRow>
          <DemoRow label="Both Icons">
            {SIZES.map(size => <Button key={size} type={activeVariant} buttonStyle="filled" size={size} showIconLeft iconLeft={<PlusIcon />} showIconRight iconRight={<ArrowRightIcon />}>Button</Button>)}
          </DemoRow>
          <div className="doc-divider" style={{ margin: '12px 0' }} />
          <DemoRow label="Icon Only">
            {STYLES.map(style => <Button key={`lg-${style}`} type={activeVariant} buttonStyle={style} size="large" iconOnly icon={<PlusIcon />}>Add</Button>)}
            {STYLES.map(style => <Button key={`md-${style}`} type={activeVariant} buttonStyle={style} size="medium" iconOnly icon={<PlusIcon />}>Add</Button>)}
            {STYLES.map(style => <Button key={`sm-${style}`} type={activeVariant} buttonStyle={style} size="small" iconOnly icon={<PlusIcon />}>Add</Button>)}
          </DemoRow>
          <div className="doc-divider" style={{ margin: '12px 0' }} />
          <DemoRow label="Disabled">
            {STYLES.map(style => <Button key={style} type={activeVariant} buttonStyle={style} disabled>{style.charAt(0).toUpperCase() + style.slice(1)}</Button>)}
          </DemoRow>
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">Defaults to <code className="token-pill">primary · filled · medium</code>.</p>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Variants ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Variants</h2>
        <p className="doc-body-text">Use <code className="token-pill">type</code> to control the semantic variant of the button.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <Button type="primary" buttonStyle="filled">Primary</Button>
          <Button type="accent"  buttonStyle="filled">Accent</Button>
          <Button type="danger"  buttonStyle="filled">Danger</Button>
        </div>
        <CodeBlock title="JSX — type prop" code={snippets.variants} />
      </div>

      {/* ── Styles ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Styles</h2>
        <p className="doc-body-text">Use <code className="token-pill">buttonStyle</code> to control visual weight. Match weight to action hierarchy.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <Button type="primary" buttonStyle="filled">Filled</Button>
          <Button type="primary" buttonStyle="outline">Outline</Button>
          <Button type="primary" buttonStyle="empty">Empty</Button>
        </div>
        <CodeBlock title="JSX — buttonStyle prop" code={snippets.styles} />
      </div>

      {/* ── Sizes ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Sizes</h2>
        <p className="doc-body-text">Use <code className="token-pill">size</code> to match button scale to its context. <code className="token-pill">medium</code> is the default.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <Button size="large">Large</Button>
          <Button size="medium">Medium</Button>
          <Button size="small">Small</Button>
        </div>
        <CodeBlock title="JSX — size prop" code={snippets.sizes} />
      </div>

      {/* ── Icons ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Icons</h2>
        <p className="doc-body-text">Use <code className="token-pill">showIconLeft</code> / <code className="token-pill">showIconRight</code> with the matching icon prop. Do not render both unless intentional.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <Button showIconLeft iconLeft={<PlusIcon />}>Add item</Button>
          <Button showIconRight iconRight={<ArrowRightIcon />}>Continue</Button>
          <Button showIconLeft iconLeft={<PlusIcon />} showIconRight iconRight={<ArrowRightIcon />}>Add &amp; Go</Button>
        </div>
        <CodeBlock title="JSX — showIconLeft / showIconRight" code={snippets.icons} />
      </div>

      {/* ── Icon Only ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Icon Only</h2>
        <p className="doc-body-text">
          Set <code className="token-pill">iconOnly</code> to render a square icon button. The <code className="token-pill">children</code> string is used as the accessible <code className="token-pill">aria-label</code> — it is not rendered visually.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <Button iconOnly icon={<PlusIcon />} size="large">Add item</Button>
          <Button iconOnly icon={<PlusIcon />} size="medium">Add item</Button>
          <Button iconOnly icon={<PlusIcon />} size="small">Add item</Button>
          <Button type="primary" buttonStyle="outline" iconOnly icon={<PlusIcon />}>Add item</Button>
          <Button type="primary" buttonStyle="empty"   iconOnly icon={<PlusIcon />}>Add item</Button>
        </div>
        <CodeBlock title="JSX — iconOnly prop" code={snippets.iconOnly} />
      </div>

      {/* ── States ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">States</h2>
        <div className="doc-table-wrap" style={{ marginBottom: 16 }}>
          <table className="doc-table">
            <thead><tr>{['State','Behavior','How to trigger'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr></thead>
            <tbody>
              {[
                ['hover',    'Background / border shifts based on style', 'Automatic on mouse hover'],
                ['focus',    'Blue focus ring (ring + colored shadow)',   'Keyboard Tab / click'],
                ['disabled', 'Opacity 40%, pointer-events none',          'Add disabled prop'],
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
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button htmlType="submit">Submit</Button>
        </div>
        <CodeBlock title="JSX — disabled & htmlType" code={snippets.states} />
      </div>

      {/* ── Focus ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Focus &amp; Accessibility</h2>
        <div className="info-box" style={{ marginBottom: 16 }}>
          Focus rings are applied automatically via <strong>CSS token-driven styles</strong>. Do not apply custom focus styles. For icon-only buttons, always provide a descriptive <strong>children</strong> string — it becomes the <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>aria-label</code>.
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
                ['type',          '"primary" | "accent" | "danger"', '"primary"', 'Semantic colour variant'],
                ['buttonStyle',   '"filled" | "outline" | "empty"',  '"filled"',  'Visual weight / surface style'],
                ['size',          '"large" | "medium" | "small"',    '"medium"',  'Height and padding scale'],
                ['disabled',      'boolean',                          'false',     'Reduces opacity, disables interaction'],
                ['iconOnly',      'boolean',                          'false',     'Square icon-only button; hides label'],
                ['showIconLeft',  'boolean',                          'false',     'Render icon before label'],
                ['showIconRight', 'boolean',                          'false',     'Render icon after label'],
                ['iconLeft',      'ReactNode',                        '—',         'Icon element (left position)'],
                ['iconRight',     'ReactNode',                        '—',         'Icon element (right position)'],
                ['icon',          'ReactNode',                        '—',         'Icon when iconOnly=true'],
                ['children',      'string',                           '"Button"',  'Label text (aria-label when iconOnly)'],
                ['onClick',       'function',                         '—',         'Click handler'],
                ['htmlType',      '"button" | "submit" | "reset"',   '"button"',  'Native button type attribute'],
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
            'Always construct buttons using defined properties.',
            'Do not create new variants, styles, or sizes.',
            'Always use color tokens from the variables panel — do not infer colors visually.',
            'Use spacing variables for padding and icon gaps.',
            'Use typography styles for labels.',
            'Use radius variables for border radius.',
            'Focus state must use focus shadow styles.',
            'Disabled state must reduce opacity and disable interaction.',
            'Always use predefined icon tokens — do not generate or infer icons.',
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
            'Mixing styles (e.g., filled + outline behavior in the same button)',
            'Using incorrect spacing or typography instead of tokens',
            'Not applying focus shadow — never add custom :focus styles',
            'Using random colors instead of semantic token variants',
            'Showing text label in an icon-only button',
            'Misaligning icon and text due to custom flex layout',
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
