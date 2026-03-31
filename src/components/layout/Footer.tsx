import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      { name: t('footer.services.general'), href: '/services#terapi' },
      { name: t('footer.services.cosmetic'), href: '/services#estetike' },
      { name: t('footer.services.orthodontics'), href: '/services#ortodonci' },
      { name: t('footer.services.implants'), href: '/services#kirurgji' },
    ],
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: t('footer.company.team'), href: '/about' },
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
    { icon: Facebook, href: 'https://www.facebook.com/p/Solus-Dental-Solution-61568431454397/', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Instagram, href: 'https://www.instagram.com/solus.dental.solution/', label: 'Instagram', color: 'hover:text-pink-400' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary to-accent text-white overflow-hidden">
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
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/solus%20Inverted%20Color.png"
                alt="Solus Dental Solution"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-white/80 leading-relaxed">
              {t('footer.description')}
            </p>
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
<span className="text-white/80">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                <a
                  href="tel:+355697707078"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  +355 69 770 7078
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                <a
                  href="mailto:solusdentalsolution@gmail.com"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  solusdentalsolution@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-white/60" />
   <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
  {t('footer.address')}
</span>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            {/* Subtle gradient overlay on top edge to blend with footer */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-primary/40 to-transparent z-10 pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.287050000001!2d19.8115!3d41.3341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350c8e3f6e3f6e3%3A0x1350c8e3f6e3f6e3!2s8RM6%2BGPM%2C%20Rruga%20Ramazan%20Kasa%2C%20Tiran%C3%AB!5e0!3m2!1sen!2sal!4v1234567890"
              width="100%"
              height="200"
              style={{ border: 0, display: 'block', filter: 'brightness(0.85) saturate(0.8)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Solus Dental Solution location"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Solus Dental Solution. {t('footer.rights')}
            </p>
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
          </div>
        </div>
      </div>

      {/* Animated Gradient Bottom Border */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
    </footer>
  );
};

export default Footer;