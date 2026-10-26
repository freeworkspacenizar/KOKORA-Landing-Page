import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Section07Conversion } from './Section07Conversion';

describe('Section 07 Conversion', () => {
  it('renders conversion headline and functional destination buttons', () => {
    render(
      <LanguageProvider>
        <Section07Conversion />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/SIAP MENJELAJAHI DUNIA KELAPA\?/i);
    expect(screen.getByRole('link', { name: /Lihat Semua Produk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hubungi Kami/i })).toBeInTheDocument();
  });

  it('renders English conversion buttons when language is switched', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <Section07Conversion />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/READY TO EXPERIENCE PURE COCONUT\?/i);
    expect(screen.getByRole('link', { name: /Explore All Products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact Us/i })).toBeInTheDocument();
  });
});
