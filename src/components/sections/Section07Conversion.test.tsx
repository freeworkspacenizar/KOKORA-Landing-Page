import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section07Conversion } from './Section07Conversion';

describe('Section 07 Conversion', () => {
  it('renders conversion headline and functional destination buttons', () => {
    render(<Section07Conversion />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/SIAP MENJELAJAHI DUNIA KELAPA\?/i);
    expect(screen.getByRole('link', { name: /Lihat Semua Produk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hubungi Kami/i })).toBeInTheDocument();
  });
});
