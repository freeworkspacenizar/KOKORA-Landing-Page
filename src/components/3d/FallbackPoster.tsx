import React from 'react';

interface FallbackPosterProps {
  title?: string;
  className?: string;
}

export const FallbackPoster: React.FC<FallbackPosterProps> = ({
  title = 'Kelapa Alami Toko Kelapa',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-coconut-dark/80 via-coconut-green/90 to-coconut-dark text-coconut-cream rounded-2xl overflow-hidden border border-coconut-husk/20 ${className}`}
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Decorative concentric organic coconut silhouette */}
        <div className="absolute inset-0 rounded-full bg-coconut-husk/20 blur-2xl transform scale-110" />
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl"
          role="img"
          aria-label={title}
        >
          <defs>
            <radialGradient id="huskGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#8C4E2D" />
              <stop offset="60%" stopColor="#5C341E" />
              <stop offset="100%" stopColor="#2A180E" />
            </radialGradient>
            <radialGradient id="shellGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#4A2818" />
              <stop offset="70%" stopColor="#2D1910" />
              <stop offset="100%" stopColor="#140B07" />
            </radialGradient>
            <radialGradient id="meatGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#F5F0E5" />
              <stop offset="100%" stopColor="#D9D0C1" />
            </radialGradient>
            <radialGradient id="waterGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#E3F8FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#AEE2FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#68B9E8" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* Coconut Outer Husk */}
          <circle cx="100" cy="100" r="88" fill="url(#huskGrad)" />
          {/* Surface fiber striations */}
          <path
            d="M 60 25 Q 100 15 140 25 M 35 60 Q 100 50 165 60 M 20 100 Q 100 95 180 100 M 35 140 Q 100 150 165 140 M 60 175 Q 100 185 140 175"
            stroke="#A75B3B"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
          {/* Hard Shell Cutaway */}
          <circle cx="100" cy="100" r="70" fill="url(#shellGrad)" />
          {/* White Flesh Meat */}
          <circle cx="100" cy="100" r="62" fill="url(#meatGrad)" />
          {/* Coconut Water Liquid Center */}
          <circle cx="100" cy="100" r="42" fill="url(#waterGrad)" />

          {/* Three Eyes / Germination pores */}
          <circle cx="85" cy="80" r="4" fill="#2A180E" opacity="0.7" />
          <circle cx="115" cy="80" r="4" fill="#2A180E" opacity="0.7" />
          <circle cx="100" cy="65" r="5" fill="#2A180E" opacity="0.7" />
        </svg>
      </div>

      <div className="mt-4 text-center z-10">
        <span className="text-xs uppercase tracking-widest text-coconut-lime/90 font-medium">
          Toko Kelapa Visual Signature
        </span>
        <p className="text-sm text-coconut-cream/70 mt-1 max-w-xs">
          Anatomi kelapa alami murni nusantara: sabut, batok, daging, dan air segar.
        </p>
      </div>
    </div>
  );
};
