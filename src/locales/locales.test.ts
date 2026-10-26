import { describe, it, expect } from 'vitest';
import { localeID } from './id';
import { localeEN } from './en';

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

    // Verify sub-key parity
    expect(Object.keys(localeEN.nav)).toEqual(Object.keys(localeID.nav));
    expect(Object.keys(localeEN.hero)).toEqual(Object.keys(localeID.hero));
    expect(Object.keys(localeEN.manifesto)).toEqual(Object.keys(localeID.manifesto));
    expect(Object.keys(localeEN.deconstruct)).toEqual(Object.keys(localeID.deconstruct));
    expect(Object.keys(localeEN.products.items)).toEqual(Object.keys(localeID.products.items));
    expect(Object.keys(localeEN.studio3d.hotspots)).toEqual(Object.keys(localeID.studio3d.hotspots));
  });
});

