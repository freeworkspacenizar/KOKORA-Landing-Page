# KOKORA Immersive 3D Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, Awwwards-caliber interactive 3D landing page for KOKORA in Bahasa Indonesia, combining Tropical Modernism with scroll-driven WebGL storytelling (Hero 3D, Manifesto, Coconut Deconstruction, Product Catalog, 3D Product Studio, Lifestyle, Conversion, and Footer).

**Architecture:** Single Page Application (SPA) built on Vite, React 19, TypeScript, and Tailwind CSS. The 3D engine uses React Three Fiber and Three.js with custom procedural PBR materials and lighting. Smooth scrolling is orchestrated via a single Lenis engine bound to GSAP ScrollTrigger's ticker, with full support for `prefers-reduced-motion` and no-WebGL fallbacks.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS, Three.js, @react-three/fiber, @react-three/drei, GSAP, @gsap/react, Lenis, Lucide React, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-26-toko-kelapa-landing-page-design.md`

## Global Constraints

- **Primary Language:** Bahasa Indonesia for all user-facing copy and microcopy.
- **Color Palette:** Deep Coconut Green (`#173F32`), Coconut Cream (`#F5F0E5`), Young Coconut Lime (`#B9D957`), Coconut Husk (`#A75B3B`), Dark Green Accent (`#0D241C`).
- **Typography:** Display serif/modern display (*Syne* / *Clash Display* aesthetic) and clean body sans-serif (*Plus Jakarta Sans*).
- **Smooth Scroll:** Exactly ONE smooth-scroll engine: Lenis. Never initialize Locomotive Scroll.
- **Motion Accessibility:** Honor `prefers-reduced-motion` by disabling idle rotation, camera animation, and scrubbed timelines, rendering static states immediately.
- **Truthful Content:** No fabricated customer reviews, fake health cure claims, or fake certification logos; all unconfirmed business data must use editable placeholders.
- **No SSR Hydration Conflicts:** Pure client-side SPA rendering with Vite to guarantee stable 60 FPS WebGL canvas mounting.

## Review Focus

1. **WebGL Unsupported / Context Loss:** User opens site on device without WebGL or background tab loses context -> Beautiful static visual fallback poster renders without crashing or blank screen.
2. **`prefers-reduced-motion: reduce` Enabled:** User has system reduced motion enabled -> 3D camera transitions and idle spin are halted, exploded view displays as accessible static breakdown, text reveals appear instantly.
3. **Screen Reader Accessible Names on Split Text:** Section 02 Manifesto reveals text word-by-word -> The entire sentence remains readable to screen readers via intact `aria-label`, with split decorative spans hidden with `aria-hidden="true"`.
4. **Bidirectional Scroll Scrubbing:** User scrubs down through Section 03 Coconut Deconstruction and quickly scrolls back up -> Coconut components separate along vectors and neatly reassemble into whole coconut without transform drift or camera jerk.
5. **Mobile Viewport Overflow & Touch Gestures:** User drags on mobile (< 768px) -> Touch rotation is constrained, camera frustum adjusts to avoid clipping, and horizontal overflow is strictly zero.

---

### Task 1: Project Scaffolding, Core Dependencies & Tailwind / Typography Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/globals.css`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: None (Root setup)
- Produces: Runnable Vite React 19 app with Tailwind tokens (`bg-coconut-green`, `bg-coconut-cream`, `text-coconut-lime`, `border-coconut-husk`) and configured test runner.

- [ ] **Step 1: Write the failing test**
Create `src/App.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Root Scaffolding', () => {
  it('renders KOKORA root layout without error', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test`
Expected: FAIL (files and test runner not yet configured)

- [ ] **Step 3: Implement Vite config, package.json, Tailwind, and App skeleton**
- Consolidate dependencies from existing `GSAP Support File` and `Threejs Support File` into root `package.json`:
  - `react`, `react-dom`, `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge`.
  - devDependencies: `typescript`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- Configure `tailwind.config.js` with color tokens:
  ```js
  colors: {
    coconut: {
      green: '#173F32',
      dark: '#0D241C',
      cream: '#F5F0E5',
      lime: '#B9D957',
      husk: '#A75B3B',
    }
  }
  ```
- Import Google Fonts in `index.html` (*Plus Jakarta Sans* & *Syne*).
- Implement minimal `src/App.tsx` with `<main role="main">` and basic Tailwind test.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test`
Expected: PASS

- [ ] **Step 5: Verify build**
Run: `npm run build`
Expected: PASS (Vite builds `dist/` cleanly).

---

### Task 2: Smooth Scrolling (Lenis) & GSAP ScrollTrigger Integration Hook

**Files:**
- Create: `src/components/ui/SmoothScrollProvider.tsx`
- Create: `src/hooks/useScrollAnimation.ts`
- Create: `src/hooks/usePrefersReducedMotion.ts`
- Test: `src/hooks/usePrefersReducedMotion.test.ts`

**Interfaces:**
- Consumes: `lenis`, `gsap`, `ScrollTrigger`
- Produces: `<SmoothScrollProvider>` wrapping page, `useScrollAnimation()` hook for section timelines, `usePrefersReducedMotion()` boolean flag.

- [ ] **Step 1: Write the failing test for `usePrefersReducedMotion`**
Create `src/hooks/usePrefersReducedMotion.test.ts`:
```ts
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
  it('returns false by default when media query matches false', () => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/hooks/usePrefersReducedMotion.test.ts`
Expected: FAIL with module not found.

- [ ] **Step 3: Implement `usePrefersReducedMotion`, `SmoothScrollProvider`, and `useScrollAnimation`**
- `usePrefersReducedMotion`: listens to `(prefers-reduced-motion: reduce)` changes.
- `SmoothScrollProvider`:
  - Initializes Lenis: `new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })`.
  - Connects Lenis to GSAP ticker:
    ```ts
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    ```
  - Bypasses smooth scrolling if `prefers-reduced-motion` is active.
  - Cleans up lenis on unmount.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/hooks/usePrefersReducedMotion.test.ts`
Expected: PASS

---

### Task 3: Product Catalog & Hotspot Data Models (`src/data/products.ts`)

**Files:**
- Create: `src/data/products.ts`
- Test: `src/data/products.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `Product` type, `ProductHotspot` type, `PRODUCTS` array (4 items), `FLAGSHIP_PRODUCT` (VCO).

- [ ] **Step 1: Write the failing test**
Create `src/data/products.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { PRODUCTS, FLAGSHIP_PRODUCT } from './products';

describe('Product Data Catalog', () => {
  it('contains exactly 4 products with valid placeholders', () => {
    expect(PRODUCTS).toHaveLength(4);
    PRODUCTS.forEach((prod) => {
      expect(prod.id).toBeDefined();
      expect(prod.name).toBeDefined();
      expect(prod.tagline).toBeDefined();
      expect(prod.specs).toBeDefined();
    });
  });

  it('has a flagship hero product with interactive 3D hotspots', () => {
    expect(FLAGSHIP_PRODUCT.isHero).toBe(true);
    expect(FLAGSHIP_PRODUCT.hotspots).toBeDefined();
    expect(FLAGSHIP_PRODUCT.hotspots?.length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/data/products.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement `src/data/products.ts`**
- Define `Product` and `ProductHotspot` interfaces.
- Populate 4 products:
  1. *Virgin Coconut Oil (VCO) Cold-Pressed* (Flagship, 3 hotspots: Ekstraksi Dingin Pertama, Kemasan Kaca Daur Ulang, Kemurnian 100% Organik, variants 250ml & 500ml).
  2. *Raw Organic Coconut Water* (Hidrasi alami murni tanpa pengawet).
  3. *Artisan Granulated Coconut Sugar* (Gula kelapa kristal nira alami, low GI).
  4. *Eco-Friendly Coconut Shell Charcoal* (Briket arang tempurung alami).
- Include explicit placeholder flags and direct order links (`https://wa.me/?text=...`).

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/data/products.test.ts`
Expected: PASS

---

### Task 4: Procedural 3D Coconut Anatomi Model (`src/components/3d/CoconutModel.tsx`)

**Files:**
- Create: `src/components/3d/CoconutModel.tsx`
- Create: `src/components/3d/SceneLighting.tsx`
- Create: `src/components/3d/FallbackPoster.tsx`
- Test: `src/components/3d/CoconutModel.test.tsx`

**Interfaces:**
- Consumes: `@react-three/fiber`, `three`
- Produces: `<CoconutModel explodeProgress={number} />`, `<SceneLighting />`, `<FallbackPoster />`

- [ ] **Step 1: Write the failing test**
Create `src/components/3d/CoconutModel.test.tsx`:
```tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FallbackPoster } from './FallbackPoster';

describe('3D Fallback Poster', () => {
  it('renders accessible poster image and description when WebGL is unavailable', () => {
    const { getByRole, getByAltText } = render(
      <FallbackPoster title="Kelapa Alami KOKORA" />
    );
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByAltText(/Kelapa Alami KOKORA/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/components/3d/CoconutModel.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `CoconutModel.tsx`, `SceneLighting.tsx`, and `FallbackPoster.tsx`**
- `CoconutModel`:
  - 4 layered concentric meshes with organic procedural noise and custom materials:
    1. Outer Husk: Coarse green-brown fibrous PBR mesh with roughness 0.9.
    2. Hard Shell: Dark brown speckled sphere with triple eye indentations.
    3. Coconut Meat: Creamy white ivory shell with subtle subsurface scatter appearance.
    4. Coconut Water: Translucent interior sphere with glass/water shader refraction.
  - Accepts `explodeProgress`: interpolates positional vectors separating husk, shell, meat, and water outwards.
- `SceneLighting`: Studio tropical three-point lighting (Warm Key light, cool Green Fill light, Lime Rim light).
- `FallbackPoster`: High-res stylized SVG/CSS visual representation with proper `alt` tag and accessible description.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/components/3d/CoconutModel.test.tsx`
Expected: PASS

---

### Task 5: Hero Experience & Minimalist Navigation (`src/components/sections/Section01Hero.tsx`)

**Files:**
- Create: `src/components/ui/Navigation.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/sections/Section01Hero.tsx`
- Test: `src/components/sections/Section01Hero.test.tsx`

**Interfaces:**
- Consumes: `CoconutModel`, `Button`, `Navigation`, GSAP
- Produces: `<Navigation />`, `<Section01Hero />`

- [ ] **Step 1: Write the failing test**
Create `src/components/sections/Section01Hero.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section01Hero } from './Section01Hero';

describe('Section 01 Hero Experience', () => {
  it('renders Indonesian eyebrow, headlines, and dual CTAs', () => {
    render(<Section01Hero />);
    expect(screen.getByText(/DARI ALAM, UNTUK KESEHARIAN/i)).toBeInTheDocument();
    expect(screen.getByText(/ALAMI\.\s*TAPI NGGAK BIASA\./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Jelajahi Produk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cerita Kami/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/components/sections/Section01Hero.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `Navigation.tsx`, `Button.tsx`, and `Section01Hero.tsx`**
- `Navigation`: KOKORA brand logo, quick navigation links (`Cerita`, `Dekonstruksi`, `Produk`, `Studio 3D`), backdrop blur, CTA `"Hubungi Kami"`.
- `Section01Hero`:
  - Canvas with interactive 3D coconut (slow idle rotation, pointer-responsive yaw/pitch, drag-to-rotate with damping).
  - Editorial typography overlay: Eyebrow, headline with staggered GSAP reveal, supporting copy.
  - Primary CTA `"Jelajahi Produk"` (smooth scrolls to `#katalog`), Secondary CTA `"Cerita Kami"` (smooth scrolls to `#manifesto`), and microcopy `"Geser. Putar. Jelajahi."` with scroll mouse indicator.
  - WebGL fallback if canvas fails to initialize.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/components/sections/Section01Hero.test.tsx`
Expected: PASS

---

### Task 6: Brand Manifesto Section with Word-by-Word Reveal (`src/components/sections/Section02Manifesto.tsx`)

**Files:**
- Create: `src/components/sections/Section02Manifesto.tsx`
- Test: `src/components/sections/Section02Manifesto.test.tsx`

**Interfaces:**
- Consumes: GSAP ScrollTrigger, `usePrefersReducedMotion`
- Produces: `<Section02Manifesto />`

- [ ] **Step 1: Write the failing test**
Create `src/components/sections/Section02Manifesto.test.tsx`:
```tsx
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
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/components/sections/Section02Manifesto.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `Section02Manifesto.tsx`**
- Background: Coconut Cream (`#F5F0E5`), text Deep Coconut Green (`#0D241C`).
- Headline: `"LEBIH DARI SEKADAR KELAPA."`
- Body copy: `"Setiap kelapa punya cerita. Kami ingin menghadirkannya dengan cara yang lebih dekat, lebih relevan, dan lebih menarik untuk keseharian."`
- Accessible word-by-word reveal: Split words inside `<span>` marked `aria-hidden="true"`, with parent container holding complete `aria-label`.
- Subtle floating organic husk fibers moving at subtle parallax speed.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/components/sections/Section02Manifesto.test.tsx`
Expected: PASS

---

### Task 7: The Coconut Deconstructed 3D Signature Section (`src/components/sections/Section03Deconstruct.tsx`)

**Files:**
- Create: `src/components/sections/Section03Deconstruct.tsx`
- Create: `src/components/3d/DeconstructedCanvas.tsx`
- Test: `src/components/sections/Section03Deconstruct.test.tsx`

**Interfaces:**
- Consumes: `CoconutModel`, GSAP ScrollTrigger
- Produces: `<Section03Deconstruct />`

- [ ] **Step 1: Write the failing test**
Create `src/components/sections/Section03Deconstruct.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section03Deconstruct } from './Section03Deconstruct';

describe('Section 03 The Coconut Deconstructed', () => {
  it('renders 4 Indonesian anatomical labels', () => {
    render(<Section03Deconstruct />);
    expect(screen.getByText(/SATU KELAPA\.\s*BEGITU BANYAK CERITA\./i)).toBeInTheDocument();
    expect(screen.getByText(/KULIT LUAR/i)).toBeInTheDocument();
    expect(screen.getByText(/TEMPURUNG/i)).toBeInTheDocument();
    expect(screen.getByText(/DAGING KELAPA/i)).toBeInTheDocument();
    expect(screen.getByText(/AIR KELAPA/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/components/sections/Section03Deconstruct.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `Section03Deconstruct.tsx` & `DeconstructedCanvas.tsx`**
- Pinned section with 250vh scroll distance for controlled scrubbed exploration.
- 3D scene scrubbed with GSAP ScrollTrigger:
  - Phase 1: Camera glides closer to whole coconut.
  - Phase 2: `explodeProgress` scrubs 0 -> 1; husk moves left, shell moves right, meat centers, water illuminates with caustics.
  - Phase 3: Anatomical cards slide in beside respective parts (`KULIT LUAR`, `TEMPURUNG`, `DAGING KELAPA`, `AIR KELAPA`).
  - Phase 4: Smooth re-assembly on reverse scroll.
- Fallback mode for mobile / reduced-motion: elegant interactive tabbed view showing each component with detailed photography and specs.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/components/sections/Section03Deconstruct.test.tsx`
Expected: PASS

---

### Task 8: Product Catalog Showcase Section (`src/components/sections/Section04Products.tsx`)

**Files:**
- Create: `src/components/sections/Section04Products.tsx`
- Create: `src/components/ui/ProductCard.tsx`
- Test: `src/components/sections/Section04Products.test.tsx`

**Interfaces:**
- Consumes: `PRODUCTS` from `src/data/products.ts`, `Button`
- Produces: `<Section04Products />`

- [ ] **Step 1: Write the failing test**
Create `src/components/sections/Section04Products.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section04Products } from './Section04Products';

describe('Section 04 Product Showcase', () => {
  it('renders catalog header and all 4 products with CTA', () => {
    render(<Section04Products />);
    expect(screen.getByText(/DARI KELAPA, MENJADI PILIHANMU\./i)).toBeInTheDocument();
    expect(screen.getByText(/Virgin Coconut Oil/i)).toBeInTheDocument();
    expect(screen.getByText(/Raw Organic Coconut Water/i)).toBeInTheDocument();
    expect(screen.getByText(/Artisan Granulated Coconut Sugar/i)).toBeInTheDocument();
    expect(screen.getByText(/Eco-Friendly Coconut Shell Charcoal/i)).toBeInTheDocument();
  });

  it('provides "Inspeksi 3D" link on the flagship VCO product', () => {
    render(<Section04Products />);
    expect(screen.getByRole('link', { name: /Inspeksi 3D/i })).toHaveAttribute('href', '#studio-3d');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/components/sections/Section04Products.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `ProductCard.tsx` and `Section04Products.tsx`**
- Editorial grid in Coconut Cream (`#F5F0E5`) showcasing 4 products.
- Each product card contains:
  - Product badge/tagline.
  - Image/procedural visual icon.
  - Product name and transparent placeholder specs.
  - Direct CTA button ("Pesan Langsung" to verified WhatsApp channel).
  - Secondary CTA ("Inspeksi 3D") on the Flagship VCO that scrolls smoothly to `#studio-3d`.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/components/sections/Section04Products.test.tsx`
Expected: PASS

---

### Task 9: Dedicated 3D Product Studio Viewer (`src/components/sections/Section05Product3D.tsx`)

**Files:**
- Create: `src/components/3d/VcoBottleModel.tsx`
- Create: `src/components/ui/HotspotPin.tsx`
- Create: `src/components/sections/Section05Product3D.tsx`
- Test: `src/components/sections/Section05Product3D.test.tsx`

**Interfaces:**
- Consumes: `FLAGSHIP_PRODUCT` from `src/data/products.ts`, `@react-three/fiber`
- Produces: `<Section05Product3D />`

- [ ] **Step 1: Write the failing test**
Create `src/components/sections/Section05Product3D.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section05Product3D } from './Section05Product3D';

describe('Section 05 Product in 3D Studio', () => {
  it('renders flagship VCO title and 3 interactive hotspots', () => {
    render(<Section05Product3D />);
    expect(screen.getByText(/Virgin Coconut Oil/i)).toBeInTheDocument();
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
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/components/sections/Section05Product3D.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `VcoBottleModel.tsx`, `HotspotPin.tsx`, and `Section05Product3D.tsx`**
- `VcoBottleModel`: Procedural apothecary bottle:
  - Transparent glass cylinder with curved shoulder, refractive material (`transmission: 0.95`, `roughness: 0.05`).
  - Warm golden liquid cylinder inside.
  - Wooden cap cylinder on top.
  - Minimalist embossed KOKORA label mesh.
  - Smooth scale transition when switching between 250ml and 500ml variants.
- `HotspotPin`: Screen-space overlay pins anchored to 3D positions with animated ping ring and expandable detail panel.
- Controls: Drag to rotate 360°, Reset View button, and Direct Order CTA.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/components/sections/Section05Product3D.test.tsx`
Expected: PASS

---

### Task 10: Lifestyle & Brand World Section (`src/components/sections/Section06Lifestyle.tsx`)

**Files:**
- Create: `src/components/sections/Section06Lifestyle.tsx`
- Test: `src/components/sections/Section06Lifestyle.test.tsx`

**Interfaces:**
- Consumes: Tailwind tokens
- Produces: `<Section06Lifestyle />`

- [ ] **Step 1: Write the failing test**
Create `src/components/sections/Section06Lifestyle.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section06Lifestyle } from './Section06Lifestyle';

describe('Section 06 Lifestyle & Brand World', () => {
  it('renders lifestyle headline and editorial storytelling cards', () => {
    render(<Section06Lifestyle />);
    expect(screen.getByText(/BAWA NUANSA ALAMI KE KESEHARIANMU\./i)).toBeInTheDocument();
    expect(screen.getByText(/Keseimbangan Alami/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npx vitest run src/components/sections/Section06Lifestyle.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `Section06Lifestyle.tsx`**
- Background: Coconut Cream (`#F5F0E5`).
- Headline: `"BAWA NUANSA ALAMI KE KESEHARIANMU."`
- Subcopy: `"Temukan bagaimana produk KOKORA dapat menjadi bagian dari keseharianmu."`
- Editorial lifestyle grid with authentic tropical modernism imagery, soft sunlight vignettes, tactile texture descriptions, and ethical sourcing narrative without medical overclaims.

- [ ] **Step 4: Run test to verify it passes**
Run: `npx vitest run src/components/sections/Section06Lifestyle.test.tsx`
Expected: PASS

---

### Task 11: Conversion CTA & Editorial Footer (`src/components/sections/Section07Conversion.tsx` & `Section08Footer.tsx`)

**Files:**
- Create: `src/components/sections/Section07Conversion.tsx`
- Create: `src/components/sections/Section08Footer.tsx`
- Test: `src/components/sections/Section07Conversion.test.tsx`
- Test: `src/components/sections/Section08Footer.test.tsx`

**Interfaces:**
- Consumes: `Button`, Brand tokens
- Produces: `<Section07Conversion />`, `<Section08Footer />`

- [ ] **Step 1: Write the failing tests**
Create `src/components/sections/Section07Conversion.test.tsx` and `Section08Footer.test.tsx`:
```tsx
// Section07Conversion.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section07Conversion } from './Section07Conversion';

describe('Section 07 Conversion', () => {
  it('renders conversion headline and functional destination buttons', () => {
    render(<Section07Conversion />);
    expect(screen.getByText(/SIAP MENJELAJAHI DUNIA KELAPA\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Lihat Semua Produk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hubungi Kami/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**
Run: `npx vitest run src/components/sections/Section07Conversion.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement `Section07Conversion.tsx` and `Section08Footer.tsx`**
- `Section07Conversion`:
  - Deep Green background with vibrant Young Coconut Lime accents.
  - Headline: `"SIAP MENJELAJAHI DUNIA KELAPA?"`
  - Subcopy: `"Temukan produk KOKORA dan pilih yang paling sesuai untukmu."`
  - Primary CTA `"Lihat Semua Produk"` (scrolls to catalog).
  - Secondary CTA `"Hubungi Kami"` (verified direct contact link).
- `Section08Footer`:
  - Deep Coconut Green (`#0D241C`) with cream typography.
  - KOKORA logo and brand statement.
  - Signature line: `"BUKAN SEKADAR KELAPA. INI CARA KAMI MELIHATNYA."`
  - Clean semantic navigation, social links, and copyright statement.

- [ ] **Step 4: Run tests to verify they pass**
Run: `npx vitest run src/components/sections/Section07Conversion.test.tsx src/components/sections/Section08Footer.test.tsx`
Expected: PASS

---

### Task 12: App Orchestration, Quality Assurance, Responsiveness & Build Verification

**Files:**
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: All 8 sections, `SmoothScrollProvider`, `Navigation`
- Produces: Full production-ready KOKORA application.

- [ ] **Step 1: Update `src/App.tsx` to assemble all sections into full narrative**
- Wrap with `<SmoothScrollProvider>`.
- Render `<Navigation />`, `<Section01Hero />`, `<Section02Manifesto />`, `<Section03Deconstruct />`, `<Section04Products />`, `<Section05Product3D />`, `<Section06Lifestyle />`, `<Section07Conversion />`, `<Section08Footer />`.

- [ ] **Step 2: Run all test suites**
Run: `npm test -- --run`
Expected: ALL test suites pass (100% green).

- [ ] **Step 3: Production Build and Lint Check**
Run: `npm run build`
Expected: Build succeeds with zero TypeScript or bundling errors; assets generated in `dist/`.

- [ ] **Step 4: Mobile & Accessibility Verification**
- Verify zero horizontal scrollbars on mobile widths (320px, 375px, 768px, 1440px).
- Verify `prefers-reduced-motion` suppresses continuous idle spin and renders clean static representations.
