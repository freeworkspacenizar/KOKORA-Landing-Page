import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock ResizeObserver for R3F Canvas
(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Mock HTMLCanvasElement for Three.js
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  getExtension: vi.fn(),
  getParameter: vi.fn(),
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Mock ScrollTrigger in test environment to avoid Node unhandled timer loops
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    register: vi.fn(),
    create: vi.fn().mockReturnValue({ kill: vi.fn() }),
    update: vi.fn(),
    refresh: vi.fn(),
    getAll: vi.fn().mockReturnValue([]),
    clearMatchMedia: vi.fn(),
    killAll: vi.fn(),
    disable: vi.fn(),
    enable: vi.fn(),
  },
}));
