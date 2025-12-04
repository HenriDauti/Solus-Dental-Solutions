"use client"

import { MessageCircle } from "lucide-react"
import { useLanguage } from "@/src/context/LanguageContext"
import { translations } from "@/src/data/translations"
import { generateWhatsAppLink } from "@/src/utils/whatsapp"

export default function WhatsAppFAB() {
  const { language } = useLanguage()
  const t = translations[language]

  const whatsappLink = generateWhatsAppLink(
    "+355697707078",
    language === "al"
      ? "Përshëndetje! Dëshiroj të rezervoj një takim në Solus Dental Solution."
      : "Hello! I would like to book an appointment at Solus Dental Solution.",
  )

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-pulse-custom z-40"
      aria-label="Contact via WhatsApp"
      title={language === "al" ? "Kontakto përmes WhatsApp" : "Contact via WhatsApp"}
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  )
}
