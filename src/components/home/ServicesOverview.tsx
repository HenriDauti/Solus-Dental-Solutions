"use client"

import { Crown, Shield, Zap, Smile } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/src/context/LanguageContext"
import { translations } from "@/src/data/translations"

const serviceIcons = {
  protetike: Crown,
  terapi: Shield,
  implant: Zap,
  ortodonci: Smile,
}

export default function ServicesOverview() {
  const { language } = useLanguage()
  const t = translations[language]

  const services = [
    {
      key: "protetike",
      icon: serviceIcons.protetike,
      name: t.services.protetike.name,
      desc: t.services.protetike.desc,
    },
    {
      key: "terapi",
      icon: serviceIcons.terapi,
      name: t.services.terapi.name,
      desc: t.services.terapi.desc,
    },
    {
      key: "implant",
      icon: serviceIcons.implant,
      name: t.services.implant.name,
      desc: t.services.implant.desc,
    },
    {
      key: "ortodonci",
      icon: serviceIcons.ortodonci,
      name: t.services.ortodonci.name,
      desc: t.services.ortodonci.desc,
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t.services.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.key}
                to="/services"
                className="group p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all transform hover:-translate-y-1 bg-card"
              >
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:bg-opacity-100 transition-all">
                  <Icon className="text-primary group-hover:text-primary-foreground transition-colors" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{service.name}</h3>
                <p className="text-sm text-foreground opacity-75">{service.desc}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
