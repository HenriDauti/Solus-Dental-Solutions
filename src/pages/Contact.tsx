"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import ContactInfo from "../components/contact/ContactInfo"
import ContactForm from "../components/contact/ContactForm"
import { generateWhatsAppLink } from "../utils/whatsapp"

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {t.pages.contact.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.pages.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-8 px-4">
        <div className="container-custom">
          <ContactInfo />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="pb-20 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                  {t.pages.contact.bookTitle}
                </h2>
                <p className="text-muted-foreground">
                  {t.pages.contact.bookSubtitle}
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Map */}
            <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                  {t.pages.contact.locationTitle}
                </h2>
                <p className="text-muted-foreground">
                  {t.pages.contact.locationSubtitle}
                </p>
              </div>

<div className="relative rounded-2xl overflow-hidden shadow-2xl h-[280px] sm:h-[400px] lg:h-[777px] glass-strong">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl" />
                <div className="relative h-full rounded-2xl overflow-hidden border-2 border-border/50">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.287050000001!2d19.8115!3d41.3341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350c8e3f6e3f6e3%3A0x1350c8e3f6e3f6e3!2s8RM6%2BGPM%2C%20Rruga%20Ramazan%20Kasa%2C%20Tiran%C3%AB!5e0!3m2!1sen!2sal!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}