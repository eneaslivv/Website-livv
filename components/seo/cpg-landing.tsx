import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { STUDIO } from "@/lib/seo/structured-data"

export type CpgFact = { label: string; value: string }
export type CpgFaq = { q: string; a: string }
export type CpgSection = { title: string; body: React.ReactNode }
export type CpgLink = { href: string; name: string; description: string }

export interface CpgLandingProps {
  jsonLd: object[]
  kicker: string
  title: string
  intro: string
  facts?: CpgFact[]
  sections: CpgSection[]
  related?: { title: string; items: CpgLink[] }
  faq: CpgFaq[]
  ctaLead?: string
}

export function CpgLanding({
  jsonLd,
  kicker,
  title,
  intro,
  facts = [],
  sections,
  related,
  faq,
  ctaLead,
}: CpgLandingProps) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F6F3ED] text-[#171714]">
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <Navbar isLoaded theme="dark" />

      <main className="relative pt-28 md:pt-36">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[620px] opacity-60"
          style={{
            background:
              "radial-gradient(circle at 20% 15%, rgba(196,163,90,.16), transparent 34%), radial-gradient(circle at 82% 12%, rgba(119,146,104,.14), transparent 30%)",
          }}
        />

        <article className="relative mx-auto max-w-5xl px-6 pb-24 md:px-12">
          <header className="mb-16 max-w-4xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-black/45">
              {kicker}
            </p>
            <h1 className="text-4xl font-light leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-black/62 md:text-xl">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#171714] px-5 py-3 text-sm text-white transition-transform hover:-translate-y-0.5"
              >
                Start a CPG project
              </Link>
              <Link
                href="/work"
                className="rounded-full border border-black/15 bg-white/50 px-5 py-3 text-sm text-black/75 transition-colors hover:bg-white"
              >
                See selected work
              </Link>
            </div>
          </header>

          {facts.length > 0 && (
            <section className="mb-20 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-[#F6F3ED] p-5 md:p-6">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-black/38">
                    {fact.label}
                  </p>
                  <p className="text-sm leading-relaxed text-black/78">{fact.value}</p>
                </div>
              ))}
            </section>
          )}

          <div className="max-w-4xl">
            {sections.map((section) => (
              <Section key={section.title} title={section.title}>
                {section.body}
              </Section>
            ))}

            {related && related.items.length > 0 && (
              <Section title={related.title}>
                <div className="grid gap-3 md:grid-cols-2">
                  {related.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl border border-black/10 bg-white/40 p-5 transition-colors hover:bg-white/75"
                    >
                      <p className="font-medium text-black/85">{item.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-black/55">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </Section>
            )}

            <Section title="Frequently asked questions">
              <dl className="space-y-7">
                {faq.map(({ q, a }) => (
                  <div key={q}>
                    <dt className="font-medium text-black/85">{q}</dt>
                    <dd className="mt-2 leading-relaxed text-black/60">{a}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <section className="rounded-2xl bg-[#171714] p-7 text-white md:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">LIVV × CPG</p>
              <h2 className="mt-3 text-3xl font-light tracking-[-0.03em] md:text-4xl">
                Build the digital side of your brand like it already belongs on the shelf.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/65">
                {ctaLead ??
                  "Tell us where the brand is today and what the next retail or growth milestone looks like. We will recommend the smallest useful scope."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact" className="rounded-full bg-white px-5 py-3 text-sm text-black">
                  Talk to LIVV
                </Link>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="rounded-full border border-white/20 px-5 py-3 text-sm text-white/80"
                >
                  {STUDIO.email}
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <FooterSection />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16 border-t border-black/10 pt-7">
      <h2 className="mb-5 text-2xl font-light tracking-[-0.025em] md:text-3xl">{title}</h2>
      <div className="leading-relaxed text-black/66">{children}</div>
    </section>
  )
}
