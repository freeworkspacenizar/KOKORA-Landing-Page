import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section01Hero } from './Section01Hero';

describe('Section 01 Hero Experience', () => {
  it('renders Indonesian eyebrow, headlines, and dual CTAs', () => {
    render(<Section01Hero />);
    expect(screen.getByText(/DARI ALAM, UNTUK KESEHARIAN/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/ALAMI\.\s*TAPI NGGAK\s*BIASA\./i);
    expect(screen.getByRole('link', { name: /Jelajahi Produk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cerita Kami/i })).toBeInTheDocument();
  });

  it('renders interactive exploration microcopy', () => {
    render(<Section01Hero />);
    expect(screen.getByText(/Geser\. Putar\. Jelajahi\./i)).toBeInTheDocument();
  });
});
