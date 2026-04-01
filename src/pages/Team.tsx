"use client"

import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { Heart, Shield, Star, Microscope } from "lucide-react"

export default function Team() {
  const { language } = useLanguage()
  const t = translations[language]
  const p = t.pages.about

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="container-custom max-w-5xl relative">
          <div className="text-center space-y-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              {p.title}
            </h1>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {p.heroText1}
            </p>
            <p className="text-base text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              {p.heroText2}
            </p>

            {/* Value pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {[
                { icon: Heart, title: p.pillar1Title, desc: p.pillar1Desc },
                { icon: Microscope, title: p.pillar2Title, desc: p.pillar2Desc },
                { icon: Shield, title: p.pillar3Title, desc: p.pillar3Desc },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                {p.servicesTitle}
              </h2>
              <p className="text-base text-foreground/75 leading-relaxed">{p.servicesText1}</p>
              <p className="text-base text-foreground/75 leading-relaxed">{p.servicesText2}</p>
            </div>

            <div className="space-y-4">
              {p.servicesList.map((service: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base font-semibold text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container-custom max-w-5xl">
          <div className="mb-16 space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary/60">
              {p.missionLabel}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">{p.missionTitle}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="space-y-5">
              <p className="text-lg text-foreground/80 leading-relaxed">{p.missionIntro}</p>
              <p className="text-base text-foreground/65 leading-relaxed">{p.missionBody}</p>
            </div>

            <div className="space-y-8">
              {[p.pillarA, p.pillarB, p.pillarC].map((item: { title: string; body: string }, i: number) => (
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

          <div className="border-t border-primary/15 pt-12">
            <p className="text-xl md:text-2xl font-semibold text-foreground/75 leading-relaxed max-w-3xl italic">
              {p.quote}
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
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">{p.ctaTitle}</h2>
            <p className="text-lg text-muted-foreground">{p.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href={`https://wa.me/355697707078?text=${encodeURIComponent(translations[language].whatsapp.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {p.bookConsult}
              </a>
              <a href="/contact" className="btn btn-secondary">
                {p.contactUs}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}