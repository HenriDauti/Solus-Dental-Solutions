"use client"

import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { galleryImages } from "../data/gallery"
import ImageGrid from "../components/gallery/ImageGrid"
import { Camera, Sparkles } from "lucide-react"

export default function Gallery() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<"clinic" | "results">("clinic")

  const showParaPasSection = false

  const clinicImages = galleryImages.slice(0, 6)
  const resultImages = galleryImages.slice(6)

  const tabs = [
    {
      id: "clinic",
      label: t.pages.gallery.tabClinic,
      icon: Camera,
      description: t.pages.gallery.tabClinicDesc,
    },
    ...(showParaPasSection ? [{
      id: "results",
      label: t.pages.gallery.tabResults,
      icon: Sparkles,
      description: t.pages.gallery.tabResultsDesc,
    }] : []),
  ]

  const whatsappMsg = encodeURIComponent(t.whatsapp.message)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {t.pages.gallery.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.pages.gallery.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4">
        <div className="container-custom max-w-7xl">
          {/* Tabs */}
          {tabs.length > 1 && (
            <div className="flex flex-row justify-center gap-3 mb-16 animate-fade-in-up">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "clinic" | "results")}
                    className={`group relative px-4 py-4 sm:px-8 sm:py-6 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-br from-primary to-accent text-white shadow-xl scale-105"
                        : "glass-strong text-foreground hover:scale-105"
                    }`}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    <div className="relative flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-white/20"
                            : "bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-base font-bold">{tab.label}</div>
                        <div className={`text-xs font-normal ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                          {tab.description}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* Gallery Grid */}
          <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <ImageGrid images={activeTab === "clinic" || !showParaPasSection ? clinicImages : resultImages} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              {t.pages.gallery.ctaTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.pages.gallery.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href={`https://wa.me/355697707078?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {t.pages.gallery.bookNow}
              </a>
              <a href="/contact" className="btn btn-secondary">
                {t.pages.gallery.contactUs}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}