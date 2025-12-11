"use client"

import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../data/translations"
import { faqData } from "../data/faq"
import { Accordion } from "../components/faq/Accordion"

export default function FAQ() {
  const { language } = useLanguage()
  const t = translations[language]
  const faqContent = faqData[language]
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="pt-20 pb-12 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-slideUp">
            {language === "sq" ? "Pyetje të Shpeshta" : "Frequently Asked Questions"}
          </h1>
          <p className="text-lg text-foreground opacity-75">
            {language === "sq"
              ? "Gjeni përgjigje për pyetjet më të shpeshta"
              : "Find answers to your most common questions"}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {faqContent.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="animate-slideUp">
          <Accordion items={faqContent[activeCategory].questions} />
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-muted rounded-xl text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            {language === "sq" ? "Ende nuk e gjetët përgjigjen?" : "Still have questions?"}
          </h2>
          <p className="text-foreground opacity-75 mb-6">
            {language === "sq"
              ? "Kontaktoni amin në +355 69 770 7078 ose përdorni formën e kontaktit"
              : "Contact us at +355 69 770 7078 or use the contact form"}
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            {language === "sq" ? "Kontakto Tani" : "Contact Now"}
          </a>
        </div>
      </div>
    </div>
  )
}