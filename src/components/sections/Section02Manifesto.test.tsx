import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Section02Manifesto } from './Section02Manifesto';

describe('Section 02 Brand Manifesto', () => {
  it('renders headline and accessible full sentence for assistive technology', () => {
    render(
      <LanguageProvider>
        <Section02Manifesto />
      </LanguageProvider>
    );
    expect(screen.getByText(/LEBIH DARI SEKADAR KELAPA\./i)).toBeInTheDocument();
    const manifestoBody = screen.getByText(/Setiap kelapa punya cerita\./i);
    expect(manifestoBody).toBeInTheDocument();
  });

  it('renders brand philosophy pillars with natural material details', () => {
    render(
      <LanguageProvider>
        <Section02Manifesto />
      </LanguageProvider>
    );
    expect(screen.getByText(/Kearifan Lokal/i)).toBeInTheDocument();
    expect(screen.getByText(/Kemurnian Alami/i)).toBeInTheDocument();
  });

  it('renders English manifesto when language is changed', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
        <Section02Manifesto />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(screen.getByText(/MORE THAN JUST A COCONUT\./i)).toBeInTheDocument();
    expect(screen.getByText(/Natural Purity/i)).toBeInTheDocument();
    expect(screen.getByText(/Ancestral Wisdom/i)).toBeInTheDocument();
  });
});
