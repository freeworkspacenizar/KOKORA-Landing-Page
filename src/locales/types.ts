export interface NavLocale {
  cerita: string;
  dekonstruksi: string;
  katalog: string;
  studio3d: string;
  lifestyle: string;
  hubungiKami: string;
  menuAria: string;
}

export interface HeroLocale {
  eyebrow: string;
  headlineLine1: string;
  headlineAccent: string;
  headlineLine2: string;
  subcopy: string;
  primaryCta: string;
  secondaryCta: string;
  microcopy: string;
  scrollDownAria: string;
}

export interface ManifestoPillarLocale {
  title: string;
  description: string;
}

export interface ManifestoLocale {
  badge: string;
  title: string;
  fullSentence: string;
  statement1: string;
  statement2: string;
  statement3: string;
  pillars: [ManifestoPillarLocale, ManifestoPillarLocale, ManifestoPillarLocale];
}

export interface AnatomyCardLocale {
  id: string;
  label: string;
  sublabel: string;
  description: string;
}

export interface DeconstructLocale {
  badge: string;
  title: string;
  subtitle: string;
  cards: AnatomyCardLocale[];
}

export interface ProductItemLocale {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  specs: string[];
}

export interface ProductsLocale {
  badge: string;
  title: string;
  subtitle: string;
  orderCta: string;
  view3dCta: string;
  items: Record<string, ProductItemLocale>;
}

export interface StudioHotspotLocale {
  id: string;
  title: string;
  category: string;
  description: string;
}

export interface Studio3DLocale {
  badge: string;
  heading: string;
  subheading: string;
  selectVolume: string;
  viewDetails: string;
  rotateNotice: string;
  orderWhatsApp: string;
  hotspots: Record<string, StudioHotspotLocale>;
}

export interface LifestyleStoryLocale {
  id: string;
  tag: string;
  title: string;
  description: string;
}

export interface LifestyleLocale {
  badge: string;
  title: string;
  subtitle: string;
  stories: LifestyleStoryLocale[];
}

export interface ConversionLocale {
  eyebrow: string;
  headline: string;
  supporting: string;
  ctaText: string;
  guaranteeText: string;
  whatsappMessage: string;
}

export interface FooterLocale {
  motto: string;
  signatureLabel: string;
  signatureQuote: string;
  colExploration: string;
  colContact: string;
  colSocial: string;
  linkHome: string;
  linkManifesto: string;
  linkDeconstruct: string;
  linkCatalog: string;
  linkStudio: string;
  linkPrivacy: string;
  linkTerms: string;
  rights: string;
}

export interface LocaleDictionary {
  nav: NavLocale;
  hero: HeroLocale;
  manifesto: ManifestoLocale;
  deconstruct: DeconstructLocale;
  products: ProductsLocale;
  studio3d: Studio3DLocale;
  lifestyle: LifestyleLocale;
  conversion: ConversionLocale;
  footer: FooterLocale;
}
