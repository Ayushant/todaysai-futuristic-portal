import { useEffect, useState, useRef, RefObject } from 'react';

type IntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

/**
 * A React hook for efficiently tracking when elements enter or exit the viewport
 * using the Intersection Observer API.
 * 
 * @param options - IntersectionObserver options plus a 'once' flag
 * @returns A tuple with [ref, isIntersecting, entry]
 */
export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const { root = null, rootMargin = '0px', threshold = 0, once = false } = options;
  
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const elementRef = useRef<T>(null);
  const frozen = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || frozen.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
        
        // If the element has intersected and the 'once' option is true,
        // disconnect the observer after the element enters the viewport
        if (entry.isIntersecting && once) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, once]);

  return [elementRef, isIntersecting, entry];
}