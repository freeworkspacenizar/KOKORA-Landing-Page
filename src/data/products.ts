export interface ProductHotspot {
  id: string;
  title: string;
  description: string;
  position: [number, number, number]; // [x, y, z] in 3D world space
}

export interface ProductVariant {
  id: string;
  volume: string;
  pricePlaceholder: string;
  scale: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricePlaceholder: string;
  badge?: string;
  isHero?: boolean;
  specs: string[];
  directCtaUrl: string;
  variants?: ProductVariant[];
  hotspots?: ProductHotspot[];
  iconSymbol?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'vco-cold-pressed',
    name: 'Virgin Coconut Oil (VCO) Cold-Pressed',
    tagline: 'Kemurnian Ekstraksi Dingin Pertama',
    description: 'Minyak kelapa murni yang diproses tanpa pemanasan kimia untuk menjaga nutrisi alami, asam laurat, dan aroma segar khas kelapa nusantara.',
    category: 'Perawatan Alami & Nutrisi',
    pricePlaceholder: 'Rp 125.000 (Placeholder)',
    badge: 'Produk Unggulan',
    isHero: true,
    specs: [
      '100% Kelapa Organik Segar',
      'Metode Cold-Pressed Sentrifugasi',
      'Tanpa Bahan Kimia & Pengawet',
      'Kadar Asam Laurat Tinggi'
    ],
    directCtaUrl: 'https://wa.me/?text=Halo%20Toko%20Kelapa,%20saya%20tertarik%20dengan%20Virgin%20Coconut%20Oil',
    variants: [
      {
        id: 'vco-250',
        volume: '250 ml',
        pricePlaceholder: 'Rp 85.000 (Placeholder)',
        scale: 1.0,
      },
      {
        id: 'vco-500',
        volume: '500 ml',
        pricePlaceholder: 'Rp 145.000 (Placeholder)',
        scale: 1.25,
      }
    ],
    hotspots: [
      {
        id: 'cold-extract',
        title: 'Ekstraksi Dingin Pertama',
        description: 'Diproses segera setelah kelapa dipetik melalui proses sentrifugasi steril tanpa kenaikan suhu, menjaga aroma kelapa murni dan bioaktivitas alami.',
        position: [0, 0.4, 0.8],
      },
      {
        id: 'glass-bottle',
        title: 'Kemasan Kaca Daur Ulang',
        description: 'Botol kaca tebal pelindung sinar UV untuk menjaga kualitas asam lemak bebas, dapat didaur ulang dan digunakan kembali.',
        position: [0.75, 0, 0.4],
      },
      {
        id: 'organic-purity',
        title: 'Kemurnian 100% Organik',
        description: 'Berasal dari perkebunan kelapa mitra lokal terstandarisasi bebas pestisida sintetis di pesisir kepulauan Indonesia.',
        position: [-0.65, -0.5, 0.6],
      }
    ]
  },
  {
    id: 'raw-coconut-water',
    name: 'Raw Organic Coconut Water',
    tagline: 'Hidrasi Alami Dari Alam',
    description: 'Air kelapa muda murni yang kaya elektrolit esensial, kalium, dan magnesium untuk memulihkan hidrasi tubuh secara alami dan menyegarkan.',
    category: 'Minuman Segar Alami',
    pricePlaceholder: 'Rp 35.000 (Placeholder)',
    badge: 'Hidrasi Alami',
    specs: [
      'Elektrolit & Kalium Alami',
      'Tanpa Tambahan Gula Sintetis',
      'Kemasan Ramah Lingkungan',
      'Dipetik Langsung Saat Matang Optimal'
    ],
    directCtaUrl: 'https://wa.me/?text=Halo%20Toko%20Kelapa,%20saya%20tertarik%20dengan%20Raw%20Organic%20Coconut%20Water',
  },
  {
    id: 'artisan-coconut-sugar',
    name: 'Artisan Granulated Coconut Sugar',
    tagline: 'Pemanis Alami Beraroma Karamel',
    description: 'Gula kelapa kristal yang dibuat dari nira kelapa segar pilihan oleh pengrajin lokal dengan indeks glikemik rendah dan rasa manis lembut bernuansa karamel.',
    category: 'Pangan & Kuliner Alami',
    pricePlaceholder: 'Rp 45.000 (Placeholder)',
    badge: 'Indeks Glikemik Rendah',
    specs: [
      'Low Glycemic Index (GI)',
      '100% Nira Kelapa Organik',
      'Kaya Mineral & Seng Alami',
      'Alternatif Sehat Pengganti Gula Pasir'
    ],
    directCtaUrl: 'https://wa.me/?text=Halo%20Toko%20Kelapa,%20saya%20tertarik%20dengan%20Artisan%20Granulated%20Coconut%20Sugar',
  },
  {
    id: 'eco-charcoal-briquettes',
    name: 'Eco-Friendly Coconut Shell Charcoal',
    tagline: 'Energi Bersih Dari Limbah Alami',
    description: 'Briket arang tempurung kelapa ramah lingkungan dengan panas tinggi, masa bakar panjang, tanpa asap menyengat dan tanpa bahan kimia berbahaya.',
    category: 'Keberlanjutan & Energi Alami',
    pricePlaceholder: 'Rp 50.000 (Placeholder)',
    badge: 'Nol Limbah (Zero Waste)',
    specs: [
      'Panas Konsisten Hingga 7000 Kcal',
      'Masa Bakar Lebih Dari 2.5 Jam',
      'Rendah Abu (Kurang dari 3%)',
      'Memanfaatkan Tempurung Kelapa Sisa Olahan'
    ],
    directCtaUrl: 'https://wa.me/?text=Halo%20Toko%20Kelapa,%20saya%20tertarik%20dengan%20Eco%20Charcoal%20Briquettes',
  }
];

export const FLAGSHIP_PRODUCT = PRODUCTS[0];
