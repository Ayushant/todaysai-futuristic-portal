import React, { useEffect } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

interface PerformanceMonitorProps {
  onMetricsCollected?: (metrics: any) => void;
}

/**
 * Performance monitoring component that collects and optionally reports metrics
 * This is a "hidden" component that doesn't render anything visible
 */
const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ onMetricsCollected }) => {
  const metrics = usePerformanceMonitor();

  useEffect(() => {
    // When metrics change and we have meaningful values, call the callback
    if (onMetricsCollected && metrics.lcp !== null) {
      onMetricsCollected(metrics);
      
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.group('Performance Metrics:');
        console.log('LCP:', metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'Not available');
        console.log('FID:', metrics.fid ? `${Math.round(metrics.fid)}ms` : 'Not available');
        console.log('CLS:', metrics.cls !== null ? metrics.cls.toFixed(3) : 'Not available');
        console.log('TTFB:', metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'Not available');
        console.log('Resources:', `${metrics.resourceCount} (${(metrics.resourceSize / 1024 / 1024).toFixed(2)}MB)`);
        console.groupEnd();
      }
    }
  }, [metrics, onMetricsCollected]);

  // This component doesn't render anything visible
  return null;
};

export default PerformanceMonitor;
