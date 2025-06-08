import React, { useEffect } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Extend Navigator interface for connection API
declare global {
  interface Navigator {
    connection?: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
    };
  }
}

// Interface for component props
interface PerformanceMonitorProps {
  // Optional callback function to report metrics to an analytics service
  onMetricsCollected?: (metrics: any) => void;
  // Whether to log metrics to console (useful in development)
  logToConsole?: boolean;
  // Whether to send metrics to the server
  reportToServer?: boolean;
  // API endpoint for reporting metrics
  reportEndpoint?: string;
}

/**
 * Component for monitoring and reporting performance metrics
 * This is a "headless" component (no UI) that handles performance tracking
 */
const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsCollected,
  logToConsole = false,
  reportToServer = false,
  reportEndpoint = '/api/performance-metrics'
}) => {
  // Get metrics from our custom hook
  const metrics = usePerformanceMonitor();

  // Effect to handle metrics reporting
  useEffect(() => {
    // Skip if no meaningful metrics yet
    if (!metrics.fcp) return;
    
    // Log to console if enabled
    if (logToConsole) {
      console.group('Performance Metrics');
      console.log('FCP:', metrics.fcp?.toFixed(2), 'ms');
      console.log('LCP:', metrics.lcp?.toFixed(2), 'ms');
      console.log('CLS:', metrics.cls?.toFixed(4));
      console.log('FID:', metrics.fid?.toFixed(2), 'ms');
      console.log('TTFB:', metrics.ttfb?.toFixed(2), 'ms');
      console.log('DOM Load:', metrics.domLoad?.toFixed(2), 'ms');
      console.log('Window Load:', metrics.windowLoad?.toFixed(2), 'ms');
      console.log('Resources:', metrics.resourceCount, 'files', 
        (metrics.resourceSize / (1024 * 1024)).toFixed(2), 'MB');
      if (metrics.jsHeapSize) {
        console.log('JS Heap:', (metrics.jsHeapSize / (1024 * 1024)).toFixed(2), 'MB');
      }
      console.groupEnd();
    }
    
    // Report to server if enabled
    if (reportToServer) {
      try {
        const payload = {
          metrics,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          // Add additional context like device type, connection info if available
          connection: navigator.connection 
            ? {
                effectiveType: (navigator.connection as any).effectiveType,
                downlink: (navigator.connection as any).downlink,
                rtt: (navigator.connection as any).rtt
              }
            : undefined
        };
        
        // Use sendBeacon for non-blocking metrics reporting
        if (navigator.sendBeacon) {
          navigator.sendBeacon(reportEndpoint, JSON.stringify(payload));
        } else {
          // Fallback to fetch with keepalive
          fetch(reportEndpoint, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json'
            },
            keepalive: true
          }).catch(err => {
            console.warn('Failed to report performance metrics:', err);
          });
        }
      } catch (error) {
        console.warn('Error reporting performance metrics:', error);
      }
    }
    
    // Call callback if provided
    if (onMetricsCollected) {
      onMetricsCollected(metrics);
    }
  }, [metrics, logToConsole, reportToServer, reportEndpoint, onMetricsCollected]);

  // This is a "headless" component with no UI
  return null;
};

export default PerformanceMonitor;
