import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Pilih Bahasa / Select Language"
      className={`inline-flex items-center gap-1 p-1 rounded-full bg-coconut-cream/10 border border-coconut-cream/15 backdrop-blur-md shadow-inner transition-all duration-300 ${className}`}
    >
      <span className="pl-1.5 pr-0.5 text-coconut-lime/70 select-none pointer-events-none" aria-hidden="true">
        <Globe size={13} />
      </span>

      <button
        type="button"
        onClick={() => setLocale('id')}
        aria-pressed={locale === 'id'}
        aria-label="Bahasa Indonesia"
        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-coconut-lime ${
          locale === 'id'
            ? 'bg-coconut-lime text-coconut-dark shadow-sm scale-100'
            : 'text-coconut-cream/70 hover:text-coconut-cream scale-95 hover:scale-100'
        }`}
      >
        ID
      </button>

      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        aria-label="English"
        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-coconut-lime ${
          locale === 'en'
            ? 'bg-coconut-lime text-coconut-dark shadow-sm scale-100'
            : 'text-coconut-cream/70 hover:text-coconut-cream scale-95 hover:scale-100'
        }`}
      >
        EN
      </button>
    </div>
  );
};
