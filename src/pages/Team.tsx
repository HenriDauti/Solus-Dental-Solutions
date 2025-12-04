"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { teamData } from "../data/team"
import DoctorCard from "../components/team/DoctorCard"

export default function Team() {
  const { language } = useLanguage()
  const t = translations[language]
  const team = teamData[language]

  return (
    <div className="pt-20 pb-12 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slideUp">
            {language === "al" ? "Takohuni me Ekipin Ynë" : "Meet Our Team"}
          </h1>
          <p className="text-lg text-foreground opacity-75">
            {language === "al"
              ? "Profesionalët e aftë dhe të dedikuar të Solus Dental Solution"
              : "Skilled and dedicated professionals of Solus Dental Solution"}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((doctor, index) => (
            <div key={doctor.name} className="animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
              <DoctorCard {...doctor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
