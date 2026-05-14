/**
 * Category intro copy + per-category metadata.
 *
 * Search Console diagnostic (2026-05-14) flagged the /blog/category/* pages
 * as thin: a single line of description plus a grid of cards, with the same
 * generic title ("Blog | Livv Studio") across all seven category pages.
 * Google sees duplicate titles + low unique word count = "Discovered:
 * currently not indexed".
 *
 * This module ships:
 *   - A unique <title> per category (used by the category route's layout).
 *   - A unique meta description per category.
 *   - A 200-300 word intro paragraph per category, rendered on the page
 *     above the post grid so the category surface has real crawlable
 *     content explaining what the cluster covers, who it is for, and what
 *     a reader will find.
 *
 * All seven slugs match the cluster slugs in lib/blog/categories.ts.
 * Keep them aligned — a slug change there means a slug change here.
 */

export interface CategoryIntro {
  /** SEO title for the route. 50-60 chars target. */
  title: string
  /** Meta description. 140-160 chars target. */
  description: string
  /** Eyebrow shown above the H1 on the category page. */
  eyebrow: string
  /** H1 line if different from the category name (otherwise use category.name). */
  heading?: string
  /** 200-300 word intro paragraph rendered above the post grid. */
  intro: string
  /** Optional secondary paragraph for longer intros. */
  introExtra?: string
}

export const categoryIntros: Record<string, CategoryIntro> = {
  "webflow-seo": {
    title: "Webflow SEO Guides 2026 · LIVV Creative Studio",
    description:
      "Technical Webflow SEO guides from a studio that ships Webflow sites for a living. Site structure, meta, schema, CMS, Cloud, performance, and the edge cases agencies hit.",
    eyebrow: "✦  Cluster A  ✦",
    intro:
      "Webflow SEO is its own discipline. The platform's design freedom is the reason agencies pick it, and the same design freedom is the reason most Webflow sites ship with subtle SEO mistakes that an SEO-trained eye catches in fifteen seconds. The pieces in this cluster are written by the team that builds Webflow sites for a living, not by SEO generalists describing the platform from the outside.",
    introExtra:
      "What you will find here: technical guides for site architecture and URL structure, on-page best practices for headings and meta, structured data implementation in Webflow's Embed and Custom Code surfaces, sitemap generation and submission, performance optimization to hit Lighthouse 90+ scores, programmatic SEO patterns with the Webflow CMS, multi-locale and hreflang setups for franchise sites, and the specific cases where the visual editor's defaults will cost you ranking unless you override them. The audience is agency owners shipping client work in Webflow, freelance Webflow developers building their own SEO competency, and in-house Webflow operators at scale-ups who inherited a site and want to upgrade its search performance without rebuilding from scratch.",
  },
  "platform-comparisons": {
    title: "Webflow vs Framer vs Code · LIVV Creative Studio Blog",
    description:
      "Builder-perspective platform comparisons. Webflow vs Framer, no-code vs custom Next.js, when to switch tools, real trade-offs from a studio that ships in all three.",
    eyebrow: "✦  Cluster B  ✦",
    intro:
      "Most platform comparison content online is written by people who have not shipped real work in both tools. The pieces in this cluster are written from the other side. We ship in Webflow, Framer, and custom Next.js depending on what the project actually needs, which means we have real opinions about where each tool is the right call and where it forces compromises that quietly cost the project.",
    introExtra:
      "What you will find here: Webflow vs Framer comparisons grounded in actual delivery, not feature checklists. When no-code is enough and when a custom Next.js build is the correct call. How to migrate a marketing site between platforms without losing CMS depth or design fidelity. The pricing trade-offs at single-site, agency, and enterprise scale. The talent-market reality (Webflow developers are abundant, senior Framer designers are scarcer, both are growing). The cluster's flagship piece is a long-form 2026 practitioner's view comparing Webflow and Framer head-to-head with real client examples on both sides — see the editorial pieces section at the bottom of the page for the full list.",
  },
  "framer-seo": {
    title: "Framer SEO and Development Guides · LIVV Creative Studio",
    description:
      "Framer SEO from a studio that ships Framer at scale. Motion-heavy sites and crawler accessibility, code components, dynamic content patterns, performance and indexing.",
    eyebrow: "✦  Cluster C  ✦",
    intro:
      "Framer SEO is misunderstood. The platform's reputation as a designer-first tool has trained the market to think of it as inappropriate for serious SEO work, which has not been accurate since the major CMS and meta updates of 2024. The cluster covers the SEO and development patterns that matter when shipping Framer sites at the craft level the platform actually supports.",
    introExtra:
      "Topics here: technical SEO inside Framer's site structure, meta tag and Open Graph configuration, structured data implementation through Framer Code components, sitemap behavior in 2026, performance optimization for Framer's edge-rendered output, CMS schema patterns for content-heavy sites, the localization model and its limits, motion-heavy interactions and how they affect crawler indexing (Google's WRS handles most modern motion fine, but the failure modes are worth knowing), and the cases where exporting from Framer to a custom Next.js codebase becomes the correct call. Audience: designers and developers shipping in Framer who want to ship pages that rank, not just look right.",
  },
  "hiring-agencies": {
    title: "Hiring a Web Studio or Agency · LIVV Blog",
    description:
      "Practical guides for founders and design leads choosing a web design and development partner. Pricing, red flags, freelancer-vs-agency, white-label model, real ranges.",
    eyebrow: "✦  Cluster D  ✦",
    intro:
      "Hiring a studio or agency well is a real skill. Most founders learn it by getting burned twice and figuring it out on the third engagement. The pieces in this cluster compress that learning curve. They are written by a studio that has been hired, rejected, asked to bid on projects we should not have bid on, and asked to skip the bid by clients who already trusted us.",
    introExtra:
      "What is covered: when a freelancer is enough versus when a studio is the right call versus when only a large agency will do; the pricing models that work and the ones that consistently break; how to read a portfolio and what to ignore in it; the red flags that show up during the sales process before the contract is signed; the questions to ask in a discovery call that actually surface signal; the economics of the white-label model from both sides; the structural advantages and traps of long retainer relationships. Two of the longest, most-referenced pieces in this cluster are the Buyer's Guide to hiring a creative engineering studio and the White-Label Playbook explaining how serious white-label studios actually operate.",
  },
  "technical-integration": {
    title: "Webflow + Supabase + AI Integration Guides · LIVV",
    description:
      "Advanced integration patterns. Webflow plus Supabase, AI agents in production, Anthropic and OpenAI APIs, webhook architecture, edge functions, real workflows.",
    eyebrow: "✦  Cluster E  ✦",
    intro:
      "Real product work usually means three or four systems talking to each other through APIs and webhooks. The pieces in this cluster cover the integration patterns we use most often: Webflow as the marketing surface plugged into Supabase for the data layer, Next.js as the product layer, and increasingly an AI integration somewhere in the stack. We document the wiring that holds up under load and the failure modes that cost a day of debugging if you have not seen them before.",
    introExtra:
      "Topics here: connecting Webflow to Supabase via the Data API and via direct webhooks, the trade-offs between client-side and server-side data fetching, edge functions for personalization without hitting an origin server on every request, AI integration patterns against the Anthropic API and OpenAI, vector search for product features that need retrieval over a knowledge base, webhook idempotency and how to make payment integrations not double-charge, content sync between a CMS and an external store, and the cases where the integration is enough complexity to justify moving the surface to a custom Next.js build instead of stretching the no-code platform past its design intent.",
  },
  "creative-engineering": {
    title: "Creative Engineering as a Discipline · LIVV Blog",
    description:
      "Writing on creative engineering as a working discipline. Design systems thinking, tech stack decisions, motion fluency, the studio model, the Argentine tradition.",
    eyebrow: "✦  Cluster F  ✦",
    intro:
      "Creative engineering is a discipline that sits between design and development and refuses to choose. The pieces in this cluster name the practice. They cover the working principles, the tooling decisions, the kind of team that produces this work, and the broader context — including the Argentine tradition of creative engineering that has quietly powered a meaningful share of the global product layer over the last twenty years.",
    introExtra:
      "What you will find here: design systems thinking at production grade (not as a deck of components, but as the underlying contract between design and engineering); when a creative engineer is the right hire versus splitting design and engineering into two roles; the editorial sensibility that separates studio output from agency output; the role of motion fluency as a craft signal; the studio model and why senior-only teams ship differently than tiered ones; and a long-form essay on the Argentine creative engineering tradition that names a category most of the global design press has not yet named in English.",
  },
  "industry-guides": {
    title: "Industry Guides for Web Development · LIVV Blog",
    description:
      "Sector-specific web development guides. SaaS, restaurants, ecommerce, franchise. Building marketing sites and products for industries with specific constraints.",
    eyebrow: "✦  Cluster G  ✦",
    intro:
      "Different industries have different web requirements. A SaaS product page and a restaurant marketing site share almost no design constraints, almost no content patterns, and almost no performance budgets. The pieces in this cluster are sector-specific: written for the people building or buying web work in a particular industry, with the actual constraints of that industry in mind.",
    introExtra:
      "Sectors covered include SaaS marketing and product surfaces, restaurant and hospitality (where on-page menus, online ordering integrations, and reservation flows shape the entire information architecture), ecommerce on Webflow and Shopify (the trade-offs between the two for different brand stages), franchise and multi-location sites where the localization model is the architecture, B2B services with long sales cycles, and creator-economy platforms where the user-generated content layer changes the SEO surface. Each piece tries to be useful both to the operator inside the industry and to the agency or studio bidding on a project in that vertical for the first time.",
  },
}

export function getCategoryIntro(slug: string): CategoryIntro | undefined {
  return categoryIntros[slug]
}
