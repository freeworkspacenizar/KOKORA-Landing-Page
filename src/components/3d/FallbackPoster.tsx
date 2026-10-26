import React from 'react';

interface FallbackPosterProps {
  title?: string;
  className?: string;
}

export const FallbackPoster: React.FC<FallbackPosterProps> = ({
  title = 'Kelapa Muda Alami KOKORA',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-coconut-dark/80 via-coconut-green/90 to-coconut-dark text-coconut-cream rounded-2xl overflow-hidden border border-coconut-lime/20 ${className}`}
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Decorative ambient glow */}
        <div className="absolute inset-0 rounded-full bg-coconut-lime/15 blur-2xl transform scale-110" />

        <svg
          viewBox="0 0 240 240"
          className="w-full h-full drop-shadow-2xl"
          role="img"
          aria-label={title}
        >
          <defs>
            {/* Green Husk Gradient */}
            <radialGradient id="greenHuskGrad" cx="38%" cy="45%" r="65%">
              <stop offset="0%" stopColor="#75BE32" />
              <stop offset="55%" stopColor="#519222" />
              <stop offset="90%" stopColor="#366814" />
              <stop offset="100%" stopColor="#22450C" />
            </radialGradient>

            {/* Sliced Fibrous Rim Gradient */}
            <linearGradient id="slicedRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E9DDC6" />
              <stop offset="50%" stopColor="#F5EFE3" />
              <stop offset="100%" stopColor="#DAC7A5" />
            </linearGradient>

            {/* Coconut Water Gradient */}
            <radialGradient id="waterPoolGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#D5F6EE" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#9EE4D4" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#67C7B2" stopOpacity="0.9" />
            </radialGradient>

            {/* Ice Cube Gradient */}
            <linearGradient id="iceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4F3F8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A2DFEB" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Ice Cubes at Base */}
          <g transform="translate(30, 180) rotate(-12)">
            <rect x="0" y="0" width="34" height="34" rx="4" fill="url(#iceGrad)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="6" y1="6" x2="28" y2="28" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.5" />
          </g>
          <g transform="translate(62, 195) rotate(15)">
            <rect x="0" y="0" width="28" height="28" rx="3" fill="url(#iceGrad)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
          </g>

          {/* Main Green Young Coconut Body */}
          <path
            d="M 50 115 C 45 160 70 205 120 205 C 170 205 195 160 190 115 C 187 95 178 80 162 76 L 78 76 C 62 80 53 95 50 115 Z"
            fill="url(#greenHuskGrad)"
          />

          {/* Knife-Trimmed Fibrous Rim (Pangkasan Sabut) */}
          <ellipse cx="120" cy="76" rx="44" ry="16" fill="url(#slicedRimGrad)" />
          {/* Inner Shell Dark Border */}
          <ellipse cx="120" cy="76" rx="34" ry="12" fill="#5A3A1F" opacity="0.6" />

          {/* Soft White Coconut Meat Ring */}
          <ellipse cx="120" cy="76" rx="32" ry="11" fill="#FCFAF5" />

          {/* Glistening Coconut Water Liquid Pool */}
          <ellipse cx="120" cy="76" rx="26" ry="8.5" fill="url(#waterPoolGrad)" />

          {/* Liquid Ripple Specular Highlight */}
          <ellipse cx="114" cy="74" rx="14" ry="4" fill="#FFFFFF" opacity="0.6" />

          {/* White Flexible Straw */}
          <path
            d="M 125 76 L 134 50 Q 138 42 146 36 L 162 26"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Straw Accordion Corrugations */}
          <path d="M 133 47 L 138 46 M 135 44 L 140 43 M 138 41 L 143 39" stroke="#E2E2E2" strokeWidth="1.5" />

          {/* Trimmed Husk Cap tilted beside opening */}
          <g transform="translate(162, 64) rotate(-35)">
            <polygon points="18,0 0,22 36,22" fill="#589B27" />
            <rect x="0" y="22" width="36" height="4" fill="#E0D1B4" />
            <rect x="4" y="26" width="28" height="3" rx="1" fill="#FCFAF5" />
          </g>

          {/* Dew Water Droplets on Green Skin */}
          <circle cx="82" cy="115" r="2.5" fill="#FFFFFF" opacity="0.75" />
          <circle cx="95" cy="140" r="3" fill="#FFFFFF" opacity="0.8" />
          <circle cx="145" cy="125" r="2.2" fill="#FFFFFF" opacity="0.75" />
          <circle cx="160" cy="155" r="3.2" fill="#FFFFFF" opacity="0.85" />
          <circle cx="112" cy="170" r="2.8" fill="#FFFFFF" opacity="0.8" />
          <circle cx="70" cy="155" r="2.2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="132" cy="180" r="2" fill="#FFFFFF" opacity="0.75" />
        </svg>
      </div>

      <div className="mt-4 text-center z-10">
        <span className="text-xs uppercase tracking-widest text-coconut-lime/90 font-medium">
          KOKORA Visual Signature
        </span>
        <p className="text-sm text-coconut-cream/70 mt-1 max-w-xs">
          Kelapa muda segar nusantara: kulit hijau segar, sabut pangkasan alami, daging kelapa lembut, dan air isotonik murni.
        </p>
      </div>
    </div>
  );
};
