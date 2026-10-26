# Design Specification: Bilingual Language Switcher (Indonesian & English)

**Project:** Toko Kelapa  
**Date:** 2026-10-26  
**Status:** Approved for Implementation Planning  
**Authors:** Antigravity Engineering & Design Pair

---

## 1. Intent and The Why

Toko Kelapa's digital identity blends tropical Indonesian heritage with high-concept, Awwwards-caliber digital craftsmanship. Currently, all user-facing content is exclusively in Bahasa Indonesia. 

To expand the brand's international presence, welcome global visitors, and facilitate export/partnership inquiries without sacrificing its authentic Indonesian roots, Toko Kelapa requires a seamless, editorial-grade bilingual language switcher supporting:
- **Bahasa Indonesia (ID)**: Primary authentic voice of the archipelago.
- **English (EN)**: Sophisticated, editorial-grade tone tailored for international connoisseurs, hospitality partners, and global consumers.

The language switch occurs in-place, without page reloads, without dropping or restarting WebGL 3D rendering loops, and without disrupting the Lenis smooth-scroll timeline.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- **Full-Spectrum Translation**: Translate all 8 editorial sections, navigation, product catalog, 3D hotspots, lifestyle vignettes, WhatsApp order templates, and footer.
- **Zero-Friction In-Place Transition**: Instant reactivity using React Context and memoized locale objects. No full-page reload or URL jump.
- **Editorial Tone of Voice**: English copy must not read like mechanical machine translation. It must match the refined, poetic, and luxurious rhythm of the Indonesian original.
- **Minimalist Awwwards-Quality UI**: A sleek, pill-shaped toggle (`ID | EN`) integrated directly into the floating desktop navbar and mobile drawer, featuring subtle active indicators and smooth hover states.
- **State Persistence & Detection**: Persist user language choice in `localStorage` (`toko_kelapa_lang`), falling back gracefully to browser language detection (`navigator.language`).
- **Strict TypeScript Parity**: 100% compile-time type safety (`LocaleDictionary` interface). If an English key is omitted or mistyped, the TypeScript build fails immediately.
- **Accessibility (A11y)**: Standard ARIA attributes (`role="group"`, `aria-label="Pilih Bahasa / Select Language"`, `aria-pressed="true/false"`), keyboard navigation (`Tab` + `Enter`/`Space`), and visible focus rings.

### Non-Goals
- Adding more than two languages (no multilingual dropdown or flag icons, which clutter editorial aesthetics).
- Route-based URL subpaths (e.g. `/en/` or `/#/en`). The site remains a focused single-page narrative.
- External CMS or backend translation microservices. Translations are co-located in repository code for zero latency and build-time verification.

### Anti-Goals
- **No WebGL resets**: Switching language must never unmount `<Canvas>` elements (`CoconutModel` or `VcoBottleModel`) or drop WebGL contexts. Localized strings are passed as reactive props into R3F HTML overlays.
- **No jarring layout shifts**: Button widths and typography containers must accommodate character length differences between Indonesian and English without clipping or wrapping awkwardly.

---

## 3. Constraints

1. **Stack Alignment**: Vite, React 19, TypeScript, Tailwind CSS, Three.js, React Three Fiber, GSAP, Lenis.
2. **Performance**: Zero external npm dependencies added. The dictionary bundle overhead must remain under 6 KB gzip.
3. **ScrollTrigger Compatibility**: Changing language replaces text inside DOM nodes. `ScrollTrigger.refresh()` is called after locale changes to update trigger heights.
4. **Test Coverage**: 100% green test suite across all 14 existing test files, with new unit tests for `LanguageContext` and language switching behavior.

---

## 4. Architectural Approaches Considered

### Approach 1: Native Type-Safe React Context (`LanguageContext` + TypeScript Dictionary) — **SELECTED**
- **Architecture**: A custom `LanguageProvider` managing `locale` state (`'id' | 'en'`), delivering typed dictionary `t` via `useLanguage()`.
- **Trade-offs**:
  - *Pros*: Zero external npm dependencies, strict compile-time verification of every translation key, instant in-place updates, zero WebGL disruption.
  - *Cons*: Code-hosted translation files require code commits to update copy (ideal for this repository).
- **Decision**: Selected by the user for optimal 60 FPS performance, type safety, and minimal bundle overhead.

### Approach 2: Third-Party i18n Library (`i18next` + `react-i18next`)
- **Decision**: Rejected as excessive for an 8-section editorial landing page.

### Approach 3: URL Route-Based Routing (`/id` vs `/en`)
- **Decision**: Rejected to protect Awwwards-tier smooth motion and 3D continuity.

---

## 5. System Design & Component Structure

### 5.1 Architecture & Single Source of Truth
- `src/data/products.ts` remains the single source of truth for technical 3D vector coordinates (`position`, `scale`), product IDs, prices, volumes, and WhatsApp numbers.
- `LocaleDictionary` provides text translations for product titles, taglines, descriptions, specifications, and 3D hotspot labels keyed by product/hotspot IDs.

### 5.2 Locale Schema (`src/locales/types.ts`)
A comprehensive TypeScript interface `LocaleDictionary` strictly mirroring the existing UI architecture:
- `nav`: Navigation links (`cerita`, `dekonstruksi`, `katalog`, `studio3d`, `lifestyle`), CTAs (`hubungiKami`), mobile menu labels.
- `hero`: Eyebrow, headline line 1, headline accent, headline line 2, supporting copy, primary CTA, secondary CTA, interaction cue ("Geser. Putar. Jelajahi.").
- `manifesto`: Section badge, word-reveal sentence, and the 3 brand pillars (`kemurnian`, `kearifan`, `keberlanjutan`).
- `deconstruct`: Section badge, title, subtitle, anatomy cards (4 parts: `kulit-luar`, `tempurung`, `daging-kelapa`, `air-kelapa` with `label`, `sublabel`, `description`).
- `products`: Section badge, title, subtitle, order CTA, view 3D CTA, localized product content keyed by ID.
- `studio3d`: Flagship product heading, badges, variant labels (250 ml, 500 ml), localized hotspot labels (`coldPressed`, `amberGlass`, `naturalSeal`), checkout CTA.
- `lifestyle`: Section badge, title, subtitle, 3 narrative stories (`tag`, `title`, `description`).
- `conversion`: Eyebrow, headline ("SIAP MENJELAJAHI DUNIA KELAPA?" / "READY TO EXPERIENCE PURE COCONUT?"), supporting copy, order CTA, WhatsApp prefilled message.
- `footer`: Brand motto, signature manifesto quote, exploration column, contact column, copyright.

### 5.3 Context & Provider (`src/context/LanguageContext.tsx`)
```typescript
export type Locale = 'id' | 'en';

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: LocaleDictionary;
}
```
- Initializes from `localStorage.getItem('toko_kelapa_lang')` or detects via `navigator.language.startsWith('id') ? 'id' : 'en'`.
- On change, updates document `lang` attribute (`document.documentElement.lang = locale`), persists to `localStorage`, and triggers `ScrollTrigger.refresh()`.

### 5.4 UI Control: Language Switcher (`src/components/ui/LanguageSwitcher.tsx`)
- Minimalist editorial pill design:
  ```html
  <div role="group" aria-label="Pilih Bahasa / Select Language" class="inline-flex items-center rounded-full p-0.5 bg-coconut-cream/10 border border-coconut-cream/15 backdrop-blur-sm text-xs font-semibold">
    <button aria-pressed={locale === 'id'} class="px-2.5 py-1 rounded-full transition-all ...">ID</button>
    <button aria-pressed={locale === 'en'} class="px-2.5 py-1 rounded-full transition-all ...">EN</button>
  </div>
  ```
- Positioned in `Navigation.tsx` directly adjacent to the "Hubungi Kami / Contact Us" CTA on desktop, and featured prominently inside the mobile drawer menu.

---

## 6. Builder Rulings (Sized & Settled)

1. **R3F WebGL Canvas Stability**: The anti-goal prohibits unmounting `<Canvas>` or recreating WebGL contexts. Localized hotspot annotations are passed as props to `<VcoBottleModel>` and rendered via `@react-three/drei`'s `<Html>`, which safely updates without WebGL rebuilds.
2. **Component Architecture Preservation**: Schema matches existing component structures and test contracts (`Section02Manifesto`, `Section05Product3D`, `Section07Conversion`) to ensure all existing test suites remain 100% green.
3. **Data Source Single Source of Truth**: Spatial 3D coordinates and numerical metadata remain in `src/data/products.ts`, while `LocaleDictionary` supplies localized text strings.
4. **Footer Scope**: Static text strings in `Section08Footer.tsx` are fully localized; no superfluous live clock is added.
