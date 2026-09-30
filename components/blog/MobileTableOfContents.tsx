import { BlogContentBlock } from "@/types/blog"
import { generateTableOfContents } from "@/lib/blog/toc"

/**
 * Phones only. The sticky table of contents is lg-only, and a post runs to
 * ~18,000 px with nine sections, so on a phone there was no way to jump. A
 * folded "On this page" before the text does that job; no JavaScript needed.
 */
export function MobileTableOfContents({ blocks }: { blocks: BlogContentBlock[] }) {
  const headings = generateTableOfContents(blocks).filter((h) => h.level === 2)
  if (headings.length < 3) return null

  return (
    <details className="group lg:hidden mb-10 border-y border-[#E6E2D6]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#5A3E3E]/60 [&::-webkit-details-marker]:hidden">
        On this page
        <span aria-hidden="true" className="text-base font-normal transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">
          +
        </span>
      </summary>
      <ol className="pb-3">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="block py-3 text-sm leading-snug text-[#2A1818]">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  )
}
