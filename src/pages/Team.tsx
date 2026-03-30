"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { Heart, Users, Shield } from "lucide-react"

export default function Team() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen">
      {/* About Clinic Section - Now Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom max-w-5xl relative">
          <div className="text-center space-y-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {language === "sq" ? "Rreth Klinikës Sonë" : "About Our Clinic"}
            </h1>
            
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {language === "sq"
                ? "Solus Dental Solution është një klinikë dentare moderne e vendosur në zemër të Tiranës, e dedikuar për të ofruar shërbime dentare të cilësisë më të lartë. Me një ekip të vogël por shumë të specializuar, ne ofrojmë kujdes personal dhe profesional për çdo pacient."
                : "Solus Dental Solution is a modern dental clinic located in the heart of Tirana, dedicated to providing the highest quality dental services. With a small but highly specialized team, we offer personal and professional care for every patient."}
            </p>

            {/* Clinic Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {language === "sq" ? "Kujdes Personal" : "Personal Care"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "sq"
                    ? "Çdo pacient merr vëmendje të plotë dhe trajtim të personalizuar"
                    : "Every patient receives full attention and personalized treatment"}
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {language === "sq" ? "Cilësi e Lartë" : "High Quality"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "sq"
                    ? "Teknologji moderne dhe standarde ndërkombëtare"
                    : "Modern technology and international standards"}
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {language === "sq" ? "Ekip i Specializuar" : "Specialized Team"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "sq"
                    ? "Profesionistë me përvojë dhe trajnim të avancuar"
                    : "Experienced professionals with advanced training"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              {language === "sq"
                ? "Gati për të filluar udhëtimin tuaj drejt një buzëqeshjeje më të shëndetshme?"
                : "Ready to start your journey to a healthier smile?"}
            </h2>
            
            <p className="text-lg text-muted-foreground">
              {language === "sq"
                ? "Rezervoni një konsultë dhe njihuni me ekipin tonë"
                : "Book a consultation and meet our team"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href={`https://wa.me/355697707078?text=${encodeURIComponent(
                  language === "sq"
                    ? "Përshëndetje! Dëshiroj të rezervoj një konsultë."
                    : "Hello! I would like to book a consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {language === "sq" ? "Rezervo Konsultë" : "Book Consultation"}
              </a>
              
              <a
                href="/contact"
                className="btn btn-secondary"
              >
                {language === "sq" ? "Na Kontaktoni" : "Contact Us"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}