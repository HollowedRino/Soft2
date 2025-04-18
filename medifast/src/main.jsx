import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MedifastApp } from './MedifastApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MedifastApp />
  </StrictMode>,
)
