import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { registerServiceWorker } from './serviceWorkerRegistration'
import './index.css'

// Register service worker
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  const reportWebVitals = (metric: any) => {
    console.log(metric)
  }

  // Load web-vitals dynamically to ensure it's available
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals)
    getFID(reportWebVitals)
    getFCP(reportWebVitals)
    getLCP(reportWebVitals)
    getTTFB(reportWebVitals)
  }).catch(error => {
    console.warn('Failed to load web-vitals:', error)
  })
}

// Create root and render app
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
