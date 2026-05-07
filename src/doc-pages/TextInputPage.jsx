import { useState } from 'react';
import { TextInput } from '../components/TextInput/TextInput';

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

// ─── Demo cell — constrains width like the Figma grid ─────────────────────
function DemoCell({ label, children }) {
  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <div style={{ 
        fontSize: 12, 
        fontWeight: 600, 
        color: 'var(--text-h)', 
        letterSpacing: '0.05em', 
        textTransform: 'uppercase', 
        marginBottom: 16 
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

// ─── Code snippets ─────────────────────────────────────────────────────────
const snippets = {
  import: `import { TextInput } from '@mcp/design-system';`,

  basic: `// Basic usage
<TextInput
  label="Email"
  placeholder="you@example.com"
/>

// With secondary label (optional hint on the right)
<TextInput
  label="Phone"
  secondaryLabel="Optional"
  type="tel"
  placeholder="(555) 000-0000"
/>`,

  messages: `// Help message below the input
<TextInput
  label="Username"
  placeholder="e.g. jane_doe"
  showHelpMessage
  helpMessage="Only letters, numbers and underscores."
/>

// Error message — help and error are independent, both can render
<TextInput
  label="Email"
  value="not-an-email"
  showHelpMessage helpMessage="We'll never share your email."
  showErrorMessage errorMessage="Enter a valid email address."
/>`,

  controlled: `function EmailField() {
  const [value, setValue] = useState('');
  const isInvalid = value.length > 0 && !value.includes('@');

  return (
    <TextInput
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      showErrorMessage={isInvalid}
      errorMessage="Enter a valid email address."
    />
  );
}`,

  states: `// Default (empty)
<TextInput label="Label" placeholder="Placeholder" />

// Disabled — entire field at 40% opacity, non-interactive
<TextInput label="Label" placeholder="Placeholder" disabled />

// Error — border/focus ring switch to the danger token
<TextInput
  label="Label"
  value="Invalid value"
  showErrorMessage errorMessage="Something went wrong."
/>`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function TextInputPage() {
  const [controlled, setControlled] = useState('');
  const controlledInvalid = controlled.length > 0 && !controlled.includes('@');

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Text Input</h1>
        <p className="doc-desc">
          Single-line text field with an optional label row, help message, and error
          message. Driven entirely by semantic design tokens — colors, spacing,
          typography, radius, and focus shadows.
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
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '48px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px 40px' }}>
            <DemoCell label="Default · Empty">
              <TextInput
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
              />
            </DemoCell>
            <DemoCell label="Default · With Help">
              <TextInput
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                showHelpMessage
                helpMessage="Help Message"
              />
            </DemoCell>
            <DemoCell label="Error">
              <TextInput
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                showErrorMessage
                errorMessage="Error Message"
              />
            </DemoCell>
            <DemoCell label="Help + Error">
              <TextInput
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                showHelpMessage  helpMessage="Help Message"
                showErrorMessage errorMessage="Error Message"
              />
            </DemoCell>
          </div>

          <div className="doc-divider" style={{ margin: '48px 0', opacity: 0.5 }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px 40px' }}>
            <DemoCell label="Disabled">
              <TextInput
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                disabled
                showHelpMessage
                helpMessage="Help Message"
              />
            </DemoCell>
            <DemoCell label="Controlled + Validation">
              <TextInput
                label="Email"
                secondaryLabel="Required"
                placeholder="you@example.com"
                value={controlled}
                onChange={(e) => setControlled(e.target.value)}
                showHelpMessage
                helpMessage="We will never share your email."
                showErrorMessage={controlledInvalid}
                errorMessage="Enter a valid email address."
              />
            </DemoCell>
          </div>
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">
          The label row, help message, and error message are all optional and rendered
          independently. Use <code className="token-pill">secondaryLabel</code> for
          short right-aligned hints (e.g. "Optional", "Min. 8 chars").
        </p>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Messages ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Help &amp; Error Messages</h2>
        <p className="doc-body-text">
          Help and error messages are independent. They can appear together — help first,
          then error. Error styling is applied <strong>only</strong> when
          <code className="token-pill">showErrorMessage</code> is <code className="token-pill">true</code>.
        </p>
        <CodeBlock title="JSX — help + error" code={snippets.messages} />
      </div>

      {/* ── Controlled ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Controlled Input</h2>
        <p className="doc-body-text">
          Pass <code className="token-pill">value</code> and <code className="token-pill">onChange</code> to
          drive the input from state. Toggle <code className="token-pill">showErrorMessage</code> based on
          your own validation logic.
        </p>
        <CodeBlock title="JSX — controlled with validation" code={snippets.controlled} />
      </div>

      {/* ── States ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">States</h2>
        <div className="doc-table-wrap" style={{ marginBottom: 16 }}>
          <table className="doc-table">
            <thead><tr>{['State','Behavior','How to trigger'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr></thead>
            <tbody>
              {[
                ['default',  'Neutral border, placeholder at 40% opacity',      'Resting state'],
                ['focused',  'Blue focus ring (ring + colored shadow)',          'Click / Tab into input'],
                ['error',    'Danger focus ring when focused; error text below', 'showErrorMessage={true}'],
                ['disabled', 'Entire field at 40% opacity, non-interactive',     'disabled prop'],
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
        <CodeBlock title="JSX — state examples" code={snippets.states} />
      </div>

      {/* ── Focus & Accessibility ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Focus &amp; Accessibility</h2>
        <div className="info-box" style={{ marginBottom: 16 }}>
          Focus rings are applied automatically via <strong>CSS token-driven styles</strong>. When
          <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}> showErrorMessage</code> is true, the focus ring uses
          <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}> --sds-color-effects-focused-shadow-danger</code>.
          The input automatically wires <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>aria-describedby</code>
          to the help and error elements, and sets <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}>aria-invalid</code> in error state.
        </div>
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
                ['label',            'string',                  '—',       'Label text shown above the input'],
                ['secondaryLabel',   'string',                  '—',       'Optional right-aligned hint in the label row'],
                ['placeholder',      'string',                  '—',       'Placeholder text shown when empty'],
                ['value',            'string',                  '—',       'Controlled value'],
                ['defaultValue',     'string',                  '—',       'Uncontrolled initial value'],
                ['onChange',         'function(event)',         '—',       'Native input change handler'],
                ['disabled',         'boolean',                 'false',   'Disables the field and renders it at 40% opacity'],
                ['showHelpMessage',  'boolean',                 'false',   'Render the help message below the input'],
                ['helpMessage',      'string',                  '—',       'Help text shown when showHelpMessage is true'],
                ['showErrorMessage', 'boolean',                 'false',   'Apply error styling and render the error message'],
                ['errorMessage',     'string',                  '—',       'Error text shown when showErrorMessage is true'],
                ['id',               'string',                  'auto',    'Input id; auto-generated if omitted'],
                ['name',             'string',                  '—',       'Native input name attribute'],
                ['type',             'string',                  '"text"',  'Native input type (text, email, tel, search, …)'],
                ['className',        'string',                  '—',       'Additional CSS class names on the root element'],
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
            'Use the Input Field Variants grid as the ONLY source of truth — do not infer new states.',
            'Help and error messages are independent — both can render at the same time.',
            'Message order is strict: help first, then error.',
            'Apply error styling ONLY when showErrorMessage = true.',
            'Focused + error must use the error focus ring, not the default blue ring.',
            'Disabled state must render the entire field at 40% opacity and be non-interactive.',
            'Always use semantic color, spacing, radius, and typography tokens — never hardcode.',
            'Do not add new props or states (e.g. icons, prefix/suffix) unless they exist in the Figma variant grid.',
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
            'Hiding the help message when an error appears — they are independent',
            'Showing the error above the help message',
            'Merging help + error into a single message',
            'Ignoring the disabled state styling (must be 40% opacity)',
            'Recreating nested Figma components instead of rendering a single input',
            'Adding extra abstraction (icons, adornments) that do not exist in the variant grid',
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
