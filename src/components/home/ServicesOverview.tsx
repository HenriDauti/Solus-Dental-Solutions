"use client"

import { Crown, Activity, Drill, Smile, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

const serviceIcons = {
  protetike: Crown,      // Crowns, bridges, veneers
  terapi: Activity,      // Dental therapy, treatments, root canals
  implant: Drill,        // Dental implants, surgical procedures
  ortodonci: Smile,      // Orthodontics, braces, aligners
}

// Service-specific gradient colors
const serviceColors = {
  protetike: "from-amber-500/20 via-yellow-500/20 to-amber-500/20",
  terapi: "from-blue-500/20 via-cyan-500/20 to-blue-500/20",
  implant: "from-purple-500/20 via-fuchsia-500/20 to-purple-500/20",
  ortodonci: "from-emerald-500/20 via-teal-500/20 to-emerald-500/20",
}

const serviceAccents = {
  protetike: "group-hover:shadow-amber-500/20",
  terapi: "group-hover:shadow-blue-500/20",
  implant: "group-hover:shadow-purple-500/20",
  ortodonci: "group-hover:shadow-emerald-500/20",
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
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Animated Background */}
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
            {language === "sq"
              ? "Nga kurorë dhe implantet tek ortodonci, ofrojmë shërbime dentare të plota me teknologjinë më të fundit"
              : "From crowns and implants to orthodontics, we offer complete dental services with the latest technology"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.key}
                to="/services"
                className={`group relative card-glass card-hover overflow-hidden animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${serviceColors[service.key as keyof typeof serviceColors]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-6 space-y-4">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <Icon className="text-white" size={28} />
                    </div>
                    
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-primary/20 group-hover:scale-125 group-hover:border-accent/40 transition-all duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                    {service.desc}
                  </p>

                  {/* Arrow Icon */}
                  <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    <span className="text-sm font-medium">
                      {language === "sq" ? "Mëso më shumë" : "Learn more"}
                    </span>
                    <ArrowRight size={16} />
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up animation-delay-400">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Link
              to="/services"
              className="btn btn-primary group"
            >
              <span>{language === "sq" ? "Shiko të Gjitha Shërbimet" : "View All Services"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <a
              href={`https://wa.me/355697707078?text=${encodeURIComponent(
                language === "sq"
                  ? "Përshëndetje! Dëshiroj të rezervoj një konsultë."
                  : "Hello! I would like to book a consultation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {language === "sq" ? "Rezervo Konsultë" : "Book Consultation"}
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 left-10 w-20 h-20 border-2 border-primary/20 rounded-full animate-float" />
        <div className="absolute -bottom-10 right-10 w-16 h-16 border-2 border-accent/20 rounded-full animate-float-delayed" />
      </div>
    </section>
  )
}