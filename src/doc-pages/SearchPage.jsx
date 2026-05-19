import { useState } from 'react';
import { Search } from '../components/Search/Search';

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

// ─── State badge ───────────────────────────────────────────────────────────
function Badge({ label }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 100,
      fontSize: 11,
      fontWeight: 600,
      background: 'var(--accent-bg)',
      color: 'var(--accent)',
      border: '1px solid var(--accent-border)',
      fontFamily: 'var(--font-family-mono, monospace)',
    }}>
      {label}
    </span>
  );
}

// ─── Code snippets ─────────────────────────────────────────────────────────
const snippets = {
  import: `import { Search } from '@mcp/design-system';`,

  basic: `// Uncontrolled — search icon visible, clears internally
<Search placeholder="Search" />

// Controlled
<Search
  placeholder="Search products"
  value={query}
  onChange={e => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>`,

  callbacks: `// Handle search submission (Enter key)
<Search
  placeholder="Search"
  value={query}
  onChange={e => setQuery(e.target.value)}
  onClear={() => setQuery('')}
  onSearch={value => fetchResults(value)}
/>

// Keyboard shortcuts
// Enter → calls onSearch(currentValue)
// Escape → clears value (same as clicking ×)`,

  states: `// Empty — search icon visible, no clear button
<Search placeholder="Search" value="" />

// Has value — no search icon, clear button visible
<Search
  placeholder="Search"
  value="Comfortable Sofa"
  onChange={e => setValue(e.target.value)}
  onClear={() => setValue('')}
/>

// Disabled — 40 % opacity, non-interactive
<Search placeholder="Search" value="Query" disabled />`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Search</h1>
        <p className="doc-desc">
          Lightweight input for querying content. Unlike Text Input, Search has no
          labels, no help text, and no error states. It drives its left/right icon
          slot entirely from value presence: empty shows the search icon; any value
          shows the clear button — never both simultaneously.
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
        <p className="doc-body-text" style={{ marginBottom: 24 }}>
          Type anything to see the search icon swap to the clear button. Click{' '}
          <strong>×</strong> or press{' '}
          <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontSize: 12 }}>Esc</kbd>{' '}
          to clear. Press{' '}
          <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontSize: 12 }}>Enter</kbd>{' '}
          to search.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '48px 40px' }}>

          {/* Live demo */}
          <div style={{ maxWidth: 480, marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-h)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
              Live demo
            </div>
            <Search
              placeholder="Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onClear={() => setQuery('')}
              onSearch={v => alert(`Search: "${v}"`)}
            />
            {query && (
              <p style={{ marginTop: 12, fontSize: 13, color: 'var(--text)', opacity: 0.6 }}>
                Query: <strong>"{query}"</strong>
              </p>
            )}
          </div>

          <div className="doc-divider" style={{ margin: '0 0 48px', opacity: 0.5 }} />

          {/* All 4 Figma states */}
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-h)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 24 }}>
            All states (from Figma variant grid)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px 40px' }}>
            <DemoCell label={<>Empty · Default <Badge label="search icon" /></>}>
              <Search placeholder="Search" value="" onChange={() => {}} />
            </DemoCell>

            <DemoCell label={<>Empty · Focused <Badge label="blue ring + search icon" /></>}>
              {/* autoFocus shows the focused state in context */}
              <Search placeholder="Search" value="" onChange={() => {}} />
              <p style={{ marginTop: 8, fontSize: 12, color: 'var(--text)', opacity: 0.55 }}>
                Tab into this field to see the focus ring.
              </p>
            </DemoCell>

            <DemoCell label={<>Has Value · Default <Badge label="clear button" /></>}>
              <Search
                placeholder="Search"
                value="Comfortable Sofa"
                onChange={() => {}}
                onClear={() => {}}
              />
            </DemoCell>

            <DemoCell label={<>Has Value · Focused <Badge label="blue ring + clear button" /></>}>
              <Search
                placeholder="Search"
                value="Comfortable Sofa"
                onChange={() => {}}
                onClear={() => {}}
              />
              <p style={{ marginTop: 8, fontSize: 12, color: 'var(--text)', opacity: 0.55 }}>
                Tab into this field to see the focus ring.
              </p>
            </DemoCell>

            <DemoCell label="Disabled">
              <Search
                placeholder="Search"
                value="Comfortable Sofa"
                disabled
              />
            </DemoCell>
          </div>
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">
          Search works in both controlled and uncontrolled modes. For uncontrolled
          use, the component tracks its own value and manages the icon swap
          internally. For controlled use, pass <code className="token-pill">value</code>,{' '}
          <code className="token-pill">onChange</code>, and{' '}
          <code className="token-pill">onClear</code>.
        </p>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── Callbacks ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Callbacks &amp; Keyboard</h2>
        <p className="doc-body-text">
          <code className="token-pill">onSearch(value)</code> fires on{' '}
          <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontSize: 12 }}>Enter</kbd>.{' '}
          <kbd style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontSize: 12 }}>Escape</kbd>{' '}
          clears the value and refocuses — same effect as clicking the × button.
        </p>
        <CodeBlock title="JSX — callbacks & keyboard" code={snippets.callbacks} />
      </div>

      {/* ── Icon Logic ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Icon Swap Logic</h2>
        <div className="info-box">
          <strong>This is the core rule:</strong> the search icon and clear button are
          mutually exclusive and driven purely by value presence.
          <ul style={{ margin: '12px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>
              <code style={{ background: 'transparent', border: 'none', fontWeight: 700, padding: 0 }}>value === ""</code>{' '}
              → search icon (left), no clear button
            </li>
            <li>
              <code style={{ background: 'transparent', border: 'none', fontWeight: 700, padding: 0 }}>value !== ""</code>{' '}
              → no search icon, clear button (right)
            </li>
          </ul>
        </div>
      </div>

      {/* ── States ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">States</h2>
        <div className="doc-table-wrap" style={{ marginBottom: 16 }}>
          <table className="doc-table">
            <thead>
              <tr>{['State', 'Left slot', 'Right slot', 'Focus ring'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ['Empty · default',   'Search icon (40 % opacity)', '—',            'None'],
                ['Empty · focused',   'Search icon (40 % opacity)', '—',            'Blue ring'],
                ['Value · default',   '—',                          'Clear button', 'None'],
                ['Value · focused',   '—',                          'Clear button', 'Blue ring'],
                ['Disabled',          'Search icon (muted)',         '—',            'None'],
              ].map(([state, left, right, ring], i) => (
                <tr key={state} className={i % 2 === 0 ? 'doc-tr--even' : 'doc-tr--odd'}>
                  <td className="doc-td"><code className="token-pill">{state}</code></td>
                  <td className="doc-td" style={{ fontSize: 13 }}>{left}</td>
                  <td className="doc-td" style={{ fontSize: 13 }}>{right}</td>
                  <td className="doc-td" style={{ fontSize: 13 }}>{ring}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock title="JSX — states" code={snippets.states} />
      </div>

      {/* ── Accessibility ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Accessibility</h2>
        <div className="info-box">
          The root element has <code style={{ background: 'transparent', border: 'none', fontWeight: 700, padding: 0 }}>role="search"</code> for
          landmark navigation. The input carries <code style={{ background: 'transparent', border: 'none', fontWeight: 700, padding: 0 }}>aria-label</code>{' '}
          matching the placeholder. The clear button has{' '}
          <code style={{ background: 'transparent', border: 'none', fontWeight: 700, padding: 0 }}>aria-label="Clear search"</code> and
          is keyboard-focusable. The box uses <code style={{ background: 'transparent', border: 'none', fontWeight: 700, padding: 0 }}>:focus-within</code>{' '}
          so both the input and clear button trigger the blue focus ring.
        </div>
      </div>

      {/* ── Props ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Props Reference</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>{['Prop', 'Type', 'Default', 'Description'].map(h => <th key={h} className="doc-th">{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ['placeholder',  'string',          '"Search"', 'Placeholder text and aria-label for the input'],
                ['value',        'string',          '—',        'Controlled value — drives icon swap logic'],
                ['defaultValue', 'string',          '—',        'Uncontrolled initial value'],
                ['onChange',     'function(event)', '—',        'Native input change handler'],
                ['onClear',      'function()',       '—',        'Called after value is cleared (click × or Escape)'],
                ['onSearch',     'function(value)',  '—',        'Called when Enter is pressed'],
                ['disabled',     'boolean',         'false',    'Disables at 40 % opacity, non-interactive'],
                ['id',           'string',          'auto',     'Input id; auto-generated if omitted'],
                ['name',         'string',          '—',        'Native input name attribute'],
                ['className',    'string',          '—',        'Extra CSS class on the root element'],
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
            'Use the Search Variants grid as the ONLY source of truth.',
            'Empty input → search icon (left only). No clear button.',
            'Has value → clear button (right only). No search icon.',
            'Search icon and clear button are NEVER shown simultaneously.',
            'Clicking clear or pressing Escape clears the value and refocuses the input.',
            'No labels, no help messages, no error states — this is NOT TextInput.',
            'Disabled → 40 % opacity, non-interactive, no icon swap.',
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
            'Always showing the search icon regardless of value',
            'Showing the search icon when a value exists',
            'Showing the clear button when the input is empty',
            'Hiding the clear button when a value exists',
            'Treating this as TextInput and adding labels or error messages',
            'Never both icons at once — they are mutually exclusive',
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
