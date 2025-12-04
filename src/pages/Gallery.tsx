"use client"

import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { galleryImages } from "../data/gallery"
import ImageGrid from "../components/gallery/ImageGrid"

export default function Gallery() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<"clinic" | "results">("clinic")

  const clinicImages = galleryImages.slice(0, 6)
  const resultImages = galleryImages.slice(6)

  const tabs = [
    {
      id: "clinic",
      label: language === "al" ? "Klinika" : "Clinic",
    },
    {
      id: "results",
      label: language === "al" ? "Para & Pas" : "Before & After",
    },
  ]

  return (
    <div className="pt-20 pb-12 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slideUp">
            {language === "al" ? "Galeria" : "Gallery"}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "clinic" | "results")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <ImageGrid images={activeTab === "clinic" ? clinicImages : resultImages} />
      </div>
    </div>
  )
}
