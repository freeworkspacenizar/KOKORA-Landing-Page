import React, { useState } from 'react';
import { ProductHotspot } from '../../data/products';
import { Sparkles, X } from 'lucide-react';

interface HotspotPinProps {
  hotspot: ProductHotspot;
  index: number;
}

export const HotspotPin: React.FC<HotspotPinProps> = ({ hotspot, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 p-2 rounded-full bg-coconut-dark/80 hover:bg-coconut-lime hover:text-coconut-dark border border-coconut-lime/60 backdrop-blur-md transition-all duration-300 shadow-lg text-coconut-cream focus:outline-none focus:ring-2 focus:ring-coconut-lime"
        aria-expanded={open}
        aria-label={`Hotspot ${index + 1}: ${hotspot.title}`}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coconut-lime opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-coconut-lime" />
        </span>
        <span className="text-xs font-semibold tracking-wide pr-1">
          {hotspot.title}
        </span>
      </button>

      {/* Expanded Tooltip / Detail Card */}
      {open && (
        <div className="absolute bottom-full left-0 mb-3 w-72 p-4 rounded-2xl bg-coconut-dark/95 border border-coconut-lime/40 backdrop-blur-xl shadow-2xl z-30 animate-fadeIn text-coconut-cream">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-coconut-lime text-xs font-semibold">
              <Sparkles size={12} />
              <span>Detail Spesifikasi</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-coconut-cream/60 hover:text-white"
              aria-label="Tutup Detail"
            >
              <X size={14} />
            </button>
          </div>
          <h4 className="font-display text-sm font-bold text-coconut-cream mb-1">
            {hotspot.title}
          </h4>
          <p className="text-xs text-coconut-cream/80 font-light leading-relaxed">
            {hotspot.description}
          </p>
        </div>
      )}
    </div>
  );
};
