import React from 'react';
import { Product } from '../../data/products';
import { Button } from './Button';
import { Sparkles, Box, Check, MessageSquare } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { scrollTo } = useSmoothScroll();

  const handleInspectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#studio-3d');
  };

  return (
    <div
      className={`group relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-500 border ${
        product.isHero
          ? 'bg-gradient-to-b from-white via-coconut-cream/50 to-white border-coconut-lime/50 shadow-xl shadow-coconut-lime/5 md:col-span-2 lg:col-span-1'
          : 'bg-white/60 hover:bg-white border-coconut-husk/15 hover:border-coconut-husk/30 shadow-md'
      }`}
    >
      {/* Card Header & Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-coconut-husk">
            {product.category}
          </span>
          {product.badge && (
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                product.isHero
                  ? 'bg-coconut-lime text-coconut-dark'
                  : 'bg-coconut-cream text-coconut-dark border border-coconut-husk/20'
              }`}
            >
              {product.isHero && <Sparkles size={12} />}
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Visual Presentation */}
        <div className="w-full h-44 rounded-2xl bg-coconut-cream/40 flex items-center justify-center mb-6 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
          <div className="text-6xl drop-shadow-md">
            {product.id === 'vco-cold-pressed' && '🧴'}
            {product.id === 'raw-coconut-water' && '🥥'}
            {product.id === 'artisan-coconut-sugar' && '🍯'}
            {product.id === 'eco-charcoal-briquettes' && '🧱'}
          </div>
          <div className="absolute bottom-3 right-3 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/10 text-coconut-dark/70">
            {product.pricePlaceholder}
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-display text-2xl font-bold text-coconut-dark mb-1">
          {product.name}
        </h3>
        <p className="text-xs font-medium text-coconut-husk mb-3">
          {product.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-coconut-dark/75 leading-relaxed font-light mb-6">
          {product.description}
        </p>

        {/* Specifications List */}
        <ul className="space-y-2 mb-8 pt-4 border-t border-coconut-husk/10">
          {product.specs.map((spec, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-coconut-dark/80 font-light">
              <Check size={14} className="text-coconut-husk mt-0.5 flex-shrink-0" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-coconut-husk/10">
        <Button
          asLink
          href={product.directCtaUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant={product.isHero ? 'primary' : 'secondary'}
          size="sm"
          className="flex-1 justify-center"
        >
          <MessageSquare size={14} />
          <span>Pesan Langsung</span>
        </Button>

        {product.isHero && (
          <Button
            asLink
            href="#studio-3d"
            onClick={handleInspectClick}
            variant="outline"
            size="sm"
            className="border-coconut-dark/30 text-coconut-dark hover:bg-coconut-dark hover:text-white"
          >
            <Box size={14} />
            <span>Inspeksi 3D</span>
          </Button>
        )}
      </div>
    </div>
  );
};
