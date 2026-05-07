import { useState, useMemo } from 'react'
import { PageHeader, SectionTitle } from './OverviewPage'

const iconModules = {
  line: import.meta.glob('../icons/line_icons/*.svg', { eager: true, query: '?raw', import: 'default' }),
  fill: import.meta.glob('../icons/fill_icons/*.svg', { eager: true, query: '?raw', import: 'default' }),
  flag: import.meta.glob('../icons/flag_icons/*.svg', { eager: true, query: '?raw', import: 'default' }),
}

function getIconName(path) {
  return path.split('/').pop().replace('.svg', '')
}

export function IconsPage() {
  const [style, setStyle] = useState('line')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(null)

  const icons = useMemo(() => {
    const mod = iconModules[style]
    return Object.entries(mod).map(([path, svg]) => ({
      name: getIconName(path),
      svg,
    }))
  }, [style])

  const filtered = useMemo(() => {
    if (!query.trim()) return icons
    const q = query.toLowerCase()
    return icons.filter(i => i.name.toLowerCase().includes(q))
  }, [icons, query])

  function copyName(name) {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Foundation"
        title="Icons"
        description={`${Object.keys(iconModules.line).length + Object.keys(iconModules.fill).length + Object.keys(iconModules.flag).length}+ icons in three styles. Click any icon to copy its name.`}
      />

      <div style={styles.toolbar}>
        <div style={styles.styleSwitch}>
          {['line', 'fill', 'flag'].map(s => (
            <button
              key={s}
              style={{ ...styles.switchBtn, ...(style === s ? styles.switchBtnActive : {}) }}
              onClick={() => setStyle(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <span style={styles.count}>{Object.keys(iconModules[s]).length}</span>
            </button>
          ))}
        </div>
        <input
          style={styles.search}
          type="search"
          placeholder="Search icons…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div style={styles.resultCount}>
        {filtered.length} icon{filtered.length !== 1 ? 's' : ''}
      </div>

      <div style={styles.grid}>
        {filtered.map(icon => (
          <button
            key={icon.name}
            style={{
              ...styles.iconCard,
              ...(copied === icon.name ? styles.iconCardCopied : {}),
            }}
            onClick={() => copyName(icon.name)}
            title={icon.name}
          >
            <div
              style={styles.iconSvg}
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
            <span style={styles.iconName}>{icon.name}</span>
            {copied === icon.name && <span style={styles.copiedBadge}>Copied!</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={styles.empty}>
          No icons match "<strong>{query}</strong>"
        </div>
      )}
    </div>
  )
}

const styles = {
  toolbar: {
    display: 'flex',
    gap: 12,
    marginBottom: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  styleSwitch: {
    display: 'flex',
    border: '1px solid var(--border)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  switchBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    border: 'none',
    borderRight: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text)',
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'var(--font-text)',
    cursor: 'pointer',
    transition: 'background 0.1s',
  },
  switchBtnActive: {
    background: 'var(--accent)',
    color: '#fff',
  },
  count: {
    fontSize: 10,
    opacity: 0.8,
    background: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: '1px 5px',
  },
  search: {
    flex: 1,
    maxWidth: 320,
    padding: '7px 12px',
    border: '1px solid var(--border)',
    borderRadius: 8,
    background: 'var(--surface)',
    color: 'var(--text-h)',
    fontSize: 13,
    fontFamily: 'var(--font-text)',
    outline: 'none',
  },
  resultCount: {
    fontSize: 12,
    color: 'var(--text)',
    marginBottom: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: 6,
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: '14px 8px 10px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    transition: 'border-color 0.1s, background 0.1s',
    overflow: 'hidden',
    fontFamily: 'var(--font-text)',
  },
  iconCardCopied: {
    borderColor: 'var(--accent)',
    background: 'var(--accent-bg)',
  },
  iconSvg: {
    width: 24,
    height: 24,
    color: 'var(--text-h)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconName: {
    fontSize: 10,
    color: 'var(--text)',
    textAlign: 'center',
    lineHeight: 1.3,
    wordBreak: 'break-all',
    maxWidth: '100%',
  },
  copiedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    fontSize: 9,
    fontWeight: 600,
    color: 'var(--accent)',
    background: 'var(--accent-bg)',
    border: '1px solid var(--accent-border)',
    borderRadius: 4,
    padding: '1px 4px',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 0',
    color: 'var(--text)',
    fontSize: 14,
  },
}
