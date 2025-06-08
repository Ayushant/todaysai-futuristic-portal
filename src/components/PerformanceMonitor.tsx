import React, { useEffect } from 'react';
import { usePerformanceMonitor, PerformanceMetrics } from '@/hooks/usePerformanceMonitor';

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
  onMetricsCollected?: (metrics: PerformanceMetrics) => void;
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
  reportEndpoint = '/api/metrics'
}) => {
  const { metrics } = usePerformanceMonitor('PerformanceMonitor');

  useEffect(() => {
    if (logToConsole) {
      console.log('Performance Metrics:', metrics);
    }

    if (reportToServer && reportEndpoint) {
      fetch(reportEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metrics),
      }).catch(error => {
        console.error('Failed to report metrics:', error);
      });
    }

    if (onMetricsCollected) {
      onMetricsCollected(metrics);
    }
  }, [metrics, logToConsole, reportToServer, reportEndpoint, onMetricsCollected]);

  return null;
};

export default PerformanceMonitor; 