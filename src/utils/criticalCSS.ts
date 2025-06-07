/**
 * Critical CSS Utility
 * 
 * This utility helps manage critical CSS for improved page load performance.
 * Critical CSS is the minimal CSS needed to render the above-the-fold content.
 * 
 * Usage:
 * 1. Extract critical CSS for key components (Hero, Navbar)
 * 2. Inline this CSS in the head of the document
 * 3. Load the rest of the CSS asynchronously
 */

// Critical styles for the initial viewport (above the fold)
const criticalStyles = `
  /* Base styles */
  body {
    margin: 0;
    padding: 0;
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Inter', sans-serif;
  }

  /* Critical Navbar styles */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
  }

  /* Critical Hero styles */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Prevent content shifting */
  .logo-container {
    width: 400px;
    height: 400px;
    position: relative;
  }

  /* Prevent layout shifts for images */
  img {
    max-width: 100%;
    height: auto;
  }
`;

/**
 * Injects critical CSS into the document head
 * Call this function as early as possible in the application lifecycle
 */
export const injectCriticalCSS = (): void => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.setAttribute('data-critical', 'true');
    style.innerHTML = criticalStyles;
    document.head.appendChild(style);
  }
};

/**
 * Loads the main stylesheet asynchronously
 * @param href - Path to the main stylesheet
 */
export const loadMainStylesheetAsync = (href: string): void => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-async-css', 'true');
    
    // Add onload handler to remove critical CSS when main CSS is loaded
    link.onload = () => {
      const criticalStyle = document.querySelector('style[data-critical="true"]');
      if (criticalStyle && criticalStyle.parentNode) {
        criticalStyle.parentNode.removeChild(criticalStyle);
      }
    };
    
    document.head.appendChild(link);
  }
};

/**
 * Preloads key stylesheets with high priority
 * @param hrefs - Array of stylesheet URLs to preload
 */
export const preloadCriticalAssets = (hrefs: string[]): void => {
  if (typeof document !== 'undefined') {
    hrefs.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = href.endsWith('.css') ? 'style' : 'font';
      link.href = href;
      document.head.appendChild(link);
    });
  }
};