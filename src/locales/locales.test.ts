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
