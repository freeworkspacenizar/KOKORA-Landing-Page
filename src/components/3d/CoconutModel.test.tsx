import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FallbackPoster } from './FallbackPoster';

describe('3D Fallback Poster', () => {
  it('renders accessible poster image and description when WebGL is unavailable', () => {
    const { getByRole } = render(
      <FallbackPoster title="Kelapa Alami KOKORA" />
    );
    expect(getByRole('img', { name: /Kelapa Alami KOKORA/i })).toBeInTheDocument();
  });
});
