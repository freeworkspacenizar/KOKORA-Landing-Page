import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section02Manifesto } from './Section02Manifesto';

describe('Section 02 Brand Manifesto', () => {
  it('renders headline and accessible full sentence for assistive technology', () => {
    render(<Section02Manifesto />);
    expect(screen.getByText(/LEBIH DARI SEKADAR KELAPA\./i)).toBeInTheDocument();
    const manifestoBody = screen.getByText(/Setiap kelapa punya cerita\./i);
    expect(manifestoBody).toBeInTheDocument();
  });

  it('renders brand philosophy pillars with natural material details', () => {
    render(<Section02Manifesto />);
    expect(screen.getByText(/Kearifan Lokal/i)).toBeInTheDocument();
    expect(screen.getByText(/Kemurnian Alami/i)).toBeInTheDocument();
  });
});
