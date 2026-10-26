import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { LocaleDictionary } from '../locales/types';
import { localeID } from '../locales/id';
import { localeEN } from '../locales/en';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type Locale = 'id' | 'en';

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: LocaleDictionary;
}

const STORAGE_KEY = 'toko_kelapa_lang';

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'id';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
  } catch {
    // localStorage restricted or disabled
  }
  return 'id';
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // Storage unavailable
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }

    // Refresh ScrollTrigger calculations after text changes
    setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // ScrollTrigger not registered or mock environment
      }
    }, 50);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'id' ? 'en' : 'id');
  }, [locale, setLocale]);

  // Synchronize document lang attribute on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const t = useMemo(() => {
    return locale === 'en' ? localeEN : localeID;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
