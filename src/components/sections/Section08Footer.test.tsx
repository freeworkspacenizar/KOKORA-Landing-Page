import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Section08Footer } from './Section08Footer';

describe('Section 08 Footer', () => {
  it('renders KOKORA brand statement and signature line', () => {
    render(
      <LanguageProvider>
        <Section08Footer />
      </LanguageProvider>
    );
    expect(screen.getByText(/BUKAN SEKADAR KELAPA\. INI CARA KAMI MELIHATNYA\./i)).toBeInTheDocument();
    expect(screen.getByText(/Hak Cipta Dilindungi/i)).toBeInTheDocument();
  });

  it('renders footer navigation links', () => {
    render(
      <LanguageProvider>
        <Section08Footer />
      </LanguageProvider>
    );
    expect(screen.getByRole('link', { name: /Beranda/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cerita Kami/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Katalog Produk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp Konsultasi/i })).toBeInTheDocument();
    expect(screen.getByText(/kemitraan adil bersama petani kelapa Indonesia/i)).toBeInTheDocument();
  });

  it('renders English footer links and copyright when language is switched', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <Section08Footer />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(screen.getByText(/NOT JUST A COCONUT\. THIS IS HOW WE SEE IT\./i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Our Story/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp Consultation/i })).toBeInTheDocument();
    expect(screen.getByText(/fair-trade partnerships with Indonesian coconut growers/i)).toBeInTheDocument();
  });
});
