import React from 'react';
import { ArrowRight, Star, Award, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      {/* Geometric Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 gradient-blue-purple rounded-full blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-32 right-20 w-96 h-96 gradient-purple-blue rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 gradient-accent rounded-full blur-2xl opacity-25 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Decorative Medical Icons - Floating */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="absolute top-32 right-1/4 w-16 h-16 text-accent animate-float" style={{ animationDelay: '1s' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <svg className="absolute bottom-40 left-1/4 w-12 h-12 text-primary animate-float" style={{ animationDelay: '3s' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
         

            {/* Hero Title with Gradient */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up stagger-1">
              <span className="gradient-text block">
                {t('hero.title')}
              </span>
              <span className="text-foreground block mt-2">
                {t('hero.subtitle')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up stagger-2">
              {t('hero.description')}
            </p>

            {/* CTA Buttons with Magnetic Effect */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <a
                href={`https://wa.me/355692057575?text=${encodeURIComponent(t('whatsapp.message'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group btn-magnetic"
              >
                {t('hero.cta.primary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <button className="btn btn-secondary group">
                {t('hero.cta.secondary')}
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in-up stagger-4">
              <div className="glass-strong p-4 rounded-xl text-center card-hover">
                <div className="flex justify-center mb-2">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold gradient-text">5000+</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.patients')}</div>
              </div>
              
              <div className="glass-strong p-4 rounded-xl text-center card-hover">
                <div className="flex justify-center mb-2">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.experience')}</div>
              </div>
              
              <div className="glass-strong p-4 rounded-xl text-center card-hover">
                <div className="flex justify-center mb-2">
                  <Star className="w-6 h-6 text-accent fill-accent" />
                </div>
                <div className="text-2xl font-bold gradient-text">4.9</div>
                <div className="text-sm text-muted-foreground">{t('hero.stats.rating')}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in-up stagger-2">
            {/* Decorative Background */}
            <div className="absolute inset-0 gradient-blue-purple rounded-3xl blur-3xl opacity-20 animate-pulse-glow" />
            
            {/* Main Image Container */}
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 gradient-blue-purple rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur" />
              
              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl card-hover tilt-3d">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Dental Clinic"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 glass-strong p-6 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 gradient-blue-purple rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                   {t('hero.certification.label')}
                    </div>
                    <div className="text-lg font-bold gradient-text">
                      {t('hero.certification.quality')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved Bottom Divider */}
      <div className="divider-wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;