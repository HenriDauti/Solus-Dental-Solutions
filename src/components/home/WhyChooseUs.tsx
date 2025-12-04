"use client"

import { Check, Award, Users, Clock, Shield, Sparkles } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

// Map icons to each benefit for visual variety
const benefitIcons = [Award, Users, Clock, Shield]

export default function WhyChooseUs() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted/50" />
      
      {/* Ambient Lighting Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
         
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="gradient-text">{t.whyChooseUs.title}</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "sq"
              ? "Përkushtimi ynë ndaj përsosmërisë dhe kujdesit të personalizuar na bën zgjedhjen ideale për shëndetin tuaj dentar"
              : "Our commitment to excellence and personalized care makes us the ideal choice for your dental health"}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyChooseUs.items.map((item, index) => {
            const Icon = benefitIcons[index] || Check
            
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="relative h-full card-glass p-8 card-hover overflow-hidden">
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative space-y-4">
                    {/* Icon Container */}
                    <div className="relative inline-block">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                        <Icon className="text-white" size={28} />
                      </div>
                      
                      {/* Check Badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Check className="text-accent" size={14} strokeWidth={3} />
                      </div>
                      
                      {/* Decorative Ring */}
                      <div className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-primary/20 group-hover:scale-125 group-hover:border-accent/40 transition-all duration-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out" />
                  
                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in-up animation-delay-400">
          <div className="inline-flex items-center gap-3 px-6 py-4 glass-strong rounded-2xl">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-white font-bold text-sm">
                5K+
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">
                {language === "sq" ? "Mbi 5,000 Pacientë të Kënaqur" : "Over 5,000 Happy Patients"}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === "sq" ? "Bashkohu me familjen tonë sot" : "Join our family today"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-accent/10 rotate-45 animate-float-delayed" />
    </section>
  )
}