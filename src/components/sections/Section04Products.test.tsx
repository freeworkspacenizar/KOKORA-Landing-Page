import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Section04Products } from './Section04Products';

describe('Section 04 Product Showcase', () => {
  it('renders catalog header and all 4 products with CTA', () => {
    render(
      <LanguageProvider>
        <Section04Products />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/DARI KELAPA, MENJADI PILIHANMU\./i);
    expect(screen.getByText(/Virgin Coconut Oil/i)).toBeInTheDocument();
    expect(screen.getByText(/Raw Organic Coconut Water/i)).toBeInTheDocument();
    expect(screen.getByText(/Artisan Granulated Coconut Sugar/i)).toBeInTheDocument();
    expect(screen.getByText(/Eco-Friendly Coconut Shell Charcoal/i)).toBeInTheDocument();
  });

  it('provides "Inspeksi 3D" link on the flagship VCO product', () => {
    render(
      <LanguageProvider>
        <Section04Products />
      </LanguageProvider>
    );
    expect(screen.getByRole('link', { name: /Inspeksi 3D/i })).toHaveAttribute('href', '#studio-3d');
  });

  it('renders English product catalog when language is switched', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <Section04Products />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/FROM THE PALM TO YOUR DAILY CHOICE\./i);
    expect(screen.getByRole('link', { name: /3D Inspection/i })).toHaveAttribute('href', '#studio-3d');
    expect(screen.getAllByText(/Order via WhatsApp/i).length).toBeGreaterThan(0);
  });
});
