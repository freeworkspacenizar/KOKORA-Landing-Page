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
      expect(Array.isArray(prod.specs)).toBe(true);
      expect(prod.directCtaUrl).toContain('https://wa.me');
    });
  });

  it('has a flagship hero product with interactive 3D hotspots', () => {
    expect(FLAGSHIP_PRODUCT.isHero).toBe(true);
    expect(FLAGSHIP_PRODUCT.hotspots).toBeDefined();
    expect(FLAGSHIP_PRODUCT.hotspots?.length).toBeGreaterThanOrEqual(3);
    
    // Check hotspot content matches requirements
    const titles = FLAGSHIP_PRODUCT.hotspots?.map(h => h.title);
    expect(titles).toContain('Ekstraksi Dingin Pertama');
    expect(titles).toContain('Kemasan Kaca Daur Ulang');
    expect(titles).toContain('Kemurnian 100% Organik');
  });

  it('has valid volume variants for flagship product', () => {
    expect(FLAGSHIP_PRODUCT.variants).toBeDefined();
    expect(FLAGSHIP_PRODUCT.variants?.length).toBe(2);
    expect(FLAGSHIP_PRODUCT.variants?.[0].volume).toBe('250 ml');
    expect(FLAGSHIP_PRODUCT.variants?.[1].volume).toBe('500 ml');
  });
});
