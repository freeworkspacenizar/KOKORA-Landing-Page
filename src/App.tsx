import { SmoothScrollProvider } from './components/ui/SmoothScrollProvider';
import { Navigation } from './components/ui/Navigation';
import { Section01Hero } from './components/sections/Section01Hero';
import { Section02Manifesto } from './components/sections/Section02Manifesto';
import { Section03Deconstruct } from './components/sections/Section03Deconstruct';
import { Section04Products } from './components/sections/Section04Products';
import { Section05Product3D } from './components/sections/Section05Product3D';
import { Section06Lifestyle } from './components/sections/Section06Lifestyle';
import { Section07Conversion } from './components/sections/Section07Conversion';
import { Section08Footer } from './components/sections/Section08Footer';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-coconut-green text-coconut-cream font-sans selection:bg-coconut-lime selection:text-coconut-dark overflow-x-hidden">
        {/* Minimalist Floating Navigation */}
        <Navigation />

        {/* Narrative Section Progression */}
        <main role="main">
          {/* Section 01: Hero Experience */}
          <Section01Hero />

          {/* Section 02: Brand Manifesto */}
          <Section02Manifesto />

          {/* Section 03: The Coconut Deconstructed 3D Signature */}
          <Section03Deconstruct />

          {/* Section 04: From Nature to Product Catalog */}
          <Section04Products />

          {/* Section 05: Flagship Product 3D Studio Viewer */}
          <Section05Product3D />

          {/* Section 06: Lifestyle & Brand World */}
          <Section06Lifestyle />

          {/* Section 07: Conversion CTA */}
          <Section07Conversion />
        </main>

        {/* Section 08: Editorial Footer */}
        <Section08Footer />
      </div>
    </SmoothScrollProvider>
  );
}
