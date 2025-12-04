import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ana Krasniqi',
      role: t('testimonials.patient'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      content: t('testimonials.content.1'),
      rating: 5,
    },
    {
      id: 2,
      name: 'Marko Petrovic',
      role: t('testimonials.patient'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      content: t('testimonials.content.2'),
      rating: 5,
    },
    {
      id: 3,
      name: 'Elena Dimitri',
      role: t('testimonials.patient'),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      content: t('testimonials.content.3'),
      rating: 5,
    },
  ];

  const autoPlayInterval = 5000;

  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % testimonials.length);
          return 0;
        }
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        } transition-all duration-300`}
      />
    ));
  };

  return (
    <section className="section relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 gradient-purple-blue rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 gradient-blue-purple rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 3D Card Stack */}
          <div className="relative h-[500px] md:h-[400px] perspective-1000">
            {testimonials.map((testimonial, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive ? 'z-20' : offset > 0 ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    transform: `
                      translateX(${offset * 50}%)
                      translateZ(${isActive ? 0 : -200}px)
                      scale(${isActive ? 1 : 0.9})
                      rotateY(${offset * -10}deg)
                    `,
                    opacity: Math.abs(offset) > 1 ? 0 : 1,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {/* Card */}
                  <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden h-full">
                    <div className="grid md:grid-cols-2 h-full">
                      {/* Image Side with Ken Burns Effect */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-accent">
                        <div className="absolute inset-0 animate-ken-burns">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover opacity-80"
                          />
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                        
                        {/* Gradient Border Frame */}
                        <div className="absolute inset-4 rounded-2xl border-2 border-white/30" />
                        
                        {/* Decorative Quote SVG */}
                        <div className="absolute top-8 left-8 opacity-20">
                          <Quote className="w-24 h-24 text-white" strokeWidth={1} />
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                          {renderStars(testimonial.rating)}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                          "{testimonial.content}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 gradient-blue-purple rounded-full blur-md opacity-50" />
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="relative w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-lg gradient-text">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-accent group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-accent group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Progress Bar */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setProgress(0);
                }}
                className="relative h-1 w-16 bg-border rounded-full overflow-hidden group"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className="absolute inset-0 gradient-blue-purple transition-all duration-100"
                  style={{
                    width: index === activeIndex ? `${progress}%` : index < activeIndex ? '100%' : '0%',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ken Burns Animation */}
      <style>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.1) translate(-5%, -5%);
          }
        }
        
        .animate-ken-burns {
          animation: ken-burns 20s ease-in-out infinite alternate;
        }
        
        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;