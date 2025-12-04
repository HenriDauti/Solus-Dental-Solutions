"use client"

import { Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/src/context/LanguageContext"

interface Testimonial {
  name: string
  rating: number
  textAl: string
  textEn: string
}

const testimonials: Testimonial[] = [
  {
    name: "A.K.",
    rating: 5,
    textAl:
      "Shërbim i shkëlqyer! Stafi është shumë profesional dhe i sjellshëm. Klinika është e pastër dhe moderne. Rekomandoj pa hezitim!",
    textEn:
      "Excellent service! The staff is very professional and friendly. The clinic is clean and modern. I highly recommend!",
  },
  {
    name: "M.D.",
    rating: 5,
    textAl:
      "Më kanë vendosur implante dentare dhe rezultati është i mahnitshëm. Dr. META është një profesionist i vërtetë.",
    textEn: "I got dental implants and the result is amazing. Dr. META is a true professional.",
  },
  {
    name: "E.N.",
    rating: 5,
    textAl: "Shumë i kënaqur me trajtimin ortodontik. Dr. HOXHA na shpjegoi mirë çdo hap. Rekomandoj Solus Dental!",
    textEn:
      "Very satisfied with orthodontic treatment. Dr. HOXHA explained everything clearly. Recommend Solus Dental!",
  },
]

export default function Testimonials() {
  const { language } = useLanguage()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const testimonial = testimonials[current]
  const text = language === "al" ? testimonial.textAl : testimonial.textEn

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
          {language === "al" ? "Ato që Thonë Pacientët Tanë" : "What Our Patients Say"}
        </h2>

        <div className="bg-muted p-8 md:p-12 rounded-2xl min-h-96 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-center gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg md:text-xl text-foreground italic">"{text}"</p>
          </div>

          <div className="mt-8">
            <p className="font-semibold text-primary mb-6">{testimonial.name}</p>
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? "bg-primary w-8" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
