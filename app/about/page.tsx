import type { Metadata } from "next"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { trackContactClick } from "@/lib/analytics"
import {
  SITE_URL,
  STUDIO,
  buildBreadcrumbsJsonLd,
} from "@/lib/seo/structured-data"

/**
 * /about — manifesto and positioning page per LIVV editorial brief 6.1.
 *
 * Structure: single flowing essay, no H2 sections. Body sits in 600-900
 * words of prose. Below the essay: a small founder fact line and a
 * contact CTA. No team grid, no FAQ, no process timeline — those live
 * elsewhere on the site (/studio, /services/<slug>, /work).
 *
 * Voice is strict: zero em dashes, zero banned vocabulary, zero
 * rule-of-three claim stacking. Each paragraph runs 3-5 sentences with
 * varied length. The closing line is intentionally short and quotable.
 *
 * Renders as a Server Component so AI crawlers (ChatGPT Search,
 * Perplexity, Claude, Google AI Overviews) read the manifesto in the
 * initial HTML and can cite verbatim.
 */

export const metadata: Metadata = {
  title: "About",
  description:
    "LIVV Creative Studio. A creative engineering studio in Buenos Aires building digital products for founders and agencies, directly and as an invisible partner.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About · LIVV Creative Studio",
    description:
      "Creative engineering studio in Buenos Aires. Direct work and white-label partnerships for founders and agencies.",
    url: `${SITE_URL}/about`,
    siteName: "LIVV Creative Studio",
  },
}

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Home", url: SITE_URL },
  { name: "About", url: `${SITE_URL}/about` },
])

// Richer Person schema scoped to this page. The root layout already emits
// a baseline Person inside the Organization graph, but /about is the page
// AI crawlers extract for biographic context, so it ships the fuller record.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#founder`,
  name: STUDIO.founder.name,
  givenName: "Eneas",
  familyName: "Aldabe",
  jobTitle: STUDIO.founder.jobTitle,
  worksFor: { "@id": `${SITE_URL}#organization` },
  nationality: "Argentine",
  url: `${SITE_URL}/about`,
  knowsAbout: [
    "Creative engineering",
    "Webflow development",
    "Framer development",
    "Next.js development",
    "React Native development",
    "Flutter development",
    "Shopify development",
    "Supabase",
    "Anthropic API",
    "Design systems",
    "White-label studio model",
    "Argentine creative engineering tradition",
  ],
  sameAs: [...STUDIO.founder.sameAs],
}

export default function AboutPage() {
  return (
    <main className="bg-[#FAF8F3] text-[#2A1818] selection:bg-[#E6E2D6] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar />

      <article className="pt-40 md:pt-56 pb-24">
        <header className="max-w-3xl mx-auto px-6 mb-16">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-6 block">
            About
          </span>
          <h1 className="sr-only">About LIVV Creative Studio</h1>
        </header>

        {/* Manifesto body. No H2 sections — single flowing essay per brief
            6.1. Each paragraph runs 3-5 sentences with varied length. */}
        <div className="max-w-2xl mx-auto px-6 space-y-7 text-base md:text-lg leading-[1.75] text-[#2A1818]/90">
          <p className="text-xl md:text-2xl font-semibold text-[#2A1818] leading-snug tracking-tight">
            LIVV is a creative engineering studio.
          </p>

          <p>
            The phrase is more specific than it sounds. We are not a
            marketing agency, and we are not a development shop in the
            conventional sense. We do not sit comfortably in the commodity
            tier of subscription-based, section-priced Webflow shops, and
            we do not pretend to be the kind of awards-led, direct-only
            studio whose pricing puts them out of reach for most of the
            work that needs doing. The work is the same hands from first
            wireframe to deployed product. That is the only honest way we
            know to ship things at the level we want them shipped.
          </p>

          <p>
            Most of our work is white-label, behind agencies in the US and
            UK. We sign strict NDAs. We operate inside the agency's process,
            in the agency's tools, on the agency's calls. The end client
            never knows we exist. The work that does ship with our name on
            it sits closer to what you see from a studio in Berlin or Quebec
            than from a typical Buenos Aires shop, and we try not to make
            that the point.
          </p>

          <p>
            The fact that we do both modes, direct and invisible, is the
            architecture of the studio, not a side product of the model.
            White-label is not what we do between direct clients. It is
            the reason the studio runs at the scale it runs. Agencies in
            our partnership tier ship under our quiet support. They keep
            the recurring client relationship and the credit. We get the
            technical work, and the moments when the project lives or
            dies on a deploy. That is the trade we like.
          </p>

          <p>
            We work in whatever the project needs. Webflow when the client
            will own the CMS. Framer when the motion is part of the
            argument. Next.js with Supabase when the product is real. React
            Native or Flutter when the product has to live in a pocket.
            Shopify when there is inventory. Anthropic and OpenAI when the
            product wants to think. The tools are not the brand. The
            judgement about which tool to pick is closer to what the brand
            is.
          </p>

          <p>
            Buenos Aires is a deliberate choice, not a cost play. The city
            has produced an unusual amount of the design and engineering
            work that quietly powers the global product layer over the last
            fifteen years. There is a tradition here, even if it does not
            name itself. The conditions that created it do not replicate
            easily anywhere else. We are part of that tradition. We are
            also of the generation that intends to name it.
          </p>

          <p>
            Editorial taste runs through everything we ship. Not as
            decoration. Editorial taste is how you decide what to leave out.
            It is how a homepage stops feeling cluttered without losing any
            of its content. It is how a dashboard makes a CFO feel
            competent at her job instead of confused by her own data. It is
            how a brand identity does not look like every other identity
            that was made this year. The cuts are the work.
          </p>

          <p>
            We are small on purpose. The founder is on every project. There
            are no juniors handing off to other juniors. There is no agency
            layer between you and the people writing the code. The work
            begins with a quote and ends with a deploy. Most of the
            conversation in between is about the work, not about the
            process.
          </p>

          <p>
            The kind of client who finds us, finds us. Founders past their
            first fundraise who got burned once by a cheap shop. Design
            leads at scale-ups who need a partner that will not embarrass
            them in front of their CEO. And, increasingly, creative
            directors at agencies who need someone they can trust to ship
            under their name without their name showing up anywhere. We
            have not advertised any of this until now.
          </p>

          <p className="text-xl md:text-2xl font-semibold text-[#2A1818] leading-snug tracking-tight pt-4">
            The work is the work, and we like making it.
          </p>
        </div>

        {/* Founder fact line + photo + CTA. Brief 6.1: small line below
            the essay, photo optional, contact CTA. */}
        <section className="max-w-2xl mx-auto px-6 mt-20 border-t border-[#2A1818]/10 pt-12">
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
            <Image
              src="/images/senior-team-eneas.jpg"
              alt="Eneas Aldabe, founder of LIVV Creative Studio"
              width={96}
              height={96}
              quality={92}
              className="w-24 h-24 rounded-full object-cover object-top border border-[#2A1818]/10 shrink-0"
            />
            <div>
              <p className="text-base text-[#2A1818]/85 leading-relaxed">
                <span className="font-semibold text-[#2A1818]">
                  Eneas Aldabe
                </span>
                , founder. Works directly on every engagement. Writes about
                craft, the white-label model, and the Argentine creative
                engineering tradition.
              </p>
              <p className="text-xs text-[#2A1818]/55 mt-3">
                Founded in 2022. Olivos, Buenos Aires, Argentina.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hola@livv.systems"
              onClick={() => trackContactClick("email", "about_page")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2A1818] text-[#FAF8F3] text-sm font-medium hover:bg-[#2A1818]/90 transition-colors"
            >
              hola@livv.systems
            </a>
            <a
              href="https://cal.com/eneas-aldabe-youfep/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#2A1818]/15 text-sm font-medium text-[#2A1818] hover:bg-[#2A1818]/5 transition-colors"
            >
              Book 15 min
            </a>
          </div>
        </section>
      </article>

      <FooterSection />
    </main>
  )
}
