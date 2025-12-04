"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { servicesData } from "../data/services"
import ServiceCard from "../components/services/ServiceCard"

export default function Services() {
  const { language } = useLanguage()
  const t = translations[language]
  const services = servicesData[language]

  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slideUp">{t.services.title}</h1>
          <p className="text-lg text-foreground opacity-75">
            {language === "al"
              ? "Shërbime dentare të plota me teknologjinë më të fundit"
              : "Complete dental services with the latest technology"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-12">
          {services.map((service, index) => (
            <div key={service.id} className="animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
              <ServiceCard
                title={service.title}
                description={service.description}
                details={service.details}
                benefits={service.benefits}
                duration={service.duration}
                image={service.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
