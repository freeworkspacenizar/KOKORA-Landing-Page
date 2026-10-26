import { useState, useEffect, RefObject } from 'react';

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = { threshold: 0.05 }
): boolean {
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
}
