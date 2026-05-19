import { useState } from 'react';
import { Textarea } from '../components/Textarea/Textarea';

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
  import: `import { Textarea } from '@mcp/design-system';`,

  basic: `// Basic usage
<Textarea
  label="Description"
  placeholder="Enter a description…"
/>

// With secondary label
<Textarea
  label="Bio"
  secondaryLabel="Optional"
  placeholder="Tell us about yourself…"
/>`,

  messages: `// Help message below the textarea
<Textarea
  label="Comments"
  placeholder="Add your comments…"
  showHelpMessage
  helpMessage="Be as detailed as possible."
/>

// Error message — help and error are independent, both can render
<Textarea
  label="Description"
  value="Too short"
  showHelpMessage helpMessage="Use at least 50 characters."
  showErrorMessage errorMessage="Description is too short."
/>`,

  controlled: `function FeedbackField() {
  const [value, setValue] = useState('');
  const isInvalid = value.length > 0 && value.length < 20;

  return (
    <Textarea
      label="Feedback"
      placeholder="Share your thoughts…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      showErrorMessage={isInvalid}
      errorMessage="Please enter at least 20 characters."
    />
  );
}`,

  states: `// Default (empty)
<Textarea label="Label" placeholder="Placeholder" />

// With content
<Textarea label="Label" defaultValue="Content" />

// Disabled
<Textarea label="Label" defaultValue="Content" disabled />

// Error
<Textarea
  label="Label"
  defaultValue="Content"
  showErrorMessage
  errorMessage="Something went wrong."
/>`,
};

// ─── Interactive demo ───────────────────────────────────────────────────────
function InteractiveDemo() {
  const [value, setValue]         = useState('');
  const [showHelp, setShowHelp]   = useState(false);
  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled]   = useState(false);
  const [showSecondary, setShowSecondary] = useState(true);

  return (
    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* Controls */}
      <div style={{ minWidth: 200 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-h)', marginBottom: 16 }}>
          Controls
        </p>
        {[
          ['Show help message', showHelp, setShowHelp],
          ['Show error message', showError, setShowError],
          ['Disabled', disabled, setDisabled],
          ['Secondary label', showSecondary, setShowSecondary],
        ].map(([lbl, val, setter]) => (
          <label key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer', fontSize: 14, color: 'var(--text)' }}>
            <input
              type="checkbox"
              checked={val}
              onChange={(e) => setter(e.target.checked)}
              style={{ accentColor: 'var(--accent)', width: 16, height: 16 }}
            />
            {lbl}
          </label>
        ))}
      </div>

      {/* Live preview */}
      <div style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
        <Textarea
          label="Description"
          secondaryLabel={showSecondary ? 'Optional' : undefined}
          placeholder="Enter a description…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          showHelpMessage={showHelp}
          helpMessage="Be as detailed as possible."
          showErrorMessage={showError}
          errorMessage="This field has an error."
        />
      </div>
    </div>
  );
}

// ─── Props table ────────────────────────────────────────────────────────────
const propRows = [
  ['label',            'string',   '—',      'Label text above the textarea'],
  ['secondaryLabel',   'string',   '—',      'Right-aligned secondary label in the label row'],
  ['placeholder',      'string',   '—',      'Placeholder text shown when empty'],
  ['value',            'string',   '—',      'Controlled value'],
  ['defaultValue',     'string',   '—',      'Uncontrolled initial value'],
  ['onChange',         'function', '—',      'Change handler: (e) => void'],
  ['disabled',         'boolean',  'false',  'Renders muted and non-interactive at 40% opacity'],
  ['showHelpMessage',  'boolean',  'false',  'Renders the help message below the textarea'],
  ['helpMessage',      'string',   '—',      'Help text (requires showHelpMessage = true)'],
  ['showErrorMessage', 'boolean',  'false',  'Applies error styling and renders the error message'],
  ['errorMessage',     'string',   '—',      'Error text (requires showErrorMessage = true)'],
  ['rows',             'number',   '5',      'Number of visible text rows'],
  ['id',               'string',   'auto',   'id on the textarea element (auto-generated if omitted)'],
  ['name',             'string',   '—',      'name attribute on the textarea element'],
  ['className',        'string',   '—',      'Additional class on the root wrapper'],
];

// ─── Page ───────────────────────────────────────────────────────────────────
export function TextareaPage() {
  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Textarea</h1>
        <p className="doc-desc">
          A multi-line text field for collecting longer user input. Supports help and error messages,
          a secondary label, disabled state, and accessible focus management.
        </p>
      </div>

      <div className="doc-divider" />

      {/* Import */}
      <div className="doc-section">
        <h2 className="doc-section-title">Import</h2>
        <CodeBlock title="Import" code={snippets.import} />
      </div>

      {/* Interactive Demo */}
      <div className="doc-section">
        <h2 className="doc-section-title">Interactive Demo</h2>
        <div style={{
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '32px 24px',
          background: 'var(--bg)',
        }}>
          <InteractiveDemo />
        </div>
      </div>

      {/* Basic Usage */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <CodeBlock title="Basic" code={snippets.basic} />
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <DemoCell label="Default">
            <Textarea label="Description" placeholder="Enter a description…" />
          </DemoCell>
          <DemoCell label="With secondary label">
            <Textarea label="Bio" secondaryLabel="Optional" placeholder="Tell us about yourself…" />
          </DemoCell>
        </div>
      </div>

      {/* Messages */}
      <div className="doc-section">
        <h2 className="doc-section-title">Help &amp; Error Messages</h2>
        <p className="doc-body-text">
          Help and error messages are independent — both can appear simultaneously.
          Order is always: help first, then error.
        </p>
        <CodeBlock title="Messages" code={snippets.messages} />
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <DemoCell label="Help message">
            <Textarea
              label="Comments"
              placeholder="Add your comments…"
              showHelpMessage
              helpMessage="Be as detailed as possible."
            />
          </DemoCell>
          <DemoCell label="Error message">
            <Textarea
              label="Description"
              defaultValue="Too short"
              showErrorMessage
              errorMessage="Description is too short."
            />
          </DemoCell>
          <DemoCell label="Help + Error">
            <Textarea
              label="Description"
              defaultValue="Too short"
              showHelpMessage
              helpMessage="Use at least 50 characters."
              showErrorMessage
              errorMessage="Description is too short."
            />
          </DemoCell>
        </div>
      </div>

      {/* States */}
      <div className="doc-section">
        <h2 className="doc-section-title">States</h2>
        <CodeBlock title="States" code={snippets.states} />
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <DemoCell label="Default (empty)">
            <Textarea label="Label" secondaryLabel="2nd label" placeholder="Placeholder" />
          </DemoCell>
          <DemoCell label="Filled">
            <Textarea label="Label" secondaryLabel="2nd label" defaultValue="Content" />
          </DemoCell>
          <DemoCell label="Error">
            <Textarea
              label="Label"
              secondaryLabel="2nd label"
              defaultValue="Content"
              showErrorMessage
              errorMessage="Error Message"
            />
          </DemoCell>
          <DemoCell label="Disabled">
            <Textarea label="Label" secondaryLabel="2nd label" defaultValue="Content" disabled />
          </DemoCell>
        </div>
      </div>

      {/* Controlled */}
      <div className="doc-section">
        <h2 className="doc-section-title">Controlled Usage</h2>
        <CodeBlock title="Controlled" code={snippets.controlled} />
      </div>

      {/* Props reference */}
      <div className="doc-section">
        <h2 className="doc-section-title">Props</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th className="doc-th">Prop</th>
                <th className="doc-th">Type</th>
                <th className="doc-th">Default</th>
                <th className="doc-th">Description</th>
              </tr>
            </thead>
            <tbody>
              {propRows.map(([prop, type, def, desc], i) => (
                <tr key={prop} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                  <td className="doc-td"><code>{prop}</code></td>
                  <td className="doc-td"><code>{type}</code></td>
                  <td className="doc-td"><code>{def}</code></td>
                  <td className="doc-td">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="doc-section">
        <h2 className="doc-section-title">Accessibility &amp; Focus</h2>
        <ul style={{ paddingLeft: 20, color: 'var(--text)', lineHeight: 1.8, fontSize: 15 }}>
          <li>The <code>&lt;label&gt;</code> is programmatically linked to the textarea via <code>htmlFor</code> / <code>id</code>.</li>
          <li>Help and error messages are linked via <code>aria-describedby</code>.</li>
          <li><code>aria-invalid</code> is set to <code>true</code> when <code>showErrorMessage</code> is active.</li>
          <li>Focus ring uses <code>--sds-color-effects-focused-shadow-default</code> (blue) in normal state and <code>--sds-color-effects-focused-shadow-danger</code> (red) in error state.</li>
          <li>Disabled state applies <code>opacity: 0.4</code> and <code>pointer-events: none</code> on the root.</li>
        </ul>
      </div>

    </div>
  );
}
