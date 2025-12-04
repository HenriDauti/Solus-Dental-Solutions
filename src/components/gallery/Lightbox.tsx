"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface LightboxProps {
  image: string
  alt: string
  onClose: () => void
}

export default function Lightbox({ image, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-10 rounded-full p-2 transition-all"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>
      <img
        src={image || "/placeholder.svg"}
        alt={alt}
        className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
