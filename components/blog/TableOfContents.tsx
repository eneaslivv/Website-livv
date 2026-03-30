"use client"

import { useEffect, useState } from "react"
import { BlogContentBlock } from "@/types/blog"
import { generateTableOfContents } from "@/lib/blog/utils"

interface TableOfContentsProps {
  blocks: BlogContentBlock[]
}

export function TableOfContents({ blocks }: TableOfContentsProps) {
  const headings = generateTableOfContents(blocks)
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )

    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  return (
    <nav className="hidden lg:block sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#5A3E3E]/40 mb-4">
        On this page
      </p>
      <ul className="space-y-2 border-l border-[#E6E2D6]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
              }}
              className={`block text-sm leading-snug transition-all duration-200 ${
                h.level === 3 ? "pl-6" : "pl-4"
              } py-1 -ml-px border-l-2 ${
                activeId === h.id
                  ? "border-[#C4A35A] text-[#2A1818] font-medium"
                  : "border-transparent text-[#5A3E3E]/50 hover:text-[#2A1818] hover:border-[#E6E2D6]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
