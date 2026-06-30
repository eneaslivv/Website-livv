import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { STUDIO } from "@/lib/seo/structured-data"

export type AeoFact = { label: string; value: string }
export type AeoFaq = { q: string; a: string }
export type AeoSection = { title: string; body: React.ReactNode }
export type AeoLink = { href: string; name: string; description: string }

export interface AeoLandingProps {
  /** JSON-LD blocks (FAQPage, Service, BreadcrumbList, …) injected into <head>-equivalent. */
  jsonLd: object[]
  kicker: string
  title: string
  intro: string
  facts: AeoFact[]
  sections: AeoSection[]
  /** Optional list of internal links rendered as a "Servicios relacionados" block. */
  related?: { title: string; items: AeoLink[] }
  faq: AeoFaq[]
  /** CTA paragraph nodes rendered under "Empezá tu proyecto". */
  ctaLead?: string
}

/**
 * Shared server component for the Spanish-language AEO (Answer Engine
 * Optimization) landing pages — /software-a-medida, /desarrollo-de-apps,
 * /diseno-a-medida. Mirrors the structure of /studio so the studio's visual
 * language is consistent, but the copy and schema target high-intent Spanish
 * commercial queries from Argentine and LATAM companies.
 */
export function AeoLanding({
  jsonLd,
  kicker,
  title,
  intro,
  facts,
  sections,
  related,
  faq,
  ctaLead,
}: AeoLandingProps) {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {jsonLd.map((block, i) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <Navbar isLoaded />

      <main className="pt-24 md:pt-32">
        <article className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-white/50 mb-4">
              {kicker}
            </p>
            <h1 className="text-4xl md:text-6xl font-light leading-tight">
              {title}
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">{intro}</p>
          </header>

          {facts.length > 0 && (
            <section className="grid md:grid-cols-2 gap-8 mb-16 text-sm">
              {facts.map((f) => (
                <div key={f.label}>
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
                    {f.label}
                  </p>
                  <p className="text-white/90">{f.value}</p>
                </div>
              ))}
            </section>
          )}

          {sections.map((s) => (
            <Section key={s.title} title={s.title}>
              {s.body}
            </Section>
          ))}

          {related && related.items.length > 0 && (
            <Section title={related.title}>
              <ul className="space-y-3">
                {related.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block group">
                      <p className="text-white group-hover:underline underline-offset-4">
                        {item.name}
                      </p>
                      <p className="text-sm text-white/60">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Preguntas frecuentes">
            <dl className="space-y-6">
              {faq.map(({ q, a }) => (
                <div key={q}>
                  <dt className="text-base font-medium text-white">{q}</dt>
                  <dd className="mt-1 text-white/70 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Empezá tu proyecto">
            <p className="text-white/70">
              {ctaLead ??
                "Contanos qué necesitás y te respondemos en un día hábil desde Buenos Aires."}{" "}
              Escribinos a{" "}
              <a
                href={`mailto:${STUDIO.email}`}
                className="text-white underline underline-offset-4"
              >
                {STUDIO.email}
              </a>{" "}
              o usá el{" "}
              <Link
                href="/contact"
                className="text-white underline underline-offset-4"
              >
                formulario de contacto
              </Link>
              .
            </p>
          </Section>
        </article>
      </main>

      <FooterSection />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-light mb-4 border-b border-white/10 pb-3">
        {title}
      </h2>
      <div className="text-white/80 leading-relaxed">{children}</div>
    </section>
  )
}
