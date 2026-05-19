import { useState } from 'react';
import { Password } from '../components/Password/Password';

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

// ─── Demo cell ─────────────────────────────────────────────────────────────
function DemoCell({ label, children }) {
  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-h)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: 16,
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

// ─── Code snippets ─────────────────────────────────────────────────────────
const snippets = {
  import: `import { Password } from '@mcp/design-system';`,

  basic: `// Basic usage
<Password
  label="Password"
  placeholder="Enter your password"
/>

// With secondary label
<Password
  label="Password"
  secondaryLabel="Min. 8 chars"
  placeholder="Enter your password"
/>`,

  messages: `// Help message
<Password
  label="Password"
  placeholder="Enter your password"
  showHelpMessage
  helpMessage="Must be at least 8 characters."
/>

// Error — help and error are independent, both can render
<Password
  label="Password"
  showHelpMessage helpMessage="Must be at least 8 characters."
  showErrorMessage errorMessage="Password is too short."
/>`,

  controlled: `function PasswordField() {
  const [value, setValue] = useState('');
  const isTooShort = value.length > 0 && value.length < 8;

  return (
    <Password
      label="Password"
      secondaryLabel="Required"
      placeholder="Enter your password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      showHelpMessage
      helpMessage="Must be at least 8 characters."
      showErrorMessage={isTooShort}
      errorMessage="Password is too short."
    />
  );
}`,

  states: `// Default (empty)
<Password label="Password" placeholder="Enter your password" />

// Disabled — 40% opacity, non-interactive
<Password label="Password" placeholder="Enter your password" disabled />

// Error — danger focus ring when focused; error text below
<Password
  label="Password"
  showErrorMessage
  errorMessage="Password is incorrect."
/>`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function PasswordPage() {
  const [controlled, setControlled] = useState('');
  const controlledInvalid = controlled.length > 0 && controlled.length < 8;

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Password</h1>
        <p className="doc-desc">
          Password input with a show/hide toggle. Shares the same label row, help
          message, and error message system as Text Input — driven entirely by
          semantic design tokens.
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
              <Password
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
              />
            </DemoCell>
            <DemoCell label="Default · With Help">
              <Password
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                showHelpMessage
                helpMessage="Help Message"
              />
            </DemoCell>
            <DemoCell label="Error">
              <Password
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                showErrorMessage
                errorMessage="Error Message"
              />
            </DemoCell>
            <DemoCell label="Help + Error">
              <Password
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
              <Password
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                disabled
                showHelpMessage
                helpMessage="Help Message"
              />
            </DemoCell>
            <DemoCell label="Controlled + Validation">
              <Password
                label="Password"
                secondaryLabel="Required"
                placeholder="Enter your password"
                value={controlled}
                onChange={(e) => setControlled(e.target.value)}
                showHelpMessage
                helpMessage="Must be at least 8 characters."
                showErrorMessage={controlledInvalid}
                errorMessage="Password is too short."
              />
            </DemoCell>
          </div>
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">
          The toggle button switches between <code className="token-pill">type="password"</code> (dots)
          and <code className="token-pill">type="text"</code>. The eye icon indicates password is hidden;
          the eye-slash icon indicates it is visible. All other structure — label row, messages — is identical
          to Text Input.
        </p>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Messages ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Help &amp; Error Messages</h2>
        <p className="doc-body-text">
          Help and error messages are independent and both can appear simultaneously.
          Order is strict: help first, then error.{' '}
          <code className="token-pill">showErrorMessage</code> controls error styling
          on the focus ring <strong>and</strong> renders the error text.
        </p>
        <CodeBlock title="JSX — help + error" code={snippets.messages} />
      </div>

      {/* ── Controlled ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Controlled Input</h2>
        <p className="doc-body-text">
          Pass <code className="token-pill">value</code> and{' '}
          <code className="token-pill">onChange</code> to manage the field from state.
          Toggle <code className="token-pill">showErrorMessage</code> based on your validation logic.
        </p>
        <CodeBlock title="JSX — controlled with validation" code={snippets.controlled} />
      </div>

      {/* ── States ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">States</h2>
        <div className="doc-table-wrap" style={{ marginBottom: 16 }}>
          <table className="doc-table">
            <thead>
              <tr>{['State', 'Behavior', 'How to trigger'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ['default',  'Neutral border, placeholder and eye icon at 40% opacity', 'Resting state'],
                ['focused',  'Blue focus ring (ring + colored shadow)',                  'Click / Tab into input or toggle'],
                ['error',    'Danger focus ring when focused; error text below',         'showErrorMessage={true}'],
                ['disabled', 'Entire field at 40% opacity, non-interactive',             'disabled prop'],
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
          The input box uses <strong>CSS <code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>:focus-within</code></strong> to
          show the focus ring whenever either the text input or the toggle button is focused —
          no additional JS needed. The toggle button carries an{' '}
          <strong><code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>aria-label</code></strong> ("Show password" / "Hide password")
          and <strong><code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>aria-invalid</code></strong> is
          set on the input in error state. Help and error elements are wired via{' '}
          <strong><code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>aria-describedby</code></strong>.
        </div>
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
                ['label',            'string',          '—',      'Label text shown above the input'],
                ['secondaryLabel',   'string',          '—',      'Optional right-aligned hint in the label row'],
                ['placeholder',      'string',          '—',      'Placeholder text shown when empty'],
                ['value',            'string',          '—',      'Controlled value'],
                ['defaultValue',     'string',          '—',      'Uncontrolled initial value'],
                ['onChange',         'function(event)', '—',      'Native input change handler'],
                ['disabled',         'boolean',         'false',  'Disables the field and renders it at 40% opacity'],
                ['showHelpMessage',  'boolean',         'false',  'Render the help message below the input'],
                ['helpMessage',      'string',          '—',      'Help text shown when showHelpMessage is true'],
                ['showErrorMessage', 'boolean',         'false',  'Apply error styling and render the error message'],
                ['errorMessage',     'string',          '—',      'Error text shown when showErrorMessage is true'],
                ['id',               'string',          'auto',   'Input id; auto-generated if omitted'],
                ['name',             'string',          '—',      'Native input name attribute'],
                ['className',        'string',          '—',      'Additional CSS class names on the root element'],
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
            'Use the Password Field Variants grid as the ONLY source of truth.',
            'Show Password = False → type="password" (dots) + eye icon.',
            'Show Password = True  → type="text"     (visible) + eye-slash icon.',
            'Help and error messages are independent — both can render at the same time.',
            'Message order is strict: help first, then error.',
            'Apply error styling ONLY when showErrorMessage = true.',
            'Focused + error must use the error focus ring, not the default blue ring.',
            'Disabled state must render the entire field at 40% opacity and be non-interactive.',
            'Always use semantic color, spacing, radius, and typography tokens — never hardcode.',
          ].map((rule, i) => (
            <div key={i} className="rule-row">
              <span className="rule-num">{i + 1}</span>
              <span className="rule-text">{rule}</span>
            </div>
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
            'Using the wrong icon (eye vs eye-slash) for the show/hide state',
            'Ignoring the disabled state styling (must be 40% opacity)',
            'Treating the toggle button as a separate focus target with its own ring',
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
