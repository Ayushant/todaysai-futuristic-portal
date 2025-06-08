import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Intersection Observer hook with performance optimization
export function useOptimizedInView(options = {}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '50px',
    ...options,
  });

  return [ref, inView];
}

// Memoized value with performance tracking
export function useTrackedMemo<T>(factory: () => T, deps: any[], name: string): T {
  const startTime = useRef(performance.now());
  const value = useMemo(factory, deps);
  
  useEffect(() => {
    const endTime = performance.now();
    const computeTime = endTime - startTime.current;
    
    if (computeTime > 16) {
      console.warn(`Slow memo computation in ${name}: ${computeTime.toFixed(2)}ms`);
    }
    
    startTime.current = performance.now();
  }, [value, name]);

  return value;
}

// Optimized event handler with debounce and throttle
export function useOptimizedHandler<T extends (...args: any[]) => any>(
  handler: T,
  options: {
    debounceMs?: number;
    throttleMs?: number;
    maxCalls?: number;
  } = {}
) {
  const { debounceMs, throttleMs, maxCalls } = options;
  const callCount = useRef(0);
  const lastCallTime = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    if (maxCalls && callCount.current >= maxCalls) {
      console.warn(`Handler exceeded maximum call limit of ${maxCalls}`);
      return;
    }

    if (debounceMs) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handler(...args);
        callCount.current++;
      }, debounceMs);
      return;
    }

    if (throttleMs) {
      if (now - lastCallTime.current < throttleMs) {
        return;
      }
      lastCallTime.current = now;
    }

    handler(...args);
    callCount.current++;
  }, [handler, debounceMs, throttleMs, maxCalls]);
}

// Virtualization helper for long lists
export function useVirtualization<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan = 3
) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      style: {
        position: 'absolute',
        top: (startIndex + index) * itemHeight,
        height: itemHeight,
      },
    }));
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);

  const handleScroll = useOptimizedHandler(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    { throttleMs: 16 }
  );

  return {
    visibleItems,
    handleScroll,
    totalHeight: items.length * itemHeight,
  };
}

// Throttle function to limit how often a function can be called
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Debounce function to delay function execution
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Hook for tracking element visibility
export function useVisibilityTracking(options = {}) {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
    ...options
  });

  return { ref, inView };
}

// Utility for measuring performance
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start}ms`);
}

// Utility for checking if code is running in development
export const isDevelopment = process.env.NODE_ENV === 'development';

// Utility for checking if code is running in production
export const isProduction = process.env.NODE_ENV === 'production';

// Utility for checking if code is running in test environment
export const isTest = process.env.NODE_ENV === 'test'; 