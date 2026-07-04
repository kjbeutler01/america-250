import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@astryxdesign/core/theme'
import { neutralTheme } from '@astryxdesign/theme-neutral/built'
import App from './App'
import './index.css'
import './styles/eras.css'

console.log(
  '%c★ Happy 250th, America. ★%c\nSigned at Philadelphia, July 4, 1776 — by 56 delegates, several visibly feathered.\nThe eagle was hiding in plain sight the whole time.\nBuilt with Astryx by Meta · fireworks and score generated in your browser.',
  'font-size:16px;font-weight:bold;color:#6054c8',
  'color:#8a86b8',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme theme={neutralTheme} mode="dark">
      <App />
    </Theme>
  </StrictMode>,
)
