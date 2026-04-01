import React, { useState, useEffect, useCallback, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, RefreshCw, ExternalLink, Loader2 } from "lucide-react"
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

const DATASET_IDS: Record<string, string> = {
  en: (import.meta as any).env.VITE_APIFY_DATASET_ID_EN as string,
  sq: (import.meta as any).env.VITE_APIFY_DATASET_ID_SQ as string,
  it: (import.meta as any).env.VITE_APIFY_DATASET_ID_EN as string, // falls back to EN dataset for Italian
}

const MAPS_URL =
  "https://www.google.com/maps/place/Solus+Dental+Solution/@41.3338403,19.8117894,17z/data=!3m1!4b1!4m6!3m5!1s0x135031005e7546d3:0xd7ceb5f39b9ae6!8m2!3d41.3338403!4d19.8117894!16s%2Fg%2F11y9_l7x7g"

const CACHE_KEY_PREFIX  = "solus_reviews_v6_"
const CACHE_TTL         = 24 * 60 * 60 * 1000
const BG_REFRESH_AFTER  = 6  * 60 * 60 * 1000
const CARDS_PER_PAGE    = 3
const AUTOPLAY_MS       = 5000

// ─── UI strings (AL / EN / IT) ────────────────────────────────────────────────
const UI: Record<string, Record<string, any>> = {
  en: {
    heading:    "What Our Patients Say",
    subheading: "Read the experiences of patients who trusted us with their smiles",
    loading:    "Loading reviews…",
    refreshing: "Refreshing reviews…",
    error:      "Could not load reviews.",
    retry:      "Try Again",
    viewAll:    "View all on Google",
    excellent:  "Excellent rating",
    great:      "Great rating",
    counter:    (page: number, total: number, count: number) => `${page} / ${total} · ${count} reviews`,
  },
  sq: {
    heading:    "Çfarë Thonë Pacientët",
    subheading: "Lexoni përvojat e pacientëve që na kanë besuar buzëqeshjen e tyre",
    loading:    "Duke ngarkuar vlerësimet…",
    refreshing: "Duke përditësuar vlerësimet…",
    error:      "Nuk u ngarkuan vlerësimet.",
    retry:      "Provo Përsëri",
    viewAll:    "Shiko të gjitha",
    excellent:  "Vlerësim i shkëlqyer",
    great:      "Vlerësim i mirë",
    counter:    (page: number, total: number, count: number) => `${page} / ${total} faqe · ${count} vlerësime`,
  },
  it: {
    heading:    "Cosa Dicono i Nostri Pazienti",
    subheading: "Leggi le esperienze dei pazienti che ci hanno affidato il loro sorriso",
    loading:    "Caricamento recensioni…",
    refreshing: "Aggiornamento recensioni…",
    error:      "Impossibile caricare le recensioni.",
    retry:      "Riprova",
    viewAll:    "Vedi tutte su Google",
    excellent:  "Valutazione eccellente",
    great:      "Buona valutazione",
    counter:    (page: number, total: number, count: number) => `${page} / ${total} · ${count} recensioni`,
  },
}

function uiT(lang: string, key: string, ...args: any[]): string {
  const entry = UI[lang]?.[key] ?? UI["en"][key]
  return typeof entry === "function" ? entry(...args) : entry
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getStars(r: ApifyReview) { return r.stars ?? r.rating ?? 0 }
function getText(r: ApifyReview)  { return (r.textTranslated ?? r.text ?? "").trim() }
function getDate(r: ApifyReview)  { return r.publishAt ?? r.publishedAtDate }
function getLink(r: ApifyReview)  { return r.reviewUrl ?? MAPS_URL }

function processReviews(raw: ApifyReview[]): ApifyReview[] {
  const filtered = raw.filter((r) => getStars(r) >= 4).slice(0, 30)
  return [...filtered].sort((a, b) => (getText(b).length > 0 ? 1 : 0) - (getText(a).length > 0 ? 1 : 0))
}

function timeAgo(dateStr: string | undefined, lang: string): string {
  if (!dateStr) return ""
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ""
  const diff   = Date.now() - date.getTime()
  const days   = Math.floor(diff / 86_400_000)
  const months = Math.floor(days / 30)
  const years  = Math.floor(days / 365)
  if (lang === "sq") {
    if (years  > 0) return `${years} vit më parë`
    if (months > 0) return `${months} muaj më parë`
    if (days   > 0) return `${days} ditë më parë`
    return "Sot"
  }
  if (lang === "it") {
    if (years  > 0) return `${years} ann${years > 1 ? "i" : "o"} fa`
    if (months > 0) return `${months} mes${months > 1 ? "i" : "e"} fa`
    if (days   > 0) return `${days} giorn${days > 1 ? "i" : "o"} fa`
    return "Oggi"
  }
  if (years  > 0) return `${years} year${years > 1 ? "s" : ""} ago`
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`
  if (days   > 0) return `${days} day${days > 1 ? "s" : ""} ago`
  return "Today"
}

function getInitials(name = "?") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
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

// ─── Sub-components ───────────────────────────────────────────────────────────
function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
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

// ─── Responsive cards-per-page helper ─────────────────────────────────────────
function getCardsPerPage(): number {
  if (typeof window === "undefined") return 3
  if (window.innerWidth < 768) return 1
  if (window.innerWidth < 1024) return 2
  return 3
}

function ReviewCard({ review, index, lang }: { review: ApifyReview; index: number; lang: string }) {
  const stars    = getStars(review)
  const text     = getText(review)
  const hasText  = text.length > 0
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]

  return (
    <a
      href={getLink(review)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center glass-strong rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer p-6 text-center relative"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-80`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mt-2 mb-3 group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
        <span className="text-white text-base font-bold tracking-wide">{getInitials(review.name)}</span>
      </div>

      <p className="font-semibold text-foreground text-sm leading-tight mb-0.5">{review.name ?? "Patient"}</p>
      <p className="text-xs text-muted-foreground mb-3">{timeAgo(getDate(review), lang)}</p>

      <StarRow count={stars} />

      {hasText ? (
        <>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-4" />
          <blockquote className="flex-1 text-sm text-foreground/80 leading-relaxed italic">"{text}"</blockquote>
        </>
      ) : (
        <p className="text-xs text-muted-foreground mt-2 mb-2">
          {stars === 5 ? uiT(lang, "excellent") : uiT(lang, "great")}
        </p>
      )}

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

  const [reviewsByLang, setReviewsByLang] = useState<Record<string, ApifyReview[]>>({ en: [], sq: [], it: [] })
  const [loadingLangs,  setLoadingLangs]  = useState<Record<string, boolean>>({ en: true, sq: true, it: true })
  const [errorLangs,    setErrorLangs]    = useState<Record<string, string | null>>({ en: null, sq: null, it: null })
  const [isRefreshing,  setIsRefreshing]  = useState(false)

  const [pageIndex, setPageIndex] = useState(0)
  const [isPaused,  setIsPaused]  = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [animKey,   setAnimKey]   = useState(0)

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage)

  useEffect(() => {
    const handleResize = () => {
      const next = getCardsPerPage()
      setCardsPerPage((prev) => {
        if (prev !== next) {
          setPageIndex(0)
          setProgress(0)
          setAnimKey((k) => k + 1)
        }
        return next
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const bgRefreshRef = useRef<Record<string, AbortController>>({})

  const reviews    = reviewsByLang[language] ?? []
  const loading    = loadingLangs[language]  ?? true
  const error      = errorLangs[language]    ?? null
  const totalPages = Math.ceil(reviews.length / cardsPerPage)

  const fetchFromDataset = useCallback(async (lang: string): Promise<ApifyReview[]> => {
    const datasetId = DATASET_IDS[lang]
    if (!datasetId) throw new Error(`No dataset ID configured for language: ${lang}`)
    const url = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&format=json&clean=true&limit=50`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Dataset fetch failed: HTTP ${res.status}`)
    const data = await res.json()
    const first = data?.[0]
    if (!first) throw new Error("Empty dataset")
    const raw: ApifyReview[] = Array.isArray(first?.reviews) ? first.reviews : data
    return processReviews(raw)
  }, [])

  const triggerFreshRun = useCallback(async (lang: string, signal: AbortSignal): Promise<ApifyReview[]> => {
    const res = await fetch(
      `https://api.apify.com/v2/acts/compass~google-maps-reviews-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=90`,
      {
        method: "POST",
        signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startUrls: [{ url: MAPS_URL }],
          maxReviews: 30,
          reviewsSort: "newest",
          language: lang === "it" ? "en" : lang,
        }),
      }
    )
    if (!res.ok) throw new Error(`Scraper run failed: HTTP ${res.status}`)
    const data: any[] = await res.json()
    const first = data?.[0]
    if (!first) throw new Error("Empty response")
    const raw: ApifyReview[] = Array.isArray(first?.reviews) ? first.reviews : data
    return processReviews(raw)
  }, [])

  const scheduleBackgroundRefresh = useCallback((lang: string, cacheKey: string) => {
    bgRefreshRef.current[lang]?.abort()
    const controller = new AbortController()
    bgRefreshRef.current[lang] = controller
    setIsRefreshing(true)
    triggerFreshRun(lang, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          localStorage.setItem(cacheKey, JSON.stringify({ reviews: result, ts: Date.now() }))
          setReviewsByLang((prev) => ({ ...prev, [lang]: result }))
        }
      })
      .catch((err) => { if (err.name !== "AbortError") console.warn(`BG refresh (${lang}) failed:`, err) })
      .finally(() => { if (!controller.signal.aborted) setIsRefreshing(false) })
  }, [triggerFreshRun])

  const loadLanguage = useCallback(async (lang: string, force = false) => {
    const cacheKey = CACHE_KEY_PREFIX + lang

    if (!force) {
      try {
        const raw = localStorage.getItem(cacheKey)
        if (raw) {
          const cached = JSON.parse(raw)
          const age = Date.now() - cached.ts
          if (age < CACHE_TTL) {
            setReviewsByLang((prev) => ({ ...prev, [lang]: cached.reviews }))
            setLoadingLangs((prev)  => ({ ...prev, [lang]: false }))
            if (age > BG_REFRESH_AFTER) scheduleBackgroundRefresh(lang, cacheKey)
            return
          }
        }
      } catch {}
    }

    const datasetLang = lang === "it" ? "en" : lang
    if (DATASET_IDS[datasetLang]) {
      try {
        const result = await fetchFromDataset(datasetLang)
        localStorage.setItem(cacheKey, JSON.stringify({ reviews: result, ts: Date.now() }))
        setReviewsByLang((prev) => ({ ...prev, [lang]: result }))
        setLoadingLangs((prev)  => ({ ...prev, [lang]: false }))
        setErrorLangs((prev)    => ({ ...prev, [lang]: null }))
        scheduleBackgroundRefresh(lang, cacheKey)
        return
      } catch (err) {
        console.warn(`Dataset fast-path (${lang}) failed:`, err)
      }
    }

    setLoadingLangs((prev) => ({ ...prev, [lang]: true }))
    setErrorLangs((prev)   => ({ ...prev, [lang]: null }))
    try {
      const controller = new AbortController()
      bgRefreshRef.current[lang] = controller
      const result = await triggerFreshRun(lang, controller.signal)
      localStorage.setItem(cacheKey, JSON.stringify({ reviews: result, ts: Date.now() }))
      setReviewsByLang((prev) => ({ ...prev, [lang]: result }))
      setErrorLangs((prev)    => ({ ...prev, [lang]: null }))
    } catch (err: any) {
      if (err.name !== "AbortError")
        setErrorLangs((prev) => ({ ...prev, [lang]: err.message ?? "Unknown error" }))
    } finally {
      setLoadingLangs((prev) => ({ ...prev, [lang]: false }))
    }
  }, [fetchFromDataset, triggerFreshRun, scheduleBackgroundRefresh])

  useEffect(() => {
    loadLanguage("en")
    loadLanguage("sq")
    loadLanguage("it")
    return () => { Object.values(bgRefreshRef.current).forEach((c) => c.abort()) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPageIndex(0)
    setProgress(0)
    setAnimKey((k) => k + 1)
  }, [language])

  const goTo       = useCallback((page: number) => { setPageIndex(page); setProgress(0); setAnimKey((k) => k + 1) }, [])
  const handleNext = useCallback(() => goTo((pageIndex + 1) % totalPages), [pageIndex, totalPages, goTo])
  const handlePrev = useCallback(() => goTo((pageIndex - 1 + totalPages) % totalPages), [pageIndex, totalPages, goTo])

  useEffect(() => {
    if (isPaused || reviews.length === 0 || totalPages <= 1) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { handleNext(); return 0 }
        return prev + (100 / (AUTOPLAY_MS / 100))
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isPaused, reviews.length, totalPages, handleNext])

  const startIdx       = pageIndex * cardsPerPage
  const visibleReviews = reviews.slice(startIdx, startIdx + cardsPerPage)

  const gridClass = cardsPerPage === 1
    ? "grid grid-cols-1 gap-6"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-10" />
      <div className="absolute top-20 left-20 w-64 h-64 gradient-purple-blue rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 gradient-blue-purple rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{uiT(language, "heading")}</span>
          </h2>
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            {uiT(language, "subheading")}
            {isRefreshing && (
              <span title={uiT(language, "refreshing")}>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground/50 inline" />
              </span>
            )}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-accent animate-spin" />
            <p className="text-muted-foreground text-sm">{uiT(language, "loading")}</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center gap-3 py-16">
            <p className="text-muted-foreground text-sm">{uiT(language, "error")}</p>
            <button
              onClick={() => loadLanguage(language, true)}
              className="flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              {uiT(language, "retry")}
            </button>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div key={animKey} className={`${gridClass} animate-fade-in-up`}>
              {visibleReviews.map((review, i) => (
                <ReviewCard key={startIdx + i} review={review} index={startIdx + i} lang={language} />
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={totalPages <= 1}
                aria-label="Previous"
                className="w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group disabled:opacity-40 flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5 text-accent group-hover:-translate-x-0.5 transition-transform duration-200" />
              </button>

              <div className="flex items-center gap-2 overflow-hidden max-w-[160px] justify-center flex-shrink">
                {Array.from({ length: totalPages }, (_, i) => {
                  const range = 2
                  const withinRange =
                    i === 0 ||
                    i === totalPages - 1 ||
                    Math.abs(i - pageIndex) <= range
                  if (!withinRange) return null
                  return (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Page ${i + 1}`}
                      className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 flex-shrink-0"
                      style={{
                        width: i === pageIndex ? 32 : 8,
                        background: i === pageIndex ? "transparent" : "hsl(var(--border))",
                      }}
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
                  )
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={totalPages <= 1}
                aria-label="Next"
                className="w-11 h-11 rounded-full glass-strong flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group disabled:opacity-40 flex-shrink-0"
              >
                <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>

            {/* Counter + view all */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">
                {uiT(language, "counter", pageIndex + 1, totalPages, reviews.length)}
              </span>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium"
              >
                <GoogleLogo />
                {uiT(language, "viewAll")}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}