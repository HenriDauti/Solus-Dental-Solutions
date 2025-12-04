"use client"

import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/src/context/LanguageContext"
import { translations } from "@/src/data/translations"
import { generateWhatsAppLink } from "@/src/utils/whatsapp"

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language]

  const whatsappLink = generateWhatsAppLink(
    "+355697707078",
    language === "al"
      ? "Përshëndetje! Dëshiroj të rezervoj një takim në Solus Dental Solution."
      : "Hello! I would like to book an appointment at Solus Dental Solution.",
  )

  return (
    <div className="pb-12 md:pb-20 px-4 bg-gradient-to-br from-white to-muted">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 animate-slideUp">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">{t.hero.title}</h1>
            <p className="text-lg md:text-xl text-foreground opacity-75 mt-4">{t.hero.subtitle}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              aria-label={t.hero.bookCta}
            >
              {t.hero.bookCta}
              <ArrowRight className="ml-2" size={20} />
            </a>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {t.hero.servicesCta}
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-center animate-fadeIn">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="Solus Dental Solution clinic"
            className="rounded-2xl shadow-2xl w-full max-w-md"
          />
        </div>
      </div>
    </div>
  )
}
