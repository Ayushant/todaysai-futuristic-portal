import { useEffect, useState } from 'react';

// Extend PerformanceEntry types for better TypeScript support
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  cancelable?: boolean;
}

interface PerformanceLayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// Interface for performance metrics
export interface PerformanceMetrics {
  // Core Web Vitals
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  // Additional metrics
  domLoad: number | null; // DOMContentLoaded
  windowLoad: number | null; // Window load
  resourceCount: number; // Number of resources loaded
  resourceSize: number; // Total resource size in bytes
  jsHeapSize: number | null; // JavaScript heap size
}

/**
 * Hook for monitoring performance metrics
 * @returns Current performance metrics
 */
export const usePerformanceMonitor = (): PerformanceMetrics => {
  // Initialize metrics state
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    domLoad: null,
    windowLoad: null,
    resourceCount: 0,
    resourceSize: 0,
    jsHeapSize: null
  });

  useEffect(() => {
    // Skip if not in browser or Performance API not available
    if (typeof window === 'undefined' || !window.performance) {
      return;
    }

    // Create a cached, debounced update function to prevent excessive state updates
    let updateTimeout: number | null = null;
    const debouncedUpdate = (updateFn: () => void) => {
      if (updateTimeout !== null) {
        window.clearTimeout(updateTimeout);
      }
      
      updateTimeout = window.setTimeout(updateFn, 100);
    };

    // Function to update metrics
    const updateMetrics = () => {
      // Get performance entries
      const entries = performance.getEntriesByType('navigation');
      const paintEntries = performance.getEntriesByType('paint');
      const resourceEntries = performance.getEntriesByType('resource');
      
      // Calculate resource metrics
      const resourceCount = resourceEntries.length;
      const resourceSize = resourceEntries.reduce(
        (total, entry) => total + (entry as PerformanceResourceTiming).encodedBodySize,
        0
      );
      
      // Get FCP from paint entries
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      const fcp = fcpEntry ? fcpEntry.startTime : null;
      
      // Get navigation timing metrics
      let ttfb = null;
      let domLoad = null;
      let windowLoad = null;
      
      if (entries.length > 0) {
        const navEntry = entries[0] as PerformanceNavigationTiming;
        ttfb = navEntry.responseStart - navEntry.requestStart;
        domLoad = navEntry.domContentLoadedEventEnd - navEntry.fetchStart;
        windowLoad = navEntry.loadEventEnd - navEntry.fetchStart;
      }
      
      // Get memory info if available
      let jsHeapSize = null;
      // Check for Chrome's non-standard performance.memory API
      if (performance && (performance as any).memory && (performance as any).memory.usedJSHeapSize) {
        jsHeapSize = (performance as any).memory.usedJSHeapSize;
      }
      
      setMetrics(prevMetrics => ({
        ...prevMetrics,
        fcp,
        ttfb,
        domLoad,
        windowLoad,
        resourceCount,
        resourceSize,
        jsHeapSize
      }));
    };

    // Measure LCP using PerformanceObserver
    if ('PerformanceObserver' in window) {
      // LCP Observer
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            const lcp = lastEntry.startTime;
            
            setMetrics(prevMetrics => ({
              ...prevMetrics,
              lcp
            }));
          }
        });
        
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('LCP measurement not supported', e);
      }
      
      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            const firstEntry = entries[0] as PerformanceEventTiming;
            const fid = firstEntry.processingStart - firstEntry.startTime;
            
            setMetrics(prevMetrics => ({
              ...prevMetrics,
              fid
            }));
          }
        });
        
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('FID measurement not supported', e);
      }
      
      // CLS Observer
      try {
        let clsValue = 0;
        let clsEntries: PerformanceLayoutShift[] = [];
        
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          
          entries.forEach(entry => {
            const layoutShiftEntry = entry as PerformanceLayoutShift;
            // Only count layout shifts without recent user input
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
              clsEntries.push(layoutShiftEntry);
            }
          });
          
          setMetrics(prevMetrics => ({
            ...prevMetrics,
            cls: clsValue
          }));
        });
        
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('CLS measurement not supported', e);
      }
    }

    // Initial metrics update
    updateMetrics();

    // Update metrics when window loads
    window.addEventListener('load', updateMetrics);

    // Cleanup
    return () => {
      window.removeEventListener('load', updateMetrics);
    };
  }, []);

  return metrics;
};