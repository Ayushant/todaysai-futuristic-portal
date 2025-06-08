import { useCallback, useRef, useEffect } from 'react';

type CallbackFunction<T extends (...args: any[]) => any> = T;

interface UseOptimizedCallbackOptions {
  maxCalls?: number;
  debounceMs?: number;
  throttleMs?: number;
}

export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[],
  options: UseOptimizedCallbackOptions = {}
): CallbackFunction<T> {
  const { maxCalls, debounceMs, throttleMs } = options;
  const callCount = useRef(0);
  const lastCallTime = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Reset call count when dependencies change
  useEffect(() => {
    callCount.current = 0;
  }, deps);

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    // Check max calls limit
    if (maxCalls && callCount.current >= maxCalls) {
      console.warn(`Callback exceeded maximum call limit of ${maxCalls}`);
      return;
    }

    // Handle debouncing
    if (debounceMs) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        callCount.current++;
      }, debounceMs);
      return;
    }

    // Handle throttling
    if (throttleMs) {
      if (now - lastCallTime.current < throttleMs) {
        return;
      }
      lastCallTime.current = now;
    }

    // Execute callback
    callback(...args);
    callCount.current++;
  }, deps) as CallbackFunction<T>;
}

// Utility function to create a memoized component with performance monitoring
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  const MemoizedComponent = React.memo(Component, (prevProps, nextProps) => {
    // Custom comparison function for props
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  });

  return function PerformanceMonitoredComponent(props: P) {
    const renderCount = useRef(0);
    const startTime = useRef(performance.now());

    useEffect(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;
      renderCount.current++;

      if (renderTime > 16) { // More than one frame (16.67ms)
        console.warn(
          `Slow render detected in ${componentName}:`,
          `${renderTime.toFixed(2)}ms (render #${renderCount.current})`
        );
      }

      startTime.current = performance.now();
    });

    return <MemoizedComponent {...props} />;
  };
} 