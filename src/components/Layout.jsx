import { Sidebar } from './Sidebar'

export function Layout({ activePage, onNavigate, children }) {
  return (
    <div style={styles.root}>
      <Sidebar active={activePage} onNavigate={onNavigate} />
      <div style={styles.main}>
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--bg)',
  },
  main: {
    flex: 1,
    overflow: 'auto',
    minWidth: 0,
  },
  content: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '48px 40px 80px',
  },
}
