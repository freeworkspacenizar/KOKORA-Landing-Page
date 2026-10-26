import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section05Product3D } from './Section05Product3D';

describe('Section 05 Product in 3D Studio', () => {
  it('renders flagship VCO title and 3 interactive hotspots', () => {
    render(<Section05Product3D />);
    expect(screen.getByText(/STUDIO INSPEKSI 3D/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Virgin Coconut Oil/i);
    expect(screen.getByText(/Ekstraksi Dingin Pertama/i)).toBeInTheDocument();
    expect(screen.getByText(/Kemasan Kaca Daur Ulang/i)).toBeInTheDocument();
    expect(screen.getByText(/Kemurnian 100% Organik/i)).toBeInTheDocument();
  });

  it('allows switching volume variants between 250ml and 500ml', () => {
    render(<Section05Product3D />);
    const btn500 = screen.getByRole('button', { name: /500 ml/i });
    fireEvent.click(btn500);
    expect(btn500).toHaveAttribute('aria-pressed', 'true');
  });

  it('provides direct purchase button for the inspected bottle', () => {
    render(<Section05Product3D />);
    expect(screen.getByRole('link', { name: /Pesan Botol Ini/i })).toBeInTheDocument();
  });
});
