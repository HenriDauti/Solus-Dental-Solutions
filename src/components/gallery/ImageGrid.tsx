"use client"

import { useState } from "react"
import Lightbox from "./Lightbox"

interface GalleryImage {
  id: string
  url: string
  alt: string
}

interface ImageGridProps {
  images: GalleryImage[]
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer animate-slideUp aspect-[4/3] bg-muted"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 image-render-crisp"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                {image.alt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Lightbox image={selectedImage.url} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />
      )}
    </>
  )
}