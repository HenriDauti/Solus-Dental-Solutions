"use client"

import { Activity, Scissors, Sparkles, Smile, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

const serviceIcons = {
  terapi: Activity,
  kirurgji: Scissors,
  estetike: Sparkles,
  ortodonci: Smile,
}

const serviceColors = {
  terapi: "from-blue-500/20 via-cyan-500/20 to-blue-500/20",
  kirurgji: "from-red-500/20 via-rose-500/20 to-red-500/20",
  estetike: "from-pink-500/20 via-purple-500/20 to-pink-500/20",
  ortodonci: "from-emerald-500/20 via-teal-500/20 to-emerald-500/20",
}

export default function ServicesOverview() {
  const { language } = useLanguage()
  const t = translations[language]

  const services = [
    { key: "terapi",    icon: serviceIcons.terapi,    name: t.services.terapi.name,    desc: t.services.terapi.desc },
    { key: "kirurgji",  icon: serviceIcons.kirurgji,  name: t.services.kirurgji.name,  desc: t.services.kirurgji.desc },
    { key: "estetike",  icon: serviceIcons.estetike,  name: t.services.estetike.name,  desc: t.services.estetike.desc },
    { key: "ortodonci", icon: serviceIcons.ortodonci, name: t.services.ortodonci.name, desc: t.services.ortodonci.desc },
  ]

  const whatsappMsg = encodeURIComponent(t.whatsapp.message)

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text animate-fade-in-up">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            {t.pages.services.heroSubtitle}
          </p>
        </div>

        {/* Services Grid */}
<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.key}
                to={`/services#${service.key}`}
                className="group relative card-glass card-hover overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${serviceColors[service.key as keyof typeof serviceColors]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="relative">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <Icon className="text-white" size={22} />
                    </div>
                    <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 border-primary/20 group-hover:scale-125 group-hover:border-accent/40 transition-all duration-500" />
                  </div>
                  <h3 className="text-sm md:text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                    {service.name}
                  </h3>
       <p className="hidden md:block text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                    {service.desc}
                  </p>
<div className="hidden md:flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    <span className="text-sm font-medium">{t.pages.services.learnMore}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up animation-delay-400">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/services" className="btn btn-primary group">
              <span>{t.common.viewAll}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href={`https://wa.me/355697707078?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t.common.bookConsult}
            </a>
          </div>
        </div>

        <div className="absolute -top-10 left-10 w-20 h-20 border-2 border-primary/20 rounded-full animate-float" />
        <div className="absolute -bottom-10 right-10 w-16 h-16 border-2 border-accent/20 rounded-full animate-float-delayed" />
      </div>
    </section>
  )
}