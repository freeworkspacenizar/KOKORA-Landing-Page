import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useInView } from './useInView';

describe('useInView', () => {
  it('returns true when element intersects viewport', () => {
    let callback: (entries: { isIntersecting: boolean }[]) => void = () => {};

    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class IntersectionObserver {
      constructor(cb: (entries: { isIntersecting: boolean }[]) => void) {
        callback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    };

    const targetRef = { current: document.createElement('div') };
    const { result } = renderHook(() => useInView(targetRef));
    
    // Default is true so it renders immediately
    expect(result.current).toBe(true);

    // Trigger intersection event
    act(() => {
      callback([{ isIntersecting: false }]);
    });
    expect(result.current).toBe(false);
  });
});
