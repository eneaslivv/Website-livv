/**
 * Below-the-fold content for /services/[slug].
 * The hero stays driven by the page's own service data (and the Supabase override);
 * everything after it is authored here so every service shares one layout:
 *
 *   clients → 01 work → 02 what we do → 03 how we work → testimonial → FAQ → CTA
 *
 * Everything here has to be verifiable on the site itself:
 * - work items point at published case studies or LIVV products;
 * - `facts` come from each case study's own meta, and `line` from its subtitle,
 *   tagline or body (or the product page / FAQ for LIVV products);
 * - engagement terms repeat what lib/service-faqs.ts already states;
 * - testimonials are looked up verbatim in components/sections/reviews-data.ts.
 * No invented clients, metrics, dates or quotes.
 */

/** Grain gradients from the brand mockup library (LIVV Hub · 04.1 Mockups · 10). */
export type GrainSurface = "burdeos" | "salvia" | "acero"

export interface ServiceWorkItem {
  /** Case study (/projects/…) or product (/products/…). */
  href: string
  name: string
  /** One short line above the title: sector and scope, or market for nearshore. */
  meta: string
  year?: string
  /** One line from the case study itself. Never rewritten into a claim. */
  line: string
  /** Mockup in /public. Case-study covers already carry their device and background. */
  image?: string
  /** Muted MP4 loop shown while the card is on screen; `image` is its poster. */
  video?: string
  /** LIVV products have no photographed mockup: they get a typographic card on grain. */
  product?: { kicker: string; surface: GrainSurface }
  /** Lead card only, copied from the case study meta. */
  facts?: { label: string; value: string }[]
}

export type ServiceVisual =
  /** Landscape, near 16:10: it fills the frame. `phoneOn` puts a raw phone screenshot on a grain. */
  | { kind: "image"; src: string; caption: string; href?: string; phoneOn?: GrainSurface }
  | { kind: "video"; src: string; poster: string; caption: string; href?: string }
  | { kind: "timezones"; caption: string }

export interface ServiceCapability {
  title: string
  /** One line. The detail lives in the FAQ. */
  line: string
  deliverables: string[]
  visual: ServiceVisual
}

export interface ServiceProcessStep {
  title: string
  body: string
}

/** Two-tone headline: the second part goes in the muted tone (brand guide 04.4). */
export type TwoTone = [string, string]

export interface ServiceFinalCta {
  label: string
  headline: string
  headlineAccent?: string
  body: string
  secondary?: { text: string; href: string }
}

export interface ServicePageContent {
  work: { heading: TwoTone; lead: ServiceWorkItem; more: [ServiceWorkItem, ServiceWorkItem] }
  capabilities: { heading: TwoTone; items: [ServiceCapability, ServiceCapability, ServiceCapability] }
  process: {
    heading: TwoTone
    steps: [ServiceProcessStep, ServiceProcessStep, ServiceProcessStep]
    /** Engagement terms, as the FAQ states them. */
    terms: string[]
    action: string
  }
  /** Looked up verbatim in reviews-data by author and the start of the quote. */
  testimonial?: { name: string; quoteStart: string; project?: { name: string; href: string } }
  cta: ServiceFinalCta
}

/* ── Shared work items ─────────────────────────────────────────────────────
 * Declared once so the same project reads the same on every service page. */

const freneticPace: ServiceWorkItem = {
  href: "/projects/frenetic-pace",
  name: "Frenetic Pace",
  meta: "Sports media · Web, app & admin",
  year: "2026",
  line: "Articles, scores, tickets and a store, on a single platform.",
  image: "/images/frenetic-pace/intro-home-en-navegador.webp",
}

const pliego: ServiceWorkItem = {
  href: "/projects/pliego",
  name: "Pliego",
  meta: "Brand, web & 3D · LIVV product",
  year: "2026",
  line: "Packaging and manufacturing, made to order in Argentina.",
  image: "/images/pliego/desktop-laptop-visor-3d-iris-core.webp",
}

const azqira: ServiceWorkItem = {
  href: "/projects/azqira",
  name: "Azqira",
  meta: "Fintech · UI/UX & web development",
  year: "2024",
  line: "Taking part in hotels, explained step by step.",
  image: "/images/azqira/desktop-laptop-earn-where-you.webp",
}

const livvWeb: ServiceWorkItem = {
  href: "/projects/livv-web",
  name: "LIVV web",
  meta: "Brand, web & motion",
  year: "2026",
  line: "Design, software and motion, on the studio's own site.",
  image: "/images/livv-web/intro-home-en-navegador.webp",
}

const prTool: ServiceWorkItem = {
  href: "/projects/pr-tool",
  name: "PR Tool",
  meta: "Content tech · Web app, iOS & Android",
  year: "2025",
  line: "Brands and creators, working together in one place.",
  // The approved portfolio artwork, the same one /work shows (pickDisplayCover).
  image: "/images/pr-tool.png",
}

export const servicePages: Record<string, ServicePageContent> = {
  "custom-software-development": {
    work: {
      heading: ["Designed, built", "and live in production."],
      lead: {
        ...freneticPace,
        facts: [
          { label: "LIVV's role", value: "Web, app, admin panel and development" },
          { label: "Platforms", value: "Web · iOS · Android · Admin" },
          { label: "Status", value: "Live at freneticpace.com" },
        ],
      },
      more: [pliego, azqira],
    },
    capabilities: {
      heading: ["Production software,", "built around how your business actually operates."],
      items: [
        {
          title: "Product and technical definition",
          line: "We map the operation and agree scope, data model and architecture before writing code.",
          deliverables: ["Scope and product logic", "Data model and architecture"],
          visual: {
            kind: "image",
            src: "/images/pliego/context-como-funciona-pasos.webp",
            caption: "Pliego · how an order moves, step by step",
            href: "/projects/pliego",
          },
        },
        {
          title: "Design and full-stack development",
          line: "The same senior team designs the interface and writes the code. No handoff in between.",
          deliverables: ["Interface and design system", "Full-stack implementation"],
          visual: {
            kind: "image",
            src: "/images/frenetic-pace/desktop-evento.webp",
            caption: "Frenetic Pace · an event page, with ticket sales",
            href: "/projects/frenetic-pace",
          },
        },
        {
          title: "Deployment, documentation and evolution",
          line: "We ship to production, document the system and stay for the releases that follow.",
          deliverables: ["Production deployment", "Technical documentation"],
          visual: {
            kind: "image",
            src: "/images/frenetic-pace/desktop-laptop-home.webp",
            caption: "Frenetic Pace · live at freneticpace.com",
            href: "/projects/frenetic-pace",
          },
        },
      ],
    },
    process: {
      heading: ["Scope, build, ship.", "One senior team from kickoff to deploy."],
      steps: [
        { title: "Scope", body: "Understand the operation, the users and the one outcome that matters first." },
        { title: "Build", body: "Design and develop in the same team, shipping reviewable increments." },
        { title: "Ship", body: "Deploy to production, document the system and hand over ownership." },
      ],
      terms: ["Fixed fee or retainer", "Scope and price before kickoff", "MVPs in six to twelve weeks"],
      action: "Start scoping your software",
    },
    testimonial: {
      name: "Christie King",
      quoteStart: "Amazing work",
      project: { name: "Frenetic Pace", href: "/projects/frenetic-pace" },
    },
    cta: {
      label: "Custom software development",
      headline: "Stop adapting your operation to someone else's software.",
      headlineAccent: "Build the one your business actually needs.",
      body: "Bring us the process that costs your team the most time. We will scope what it takes to replace it.",
      secondary: { text: "Need AI inside it? See AI Integration", href: "/services/ai-integration" },
    },
  },

  "ai-integration": {
    work: {
      heading: ["AI that does one job,", "inside a real product."],
      lead: {
        href: "/projects/kru",
        name: "KRU",
        meta: "Brand & e-commerce · Conversational AI",
        year: "2026",
        line: "A shopping assistant on every page that answers in plain language and links to the product it recommends.",
        image: "/images/kru/assistant-chat.webp",
        facts: [
          { label: "Client", value: "KRU Food" },
          { label: "LIVV's role", value: "Rebrand, web design and conversational AI" },
          { label: "Year", value: "2026" },
        ],
      },
      more: [
        {
          href: "/products/pm-agent",
          name: "PM Agent",
          meta: "LIVV product · AI agent",
          line: "Turns a written objective into assigned tasks with deadlines, and chases them automatically.",
          product: { kicker: "The project manager that never forgets", surface: "salvia" },
        },
        {
          href: "/products/registrar",
          name: "Registrar",
          meta: "LIVV product · Voice-first",
          line: "Log income and expenses by speaking. Every movement is categorised automatically.",
          product: { kicker: "Voice-first income & expense tracking", surface: "acero" },
        },
      ],
    },
    capabilities: {
      heading: ["One workflow doing measurable work,", "not a chat window added on top."],
      items: [
        {
          title: "Workflow and use-case definition",
          line: "We start from the job you want done, not from the model, and define what a correct answer looks like.",
          deliverables: ["Use-case specification", "Success criteria"],
          visual: {
            kind: "image",
            src: "/images/kru/assistant-open.webp",
            caption: "KRU · the assistant opens with a question, not a form",
            href: "/projects/kru",
          },
        },
        {
          title: "AI architecture and product integration",
          line: "Claude or OpenAI, retrieval over your own data, and the software around the model.",
          deliverables: ["RAG and agent architecture", "In-product integration"],
          visual: {
            kind: "image",
            src: "/images/kru/mobile-assistant.webp",
            phoneOn: "salvia",
            caption: "KRU · the same assistant inside the store, on mobile",
            href: "/projects/kru",
          },
        },
        {
          title: "Evaluation, observability and delivery",
          line: "Quality is measured, not assumed, and ships behind the same release process as the product.",
          deliverables: ["Evaluation harness", "Production deployment"],
          visual: {
            kind: "image",
            src: "/images/kru/laptop-desk.webp",
            caption: "KRU · live, with the assistant on every page",
            href: "/projects/kru",
          },
        },
      ],
    },
    process: {
      heading: ["Job, integration, evaluation.", "Something measurable inside ninety days."],
      steps: [
        { title: "Identify the job", body: "Define the operational task, its inputs and what a correct output looks like." },
        { title: "Integrate the intelligence", body: "Build the retrieval, agent and product surfaces around that task." },
        { title: "Evaluate and deploy", body: "Measure output quality, instrument it, then ship it to production." },
      ],
      terms: ["Fixed fee or retainer", "Scope and price before any build", "Claude first, OpenAI where it fits"],
      action: "Start scoping your AI workflow",
    },
    testimonial: { name: "Chris Green", quoteStart: "Eneas is great to work with" },
    cta: {
      label: "AI integration",
      headline: "Bring us the operational job.",
      headlineAccent: "We will design the AI around it.",
      body: "Not a chat window. One workflow, integrated into your product, measured in production.",
      secondary: { text: "Need the product built too? See Custom Software", href: "/services/custom-software-development" },
    },
  },

  "creative-engineering": {
    work: {
      heading: ["Expressive on the surface,", "engineered underneath."],
      lead: {
        ...pliego,
        facts: [
          { label: "LIVV's role", value: "Brand, site and 3D simulator" },
          { label: "Platforms", value: "Web · desktop and mobile" },
          { label: "Status", value: "Live at pliego.shop" },
        ],
      },
      // The phone on the rock: portrait, but the phone sits in the middle and
      // survives the 3:2 crop whole.
      more: [livvWeb, { ...azqira, image: "/images/project-mobile.png" }],
    },
    capabilities: {
      heading: ["An expressive digital experience", "that holds up in production."],
      items: [
        {
          title: "Digital concept and interaction direction",
          line: "We decide what the experience should do before deciding how it looks.",
          deliverables: ["Concept direction", "Interaction model"],
          visual: {
            kind: "image",
            src: "/images/livv-web/context-tarjetas-de-personajes-01-a-06.webp",
            caption: "LIVV web · six characters, one concept",
            href: "/projects/livv-web",
          },
        },
        {
          title: "Rapid prototyping and motion behavior",
          line: "We build the risky part first, in code, and judge it on a real device.",
          deliverables: ["Working prototype", "Motion behaviour spec"],
          visual: {
            kind: "image",
            src: "/images/pliego/motion-despiece-3d.webp",
            caption: "Pliego · the 3D viewer, exploded",
            href: "/projects/pliego",
          },
        },
        {
          title: "Production-grade implementation",
          line: "Performant, responsive, accessible, and maintainable by whoever inherits it.",
          deliverables: ["Production implementation", "Performance budget"],
          visual: {
            kind: "image",
            src: "/images/livv-web/desktop-macbook-products-captura-original.webp",
            caption: "LIVV web · live at livvvv.com",
            href: "/projects/livv-web",
          },
        },
      ],
    },
    process: {
      heading: ["Explore, prototype, engineer.", "The risky part goes first."],
      steps: [
        { title: "Explore", body: "Define the idea and the interaction model, and agree what makes it distinctive." },
        { title: "Prototype", body: "Build the hardest interaction first and validate it in the browser." },
        { title: "Engineer", body: "Take the prototype to production without losing the feel it earned." },
      ],
      terms: ["Working prototype before the build", "Motion spec and performance budget", "One team from concept to code"],
      action: "Start scoping your experience",
    },
    testimonial: { name: "Sabrina Guler", quoteStart: "I hired Eneas for a critical Webflow build" },
    cta: {
      label: "Creative engineering",
      headline: "Distinctive is not the hard part.",
      headlineAccent: "Distinctive and reliable is.",
      body: "Bring the idea nobody has been able to scope. We will prototype the risky part first.",
      secondary: { text: "Need motion direction? See Motion & Narrative", href: "/services/motion-narrative" },
    },
  },

  "product-strategy-ui": {
    work: {
      heading: ["Products with a system", "behind every screen."],
      lead: {
        href: "/projects/wortise",
        name: "Wortise",
        meta: "Product design · Web app",
        year: "2026",
        line: "Revenue, reports and payments for your apps, in one dashboard.",
        image: "/images/wortise/intro-dashboard-sobre-fondo-rosa.webp",
        facts: [
          { label: "Client", value: "Wortise" },
          { label: "LIVV's role", value: "UX/UI, system" },
          { label: "Platforms", value: "Web app" },
        ],
      },
      more: [prTool, freneticPace],
    },
    capabilities: {
      heading: ["A product system your users understand", "and your engineers can build."],
      items: [
        {
          title: "Product definition and priorities",
          line: "We turn the request list into decisions: what ships first and what deliberately waits.",
          deliverables: ["Product definition", "Prioritised scope"],
          visual: {
            kind: "image",
            src: "/images/pr-tool/flujo-onboarding.webp",
            caption: "PR Tool · onboarding flow",
            href: "/projects/pr-tool",
          },
        },
        {
          title: "Experience architecture and flows",
          line: "End-to-end flows, including the empty, error and edge states that usually surface mid-build.",
          deliverables: ["Information architecture", "End-to-end flows"],
          visual: {
            kind: "image",
            src: "/images/wortise/desktop-generar-reporte.webp",
            caption: "Wortise · generating a report",
            href: "/projects/wortise",
          },
        },
        {
          title: "Scalable UI system and prototype",
          line: "Components, tokens and states engineering can build from, validated in a prototype.",
          deliverables: ["UI design system", "Validation prototype"],
          visual: {
            kind: "image",
            src: "/images/pr-tool/desktop-campana-datos.webp",
            caption: "PR Tool · campaign performance, from the same system",
            href: "/projects/pr-tool",
          },
        },
      ],
    },
    process: {
      heading: ["Define, structure, design.", "In that order."],
      steps: [
        { title: "Define", body: "Agree what the product is for and which outcome comes first." },
        { title: "Structure", body: "Design the architecture and the complete flows behind it." },
        { title: "Design", body: "Build the UI system and validate it in a working prototype." },
      ],
      terms: ["Clickable prototype before engineering", "Design system with tokens and states", "Handoff engineers can build from"],
      action: "Start scoping your product",
    },
    testimonial: { name: "Ronen Wasserman", quoteStart: "Was great working together" },
    cta: {
      label: "Product strategy & UI",
      headline: "Your product does not need more screens.",
      headlineAccent: "It needs clearer decisions.",
      body: "Turn scattered requirements into a product your users understand and your engineering team can build.",
      secondary: { text: "Ready to build it? See Custom Software", href: "/services/custom-software-development" },
    },
  },

  "motion-narrative": {
    work: {
      heading: ["Stories told in motion,", "for products and brands."],
      lead: {
        href: "/projects/sacoa",
        name: "Sacoa Cashless",
        meta: "Web design & motion",
        year: "2024",
        line: "A cashless system, told in motion.",
        // Blue from the first frame to the last; the hero loop spends half its
        // length on a white page, which reads as empty at this size.
        image: "/images/sacoa/motion-tarjetas-que-giran-poster.webp",
        video: "/images/sacoa/motion-tarjetas-que-giran.mp4",
        facts: [
          { label: "Client", value: "Sacoa Cashless System" },
          { label: "LIVV's role", value: "Web design and animations" },
          { label: "Platforms", value: "Website" },
        ],
      },
      more: [
        livvWeb,
        { ...pliego, image: "/images/pliego/motion-video-del-hero.webp" },
      ],
    },
    capabilities: {
      heading: ["A visual story", "that lands the first time it is seen."],
      items: [
        {
          title: "Narrative and communication structure",
          line: "What the story has to prove, in what order, and what gets left out.",
          deliverables: ["Narrative structure", "Script and messaging"],
          visual: {
            kind: "video",
            src: "/images/sacoa/motion-tipografia-en-capas.mp4",
            poster: "/images/sacoa/motion-tipografia-en-capas-poster.webp",
            caption: "Sacoa · the name, in layers",
            href: "/projects/sacoa",
          },
        },
        {
          title: "Storyboards and motion direction",
          line: "Pacing and emphasis agreed before production time is spent on them.",
          deliverables: ["Storyboards", "Motion direction"],
          visual: {
            kind: "video",
            src: "/images/sacoa/motion-tarjetas-que-se-arman.mp4",
            poster: "/images/sacoa/motion-tarjetas-que-se-arman-poster.webp",
            caption: "Sacoa · cards that assemble",
            href: "/projects/sacoa",
          },
        },
        {
          title: "Animation systems and production",
          line: "The final piece, plus the easing and timing rules your team can reuse.",
          deliverables: ["Final animation", "Reusable motion system"],
          visual: {
            kind: "video",
            src: "/images/sacoa/motion-hero-y-entrada-de-tarjetas.mp4",
            poster: "/images/sacoa/motion-hero-y-entrada-de-tarjetas-poster.webp",
            caption: "Sacoa · the hero, then the cards",
            href: "/projects/sacoa",
          },
        },
      ],
    },
    process: {
      heading: ["Clarify, storyboard, animate.", "Structure before the first frame."],
      steps: [
        { title: "Clarify", body: "Define the message, the audience and what the story has to prove." },
        { title: "Storyboard", body: "Design the sequence, the pacing and the emphasis before production." },
        { title: "Animate", body: "Produce the final piece and the motion rules that outlive it." },
      ],
      terms: ["Script and storyboards approved first", "Final animation and motion system", "Rules your team can reuse"],
      action: "Start scoping your story",
    },
    testimonial: { name: "Fidan Alizada", quoteStart: "It was great working with Eneas" },
    cta: {
      label: "Motion & narrative",
      headline: "Make your product easier to understand.",
      headlineAccent: "And harder to forget.",
      body: "Bring us the thing your team keeps having to explain twice. We will design the story that explains it once.",
      secondary: { text: "Need the interface too? See Product Strategy & UI", href: "/services/product-strategy-ui" },
    },
  },

  "nearshore-development": {
    work: {
      heading: ["Recent work,", "shipped from Buenos Aires."],
      lead: {
        href: "/projects/sunnyside",
        name: "Sunnyside",
        meta: "United States · HR platform",
        year: "2026",
        line: "An HR brand that feels warm, calm and human.",
        image: "/images/sunnyside/intro-home-en-navegador-sobre-paisaje.webp",
        facts: [
          { label: "Market", value: "Mid-sized companies in the United States" },
          { label: "LIVV's role", value: "Web design and Framer" },
          { label: "Status", value: "Launched · sunny-side.com" },
        ],
      },
      more: [
        {
          href: "/projects/we-make-footballers",
          name: "We Make Footballers",
          meta: "United Kingdom · Football academy",
          year: "2026",
          line: "Kids' football and a franchise, with one idea: Make It.",
          image: "/images/we-make-footballers/intro-web-de-la-academia-sobre-foto.webp",
        },
        freneticPace,
      ],
    },
    capabilities: {
      heading: ["Senior work on your clock,", "in your language."],
      items: [
        {
          title: "Full overlap with US East Coast hours",
          line: "Buenos Aires is UTC-3 all year: one hour ahead of New York from March to November, two the rest.",
          deliverables: ["9am Eastern kickoff calls", "Work in your inbox by morning"],
          visual: { kind: "timezones", caption: "Buenos Aires and New York, right now" },
        },
        {
          title: "Bilingual by default",
          line: "English and Spanish operations, with senior people on every call instead of an account manager translating.",
          deliverables: ["English and Spanish", "No account manager in between"],
          visual: {
            kind: "image",
            src: "/images/we-make-footballers/desktop-home-franquicia.webp",
            caption: "We Make Footballers · franchise site for a UK academy",
            href: "/projects/we-make-footballers",
          },
        },
        {
          title: "Senior-only team",
          line: "No juniors. The founder is on every project, from kickoff to deploy.",
          deliverables: ["Founder on every project", "Fixed fee or retainer"],
          visual: {
            kind: "image",
            src: "/images/sunnyside/desktop-how-it-works.webp",
            caption: "Sunnyside · how it works",
            href: "/projects/sunnyside",
          },
        },
      ],
    },
    process: {
      heading: ["Talk, scope, build.", "On your hours."],
      steps: [
        { title: "A 15-minute call", body: "We tell you in fifteen minutes whether we are the right partner." },
        { title: "Scope and price", body: "Fixed fee or retainer, with the price agreed before kickoff." },
        { title: "Build on your clock", body: "9am Eastern kickoffs, and work that lands in your inbox by morning." },
      ],
      terms: ["UTC-3 · full East Coast overlap", "English and Spanish", "Senior-only team"],
      action: "Schedule a 15-minute call",
    },
    testimonial: { name: "Joseph Conlon", quoteStart: "Eneas & Luis setup the localisation" },
    cta: {
      label: "Nearshore software development",
      headline: "Fifteen minutes is enough",
      headlineAccent: "to know if we are the right partner.",
      body: "Schedule a 15-minute call. We will tell you in fifteen minutes whether we are the right team for the work.",
      secondary: { text: "Need AI in the product? See AI Integration", href: "/services/ai-integration" },
    },
  },
}

export function getServicePageContent(slug: string): ServicePageContent | null {
  return servicePages[slug] ?? null
}
