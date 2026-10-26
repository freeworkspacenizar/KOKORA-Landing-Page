import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Root Scaffolding & Narrative Assembly', () => {
  it('renders all 8 sections and navigation in complete narrative flow', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Navigation
    expect(screen.getByLabelText(/Toko Kelapa Homepage/i)).toBeInTheDocument();

    // Section 01: Hero
    expect(screen.getByText(/DARI ALAM, UNTUK KESEHARIAN/i)).toBeInTheDocument();

    // Section 02: Manifesto
    expect(screen.getByText(/LEBIH DARI SEKADAR KELAPA\./i)).toBeInTheDocument();

    // Section 03: Deconstructed
    expect(screen.getByRole('heading', { level: 2, name: /SATU KELAPA\.\s*BEGITU BANYAK CERITA\./i })).toBeInTheDocument();

    // Section 04: Products
    expect(screen.getByRole('heading', { level: 2, name: /DARI KELAPA, MENJADI PILIHANMU\./i })).toBeInTheDocument();

    // Section 05: Product 3D Studio
    expect(screen.getByText(/STUDIO INSPEKSI 3D/i)).toBeInTheDocument();

    // Section 06: Lifestyle
    expect(screen.getByRole('heading', { level: 2, name: /BAWA NUANSA ALAMI KE KESEHARIANMU\./i })).toBeInTheDocument();

    // Section 07: Conversion
    expect(screen.getByRole('heading', { level: 2, name: /SIAP MENJELAJAHI DUNIA KELAPA\?/i })).toBeInTheDocument();

    // Section 08: Footer
    expect(screen.getByText(/BUKAN SEKADAR KELAPA\. INI CARA KAMI MELIHATNYA\./i)).toBeInTheDocument();
  });
});
