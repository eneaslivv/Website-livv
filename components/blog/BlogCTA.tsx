"use client"

import Link from "next/link"
import { BlogCTA as BlogCTAType } from "@/types/blog"

interface BlogCTAProps {
  cta: BlogCTAType
}

export function BlogCTA({ cta }: BlogCTAProps) {
  return (
    <section className="my-16 bg-gradient-to-br from-[#2A1818] to-[#1a0f0f] rounded-2xl p-8 md:p-12 text-center">
      <p className="text-white/90 text-xl md:text-2xl font-medium mb-6 max-w-xl mx-auto leading-relaxed">
        {cta.text}
      </p>
      <Link
        href={cta.link}
        className="inline-flex items-center gap-2 bg-[#C4A35A] hover:bg-[#d4b36a] text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-300"
      >
        {cta.type === "contact" ? "Get in Touch" : "Learn More"}
        <span>→</span>
      </Link>
    </section>
  )
}
