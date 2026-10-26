import React from 'react';
import { Sun, Heart, Coffee } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();

  const iconMap: Record<string, React.ReactNode> = {
    'morning-balance': <Sun className="w-5 h-5 text-coconut-husk" />,
    'body-care': <Heart className="w-5 h-5 text-coconut-husk" />,
    'culinary-craft': <Coffee className="w-5 h-5 text-coconut-husk" />,
  };

  const emojiMap: Record<string, string> = {
    'morning-balance': '🌅',
    'body-care': '🌿',
    'culinary-craft': '☕',
  };

  const stories: LifestyleStory[] = t.lifestyle.stories.map((story) => ({
    id: story.id,
    title: story.title,
    category: story.tag,
    narrative: story.description,
    icon: iconMap[story.id] || <Sun className="w-5 h-5 text-coconut-husk" />,
    accentBadge: story.tag,
    emoji: emojiMap[story.id] || '🥥',
  }));

  return (
    <section
      id="lifestyle"
      className="relative min-h-screen py-32 px-6 md:px-12 bg-coconut-cream text-coconut-dark overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coconut-husk/10 border border-coconut-husk/20 text-coconut-husk text-xs font-semibold uppercase tracking-widest mb-4">
            {t.lifestyle.badge}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-coconut-dark leading-[1.08] mb-4">
            {t.lifestyle.title}
          </h2>
          <p className="text-base sm:text-lg text-coconut-dark/75 font-light leading-relaxed">
            {t.lifestyle.subtitle}
          </p>
        </div>

        {/* 3-Story Asymmetric Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`p-8 rounded-3xl bg-white/70 hover:bg-white border border-coconut-husk/15 transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between ${
                index === 1 ? 'md:-translate-y-4 shadow-lg bg-white/90' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="p-3 rounded-2xl bg-coconut-cream border border-coconut-husk/15">
                    {story.icon}
                  </span>
                  <span className="text-3xl">{story.emoji}</span>
                </div>

                <div className="text-xs uppercase font-mono tracking-wider text-coconut-husk font-semibold mb-2">
                  {story.category}
                </div>

                <h3 className="font-display text-2xl font-bold text-coconut-dark mb-3">
                  {story.title}
                </h3>

                <p className="text-sm text-coconut-dark/75 font-light leading-relaxed">
                  {story.narrative}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-coconut-husk/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-coconut-husk/80 uppercase tracking-widest">
                  KOKORA Everyday
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-coconut-lime" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
