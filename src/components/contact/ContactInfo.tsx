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
      label: language === "sq" ? "Telefon" : "Phone",
      value: t.footer.phone,
      link: `tel:${t.footer.phone.replace(/\s/g, "")}`,
      type: "tel",
      description: language === "sq" ? "Na telefononi çdo ditë" : "Call us any day",
    },
    {
      icon: Mail,
      label: language === "sq" ? "Email" : "Email",
      value: t.footer.email,
      link: `mailto:${t.footer.email}`,
      type: "email",
      description: language === "sq" ? "Dërgoni një email" : "Send us an email",
    },
    {
      icon: MapPin,
      label: language === "sq" ? "Adresa" : "Address",
      value: t.footer.address,
      link: "https://maps.google.com/?q=8RM6+GPM,+Rruga+Ramazan+Kasa,+Tiranë",
      type: "address",
      description: language === "sq" ? "Vizitoni klinikën tonë" : "Visit our clinic",
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
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Decorative Circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative">
              {/* Icon Container */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Icon className="text-white" size={28} />
              </div>
              
              {/* Label */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </p>
                {item.link && (
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              
              {/* Value */}
              <p className="text-foreground font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {item.value}
              </p>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              
              {/* Hover Indicator */}
              {item.link && (
                <div className="mt-4 flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{item.type === "address" ? (language === "sq" ? "Shiko në hartë" : "View on map") : (language === "sq" ? "Kliko për kontakt" : "Click to contact")}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              )}
            </div>
            
            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Component>
        )
      })}
    </div>
  )
}