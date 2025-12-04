"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

export default function ContactInfo() {
  const { language } = useLanguage()
  const t = translations[language]

  const contactItems = [
    {
      icon: Phone,
      label: language === "al" ? "Telefon" : "Phone",
      value: t.footer.phone,
      link: `tel:${t.footer.phone.replace(/\s/g, "")}`,
      type: "tel",
    },
    {
      icon: Mail,
      label: language === "al" ? "Email" : "Email",
      value: t.footer.email,
      link: `mailto:${t.footer.email}`,
      type: "email",
    },
    {
      icon: MapPin,
      label: language === "al" ? "Adresa" : "Address",
      value: t.footer.address,
      link: null,
      type: "address",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {contactItems.map((item) => {
        const Icon = item.icon
        const Component = item.link ? "a" : "div"
        return (
          <div key={item.label} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <Icon className="text-primary" size={24} />
            </div>
            <p className="text-sm font-semibold text-primary mb-2">{item.label}</p>
            {item.link ? (
              <a href={item.link} className="text-foreground hover:text-primary transition-colors font-medium">
                {item.value}
              </a>
            ) : (
              <p className="text-foreground font-medium">{item.value}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
