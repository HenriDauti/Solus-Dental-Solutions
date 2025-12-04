"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/src/context/LanguageContext"
import { translations } from "@/src/data/translations"
import { validateForm } from "@/src/utils/validation"
import { generateWhatsAppLink, formatWhatsAppMessage } from "@/src/utils/whatsapp"

export default function ContactForm() {
  const { language } = useLanguage()
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    service: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const services = [
    language === "al" ? t.services.protetike.name : t.services.protetike.name,
    language === "al" ? t.services.terapi.name : t.services.terapi.name,
    language === "al" ? t.services.implant.name : t.services.implant.name,
    language === "al" ? t.services.ortodonci.name : t.services.ortodonci.name,
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validateForm(formData)

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    const template = language === "al" ? t.whatsapp.message : t.whatsapp.message
    const message = formatWhatsAppMessage(template, formData)
    const whatsappLink = generateWhatsAppLink("+355697707078", message)

    window.open(whatsappLink, "_blank")
    setSubmitted(true)
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      service: "",
      message: "",
    })

    setTimeout(() => setSubmitted(false), 3000)
  }

  const labels = {
    name: language === "al" ? "Emri i Plotë" : "Full Name",
    phone: language === "al" ? "Numri i Telefonit" : "Phone Number",
    email: language === "al" ? "Email" : "Email",
    date: language === "al" ? "Data e Preferuar" : "Preferred Date",
    time: language === "al" ? "Ora e Preferuar" : "Preferred Time",
    service: language === "al" ? "Shërbimi" : "Service",
    message: language === "al" ? "Mesazh" : "Message",
    submit: language === "al" ? "Dërgoje përmes WhatsApp" : "Send via WhatsApp",
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
      {submitted && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg animate-slideUp">
          {language === "al"
            ? "Takimi juaj do të dërgohet përmes WhatsApp. Faleminderit!"
            : "Your appointment will be sent via WhatsApp. Thank you!"}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">{labels.name}*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.name ? "border-red-500" : "border-border"
            }`}
            placeholder={language === "al" ? "Emri juaj" : "Your name"}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">{labels.phone}*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.phone ? "border-red-500" : "border-border"
            }`}
            placeholder="+355 69 770 7078"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">{labels.email}*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.email ? "border-red-500" : "border-border"
            }`}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">{labels.service}*</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.service ? "border-red-500" : "border-border"
            }`}
          >
            <option value="">{language === "al" ? "Zgjidhni shërbimin" : "Select a service"}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">{labels.date}*</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.date ? "border-red-500" : "border-border"
            }`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">{labels.time}*</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.time ? "border-red-500" : "border-border"
            }`}
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">{labels.message}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder={language === "al" ? "Mesazhi juaj (opsional)" : "Your message (optional)"}
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
      >
        {labels.submit}
      </button>
    </form>
  )
}
