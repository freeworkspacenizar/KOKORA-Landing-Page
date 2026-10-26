import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section06Lifestyle } from './Section06Lifestyle';

describe('Section 06 Lifestyle & Brand World', () => {
  it('renders lifestyle headline and editorial storytelling cards', () => {
    render(<Section06Lifestyle />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/BAWA NUANSA ALAMI KE KESEHARIANMU\./i);
    expect(screen.getByText(/Keseimbangan Alami/i)).toBeInTheDocument();
    expect(screen.getByText(/Ritual Perawatan Murni/i)).toBeInTheDocument();
    expect(screen.getByText(/Dapur Tropis Nusantara/i)).toBeInTheDocument();
  });
});
