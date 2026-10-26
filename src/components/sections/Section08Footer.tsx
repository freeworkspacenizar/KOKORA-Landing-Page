import React from 'react';
import { useSmoothScroll } from '../ui/SmoothScrollProvider';
import { useLanguage } from '../../context/LanguageContext';

export const Section08Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <footer className="relative bg-coconut-dark text-coconut-cream/80 border-t border-coconut-cream/10 pt-20 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Brand & Signature Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-coconut-cream/10">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-coconut-lime flex items-center justify-center text-coconut-dark font-bold text-lg">
                🥥
              </span>
              <span className="font-display font-bold tracking-wider text-2xl uppercase text-coconut-cream">
                KOKORA
              </span>
            </div>
            <p className="text-sm text-coconut-cream/70 max-w-md font-light leading-relaxed">
              {t.footer.motto}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end lg:items-end">
            <span className="text-xs uppercase font-mono tracking-widest text-coconut-lime mb-2">
              {t.footer.signatureLabel}
            </span>
            <p className="font-display text-xl sm:text-2xl font-bold text-coconut-cream tracking-tight lg:text-right">
              {t.footer.signatureQuote}
            </p>
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-coconut-cream/10 text-xs">
          <div>
            <h4 className="font-display font-bold text-coconut-cream uppercase tracking-wider mb-4">
              {t.footer.colExploration}
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavClick(e, '#')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkHome}
                </a>
              </li>
              <li>
                <a
                  href="#manifesto"
                  onClick={(e) => handleNavClick(e, '#manifesto')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkStory}
                </a>
              </li>
              <li>
                <a
                  href="#dekonstruksi"
                  onClick={(e) => handleNavClick(e, '#dekonstruksi')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkDeconstruct}
                </a>
              </li>
              <li>
                <a
                  href="#lifestyle"
                  onClick={(e) => handleNavClick(e, '#lifestyle')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkLifestyle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-coconut-cream uppercase tracking-wider mb-4">
              {t.footer.colCatalog}
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => handleNavClick(e, '#katalog')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkCatalog}
                </a>
              </li>
              <li>
                <a
                  href="#studio-3d"
                  onClick={(e) => handleNavClick(e, '#studio-3d')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkVco}
                </a>
              </li>
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => handleNavClick(e, '#katalog')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkWater}
                </a>
              </li>
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => handleNavClick(e, '#katalog')}
                  className="hover:text-coconut-lime transition-colors"
                >
                  {t.footer.linkSugar}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-coconut-cream uppercase tracking-wider mb-4">
              {t.footer.colContact}
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <a
                  href="https://wa.me/?text=Halo%20Toko%20Kelapa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coconut-lime transition-colors"
                >
                  WhatsApp Konsultasi
                </a>
              </li>
              <li>
                <span className="text-coconut-cream/50 cursor-not-allowed">
                  Instagram @KOKORA
                </span>
              </li>
              <li>
                <span className="text-coconut-cream/50 cursor-not-allowed">
                  Email: Admin@Kokora.id
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-coconut-cream uppercase tracking-wider mb-4">
              {t.footer.colSocial}
            </h4>
            <p className="text-xs text-coconut-cream/70 font-light leading-relaxed">
              Diproduksi dengan prinsip keberlanjutan dan kemitraan adil bersama petani kelapa Indonesia.
            </p>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-coconut-cream/50">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <span>{t.footer.linkPrivacy}</span>
            <span>{t.footer.linkTerms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
