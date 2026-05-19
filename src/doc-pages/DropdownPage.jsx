import { useState } from 'react';
import { Dropdown } from '../components/Dropdown/Dropdown';

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

const DEMO_OPTIONS = [
  'Apple',
  'Banana',
  'Cherry',
  'Durian',
  'Elderberry',
  'Fig',
  'Grape',
];

const COUNTRY_OPTIONS = [
  { value: 'us',  label: 'United States' },
  { value: 'gb',  label: 'United Kingdom' },
  { value: 'ca',  label: 'Canada' },
  { value: 'au',  label: 'Australia' },
  { value: 'de',  label: 'Germany' },
  { value: 'fr',  label: 'France' },
];

// ─── Code snippets ─────────────────────────────────────────────────────────
const snippets = {
  import: `import { Dropdown } from '@mcp/design-system';`,

  basic: `// Simple string options
<Dropdown
  label="Fruit"
  placeholder="Select a fruit…"
  options={['Apple', 'Banana', 'Cherry']}
/>

// Object options with value/label pairs
<Dropdown
  label="Country"
  secondaryLabel="Required"
  placeholder="Select a country…"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'gb', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
/>`,

  controlled: `function CountryPicker() {
  const [country, setCountry] = useState('');

  return (
    <Dropdown
      label="Country"
      placeholder="Select a country…"
      options={[
        { value: 'us', label: 'United States' },
        { value: 'gb', label: 'United Kingdom' },
      ]}
      value={country}
      onChange={(val) => setCountry(val)}
    />
  );
}`,

  messages: `// Help message
<Dropdown
  label="Region"
  options={regions}
  showHelpMessage
  helpMessage="Select the region closest to you."
/>

// Error message — help and error are independent
<Dropdown
  label="Country"
  options={countries}
  showHelpMessage helpMessage="Required for shipping."
  showErrorMessage errorMessage="Please select a country."
/>`,

  states: `// Default (empty)
<Dropdown label="Label" options={options} placeholder="Placeholder" />

// With a pre-selected value
<Dropdown label="Label" options={options} defaultValue="Apple" />

// Disabled
<Dropdown label="Label" options={options} defaultValue="Apple" disabled />

// Error
<Dropdown
  label="Label"
  options={options}
  showErrorMessage
  errorMessage="Selection is required."
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
        {value && (
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--text)', opacity: 0.7 }}>
            Selected: <strong>{value}</strong>
          </p>
        )}
      </div>

      {/* Live preview */}
      <div style={{ flex: 1, minWidth: 280, maxWidth: 400 }}>
        <Dropdown
          label="Fruit"
          secondaryLabel={showSecondary ? 'Optional' : undefined}
          placeholder="Select a fruit…"
          options={DEMO_OPTIONS}
          value={value}
          onChange={setValue}
          disabled={disabled}
          showHelpMessage={showHelp}
          helpMessage="Choose your favourite fruit."
          showErrorMessage={showError}
          errorMessage="Please select a fruit."
        />
      </div>
    </div>
  );
}

// ─── Props table rows ───────────────────────────────────────────────────────
const propRows = [
  ['options',          'Array<string|{value,label}>', '[]',     'List of selectable options (strings or value/label objects)'],
  ['label',            'string',   '—',       'Label text above the trigger'],
  ['secondaryLabel',   'string',   '—',       'Right-aligned secondary label in the label row'],
  ['placeholder',      'string',   '"Select…"', 'Text shown when no option is selected'],
  ['value',            'string',   '—',       'Controlled selected value'],
  ['defaultValue',     'string',   '—',       'Uncontrolled initial selected value'],
  ['onChange',         'function', '—',       'Called with the selected value when selection changes'],
  ['disabled',         'boolean',  'false',   'Renders muted and non-interactive at 40% opacity'],
  ['showHelpMessage',  'boolean',  'false',   'Renders the help message below the trigger'],
  ['helpMessage',      'string',   '—',       'Help text (requires showHelpMessage = true)'],
  ['showErrorMessage', 'boolean',  'false',   'Applies error styling and renders the error message'],
  ['errorMessage',     'string',   '—',       'Error text (requires showErrorMessage = true)'],
  ['id',               'string',   'auto',    'id on the trigger button (auto-generated if omitted)'],
  ['name',             'string',   '—',       'Populates a hidden <input> for form submission'],
  ['className',        'string',   '—',       'Additional class on the root wrapper'],
];

// ─── Page ───────────────────────────────────────────────────────────────────
export function DropdownPage() {
  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Dropdown</h1>
        <p className="doc-desc">
          A selection component used to choose a single value from a list of options.
          Users select via an interactive menu — they do not type freely.
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
        <p className="doc-body-text">
          Pass <code>options</code> as an array of strings or <code>{'{ value, label }'}</code> objects.
        </p>
        <CodeBlock title="Basic" code={snippets.basic} />
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <DemoCell label="String options">
            <Dropdown
              label="Fruit"
              placeholder="Select a fruit…"
              options={DEMO_OPTIONS}
            />
          </DemoCell>
          <DemoCell label="Object options + secondary label">
            <Dropdown
              label="Country"
              secondaryLabel="Required"
              placeholder="Select a country…"
              options={COUNTRY_OPTIONS}
            />
          </DemoCell>
        </div>
      </div>

      {/* Controlled */}
      <div className="doc-section">
        <h2 className="doc-section-title">Controlled Usage</h2>
        <p className="doc-body-text">
          Use <code>value</code> + <code>onChange</code> to drive the selection externally.
        </p>
        <CodeBlock title="Controlled" code={snippets.controlled} />
      </div>

      {/* Messages */}
      <div className="doc-section">
        <h2 className="doc-section-title">Help &amp; Error Messages</h2>
        <p className="doc-body-text">
          Help and error messages are independent — both can appear simultaneously.
          Order is always: help first, error second.
        </p>
        <CodeBlock title="Messages" code={snippets.messages} />
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <DemoCell label="Help message">
            <Dropdown
              label="Fruit"
              placeholder="Select…"
              options={DEMO_OPTIONS}
              showHelpMessage
              helpMessage="Choose your favourite fruit."
            />
          </DemoCell>
          <DemoCell label="Error message">
            <Dropdown
              label="Fruit"
              placeholder="Select…"
              options={DEMO_OPTIONS}
              showErrorMessage
              errorMessage="Please make a selection."
            />
          </DemoCell>
          <DemoCell label="Help + Error">
            <Dropdown
              label="Fruit"
              placeholder="Select…"
              options={DEMO_OPTIONS}
              showHelpMessage
              helpMessage="Choose your favourite fruit."
              showErrorMessage
              errorMessage="Please make a selection."
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
            <Dropdown label="Label" secondaryLabel="2nd label" options={DEMO_OPTIONS} placeholder="Placeholder" />
          </DemoCell>
          <DemoCell label="With selection">
            <Dropdown label="Label" secondaryLabel="2nd label" options={DEMO_OPTIONS} defaultValue="Apple" />
          </DemoCell>
          <DemoCell label="Error">
            <Dropdown
              label="Label"
              secondaryLabel="2nd label"
              options={DEMO_OPTIONS}
              showErrorMessage
              errorMessage="Error Message"
            />
          </DemoCell>
          <DemoCell label="Disabled">
            <Dropdown label="Label" secondaryLabel="2nd label" options={DEMO_OPTIONS} defaultValue="Apple" disabled />
          </DemoCell>
        </div>
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
        <h2 className="doc-section-title">Accessibility &amp; Keyboard</h2>
        <ul style={{ paddingLeft: 20, color: 'var(--text)', lineHeight: 1.8, fontSize: 15 }}>
          <li>The trigger uses <code>role="combobox"</code> with <code>aria-haspopup="listbox"</code> and <code>aria-expanded</code>.</li>
          <li>The menu uses <code>role="listbox"</code>; each item uses <code>role="option"</code> and <code>aria-selected</code>.</li>
          <li><code>aria-describedby</code> links help and error messages to the trigger.</li>
          <li><code>aria-invalid</code> is set when <code>showErrorMessage</code> is active.</li>
          <li><strong>Enter / Space / ↓</strong> — opens the menu from the trigger.</li>
          <li><strong>↑ / ↓</strong> — moves focus through options.</li>
          <li><strong>Enter / Space</strong> — confirms the focused option.</li>
          <li><strong>Escape / Tab</strong> — closes the menu and returns focus to the trigger.</li>
          <li>Focus ring uses <code>--sds-color-effects-focused-shadow-default</code> (blue) or <code>--sds-color-effects-focused-shadow-danger</code> (red) in error state.</li>
        </ul>
      </div>

    </div>
  );
}
