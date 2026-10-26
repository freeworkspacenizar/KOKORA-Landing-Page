import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section03Deconstruct } from './Section03Deconstruct';

describe('Section 03 The Coconut Deconstructed', () => {
  it('renders 4 Indonesian anatomical labels and headline', () => {
    render(<Section03Deconstruct />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/SATU KELAPA\.\s*BEGITU BANYAK CERITA\./i);
    expect(screen.getAllByText(/KULIT LUAR/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TEMPURUNG/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/DAGING KELAPA/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/AIR KELAPA/i).length).toBeGreaterThan(0);
  });

  it('renders anatomical descriptions for each component', () => {
    render(<Section03Deconstruct />);
    expect(screen.getAllByText(/Serabut pelindung tangguh/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cangkang keras pelindung inti/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Lapisan endosperma putih/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cairan isotonik alami kaya nutrisi/i).length).toBeGreaterThan(0);
  });
});
