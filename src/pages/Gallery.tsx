"use client"

import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { galleryImages } from "../data/gallery"
import ImageGrid from "../components/gallery/ImageGrid"
import { Camera, Sparkles, Images } from "lucide-react"

export default function Gallery() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<"clinic" | "results">("clinic")

  const clinicImages = galleryImages.slice(0, 6)
  const resultImages = galleryImages.slice(6)

  const tabs = [
    {
      id: "clinic",
      label: language === "sq" ? "Klinika" : "Clinic",
      icon: Camera,
      description: language === "sq" ? "Ambiente moderne dhe të pajisura" : "Modern and equipped facilities"
    },
    {
      id: "results",
      label: language === "sq" ? "Para & Pas" : "Before & After",
      icon: Sparkles,
      description: language === "sq" ? "Transformime të shkëlqyera" : "Brilliant transformations"
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in-up">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {language === "sq" ? "Galeria Jonë" : "Our Gallery"}
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {language === "sq"
                ? "Zbuloni ambientet tona moderne dhe rezultatet e mahnitshme që kemi arritur për pacientët tanë"
                : "Discover our modern facilities and the amazing results we've achieved for our patients"}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4">
        <div className="container-custom max-w-7xl">
          {/* Enhanced Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-up">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "clinic" | "results")}
                  className={`group relative px-8 py-6 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? "bg-gradient-to-br from-primary to-accent text-white shadow-xl scale-105" 
                      : "glass-strong text-foreground hover:scale-105"
                  }`}
                >
                  {/* Background Gradient on Hover */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  <div className="relative flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? "bg-white/20" 
                        : "bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="text-left">
                      <div className="text-base font-bold">{tab.label}</div>
                      <div className={`text-xs font-normal ${
                        isActive ? "text-white/80" : "text-muted-foreground"
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white rounded-full" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Gallery Grid with Animation */}
          <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <ImageGrid images={activeTab === "clinic" ? clinicImages : resultImages} />
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div className="glass-strong p-8 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text">
                {clinicImages.length}+
              </div>
              <p className="text-muted-foreground font-medium">
                {language === "sq" ? "Foto të Klinikës" : "Clinic Photos"}
              </p>
            </div>

            <div className="glass-strong p-8 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text">
                {resultImages.length}+
              </div>
              <p className="text-muted-foreground font-medium">
                {language === "sq" ? "Raste të Suksesshme" : "Success Cases"}
              </p>
            </div>

            <div className="glass-strong p-8 rounded-2xl text-center space-y-3 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <Images className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text">100%</div>
              <p className="text-muted-foreground font-medium">
                {language === "sq" ? "Kënaqësi e Pacientëve" : "Patient Satisfaction"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              {language === "sq"
                ? "Dëshironi rezultate të ngjashme?"
                : "Want similar results?"}
            </h2>
            
            <p className="text-lg text-muted-foreground">
              {language === "sq"
                ? "Rezervoni një konsultë dhe filloni transformimin tuaj sot"
                : "Book a consultation and start your transformation today"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href={`https://wa.me/355697707078?text=${encodeURIComponent(
                  language === "sq"
                    ? "Përshëndetje! Dëshiroj të rezervoj një konsultë."
                    : "Hello! I would like to book a consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {language === "sq" ? "Rezervo Tani" : "Book Now"}
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
  )
}