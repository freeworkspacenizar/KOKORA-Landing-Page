import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section08Footer } from './Section08Footer';

describe('Section 08 Footer', () => {
  it('renders Toko Kelapa brand statement and signature line', () => {
    render(<Section08Footer />);
    expect(screen.getByText(/BUKAN SEKADAR KELAPA\. INI CARA KAMI MELIHATNYA\./i)).toBeInTheDocument();
    expect(screen.getByText(/Hak Cipta Dilindungi/i)).toBeInTheDocument();
  });

  it('renders footer navigation links', () => {
    render(<Section08Footer />);
    expect(screen.getByRole('link', { name: /Beranda/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cerita Kami/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Katalog Produk/i })).toBeInTheDocument();
  });
});
