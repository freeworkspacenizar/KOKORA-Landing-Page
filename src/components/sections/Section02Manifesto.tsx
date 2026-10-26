import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Sparkles, Leaf, Compass } from 'lucide-react';

export const Section02Manifesto: React.FC = () => {
  const manifestoText = "Setiap kelapa punya cerita. Kami ingin menghadirkannya dengan cara yang lebih dekat, lebih relevan, dan lebih menarik untuk keseharian.";
  const words = manifestoText.split(' ');

  const sectionRef = useScrollAnimation<HTMLElement>(({ el, gsap }) => {
    // Reveal words on scroll
    const wordElements = el.querySelectorAll('.manifesto-word');
    if (wordElements.length > 0) {
      gsap.fromTo(
        wordElements,
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'center center',
            scrub: true,
          },
        }
      );
    }

    // Parallax background floating husk fragments
    const floatingElements = el.querySelectorAll('.floating-husk');
    floatingElements.forEach((husk, i) => {
      gsap.to(husk, {
        y: (i % 2 === 0 ? -60 : 60),
        rotation: (i % 2 === 0 ? 15 : -15),
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  });

  const pillars = [
    {
      icon: <Leaf className="w-5 h-5 text-coconut-husk" />,
      title: 'Kemurnian Alami',
      desc: 'Berasal dari buah kelapa asli kepulauan nusantara tanpa rekayasa aditif.',
    },
    {
      icon: <Compass className="w-5 h-5 text-coconut-husk" />,
      title: 'Kearifan Lokal',
      desc: 'Menggabungkan tradisi pengolahan tropis dengan standar kualitas modern yang higienis.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-coconut-husk" />,
      title: 'Pemberdayaan Berkelanjutan',
      desc: 'Pemanfaatan seluruh elemen kelapa dari daging, air, hingga tempurung dengan prinsip sirkular.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-screen py-32 px-6 md:px-12 bg-coconut-cream text-coconut-dark overflow-hidden flex flex-col justify-center"
    >
      {/* Organic background abstract shapes / floating fragments */}
      <div className="absolute top-12 right-12 w-48 h-48 rounded-full bg-coconut-husk/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-8 w-72 h-72 rounded-full bg-coconut-lime/10 blur-3xl pointer-events-none" />

      {/* Decorative floating husk fragments */}
      <div className="floating-husk absolute top-24 right-1/4 w-8 h-8 rounded-full border border-coconut-husk/30 opacity-40 pointer-events-none hidden md:block" />
      <div className="floating-husk absolute bottom-32 left-1/3 w-12 h-12 rounded-full bg-coconut-husk/10 opacity-60 pointer-events-none hidden md:block" />

      <div className="max-w-6xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-coconut-husk" />
          <span className="text-xs uppercase font-semibold tracking-widest text-coconut-husk">
            Filosofi Kami
          </span>
        </div>

        {/* Large Editorial Headline */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-coconut-dark leading-[1.05] mb-12">
          LEBIH DARI SEKADAR KELAPA.
        </h2>

        {/* Word-by-word reveal supporting statement */}
        <div
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-coconut-dark/90 leading-snug tracking-tight mb-20 max-w-4xl"
          aria-label={manifestoText}
        >
          <p className="sr-only">{manifestoText}</p>
          <div aria-hidden="true" className="flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]">
            {words.map((word, index) => (
              <span
                key={index}
                className="manifesto-word inline-block transition-colors duration-200"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Brand Philosophy Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-coconut-husk/20">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 p-6 rounded-2xl bg-white/40 border border-coconut-husk/10 hover:border-coconut-husk/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-coconut-cream flex items-center justify-center border border-coconut-husk/20">
                {pillar.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-coconut-dark">
                {pillar.title}
              </h3>
              <p className="text-sm text-coconut-dark/75 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
