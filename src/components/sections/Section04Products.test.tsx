import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section04Products } from './Section04Products';

describe('Section 04 Product Showcase', () => {
  it('renders catalog header and all 4 products with CTA', () => {
    render(<Section04Products />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/DARI KELAPA, MENJADI PILIHANMU\./i);
    expect(screen.getByText(/Virgin Coconut Oil/i)).toBeInTheDocument();
    expect(screen.getByText(/Raw Organic Coconut Water/i)).toBeInTheDocument();
    expect(screen.getByText(/Artisan Granulated Coconut Sugar/i)).toBeInTheDocument();
    expect(screen.getByText(/Eco-Friendly Coconut Shell Charcoal/i)).toBeInTheDocument();
  });

  it('provides "Inspeksi 3D" link on the flagship VCO product', () => {
    render(<Section04Products />);
    expect(screen.getByRole('link', { name: /Inspeksi 3D/i })).toHaveAttribute('href', '#studio-3d');
  });
});
