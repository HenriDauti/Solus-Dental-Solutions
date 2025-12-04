"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-border rounded-lg mb-4 overflow-hidden hover:border-primary transition-colors">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-muted transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronDown size={20} className={`text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-muted border-t border-border animate-slideUp">
          <p className="text-foreground opacity-75 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

interface AccordionProps {
  items: Array<{ q: string; a: string }>
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
