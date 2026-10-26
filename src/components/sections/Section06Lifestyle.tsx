import React from 'react';
import { Sun, Heart, Coffee } from 'lucide-react';

interface LifestyleStory {
  id: string;
  title: string;
  category: string;
  narrative: string;
  icon: React.ReactNode;
  accentBadge: string;
  emoji: string;
}

export const Section06Lifestyle: React.FC = () => {
  const stories: LifestyleStory[] = [
    {
      id: 'morning-balance',
      title: 'Keseimbangan Alami',
      category: 'Ritual Pagi Hari',
      narrative: 'Memulai hari dengan hidrasi murni air kelapa segar untuk mengembalikan elektrolit alami tubuh setelah istirahat malam.',
      icon: <Sun className="w-5 h-5 text-coconut-husk" />,
      accentBadge: 'Penyegar Alami',
      emoji: '🌅',
    },
    {
      id: 'body-care',
      title: 'Ritual Perawatan Murni',
      category: 'Kesehatan & Kulit',
      narrative: 'Sentuhan minyak kelapa murni (VCO) cold-pressed memberikan kelembapan alami mendalam tanpa bahan kimia aditif sintetis.',
      icon: <Heart className="w-5 h-5 text-coconut-husk" />,
      accentBadge: 'Perawatan Bersih',
      emoji: '🌿',
    },
    {
      id: 'culinary-craft',
      title: 'Dapur Tropis Nusantara',
      category: 'Kreasi Kuliner',
      narrative: 'Gula kelapa kristal artisan menghadirkan rasa manis lembut bernuansa karamel hangat pada seduhan kopi dan hidangan sehat.',
      icon: <Coffee className="w-5 h-5 text-coconut-husk" />,
      accentBadge: 'Pangan Berkelanjutan',
      emoji: '☕',
    },
  ];

  return (
    <section
      id="lifestyle"
      className="relative min-h-screen py-32 px-6 md:px-12 bg-coconut-cream text-coconut-dark overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coconut-husk/10 border border-coconut-husk/20 text-coconut-husk text-xs font-semibold uppercase tracking-widest mb-4">
            Dunia Kelapa & Keseharian
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-coconut-dark leading-[1.08] mb-4">
            BAWA NUANSA ALAMI KE KESEHARIANMU.
          </h2>
          <p className="text-base sm:text-lg text-coconut-dark/75 font-light leading-relaxed">
            Temukan bagaimana produk Toko Kelapa dapat menjadi bagian dari keseharianmu, menghadirkan keselarasan antara alam tropis dan gaya hidup kontemporer.
          </p>
        </div>

        {/* Editorial Storytelling Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white/70 hover:bg-white border border-coconut-husk/15 hover:border-coconut-husk/30 shadow-md hover:shadow-xl transition-all duration-500"
            >
              <div>
                {/* Visual Representation Window */}
                <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-coconut-cream via-white to-coconut-cream/60 flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 border border-coconut-husk/10">
                  <span className="text-6xl drop-shadow-sm select-none">
                    {story.emoji}
                  </span>
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-coconut-dark shadow-sm">
                    {story.icon}
                    <span>{story.category}</span>
                  </div>
                </div>

                <div className="inline-block text-[11px] font-mono uppercase tracking-wider text-coconut-husk font-semibold mb-2">
                  {story.accentBadge}
                </div>

                <h3 className="font-display text-2xl font-bold text-coconut-dark mb-3">
                  {story.title}
                </h3>

                <p className="text-sm text-coconut-dark/80 font-light leading-relaxed">
                  {story.narrative}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-coconut-husk/10 flex items-center justify-between text-xs font-medium text-coconut-dark/70">
                <span>Tradisi Nusantara</span>
                <span className="text-coconut-husk font-bold">100% Organik</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
