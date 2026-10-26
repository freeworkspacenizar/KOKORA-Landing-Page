import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Section01Hero } from './Section01Hero';

describe('Section 01 Hero Experience', () => {
  it('renders Indonesian eyebrow, headlines, and dual CTAs', () => {
    render(
      <LanguageProvider>
        <Section01Hero />
      </LanguageProvider>
    );
    expect(screen.getByText(/DARI ALAM, UNTUK KESEHARIAN/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/ALAMI\.\s*TAPI NGGAK\s*BIASA\./i);
    expect(screen.getByRole('link', { name: /Jelajahi Produk/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Cerita Kami/i }).length).toBeGreaterThan(0);
  });

  it('renders interactive exploration microcopy', () => {
    render(
      <LanguageProvider>
        <Section01Hero />
      </LanguageProvider>
    );
    expect(screen.getByText(/Geser\. Putar\. Jelajahi\./i)).toBeInTheDocument();
  });

  it('renders English copy when language is changed', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <Section01Hero />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(screen.getByText(/FROM NATURE, FOR EVERYDAY LIFE/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/NATURAL\.\s*YET UNCOMMONLY\s*REFINED\./i);
  });
});
