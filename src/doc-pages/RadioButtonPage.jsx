import { useState } from 'react';
import { RadioButton } from '../components/RadioButton/RadioButton';

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

// ─── Playground helpers ───────────────────────────────────────────────────
function ControlGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 6 }}>{children}</div>
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

// ─── State Grid ────────────────────────────────────────────────────────────
function StateGrid() {
  const states = ['Unselected', 'Selected'];
  const sizes = ['small', 'medium'];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', minWidth: 480 }}>
        <thead>
          <tr>
            <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
              State
            </th>
            {sizes.map(s => (
              <th key={s} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {states.map((state, i) => (
            <tr key={state} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
              <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>
                {state}
              </td>
              {sizes.map(sz => (
                <td key={sz} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                  <RadioButton
                    checked={state === 'Selected'}
                    size={sz}
                    label="Label"
                    onChange={() => {}}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
              Disabled
            </td>
            {sizes.map(sz => (
              <td key={sz} style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <RadioButton size={sz} label="Off" disabled onChange={() => {}} />
                  <RadioButton size={sz} label="On" checked disabled onChange={() => {}} />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Interactive Demo (radio group playground) ─────────────────────────────
function InteractiveDemo() {
  const options = ['Standard', 'Express', 'Overnight'];
  const [value, setValue] = useState('Standard');
  const [size, setSize] = useState('small');
  const [disabled, setDisabled] = useState(false);

  const code = [
    `const [value, setValue] = useState('${options[0]}');`,
    '',
    ...options.map(opt =>
      `<RadioButton\n` +
      `  name="shipping"\n` +
      `  value="${opt}"\n` +
      `  label="${opt}"\n` +
      (size !== 'small' ? `  size="${size}"\n` : '') +
      (disabled ? `  disabled\n` : '') +
      `  checked={value === '${opt}'}\n` +
      `  onChange={e => setValue(e.target.value)}\n` +
      `/>`
    ),
  ].join('\n');

  return (
    <div>
      {/* Configuration controls */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 28,
        padding: '20px 24px', marginBottom: 16,
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
      }}>
        <ControlGroup label="Size">
          <Seg active={size === 'small'}  onClick={() => setSize('small')}>Small</Seg>
          <Seg active={size === 'medium'} onClick={() => setSize('medium')}>Medium</Seg>
        </ControlGroup>
        <ControlGroup label="Disabled">
          <Seg active={!disabled} onClick={() => setDisabled(false)}>Off</Seg>
          <Seg active={disabled}  onClick={() => setDisabled(true)}>On</Seg>
        </ControlGroup>
      </div>

      {/* Live preview — a real, mutually-exclusive radio group */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
        padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16,
      }}>
        {options.map(opt => (
          <RadioButton
            key={opt}
            name="demo-shipping"
            value={opt}
            label={opt}
            size={size}
            disabled={disabled}
            checked={value === opt}
            onChange={e => setValue(e.target.value)}
          />
        ))}
      </div>

      <CodeBlock title="JSX — current configuration" code={code} />
    </div>
  );
}

// ─── Snippets ──────────────────────────────────────────────────────────────
const snippets = {
  import: `import { RadioButton } from '@mcp/design-system';`,

  basic: `// A radio group — share the same name for mutual exclusivity
const [plan, setPlan] = useState('basic');

<RadioButton
  name="plan" value="basic"
  label="Basic"
  checked={plan === 'basic'}
  onChange={e => setPlan(e.target.value)}
/>
<RadioButton
  name="plan" value="pro"
  label="Pro"
  checked={plan === 'pro'}
  onChange={e => setPlan(e.target.value)}
/>`,

  sizes: `// Small (default) — text-sm label
<RadioButton size="small" label="Small" name="g" onChange={fn} />

// Medium — text-md label
<RadioButton size="medium" label="Medium" name="g" onChange={fn} />`,

  states: `// Default — interactive
<RadioButton label="Default" name="g" onChange={fn} />

// Disabled — muted, no interaction
<RadioButton label="Disabled" name="g" disabled onChange={fn} />`,

  noLabel: `// Control only — always supply an aria-label
<RadioButton
  checked
  showLabel={false}
  name="g"
  aria-label="Select option"
  onChange={fn}
/>`,

  focus: `// Focus ring is applied automatically on keyboard focus via CSS tokens:
//   --sds-color-effects-focused-shadow-ring     (white outline)
//   --sds-color-effects-focused-shadow-default  (blue ring)
// Do not add custom :focus styles.`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function RadioButtonPage() {
  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Radio Button</h1>
        <p className="doc-desc">
          Radio Button is a selection control used for mutually exclusive choices. Group
          radios by sharing the same <code className="token-pill">name</code> so only one
          option can be selected at a time.
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
        <p className="doc-body-text">A live, mutually-exclusive group — selecting one option deselects the others.</p>
        <InteractiveDemo />
      </div>

      {/* ── State Grid ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">States &amp; Sizes</h2>
        <p className="doc-body-text">All selection states across both sizes. Hover and focus states are visible naturally during interaction.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '4px 0', marginBottom: 0, overflow: 'hidden' }}>
          <StateGrid />
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">Always group radios with a shared <code className="token-pill">name</code> and drive selection with a single state value.</p>
        <CodeBlock title="JSX — radio group" code={snippets.basic} />
      </div>

      {/* ── Sizes ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Sizes</h2>
        <p className="doc-body-text">Use <code className="token-pill">size</code> to scale the label. The control stays 20×20px; <code className="token-pill">small</code> is the default.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Small (default) — text-sm label">
            <RadioButton size="small" label="Unselected" name="sz-s" onChange={() => {}} />
            <RadioButton size="small" checked label="Selected" name="sz-s2" onChange={() => {}} />
          </DemoRow>
          <DemoRow label="Medium — text-md label">
            <RadioButton size="medium" label="Unselected" name="sz-m" onChange={() => {}} />
            <RadioButton size="medium" checked label="Selected" name="sz-m2" onChange={() => {}} />
          </DemoRow>
        </div>
        <CodeBlock title="JSX — size prop" code={snippets.sizes} />
      </div>

      {/* ── Disabled ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Disabled State</h2>
        <p className="doc-body-text">Add <code className="token-pill">disabled</code> to mute the control and block interaction. Opacity reduces to 40%.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Disabled">
            <RadioButton disabled label="Unselected" name="d1" onChange={() => {}} />
            <RadioButton checked disabled label="Selected" name="d2" onChange={() => {}} />
          </DemoRow>
        </div>
        <CodeBlock title="JSX — disabled" code={snippets.states} />
      </div>

      {/* ── No Label ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Without Label</h2>
        <p className="doc-body-text">
          Set <code className="token-pill">showLabel={`{false}`}</code> to render only the control. Always provide an <code className="token-pill">aria-label</code> for accessibility.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Control only">
            <RadioButton showLabel={false} aria-label="Option one" name="nl" onChange={() => {}} />
            <RadioButton checked showLabel={false} aria-label="Option two" name="nl2" onChange={() => {}} />
          </DemoRow>
        </div>
        <CodeBlock title="JSX — no label" code={snippets.noLabel} />
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
                ['checked',   'boolean',             'false',    'Whether this radio is selected'],
                ['disabled',  'boolean',             'false',    'Mutes opacity to 40% and blocks all interaction'],
                ['size',      '"small" | "medium"',  '"small"',  'Label scale; the control is fixed at 20×20px'],
                ['label',     'string',              '—',        'Text label rendered beside the control'],
                ['showLabel', 'boolean',             'true',     'Hide label while keeping the control; use aria-label instead'],
                ['name',      'string',              '—',        'Group name — radios sharing a name are mutually exclusive'],
                ['value',     'string',              '—',        'Value submitted / reported when selected'],
                ['onChange',  'function',            '—',        'Native change handler (event) => void'],
                ['id',        'string',              '—',        'Native input id, for external label association'],
                ['className', 'string',              '—',        'Extra class applied to the wrapper element'],
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

      {/* ── Focus & Accessibility ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Focus &amp; Accessibility</h2>
        <div className="info-box" style={{ marginBottom: 16 }}>
          Focus rings are applied automatically via <strong>CSS token-driven styles</strong> on the native
          radio input. Do not add custom <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>:focus</code> styles.
          Radios sharing a <strong>name</strong> form an arrow-key-navigable group. When using <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>showLabel={`{false}`}</code>, always provide a descriptive <strong>aria-label</strong>.
        </div>
        <CodeBlock title="Notes — focus is token-driven" code={snippets.focus} />
      </div>

      {/* ── Rules for AI ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Rules for AI (MCP)</h2>
        <div className="rule-list">
          {[
            'Use radio buttons only for mutually exclusive choices — for multi-select use Checkbox.',
            'Always group related radios with a shared name prop.',
            'Selection is a controlled value — exactly one option in a group is checked.',
            'Use design tokens for all colors, spacing, and radius — never hardcode hex or px values.',
            'Selected state is a 4px brand-colored ring — do not add a separate inner dot element.',
            'Disabled state must reduce opacity via var(--sds-opacity-disabled) and block interaction.',
            'Focus ring must use the token-driven shadow — do not apply custom :focus styles.',
            'Always provide aria-label when showLabel is false.',
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
            'Using radio buttons for non-exclusive options instead of checkboxes',
            'Forgetting the shared name prop, breaking mutual exclusivity',
            'Allowing zero or multiple selections within a single group',
            'Hardcoding colors instead of using semantic SDS tokens',
            'Removing or overriding the focus ring styles',
            'Rendering a label-less radio without aria-label',
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
