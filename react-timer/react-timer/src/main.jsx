import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Timer from './Timer.jsx'

createRoot(document.getElementById('react-timer')).render(
  <StrictMode>
    <Timer />
  </StrictMode>,
)