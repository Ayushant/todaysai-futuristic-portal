/**
 * Performance Budget Configuration
 * 
 * This file defines performance budgets for the application.
 * These thresholds help ensure the application maintains good performance.
 */

// Core Web Vitals thresholds based on Google's recommendations
export const coreWebVitals = {
  // Largest Contentful Paint (LCP) - measures loading performance
  lcp: {
    good: 2500, // milliseconds - Good experience
    needsImprovement: 4000, // milliseconds - Needs improvement
    // Anything above 4000ms is considered poor
  },
  
  // First Input Delay (FID) - measures interactivity
  fid: {
    good: 100, // milliseconds - Good experience
    needsImprovement: 300, // milliseconds - Needs improvement
    // Anything above 300ms is considered poor
  },
  
  // Cumulative Layout Shift (CLS) - measures visual stability
  cls: {
    good: 0.1, // unitless - Good experience
    needsImprovement: 0.25, // unitless - Needs improvement
    // Anything above 0.25 is considered poor
  },
};

// Additional performance metrics thresholds
export const additionalMetrics = {
  // First Contentful Paint (FCP)
  fcp: {
    good: 1800, // milliseconds
    needsImprovement: 3000, // milliseconds
  },
  
  // Time to First Byte (TTFB)
  ttfb: {
    good: 800, // milliseconds
    needsImprovement: 1800, // milliseconds
  },
  
  // Total Blocking Time (TBT)
  tbt: {
    good: 200, // milliseconds
    needsImprovement: 600, // milliseconds
  },
};

// Resource budget thresholds
export const resourceBudget = {
  // JavaScript bundle size
  jsBundle: {
    initial: 170, // KB - Initial JavaScript load
    total: 500, // KB - Total JavaScript
  },
  
  // CSS bundle size
  cssBundle: {
    initial: 50, // KB - Initial CSS load
    total: 100, // KB - Total CSS
  },
  
  // Image sizes
  images: {
    hero: 200, // KB - Hero images
    thumbnail: 50, // KB - Thumbnail images
    total: 1000, // KB - Total images
  },
  
  // Fonts
  fonts: {
    total: 100, // KB - Total fonts
  },
  
  // Maximum number of requests
  requests: {
    initial: 20, // Number of requests on initial load
    total: 50, // Total number of requests
  },
};

// Time budget thresholds
export const timeBudget = {
  // Time to Interactive (TTI)
  tti: 3500, // milliseconds
  
  // DOMContentLoaded event
  domContentLoaded: 2000, // milliseconds
  
  // Window load event
  windowLoad: 5000, // milliseconds
};

/**
 * Evaluates a metric against its threshold
 * @param metric - The metric name
 * @param value - The metric value
 * @param thresholds - The thresholds object
 * @returns The performance rating: 'good', 'needs-improvement', or 'poor'
 */
export const evaluateMetric = (
  metric: string,
  value: number,
  thresholds: Record<string, { good: number; needsImprovement: number }>
): 'good' | 'needs-improvement' | 'poor' => {
  if (!thresholds[metric]) {
    return 'good'; // Default if threshold not defined
  }
  
  const { good, needsImprovement } = thresholds[metric];
  
  if (value <= good) {
    return 'good';
  } else if (value <= needsImprovement) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
};