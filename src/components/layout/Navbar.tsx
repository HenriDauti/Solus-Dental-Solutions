import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

const LANGUAGES: { code: Language; label: string; full: string; flagIso: string }[] = [
  { code: 'sq', label: 'AL', full: 'Shqip',   flagIso: 'al' },
  { code: 'en', label: 'EN', full: 'English',  flagIso: 'gb' },
  { code: 'it', label: 'IT', full: 'Italiano', flagIso: 'it' },
];

const FlagImg: React.FC<{ iso: string; className?: string }> = ({ iso, className = '' }) => (
  <img
    src={`https://flagcdn.com/w20/${iso}.png`}
    srcSet={`https://flagcdn.com/w40/${iso}.png 2x`}
    width={20}
    height={15}
    alt={iso.toUpperCase()}
    className={`rounded-sm object-cover ${className}`}
  />
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen]           = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);
  const [langOpen, setLangOpen]       = useState(false);
  const { language, setLanguage, t }  = useLanguage();
  const location                      = useLocation();
  const dropdownRef                   = useRef<HTMLDivElement>(null);

  /* ── scroll listener ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: t('nav.home'),     href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.about'),    href: '/about' },
    { name: t('nav.gallery'),  href: '/gallery' },
    { name: t('nav.contact'),  href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const activeLang = LANGUAGES.find((l) => l.code === language)!;

  return (
    <>
      {/* ── Floating Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-strong py-3 shadow-xl' : 'glass py-4 shadow-sm'
        }`}
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
                  {/* Gradient underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 gradient-blue-purple transition-all duration-300 ${
                      isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">

              {/* ── Desktop Language Dropdown ── */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full glass-strong text-sm font-medium text-foreground hover:text-accent transition-all duration-300 select-none"
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                >
                  <FlagImg iso={activeLang.flagIso} />
                  <span>{activeLang.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${
                      langOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute right-0 mt-2 w-40 glass-strong rounded-xl shadow-2xl overflow-hidden border border-border/40 transition-all duration-200 origin-top-right ${
                    langOpen
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                  }`}
                  role="listbox"
                >
                  {LANGUAGES.map(({ code, label, full, flagIso }) => (
                    <button
                      key={code}
                      role="option"
                      aria-selected={language === code}
                      onClick={() => {
                        setLanguage(code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                        language === code
                          ? 'gradient-blue-purple text-white'
                          : 'text-foreground hover:bg-accent/10'
                      }`}
                    >
                      <FlagImg iso={flagIso} />
                      <span className="flex-1 text-left">{full}</span>
                      <span className="text-xs opacity-60">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Now Button */}
              <a
                href={`https://wa.me/355697707078?text=${encodeURIComponent(t('whatsapp.message'))}`}
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
                {isOpen
                  ? <X    className="w-6 h-6 text-foreground" />
                  : <Menu className="w-6 h-6 text-foreground" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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

            {/* Mobile Language Switcher — pills with flags */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              {LANGUAGES.map(({ code, full, flagIso }) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setIsOpen(false);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    language === code
                      ? 'gradient-blue-purple text-white shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-accent/10'
                  }`}
                >
                  <FlagImg iso={flagIso} />
                  <span>{full}</span>
                </button>
              ))}
            </div>

            {/* Mobile Book Now */}
            <a
              href={`https://wa.me/355697707078?text=${encodeURIComponent(t('whatsapp.message'))}`}
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

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;