"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { teamData } from "../data/team"
import { Award, GraduationCap, Briefcase, Heart, Users, Shield } from "lucide-react"

export default function Team() {
  const { language } = useLanguage()
  const t = translations[language]
  const team = teamData[language]

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

      {/* Team Members Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Ambient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="container-custom max-w-6xl relative">
          <div className="text-center mb-20 space-y-6 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {language === "sq" ? "Profesionistët Tanë" : "Our Professionals"}
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === "sq"
                ? "Një ekip i përkushtuar profesionistësh me ekspertizë të gjerë dhe pasion për excellence në kujdesin dentar"
                : "A dedicated team of professionals with extensive expertise and passion for excellence in dental care"}
            </p>
          </div>

          {/* Team Members - Enhanced Layout */}
          <div className="space-y-24">
            {team.map((doctor, index) => (
              <div
                key={doctor.name}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Decorative Line */}
                {index > 0 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                )}

                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}>
                  {/* Profile Image - Enhanced */}
                  <div className="flex-shrink-0 relative group">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Main Image Container */}
                    <div className="relative">
                      <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <Users className="w-32 h-32 text-white" />
                      </div>
                      
                      {/* Decorative Border */}
                      <div className="absolute -inset-1 rounded-2xl border-2 border-primary/20 group-hover:border-accent/40 group-hover:scale-105 transition-all duration-500" />
                      
                      {/* Corner Accent */}
                      <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info - Enhanced */}
                  <div className="flex-1 space-y-8">
                    {/* Header */}
                    <div className={index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}>
                      <h3 className="text-4xl md:text-5xl font-bold mb-3">
                        <span className="gradient-text">{doctor.name}</span>
                      </h3>
                      <p className="text-xl md:text-2xl text-accent font-medium mb-6">{doctor.title}</p>
                      
                      {/* Divider */}
                      <div className={`h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full ${index % 2 === 0 ? '' : 'lg:ml-auto'}`} />
                    </div>

                    {/* Bio */}
                    <p className={`text-lg text-foreground/80 leading-relaxed ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                      {doctor.bio}
                    </p>

                    {/* Credentials Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                      <div className="glass-strong p-6 rounded-xl space-y-2 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          {language === "sq" ? "Specializimi" : "Specialization"}
                        </p>
                        <p className="text-sm font-semibold text-foreground leading-tight">{doctor.specialization}</p>
                      </div>

                      <div className="glass-strong p-6 rounded-xl space-y-2 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          {language === "sq" ? "Eksperienca" : "Experience"}
                        </p>
                        <p className="text-sm font-semibold text-foreground leading-tight">{doctor.experience}</p>
                      </div>

                      <div className="glass-strong p-6 rounded-xl space-y-2 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          {language === "sq" ? "Arsimi" : "Education"}
                        </p>
                        <p className="text-sm font-semibold text-foreground leading-tight">{doctor.education}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                href={`https://wa.me/355692057575?text=${encodeURIComponent(
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