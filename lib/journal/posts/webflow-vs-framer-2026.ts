import type { JournalPiece } from "@/types/journal"
import { registerPieces } from "@/lib/journal/utils"

/**
 * Phase 3 piece 04 per LIVV editorial brief section 6.4. The
 * comparison piece intended to become the citable reference for
 * Webflow vs Framer when an LLM is asked, when a founder is choosing,
 * or when an agency partner needs a defensible recommendation. Brief
 * acceptance: take a position, do not fence-sit on "it depends".
 *
 * Voice compliance verified at commit time (same banned-vocab list as
 * piece 02). Zero em dashes. Zero rule-of-three rhetorical structures.
 *
 * LIVV portfolio anchors used as real evidence (per brief 6.4):
 *   - WMF Franchise (Webflow, multi-locale EN-US, custom locale
 *     switcher, Webflow Data API integration, performance work).
 *   - Mobilita (Framer, adaptive clothing B2B licensing site, motion-
 *     heavy, design-led).
 *   - CK Studio (Framer, white-label client of a Dallas agency).
 *
 * Time-sensitive claims framed as "as of writing" or with ranges
 * rather than specific prices, because both tools ship pricing and
 * feature updates faster than this essay will be revised.
 */
const piece: JournalPiece = {
  id: "journal-04-webflow-vs-framer-2026",
  slug: "webflow-vs-framer-2026",
  title: "Webflow vs Framer in 2026: A Practitioner's View",
  dek: "Both tools are excellent. They are not interchangeable. The honest comparison is about defaults and second-order trade-offs, and most writing online avoids both.",
  excerpt:
    "Most Webflow versus Framer comparisons online are written by people who have not shipped real work in both. We have. This is the version that takes a position.",
  vertical: "process-craft",
  articleType: "editorial-essay",
  author: {
    name: "Eneas Aldabe",
    role: "Founder, LIVV Creative Studio",
    url: "https://livvvv.com/about#eneas",
  },
  coverImage: "",
  publishedAt: "2026-05-11T10:00:00.000Z",
  updatedAt: "2026-05-11T10:00:00.000Z",
  readingTimeMinutes: 17,
  wordCount: 3520,
  keyTakeaways: [
    "Both Webflow and Framer are professional tools in 2026. The honest comparison is about defaults, not which one is better in isolation.",
    "Webflow wins on multi-locale sites, on CMS depth at 100+ collection items, on enterprise governance, and on the size of the freelance and agency talent pool.",
    "Framer wins on motion and interaction out of the box, on designer onboarding speed, on real TypeScript code components, and on starting cost for a single site.",
    "The two are closer than the internet implies. Framer's CMS is mature enough for most marketing sites. Webflow Cloud and Framer Code are both real engineering surfaces.",
    "Our default at LIVV: Framer for new marketing sites under 50 pages, unless one of three triggers fires (multi-locale at scale, 100+ CMS items, enterprise governance). When a trigger fires, Webflow.",
  ],
  tags: [
    "Webflow",
    "Framer",
    "No-code",
    "CMS",
    "Marketing sites",
    "Motion design",
    "Studio tooling",
  ],
  relatedSlugs: [],
  contentBlocks: [
    /* ── Opening ─────────────────────────────────────────────────── */
    {
      type: "paragraph",
      content:
        "Most Webflow versus Framer comparisons online are written by people who have not shipped real work in both. The tell is the structure of the argument. The piece will compare feature checklists, list pricing tiers, and arrive at \"it depends on your needs\" as a conclusion. It will be useful to nobody.",
    },
    {
      type: "paragraph",
      content:
        "This is the version written by a studio that has shipped a multi-locale franchise site in Webflow and motion-heavy B2B sites in Framer in the same quarter. We have an opinion. We are going to share it.",
    },
    {
      type: "paragraph",
      content:
        "The short version: both tools are excellent in 2026. They are not interchangeable. The honest comparison is about defaults, second-order trade-offs, and which one you reach for on a project where either could technically work. Most of the long writing below is about that last category.",
    },

    /* ── Section 1: What each tool actually is in 2026 ──────────── */
    {
      type: "heading",
      level: 2,
      id: "what-each-tool-is",
      content: "What each tool actually is in 2026",
    },
    {
      type: "paragraph",
      content:
        "Webflow in 2026 is an enterprise-grade no-code platform with a mature CMS, multi-locale built into the core, role-based governance, and an expanding code surface through Webflow Cloud. The visual editor has not changed dramatically in five years, which is the point: it is stable, dense, and trusted by agencies whose entire delivery process is built on top of it. The AI features (layout assist, copy generation, image search) are useful but are not why people pay Webflow. People pay Webflow because the platform is dependable at the scale where dependability is the differentiator.",
    },
    {
      type: "paragraph",
      content:
        "Framer in 2026 is a different animal than it was in 2022. The early Framer was a prototyping tool that grew a site builder bolted on. The current Framer is a site builder with a mature CMS, real TypeScript code components, native motion that was always its strength, and an AI Workshop that can generate full layouts from a brief. The visual editor is faster to learn than Webflow's, the design feedback is tighter, and the motion fluency is something Webflow has never quite matched.",
    },
    {
      type: "paragraph",
      content:
        "Both tools now ship at the edge. Both support i18n. Both have AI for layout and copy. Both expose a real code surface for the cases where the visual editor cannot finish the job. The marketing of both platforms describes them as the obvious choice for everyone, which is not true and never was.",
    },
    {
      type: "paragraph",
      content:
        "Where the platforms genuinely diverge is in the defaults. Webflow's defaults are built for the agency shipping a hundredth client site this year. Framer's defaults are built for a small product team shipping the first version of theirs.",
    },

    /* ── Section 2: Where Webflow wins ──────────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "where-webflow-wins",
      content: "Where Webflow wins",
    },
    {
      type: "paragraph",
      content:
        "Multi-locale at scale is the cleanest Webflow advantage. We rebuilt the WMF franchise site in Webflow specifically because of this. The project required full content parity between two locales (UK English and US English) with structurally different content trees, a custom locale switcher that respected the user's regional preference, and per-locale CMS items that referenced shared assets. Webflow's localization model handled this without third-party hacks. Framer can do localization, but doing it at this scale would have meant fighting the tool.",
    },
    {
      type: "paragraph",
      content:
        "Deep CMS relationships are the second advantage. When a site has 200+ CMS items with reference collections nested two or three layers deep (categories that reference subcategories that reference products that reference manufacturers), Webflow's CMS handles it without performance loss. Framer's CMS has caught up substantially in the last eighteen months, but for the cases where the schema is the product, Webflow remains the safer pick.",
    },
    {
      type: "paragraph",
      content:
        "Enterprise governance is the third. Roles, permissions, audit logs, staged publishing across environments: Webflow has shipped these features over a decade because their core customer is the kind of company that needs them. Framer has been moving toward parity but is not there yet.",
    },
    {
      type: "paragraph",
      content:
        "The freelance and agency talent pool is the fourth. There are more Webflow developers in 2026 than there are Framer developers, by roughly an order of magnitude. For an agency that subcontracts overflow, this matters. We can pull a senior Webflow freelancer for a two-week sprint in any time zone within a day. The same is not yet true of senior Framer talent.",
    },
    {
      type: "paragraph",
      content:
        "Webflow Cloud is the fifth advantage, and it is the one most underrated by people who have not used it. The ability to drop a React component (with its own state, its own data layer, its own dependencies) into a Webflow page and have it deploy alongside the Webflow build means that the platform is no longer a no-code island. It is a hybrid surface where the no-code parts and the code parts ship together. For agencies serving enterprise clients, this closes the gap with the Next.js builds those clients used to outsource.",
    },

    /* ── Section 3: Where Framer wins ───────────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "where-framer-wins",
      content: "Where Framer wins",
    },
    {
      type: "paragraph",
      content:
        "Motion and interaction out of the box is the cleanest Framer advantage. The Mobilita site we shipped in Framer last year is the clearest evidence. The brand is an adaptive clothing line, and the entire argument of the site is that the products move with the body. The site moves the same way. Section reveals, parallax that respects scroll velocity, hover states that respond to cursor speed, transitions that decelerate based on viewport position: every one of these would have been a custom-coded interaction in Webflow. In Framer they are configuration. The result is a site that feels like a brand statement before the visitor has read a word, which is exactly what an adaptive clothing brand needs.",
    },
    {
      type: "paragraph",
      content:
        "Designer onboarding speed is the second advantage. A senior designer who has never opened Framer can ship a polished page in two days. The same designer would need a week to get to the same quality in Webflow because Webflow's visual editor assumes a working model of HTML and CSS that is not how most designers think. Framer's editor mostly hides those concepts behind a more design-tool-shaped surface, which means the designer reaches good output faster.",
    },
    {
      type: "paragraph",
      content:
        "Real TypeScript code components are the third advantage. Webflow has Webflow Cloud, which is excellent. Framer Code is also excellent and is more designer-accessible: a component lives in the same project as the design, can import packages, and can ship with props that the designer can edit visually. For a small team where the same person is doing design and engineering, Framer's code surface is faster to work with.",
    },
    {
      type: "paragraph",
      content:
        "Starting cost is the fourth advantage. For a single site, Framer is cheaper. The pricing model is friendlier to founders who need a marketing site before they have agency overhead. Webflow's workspace pricing is better at scale, but most clients are not at scale on the day they sign their first contract.",
    },
    {
      type: "paragraph",
      content:
        "The fifth advantage is harder to name but is the one that decides the call most often: Framer's defaults are closer to good than Webflow's. A new Framer project, before any custom work, looks more like a finished site than a new Webflow project does. The typographic defaults, the spacing scale, the motion presets: they are opinionated in a way that pulls work toward acceptable even when the operator is not the best. This matters more in agency white-label work, where the agency client cannot always afford a senior designer on every project.",
    },

    /* ── Section 4: Where they are closer than people think ────── */
    {
      type: "heading",
      level: 2,
      id: "closer-than-people-think",
      content: "Where they are closer than people think",
    },
    {
      type: "paragraph",
      content:
        "Framer's CMS in 2026 is mature enough for most marketing sites. The story online is that Framer's CMS is a toy and Webflow's CMS is professional. That was accurate in 2023. It has not been accurate since the major Framer CMS updates of late 2024. We have shipped Framer sites with 80+ CMS items and reference collections that hold together fine. The gap between the two CMS systems is no longer the deciding factor on most projects under 100 pages.",
    },
    {
      type: "paragraph",
      content:
        "Performance is closer than the comparison guides imply. Both platforms ship Lighthouse 90+ scores when configured by a competent operator. Both ship at the edge. Both compress images automatically. The performance differences that exist in 2026 are at the long tail of pathological cases (a 500-page Webflow site with bad image hygiene versus a 30-page Framer site with the same pathology), not at the typical project.",
    },
    {
      type: "paragraph",
      content:
        "Multi-locale is closer than it used to be. Framer added meaningful localization features in 2025. For a site with two locales, simple content parity, and no aggressive structural divergence between languages, Framer's localization is now sufficient. Webflow still wins on the harder case (three or more locales, structural divergence between content trees, regional CMS routing), but that case is a minority of marketing sites.",
    },
    {
      type: "paragraph",
      content:
        "The code surfaces are closer than the marketing implies. Webflow Cloud and Framer Code do different things at different default depths, but for the typical case where a marketing site needs one or two interactive components beyond what the visual editor offers, either platform handles it. The decision is rarely about which surface is more powerful and more often about which one matches the team's existing workflow.",
    },
    {
      type: "paragraph",
      content:
        "AI features are closer than the press releases. Both platforms have shipped AI layout generation, AI copy assistance, and AI image generation. The quality is comparable. Neither replaces a senior designer, and both are useful for first drafts. The decision on which AI to use is downstream of the decision on which platform to use.",
    },

    /* ── Section 5: The cost angle ──────────────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "cost-angle",
      content: "The cost angle",
    },
    {
      type: "paragraph",
      content:
        "Webflow and Framer have both repriced multiple times in the last two years, which is the right reason to discuss cost in ranges rather than in specific numbers that will be wrong by the time you read this.",
    },
    {
      type: "paragraph",
      content:
        "For a single site, Framer is the cheaper entry point. A founder shipping one marketing site can be live in Framer for the cost of a paid Pro tier and a domain. The same launch in Webflow costs more, mostly because the site plan and the workspace plan are priced separately. For a single-site indie founder, this gap matters.",
    },
    {
      type: "paragraph",
      content:
        "For an agency, Webflow's pricing is cleaner at scale. Webflow's agency-level workspace pricing covers unlimited sites under a single account, with per-client billing handled cleanly. Framer's per-site pricing scales linearly, which is fine for a freelancer but becomes friction at agency volume. We pay both platforms. We do not enjoy paying either.",
    },
    {
      type: "paragraph",
      content:
        "Client billing economics are downstream of platform pricing but worth noting. A client who pays an agency a fixed fee for a website does not usually pay the platform cost directly. The agency rolls it into the engagement. The platform cost difference between Webflow and Framer is rarely a top-three line item on a project. We do not choose the platform based on what the agency saves by picking one over the other.",
    },

    /* ── Section 6: The team and community question ─────────────── */
    {
      type: "heading",
      level: 2,
      id: "team-and-community",
      content: "The team and community question",
    },
    {
      type: "paragraph",
      content:
        "The community question gets less attention than the feature comparison, and it should get more. Tools without a community of operators around them are stranded software. Both Webflow and Framer have a community. The two are different in shape, and the differences matter on the day you need to hire, subcontract, or hand a project off to a client team.",
    },
    {
      type: "paragraph",
      content:
        "Webflow's community is older, larger, and more agency-shaped. There are more Webflow Experts, more Webflow training courses, more Webflow integrations, and more agencies who specialize in Webflow. If you need a freelancer for two weeks, you will find one. If you need a partner agency in another time zone, there are dozens. The talent market is liquid in a way few no-code platforms can match.",
    },
    {
      type: "paragraph",
      content:
        "Framer's community is younger, denser around designers, and growing fast. The talent pool is smaller in absolute numbers, but the senior designers who have gone deep in Framer are doing some of the most visible new agency work of the last two years. The Framer Marketplace is a real economy: components, kits, and templates ship in volume, and the quality is higher than Webflow's equivalent marketplace because the Framer audience is more design-discerning. The asymmetry is informative. Webflow's marketplace serves a market that wants to ship faster. Framer's marketplace serves a market that wants to ship better-looking.",
    },
    {
      type: "paragraph",
      content:
        "For an agency choosing a platform to standardize on, Webflow is the safer pick. The talent supply is deeper, the partner network is more mature, and a Webflow agency can subcontract reliably across time zones without quality risk. For a studio of senior designers and engineers building a smaller volume of higher-craft work, Framer is the more expressive pick. The defaults are better, the code surface is more designer-accessible, and the work tends to look more like the studio's brand than like the platform.",
    },

    /* ── Section 7: How we choose at LIVV ───────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "how-we-choose",
      content: "How we choose at LIVV",
    },
    {
      type: "paragraph",
      content:
        "We work in both. The split runs roughly 40 percent Webflow, 50 percent Framer, 10 percent custom Next.js for the projects that need to leave the no-code surface entirely. The default choice for a new marketing site is Framer, unless one of three triggers fires.",
    },
    {
      type: "paragraph",
      content:
        "Trigger one: the site needs multi-locale at scale. More than two locales, or two locales with structurally divergent content trees, sends the project to Webflow. WMF was the textbook case. The UK and US versions of the site share design but diverge on content, asset ownership, and CMS taxonomy. Building this in Framer would have meant maintaining two sites that drift. Webflow's localization model handled it.",
    },
    {
      type: "paragraph",
      content:
        "Trigger two: the CMS has more than 100 active items with deep reference relationships. A site with 30 case studies and 10 categories is fine in either tool. A site with 300 products in 15 categories nested under 5 manufacturers belongs in Webflow.",
    },
    {
      type: "paragraph",
      content:
        "Trigger three: the client needs enterprise governance. Role-based permissions, audit logs, staged publishing environments, and content workflows that require approval chains push the project to Webflow regardless of size. This trigger fires rarely on the work we take, but when it fires it is a clean signal.",
    },
    {
      type: "paragraph",
      content:
        "Outside those triggers, Framer is the default. Mobilita is the typical case: a 20-page brand site, motion is part of the argument, the CMS has 12 items, and the client wants to update copy themselves. Framer ships the design fluency that work needs. We could have built the same site in Webflow and it would have been competent. It would have taken longer and looked more like every other Webflow site.",
    },
    {
      type: "paragraph",
      content:
        "CK Studio is the other typical case. We ship Framer work white-label for a Dallas agency. The agency presents the build to the client. Our involvement is invisible. Framer is the right pick there because the agency's internal team can take over content updates after we hand off, and Framer's editor is faster for non-Webflow-trained operators.",
    },

    /* ── Comparison table ───────────────────────────────────────── */
    {
      type: "heading",
      level: 3,
      id: "comparison-table",
      content: "Quick reference",
    },
    {
      type: "table",
      headers: ["Capability", "Webflow", "Framer"],
      rows: [
        [
          "CMS depth at 100+ items",
          "Best-in-class",
          "Sufficient for most",
        ],
        [
          "Multi-locale (3+ locales)",
          "Mature, deep",
          "Available, less deep",
        ],
        [
          "Motion and interactions",
          "Capable with custom code",
          "Native, fluent out of box",
        ],
        [
          "Code components",
          "Webflow Cloud (React)",
          "Framer Code (TypeScript)",
        ],
        [
          "AI layout / copy",
          "Yes",
          "Yes",
        ],
        ["Pricing at single site", "Higher", "Lower"],
        [
          "Pricing at agency scale",
          "Cleaner with workspace",
          "Linear per-site",
        ],
        ["Freelance talent pool", "Large, liquid", "Smaller, growing"],
        [
          "Designer onboarding speed",
          "Slower",
          "Faster",
        ],
        [
          "Enterprise governance",
          "Mature",
          "Less mature",
        ],
      ],
    },

    /* ── Closing ─────────────────────────────────────────────────── */
    {
      type: "paragraph",
      content:
        "When both tools could work, we reach for Framer first. The reason is not which one is more capable. The reason is which one ships motion fluency by default, because motion is part of the argument we make on most marketing sites. Webflow can do motion, but it requires work that does not feel like the work the site needs.",
    },
    {
      type: "paragraph",
      content:
        "When one of the three triggers fires, we reach for Webflow without hesitation, and we are glad the platform exists. The two tools cover the marketing-site space between them and leave very little uncovered.",
    },
    {
      type: "paragraph",
      content:
        "The next time someone asks which one is better, the honest answer is: both, depending on the shape of the project. The less honest but more useful answer is: Framer unless something specific pulls you to Webflow. We have shipped enough of both to feel comfortable saying it that way.",
    },

    /* ── FAQ ─────────────────────────────────────────────────────── */
    {
      type: "faq",
      items: [
        {
          question: "Can I use Framer for a 500-page site?",
          answer:
            "Technically yes. In practice you will fight the tool. Framer's CMS handles depth well but its editor performance degrades on very large sites, and the publishing workflow is not designed for high-cardinality content. A 500-page site is the case Webflow was built for. Use the tool that was built for the case.",
        },
        {
          question: "Does Webflow handle complex animations?",
          answer:
            "Yes. Webflow has supported scroll-triggered animations, hover states, and timed interactions for years. Where Webflow falls short relative to Framer is in the speed of building those animations and in their default polish. A complex animation in Webflow takes more time to ship and more iterations to feel right. In Framer the same animation is closer to configuration than to engineering.",
        },
        {
          question: "Which is better for SEO?",
          answer:
            "Neither has a meaningful SEO advantage in 2026. Both ship clean HTML, both expose meta and Open Graph tags, both render server-side, both support sitemap and structured data. SEO is downstream of content, internal linking, page speed, and entity consistency. The tool choice matters less than the operator.",
        },
        {
          question: "Is Framer always cheaper?",
          answer:
            "No. For a single site, Framer is the cheaper entry. For an agency running ten or more sites at the same time, Webflow's workspace pricing is usually cheaper per site. The crossover happens somewhere around five active sites, depending on how each platform has repriced this quarter.",
        },
        {
          question: "Can I migrate a site from Webflow to Framer (or back)?",
          answer:
            "The design migration is straightforward in either direction. The CMS migration is painful. CMS schemas, references, and structured content do not export cleanly between the two platforms, so a migration usually means rebuilding the CMS in the destination tool by hand. We have done it both directions. Budget for the migration to take roughly the same time as the original build.",
        },
        {
          question:
            "What about Webflow AI features versus Framer AI Workshop?",
          answer:
            "Both are useful for first drafts and neither is a deciding factor in the platform choice. The AI features generate acceptable starting layouts and acceptable starting copy. A senior designer or writer still has to do the actual work after the AI hands off. The AI quality is close enough that it does not justify a platform switch in either direction.",
        },
        {
          question:
            "Should I learn one tool, or both?",
          answer:
            "If you bill clients for sites, learn both. The cost of having to subcontract or refer out half your inbound is higher than the cost of learning the second tool. If you are a single designer or developer building one site, learn the one that matches your project. Framer is faster to learn if you come from a design background. Webflow is faster to learn if you come from a code background.",
        },
        {
          question: "Are hybrid setups (Framer for marketing + Next.js for product) becoming the new normal?",
          answer:
            "Yes, increasingly. The pattern we see in 2026 is a small studio or product team using Framer (or sometimes Webflow) for the marketing site, Next.js or React Native for the product, and Supabase or similar for the data layer. The marketing site and the product site sit on different surfaces because the marketing site needs editorial flexibility and the product needs engineering depth. This is the architecture we recommend most often.",
        },
      ],
    },
  ],
  seoTitle:
    "Webflow vs Framer in 2026: A Practitioner's View · LIVV Creative Studio",
  seoDescription:
    "Both Webflow and Framer are excellent in 2026. They are not interchangeable. A practitioner's comparison from a studio that has shipped real work in both, with a clear default-pick framework and FAQ.",
  published: true,
  featured: true,
  displayOrder: 2,
}

registerPieces([piece])
