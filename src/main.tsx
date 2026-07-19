import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tokens/primitives.css'
import './tokens/semantics.css'
import './tokens/typography.css'
import './global.css'
import { Showcase } from './Showcase'

createRoot(document.getElementById('root')!).render(
  <StrictMode><Showcase /></StrictMode>,
)
