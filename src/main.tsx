import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { injectPerformanceScript } from './utils/injectInlineScript.ts'

// Inject critical performance optimizations as early as possible
injectPerformanceScript();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
