"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { Heart, Users, Shield, Star, Microscope } from "lucide-react"

export default function Team() {
  const { language } = useLanguage()
  const t = translations[language]

  const services = language === "sq"
    ? [
        "Implantologji & Kirurgji Orale",
        "Estetikë & Protetikë Dentare",
        "Terapi Dentare",
        "Ortodonci & Maskerina Transparente",
      ]
    : [
        "Implantology & Oral Surgery",
        "Aesthetic & Prosthetic Dentistry",
        "Dental Therapy",
        "Orthodontics & Clear Aligners",
      ]

  return (
    <div className="min-h-screen">

      {/* ── HERO: Rreth Nesh ── */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom max-w-5xl relative">
          <div className="text-center space-y-8 animate-fade-in-up">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {language === "sq" ? "Rreth Nesh" : "About Us"}
            </h1>

            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {language === "sq"
                ? "Në Solus Dental Solution ofrojmë kujdes dentar të avancuar, të bazuar në standardet më të larta të stomatologjisë moderne, duke kombinuar eksperiencën klinike me teknologjinë më të fundit për të garantuar rezultate të sigurta, funksionale dhe estetikisht perfekte."
                : "At Solus Dental Solution we deliver advanced dental care built on the highest standards of modern dentistry, combining clinical expertise with the latest technology to guarantee results that are safe, functional, and aesthetically perfect."}
            </p>

            <p className="text-base text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              {language === "sq"
                ? "Me një eksperiencë të konsoliduar në fushën e stomatologjisë dhe një fokus të veçantë në implantologji, kirurgji orale dhe estetikë dentare, ne i qasemi çdo rasti në mënyrë të personalizuar. Çdo plan trajtimi ndërtohet mbi analizë të detajuar klinike dhe funksionale, me qëllim arritjen e rezultateve afatgjata dhe natyrale."
                : "With consolidated expertise in dentistry and a special focus on implantology, oral surgery, and dental aesthetics, we approach every case on an individual basis. Each treatment plan is built on detailed clinical and functional analysis, aimed at achieving long-lasting, natural results."}
            </p>

            {/* Value pillars — 3-col always, compact on mobile */}
            <div className="grid grid-cols-3 gap-3 md:gap-8 pt-8">
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Heart className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-foreground leading-tight">
                  {language === "sq" ? "Kujdes i Personalizuar" : "Personalised Care"}
                </h3>
                <p className="hidden md:block text-muted-foreground text-sm">
                  {language === "sq"
                    ? "Çdo plan trajtimi ndërtohet sipas nevojave unike të pacientit"
                    : "Every treatment plan is tailored to the patient's unique needs"}
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Microscope className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-foreground leading-tight">
                  {language === "sq" ? "Teknologji e Avancuar" : "Advanced Technology"}
                </h3>
                <p className="hidden md:block text-muted-foreground text-sm">
                  {language === "sq"
                    ? "Materiale të certifikuara ndërkombëtarisht dhe teknologji bashkëkohore"
                    : "Internationally certified materials and state-of-the-art diagnostics"}
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Shield className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-foreground leading-tight">
                  {language === "sq" ? "Rezultate Afatgjata" : "Long-lasting Results"}
                </h3>
                <p className="hidden md:block text-muted-foreground text-sm">
                  {language === "sq"
                    ? "Trajtime minimale invazive me komoditet maksimal"
                    : "Minimally invasive treatments with maximum patient comfort"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fade-in-up">

            {/* Left: description */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                {language === "sq" ? "Shërbimet Tona" : "Our Services"}
              </h2>
              <p className="text-base text-foreground/75 leading-relaxed">
                {language === "sq"
                  ? "Në klinikën tonë ofrojmë një gamë të plotë shërbimesh dentare, duke përfshirë teknologji bashkëkohore diagnostikuese dhe terapeutike që garantojnë trajtime të sakta, minimale invazive dhe me komoditet maksimal."
                  : "Our clinic offers a comprehensive range of dental services, underpinned by modern diagnostic and therapeutic technology that ensures precise, minimally invasive treatments with maximum comfort."}
              </p>
              <p className="text-base text-foreground/75 leading-relaxed">
                {language === "sq"
                  ? "Fokusi ynë nuk është vetëm trajtimi i problemit ekzistues, por edhe rikthimi i plotë i funksionit oral dhe krijimi i një harmonie estetike që përshtatet në mënyrë natyrale me tiparet e çdo pacienti. Për ne, çdo buzëqeshje është unike dhe trajtohet me kujdes maksimal ndaj detajit."
                  : "Our focus goes beyond treating the immediate problem, we aim to fully restore oral function and create aesthetic harmony that fits naturally with every patient's features. For us, every smile is unique and deserves meticulous attention to detail."}
              </p>
            </div>

            {/* Right: service list — 2x2 on mobile, single-col on lg */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 md:p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-xs md:text-base font-semibold text-foreground leading-tight">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container-custom max-w-5xl">

          {/* Label + Title */}
          <div className="mb-16 space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary/60">
              {language === "sq" ? "Filozofia Jonë" : "Our Philosophy"}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {language === "sq" ? "Misioni Ynë" : "Our Mission"}
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

            {/* Left: intro paragraph */}
            <div className="space-y-5">
              <p className="text-lg text-foreground/80 leading-relaxed">
                {language === "sq"
                  ? "Në Solus Dental Solution, misioni ynë është të vendosim një standard të ri në kujdesin dentar."
                  : "At Solus Dental Solution, our mission is to set a new standard in dental care."}
              </p>
              <p className="text-base text-foreground/65 leading-relaxed">
                {language === "sq"
                  ? "Ne synojmë të krijojmë buzëqeshje që nuk janë vetëm funksionale, por edhe harmonike me identitetin dhe stilin e çdo pacienti. Çdo trajtim për ne është një kombinim i shkencës, artit dhe përkushtimit ndaj detajit."
                  : "We strive to create smiles that are not only functional, but harmonious with each patient's identity and style. For us, every treatment is a blend of science, art, and dedication to detail."}
              </p>
            </div>

            {/* Right: three quiet pillars */}
            <div className="space-y-8">
              {[
                {
                  title: language === "sq" ? "Standard i Ri" : "A New Standard",
                  body: language === "sq"
                    ? "Çdo detaj ka rëndësi dhe çdo rezultat flet vetë."
                    : "Every detail matters and every result speaks for itself.",
                },
                {
                  title: language === "sq" ? "Shkencë dhe Art" : "Science and Art",
                  body: language === "sq"
                    ? "Trajtim i bazuar në analizë klinike, me vëmendje maksimale ndaj estetikës natyrale."
                    : "Treatment grounded in clinical analysis, with full attention to natural aesthetics.",
                },
                {
                  title: language === "sq" ? "Besim Afatgjatë" : "Lasting Trust",
                  body: language === "sq"
                    ? "Çdo pacient ndihet i sigurt dhe i vlerësuar në çdo hap të procesit."
                    : "Every patient feels safe and valued at every step of the process.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="mt-1 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-white">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="border-t border-primary/15 pt-12">
            <p className="text-xl md:text-2xl font-semibold text-foreground/75 leading-relaxed max-w-3xl italic">
              {language === "sq"
                ? "\"Ne nuk trajtojmë thjesht dhëmbë, ne transformojmë mënyrën se si njerëzit ndihen me buzëqeshjen e tyre.\""
                : "\"We don't just treat teeth, we transform the way people feel about their smile.\""}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-xs tracking-widest uppercase text-primary/50 font-semibold">
                Solus Dental Solution
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
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

              <a href="/contact" className="btn btn-secondary">
                {language === "sq" ? "Na Kontaktoni" : "Contact Us"}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}