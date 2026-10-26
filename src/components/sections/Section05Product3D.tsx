import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { FLAGSHIP_PRODUCT } from '../../data/products';
import { VcoBottleModel } from '../3d/VcoBottleModel';
import { SceneLighting } from '../3d/SceneLighting';
import { FallbackPoster } from '../3d/FallbackPoster';
import { CanvasErrorBoundary } from '../3d/CanvasErrorBoundary';
import { Button } from '../ui/Button';
import { RotateCcw, Play, Pause, ShoppingBag } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '../../hooks/useWebGLAvailable';
import { useInView } from '../../hooks/useInView';
import { useLanguage } from '../../context/LanguageContext';

export const Section05Product3D: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef);
  const prefersReduced = usePrefersReducedMotion();
  const hasWebGL = useWebGLAvailable();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { t } = useLanguage();
  const [selectedVariant, setSelectedVariant] = useState(FLAGSHIP_PRODUCT.variants?.[0] || {
    id: 'vco-250',
    volume: '250 ml',
    pricePlaceholder: 'Rp 85.000 (Placeholder)',
    scale: 1.0,
  });
  const [isRotating, setIsRotating] = useState(false);

  const localizedHotspots = FLAGSHIP_PRODUCT.hotspots?.map((h) => {
    let loc = t.studio3d.hotspots[h.id];
    if (!loc) {
      if (h.id === 'cold-extract') loc = t.studio3d.hotspots.coldPressed;
      else if (h.id === 'glass-bottle') loc = t.studio3d.hotspots.amberGlass;
      else if (h.id === 'organic-purity') loc = t.studio3d.hotspots.naturalSeal;
    }
    return {
      ...h,
      title: loc?.title || h.title,
      description: loc?.description || h.description,
    };
  });

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section
      ref={containerRef}
      id="studio-3d"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-coconut-dark text-coconut-cream overflow-hidden flex flex-col justify-between"
    >
      {/* Studio Radial Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-coconut-green/40 via-coconut-dark to-coconut-dark pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coconut-lime/10 border border-coconut-lime/20 text-coconut-lime text-xs font-semibold uppercase tracking-widest mb-3">
            {t.studio3d.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-coconut-cream tracking-tight">
            {t.studio3d.heading}
          </h2>
          <p className="text-sm text-coconut-cream/70 mt-2 max-w-lg font-light">
            {t.studio3d.subheading}
          </p>
        </div>

        {/* Variant Volume Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-coconut-green/60 p-2 rounded-2xl border border-coconut-cream/15 backdrop-blur-md">
          <span className="text-xs text-coconut-cream/70 px-2 font-medium">{t.studio3d.selectVolume}:</span>
          <div className="flex gap-2">
            {FLAGSHIP_PRODUCT.variants?.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                aria-pressed={selectedVariant.id === v.id}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedVariant.id === v.id
                  ? 'bg-coconut-lime text-coconut-dark shadow-md'
                  : 'text-coconut-cream/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                {v.volume}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div className="relative z-10 w-full h-[55vh] md:h-[60vh] max-w-6xl mx-auto rounded-3xl bg-coconut-green/20 border border-coconut-cream/10 overflow-hidden shadow-2xl flex items-center justify-center">
        {hasWebGL && !prefersReduced ? (
          <CanvasErrorBoundary title={FLAGSHIP_PRODUCT.name}>
            <Canvas
              frameloop={inView ? 'always' : 'never'}
              camera={{ position: [0, 0.8, 3.8], fov: 48 }}
              dpr={[1, 2]}
              shadows
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <SceneLighting />
              <Suspense fallback={null}>
                <VcoBottleModel
                  scale={selectedVariant.scale}
                  hotspots={localizedHotspots}
                />
              </Suspense>
              <OrbitControls
                ref={controlsRef}
                enableZoom={true}
                minDistance={2.5}
                maxDistance={6.0}
                enablePan={false}
                autoRotate={isRotating}
                autoRotateSpeed={2.0}
                dampingFactor={0.05}
                rotateSpeed={0.8}
              />
            </Canvas>
          </CanvasErrorBoundary>
        ) : (
          <div className="w-80 h-80">
            <FallbackPoster title={FLAGSHIP_PRODUCT.name} />
          </div>
        )}

        {/* Studio Controls Floating Overlay */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-20">
          <button
            type="button"
            onClick={handleResetView}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-coconut-dark/80 hover:bg-coconut-dark text-coconut-cream/80 hover:text-white border border-coconut-cream/15 backdrop-blur-md text-xs font-medium transition-colors"
            title={t.studio3d.resetView}
          >
            <RotateCcw size={13} />
            <span>{t.studio3d.resetView}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-coconut-dark/80 hover:bg-coconut-dark text-coconut-cream/80 hover:text-white border border-coconut-cream/15 backdrop-blur-md text-xs font-medium transition-colors"
            title={isRotating ? t.studio3d.pauseRotate : t.studio3d.autoRotate}
          >
            {isRotating ? <Pause size={13} /> : <Play size={13} />}
            <span>{isRotating ? t.studio3d.pauseRotate : t.studio3d.autoRotate}</span>
          </button>
        </div>

        {/* Price & Current Spec Badge */}
        <div className="absolute top-6 right-6 z-20 text-right">
          <div className="text-xs uppercase tracking-wider text-coconut-lime font-mono">
            {t.studio3d.selectedVariantPrefix}: {selectedVariant.volume}
          </div>
          <div className="text-xl font-display font-bold text-coconut-cream">
            {selectedVariant.pricePlaceholder}
          </div>
        </div>
      </div>

      {/* Accessible Hotspots Summary Strip */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-8">
        <div className="text-xs uppercase tracking-wider text-coconut-cream/60 mb-3 font-semibold">
          {t.studio3d.viewDetails}:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {localizedHotspots?.map((hotspot) => (
            <div
              key={hotspot.id}
              className="p-4 rounded-2xl bg-coconut-green/30 border border-coconut-cream/10 backdrop-blur-sm"
            >
              <h4 className="font-display text-sm font-bold text-coconut-lime mb-1">
                {hotspot.title}
              </h4>
              <p className="text-xs text-coconut-cream/75 font-light leading-relaxed">
                {hotspot.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Order CTA */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-8 pt-6 border-t border-coconut-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-coconut-cream/60 text-center sm:text-left">
          <span>{t.conversion.guaranteeText}</span>
        </div>

        <Button
          asLink
          href={`${FLAGSHIP_PRODUCT.directCtaUrl}%20varian%20${selectedVariant.volume}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="md"
          className="w-full sm:w-auto"
        >
          <ShoppingBag size={16} />
          <span>{t.studio3d.orderWhatsApp} ({selectedVariant.volume})</span>
        </Button>
      </div>
    </section>
  );
};
