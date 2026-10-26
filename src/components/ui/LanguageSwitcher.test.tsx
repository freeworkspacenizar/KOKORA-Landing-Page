import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher Component', () => {
  it('renders ID and EN buttons with proper aria attributes', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    const idBtn = screen.getByRole('button', { name: /Bahasa Indonesia/i });
    const enBtn = screen.getByRole('button', { name: /English/i });

    expect(idBtn).toHaveAttribute('aria-pressed', 'true');
    expect(enBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches active state when clicking EN button', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(enBtn).toHaveAttribute('aria-pressed', 'true');

    const idBtn = screen.getByRole('button', { name: /Bahasa Indonesia/i });
    expect(idBtn).toHaveAttribute('aria-pressed', 'false');
  });
});
