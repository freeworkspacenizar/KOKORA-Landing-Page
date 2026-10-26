import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Section06Lifestyle } from './Section06Lifestyle';

describe('Section 06 Lifestyle & Brand World', () => {
  it('renders lifestyle headline and editorial storytelling cards', () => {
    render(
      <LanguageProvider>
        <Section06Lifestyle />
      </LanguageProvider>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/BAWA NUANSA ALAMI KE KESEHARIANMU\./i);
    expect(screen.getByText(/Keseimbangan Alami/i)).toBeInTheDocument();
    expect(screen.getByText(/Ritual Perawatan Murni/i)).toBeInTheDocument();
    expect(screen.getByText(/Dapur Tropis Nusantara/i)).toBeInTheDocument();
  });

  it('renders English lifestyle cards when language is switched', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <Section06Lifestyle />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/BRING BOTANICAL CALM TO YOUR EVERYDAY\./i);
    expect(screen.getByText(/Natural Balance/i)).toBeInTheDocument();
    expect(screen.getByText(/Pure Care Ritual/i)).toBeInTheDocument();
    expect(screen.getByText(/Archipelago Kitchen Craft/i)).toBeInTheDocument();
  });
});
