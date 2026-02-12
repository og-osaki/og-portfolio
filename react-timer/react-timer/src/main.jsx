import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* reactと導入先htmlで同じidとしてある */
createRoot(document.getElementById('react-timer')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)