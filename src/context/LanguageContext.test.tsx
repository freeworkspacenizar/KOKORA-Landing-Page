import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';

const TestConsumer: React.FC = () => {
  const { locale, toggleLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-locale">{locale}</span>
      <span data-testid="nav-story">{t.nav.cerita}</span>
      <button onClick={toggleLocale} data-testid="toggle-btn">Toggle</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'id';
    vi.clearAllMocks();
  });

  it('defaults to Indonesian (ID) and provides Indonesian copy', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('current-locale')).toHaveTextContent('id');
    expect(screen.getByTestId('nav-story')).toHaveTextContent('Cerita');
    expect(document.documentElement.lang).toBe('id');
  });

  it('toggles locale to English and persists in localStorage and html lang attribute', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    act(() => {
      screen.getByTestId('toggle-btn').click();
    });
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-story')).toHaveTextContent('Story');
    expect(localStorage.getItem('toko_kelapa_lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('initializes from localStorage when available', () => {
    localStorage.setItem('toko_kelapa_lang', 'en');
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-story')).toHaveTextContent('Story');
  });
});
