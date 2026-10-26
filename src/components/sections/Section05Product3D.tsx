import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { FLAGSHIP_PRODUCT } from '../../data/products';
import { VcoBottleModel } from '../3d/VcoBottleModel';
import { SceneLighting } from '../3d/SceneLighting';
import { FallbackPoster } from '../3d/FallbackPoster';
import { HotspotPin } from '../ui/HotspotPin';
import { Button } from '../ui/Button';
import { RotateCcw, Play, Pause, ShoppingBag } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const Section05Product3D: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [selectedVariant, setSelectedVariant] = useState(FLAGSHIP_PRODUCT.variants?.[0] || {
    id: 'vco-250',
    volume: '250 ml',
    pricePlaceholder: 'Rp 85.000 (Placeholder)',
    scale: 1.0,
  });
  const [isRotating, setIsRotating] = useState(false);

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section
      id="studio-3d"
      className="relative min-h-screen py-24 px-6 md:px-12 bg-coconut-dark text-coconut-cream overflow-hidden flex flex-col justify-between"
    >
      {/* Studio Radial Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-coconut-green/40 via-coconut-dark to-coconut-dark pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coconut-lime/10 border border-coconut-lime/20 text-coconut-lime text-xs font-semibold uppercase tracking-widest mb-3">
            STUDIO INSPEKSI 3D
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-coconut-cream tracking-tight">
            {FLAGSHIP_PRODUCT.name}
          </h2>
          <p className="text-sm text-coconut-cream/70 mt-2 max-w-lg font-light">
            Eksplorasi kemasan botol kaca apothecary dan detail kualitas minyak kelapa murni dari berbagai sudut.
          </p>
        </div>

        {/* Variant Volume Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-coconut-green/60 p-2 rounded-2xl border border-coconut-cream/15 backdrop-blur-md">
          <span className="text-xs text-coconut-cream/70 px-2 font-medium">Ukuran Kemasan:</span>
          <div className="flex gap-2">
            {FLAGSHIP_PRODUCT.variants?.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                aria-pressed={selectedVariant.id === v.id}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedVariant.id === v.id
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
        {!prefersReduced ? (
          <Canvas
            camera={{ position: [0, 0.8, 3.8], fov: 42 }}
            dpr={[1, 2]}
            shadows
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <SceneLighting />
            <Suspense fallback={null}>
              <VcoBottleModel scale={selectedVariant.scale} autoRotate={isRotating} />
            </Suspense>
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              minDistance={2.5}
              maxDistance={6.0}
              enablePan={false}
              dampingFactor={0.05}
              rotateSpeed={0.8}
            />
          </Canvas>
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
            title="Reset Sudut Pandang"
          >
            <RotateCcw size={13} />
            <span>Reset Sudut</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-coconut-dark/80 hover:bg-coconut-dark text-coconut-cream/80 hover:text-white border border-coconut-cream/15 backdrop-blur-md text-xs font-medium transition-colors"
            title={isRotating ? 'Hentikan Putaran' : 'Putar Otomatis'}
          >
            {isRotating ? <Pause size={13} /> : <Play size={13} />}
            <span>{isRotating ? 'Jeda' : 'Putar 360°'}</span>
          </button>
        </div>

        {/* Price & Current Spec Badge */}
        <div className="absolute top-6 right-6 z-20 text-right">
          <div className="text-xs uppercase tracking-wider text-coconut-lime font-mono">
            Varian Terpilih: {selectedVariant.volume}
          </div>
          <div className="text-xl font-display font-bold text-coconut-cream">
            {selectedVariant.pricePlaceholder}
          </div>
        </div>
      </div>

      {/* 3 Hotspot Pins Info Strip */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-8">
        <div className="text-xs uppercase tracking-wider text-coconut-cream/60 mb-3 font-semibold">
          Titik Inspeksi Kualitas & Keberlanjutan:
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {FLAGSHIP_PRODUCT.hotspots?.map((hotspot, idx) => (
            <HotspotPin key={hotspot.id} hotspot={hotspot} index={idx} />
          ))}
        </div>
      </div>

      {/* Bottom Order CTA */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-8 pt-6 border-t border-coconut-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-coconut-cream/60 text-center sm:text-left">
          <span>Tersedia untuk pengiriman ke seluruh Indonesia dengan garansi kemurnian.</span>
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
          <span>Pesan Botol Ini ({selectedVariant.volume})</span>
        </Button>
      </div>
    </section>
  );
};
