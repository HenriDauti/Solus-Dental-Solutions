"use client"

import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/src/context/LanguageContext"
import { generateWhatsAppLink } from "@/src/utils/whatsapp"

interface ServiceCardProps {
  title: string
  description: string
  details: string
  benefits: string[]
  duration: string
  image: string
}

export default function ServiceCard({ title, description, details, benefits, duration, image }: ServiceCardProps) {
  const { language } = useLanguage()

  const bookText = language === "al" ? "Rezervo këtë shërbim" : "Book This Service"
  const durationLabel = language === "al" ? "Kohëzgjatja:" : "Duration:"
  const benefitsLabel = language === "al" ? "Përfitimet:" : "Benefits:"
  const bookButtonText = language === "al" ? "Rezervo Sot" : "Book Today"

  const whatsappLink = generateWhatsAppLink(
    "+355697707078",
    language === "al" ? `Dëshiroj të rezervoj shërbimin: ${title}` : `I would like to book the service: ${title}`,
  )

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <img src={`/generic-placeholder-300px.png?height=300&width=600`} alt={title} className="w-full h-72 object-cover" />
      <div className="p-8">
        <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
        <p className="text-foreground opacity-75 mb-4">{description}</p>
        <p className="text-foreground mb-6">{details}</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm font-semibold text-primary mb-2">{durationLabel}</p>
            <p className="text-foreground">{duration}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-primary mb-3">{benefitsLabel}</p>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle size={16} className="text-primary flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
        >
          {bookButtonText}
        </a>
      </div>
    </div>
  )
}
