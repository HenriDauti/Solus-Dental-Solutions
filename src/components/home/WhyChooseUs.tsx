"use client"

import { Check } from "lucide-react"
import { useLanguage } from "@/src/context/LanguageContext"
import { translations } from "@/src/data/translations"

export default function WhyChooseUs() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-16 md:py-24 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t.whyChooseUs.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.whyChooseUs.items.map((item, index) => (
            <div key={index} className="text-center animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-foreground opacity-75">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
