import { useState } from 'react';
import { Checkbox } from '../components/Checkbox/Checkbox';

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

// ─── State Grid ────────────────────────────────────────────────────────────
function StateGrid() {
  const states = ['Unchecked', 'Checked', 'Indeterminate'];
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
                  <Checkbox
                    checked={state !== 'Unchecked'}
                    indeterminate={state === 'Indeterminate'}
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
                <Checkbox size={sz} label="Label" disabled onChange={() => {}} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
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

// ─── Snippets ──────────────────────────────────────────────────────────────
const snippets = {
  import: `import { Checkbox } from '@mcp/design-system';`,

  basic: `// Uncontrolled — toggle on click
<Checkbox label="Accept terms" onChange={e => console.log(e.target.checked)} />

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox
  checked={checked}
  label="Accept terms"
  onChange={e => setChecked(e.target.checked)}
/>`,

  indeterminate: `// Indeterminate — partial selection (e.g. "select all" when some are checked)
<Checkbox
  checked={true}
  indeterminate={true}
  label="Select all"
  onChange={handleSelectAll}
/>`,

  sizes: `// Small (default) — 20×20px control
<Checkbox size="small" label="Small" onChange={fn} />

// Medium — 24×24px control
<Checkbox size="medium" label="Medium" onChange={fn} />`,

  states: `// Default — interactive
<Checkbox label="Default" onChange={fn} />

// Disabled — muted, no interaction
<Checkbox label="Disabled" disabled onChange={fn} />`,

  noLabel: `// Control only — no label rendered
<Checkbox checked={true} showLabel={false} aria-label="Select row" onChange={fn} />`,

  focus: `// Focus ring is applied automatically on keyboard focus via CSS tokens:
//   --sds-color-effects-focused-shadow-ring   (white outline)
//   --sds-color-effects-focused-shadow-default (blue ring)
// Do not add custom :focus styles.`,
};

// ─── Interactive Demo ──────────────────────────────────────────────────────
function InteractiveDemo() {
  const [selection, setSelection] = useState('unchecked'); // unchecked | checked | indeterminate
  const [size, setSize] = useState('small');
  const [disabled, setDisabled] = useState(false);

  const checked = selection === 'checked' || selection === 'indeterminate';
  const indeterminate = selection === 'indeterminate';

  // Clicking the live checkbox keeps the State control in sync.
  // Indeterminate resolves to checked on click (standard tri-state behavior).
  const handleChange = () => {
    setSelection(prev => (prev === 'checked' ? 'unchecked' : 'checked'));
  };

  const lines = ['<Checkbox', '  label="Label"'];
  if (size !== 'small') lines.push(`  size="${size}"`);
  if (selection !== 'unchecked') lines.push('  checked');
  if (selection === 'indeterminate') lines.push('  indeterminate');
  if (disabled) lines.push('  disabled');
  lines.push('  onChange={handleChange}', '/>');
  const code = lines.join('\n');

  return (
    <div>
      {/* Configuration controls */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 28,
        padding: '20px 24px', marginBottom: 16,
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
      }}>
        <ControlGroup label="State">
          <Seg active={selection === 'unchecked'}     onClick={() => setSelection('unchecked')}>Unchecked</Seg>
          <Seg active={selection === 'checked'}       onClick={() => setSelection('checked')}>Checked</Seg>
          <Seg active={selection === 'indeterminate'} onClick={() => setSelection('indeterminate')}>Indeterminate</Seg>
        </ControlGroup>
        <ControlGroup label="Size">
          <Seg active={size === 'small'}  onClick={() => setSize('small')}>Small</Seg>
          <Seg active={size === 'medium'} onClick={() => setSize('medium')}>Medium</Seg>
        </ControlGroup>
        <ControlGroup label="Disabled">
          <Seg active={!disabled} onClick={() => setDisabled(false)}>Off</Seg>
          <Seg active={disabled}  onClick={() => setDisabled(true)}>On</Seg>
        </ControlGroup>
      </div>

      {/* Live preview */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
        padding: '48px 24px', display: 'flex', justifyContent: 'center', marginBottom: 16,
      }}>
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          disabled={disabled}
          size={size}
          label="Label"
          onChange={handleChange}
        />
      </div>

      {/* Live code for current config */}
      <CodeBlock title="JSX — current configuration" code={code} />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export function CheckboxPage() {
  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Checkbox</h1>
        <p className="doc-desc">
          Checkbox is a selection control used for binary and tri-state input. It supports
          unchecked, checked, and indeterminate states across two sizes with full keyboard
          and focus-ring accessibility.
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
        <p className="doc-body-text">Use a controlled pattern with <code className="token-pill">checked</code> and <code className="token-pill">onChange</code> for predictable behavior.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Unchecked">
            <Checkbox label="Accept terms" onChange={() => {}} />
          </DemoRow>
          <DemoRow label="Checked">
            <Checkbox checked label="Accept terms" onChange={() => {}} />
          </DemoRow>
        </div>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Indeterminate ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Indeterminate State</h2>
        <p className="doc-body-text">
          Use <code className="token-pill">indeterminate</code> for partial selections — e.g. a "select all" checkbox when only some items are checked.
          This is a <strong>controlled state</strong> that must be set externally.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Indeterminate">
            <Checkbox checked indeterminate label="Select all (3 of 7)" onChange={() => {}} />
          </DemoRow>
        </div>
        <CodeBlock title="JSX — indeterminate" code={snippets.indeterminate} />
      </div>

      {/* ── Sizes ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Sizes</h2>
        <p className="doc-body-text">Use <code className="token-pill">size</code> to match scale to context. <code className="token-pill">small</code> is the default.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Small (default) — 20×20px">
            <Checkbox size="small" label="Small" onChange={() => {}} />
            <Checkbox size="small" checked label="Small checked" onChange={() => {}} />
            <Checkbox size="small" checked indeterminate label="Small indeterminate" onChange={() => {}} />
          </DemoRow>
          <DemoRow label="Medium — 24×24px">
            <Checkbox size="medium" label="Medium" onChange={() => {}} />
            <Checkbox size="medium" checked label="Medium checked" onChange={() => {}} />
            <Checkbox size="medium" checked indeterminate label="Medium indeterminate" onChange={() => {}} />
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
            <Checkbox disabled label="Unchecked" onChange={() => {}} />
            <Checkbox checked disabled label="Checked" onChange={() => {}} />
            <Checkbox checked indeterminate disabled label="Indeterminate" onChange={() => {}} />
          </DemoRow>
        </div>
        <CodeBlock title="JSX — disabled" code={snippets.states} />
      </div>

      {/* ── No Label ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Without Label</h2>
        <p className="doc-body-text">
          Set <code className="token-pill">showLabel={`{false}`}</code> to render only the control box. Always provide an <code className="token-pill">aria-label</code> for accessibility.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Control only">
            <Checkbox showLabel={false} aria-label="Select row" onChange={() => {}} />
            <Checkbox checked showLabel={false} aria-label="Select row" onChange={() => {}} />
            <Checkbox checked indeterminate showLabel={false} aria-label="Select all" onChange={() => {}} />
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
                ['checked',       'boolean',              'false',    'Whether the checkbox is checked'],
                ['indeterminate', 'boolean',              'false',    'Indeterminate (partial) state — shows dash icon, overrides check display'],
                ['disabled',      'boolean',              'false',    'Mutes opacity to 40% and blocks all interaction'],
                ['size',          '"small" | "medium"',   '"small"',  'Control size: 20×20px or 24×24px'],
                ['label',         'string',               '—',        'Text label rendered beside the control'],
                ['showLabel',     'boolean',              'true',     'Hide label while keeping the control; use aria-label instead'],
                ['onChange',      'function',             '—',        'Native change handler (event) => void'],
                ['id',            'string',               '—',        'Native input id, for external label association'],
                ['className',     'string',               '—',        'Extra class applied to the wrapper element'],
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
          checkbox input. Do not add custom <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>:focus</code> styles.
          When using <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>showLabel={`{false}`}</code>, always provide a descriptive <strong>aria-label</strong>.
        </div>
        <CodeBlock title="Notes — focus is token-driven" code={snippets.focus} />
      </div>

      {/* ── Rules for AI ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Rules for AI (MCP)</h2>
        <div className="rule-list">
          {[
            'Use the three distinct states: unchecked, checked, and indeterminate — never treat checkbox as boolean only.',
            'Indeterminate is a controlled state — it must be set via the indeterminate prop, not cycled by user clicks.',
            'Use design tokens for all colors, spacing, and radius — never hardcode hex or px values.',
            'Do not add a fourth visual state beyond the three defined.',
            'Disabled state must reduce opacity via var(--sds-opacity-disabled) and block interaction.',
            'Focus ring must use the token-driven shadow — do not apply custom :focus styles.',
            'Always provide aria-label when showLabel is false.',
            'Use only small or medium sizes — do not invent new size values.',
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
            'Treating checkbox as boolean-only and ignoring the indeterminate state',
            'Showing a check icon during the indeterminate state instead of the dash icon',
            'Allowing user clicks to cycle into indeterminate — it must be controlled externally',
            'Hardcoding colors instead of using semantic SDS tokens',
            'Removing or overriding the focus ring styles',
            'Rendering a label-less checkbox without aria-label',
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
