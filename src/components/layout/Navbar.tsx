import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Floating Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-strong py-3 shadow-xl'
            : 'glass py-4 shadow-sm'
        }`}
        style={{
          transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center transition-all duration-300 hover:scale-105"
            >
              <img
                src="/logo.png"
                alt="Solus Dental Solution"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative group py-2 transition-colors duration-300"
                >
                  <span
                    className={`font-medium transition-colors duration-300 ${
                      isActive(item.href)
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </span>
                  
                  {/* Gradient Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 gradient-blue-purple transition-all duration-300 ${
                      isActive(item.href)
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Language Switcher with Pill Design */}
              <div className="hidden md:flex items-center gap-1 p-1 rounded-full glass-strong">
                <button
                  onClick={() => setLanguage('sq')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === 'sq'
                      ? 'gradient-blue-purple text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  AL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === 'en'
                      ? 'gradient-blue-purple text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Book Now Button */}
              <a
                href={`https://wa.me/355692057575?text=${encodeURIComponent(t('whatsapp.message'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex btn btn-primary animate-pulse-glow"
              >
                {t('nav.bookNow')}
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 glass-dark backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-20 left-4 right-4 glass-strong rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="p-6 space-y-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 animate-fade-in-up stagger-${index + 1} ${
                  isActive(item.href)
                    ? 'gradient-blue-purple text-white shadow-md'
                    : 'text-foreground hover:bg-accent/10'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <button
                onClick={() => {
                  setLanguage('sq');
                  setIsOpen(false);
                }}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === 'sq'
                    ? 'gradient-blue-purple text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent/10'
                }`}
              >
                Shqip
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setIsOpen(false);
                }}
                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === 'en'
                    ? 'gradient-blue-purple text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent/10'
                }`}
              >
                English
              </button>
            </div>

            {/* Mobile Book Now */}
            <a
              href={`https://wa.me/355692057575?text=${encodeURIComponent(t('whatsapp.message'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block btn btn-primary w-full text-center animate-pulse-glow"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.bookNow')}
            </a>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;