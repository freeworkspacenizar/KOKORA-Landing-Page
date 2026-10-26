import React, { useEffect, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const prefersReduced = usePrefersReducedMotion();
  const [lenisInstance, setLenisInstance] = React.useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', onScroll);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [prefersReduced]);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, options);
    } else {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: prefersReduced || options?.immediate ? 'auto' : 'smooth' });
      } else if (target) {
        target.scrollIntoView({ behavior: prefersReduced || options?.immediate ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
