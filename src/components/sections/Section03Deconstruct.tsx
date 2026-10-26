import React, { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useInView } from '../../hooks/useInView';
import { DeconstructedCanvas } from '../3d/DeconstructedCanvas';
import { FallbackPoster } from '../3d/FallbackPoster';

interface AnatomyPart {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  positionClass: string;
  badgeColor: string;
}

export const Section03Deconstruct: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [explodeProgress, setExplodeProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('kulit-luar');

  const anatomyParts: AnatomyPart[] = [
    {
      id: 'kulit-luar',
      label: 'KULIT LUAR',
      sublabel: 'Exocarp & Mesocarp',
      description: 'Serabut pelindung tangguh kaya serat alami dan lignin untuk tekstil dan peredam ramah lingkungan.',
      positionClass: 'top-[22%] left-4 md:left-12 lg:left-20',
      badgeColor: 'border-coconut-husk text-coconut-husk',
    },
    {
      id: 'tempurung',
      label: 'TEMPURUNG',
      sublabel: 'Endocarp',
      description: 'Cangkang keras pelindung inti, bahan baku arang alami berkualitas tinggi dan kerajinan bernilai seni.',
      positionClass: 'top-[18%] right-4 md:right-12 lg:right-24',
      badgeColor: 'border-[#8C4E2D] text-[#D4895E]',
    },
    {
      id: 'daging-kelapa',
      label: 'DAGING KELAPA',
      sublabel: 'Endosperm',
      description: 'Lapisan endosperma putih kaya asam laurat untuk minyak kelapa murni (VCO) dan pangan bernutrisi.',
      positionClass: 'bottom-[22%] left-4 md:left-16 lg:left-28',
      badgeColor: 'border-coconut-cream text-coconut-cream',
    },
    {
      id: 'air-kelapa',
      label: 'AIR KELAPA',
      sublabel: 'Liquid Endosperm',
      description: 'Cairan isotonik alami kaya nutrisi dan elektrolit penyegar untuk hidrasi optimal tubuh.',
      positionClass: 'bottom-[18%] right-4 md:right-16 lg:right-24',
      badgeColor: 'border-coconut-lime text-coconut-lime',
    },
  ];

  const sectionRef = useScrollAnimation<HTMLElement>(({ el, gsap }) => {
    if (prefersReduced) return;

    // Single unified GSAP timeline attached to pinned container
    const cards = el.querySelectorAll('.anatomy-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          setExplodeProgress(self.progress);
        },
      },
    });

    // Sequence cards along the single scrubbed timeline
    cards.forEach((card, index) => {
      tl.fromTo(
        card,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25 },
        0.2 + index * 0.15
      );
    });
  });

  const inView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="dekonstruksi"
      className="relative min-h-screen w-full bg-coconut-green text-coconut-cream overflow-hidden flex flex-col justify-between py-16 px-6 md:px-12"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coconut-lime/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coconut-cream/10 border border-coconut-cream/15 text-coconut-lime text-xs font-semibold uppercase tracking-widest mb-4">
          Eksplorasi Tiga Dimensi
        </div>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-coconut-cream">
          SATU KELAPA.<br />
          <span className="text-coconut-lime">BEGITU BANYAK CERITA.</span>
        </h2>
        <p className="text-sm sm:text-base text-coconut-cream/70 mt-3 max-w-xl mx-auto font-light">
          Jelajahi lapisan, tekstur, dan karakter kelapa dalam pengalaman tiga dimensi.
        </p>
      </div>

      {/* 3D Canvas Center Stage */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
          {!prefersReduced ? (
            <DeconstructedCanvas explodeProgress={explodeProgress} inView={inView} />
          ) : (
            <div className="w-80 h-80">
              <FallbackPoster title="Dekonstruksi Kelapa Alami" />
            </div>
          )}
        </div>
      </div>

      {/* Floating Anatomical Labels (Driven cleanly by single GSAP timeline) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full h-[60vh] hidden md:block pointer-events-none">
        {anatomyParts.map((part) => (
          <div
            key={part.id}
            className={`anatomy-card absolute ${part.positionClass} max-w-xs p-5 rounded-2xl bg-coconut-dark/75 backdrop-blur-md border border-coconut-cream/15 shadow-2xl pointer-events-auto transition-transform hover:scale-105 duration-300 ${
              prefersReduced ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-display font-bold text-base tracking-wider text-coconut-cream">
                {part.label}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${part.badgeColor}`}>
                {part.sublabel}
              </span>
            </div>
            <p className="text-xs text-coconut-cream/80 leading-relaxed font-light">
              {part.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile Touch-Friendly Anatomical Cards */}
      <div className="relative z-20 md:hidden w-full mt-6 pointer-events-auto">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none snap-x">
          {anatomyParts.map((part) => (
            <div
              key={part.id}
              onClick={() => setActiveTab(part.id)}
              className={`snap-center flex-shrink-0 w-64 p-4 rounded-xl border transition-all ${
                activeTab === part.id
                  ? 'bg-coconut-dark/90 border-coconut-lime text-coconut-cream shadow-lg'
                  : 'bg-coconut-dark/50 border-coconut-cream/10 text-coconut-cream/70'
              }`}
            >
              <span className="font-display font-bold text-sm text-coconut-lime block mb-1">
                {part.label}
              </span>
              <p className="text-xs text-coconut-cream/80 leading-normal">
                {part.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-20 text-center text-xs text-coconut-cream/50 mt-4">
        <span>Gulir perlahan untuk mengurai dan merangkai kembali anatomi kelapa</span>
      </div>
    </section>
  );
};
