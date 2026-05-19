import { useState } from 'react';
import { MobileNumber } from '../components/MobileNumber/MobileNumber';

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
        fontSize: 12, fontWeight: 600, color: 'var(--text-h)',
        letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16,
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

// ─── Code snippets ─────────────────────────────────────────────────────────
const snippets = {
  import: `import { MobileNumber } from '@mcp/design-system';`,

  basic: `// Basic — defaults to India (+91)
<MobileNumber
  label="Mobile"
  placeholder="Enter number"
/>

// Different default country
<MobileNumber
  label="Phone"
  secondaryLabel="Required"
  placeholder="Enter number"
  defaultCountry="US"
/>`,

  messages: `// With help message
<MobileNumber
  label="Mobile"
  placeholder="Enter number"
  showHelpMessage
  helpMessage="We'll send an OTP to this number."
/>

// Error — help and error are independent
<MobileNumber
  label="Mobile"
  showHelpMessage helpMessage="We'll send an OTP to this number."
  showErrorMessage errorMessage="Enter a valid 10-digit number."
/>`,

  controlled: `function PhoneField() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState({ iso: 'IN', dialCode: '+91' });

  const isInvalid = phone.length > 0 && phone.replace(/\\D/g, '').length < 7;

  return (
    <MobileNumber
      label="Mobile"
      secondaryLabel="Required"
      placeholder="Enter number"
      value={phone}
      onChange={e => setPhone(e.target.value)}
      defaultCountry="IN"
      onCountryChange={c => setCountry(c)}
      showHelpMessage
      helpMessage="OTP will be sent to this number."
      showErrorMessage={isInvalid}
      errorMessage="Enter a valid phone number."
    />
  );
}`,

  states: `// Default
<MobileNumber label="Mobile" placeholder="Enter number" />

// Disabled — 40 % opacity, non-interactive
<MobileNumber label="Mobile" placeholder="Enter number" disabled />

// Error state
<MobileNumber
  label="Mobile"
  showErrorMessage
  errorMessage="Invalid number."
/>`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function MobileNumberPage() {
  const [phone, setPhone]     = useState('');
  const phoneInvalid = phone.length > 0 && phone.replace(/\D/g, '').length < 7;

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Mobile Number</h1>
        <p className="doc-desc">
          Phone-number input with an integrated country-code selector. The prefix
          shows a circular flag, dial code, and chevron — clicking it opens a
          searchable country dropdown. Country data and flags are powered by{' '}
          <code className="token-pill">countries-list</code> and{' '}
          <code className="token-pill">flag-icons</code>.
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
              <MobileNumber
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
              />
            </DemoCell>
            <DemoCell label="With Help Message">
              <MobileNumber
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                showHelpMessage
                helpMessage="Help Message"
              />
            </DemoCell>
            <DemoCell label="Error">
              <MobileNumber
                label="Label"
                secondaryLabel="2nd label"
                placeholder="Placeholder"
                showErrorMessage
                errorMessage="Error Message"
              />
            </DemoCell>
            <DemoCell label="Help + Error">
              <MobileNumber
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
              <MobileNumber
                label="Label"
                secondaryLabel="2nd label"
                defaultValue="9405848867"
                disabled
                showHelpMessage
                helpMessage="Help Message"
              />
            </DemoCell>
            <DemoCell label="Controlled + Validation">
              <MobileNumber
                label="Mobile"
                secondaryLabel="Required"
                placeholder="Enter number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                showHelpMessage
                helpMessage="OTP will be sent to this number."
                showErrorMessage={phoneInvalid}
                errorMessage="Enter a valid phone number."
              />
            </DemoCell>
          </div>
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">
          The country selector defaults to <code className="token-pill">defaultCountry="IN"</code>.
          Clicking the flag / code / chevron prefix opens a searchable dropdown powered by{' '}
          <code className="token-pill">countries-list</code>. The user types only the phone
          number — the dial code is selected from the dropdown and cannot be typed freely.
        </p>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Messages ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Help &amp; Error Messages</h2>
        <p className="doc-body-text">
          Help and error are independent — both can appear at the same time. Order is
          strict: help first, then error.{' '}
          <code className="token-pill">showErrorMessage</code> controls the danger focus
          ring <strong>and</strong> renders the error text.
        </p>
        <CodeBlock title="JSX — help + error" code={snippets.messages} />
      </div>

      {/* ── Controlled ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Controlled Input</h2>
        <p className="doc-body-text">
          Pass <code className="token-pill">value</code> +{' '}
          <code className="token-pill">onChange</code> for the phone number, and{' '}
          <code className="token-pill">onCountryChange</code> to receive the selected
          country object <code className="token-pill">{'{ iso, name, dialCode }'}</code>.
        </p>
        <CodeBlock title="JSX — controlled" code={snippets.controlled} />
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
                ['default',  'Neutral border, placeholder at 40 % opacity', 'Resting state'],
                ['focused',  'Blue focus ring on the input box',             'Click or Tab into phone input or trigger'],
                ['error',    'Danger focus ring when focused; error text',   'showErrorMessage={true}'],
                ['disabled', 'Entire field at 40 % opacity, non-interactive','disabled prop'],
              ].map(([state, behavior, how], i) => (
                <tr key={state} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                  <td className="doc-td"><code className="token-pill">{state}</code></td>
                  <td className="doc-td" style={{ fontSize: 13 }}>{behavior}</td>
                  <td className="doc-td" style={{ fontSize: 12 }}>{how}</td>
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
        <div className="info-box">
          The box uses <strong>CSS <code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>:focus-within</code></strong> —
          focus ring appears when either the country trigger or the phone input is
          focused. The trigger has <code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>aria-haspopup="listbox"</code> and{' '}
          <code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>aria-expanded</code>; the
          phone input carries <code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>aria-invalid</code> and{' '}
          <code style={{ background: 'transparent', border: 'none', padding: 0, fontWeight: 700 }}>aria-describedby</code>.
          Pressing <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontSize: 12 }}>Escape</kbd>{' '}
          closes the dropdown.
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
                ['label',            'string',                   '—',     'Label shown above the input'],
                ['secondaryLabel',   'string',                   '—',     'Optional right-aligned hint in the label row'],
                ['placeholder',      'string',                   '"Enter number"', 'Placeholder for the number field'],
                ['value',            'string',                   '—',     'Controlled phone number value'],
                ['defaultValue',     'string',                   '—',     'Uncontrolled initial phone number'],
                ['onChange',         'function(event)',          '—',     'Phone number change handler'],
                ['defaultCountry',   'string (ISO-2)',           '"IN"',  'Initially selected country code (e.g. "US", "GB")'],
                ['onCountryChange',  'function({iso, name, dialCode})', '—', 'Called when a new country is selected'],
                ['disabled',         'boolean',                  'false', 'Disables the entire field at 40 % opacity'],
                ['showHelpMessage',  'boolean',                  'false', 'Render the help message below the input'],
                ['helpMessage',      'string',                   '—',     'Help text (shown when showHelpMessage is true)'],
                ['showErrorMessage', 'boolean',                  'false', 'Apply error styling and render the error text'],
                ['errorMessage',     'string',                   '—',     'Error text (shown when showErrorMessage is true)'],
                ['id',               'string',                   'auto',  'Input id; auto-generated if omitted'],
                ['name',             'string',                   '—',     'Native input name attribute'],
                ['className',        'string',                   '—',     'Extra CSS class on the root element'],
              ].map(([prop, type, def, desc], i) => (
                <tr key={prop} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                  <td className="doc-td"><code className="token-pill">{prop}</code></td>
                  <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontSize: 11 }}>{type}</td>
                  <td className="doc-td" style={{ fontFamily: 'var(--font-family-mono,monospace)', fontSize: 11, fontWeight: 600 }}>{def}</td>
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
            'Use the Mobile Number Variants grid as the ONLY source of truth.',
            'User types the phone number only — the dial code is selected via dropdown.',
            'The country selector (flag + code + chevron) is a button that opens a listbox.',
            'Help and error messages are independent — both can appear simultaneously.',
            'Message order is strict: help first, then error.',
            'Error styling is applied ONLY when showErrorMessage = true.',
            'Focused + error must show the danger focus ring, not the default blue.',
            'Disabled → 40 % opacity on the entire component, non-interactive.',
            'Never allow free-typing of the dial code.',
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
            'Treating this as a plain TextInput and removing the country selector',
            'Allowing the user to type the country code manually in the text field',
            'Hiding the help message when an error appears',
            'Showing error above help (order is always help → error)',
            'Merging help and error into a single message',
            'Ignoring the disabled state (must be 40 % opacity)',
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
