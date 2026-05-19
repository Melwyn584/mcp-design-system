import { useState } from 'react';
import { ToggleSwitch } from '../components/ToggleSwitch/ToggleSwitch';

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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
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

// External label helper — ToggleSwitch has no built-in label
function Field({ id, label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-pt-2, 8px)' }}>
      {children}
      <label htmlFor={id} style={{
        fontFamily: 'var(--font-family-text)', fontWeight: 600,
        fontSize: 14, color: 'var(--sds-color-text-default-default)', cursor: 'pointer',
      }}>
        {label}
      </label>
    </div>
  );
}

// ─── State Grid ────────────────────────────────────────────────────────────
function StateGrid() {
  const states = ['Off', 'On'];
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
              <td style={{ padding: '16px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>
                {state}
              </td>
              {sizes.map(sz => (
                <td key={sz} style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                  <ToggleSwitch
                    checked={state === 'On'}
                    size={sz}
                    onChange={() => {}}
                    aria-label={`${sz} ${state}`}
                  />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={{ padding: '16px', fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
              Disabled
            </td>
            {sizes.map(sz => (
              <td key={sz} style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <ToggleSwitch size={sz} disabled onChange={() => {}} aria-label={`${sz} disabled off`} />
                  <ToggleSwitch size={sz} checked disabled onChange={() => {}} aria-label={`${sz} disabled on`} />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Interactive Demo (settings-style playground) ──────────────────────────
function InteractiveDemo() {
  const [size, setSize] = useState('small');
  const [disabled, setDisabled] = useState(false);
  const [settings, setSettings] = useState({
    wifi: true,
    notifications: false,
    location: false,
  });

  const toggle = key => setSettings(s => ({ ...s, [key]: !s[key] }));

  const rows = [
    { key: 'wifi', label: 'Wi-Fi' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'location', label: 'Location services' },
  ];

  const code = [
    `const [on, setOn] = useState(false);`,
    '',
    `<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>`,
    `  <ToggleSwitch`,
    `    id="wifi"`,
    `    checked={on}`,
    (size !== 'small' ? `    size="${size}"\n` : '') +
    (disabled ? `    disabled\n` : '') +
    `    onChange={e => setOn(e.target.checked)}`,
    `  />`,
    `  <label htmlFor="wifi">Wi-Fi</label>`,
    `</div>`,
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

      {/* Live preview — a real settings list with external labels */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
        padding: '8px 24px', marginBottom: 16,
      }}>
        {rows.map((row, i) => (
          <div
            key={row.key}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0',
              borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <label
              htmlFor={`demo-${row.key}`}
              style={{
                fontFamily: 'var(--font-family-text)', fontWeight: 600,
                fontSize: size === 'medium' ? 16 : 14,
                color: 'var(--sds-color-text-default-default)', cursor: 'pointer',
              }}
            >
              {row.label}
            </label>
            <ToggleSwitch
              id={`demo-${row.key}`}
              checked={settings[row.key]}
              size={size}
              disabled={disabled}
              onChange={() => toggle(row.key)}
            />
          </div>
        ))}
      </div>

      <CodeBlock title="JSX — current configuration" code={code} />
    </div>
  );
}

// ─── Snippets ──────────────────────────────────────────────────────────────
const snippets = {
  import: `import { ToggleSwitch } from '@mcp/design-system';`,

  basic: `const [enabled, setEnabled] = useState(false);

// Label is external — associate it with the switch via id
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <ToggleSwitch
    id="dark-mode"
    checked={enabled}
    onChange={e => setEnabled(e.target.checked)}
  />
  <label htmlFor="dark-mode">Dark mode</label>
</div>`,

  sizes: `// Small (default) — 36×20 track
<ToggleSwitch size="small" checked aria-label="Small" onChange={fn} />

// Medium — 44×24 track
<ToggleSwitch size="medium" checked aria-label="Medium" onChange={fn} />`,

  states: `// Default — interactive
<ToggleSwitch aria-label="Setting" onChange={fn} />

// Disabled — muted, no interaction
<ToggleSwitch disabled aria-label="Setting" onChange={fn} />`,

  a11y: `// Renders a native <input type="checkbox" role="switch">.
// On/off is conveyed by the native checked state.
//   Tab    → focus the switch
//   Space  → toggle
// Always provide an accessible name via a linked <label htmlFor>
// or an aria-label / aria-labelledby — never place a label inside.`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function ToggleSwitchPage() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Toggle Switch</h1>
        <p className="doc-desc">
          Toggle Switch is a binary control that lets users toggle a setting on or off with
          immediate effect. It represents an instant system state change — not a form-submission
          input — and has no built-in label.
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
        <p className="doc-body-text">Flipping a switch takes effect immediately — no submit step.</p>
        <InteractiveDemo />
      </div>

      {/* ── State Grid ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">States &amp; Sizes</h2>
        <p className="doc-body-text">Both on/off states across both sizes. Hover and focus states are visible naturally during interaction.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '4px 0', marginBottom: 0, overflow: 'hidden' }}>
          <StateGrid />
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">The switch carries no label. Pair it with an external <code className="token-pill">&lt;label htmlFor&gt;</code> tied to the switch <code className="token-pill">id</code>.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="With external label">
            <Field id="basic-a" label="Dark mode">
              <ToggleSwitch id="basic-a" checked={a} onChange={e => setA(e.target.checked)} />
            </Field>
            <Field id="basic-b" label="Auto-save">
              <ToggleSwitch id="basic-b" checked={b} onChange={e => setB(e.target.checked)} />
            </Field>
          </DemoRow>
        </div>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Sizes ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Sizes</h2>
        <p className="doc-body-text">Use <code className="token-pill">size</code> to scale the track and thumb. <code className="token-pill">small</code> is the default.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <DemoRow label="Small (default) — 36×20">
            <ToggleSwitch size="small" aria-label="Small off" onChange={() => {}} />
            <ToggleSwitch size="small" checked aria-label="Small on" onChange={() => {}} />
          </DemoRow>
          <DemoRow label="Medium — 44×24">
            <ToggleSwitch size="medium" aria-label="Medium off" onChange={() => {}} />
            <ToggleSwitch size="medium" checked aria-label="Medium on" onChange={() => {}} />
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
            <ToggleSwitch disabled aria-label="Disabled off" onChange={() => {}} />
            <ToggleSwitch checked disabled aria-label="Disabled on" onChange={() => {}} />
          </DemoRow>
        </div>
        <CodeBlock title="JSX — disabled" code={snippets.states} />
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
                ['checked',   'boolean',             'false',    'On (true) / Off (false) — drives thumb position and track color'],
                ['disabled',  'boolean',             'false',    'Mutes opacity to 40% and blocks all interaction'],
                ['size',      '"small" | "medium"',  '"small"',  'Track + thumb scale: 36×20 or 44×24'],
                ['onChange',  'function',            '—',        'Native change handler (event) => void'],
                ['id',        'string',              '—',        'Native input id — link an external <label htmlFor>'],
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
        <p className="doc-body-text" style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
          Any extra props (e.g. <code className="token-pill">aria-label</code>, <code className="token-pill">name</code>) are forwarded to the native input.
        </p>
      </div>

      {/* ── Focus & Accessibility ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Focus &amp; Accessibility</h2>
        <div className="info-box" style={{ marginBottom: 16 }}>
          Renders a native <strong>&lt;input type="checkbox" role="switch"&gt;</strong>. Focus rings
          are token-driven — do not add custom <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>:focus</code> styles.
          The switch has <strong>no built-in label</strong>: always supply an accessible name via a linked
          <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}> &lt;label htmlFor&gt;</code> or <strong>aria-label</strong>.
          Keyboard: <strong>Tab</strong> to focus, <strong>Space</strong> to toggle.
        </div>
        <CodeBlock title="Notes — accessibility" code={snippets.a11y} />
      </div>

      {/* ── Rules for AI ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Rules for AI (MCP)</h2>
        <div className="rule-list">
          {[
            'Use a toggle switch for immediate binary state changes — not for form submission.',
            'Never place a label inside the component — provide it externally and link via id.',
            'State changes must be immediate; do not delay or defer the update.',
            'Use design tokens for all colors, spacing, and radius — never hardcode hex values.',
            'The thumb must stay within track bounds and remain aligned in every state.',
            'Disabled state must reduce opacity via var(--sds-opacity-disabled) and block interaction.',
            'Focus ring must use the token-driven shadow — never remove the focus state.',
            'Render a native input with role="switch" — do not implement as a button.',
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
            'Treating the switch as a button instead of a binary input',
            'Delaying state updates or requiring a separate submit action',
            'Placing a label inside the component instead of externally',
            'Breaking thumb alignment or letting the thumb overflow the track',
            'Removing the focus state or hardcoding colors',
            'Using a toggle for actions — use it only for on/off settings',
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
