import React, { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight, RefreshCw, ExternalLink } from "lucide-react"
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
  reviewUrl?: string
}

// ─── Config ───────────────────────────────────────────────────────────────────
const APIFY_TOKEN = (import.meta as any).env.VITE_APIFY_TOKEN as string
const MAPS_URL =
  "https://www.google.com/maps/place/Solus+Dental+Solution/@41.3338403,19.8117894,17z/data=!3m1!4b1!4m6!3m5!1s0x135031005e7546d3:0xd7ceb5f39b9ae6!8m2!3d41.3338403!4d19.8117894!16s%2Fg%2F11y9_l7x7g"
const CACHE_KEY_PREFIX = "solus_reviews_v4_"
const CACHE_TTL = 24 * 60 * 60 * 1000
const CARDS_PER_PAGE = 3
const AUTOPLAY_MS = 5000

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getStars(r: ApifyReview) {
  return r.stars ?? r.rating ?? 0
}
function getText(r: ApifyReview) {
  return (r.textTranslated ?? r.text ?? "").trim()
}
function getDate(r: ApifyReview) {
  return r.publishAt ?? r.publishedAtDate
}
function getReviewLink(r: ApifyReview) {
  return r.reviewUrl ?? MAPS_URL
}

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
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-indigo-500 to-blue-700",
  "from-purple-500 to-violet-700",
  "from-sky-500 to-cyan-600",
  "from-blue-600 to-violet-600",
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

// ─── Unified Review Card ──────────────────────────────────────────────────────
// All cards share the same centered layout. Text reviews show the quote below the stars.
function ReviewCard({ review, index }: { review: ApifyReview; index: number }) {
  const { language } = useLanguage()
  const stars = getStars(review)
  const text = getText(review)
  const hasText = text.length > 0
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]

  return (
    <a
      href={getReviewLink(review)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center glass-strong rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer p-6 text-center relative"
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-80`} />

      {/* Soft gradient background glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

      {/* Large avatar */}
      <div
        className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mt-2 mb-3 group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
      >
        <span className="text-white text-base font-bold tracking-wide">
          {getInitials(review.name)}
        </span>
      </div>

      {/* Name */}
      <p className="font-semibold text-foreground text-sm leading-tight mb-0.5">
        {review.name ?? "Patient"}
      </p>

      {/* Date */}
      <p className="text-xs text-muted-foreground mb-3">
        {timeAgo(getDate(review), language)}
      </p>

      {/* Stars */}
      <StarRow count={stars} />

      {/* Review text (only for reviews that have text) */}
      {hasText ? (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-4" />
          <blockquote className="flex-1 text-sm text-foreground/80 leading-relaxed italic">
            "{text}"
          </blockquote>
        </>
      ) : (
        <p className="text-xs text-muted-foreground mt-2 mb-2">
          {stars === 5
            ? language === "sq" ? "Vlerësim i shkëlqyer" : "Excellent rating"
            : language === "sq" ? "Vlerësim i mirë" : "Great rating"}
        </p>
      )}

      {/* Google badge */}
      <div className="flex items-center gap-1.5 mt-auto pt-3 border-t border-border/50 w-full justify-center">
        <GoogleLogo />
        <span className="text-xs text-muted-foreground font-medium">Google Review</span>
        <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-accent/70 transition-colors" />
      </div>
    </a>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GoogleReviews() {
  const { language } = useLanguage()
  const [reviews, setReviews] = useState<ApifyReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE)

  // ─── Fetch (language-aware) ─────────────────────────────────────────────────
  const fetchReviews = useCallback(async (force = false) => {
    const cacheKey = CACHE_KEY_PREFIX + language

    if (!force) {
      try {
        const raw = localStorage.getItem(cacheKey)
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
      const res = await fetch(
        `https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=90`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startUrls: [{ url: MAPS_URL }],
            maxReviews: 30,
            reviewsSort: "newest",
            language: language === "sq" ? "sq" : "en",
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
      } else {
        raw = data
      }

      const filtered = raw.filter((r) => getStars(r) >= 4).slice(0, 30)

      // Sort: reviews WITH text come first
      const sorted = [...filtered].sort((a, b) => {
        const aHasText = getText(a).length > 0 ? 1 : 0
        const bHasText = getText(b).length > 0 ? 1 : 0
        return bHasText - aHasText
      })

      localStorage.setItem(cacheKey, JSON.stringify({ reviews: sorted, ts: Date.now() }))
      setReviews(sorted)
    } catch (err: any) {
      setError(err.message ?? "Unknown error")
    } finally {
      setLoading(false)
    }
  }, [language])

  // Re-fetch when language changes
  useEffect(() => {
    setPageIndex(0)
    setProgress(0)
    fetchReviews()
  }, [fetchReviews])

  // ─── Navigation ────────────────────────────────────────────────────────────
  const goTo = useCallback((page: number) => {
    setPageIndex(page)
    setProgress(0)
    setAnimKey((k) => k + 1)
  }, [])

  const handleNext = useCallback(() => {
    goTo((pageIndex + 1) % totalPages)
  }, [pageIndex, totalPages, goTo])

  const handlePrev = useCallback(() => {
    goTo((pageIndex - 1 + totalPages) % totalPages)
  }, [pageIndex, totalPages, goTo])

  // ─── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || reviews.length === 0 || totalPages <= 1) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext()
          return 0
        }
        return prev + (100 / (AUTOPLAY_MS / 100))
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isPaused, reviews.length, totalPages, handleNext])

  // ─── Visible slice ─────────────────────────────────────────────────────────
  const startIdx = pageIndex * CARDS_PER_PAGE
  const visibleReviews = reviews.slice(startIdx, startIdx + CARDS_PER_PAGE)

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
              ? "Lexoni përvojat e pacientëve që na kanë besuar buzëqeshjen e tyre"
              : "Read the experiences of patients who trusted us with their smiles"}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-accent animate-spin" />
            <p className="text-muted-foreground text-sm">
              {language === "sq" ? "Duke ngarkuar vlerësimet…" : "Loading reviews…"}
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center gap-3 py-16">
            <p className="text-muted-foreground text-sm">
              {language === "sq" ? "Nuk u ngarkuan vlerësimet." : "Could not load reviews."}
            </p>
            <button
              onClick={() => fetchReviews(true)}
              className="flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              {language === "sq" ? "Provo Përsëri" : "Try Again"}
            </button>
          </div>
        )}

        {/* Carousel */}
        {!loading && !error && reviews.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Cards grid — 3 at a time */}
            <div
              key={animKey}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up"
            >
              {visibleReviews.map((review, i) => {
                const globalIndex = startIdx + i
                return <ReviewCard key={globalIndex} review={review} index={globalIndex} />
              })}
            </div>

            {/* Navigation row */}
            <div className="mt-10 flex items-center justify-center gap-6">
              {/* Prev */}
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group disabled:opacity-40"
                disabled={totalPages <= 1}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-accent group-hover:-translate-x-0.5 transition-transform duration-200" />
              </button>

              {/* Page dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: i === pageIndex ? 32 : 8, background: i === pageIndex ? "transparent" : "hsl(var(--border))" }}
                    aria-label={`Page ${i + 1}`}
                  >
                    {i === pageIndex && (
                      <div className="absolute inset-0 gradient-blue-purple rounded-full">
                        <div
                          className="absolute inset-0 bg-white/30 rounded-full transition-none"
                          style={{ width: `${100 - progress}%`, right: 0, left: "auto" }}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group disabled:opacity-40"
                disabled={totalPages <= 1}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Counter + view all link */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">
                {language === "sq"
                  ? `${pageIndex + 1} / ${totalPages} faqe · ${reviews.length} vlerësime`
                  : `${pageIndex + 1} / ${totalPages} · ${reviews.length} reviews`}
              </span>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
              >
                <GoogleLogo />
                {language === "sq" ? "Shiko të gjitha" : "View all on Google"}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}