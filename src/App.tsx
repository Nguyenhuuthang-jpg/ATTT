import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Navbar from './ui/components/Navbar'
import Home from './ui/pages/Home'
import CaesarLab from './ui/pages/CaesarLab'
import BruteForce from './ui/pages/BruteForce'
import Substitution from './ui/pages/Substitution'
import Frequency from './ui/pages/Frequency'
import KeySpace from './ui/pages/KeySpace'

/** Các bước demo theo thứ tự slide */
const DEMO_ROUTES = ['/caesar', '/bruteforce', '/substitution', '/frequency', '/keyspace']
const DEMO_LABELS = ['Caesar (Slide 3)', 'Vét cạn (Slide 4)', 'Thay thế (Slide 5)', 'Tần suất (Slide 6)', 'Bài học (Slide 9)']

function App() {
  const [demoMode, setDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(0)

  /** Bật / tắt chế độ demo */
  const toggleDemo = useCallback(() => {
    setDemoMode(prev => !prev)
    setDemoStep(0)
  }, [])

  /** Xử lý phím mũi tên trong chế độ demo */
  useEffect(() => {
    if (!demoMode) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setDemoStep(prev => Math.min(prev + 1, DEMO_ROUTES.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setDemoStep(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Escape') {
        setDemoMode(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [demoMode])

  /** Điều hướng khi đổi bước demo */
  useEffect(() => {
    if (demoMode) {
      window.location.hash = DEMO_ROUTES[demoStep]
    }
  }, [demoMode, demoStep])

  return (
    <div className={`app-layout${demoMode ? ' demo-mode' : ''}`}>
      <Navbar onDemoToggle={toggleDemo} isDemoMode={demoMode} />
      
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caesar" element={<CaesarLab demoMode={demoMode} />} />
          <Route path="/bruteforce" element={<BruteForce demoMode={demoMode} />} />
          <Route path="/substitution" element={<Substitution demoMode={demoMode} />} />
          <Route path="/frequency" element={<Frequency demoMode={demoMode} />} />
          <Route path="/keyspace" element={<KeySpace />} />
        </Routes>
      </main>

      {/* Điều khiển demo */}
      {demoMode && (
        <>
          <div className="demo-step-indicator" role="navigation" aria-label="Bước demo">
            {DEMO_ROUTES.map((_, i) => (
              <button
                key={i}
                className={`demo-step-dot${i === demoStep ? ' active' : ''}`}
                onClick={() => setDemoStep(i)}
                aria-label={DEMO_LABELS[i]}
                title={DEMO_LABELS[i]}
              />
            ))}
          </div>
          <div className="demo-nav" role="navigation" aria-label="Điều hướng demo">
            <button
              className="demo-nav-btn"
              onClick={() => setDemoStep(prev => Math.max(prev - 1, 0))}
              disabled={demoStep === 0}
              aria-label="Bước trước"
            >
              ◀
            </button>
            <button
              className="demo-nav-btn"
              onClick={() => setDemoStep(prev => Math.min(prev + 1, DEMO_ROUTES.length - 1))}
              disabled={demoStep === DEMO_ROUTES.length - 1}
              aria-label="Bước sau"
            >
              ▶
            </button>
            <button
              className="demo-nav-btn"
              onClick={toggleDemo}
              aria-label="Thoát demo"
              title="Thoát demo (Esc)"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
