import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach } from 'vitest';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const rafMock = (cb: FrameRequestCallback) => setTimeout(cb, 16) as unknown as number;
const cafMock = (id: number) => clearTimeout(id);

vi.stubGlobal('requestAnimationFrame', rafMock);
vi.stubGlobal('cancelAnimationFrame', cafMock);

if (typeof window !== 'undefined') {
  window.requestAnimationFrame = rafMock;
  window.cancelAnimationFrame = cafMock;

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

  window.scrollTo = vi.fn();
}

// JSDOM ResizeObserver mock for R3F Canvas
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// HTMLCanvasElement mock for Three.js in test
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  getExtension: vi.fn(),
  getParameter: vi.fn(),
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

beforeEach(() => {
  try {
    ScrollTrigger.enable();
  } catch {
    // Ignore
  }
});

// Teardown ScrollTrigger after each test to halt internal loops
afterEach(() => {
  try {
    ScrollTrigger.killAll();
    ScrollTrigger.disable();
    ScrollTrigger.clearMatchMedia();
  } catch {
    // Ignore teardown errors
  }
});
