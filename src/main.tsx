import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tokens/primitives.css'
import './tokens/semantics.css'
import './tokens/typography.css'
import './global.css'
import { App } from './App'
import { PrototypeStoreProvider } from './data/PrototypeStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrototypeStoreProvider>
      <App />
    </PrototypeStoreProvider>
  </StrictMode>,
)
