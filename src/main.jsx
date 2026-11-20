import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/theme-context.jsx'
import { ToastProvider } from './context/toast-context.jsx'
import SmoothScroll from './components/common/SmoothScroll.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
