import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { servicesData } from '@/data/services';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const { language, t } = useLanguage();
  const services = servicesData[language];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong text-sm font-medium text-accent animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {t('services.title')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text animate-fade-in-up">
              {language === "sq"
                ? "Shërbime dentare të plota me teknologjinë më të fundit"
                : "Complete dental services with the latest technology"}
            </h1>

            <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
              {language === "sq"
                ? "Ofrojmë një gamë të plotë shërbimesh dentare profesionale për të gjithë familjen"
                : "We offer a complete range of professional dental services for the whole family"}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative card-glass card-premium overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Glow Effect */}
                <div className="absolute -inset-0.5 gradient-blue-purple rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                
                {/* Service Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/20">
                      {/* Dynamic Service Icon */}
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {index === 0 && (
                          // General Dentistry - Tooth with checkmark
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        )}
                        {index === 1 && (
                          // Cosmetic - Sparkles/Stars
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        )}
                        {index === 2 && (
                          // Orthodontics - Align/Straighten
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        )}
                        {index === 3 && (
                          // Implants - Wrench/Tool (precision work)
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-8 space-y-6">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-300 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Details */}
                  <p className="text-foreground/80 leading-relaxed">
                    {service.details}
                  </p>

                  {/* Benefits */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="space-y-3">
                      {service.benefits.slice(0, 3).map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 group/benefit"
                        >
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover/benefit:scale-110 transition-transform duration-300" />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="font-medium">{service.duration}</span>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={`https://wa.me/355692057575?text=${encodeURIComponent(
                        language === "sq"
                          ? `Përshëndetje! Dëshiroj të rezervoj një takim për: ${service.title}`
                          : `Hello! I would like to book an appointment for: ${service.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-300 group/cta"
                    >
                      <span>{language === "sq" ? "Rezervo" : "Book Now"}</span>
                      <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10" />
        
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 card-glass p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              {language === "sq"
                ? "Gati për të përmirësuar buzëqeshjen tuaj?"
                : "Ready to improve your smile?"}
            </h2>
            
            <p className="text-lg text-muted-foreground">
              {language === "sq"
                ? "Rezervoni një konsultë falas sot dhe zbuloni se si mund t'ju ndihmojmë"
                : "Book a free consultation today and discover how we can help you"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href={`https://wa.me/355692057575?text=${encodeURIComponent(
                  language === "sq"
                    ? "Përshëndetje! Dëshiroj të rezervoj një konsultë falas."
                    : "Hello! I would like to book a free consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary animate-pulse-glow"
              >
                {language === "sq" ? "Rezervo Konsultë" : "Book Consultation"}
              </a>
              
              <a
                href="/contact"
                className="btn btn-secondary"
              >
                {language === "sq" ? "Na Kontaktoni" : "Contact Us"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;