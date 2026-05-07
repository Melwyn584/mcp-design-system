import { Routes, Route, Navigate } from 'react-router-dom'
import { DocsApp }  from './doc-pages/DocsApp'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <Routes>
      {/* Main application */}
      <Route path="/" element={<HomePage />} />

      {/* Design system documentation — all sub-routes handled inside DocsApp */}
      <Route path="/docs/*" element={<DocsApp />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
