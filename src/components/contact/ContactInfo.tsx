"use client"

import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

export default function ContactInfo() {
  const { language } = useLanguage()
  const t = translations[language]

  const contactItems = [
    {
      icon: Phone,
      label: t.contactInfo.phone,
      value: t.footer.phone,
      link: `tel:${t.footer.phone.replace(/\s/g, "")}`,
      type: "tel",
      description: t.contactInfo.phoneDesc,
    },
    {
      icon: Mail,
      label: t.contactInfo.email,
      value: t.footer.email,
      link: `mailto:${t.footer.email}`,
      type: "email",
      description: t.contactInfo.emailDesc,
    },
    {
      icon: MapPin,
      label: t.contactInfo.address,
      value: t.footer.address,
      link: "https://maps.google.com/?q=8RM6+GPM,+Rruga+Ramazan+Kasa,+Tiranë",
      type: "address",
      description: t.contactInfo.addressDesc,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
      {contactItems.map((item, index) => {
        const Icon = item.icon
        const Component = item.link ? "a" : "div"

        return (
          <Component
            key={item.label}
            href={item.link || undefined}
            target={item.type === "address" ? "_blank" : undefined}
            rel={item.type === "address" ? "noopener noreferrer" : undefined}
            className="group relative glass-strong rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Icon className="text-white" size={28} />
              </div>

              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </p>
                {item.link && (
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              <p className="text-foreground font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {item.value}
              </p>

              <p className="text-sm text-muted-foreground">{item.description}</p>

              {item.link && (
                <div className="mt-4 flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>
                    {item.type === "address"
                      ? t.contactInfo.viewOnMap
                      : t.contactInfo.clickToContact}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Component>
        )
      })}
    </div>
  )
}