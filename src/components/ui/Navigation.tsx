import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';
import { useLanguage } from '../../context/LanguageContext';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.cerita, href: '#manifesto' },
    { label: t.nav.dekonstruksi, href: '#dekonstruksi' },
    { label: t.nav.katalog, href: '#katalog' },
    { label: t.nav.studio3d, href: '#studio-3d' },
    { label: t.nav.lifestyle, href: '#lifestyle' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-coconut-dark/85 backdrop-blur-md border-b border-coconut-cream/10 shadow-lg shadow-black/20'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="group flex items-center gap-2.5 text-coconut-cream"
          aria-label="KOKORA Homepage"
        >
          <span className="w-8 h-8 rounded-full bg-coconut-lime flex items-center justify-center text-coconut-dark font-bold text-lg group-hover:scale-105 transition-transform">
            🥥
          </span>
          <span className="font-display font-bold tracking-wider text-xl uppercase text-coconut-cream">
            KOKORA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm tracking-wide text-coconut-cream/80"
          aria-label="Navigasi Utama"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-coconut-lime transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-coconut-lime hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />

          <Button
            asLink
            href="#kontak"
            variant="primary"
            size="sm"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#kontak')}
          >
            {t.nav.hubungiKami}
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />

          <button
            type="button"
            className="p-2 text-coconut-cream/90 hover:text-coconut-lime transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={t.nav.menuAria}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-coconut-dark/95 backdrop-blur-xl border-b border-coconut-cream/10 p-6 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-coconut-cream/90 hover:text-coconut-lime py-2 border-b border-coconut-cream/5"
            >
              {link.label}
            </a>
          ))}

          <Button
            asLink
            href="#kontak"
            variant="primary"
            size="md"
            className="w-full mt-2"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#kontak')}
          >
            {t.nav.hubungiKami}
          </Button>
        </div>
      )}
    </header>
  );
};
