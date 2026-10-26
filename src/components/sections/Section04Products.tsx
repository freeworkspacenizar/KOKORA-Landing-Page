import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';

export const Section04Products: React.FC = () => {
  return (
    <section
      id="katalog"
      className="relative min-h-screen py-32 px-6 md:px-12 bg-coconut-cream text-coconut-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coconut-husk/10 border border-coconut-husk/20 text-coconut-husk text-xs font-semibold uppercase tracking-widest mb-4">
            Katalog Produk Olahan
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-coconut-dark leading-[1.08] mb-4">
            DARI KELAPA, MENJADI PILIHANMU.
          </h2>
          <p className="text-base sm:text-lg text-coconut-dark/75 font-light leading-relaxed">
            Temukan produk yang sesuai dengan kebutuhanmu. Seluruh olahan dihasilkan dengan standar mutu tinggi dan integritas bahan baku nusantara.
          </p>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
