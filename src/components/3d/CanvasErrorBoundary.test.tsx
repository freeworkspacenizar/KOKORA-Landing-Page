import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CanvasErrorBoundary } from './CanvasErrorBoundary';

describe('CanvasErrorBoundary', () => {
  it('renders fallback poster when child throws WebGL error', () => {
    // Suppress console.error in test output for thrown error
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const Bomb = () => {
      throw new Error('WebGL not supported');
    };

    render(
      <CanvasErrorBoundary title="Fallback Kelapa Alami">
        <Bomb />
      </CanvasErrorBoundary>
    );

    expect(screen.getByRole('img', { name: /Fallback Kelapa Alami/i })).toBeInTheDocument();
  });
});
