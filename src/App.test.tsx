import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Root Scaffolding', () => {
  it('renders Toko Kelapa root layout without error', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
