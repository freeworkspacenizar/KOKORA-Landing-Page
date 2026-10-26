# Bilingual Language Switcher (Indonesian & English) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an Awwwards-caliber bilingual language switcher (Bahasa Indonesia & English) across all 8 editorial sections, navigation, product catalog, 3D hotspots, and conversion flows with zero WebGL interruption and zero layout shift.

**Architecture:** A native type-safe React Context (`LanguageContext`) managing `'id' | 'en'` state, initialized from `localStorage` or `navigator.language`. Strongly typed translation dictionaries (`src/locales/id.ts` and `src/locales/en.ts`) guarantee 100% key parity at compile time. A minimalist pill-shaped UI control (`LanguageSwitcher`) integrates into the floating navbar and mobile drawer menu, updating content in-place and calling `ScrollTrigger.refresh()` without unmounting 3D canvases.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Three.js, React Three Fiber, GSAP ScrollTrigger, Lenis, Vitest, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-26-language-switcher-design.md`

## Global Constraints

- Zero external runtime npm dependencies added.
- In-place reactive text updates: `<Canvas>` components (`CoconutModel` and `VcoBottleModel`) must never unmount or lose WebGL context.
- Single source of truth for technical data: 3D spatial vectors, product IDs, prices, and phone numbers remain strictly in `src/data/products.ts`.
- 100% compile-time type safety via `LocaleDictionary` interface.
- Preserve 100% passing status on all 14 existing unit and integration test files.

## Review Focus

1. **R3F Hotspot Reactivity**: Switching locale while viewing the Section 05 3D Studio must update `<Html>` hotspot annotations without causing WebGL canvas re-mounting or stutter.
2. **ScrollTrigger Geometry Invalidation**: Character length differences between ID and EN must trigger `ScrollTrigger.refresh()` so pinned scrub sequences in Section 02 and Section 03 do not desynchronize.
3. **Storage Fallback & SSR Safety**: Gracefully handle environments where `localStorage` is unavailable or throws a SecurityError (e.g., incognito or restricted webviews).
4. **Accessible Keyboard & Screen Reader States**: The language toggle must expose appropriate `aria-pressed` attributes and handle standard `Enter` and `Space` keystrokes.
5. **Mobile Drawer Synchronicity**: Changing language in the mobile menu drawer must immediately reflect in both the drawer and desktop navbar states.

---

### Task 1: Type-Safe Locale Schema & Indonesian Dictionary

**Files:**
- Create: `src/locales/types.ts`
- Create: `src/locales/id.ts`
- Test: `src/locales/locales.test.ts`

**Interfaces:**
- Produces: `LocaleDictionary` (TypeScript interface), `localeID: LocaleDictionary`

- [ ] **Step 1: Write unit tests verifying dictionary structure and non-empty strings**

```typescript
// src/locales/locales.test.ts
import { describe, it, expect } from 'vitest';
import { localeID } from './id';

describe('Locale Dictionary - Indonesian (ID)', () => {
  it('contains valid navigation labels', () => {
    expect(localeID.nav.cerita).toBe('Cerita');
    expect(localeID.nav.dekonstruksi).toBe('Dekonstruksi');
    expect(localeID.nav.katalog).toBe('Katalog');
    expect(localeID.nav.studio3d).toBe('Studio 3D');
    expect(localeID.nav.lifestyle).toBe('Lifestyle');
    expect(localeID.nav.hubungiKami).toBe('Hubungi Kami');
  });

  it('contains non-empty copy for all 8 sections', () => {
    expect(localeID.hero.headlineLine1).toBeTruthy();
    expect(localeID.manifesto.title).toBeTruthy();
    expect(localeID.deconstruct.title).toBeTruthy();
    expect(localeID.studio3d.heading).toBeTruthy();
    expect(localeID.conversion.headline).toBeTruthy();
    expect(localeID.footer.rights).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/locales/locales.test.ts`
Expected: FAIL with "Cannot find module './id'"

- [ ] **Step 3: Define `LocaleDictionary` interface and implement `localeID`**

Create `src/locales/types.ts` defining all keys matching the existing UI components:
`nav`, `hero`, `manifesto`, `deconstruct`, `products`, `studio3d`, `lifestyle`, `conversion`, `footer`.
Create `src/locales/id.ts` populating all exact Indonesian copy currently in the application.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/locales/locales.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/locales/types.ts src/locales/id.ts src/locales/locales.test.ts
git commit -m "feat(i18n): define type-safe locale schema and complete Indonesian dictionary"
```

---

### Task 2: High-End Editorial English Dictionary

**Files:**
- Create: `src/locales/en.ts`
- Modify: `src/locales/locales.test.ts`

**Interfaces:**
- Consumes: `LocaleDictionary` from `src/locales/types.ts`
- Produces: `localeEN: LocaleDictionary`

- [ ] **Step 1: Write test verifying English dictionary completeness and key parity**

```typescript
// Add to src/locales/locales.test.ts
import { localeEN } from './en';

describe('Locale Dictionary - English (EN)', () => {
  it('contains valid English navigation labels', () => {
    expect(localeEN.nav.cerita).toBe('Story');
    expect(localeEN.nav.dekonstruksi).toBe('Deconstruct');
    expect(localeEN.nav.katalog).toBe('Catalog');
    expect(localeEN.nav.studio3d).toBe('3D Studio');
    expect(localeEN.nav.lifestyle).toBe('Lifestyle');
    expect(localeEN.nav.hubungiKami).toBe('Contact Us');
  });

  it('matches all keys of the Indonesian dictionary exactly', () => {
    const idKeys = Object.keys(localeID);
    const enKeys = Object.keys(localeEN);
    expect(enKeys).toEqual(idKeys);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/locales/locales.test.ts`
Expected: FAIL with "Cannot find module './en'"

- [ ] **Step 3: Implement `localeEN` in `src/locales/en.ts`**

Draft poetic, luxurious, Awwwards-quality English copy that matches the Indonesian structure without robotic direct translation.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/locales/locales.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/locales/en.ts src/locales/locales.test.ts
git commit -m "feat(i18n): add editorial English dictionary with 100% key parity"
```

---

### Task 3: Language Context & Provider with Persistence & Tests

**Files:**
- Create: `src/context/LanguageContext.tsx`
- Test: `src/context/LanguageContext.test.tsx`

**Interfaces:**
- Consumes: `localeID`, `localeEN`, `LocaleDictionary`
- Produces: `LanguageProvider`, `useLanguage(): { locale, setLocale, toggleLocale, t }`

- [ ] **Step 1: Write unit tests for `LanguageProvider` and `useLanguage` hook**

```typescript
// src/context/LanguageContext.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';

const TestConsumer: React.FC = () => {
  const { locale, toggleLocale, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-locale">{locale}</span>
      <span data-testid="nav-story">{t.nav.cerita}</span>
      <button onClick={toggleLocale} data-testid="toggle-btn">Toggle</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'id';
  });

  it('defaults to Indonesian (ID) and provides Indonesian copy', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('current-locale')).toHaveTextContent('id');
    expect(screen.getByTestId('nav-story')).toHaveTextContent('Cerita');
  });

  it('toggles locale to English and persists in localStorage and html lang attribute', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    act(() => {
      screen.getByTestId('toggle-btn').click();
    });
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(screen.getByTestId('nav-story')).toHaveTextContent('Story');
    expect(localStorage.getItem('toko_kelapa_lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/context/LanguageContext.test.tsx`
Expected: FAIL with "Cannot find module './LanguageContext'"

- [ ] **Step 3: Implement `LanguageContext.tsx`**

Implement `LanguageProvider` with `localStorage` try/catch wrapper, `navigator.language` fallback, `document.documentElement.lang` sync, and `ScrollTrigger.refresh()` deferred trigger.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/context/LanguageContext.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/context/LanguageContext.tsx src/context/LanguageContext.test.tsx
git commit -m "feat(i18n): create LanguageContext provider with storage persistence and ScrollTrigger refresh"
```

---

### Task 4: Minimalist Editorial Language Switcher UI Component

**Files:**
- Create: `src/components/ui/LanguageSwitcher.tsx`
- Test: `src/components/ui/LanguageSwitcher.test.tsx`

**Interfaces:**
- Consumes: `useLanguage` from `src/context/LanguageContext`
- Produces: `LanguageSwitcher: React.FC<{ className?: string }>`

- [ ] **Step 1: Write test for `LanguageSwitcher` accessibility and interaction**

```typescript
// src/components/ui/LanguageSwitcher.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

describe('LanguageSwitcher Component', () => {
  it('renders ID and EN buttons with proper aria attributes', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    const idBtn = screen.getByRole('button', { name: /Bahasa Indonesia/i });
    const enBtn = screen.getByRole('button', { name: /English/i });

    expect(idBtn).toHaveAttribute('aria-pressed', 'true');
    expect(enBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches active state when clicking EN button', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: /English/i });
    fireEvent.click(enBtn);

    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/LanguageSwitcher.test.tsx`
Expected: FAIL with "Cannot find module './LanguageSwitcher'"

- [ ] **Step 3: Implement `LanguageSwitcher.tsx`**

Build the pill-shaped editorial control using Tailwind, smooth background active indicators, and explicit ARIA labels.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ui/LanguageSwitcher.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/LanguageSwitcher.tsx src/components/ui/LanguageSwitcher.test.tsx
git commit -m "feat(ui): implement accessible minimalist LanguageSwitcher pill component"
```

---

### Task 5: Integration in Navigation Header & Mobile Menu Drawer

**Files:**
- Modify: `src/components/ui/Navigation.tsx`
- Modify: `src/components/ui/Navigation.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `LanguageSwitcher`

- [ ] **Step 1: Update `Navigation.test.tsx` to verify localized links and language switcher**

Verify that `Navigation` displays translated links when language changes.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ui/Navigation.test.tsx`
Expected: FAIL if `LanguageProvider` wrapper missing or links still hardcoded.

- [ ] **Step 3: Integrate `useLanguage` and `LanguageSwitcher` in `Navigation.tsx`**

Replace hardcoded nav array with `t.nav` translations; mount `<LanguageSwitcher />` in desktop header and mobile drawer.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/ui/Navigation.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Navigation.tsx src/components/ui/Navigation.test.tsx
git commit -m "feat(nav): embed LanguageSwitcher and localized links in Navigation and mobile drawer"
```

---

### Task 6: Bilingual Integration for Hero & Brand Manifesto

**Files:**
- Modify: `src/components/sections/Section01Hero.tsx`
- Modify: `src/components/sections/Section01Hero.test.tsx`
- Modify: `src/components/sections/Section02Manifesto.tsx`
- Modify: `src/components/sections/Section02Manifesto.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()` -> `t.hero`, `t.manifesto`

- [ ] **Step 1: Update tests to verify localized rendering in Hero & Manifesto**

Assert that Hero and Manifesto render translations and that assistive technology `aria-label` reflects current language.

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/components/sections/Section01Hero.test.tsx src/components/sections/Section02Manifesto.test.tsx`
Expected: FAIL or mismatch when wrapped in English context.

- [ ] **Step 3: Wire `t.hero` and `t.manifesto` into components**

Update `Section01Hero.tsx` and `Section02Manifesto.tsx` to consume dynamic localized strings. Re-trigger GSAP word splitting on locale change without remounting 3D scene.

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run src/components/sections/Section01Hero.test.tsx src/components/sections/Section02Manifesto.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Section01Hero.tsx src/components/sections/Section01Hero.test.tsx src/components/sections/Section02Manifesto.tsx src/components/sections/Section02Manifesto.test.tsx
git commit -m "feat(sections): localize Hero and Brand Manifesto with reactive word reveal"
```

---

### Task 7: Bilingual Integration for 3D Deconstructed Coconut & Product Catalog

**Files:**
- Modify: `src/components/sections/Section03Deconstruct.tsx`
- Modify: `src/components/sections/Section03Deconstruct.test.tsx`
- Modify: `src/components/sections/Section04Products.tsx`
- Modify: `src/components/ui/ProductCard.tsx`
- Modify: `src/components/sections/Section04Products.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()` -> `t.deconstruct`, `t.products`

- [ ] **Step 1: Update tests in Section 03 & Section 04 for bilingual assertions**

Verify anatomy cards and product cards render English values when locale is set to `en`.

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/components/sections/Section03Deconstruct.test.tsx src/components/sections/Section04Products.test.tsx`
Expected: FAIL

- [ ] **Step 3: Implement localization in Section 03 & Section 04**

Connect `t.deconstruct.cards` to the scrubbed anatomy sequence and merge `t.products.items` with technical metadata in `ProductCard.tsx`.

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run src/components/sections/Section03Deconstruct.test.tsx src/components/sections/Section04Products.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Section03Deconstruct.tsx src/components/sections/Section03Deconstruct.test.tsx src/components/sections/Section04Products.tsx src/components/ui/ProductCard.tsx src/components/sections/Section04Products.test.tsx
git commit -m "feat(sections): localize 3D Deconstructed Coconut anatomy and Product Catalog"
```

---

### Task 8: Bilingual Integration for 3D Studio, Lifestyle, Conversion CTA & Footer

**Files:**
- Modify: `src/components/sections/Section05Product3D.tsx`
- Modify: `src/components/3d/VcoBottleModel.tsx`
- Modify: `src/components/sections/Section06Lifestyle.tsx`
- Modify: `src/components/sections/Section07Conversion.tsx`
- Modify: `src/components/sections/Section08Footer.tsx`
- Modify: `src/components/sections/Section05Product3D.test.tsx`
- Modify: `src/components/sections/Section06Lifestyle.test.tsx`
- Modify: `src/components/sections/Section07Conversion.test.tsx`
- Modify: `src/components/sections/Section08Footer.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()` -> `t.studio3d`, `t.lifestyle`, `t.conversion`, `t.footer`

- [ ] **Step 1: Update unit tests for Sections 5, 6, 7, and 8**

Ensure tests verify both Indonesian baseline and English localized texts.

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run src/components/sections/Section05Product3D.test.tsx src/components/sections/Section06Lifestyle.test.tsx src/components/sections/Section07Conversion.test.tsx src/components/sections/Section08Footer.test.tsx`
Expected: FAIL

- [ ] **Step 3: Connect localized strings across remaining sections**

Pass localized hotspot titles and descriptions into `<VcoBottleModel>` props without unmounting `<Canvas>`. Update lifestyle cards, conversion CTAs, and footer sitemap links.

- [ ] **Step 4: Run tests to verify pass**

Run: `npx vitest run src/components/sections/Section05Product3D.test.tsx src/components/sections/Section06Lifestyle.test.tsx src/components/sections/Section07Conversion.test.tsx src/components/sections/Section08Footer.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Section05Product3D.tsx src/components/3d/VcoBottleModel.tsx src/components/sections/Section06Lifestyle.tsx src/components/sections/Section07Conversion.tsx src/components/sections/Section08Footer.tsx src/components/sections/Section05Product3D.test.tsx src/components/sections/Section06Lifestyle.test.tsx src/components/sections/Section07Conversion.test.tsx src/components/sections/Section08Footer.test.tsx
git commit -m "feat(sections): localize 3D Studio hotspots, Lifestyle stories, Conversion CTA, and Footer"
```

---

### Task 9: Full End-to-End Orchestration, Test Suite Verification & Production Build

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Wraps app with `LanguageProvider` at root level.

- [ ] **Step 1: Update `App.test.tsx` to verify root provider and language switching across the entire page**

Test that toggling language via navigation switches headlines across multiple sections simultaneously without breaking document flow.

- [ ] **Step 2: Wrap `App.tsx` with `LanguageProvider`**

Ensure `LanguageProvider` wraps `SmoothScrollProvider` and all 8 sections.

- [ ] **Step 3: Run entire test suite**

Run: `npm test`
Expected: PASS across all 15+ test files with 100% green tests.

- [ ] **Step 4: Run production build and bundle size verification**

Run: `npm run build`
Expected: Build succeeds cleanly with zero TypeScript or bundling errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat(orchestration): wrap App with LanguageProvider and verify end-to-end bilingual flow"
```
