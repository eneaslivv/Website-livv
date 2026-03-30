"use client"

import { BlogContentBlock, FaqItem } from "@/types/blog"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3 mb-8">
      {items.map((item, i) => (
        <div key={i} className="border border-[#E6E2D6] rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-[#E6E2D6]/30 transition-colors"
          >
            <span className="font-medium text-[#2A1818] pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#5A3E3E]/40 shrink-0 transition-transform duration-300 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5 text-[#5A3E3E]/70 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function BlogContentRenderer({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="blog-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={i}
                  id={block.id}
                  className="text-2xl md:text-3xl font-semibold text-[#2A1818] tracking-tight mt-12 mb-4 scroll-mt-24"
                >
                  {block.content}
                </h2>
              )
            }
            return (
              <h3
                key={i}
                id={block.id}
                className="text-xl md:text-2xl font-medium text-[#2A1818] tracking-tight mt-8 mb-3 scroll-mt-24"
              >
                {block.content}
              </h3>
            )

          case "paragraph":
            return (
              <p
                key={i}
                className="text-base md:text-lg text-[#5A3E3E]/70 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            )

          case "list":
            if (block.ordered) {
              return (
                <ol key={i} className="list-decimal list-inside space-y-2 mb-6 text-[#5A3E3E]/70 leading-relaxed pl-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-base md:text-lg" dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ol>
              )
            }
            return (
              <ul key={i} className="list-disc list-inside space-y-2 mb-6 text-[#5A3E3E]/70 leading-relaxed pl-2">
                {block.items.map((item, j) => (
                  <li key={j} className="text-base md:text-lg" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-[#C4A35A] pl-6 py-2 mb-8 italic text-lg text-[#5A3E3E]/70 leading-relaxed"
              >
                <p>{block.content}</p>
                {block.attribution && (
                  <cite className="block mt-2 text-sm text-[#5A3E3E]/50 not-italic">
                    — {block.attribution}
                  </cite>
                )}
              </blockquote>
            )

          case "image":
            return (
              <figure key={i} className="my-8">
                <div className="w-full aspect-video bg-[#E6E2D6] rounded-xl flex items-center justify-center">
                  <span className="text-[#5A3E3E]/30 text-sm">{block.alt}</span>
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm text-[#5A3E3E]/50">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          case "callout":
            const variants = {
              tip: "bg-emerald-50 border-emerald-300 text-emerald-900",
              warning: "bg-amber-50 border-amber-300 text-amber-900",
              info: "bg-blue-50 border-blue-300 text-blue-900",
            }
            return (
              <div
                key={i}
                className={`border rounded-xl p-5 mb-6 ${variants[block.variant]}`}
              >
                <p className="text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content }} />
              </div>
            )

          case "code":
            return (
              <div key={i} className="mb-6">
                {block.language && (
                  <div className="bg-[#2A1818] text-[#C4A35A] text-xs px-4 py-2 rounded-t-lg font-mono">
                    {block.language}
                  </div>
                )}
                <pre
                  className={`bg-[#1a1a1a] text-[#e0e0e0] p-5 overflow-x-auto text-sm font-mono leading-relaxed ${
                    block.language ? "rounded-b-lg" : "rounded-lg"
                  }`}
                >
                  <code>{block.content}</code>
                </pre>
              </div>
            )

          case "table":
            return (
              <div key={i} className="overflow-x-auto mb-8 rounded-xl border border-[#E6E2D6]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#E6E2D6]/50">
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="px-5 py-3 text-left font-semibold text-[#2A1818] border-b border-[#E6E2D6]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-[#E6E2D6] last:border-0">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className="px-5 py-3 text-[#5A3E3E]/70"
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case "faq":
            return <FaqAccordion key={i} items={block.items} />

          case "cta":
            return (
              <div
                key={i}
                className="my-10 bg-gradient-to-br from-[#2A1818] to-[#1a0f0f] rounded-2xl p-8 md:p-10 text-center"
              >
                <p className="text-white/90 text-lg md:text-xl mb-6">{block.text}</p>
                <a
                  href={block.link}
                  className="inline-flex items-center gap-2 bg-[#C4A35A] hover:bg-[#d4b36a] text-white font-medium px-6 py-3 rounded-full transition-colors duration-300"
                >
                  {block.buttonText}
                  <span>→</span>
                </a>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
