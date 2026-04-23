import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/theme.css";
import { ToastProvider } from "./providers/ToastProvider";





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
    
  </StrictMode>,
  
)
