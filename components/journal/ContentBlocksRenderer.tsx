import type { BlogContentBlock, FaqItem } from "@/types/blog"
import { JournalFaq } from "./FAQ"
import { PullQuote } from "./PullQuote"

/**
 * Server-side renderer for editorial body content. Reuses BlogContentBlock
 * primitives from /blog so the schema for body content stays unified, but
 * applies journal-specific styling (magazine-style hierarchy, restrained
 * spacing, no SEO-blog cards) so editorial pieces don't look like the
 * /blog corpus.
 *
 * Hard rule from the LIVV editorial brief (section 4.3 / 5.3): every block
 * renders into the initial HTML so AI crawlers can extract it. No JS-gated
 * tabs or accordions for body content. The FAQ accordion uses native
 * <details>/<summary> so the answer is always in the DOM — visually
 * collapsed but readable by every crawler that doesn't run JS.
 */
export function JournalContentBlocksRenderer({
  blocks,
}: {
  blocks: BlogContentBlock[]
}) {
  return (
    <div className="journal-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            if (block.level === 2) {
              return (
                <h2
                  key={i}
                  id={block.id}
                  className="text-2xl md:text-[1.875rem] font-semibold tracking-tight text-[#2A1818] mt-16 mb-5 scroll-mt-24 first:mt-0"
                >
                  {block.content}
                </h2>
              )
            }
            return (
              <h3
                key={i}
                id={block.id}
                className="text-xl md:text-2xl font-semibold tracking-tight text-[#2A1818] mt-12 mb-4 scroll-mt-24"
              >
                {block.content}
              </h3>
            )
          }
          case "paragraph":
            return (
              <p
                key={i}
                className="text-base md:text-lg text-[#2A1818]/85 leading-[1.7] mb-6"
              >
                {block.content}
              </p>
            )
          case "list":
            if (block.ordered) {
              return (
                <ol
                  key={i}
                  className="list-decimal list-outside pl-6 space-y-2 mb-8 text-base md:text-lg text-[#2A1818]/85 leading-[1.7] marker:text-[#C4A35A] marker:font-semibold"
                >
                  {block.items.map((item, j) => (
                    <li key={j} className="pl-1">
                      {item}
                    </li>
                  ))}
                </ol>
              )
            }
            return (
              <ul
                key={i}
                className="list-disc list-outside pl-6 space-y-2 mb-8 text-base md:text-lg text-[#2A1818]/85 leading-[1.7] marker:text-[#C4A35A]"
              >
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            )
          case "quote":
            return (
              <PullQuote
                key={i}
                content={block.content}
                attribution={block.attribution}
              />
            )
          case "image":
            return (
              <figure key={i} className="my-12">
                <img
                  src={block.url}
                  alt={block.alt}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                />
                {block.caption && (
                  <figcaption className="text-sm text-[#2A1818]/55 mt-3 leading-relaxed">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )
          case "callout": {
            const variantStyles = {
              tip: "border-[#769268]/30 bg-[#769268]/5",
              warning: "border-[#E8BC59]/40 bg-[#E8BC59]/5",
              info: "border-[#2A1818]/15 bg-[#FAF8F3]",
            }
            return (
              <aside
                key={i}
                className={`border rounded-2xl p-6 my-8 ${variantStyles[block.variant]}`}
              >
                <p className="text-base text-[#2A1818]/85 leading-relaxed m-0">
                  {block.content}
                </p>
              </aside>
            )
          }
          case "code":
            return (
              <pre
                key={i}
                className="bg-[#1a1a1a] text-[#fafafa] p-5 rounded-xl my-8 overflow-x-auto text-sm leading-relaxed font-mono"
              >
                <code className={block.language ? `language-${block.language}` : undefined}>
                  {block.content}
                </code>
              </pre>
            )
          case "table":
            return (
              <div key={i} className="my-10 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {block.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="text-left text-xs font-semibold uppercase tracking-wider text-[#2A1818]/60 px-4 py-3 border-b-2 border-[#2A1818]/20"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-[#2A1818]/10">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-[#2A1818]/85 leading-relaxed align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case "faq":
            return <JournalFaq key={i} items={block.items as FaqItem[]} />
          case "cta":
            return (
              <div key={i} className="my-12 border-t border-b border-[#2A1818]/15 py-10 text-center">
                <p className="text-lg text-[#2A1818]/85 leading-relaxed mb-5">
                  {block.text}
                </p>
                <a
                  href={block.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2A1818] text-[#FAF8F3] text-sm font-medium hover:bg-[#2A1818]/90 transition-colors"
                >
                  {block.buttonText}
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
