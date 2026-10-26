import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { Navigation } from './Navigation';

describe('Navigation with Language Support', () => {
  it('renders default Indonesian links and LanguageSwitcher', () => {
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    );

    expect(screen.getAllByText('Cerita').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dekonstruksi').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Katalog').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Hubungi Kami').length).toBeGreaterThan(0);
  });

  it('switches navigation links dynamically when language is changed to EN', () => {
    render(
      <LanguageProvider>
        <Navigation />
      </LanguageProvider>
    );

    const enBtns = screen.getAllByRole('button', { name: /English/i });
    fireEvent.click(enBtns[0]);

    expect(screen.getAllByText('Story').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Deconstruct').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Catalog').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact Us').length).toBeGreaterThan(0);
  });
});
