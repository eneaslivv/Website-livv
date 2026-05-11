import type { ReactNode } from "react"

/**
 * /about layout. Page-level metadata + JSON-LD (Person, BreadcrumbList)
 * live in app/about/page.tsx so they evolve with the manifesto. Previous
 * versions of this layout emitted a FAQPage schema, but the About is
 * now a manifesto (LIVV editorial brief 6.1) with no FAQ on the page,
 * so emitting that schema would be a misleading signal to LLM / search
 * crawlers ("here is a FAQ on this URL" when there is not). Cleared.
 */
export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
