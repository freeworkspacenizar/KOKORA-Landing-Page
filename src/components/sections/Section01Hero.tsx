import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CoconutModel } from '../3d/CoconutModel';
import { SceneLighting } from '../3d/SceneLighting';
import { FallbackPoster } from '../3d/FallbackPoster';
import { CanvasErrorBoundary } from '../3d/CanvasErrorBoundary';
import { Button } from '../ui/Button';
import { ArrowDown, Move } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '../../hooks/useWebGLAvailable';
import { useInView } from '../../hooks/useInView';
import { useSmoothScroll } from '../ui/SmoothScrollProvider';

export const Section01Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef);
  const prefersReduced = usePrefersReducedMotion();
  const hasWebGL = useWebGLAvailable();
  const { scrollTo } = useSmoothScroll();

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollTo(target);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 bg-coconut-green text-coconut-cream overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-coconut-lime/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 3D WebGL Canvas with ErrorBoundary & inView optimization */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {hasWebGL && !prefersReduced ? (
          <CanvasErrorBoundary title="Kelapa Alami Toko Kelapa">
            <Canvas
              frameloop={inView ? 'always' : 'never'}
              camera={{ position: [0, 0, 4.6], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <SceneLighting />
              <Suspense fallback={null}>
                <CoconutModel isHero={true} explodeProgress={0} />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                dampingFactor={0.05}
                rotateSpeed={0.7}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 4}
              />
            </Canvas>
          </CanvasErrorBoundary>
        ) : (
          <div className="w-full h-full max-w-lg max-h-[500px] flex items-center justify-center p-8">
            <FallbackPoster title="Kelapa Alami Toko Kelapa" />
          </div>
        )}
      </div>

      {/* Editorial Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between pointer-events-none">
        {/* Top Eyebrow */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coconut-cream/10 border border-coconut-cream/15 text-coconut-lime text-xs font-semibold uppercase tracking-widest pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-coconut-lime animate-pulse" />
            DARI ALAM, UNTUK KESEHARIAN
          </div>
        </div>

        {/* Hero Central / Bottom Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-12">
          {/* Main Display Headline */}
          <div className="lg:col-span-8">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-[0.95] text-coconut-cream select-none drop-shadow-md">
              ALAMI.<br />
              <span className="text-coconut-lime italic font-serif">TAPI NGGAK</span> BIASA.
            </h1>
          </div>

          {/* Supporting Copy & CTAs */}
          <div className="lg:col-span-4 flex flex-col gap-6 backdrop-blur-sm bg-coconut-dark/30 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-coconut-cream/10 lg:border-none pointer-events-auto">
            <p className="text-base sm:text-lg text-coconut-cream/80 leading-relaxed font-light">
              Kenali sisi lain kelapa melalui pengalaman yang dirancang untuk menginspirasi.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asLink
                href="#katalog"
                variant="primary"
                size="md"
                onClick={(e) => handleScrollClick(e, '#katalog')}
              >
                Jelajahi Produk
              </Button>
              <Button
                asLink
                href="#manifesto"
                variant="outline"
                size="md"
                onClick={(e) => handleScrollClick(e, '#manifesto')}
              >
                Cerita Kami
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Microcopy & Interaction Indicator */}
        <div className="flex items-center justify-between pt-6 border-t border-coconut-cream/10 text-xs text-coconut-cream/60 pointer-events-auto">
          <div className="flex items-center gap-2">
            <Move size={14} className="text-coconut-lime animate-bounce" />
            <span className="tracking-wide">Geser. Putar. Jelajahi.</span>
          </div>

          <a
            href="#manifesto"
            onClick={(e) => handleScrollClick(e, '#manifesto')}
            className="flex items-center gap-2 hover:text-coconut-lime transition-colors group"
            aria-label="Gulir ke Seksi Manifesto"
          >
            <span>Gulir ke Bawah</span>
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
