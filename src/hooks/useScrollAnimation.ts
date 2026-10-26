import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (context: { el: T; gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void | (() => void),
  dependencies: React.DependencyList = []
) {
  const containerRef = useRef<T>(null);
  const prefersReduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        animationCallback({
          el: containerRef.current,
          gsap,
          ScrollTrigger,
        });
      }
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced, ...dependencies]);

  return containerRef;
}
