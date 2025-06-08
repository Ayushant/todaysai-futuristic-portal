import React, { useRef, useEffect } from 'react';
import { PerformanceMetrics } from '@/hooks/usePerformanceMonitor';

// Store metrics globally
const metrics: Record<string, PerformanceMetrics> = {};

export function withPerformanceTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return function WithPerformanceTracking(props: P) {
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

    return <WrappedComponent {...props} />;
  };
} 