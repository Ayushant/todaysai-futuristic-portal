/**
 * Early performance optimizations that run before the main app bundle loads
 * This script is inline in the HTML and runs immediately
 */

// Set up performance mark for measuring initial load time
performance.mark('app-init-start');

// Add connection hints early
function addResourceHints() {
  // Define critical domains to preconnect to
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Initialize performance monitoring
function initPerformanceMonitoring() {
  // Check if we're in development mode (simple check)
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.port === '3000';
  
  // Observe Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Log LCP for debugging in development
        if (lastEntry && isDevelopment) {
          console.log('LCP:', Math.round(lastEntry.startTime), 'ms');
        }
        
        // Send to analytics if in production
        if (lastEntry && window.gtag && !isDevelopment) {
          window.gtag('event', 'web_vitals', {
            metric_name: 'lcp',
            metric_value: Math.round(lastEntry.startTime),
            metric_delta: 0
          });
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP monitoring failed:', e);
    }
  }
}

// Run optimizations
addResourceHints();
initPerformanceMonitoring();

// Handle dark/light mode preference early to prevent flash
function setColorMode() {
  const userPreference = localStorage.getItem('color-scheme');
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
  
  const colorMode = userPreference || systemPreference;
  
  if (colorMode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

setColorMode();
