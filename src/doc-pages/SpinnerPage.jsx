import { useState } from 'react';
import { Spinner } from '../components/Spinner/Spinner';

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

// ─── Playground helpers ───────────────────────────────────────────────────
function ControlGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', opacity: 0.5, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
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

const SIZES = [
  { key: 'xxl', label: 'XX-Large', px: 40 },
  { key: 'xl', label: 'X-Large', px: 32 },
  { key: 'lg', label: 'Large', px: 24 },
  { key: 'md', label: 'Medium', px: 16 },
  { key: 'sm', label: 'Small', px: 12 },
];

// ─── Size Grid ─────────────────────────────────────────────────────────────
function SizeGrid() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-end', justifyContent: 'center', padding: '40px 24px' }}>
      {SIZES.map(s => (
        <div key={s.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Spinner size={s.key} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-h)' }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text)', opacity: 0.6, fontFamily: 'var(--font-family-mono,monospace)' }}>
              {s.key} · {s.px}px
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Interactive Demo ──────────────────────────────────────────────────────
function InteractiveDemo() {
  const [size, setSize] = useState('md');
  const code = `<Spinner size="${size}" />`;

  return (
    <div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 28,
        padding: '20px 24px', marginBottom: 16,
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
      }}>
        <ControlGroup label="Size">
          {SIZES.map(s => (
            <Seg key={s.key} active={size === s.key} onClick={() => setSize(s.key)}>
              {s.label}
            </Seg>
          ))}
        </ControlGroup>
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
        padding: '64px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16,
      }}>
        <Spinner size={size} />
      </div>

      <CodeBlock title="JSX — current configuration" code={code} />
    </div>
  );
}

// ─── Snippets ──────────────────────────────────────────────────────────────
const snippets = {
  import: `import { Spinner } from '@mcp/design-system';`,

  basic: `// Default — medium
<Spinner />

// Explicit size
<Spinner size="lg" />`,

  inContext: `// Centered in a loading region
<div style={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
  <Spinner size="xl" />
</div>

// Inline beside text
<p>
  <Spinner size="sm" /> Saving changes…
</p>`,

  a11y: `// Renders role="status" with aria-live="polite".
// Provide a meaningful label for screen readers:
<Spinner label="Loading results" />`,
};

// ─── Page ──────────────────────────────────────────────────────────────────
export function SpinnerPage() {
  return (
    <div style={{ maxWidth: 960 }}>

      {/* Header */}
      <div className="doc-header">
        <span className="doc-eyebrow">Components</span>
        <h1 className="doc-title">Spinner</h1>
        <p className="doc-desc">
          Spinner is a loading indicator used to communicate that a process is in progress
          and the system is working. It indicates <strong>activity, not progress</strong> —
          it never shows a completion percentage and is not interactive.
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

      {/* ── Sizes ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Sizes</h2>
        <p className="doc-body-text">
          Five proportional sizes. The stroke thickness scales with the diameter; the rotation
          speed stays the same across every size.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <SizeGrid />
        </div>
      </div>

      {/* ── Basic Usage ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Basic Usage</h2>
        <p className="doc-body-text">Defaults to <code className="token-pill">md</code>. Pass <code className="token-pill">size</code> to scale it.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '32px 24px', display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Spinner />
          <Spinner size="lg" />
        </div>
        <CodeBlock title="JSX — basic usage" code={snippets.basic} />
      </div>

      {/* ── In Context ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">In Context</h2>
        <p className="doc-body-text">Center it in a loading region, or place it inline beside short status text.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 16 }}>
          <div style={{ display: 'grid', placeItems: 'center', minHeight: 160, border: '1px dashed var(--border)', borderRadius: 8 }}>
            <Spinner size="xl" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-h)', fontFamily: 'var(--font-family-text)', fontWeight: 600 }}>
            <Spinner size="sm" /> Saving changes…
          </div>
        </div>
        <CodeBlock title="JSX — in context" code={snippets.inContext} />
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
                ['size',      '"xxl" | "xl" | "lg" | "md" | "sm"', '"md"',      'Diameter (40 / 32 / 24 / 16 / 12px); stroke scales with it'],
                ['label',     'string',                            '"Loading"', 'Accessible name announced by screen readers'],
                ['className', 'string',                            '—',         'Extra class applied to the wrapper'],
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

      {/* ── Accessibility ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Accessibility</h2>
        <div className="info-box" style={{ marginBottom: 16 }}>
          The spinner renders <strong>role="status"</strong> with <strong>aria-live="polite"</strong> and an
          <strong> aria-label</strong>. It conveys activity, not a value — there is no
          <code style={{ background: 'transparent', border: 'none', padding: 0, color: 'inherit', fontWeight: 700 }}> aria-valuenow</code>.
          Always pass a meaningful <strong>label</strong> describing what is loading.
        </div>
        <CodeBlock title="JSX — accessible label" code={snippets.a11y} />
      </div>

      {/* ── Rules for AI ── */}
      <div className="doc-section">
        <h2 className="doc-section-title">Rules for AI (MCP)</h2>
        <div className="rule-list">
          {[
            'Spinner indicates activity, not progress — never show a completion percentage.',
            'Rotation is continuous, infinite, and linear — never a non-rotating animation.',
            'Rotation speed is identical across all sizes — do not change speed per size.',
            'Always square (1:1), center aligned, no internal padding, must not stretch.',
            'Stroke thickness scales proportionally with the size.',
            'Never add text inside the spinner, and never add shadows or glow.',
            'The spinner is not interactive — do not attach actions to it.',
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
            'Adding text inside the spinner',
            'Using a non-rotating animation',
            'Changing the rotation speed per size',
            'Adding shadows or glow effects',
            'Making it interactive or treating it like a button',
            'Using it to represent determinate progress',
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
