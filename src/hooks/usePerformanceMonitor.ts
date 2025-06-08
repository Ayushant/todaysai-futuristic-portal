import { useRef, useEffect } from 'react';

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
  componentName: string;
  mountTime: number;
  renderCount: number;
  lastRenderTime: number;
  fcp?: number | null;
  lcp?: number | null;
  fid?: number | null;
  cls?: number | null;
  ttfb?: number | null;
  domLoad?: number | null;
  windowLoad?: number | null;
  resourceCount?: number;
  resourceSize?: number;
  jsHeapSize?: number | null;
}

// Store metrics globally
const metrics: Record<string, PerformanceMetrics> = {};

// Hook for monitoring component performance
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const mountTime = useRef(performance.now());
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    // Record initial mount
    metrics[componentName] = {
      componentName,
      mountTime: mountTime.current,
      renderCount: renderCount.current,
      lastRenderTime: lastRenderTime.current
    };

    // Update metrics on each render
    renderCount.current++;
    lastRenderTime.current = performance.now();

    // Log slow components
    const renderTime = lastRenderTime.current - mountTime.current;
    if (renderTime > 100) {
      console.warn(`Slow component mount: ${componentName} (${renderTime.toFixed(2)}ms)`);
    }

    return () => {
      // Cleanup metrics when component unmounts
      const unmountTime = performance.now();
      const totalTime = unmountTime - mountTime.current;
      console.log(`Component ${componentName} lifecycle:`, {
        mountTime: mountTime.current,
        totalTime,
        renderCount: renderCount.current,
      });
      delete metrics[componentName];
    };
  }, [componentName]);

  return {
    metrics: metrics[componentName],
    renderCount: renderCount.current,
    mountTime: mountTime.current,
    lastRenderTime: lastRenderTime.current
  };
}

// Utility function to get all metrics
export function getPerformanceMetrics() {
  return Object.values(metrics);
}

// Utility function to log all metrics
export function logPerformanceMetrics() {
  console.table(
    Object.values(metrics).sort((a, b) => b.mountTime - a.mountTime)
  );
}