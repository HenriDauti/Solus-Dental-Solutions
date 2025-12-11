import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { servicesData } from '@/data/services';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const { language, t } = useLanguage();
  const services = servicesData[language];

  const serviceImages = [
    '/crown.jpg',              // Protetike - Crowns
    '/dental therapy.png',     // Terapi - Dental Therapy
    '/implants.jpg',           // Kirurgji - Surgery/Implants
    '/cosmetic.jpg',           // Estetike - Cosmetic
    '/braces.jpg'              // Ortodonci - Orthodontics
  ];
  

  return (
    <div className="min-h-screen">
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
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <img
                    src={serviceImages[index]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
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

                  {/* Duration */}
                  <div className="flex items-center gap-2 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-medium">{service.duration}</span>
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
                ? "Rezervoni një konsultë sot dhe zbuloni se si mund t'ju ndihmojmë"
                : "Book a consultation today and discover how we can help you"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href={`https://wa.me/355697707078?text=${encodeURIComponent(
                  language === "sq"
                    ? "Përshëndetje! Dëshiroj të rezervoj një konsultë."
                    : "Hello! I would like to book a consultation."
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