"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"
import { generateWhatsAppLink } from "@/utils/whatsapp"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const location = useLocation()
  const t = translations[language]

  const navLinks = [
    { path: "/", label: t.nav.home },
    { path: "/services", label: t.nav.services },
    { path: "/team", label: t.nav.team },
    { path: "/gallery", label: t.nav.gallery },
    { path: "/contact", label: t.nav.contact },
    { path: "/faq", label: t.nav.faq },
  ]

  const isActive = (path: string) => location.pathname === path

  const whatsappLink = generateWhatsAppLink(
    "+355697707078",
    language === "al"
      ? "Përshëndetje! Dëshiroj të rezervoj një takim në Solus Dental Solution."
      : "Hello! I would like to book an appointment at Solus Dental Solution.",
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="hidden sm:inline font-bold text-primary text-lg">Solus Dental</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-purple-600 border-b-2 border-purple-600 pb-1"
                    : "text-foreground hover:text-purple-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-border rounded-lg p-1 bg-muted">
              <button
                onClick={() => setLanguage("al")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "al" ? "bg-gradient-to-r from-blue-900 to-purple-600 text-white" : "text-foreground hover:text-purple-600"
                }`}
              >
                AL
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === "en" ? "bg-gradient-to-r from-blue-900 to-purple-600 text-white" : "text-foreground hover:text-purple-600"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-blue-900 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-105"
              aria-label={t.nav.bookNow}
            >
              {t.nav.bookNow}
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2 animate-slideUp">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(link.path) ? "bg-gradient-to-r from-blue-900 to-purple-600 text-white" : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-gradient-to-r from-blue-900 to-purple-600 text-white rounded-lg font-medium text-center hover:shadow-lg transition-all"
            >
              {t.nav.bookNow}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}