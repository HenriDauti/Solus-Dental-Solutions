"use client"

import { Facebook, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/data/translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg">Solus Dental</span>
            </div>
            <p className="text-sm opacity-90">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-purple-300 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-purple-300 transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-purple-300 transition-colors">
                  {t.nav.team}
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-purple-300 transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-purple-300 transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${t.footer.phone.replace(/\s/g, "")}`} className="hover:text-purple-300 transition-colors">
                  {t.footer.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${t.footer.email}`} className="hover:text-purple-300 transition-colors">
                  {t.footer.email}
                </a>
              </li>
              <li className="text-xs opacity-90">{t.footer.address}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t.footer.hours}</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>
                  {t.footer.monday} - {t.footer.friday}:
                </span>
                <span>{t.footer.monToFri}</span>
              </li>
              <li className="flex justify-between">
                <span>{t.footer.saturday}:</span>
                <span>{t.footer.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>{t.footer.sunday}:</span>
                <span>{t.footer.closed}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-90">{t.footer.rights}</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-purple-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-purple-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-purple-300 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}