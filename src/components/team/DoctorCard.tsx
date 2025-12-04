"use client"

import { User } from "lucide-react"

interface DoctorCardProps {
  name: string
  title: string
  specialization: string
  experience: string
  education: string
  bio: string
  image: string
}

export default function DoctorCard({
  name,
  title,
  specialization,
  experience,
  education,
  bio,
  image,
}: DoctorCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="w-full h-64 bg-muted flex items-center justify-center">
        <User size={80} className="text-border" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-1">{name}</h3>
        <p className="text-sm font-semibold text-primary opacity-80 mb-3">{title}</p>

        <div className="space-y-2 text-sm mb-4 pb-4 border-b border-border">
          <p className="text-foreground opacity-75">
            <span className="font-semibold text-primary">Specialization:</span> {specialization}
          </p>
          <p className="text-foreground opacity-75">
            <span className="font-semibold text-primary">Experience:</span> {experience}
          </p>
          <p className="text-foreground opacity-75">
            <span className="font-semibold text-primary">Education:</span> {education}
          </p>
        </div>

        <p className="text-sm text-foreground opacity-75">{bio}</p>
      </div>
    </div>
  )
}
