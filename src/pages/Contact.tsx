"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import ContactInfo from "../components/contact/ContactInfo"
import ContactForm from "../components/contact/ContactForm"
import { generateWhatsAppLink } from "../utils/whatsapp"

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]

  const emergencyLink = generateWhatsAppLink(
    "+355697707078",
    language === "al"
      ? "Emergjencë! Kam nevojë për ndihmë të menjëhershme dentare."
      : "Emergency! I need immediate dental help.",
  )

  return (
    <div className="pt-20 pb-12 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slideUp">
            {language === "al" ? "Kontakti" : "Contact Us"}
          </h1>
          <p className="text-lg text-foreground opacity-75">
            {language === "al"
              ? "Ne jemi këtu për t'u ndihmuar. Kontaktoni amin sot!"
              : "We are here to help. Contact us today!"}
          </p>
        </div>

        {/* Contact Info Cards */}
        <ContactInfo />

        {/* Emergency Button */}
        <div className="mb-12">
          <a
            href={emergencyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:w-auto md:inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-semibold text-center hover:bg-red-700 transition-all transform hover:scale-105"
          >
            {t.whatsapp.emergency}
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {language === "al" ? "Rezervo Takim" : "Book an Appointment"}
            </h2>
            <ContactForm />
          </div>

          {/* Map */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">{language === "al" ? "Lokacioni" : "Location"}</h2>
            <div className="rounded-xl overflow-hidden shadow-lg h-96 border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.287050000001!2d19.8115!3d41.3341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350c8e3f6e3f6e3%3A0x1350c8e3f6e3f6e3!2s8RM6%2BGPM%2C%20Rruga%20Ramazan%20Kasa%2C%20Tiran%C3%AB!5e0!3m2!1sen!2sal!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
