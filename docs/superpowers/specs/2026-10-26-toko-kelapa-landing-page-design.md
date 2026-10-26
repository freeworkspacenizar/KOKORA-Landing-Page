# Design Document — Toko Kelapa Immersive 3D Landing Page

**Date:** 2026-10-26  
**Topic:** Toko Kelapa — Immersive 3D Landing Page (Tropical Modernism meets 3D Storytelling)  
**Status:** Approved & Ready for Implementation Plan  
**Language:** Bahasa Indonesia (Copy & Content) / English & Indonesian (Technical Specs)

---

## 1. Intent & The Why

Toko Kelapa adalah representasi pengalaman digital berstandar internasional (*Awwwards-quality*) yang mengangkat komoditas kelapa Indonesia ke tingkat kemewahan modern (*Tropical Modernism*). Situs ini mentransformasikan buah kelapa dari sekadar bahan baku menjadi karakter tiga dimensi interaktif yang memandu pengunjung memahami nilai alami, proses, hingga produk jadinya.

Tujuan utama:
- Membangun *brand awareness* dan persepsi premium.
- Menghadirkan penemuan produk (*product discovery*) yang taktil dan edukatif melalui dekonstruksi 3D.
- Mendorong konversi tanpa mengorbankan estetika editorial dan kecepatan performa.

---

## 2. Goals, Non-Goals, & Anti-Goals

### Goals
1. **Pusat Visual 3D Taktil:** Objek kelapa 3D fotorealistik di Hero yang dapat diputar bebas (drag-to-rotate), merespons kursor mouse secara halus, dan memiliki pencahayaan PBR yang meyakinkan.
2. **Scroll-Driven Deconstruction (Seksi Signature):** Transisi kamera dan pemisahan komponen kelapa menjadi tampilan terurai (*exploded view*) dengan label anatomi (*Kulit Luar / Sabut*, *Tempurung / Batok*, *Daging Kelapa*, *Air Kelapa*) yang tersinkronisasi mulus dengan scroll maju maupun mundur menggunakan GSAP ScrollTrigger.
3. **Koreografi Editorial Awwwards-Quality:** Tipografi tegas asimetris, pergantian palet *Deep Coconut Green* (#173F32) dan *Coconut Cream* (#F5F0E5), serta animasi teks bertahap (*staggered word reveal*).
4. **Showcase & 3D Product Viewer:** Area eksplorasi produk kelapa bernilai tambah dan studio inspeksi 3D interaktif dengan hotspot informasi.
5. **Aksesibilitas & Performa 60 FPS:** Mendukung penuh `prefers-reduced-motion`, *fallback* statis tanpa WebGL, integrasi *single smooth-scroll engine* (Lenis), serta pembersihan memori (*GPU disposal*) saat tidak terlihat.

### Non-Goals
- Tidak membangun backend transaksi / payment gateway checkout penuh pada tahap ini (CTA mengarah pada kanal pemesanan/kontak terverifikasi seperti WhatsApp & marketplace).
- Tidak mengarang ulasan pelanggan fiktif, klaim medis tanpa uji klinis, sertifikasi ilegal, atau sejarah perusahaan palsu. Data yang belum dikonfirmasi tetap menggunakan penanda *placeholder* yang jelas dan mudah diganti.
- Tidak membangun website e-commerce template berbasis kartu generik.

### Anti-Goals
- Menghindari tata letak SaaS generik (bento grids ungu/neon, gradient blobs acak, tombol rounded berlebihan tanpa konsep).
- Menghindari pergerakan kamera 3D yang tiba-tiba (*jarring*) atau membuat pengguna pusing.
- Menghindari animasi berat yang mengunci scroll atau menghalangi akses ke navigasi dan CTA utama.
- Menghindari penggunaan dua engine smooth-scroll bersamaan (hanya menggunakan Lenis).

---

## 3. Constraints & Design System

### Palet Warna
- **Primary Background:** *Deep Coconut Green* (`#173F32`) — digunakan untuk seksi hero, 3D deconstructed, dan footer imersif.
- **Secondary Background:** *Coconut Cream* (`#F5F0E5`) — digunakan untuk seksi manifesto dan lifestyle editorial.
- **Interactive Accent:** *Young Coconut Lime* (`#B9D957`) — tombol aksi utama, badge interaktif, dan highlight kursor.
- **Natural Accent:** *Coconut Husk Brown* (`#A75B3B`) — aksen serat alami dan garis batas tipis.
- **Pure Dark / Text:** `#0D241C` (teks pada latar krem) & `#FFFFFF` / `#EAE6DC` (teks pada latar hijau tua).

### Tipografi
- **Display Typography:** Editorial serif/display modern dengan karakter kontemporer dan berani (menggunakan *Syne* atau *Clash Display / Fraunces* via Google Fonts).
- **Body & UI Typography:** *Plus Jakarta Sans* — sans-serif modern yang sangat mudah dibaca untuk teks bahasa Indonesia pada berbagai resolusi.

### Layout & Prinsip Spasial
- Grid asimetris editorial dengan ruang bernapas (*negative space*) yang luas.
- Judul oversized yang berinteraksi secara spasial dengan objek 3D.
- Komposisi kontras antara seksi gelap imersif dan seksi terang editorial.

---

## 4. Technical Approaches & Decision

### Pendekatan yang Dipertimbangkan:

1. **Pendekatan 1 (Dipilih): Vite + React + TypeScript + React Three Fiber (R3F) + Drei + GSAP ScrollTrigger + Lenis**
   - *Alasan:* Menghilangkan risiko *hydration mismatch* SSR pada canvas WebGL, memberikan HMR instan saat mengatur shader dan material PBR, serta terintegrasi langsung dengan paket pendukung yang sudah ada di workspace (`@react-three/fiber`, `three`, `gsap`).
   - *Trade-off:* Berjalan sebagai Client-Side Rendered SPA, yang optimal untuk landing page interaktif dengan performa 60 FPS tinggi.

2. **Pendekatan 2: Next.js (App Router) + TypeScript + R3F + GSAP + Lenis**
   - *Alasan tidak dipilih:* Membutuhkan pembungkus `'use client'` dan *dynamic import* (`ssr: false`) pada semua elemen WebGL dan ScrollTrigger untuk mencegah error hidrasi server, memperlambat proses pengembangan interaksi visual.

---

## 5. Architectural Blueprint & Component Structure

### Modul Aplikasi:
```
src/
├── assets/                  # Ikon, tekstur, placeholder media beresolusi tinggi
├── components/
│   ├── 3d/
│   │   ├── CoconutScene.tsx         # Unified WebGL Canvas dengan viewport switching
│   │   ├── CoconutModel.tsx         # Model 3D anatomi kelapa prosedural PBR (Sabut, Tempurung, Daging, Air)
│   │   ├── ProductViewer3D.tsx      # Studio 3D interaktif untuk produk terpilih dengan hotspot
│   │   ├── SceneLighting.tsx        # Studio lighting tropical (Key, Fill, Rim, Ambient)
│   │   └── FallbackPoster.tsx       # Tampilan visual fallback jika WebGL nonaktif / reduced-motion
│   ├── ui/
│   │   ├── Navigation.tsx           # Floating minimalist navbar dengan status blur
│   │   ├── Button.tsx               # Komponen tombol aksesibel dengan hover micro-interaction
│   │   ├── Hotspot.tsx              # Pin interaktif 3D untuk spesifikasi produk
│   │   └── SmoothScrollProvider.tsx # Lenis integration dengan GSAP ticker
│   └── sections/
│       ├── Section01Hero.tsx        # Hero imersif dengan kelapa mengambang bebas & pointer parallax
│       ├── Section02Manifesto.tsx   # Editorial manifesto dengan animasi kata per kata
│       ├── Section03Deconstruct.tsx # Exploded view kelapa dengan label anatomi
│       ├── Section04Products.tsx    # Showcase 4 produk olahan kelapa terkurasi
│       ├── Section05Product3D.tsx   # Studio 3D inspeksi kemasan produk
│       ├── Section06Lifestyle.tsx   # Komposisi visual editorial dunia kelapa alami
│       ├── Section07Conversion.tsx  # Call to Action konversi dengan tombol terverifikasi
│       └── Section08Footer.tsx      # Editorial footer lengkap dengan signature Toko Kelapa
├── hooks/
│   ├── useScrollAnimation.ts        # Hook manajemen timeline ScrollTrigger
│   └── usePrefersReducedMotion.ts   # Deteksi preferensi aksesibilitas
├── data/
│   └── products.ts                  # Mock data produk kelapa dengan penanda placeholder yang jelas
├── styles/
│   └── globals.css                  # Tailwind styles, custom typography, dan CSS variables
├── App.tsx                          # Root orchestrator
└── main.tsx                         # Entry point
```

---

## 6. Detailed Section Specifications

### Seksi 01 — Hero Experience
- **Latar:** *Deep Coconut Green* (`#173F32`).
- **Elemen:**
  - Eyebrow: `DARI ALAM, UNTUK KESEHARIAN`
  - Headline: `"ALAMI. TAPI NGGAK BIASA."`
  - Body: `"Kenali sisi lain kelapa melalui pengalaman yang dirancang untuk menginspirasi."`
  - CTA Utama: `"Jelajahi Produk"` (scroll halus ke Seksi 04)
  - CTA Sekunder: `"Cerita Kami"` (scroll halus ke Seksi 02)
  - Microcopy: `"Geser. Putar. Jelajahi."`
- **Interaksi 3D:**
  - Kelapa berotasi lambat (*idle rotation*).
  - Merespons posisi kursor mouse secara halus (*camera parallax* terbatas).
  - Dukungan interaksi putar manual (*drag-to-rotate*) dengan redaman natural (*damping*).
  - Teks headline muncul dengan *staggered entrance* GSAP.

### Seksi 02 — Brand Manifesto
- **Latar:** *Coconut Cream* (`#F5F0E5`), teks *Deep Green* (`#0D241C`).
- **Elemen:**
  - Headline: `"LEBIH DARI SEKADAR KELAPA."`
  - Body: `"Setiap kelapa punya cerita. Kami ingin menghadirkannya dengan cara yang lebih dekat, lebih relevan, dan lebih menarik untuk keseharian."`
  - Desain editorial asimetris dengan fragmen sabut kelapa mengambang halus.
  - Teks headline terungkap kata demi kata (*word-by-word reveal*) saat discroll.

### Seksi 03 — The Coconut, Deconstructed (Signature 3D Experience)
- **Latar:** *Deep Coconut Green* (`#173F32`).
- **Elemen:**
  - Headline: `"SATU KELAPA. BEGITU BANYAK CERITA."`
  - Body: `"Jelajahi lapisan, tekstur, dan karakter kelapa dalam pengalaman tiga dimensi."`
  - 4 Komponen Anatomi Kelapa:
    1. **Kulit Luar & Sabut (Outer Husk & Coir):** Tekstur serat kasar, warna hijau kecokelatan alami.
    2. **Tempurung (Hard Shell):** Cangkang keras warna cokelat tua dengan guratan mata kelapa.
    3. **Daging Kelapa (White Flesh):** Lapisan putih susu bersih dengan sedikit kilau segar (*subsurface look*).
    4. **Air Kelapa (Coconut Water):** Elemen bola cairan transparan dengan pembiasan cahaya (*refraction/specular highlight*).
- **Alur Scroll (GSAP ScrollTrigger Pinned Sequence):**
  - Kamera bergerak mendekati kelapa utuh.
  - Objek membelah dan terpisah secara berjarak (*exploded composition*) sepanjang sumbu ruang.
  - Kartu label anatomi muncul selaras dengan masing-masing bagian: `"KULIT LUAR"`, `"TEMPURUNG"`, `"DAGING KELAPA"`, `"AIR KELAPA"`.
  - Saat scroll berlanjut, komponen perlahan merapat kembali menuju transisi seksi berikutnya.

### Seksi 04 — From Nature to Product
- **Latar:** *Coconut Cream* (`#F5F0E5`).
- **Headline:** `"DARI KELAPA, MENJADI PILIHANMU."`
- **Subheadline:** `"Temukan produk yang sesuai dengan kebutuhanmu."`
- **Katalog 4 Produk Pilihan (Placeholder Terkurasi):**
  1. *Virgin Coconut Oil (VCO) Cold-Pressed* (Flagship Hero) — Minyak kelapa murni diproses dingin untuk perawatan alami dan konsumsi sehat.
  2. *Raw Organic Coconut Water* — Kesegaran hidrasi alami murni tanpa pemanis tambahan.
  3. *Artisan Granulated Coconut Sugar* — Gula kelapa kristal nira alami dengan indeks glikemik rendah.
  4. *Eco-Friendly Coconut Shell Charcoal* — Briket arang tempurung ramah lingkungan berkualitas ekspor.
- **Interaksi:** Hover card produk menampilkan elevasi halus, highlight spesifikasi, tombol aksi pemesanan langsung (*Direct CTA* ke WhatsApp/kontak), serta tombol `"Inspeksi 3D"` khusus pada produk unggulan (VCO) yang menggulir mulus ke Seksi 05.

### Seksi 05 — Product in 3D (Interactive Studio Viewer — Flagship Hero Product)
- **Latar:** Studio neutral dark green dengan pencahayaan studio terarah (*three-point lighting* + ambient occluded floor).
- **Fokus Produk:** 1 Produk Unggulan Utama (*Flagship Hero*: Botol Kaca *Virgin Coconut Oil*).
- **Fitur & Kontrol:**
  - Model 3D kemasan botol kaca *apothecary* premium prosedural (material kaca refraktif dengan IOR 1.5, cairan emas bening, penutup kayu kelapa alami, dan label timbul minimalis), dengan arsitektur loader yang siap menerima file `.glb` eksternal.
  - Tiga Titik Hotspot Interaktif yang dapat diklik:
    1. *Ekstraksi Dingin Pertama:* Menjelaskan proses sentrifugasi tanpa pemanasan kimia.
    2. *Kemasan Kaca Daur Ulang:* Menjelaskan komitmen keberlanjutan dan proteksi sinar UV.
    3. *Kemurnian 100% Organik:* Menjelaskan sertifikasi dan transparansi bahan baku.
  - Selektor Varian Ukuran: Pilihan volume kemasan (*250 ml* dan *500 ml*) yang memicu transisi skala halus pada botol.
  - Tombol Kontrol Studio: *Drag to rotate 360°*, *Reset View*, serta *CTA* langsung `"Pesan Botol Ini"` yang terhubung ke kanal pemesanan.

### Seksi 06 — Lifestyle & Brand World
- **Latar:** *Coconut Cream* (`#F5F0E5`).
- **Headline:** `"BAWA NUANSA ALAMI KE KESEHARIANMU."`
- **Subheadline:** `"Temukan bagaimana produk Toko Kelapa dapat menjadi bagian dari keseharianmu."`
- **Visual:** Komposisi editorial fotografi bernuansa tropis alami, sinar matahari hangat, dan tekstur organik.

### Seksi 07 — Conversion Call to Action
- **Latar:** *Deep Coconut Green* dengan aksen *Young Coconut Lime* (`#B9D957`).
- **Headline:** `"SIAP MENJELAJAHI DUNIA KELAPA?"`
- **Subheadline:** `"Temukan produk Toko Kelapa dan pilih yang paling sesuai untukmu."`
- **Tombol Aksi:**
  - Utama: `"Lihat Semua Produk"` (menghubungkan ke katalog lengkap / WhatsApp pemesanan).
  - Sekunder: `"Hubungi Kami"` (menghubungkan ke saluran kontak langsung).

### Seksi 08 — Editorial Footer
- **Latar:** *Deep Coconut Green* (`#0D241C` / `#173F32`) dengan tipografi krem.
- **Elemen:**
  - Logo & Pernyataan Merek Toko Kelapa.
  - Signature: `"BUKAN SEKADAR KELAPA. INI CARA KAMI MELIHATNYA."`
  - Navigasi Cepat (Hero, Cerita, Dekonstruksi, Produk, Kontak).
  - Tautan media sosial terverifikasi dan hak cipta.

---

## 7. Motion & Accessibility System

1. **GSAP + Lenis Integration:**
   - Lenis menangani *smooth scrolling* secara global.
   - Sinkronisasi dilakukan lewat `gsap.ticker.add((time) => lenis.raf(time * 1000))` dan mematikan `lagSmoothing`.
2. **Aksesibilitas (`prefers-reduced-motion: reduce`):**
   - Animasi rotasi otomatis dan pergerakan kamera dinonaktifkan.
   - Posisi objek 3D langsung disajikan dalam status statis yang elegan.
   - Teks transisi langsung tampil tanpa efek *split-text* yang memusingkan.
3. **Pembersihan Sumber Daya GPU:**
   - Deteksi *Intersection Observer* untuk menghentikan loop rendering saat kanvas 3D berada di luar viewport aktif.
   - Menjalankan fungsi `dispose()` pada geometri, material, dan tekstur saat unmount.

---

## 8. What's Left to the Builder

- Pembentukan formula matematika spesifik (noise generator) untuk tekstur sabut kelapa prosedural dan bump map tempurung pada material Three.js PBR.
- Penyesuaian nilai FOV kamera dan rasio aspek pada layar mobile (< 768px) agar objek 3D tidak terpotong.
- Integrasi ikon Solar melalui Iconify / SVG murni untuk antarmuka yang bersih.
- Pengaturan token Tailwind CSS yang terhubung langsung dengan CSS variables sistem desain.
