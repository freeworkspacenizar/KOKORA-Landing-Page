import React from 'react';
import { Button } from '../ui/Button';
import { useSmoothScroll } from '../ui/SmoothScrollProvider';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const Section07Conversion: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { t } = useLanguage();

  const handleCatalogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('#katalog');
  };

  return (
    <section
      id="kontak"
      className="relative py-32 px-6 md:px-12 bg-coconut-green text-coconut-cream overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-coconut-lime/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coconut-lime/10 border border-coconut-lime/25 text-coconut-lime text-xs font-semibold uppercase tracking-widest mb-6">
          {t.conversion.eyebrow}
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-coconut-cream leading-[1.05] mb-6">
          {t.conversion.headline}
        </h2>

        <p className="text-base sm:text-xl text-coconut-cream/80 max-w-2xl font-light leading-relaxed mb-10">
          {t.conversion.supporting}
        </p>

        {/* Dual Conversion Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-auto">
          <Button
            asLink
            href="#katalog"
            onClick={handleCatalogClick}
            variant="primary"
            size="lg"
            className="w-auto"
          >
            <span>{t.conversion.catalogCta}</span>
            <ArrowRight size={18} />
          </Button>

          <Button
            asLink
            href={t.conversion.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            className="w-auto border-coconut-cream/40 hover:border-coconut-lime hover:text-coconut-lime"
          >
            <MessageCircle size={18} />
            <span>{t.conversion.contactCta}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
