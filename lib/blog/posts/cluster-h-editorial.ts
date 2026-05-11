import { BlogPost } from "@/types/blog"

/**
 * Cluster H — Editorial.
 *
 * Long-form, opinion-led pieces that follow the LIVV editorial brief's
 * voice rules (no em dashes, no banned vocab, no rule-of-three rhetorical,
 * 600-4000 words depending on type). Distinct in tone from the SEO
 * cluster posts (A through G) but living under the same /blog surface
 * by intent — readers, search engines, and AI extractors find both
 * through the same index.
 *
 * Each piece is featured: true and given a low displayOrder so it
 * surfaces near the top of /blog. Categories reuse the existing
 * taxonomy:
 *   - "Creative Engineering" (cluster F) for the Argentine tradition essay.
 *   - "Platform Comparisons" (cluster B) for Webflow vs Framer.
 *
 * Future editorial pieces register here in displayOrder sequence.
 *
 * Migration note: these pieces previously lived under /journal/<slug>
 * with a parallel JournalPiece type and registry, which silently failed
 * to load in production because the lazy require pattern got
 * tree-shaken in Next.js builds. Folded back into the working blog
 * registry to fix the visibility bug and to keep /blog as the single
 * editorial surface.
 */

const author = {
  name: "Eneas Aldabe",
  role: "Founder, LIVV Creative Studio",
  avatar: "/images/senior-team-eneas.jpg",
}

const cta = {
  type: "contact" as const,
  link: "/contact",
  text: "Talk to us.",
}

const creativeEngineeringCategory = {
  slug: "creative-engineering",
  name: "Creative Engineering",
  description:
    "Exploring creative engineering as a discipline — design systems, tech stacks, and the future of building for the web.",
  clusterId: "F",
}

const platformComparisonsCategory = {
  slug: "platform-comparisons",
  name: "Platform Comparisons",
  description:
    "Honest, builder-perspective comparisons between Webflow, Framer, WordPress, Squarespace, and custom code.",
  clusterId: "B",
}

export const clusterHEditorial: BlogPost[] = [
  /* ────────────────────────────────────────────────────────────
   *   Piece 02 — The Argentine Creative Engineering Tradition
   * ──────────────────────────────────────────────────────────── */
  {
    id: "h-001",
    slug: "argentine-creative-engineering-tradition",
    title: "The Argentine Creative Engineering Tradition",
    excerpt:
      "A working theory about a category nobody has named, the country that quietly produces a disproportionate share of it, and what comes next.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        level: 2,
        id: "key-takeaways",
        content: "Key takeaways",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Argentine designers and engineers built and continue to maintain a meaningful share of the global product layer (Mercado Libre, Globant, Auth0, Mural, TiendaNube, plus senior teams at Linear, Stripe, Notion, Vercel).",
          "The conditions that produced this tradition are specific: the FADU-UBA design education lineage from Maldonado and Fontana, economic cycles that pushed talent into freelance and agency models early, a generation that learned its craft in English on the open internet.",
          "The craft fingerprint is recognizable: hierarchy obsession, restraint over spectacle, motion fluency, editorial sensibility, deep typography literacy.",
          "The tradition has never been named in English and only partially in Spanish, which is why studios outside the country have continued underrating it for two decades.",
          "The next wave is smaller, more product-focused, and white-label-friendly by design. The work is portable. The talent is bilingual. The tradition will outlast the economic cycle.",
        ],
      },
      {
        type: "paragraph",
        content:
          "Walk through the offices of Stripe, Linear, Notion, Vercel, or any of the half-dozen product companies that quietly shape the daily software of the design industry, and you will find at least one Argentine on the team. Often the head of design. Often a senior engineer. Often the person who decided the typography. This is not a coincidence. It is the visible edge of a tradition.",
      },
      {
        type: "paragraph",
        content:
          "The tradition does not have a name in English, and only a partial one in Spanish. It is the reason a meaningful percentage of the global product layer, the one most designers and engineers interact with daily, was built or maintained by people educated in Buenos Aires.",
      },
      {
        type: "paragraph",
        content:
          "It is also the reason a working theory of Argentine creative engineering has not been widely written. The work has been quietly exporting for twenty years. The conditions that produce it are specific and unglamorous. The output sits inside other people's brands, which is the point.",
      },
      {
        type: "paragraph",
        content: "This essay names it.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-gets-exported",
        content: "What gets exported",
      },
      {
        type: "paragraph",
        content:
          "Start with the companies. Mercado Libre, the LATAM ecommerce platform with a market cap that, depending on the week, rivals eBay, was founded and is still run by an Argentine. Globant, the digital transformation firm that has shipped work for Disney, LinkedIn, and Coca-Cola, is Argentine. Auth0, acquired by Okta for around six and a half billion dollars in 2021, was founded by two Argentines. Mural, the collaborative whiteboard now embedded in most remote design teams, was founded in Buenos Aires. TiendaNube, the LATAM Shopify equivalent, builds out of Buenos Aires. Etermax, the studio that shipped Trivia Crack to over a billion downloads, is in Buenos Aires.",
      },
      {
        type: "paragraph",
        content:
          "These are the household names. Behind them are hundreds of smaller companies whose logos you would not recognize, each one quietly shipping Argentine work into your software stack. The category is closer to a quiet industry than to a scene.",
      },
      {
        type: "paragraph",
        content:
          "Now the people. The senior designer at one of the most respected product companies of the last decade, the person who set the typographic system that defines the category, is Argentine. The Stripe Press art direction passed through Argentine hands. A head of brand at one of the better-known American typefoundries is Argentine. The designer who shipped a particular Anthropic interface refinement, the engineer who rewrote a specific Vercel marketing surface, the motion lead on a recent Apple keynote: all Argentine. The list is long enough that naming it in full would read as a credits roll. Most of the people in the list value the privacy of being good without being identified, so we will not name them here.",
      },
      {
        type: "paragraph",
        content:
          "Now the studios. Aerolab is the longest-running of the export-grade Argentine studios and remains the public reference point. Around them sits a quieter second tier of small studios, most of them under twenty people, doing work that holds up against anything coming out of New York, Berlin, or Stockholm. We are not going to list them by name here for the same reason most of them prefer it that way: the work travels further when it is not pre-loaded with the country of origin. The catalogue is not exotic. It is just what gets made here.",
      },
      {
        type: "paragraph",
        content:
          "And then there is the white-label tier. The studios in this group do not have public case studies because the work ships under agency brands in the US, the UK, and Europe. The agencies in question are not always small. Some of the largest brand agencies in New York and London have a Buenos Aires studio on retainer whose name they will not say out loud, because the entire premise of the engagement is that the studio is invisible. The American account director presents the work in the kickoff. The Buenos Aires designers and engineers wrote it, designed it, shipped it. Both sides prefer the arrangement. It is one of the more honest economic relationships in the industry, even though it depends on a kind of mutual silence.",
      },
      {
        type: "heading",
        level: 2,
        id: "why-it-happens-here",
        content: "Why it happens here",
      },
      {
        type: "paragraph",
        content:
          "The conditions that produce a creative engineering tradition do not replicate easily. Argentina has all of them, layered, and has had them for forty years.",
      },
      {
        type: "paragraph",
        content:
          "Design education runs first. The Facultad de Arquitectura, Diseño y Urbanismo at the Universidad de Buenos Aires (FADU-UBA) opened its dedicated graphic design program in 1985. The teaching lineage runs through Tomás Maldonado, the Argentine modernist who taught at the Hochschule für Gestaltung Ulm in Germany and shaped much of postwar European design thinking. Argentine design education has never been provincial. It has always understood itself as part of a global modernist tradition, with European rigor as the baseline expectation.",
      },
      {
        type: "paragraph",
        content:
          "A second wave studied with Rubén Fontana, the typographer who is to Argentine type what Massimo Vignelli is to Italian. By the late nineties, Buenos Aires had a critical mass of formally trained designers operating at international standards. Most of the senior designers exporting Argentine work today passed through one of these lineages.",
      },
      {
        type: "paragraph",
        content:
          "Engineering education followed a parallel curve. UBA's Facultad de Ciencias Exactas y Naturales (FCEN) and the Instituto Tecnológico de Buenos Aires (ITBA) graduated enough mathematics and computer science talent that by the mid-2000s, Buenos Aires had more senior engineers than there were companies to employ them. The surplus had to go somewhere. It went to American and European clients.",
      },
      {
        type: "paragraph",
        content:
          "Economic instability is the other half of the story. The 2001 crisis broke the conventional career path. Designers and engineers who would have stayed in agencies or banks instead went freelance, started studios, and learned to bill in dollars. By their mid-twenties, the generation that grew up after 2001 was running its own books, negotiating in English, and selling work to clients in Tel Aviv, San Francisco, and London. The pattern repeated in 2018, and again in 2024. Each crisis exports another wave of talent into international agencies and product companies. The instability is not the bug; it is the moat. Argentine creative engineering exports because the domestic market alone has never been a sustainable career.",
      },
      {
        type: "paragraph",
        content:
          "The internet is the third condition. By the early 2000s, Buenos Aires designers and engineers were learning their craft in English on forums, blogs, and chat rooms that were predominantly American. The local design community is bilingual by default. There is no learning curve for working with US, UK, or European clients beyond the timezone, and the timezone helps.",
      },
      {
        type: "paragraph",
        content:
          "The timezone helps. Buenos Aires is one hour ahead of New York during the southern summer, and the same time as New York during the southern winter. London is four hours ahead. The overlap with US East Coast working hours is total. The overlap with European working hours is meaningful. Argentine teams can take a kickoff call at 9am New York time without breaking their day, and can ship work overnight that is reviewed in the morning. The geographic accident has been real economic value for two decades.",
      },
      {
        type: "paragraph",
        content:
          "Cost is the door that opens the conversation but is not the thesis. Argentine senior talent has historically priced below US senior talent, and the gap remains meaningful even after the recent currency reforms. Once an American agency hires a Buenos Aires studio and discovers the work is competitive on craft, the cost advantage moves from primary reason to permanent advantage. The agencies that have figured this out do not switch back.",
      },
      {
        type: "heading",
        level: 2,
        id: "what-it-looks-like",
        content: "What it looks like",
      },
      {
        type: "paragraph",
        content:
          "The tradition has a recognizable craft fingerprint. A senior designer who has been in the industry long enough can usually pick Argentine work out of a portfolio review without being told where it came from.",
      },
      {
        type: "paragraph",
        content:
          "Hierarchy obsession is the first signal. Argentine designers will spend longer on a single typographic decision than most teams spend on a homepage. The default approach to information design is to assume that hierarchy is the work. A button label, a section heading, a footer link: each is treated as a decision about importance. The FADU lineage and the Fontana lineage both taught this seriously, and the people who learned from them keep taking it seriously twenty years later.",
      },
      {
        type: "paragraph",
        content:
          "Restraint over spectacle is the second. The default mode is not what is the wildest thing this site could do. It is what is the smallest move that makes this site obviously better than its competitors. Argentine work tends to undershoot the trend cycle on purpose. There are exceptions. The exceptions are usually deliberate, and they are usually announcing themselves as exceptions.",
      },
      {
        type: "paragraph",
        content:
          "Motion fluency is the third. The local industry passed through a phase of intense After Effects practice roughly between 2012 and 2016 that left a generation of designers who can move things on screen with timing and ease that reads as native. The same generation moved to web motion (Framer Motion, GSAP, WebGL) when the browser caught up. The fluency carries across surfaces.",
      },
      {
        type: "paragraph",
        content:
          "Editorial sensibility is the fourth. Argentine designers read magazines. Not metaphorically. Real ones, in print, in Spanish and English. The reference set is closer to a print art director's than to a typical screen-only designer's. This shows up in how Argentine work handles long-form content, in how it lays out a long page, in how it spaces a paragraph against a margin. The default is not enterprise software. The default is a well-edited spread.",
      },
      {
        type: "paragraph",
        content:
          "Typography literacy is the fifth. The Fontana lineage continues. Sudtipos and a handful of other Buenos Aires foundries have shipped typefaces that global brands use without knowing where they came from. Argentine designers can read a typeface the way a sommelier reads a wine. It is not a metaphor we are pleased with, but it is the accurate one.",
      },
      {
        type: "paragraph",
        content:
          "There is a sixth signal that is harder to name. The work has a kind of quietness to it. American product design tends to argue with the user. European product design tends to instruct. Argentine product design tends to step out of the way. A login screen designed in Buenos Aires will look like it has fewer pixels than the same screen designed somewhere else, even when it has the same number. The restraint is not minimalism as an aesthetic. It is closer to a habit of editing.",
      },
      {
        type: "heading",
        level: 2,
        id: "the-next-wave",
        content: "The next wave",
      },
      {
        type: "paragraph",
        content:
          "The older generation of Argentine studios is still working, and still excellent. Aerolab has been shipping export-grade product work for over a decade and remains the gold standard for what an Argentine studio can deliver. A handful of similar-tier studios operate alongside it in editorial, brand, and product. A second tier of smaller shops, most under twenty people, sit below them doing notable work that travels well under partner brands.",
      },
      {
        type: "paragraph",
        content:
          "A newer generation is operating differently. The studios in this cohort are smaller, more product-focused, and white-label-friendly by design. They are willing to work invisibly behind US and European agencies, which the older generation often was not. They are bilingual in product, not just in language. They sit in Figma and in Cursor in the same breath. They are comfortable shipping a Webflow build for one client and a Next.js product for another in the same week, picking the right stack instead of forcing one tool.",
      },
      {
        type: "paragraph",
        content:
          "We are not going to list the new generation here. The list would be incomplete, and most of the studios in this cohort are not seeking the visibility yet. If you are an agency or a founder looking, the easiest signal is to ask any senior designer you trust who they would recommend in Buenos Aires. The answers will overlap on a handful of names, and those answers will be more useful than a published list.",
      },
      {
        type: "paragraph",
        content:
          "What this newer cohort is doing, in aggregate, is professionalising what used to be folk knowledge. The older generation worked from instinct and from the FADU curriculum. The newer generation has read all the same writing the rest of the industry has read, has internalized it, and is applying it back through a lens that is unmistakably from here. The result is work that does not announce its origin but is recognizable to anyone who knows what to look for.",
      },
      {
        type: "paragraph",
        content:
          "The tradition is real and it has been here longer than most of the people writing about it have been alive. It does not need anyone's permission to exist. It is also less precarious than its economic context suggests. The work is portable. The designers and engineers in it have been operating at international tier for two decades. The tradition will outlast every currency reform.",
      },
      {
        type: "paragraph",
        content:
          "Buenos Aires will keep exporting this work. The next ten years will look like the last ten years, with one difference. The studios doing the exporting will be smaller, the agencies hiring them will be larger, and the names will be quieter. Some of those studios are already in business and already shipping. They are visible if you ask the right person. They are reachable if you write to them in either language. The tradition is open. The work is the work.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Is this just about cost?",
            answer:
              "No. Cost is the door that opens the conversation. Once an agency or product team works with a senior Buenos Aires studio for the first time, the cost advantage stops being the reason. The reason becomes the craft. The agencies that have been hiring from Buenos Aires for over a decade do not switch back, and they are no longer doing it for the savings.",
          },
          {
            question: "Why has this tradition not been named before?",
            answer:
              "Two reasons. First, most of the work ships under other people's brands. The studios doing the exporting are deliberately invisible behind agency partners, and the designers and engineers working at product companies abroad are usually not credited by nationality. Second, the local design press writes in Spanish and the global design press writes in English, and the bridge between them has been thin until recently. The conditions of the tradition outran the language to describe it.",
          },
          {
            question:
              "Who are the canonical figures of the older generation?",
            answer:
              "Tomás Maldonado and Rubén Fontana for the design education lineage. Marcos Galperín (Mercado Libre), Eugenio Pace and Matías Woloski (Auth0), and Mariano Suárez-Battán (Mural) for the founder lineage. Aerolab as the studio that defined the modern export-grade Argentine studio category. Most of the working generation traces their teaching, hiring, or freelance work back through one of these names.",
          },
          {
            question:
              "How do I tell a serious Argentine studio from a generic offshore vendor?",
            answer:
              "Ask to see work, and ask who actually did it. A serious studio will introduce you to the senior designer or engineer on your project before you sign. A generic offshore vendor will introduce you to a sales person and an account manager. The senior person should be in Buenos Aires, should speak fluent English, and should have shipped a comparable piece of work for a comparable client. Three case studies and a senior intro is a low bar that filters out most of the noise.",
          },
          {
            question:
              "Is this tradition stable, or does it fluctuate with the Argentine economy?",
            answer:
              "Stable, in the dimension that matters. The economy fluctuates and the talent stays. Each currency cycle pushes another wave of designers and engineers into international work, which is the opposite of what people outside the country assume. The pool of senior talent operating at export tier has grown every decade since the 1990s through every recession. The work is portable. The studios are bilingual. The tradition will outlast its economic context.",
          },
        ],
      },
    ],
    coverImage: "/images/blog/creative-engineering.webp",
    author,
    category: creativeEngineeringCategory,
    tags: [
      "Argentine design",
      "Creative engineering",
      "Buenos Aires",
      "Studio economics",
      "Design tradition",
      "White-label",
      "FADU",
    ],
    readingTimeMinutes: 12,
    published: true,
    featured: true,
    displayOrder: 1,
    seoTitle:
      "The Argentine Creative Engineering Tradition · LIVV Creative Studio",
    seoDescription:
      "A working theory about a category nobody has named, the country that quietly produces a disproportionate share of it, and what comes next.",
    faqSchema: [
      {
        question: "Is this just about cost?",
        answer:
          "No. Cost is the door that opens the conversation. Once an agency or product team works with a senior Buenos Aires studio for the first time, the cost advantage stops being the reason. The reason becomes the craft.",
      },
      {
        question: "Why has this tradition not been named before?",
        answer:
          "Most of the work ships under other people's brands. The studios doing the exporting are deliberately invisible behind agency partners, and the designers working at product companies abroad are usually not credited by nationality.",
      },
      {
        question:
          "Who are the canonical figures of the older generation?",
        answer:
          "Tomás Maldonado and Rubén Fontana for the design education lineage. Marcos Galperín (Mercado Libre), Eugenio Pace and Matías Woloski (Auth0), and Mariano Suárez-Battán (Mural) for the founder lineage. Aerolab as the studio that defined the modern export-grade Argentine studio category.",
      },
      {
        question:
          "How do I tell a serious Argentine studio from a generic offshore vendor?",
        answer:
          "A serious studio will introduce you to the senior designer or engineer on your project before you sign. A generic offshore vendor introduces a sales person. The senior person should be in Buenos Aires, fluent in English, and should have shipped a comparable piece of work.",
      },
      {
        question:
          "Is this tradition stable, or does it fluctuate with the Argentine economy?",
        answer:
          "Stable, in the dimension that matters. The economy fluctuates and the talent stays. Each currency cycle pushes another wave of designers and engineers into international work. The pool of senior talent operating at export tier has grown every decade since the 1990s.",
      },
    ],
    internalLinks: [],
    cta,
    relatedPostSlugs: ["webflow-vs-framer-2026"],
    createdAt: "2026-05-11T09:00:00.000Z",
    updatedAt: "2026-05-11T09:00:00.000Z",
  },

  /* ────────────────────────────────────────────────────────────
   *   Piece 04 — Webflow vs Framer in 2026: A Practitioner's View
   * ──────────────────────────────────────────────────────────── */
  {
    id: "h-002",
    slug: "webflow-vs-framer-2026",
    title: "Webflow vs Framer in 2026: A Practitioner's View",
    excerpt:
      "Both tools are excellent. They are not interchangeable. The honest comparison is about defaults and second-order trade-offs, and most writing online avoids both.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        level: 2,
        id: "key-takeaways",
        content: "Key takeaways",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Both Webflow and Framer are professional tools in 2026. The honest comparison is about defaults, not which one is better in isolation.",
          "Webflow wins on multi-locale sites, on CMS depth at 100+ collection items, on enterprise governance, and on the size of the freelance and agency talent pool.",
          "Framer wins on motion and interaction out of the box, on designer onboarding speed, on real TypeScript code components, and on starting cost for a single site.",
          "The two are closer than the internet implies. Framer's CMS is mature enough for most marketing sites. Webflow Cloud and Framer Code are both real engineering surfaces.",
          "Our default at LIVV: Framer for new marketing sites under 50 pages, unless one of three triggers fires (multi-locale at scale, 100+ CMS items, enterprise governance). When a trigger fires, Webflow.",
        ],
      },
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
          ["CMS depth at 100+ items", "Best-in-class", "Sufficient for most"],
          ["Multi-locale (3+ locales)", "Mature, deep", "Available, less deep"],
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
          ["AI layout / copy", "Yes", "Yes"],
          ["Pricing at single site", "Higher", "Lower"],
          [
            "Pricing at agency scale",
            "Cleaner with workspace",
            "Linear per-site",
          ],
          ["Freelance talent pool", "Large, liquid", "Smaller, growing"],
          ["Designer onboarding speed", "Slower", "Faster"],
          ["Enterprise governance", "Mature", "Less mature"],
        ],
      },
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
            question:
              "Can I migrate a site from Webflow to Framer (or back)?",
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
            question: "Should I learn one tool, or both?",
            answer:
              "If you bill clients for sites, learn both. The cost of having to subcontract or refer out half your inbound is higher than the cost of learning the second tool. If you are a single designer or developer building one site, learn the one that matches your project. Framer is faster to learn if you come from a design background. Webflow is faster to learn if you come from a code background.",
          },
          {
            question:
              "Are hybrid setups (Framer for marketing + Next.js for product) becoming the new normal?",
            answer:
              "Yes, increasingly. The pattern we see in 2026 is a small studio or product team using Framer (or sometimes Webflow) for the marketing site, Next.js or React Native for the product, and Supabase or similar for the data layer. The marketing site and the product site sit on different surfaces because the marketing site needs editorial flexibility and the product needs engineering depth. This is the architecture we recommend most often.",
          },
        ],
      },
    ],
    coverImage: "/images/blog/platform-comparisons.webp",
    author,
    category: platformComparisonsCategory,
    tags: [
      "Webflow",
      "Framer",
      "No-code",
      "CMS",
      "Marketing sites",
      "Motion design",
      "Studio tooling",
    ],
    readingTimeMinutes: 17,
    published: true,
    featured: true,
    displayOrder: 2,
    seoTitle:
      "Webflow vs Framer in 2026: A Practitioner's View · LIVV Creative Studio",
    seoDescription:
      "Both Webflow and Framer are excellent in 2026. They are not interchangeable. A practitioner's comparison from a studio that has shipped real work in both.",
    faqSchema: [
      {
        question: "Can I use Framer for a 500-page site?",
        answer:
          "Technically yes. In practice you will fight the tool. A 500-page site is the case Webflow was built for. Use the tool that was built for the case.",
      },
      {
        question: "Does Webflow handle complex animations?",
        answer:
          "Yes. Webflow has supported scroll-triggered animations, hover states, and timed interactions for years. Where Webflow falls short relative to Framer is in the speed of building those animations and in their default polish.",
      },
      {
        question: "Which is better for SEO?",
        answer:
          "Neither has a meaningful SEO advantage in 2026. Both ship clean HTML, both expose meta and Open Graph tags, both render server-side. SEO is downstream of content, internal linking, page speed, and entity consistency.",
      },
      {
        question: "Is Framer always cheaper?",
        answer:
          "No. For a single site, Framer is the cheaper entry. For an agency running ten or more sites at the same time, Webflow's workspace pricing is usually cheaper per site.",
      },
      {
        question: "Can I migrate a site from Webflow to Framer (or back)?",
        answer:
          "The design migration is straightforward in either direction. The CMS migration is painful, usually requires rebuilding the CMS in the destination tool by hand. Budget for the migration to take roughly the same time as the original build.",
      },
      {
        question:
          "What about Webflow AI features versus Framer AI Workshop?",
        answer:
          "Both are useful for first drafts and neither is a deciding factor in the platform choice. The AI quality is close enough that it does not justify a platform switch in either direction.",
      },
      {
        question: "Should I learn one tool, or both?",
        answer:
          "If you bill clients for sites, learn both. If you are a single designer or developer building one site, learn the one that matches your project. Framer is faster to learn from a design background. Webflow is faster from a code background.",
      },
      {
        question:
          "Are hybrid setups (Framer for marketing + Next.js for product) becoming the new normal?",
        answer:
          "Yes, increasingly. The pattern in 2026 is Framer or Webflow for the marketing site, Next.js or React Native for the product, and Supabase or similar for the data layer.",
      },
    ],
    internalLinks: [],
    cta,
    relatedPostSlugs: ["argentine-creative-engineering-tradition"],
    createdAt: "2026-05-11T10:00:00.000Z",
    updatedAt: "2026-05-11T10:00:00.000Z",
  },
]
