import React, { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Quote, RefreshCw } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ApifyReview {
  name?: string
  text?: string
  textTranslated?: string
  stars?: number
  rating?: number
  publishAt?: string
  publishedAtDate?: string
  reviewerPhotoUrl?: string
}

// ─── Config ───────────────────────────────────────────────────────────────────
const APIFY_TOKEN = (import.meta as any).env.VITE_APIFY_TOKEN as string
const MAPS_URL =
  "https://www.google.com/maps/place/Solus+Dental+Solution/@41.3338403,19.8117894,17z/data=!3m1!4b1!4m6!3m5!1s0x135031005e7546d3:0xd7ceb5f39b9ae6!8m2!3d41.3338403!4d19.8117894!16s%2Fg%2F11y9_l7x7g"
const CACHE_KEY = "solus_reviews_v2"
const CACHE_TTL = 24 * 60 * 60 * 1000

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getStars(r: ApifyReview) { return r.stars ?? r.rating ?? 0 }
function getText(r: ApifyReview) { return (r.textTranslated ?? r.text ?? "").trim() }
function getDate(r: ApifyReview) { return r.publishAt ?? r.publishedAtDate }

function timeAgo(dateStr: string | undefined, language: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ""
  const diff = Date.now() - date.getTime()
  const days = Math.floor(diff / 86400000)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)
  if (language === "sq") {
    if (years > 0) return `${years} vit më parë`
    if (months > 0) return `${months} muaj më parë`
    if (days > 0) return `${days} ditë më parë`
    return "Sot"
  }
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
  return "Today"
}

function getInitials(name = "?") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

// Gradient palette for avatars — cycles through a few combos
const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-indigo-500 to-blue-700",
  "from-purple-500 to-violet-700",
]

function renderStars(count: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
  ))
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GoogleReviews() {
  const { language } = useLanguage()
  const [reviews, setReviews] = useState<ApifyReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const autoPlayInterval = 5000

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchReviews = async (force = false) => {
    if (!force) {
      try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (raw) {
          const cached = JSON.parse(raw)
          if (Date.now() - cached.ts < CACHE_TTL) {
            setReviews(cached.reviews)
            setLoading(false)
            return
          }
        }
      } catch {}
    }

    setLoading(true)
    setError(null)

    try {
      // Request 30 reviews so after filtering 4-5 stars we still have plenty
      const res = await fetch(
        `https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=90`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startUrls: [{ url: MAPS_URL }],
            maxReviews: 30,          // fetch 30, filter down client-side
            reviewsSort: "newest",
            language: "en",
          }),
        }
      )

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data: any[] = await res.json()
      let raw: ApifyReview[] = []

      const first = data?.[0]
      if (!first) throw new Error("Empty response")

      if (Array.isArray(first.reviews)) {
        raw = first.reviews
      } else if ("text" in first || "stars" in first) {
        raw = data
      } else {
        raw = data
      }

      // Keep only: has text AND 4 or 5 stars, cap at 12
      const filtered = raw
        .filter((r) => getStars(r) >= 4 && getText(r).length > 0)
        .slice(0, 12)

      const ts = Date.now()
      localStorage.setItem(CACHE_KEY, JSON.stringify({ reviews: filtered, ts }))
      setReviews(filtered)
    } catch (err: any) {
      setError(err.message ?? "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReviews() }, [])

  // ─── Autoplay ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || reviews.length === 0) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((i) => (i + 1) % reviews.length)
          return 0
        }
        return prev + (100 / (autoPlayInterval / 100))
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isPaused, reviews.length])

  const handleNext = () => { setActiveIndex((i) => (i + 1) % reviews.length); setProgress(0) }
  const handlePrev = () => { setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length); setProgress(0) }

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-10" />
      <div className="absolute top-20 left-20 w-64 h-64 gradient-purple-blue rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 gradient-blue-purple rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">
              {language === "sq" ? "Çfarë Thonë Pacientët" : "What Our Patients Say"}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "sq"
              ? "Vlerësime reale nga Google nga pacientët tanë"
              : "Real Google reviews from our patients"}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-accent animate-spin" />
            <p className="text-muted-foreground text-sm">
              {language === "sq" ? "Duke ngarkuar vlerësimet…" : "Loading reviews…"}
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <p className="text-muted-foreground text-sm">{language === "sq" ? "Nuk u ngarkuan vlerësimet." : "Could not load reviews."}</p>
            <button onClick={() => fetchReviews(true)} className="flex items-center gap-2 text-sm text-accent hover:underline">
              <RefreshCw className="w-4 h-4" /> {language === "sq" ? "Provo Përsëri" : "Try Again"}
            </button>
          </div>
        )}

        {/* Carousel */}
        {!loading && !error && reviews.length > 0 && (
          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* 3D card stack */}
            <div className="relative h-[340px] md:h-[280px]" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
              {reviews.map((review, index) => {
                const offset = index - activeIndex
                const isActive = index === activeIndex
                const text = getText(review)
                const stars = getStars(review)
                const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]

                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? "z-20" : offset > 0 ? "z-10" : "z-0"}`}
                    style={{
                      transform: `translateX(${offset * 50}%) translateZ(${isActive ? 0 : -200}px) scale(${isActive ? 1 : 0.9}) rotateY(${offset * -10}deg)`,
                      opacity: Math.abs(offset) > 1 ? 0 : 1,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="glass-strong rounded-3xl shadow-2xl h-full overflow-hidden">
                      <div className="grid md:grid-cols-2 h-full">
                        {/* Left — avatar panel */}
                        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${gradient} p-8 gap-4`}>
                          {/* Decorative quote */}
                          <div className="absolute top-6 left-6 opacity-20">
                            <Quote className="w-16 h-16 text-white" strokeWidth={1} />
                          </div>

                          {/* Avatar */}
                          <div className="relative z-10 w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white/30">
                            <span className="text-white text-3xl font-bold">
                              {getInitials(review.name)}
                            </span>
                          </div>

                          {/* Name + date */}
                          <div className="relative z-10 text-center">
                            <p className="text-white font-bold text-lg leading-tight">{review.name ?? "Patient"}</p>
                            <p className="text-white/70 text-sm mt-1">{timeAgo(getDate(review), language)}</p>
                          </div>

                          {/* Stars */}
                          <div className="relative z-10 flex gap-1">
                            {renderStars(stars)}
                          </div>

                          {/* Decorative border frame */}
                          <div className="absolute inset-4 rounded-2xl border border-white/20 pointer-events-none" />
                        </div>

                        {/* Right — review text */}
                        <div className="flex flex-col justify-center p-8 md:p-10">
                          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed italic">
                            "{text}"
                          </blockquote>
                          {/* Google badge */}
                          <div className="mt-6 flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-xs text-muted-foreground font-medium">Google Review</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Nav arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-accent group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-accent group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Progress dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setActiveIndex(index); setProgress(0) }}
                  className="relative h-1 w-16 bg-border rounded-full overflow-hidden"
                >
                  <div
                    className="absolute inset-0 gradient-blue-purple transition-all duration-100"
                    style={{
                      width: index === activeIndex ? `${progress}%` : index < activeIndex ? "100%" : "0%",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}