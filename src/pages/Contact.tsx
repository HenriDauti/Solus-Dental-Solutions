"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import ContactInfo from "../components/contact/ContactInfo"
import ContactForm from "../components/contact/ContactForm"
import { generateWhatsAppLink } from "../utils/whatsapp"
import { AlertCircle } from "lucide-react"

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]

  const emergencyLink = generateWhatsAppLink(
    "+355697707078",
    language === "sq"
      ? "Emergjencë! Kam nevojë për ndihmë të menjëhershme dentare."
      : "Emergency! I need immediate dental help.",
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {language === "sq" ? "Kontakti" : "Contact Us"}
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {language === "sq"
                ? "Ne jemi këtu për t'ju ndihmuar. Kontaktoni sot!"
                : "We are here to help. Contact us today!"}
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
                  {language === "sq" ? "Rezervo Takim" : "Book an Appointment"}
                </h2>
                <p className="text-muted-foreground">
                  {language === "sq"
                    ? "Plotësoni formularin dhe ne do t'ju kontaktojmë sa më shpejt"
                    : "Fill out the form and we'll contact you as soon as possible"}
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Map */}
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                  {language === "sq" ? "Lokacioni" : "Location"}
                </h2>
                <p className="text-muted-foreground">
                  {language === "sq"
                    ? "Gjeni rrugën drejt klinikës sonë"
                    : "Find your way to our clinic"}
                </p>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[650px] lg:h-[777px] glass-strong">
                {/* Map Border Glow */}
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