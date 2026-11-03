import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fontawesome-subset.css'
import './index.css'
import App from './App.jsx'
import NotFound from './NotFound.jsx'

const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    {/* 404.html marks its root (scripts/prerender.mjs); every other page is the app */}
    {root.dataset.page === '404' ? <NotFound /> : <App />}
  </StrictMode>,
)
