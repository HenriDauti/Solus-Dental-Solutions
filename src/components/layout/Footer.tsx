import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const footerLinks = {
    services: [
      { name: t('footer.services.general'), href: '/services' },
      { name: t('footer.services.cosmetic'), href: '/services' },
      { name: t('footer.services.orthodontics'), href: '/services' },
      { name: t('footer.services.implants'), href: '/services' },
    ],
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: t('footer.company.team'), href: '/about' },
      { name: t('footer.company.careers'), href: '/contact' },
      { name: t('footer.company.contact'), href: '/contact' },
    ],
    resources: [
      { name: t('footer.resources.blog'), href: '/' },
      { name: t('footer.resources.faq'), href: '/' },
      { name: t('footer.resources.privacy'), href: '/' },
      { name: t('footer.resources.terms'), href: '/' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-sky-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-deep-navy via-primary to-accent text-white overflow-hidden">
      {/* Decorative Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-background"
          />
        </svg>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-white rotate-45" />
      </div>

      <div className="relative container-custom pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">Solus Dental</div>
                <div className="text-sm text-white/70">{t('tagline')}</div>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed">
              {t('footer.description')}
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">{t('footer.newsletter.title')}</h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-primary rounded-md hover:scale-110 transition-transform duration-300"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <p className="text-sm text-green-300 animate-fade-in">
                  {t('footer.newsletter.success')}
                </p>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 relative inline-block">
              {t('footer.services.title')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-white to-transparent" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4 relative inline-block">
              {t('footer.company.title')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-white to-transparent" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 relative inline-block">
              {t('footer.contact.title')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-white to-transparent" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/70 flex-shrink-0 mt-1" />
                <span className="text-white/80">
                  Rruga Bardhok Biba, Tirana, Albania
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                <a
                  href="tel:+355692057575"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  +355 69 205 7575
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                <a
                  href="mailto:info@solusdental.al"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  info@solusdental.al
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Solus Dental Solution. {t('footer.rights')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 ${social.color} hover:scale-110 hover:shadow-lg transition-all duration-300`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span>{t('footer.made')}</span>
              <svg className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{t('footer.location')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Gradient Bottom Border */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
    </footer>
  );
};

export default Footer;