import { BlogPost } from "@/types/blog"

const author = {
  name: "LIVV Studio",
  role: "Creative Engineering Agency",
  avatar: "/assets/logo-new.png",
}

const category = {
  slug: "creative-engineering",
  name: "Creative Engineering",
  description:
    "Exploring creative engineering as a discipline — design systems, tech stacks, and the future of building for the web.",
  clusterId: "F",
}

const cta = {
  type: "contact" as const,
  link: "/contact",
  text: "Ready to build something great? Let's talk.",
}

const coverImage = "/images/blog/creative-engineering.webp"

export const clusterFCreativeEngineering: BlogPost[] = [
  /* ────────────────────────────────────────────────────────────
   * 1 — PILLAR: What Is Creative Engineering?
   * ──────────────────────────────────────────────────────────── */
  {
    id: "f-001",
    slug: "what-is-creative-engineering",
    title:
      "What Is Creative Engineering? And Why Your Next Hire Should Be One",
    excerpt:
      "Creative engineering sits at the intersection of design, code, and strategy. Learn why this hybrid discipline is reshaping how brands build for the web — and why agencies that master it deliver faster, more polished results.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "The Rise of the Creative Engineer",
        level: 2,
        id: "rise-of-creative-engineer",
      },
      {
        type: "paragraph",
        content:
          "For the past decade, the web industry has operated on a strict division of labor: designers design, developers develop, and a project manager shuttles Figma links back and forth until everyone is exhausted. The result is beautiful mockups that arrive in production looking slightly — or dramatically — different from the original vision. Creative engineering exists to close that gap.",
      },
      {
        type: "paragraph",
        content:
          "A creative engineer is someone who can open a Figma file, understand the typographic hierarchy and spacing logic, and then build the production site with pixel-level accuracy — all while writing clean, maintainable code. They think in design tokens and component APIs simultaneously. They notice when a border-radius is 12px in the mockup but 8px in the codebase, and they fix it before anyone files a ticket.",
      },
      {
        type: "heading",
        content: "Why Traditional Handoffs Break Down",
        level: 2,
        id: "why-handoffs-break",
      },
      {
        type: "paragraph",
        content:
          "The designer-to-developer handoff is the single largest source of quality loss in web projects. Designers specify interactions in a static medium. Developers interpret those specifications through the lens of whatever framework they happen to know. Nuance evaporates. Animations get simplified. Responsive behavior gets guessed at. By the time a site launches, it is a rough approximation of what was designed — not a faithful translation.",
      },
      {
        type: "callout",
        content:
          "At LIVV, we eliminated the handoff entirely. Our creative engineers own the full arc from design system architecture through production deployment.",
        variant: "info",
      },
      {
        type: "heading",
        content: "The Creative Engineering Skill Stack",
        level: 2,
        id: "skill-stack",
      },
      {
        type: "list",
        items: [
          "Design fluency — ability to read, critique, and extend design systems in Figma or Sketch",
          "Front-end mastery — deep knowledge of CSS, animation, layout, and at least one modern framework",
          "Platform expertise — hands-on experience with Webflow, Framer, or similar visual development tools",
          "Systems thinking — understanding of component architecture, design tokens, and scalable CSS methodologies",
          "Performance instinct — a reflex to audit Core Web Vitals, optimize images, and lazy-load below the fold",
          "Communication — the ability to articulate trade-offs to stakeholders who do not write code",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "Creative Engineering in Practice: How We Work",
        level: 2,
        id: "in-practice",
      },
      {
        type: "paragraph",
        content:
          "At LIVV, creative engineering is not a job title — it is our operating model. Every project starts with a design system audit. We map typography scales, color tokens, spacing units, and component variants before a single div is created. This up-front investment means that when we build in Webflow, every class name maps to a design decision, every combo class has a reason to exist, and the CMS structure mirrors the content model the client actually needs.",
      },
      {
        type: "paragraph",
        content:
          "We pair Webflow with Supabase for dynamic data and Claude for content-aware automation. This stack lets us deliver sites that look like they took three months in five days — because the creative engineering discipline eliminates rework, not effort.",
      },
      {
        type: "heading",
        content: "Why Your Next Hire Should Be a Creative Engineer",
        level: 3,
        id: "why-hire-one",
      },
      {
        type: "paragraph",
        content:
          "If you run a startup, you do not need a designer and a developer and a project manager for your marketing site. You need one creative engineer who can do all three, with taste. If you run an agency, replacing the handoff with a unified skill set reduces your revision cycles by 40-60% and lets you charge for quality instead of hours. The market is moving toward integrated execution. Creative engineering is how you get there.",
      },
      {
        type: "table",
        headers: ["Traditional Model", "Creative Engineering Model"],
        rows: [
          ["Designer + Developer + PM", "One creative engineer (or a small team)"],
          ["3-5 revision cycles", "1-2 revision cycles"],
          ["8-12 week timeline", "2-5 week timeline"],
          ["Design drift in production", "Pixel-accurate output"],
          ["Siloed knowledge", "Shared context across design and code"],
        ],
      },
      {
        type: "faq",
        items: [
          {
            question: "What is creative engineering?",
            answer:
              "Creative engineering is a hybrid discipline that combines design fluency, front-end development, and strategic thinking. Creative engineers can take a project from Figma mockup to production-ready code without the traditional handoff process, resulting in faster delivery and higher fidelity output.",
          },
          {
            question:
              "How is a creative engineer different from a front-end developer?",
            answer:
              "A front-end developer focuses primarily on writing code to implement designs created by someone else. A creative engineer participates in — and often leads — design decisions, understands typography and visual hierarchy, and builds production sites with design-level attention to detail. They own the full arc from visual concept to deployed product.",
          },
          {
            question:
              "Why should agencies adopt a creative engineering model?",
            answer:
              "Agencies that adopt creative engineering reduce revision cycles by 40-60%, compress timelines from months to weeks, and deliver higher-fidelity results. By eliminating the designer-to-developer handoff, they remove the single largest source of quality loss in web projects.",
          },
        ],
      },
      {
        type: "cta",
        text: "Want to see creative engineering in action? Let's build your next project together.",
        link: "/contact",
        buttonText: "Start a project",
      },
    ],
    coverImage,
    author,
    category,
    tags: [
      "creative engineering",
      "web development",
      "design systems",
      "agency model",
      "webflow",
    ],
    readingTimeMinutes: 9,
    published: true,
    featured: true,
    displayOrder: 1,
    seoTitle:
      "What Is Creative Engineering? And Why Your Next Hire Should Be One",
    seoDescription:
      "Creative engineering merges design, code, and strategy into one discipline. Learn why this hybrid role eliminates handoff friction and delivers faster, higher-quality web projects.",
    faqSchema: [
      {
        question: "What is creative engineering?",
        answer:
          "Creative engineering is a hybrid discipline that combines design fluency, front-end development, and strategic thinking. Creative engineers can take a project from Figma mockup to production-ready code without the traditional handoff process, resulting in faster delivery and higher fidelity output.",
      },
      {
        question:
          "How is a creative engineer different from a front-end developer?",
        answer:
          "A front-end developer focuses primarily on writing code to implement designs created by someone else. A creative engineer participates in — and often leads — design decisions, understands typography and visual hierarchy, and builds production sites with design-level attention to detail.",
      },
      {
        question: "Why should agencies adopt a creative engineering model?",
        answer:
          "Agencies that adopt creative engineering reduce revision cycles by 40-60%, compress timelines from months to weeks, and deliver higher-fidelity results by eliminating the designer-to-developer handoff.",
      },
      {
        question: "What tools do creative engineers use?",
        answer:
          "Creative engineers typically work with visual development platforms like Webflow, design tools like Figma, backend services like Supabase, and AI-assisted workflows using tools like Claude. The specific stack varies, but the emphasis is on tools that allow rapid, high-fidelity execution.",
      },
      {
        question: "Can a creative engineer replace a full design and dev team?",
        answer:
          "For many projects — especially marketing sites, landing pages, and brand experiences — a single creative engineer or a small team of them can replace the traditional designer-developer-PM triad. For large-scale applications with complex backend logic, creative engineers typically work alongside backend specialists.",
      },
    ],
    internalLinks: [
      {
        slug: "webflow-supabase-claude-stack",
        text: "Our tech stack explained",
      },
      {
        slug: "webflow-design-systems",
        text: "How we structure design systems in Webflow",
      },
      {
        slug: "figma-to-webflow-5-days",
        text: "From Figma to production in 5 days",
      },
    ],
    cta,
    relatedPostSlugs: [
      "webflow-supabase-claude-stack",
      "webflow-design-systems",
      "figma-to-webflow-5-days",
      "white-label-webflow-development",
    ],
    createdAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-03-01T08:00:00Z",
  },

  /* ────────────────────────────────────────────────────────────
   * 2 — Why We Build with Webflow + Supabase + Claude
   * ──────────────────────────────────────────────────────────── */
  {
    id: "f-002",
    slug: "webflow-supabase-claude-stack",
    title:
      "Why We Build with Webflow + Supabase + Claude (Our Stack, Explained)",
    excerpt:
      "Most agencies pick tools based on familiarity. We picked ours based on a single question: what lets a creative engineer ship a production site in under a week? Here is the answer.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "The Problem with Default Stacks",
        level: 2,
        id: "problem-with-default-stacks",
      },
      {
        type: "paragraph",
        content:
          "WordPress powers 40% of the web, but that does not mean it is the right tool for a brand that needs speed, visual polish, and low maintenance overhead. React plus a headless CMS is powerful, but it demands a team of three to do what one creative engineer can accomplish in Webflow. The default choices in web development are defaults because of inertia, not because they are optimal.",
      },
      {
        type: "paragraph",
        content:
          "We rebuilt our stack from first principles. The question was not 'what do most agencies use?' but 'what lets us deliver a production-grade marketing site — with CMS, animations, and dynamic data — in five business days, without sacrificing quality?'",
      },
      {
        type: "heading",
        content: "Layer 1: Webflow for Visual Development",
        level: 2,
        id: "webflow-layer",
      },
      {
        type: "paragraph",
        content:
          "Webflow is not a drag-and-drop website builder. It is a visual development environment that generates clean, semantic HTML and CSS. When a creative engineer builds in Webflow, they are writing code — they are just doing it through a visual interface that provides instant feedback. The result is production sites that load fast, render correctly across browsers, and can be maintained by clients who do not write code.",
      },
      {
        type: "list",
        items: [
          "Component-based architecture with symbols and slots",
          "Native CMS with relational references and conditional visibility",
          "Built-in responsive design controls — no media query guesswork",
          "Integrated hosting with global CDN and automatic SSL",
          "Client-friendly Editor mode for content updates",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "Layer 2: Supabase for Dynamic Data",
        level: 2,
        id: "supabase-layer",
      },
      {
        type: "paragraph",
        content:
          "Webflow's native CMS handles most content needs, but some projects require dynamic data that goes beyond what a flat CMS can manage — user-generated content, real-time dashboards, transactional workflows, or complex filtering. For those cases, we use Supabase.",
      },
      {
        type: "paragraph",
        content:
          "Supabase gives us a full Postgres database, real-time subscriptions, row-level security, and edge functions — all accessible via a REST API that Webflow can consume through lightweight JavaScript embeds. We get the power of a custom backend without the overhead of deploying and maintaining one.",
      },
      {
        type: "heading",
        content: "Layer 3: Claude for Content-Aware Automation",
        level: 2,
        id: "claude-layer",
      },
      {
        type: "paragraph",
        content:
          "AI is not a gimmick in our workflow — it is infrastructure. We use Claude to generate structured content drafts, validate SEO metadata against best practices, build FAQ schemas from existing documentation, and automate repetitive content migration tasks. This does not replace human judgment; it accelerates it. A creative engineer still reviews and refines every output, but they start from 80% instead of zero.",
      },
      {
        type: "callout",
        content:
          "Our stack is not about using the trendiest tools. It is about choosing the combination that lets a small team deliver enterprise-quality results on startup timelines.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "How the Layers Work Together",
        level: 2,
        id: "layers-together",
      },
      {
        type: "paragraph",
        content:
          "A typical project flows like this: Claude helps us generate and structure the initial content model. We build the Webflow site using a design system we have refined over dozens of projects. For any data that exceeds Webflow CMS capabilities, we spin up a Supabase project and connect it via API. The client gets a site that looks custom-coded, loads in under two seconds, and can be updated by anyone on their team — all delivered in a fraction of the time a traditional stack would require.",
      },
      {
        type: "table",
        headers: ["Layer", "Tool", "What It Handles"],
        rows: [
          ["Visual Development", "Webflow", "UI, layout, CMS, hosting, interactions"],
          ["Dynamic Backend", "Supabase", "Postgres, auth, real-time data, edge functions"],
          ["AI Automation", "Claude", "Content structuring, SEO validation, data migration"],
        ],
      },
      {
        type: "faq",
        items: [
          {
            question: "Why Webflow instead of a custom-coded React site?",
            answer:
              "For marketing sites and brand experiences, Webflow delivers the same visual quality with a fraction of the development time. Custom React builds make sense for complex web applications, but for the types of projects we handle — landing pages, multi-page marketing sites, portfolio sites — Webflow is faster and more maintainable.",
          },
          {
            question: "Is Supabase production-ready?",
            answer:
              "Yes. Supabase runs on standard Postgres, which powers some of the largest applications in the world. It includes enterprise features like row-level security, point-in-time recovery, and SOC 2 Type II compliance. We have used it in production for client projects handling tens of thousands of requests per day without issue.",
          },
        ],
      },
      {
        type: "cta",
        text: "Curious how this stack would work for your project?",
        link: "/contact",
        buttonText: "Let's talk",
      },
    ],
    coverImage,
    author,
    category,
    tags: [
      "webflow",
      "supabase",
      "claude",
      "tech stack",
      "creative engineering",
      "AI",
    ],
    readingTimeMinutes: 7,
    published: true,
    featured: false,
    displayOrder: 2,
    seoTitle:
      "Why We Build with Webflow + Supabase + Claude — Our Stack Explained",
    seoDescription:
      "A breakdown of the Webflow, Supabase, and Claude stack that lets LIVV Studio deliver production-grade marketing sites in under a week.",
    faqSchema: [
      {
        question: "Why Webflow instead of a custom-coded React site?",
        answer:
          "For marketing sites and brand experiences, Webflow delivers the same visual quality with a fraction of the development time. Custom React builds make sense for complex web applications, but for marketing projects Webflow is faster and more maintainable.",
      },
      {
        question: "Is Supabase production-ready?",
        answer:
          "Yes. Supabase runs on standard Postgres with enterprise features like row-level security, point-in-time recovery, and SOC 2 Type II compliance.",
      },
      {
        question: "How does Claude fit into a web development workflow?",
        answer:
          "Claude is used for content structuring, SEO metadata validation, FAQ schema generation, and automating repetitive content migration tasks. It accelerates the creative engineering workflow without replacing human judgment.",
      },
    ],
    internalLinks: [
      {
        slug: "what-is-creative-engineering",
        text: "What is creative engineering?",
      },
      {
        slug: "webflow-design-systems",
        text: "Design systems in Webflow",
      },
      {
        slug: "figma-to-webflow-5-days",
        text: "How we ship sites in 5 days",
      },
    ],
    cta,
    relatedPostSlugs: [
      "what-is-creative-engineering",
      "webflow-design-systems",
      "figma-to-webflow-5-days",
    ],
    pillarPageSlug: "what-is-creative-engineering",
    createdAt: "2026-03-05T08:00:00Z",
    updatedAt: "2026-03-05T08:00:00Z",
  },

  /* ────────────────────────────────────────────────────────────
   * 3 — Design Systems in Webflow
   * ──────────────────────────────────────────────────────────── */
  {
    id: "f-003",
    slug: "webflow-design-systems",
    title:
      "Design Systems in Webflow: How We Structure Sites That Scale",
    excerpt:
      "A Webflow site without a design system is a ticking time bomb of inconsistency. Here is how we build class architectures, component libraries, and token systems that keep sites maintainable as they grow.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Most Webflow Sites Fall Apart at Scale",
        level: 2,
        id: "why-sites-fall-apart",
      },
      {
        type: "paragraph",
        content:
          "The number one complaint agencies hear from clients who already have a Webflow site is: 'We are afraid to change anything because we do not know what will break.' This is not a Webflow problem. It is a systems problem. When a site is built without a coherent class naming convention, without a spacing scale, without a deliberate typography hierarchy, every edit becomes a gamble. Change a font size in one place and it cascades unpredictably. Add a new section and spend thirty minutes trying to match the padding of existing sections by eyeballing pixel values.",
      },
      {
        type: "paragraph",
        content:
          "A design system prevents this. It transforms a Webflow project from a fragile collection of one-off styles into a composable toolkit where every element has a predictable relationship to every other element.",
      },
      {
        type: "heading",
        content: "Our Design System Architecture",
        level: 2,
        id: "design-system-architecture",
      },
      {
        type: "heading",
        content: "1. Global Token Classes",
        level: 3,
        id: "global-tokens",
      },
      {
        type: "paragraph",
        content:
          "We start with a set of utility classes that encode design decisions. These are not Tailwind-style utility classes — they are semantic tokens. A class called 'text-size-large' does not just set a font size; it sets the font size, line height, and letter spacing that our design system specifies for large text. These tokens are defined once and applied everywhere, so a global typography change requires editing one class instead of fifty.",
      },
      {
        type: "list",
        items: [
          "Typography tokens: text-size-xs through text-size-display, each with paired line-height and letter-spacing",
          "Spacing tokens: padding and margin classes tied to a 4px base grid (space-1 = 4px, space-2 = 8px, up to space-16 = 64px)",
          "Color tokens: mapped to CSS variables for easy theme switching (brand-primary, brand-secondary, surface-default, text-primary)",
          "Border and radius tokens: consistent corner radii and border widths across all components",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "2. Component-Level Classes",
        level: 3,
        id: "component-classes",
      },
      {
        type: "paragraph",
        content:
          "Above the token layer, we build component classes using a BEM-inspired naming convention adapted for Webflow. A card component gets a base class of 'card', with combo classes like 'card-is-featured' or 'card-is-compact' for variants. Internal elements use the pattern 'card_heading', 'card_body', 'card_image'. This makes the style panel self-documenting — anyone looking at the class list can immediately understand the structure.",
      },
      {
        type: "heading",
        content: "3. Layout Primitives",
        level: 3,
        id: "layout-primitives",
      },
      {
        type: "paragraph",
        content:
          "We define reusable layout containers — 'section_default', 'container_large', 'grid_2-col', 'grid_3-col' — that establish consistent spacing and max-widths across every page. These primitives ensure that a new page built six months from now will feel like it belongs to the same site, even if a different person builds it.",
      },
      {
        type: "heading",
        content: "The Symbol Library",
        level: 2,
        id: "symbol-library",
      },
      {
        type: "paragraph",
        content:
          "Every reusable UI element — navigation, footer, testimonial cards, pricing tables, CTA blocks — lives as a Webflow symbol. Symbols are the Webflow equivalent of React components: change the symbol once and every instance updates. We organize symbols into categories (navigation, heroes, content blocks, forms, footers) and use slot overrides for content variation. The goal is a library where assembling a new page is closer to configuration than construction.",
      },
      {
        type: "callout",
        content:
          "A well-built Webflow design system should let a junior designer assemble a new landing page in under two hours — using only existing components and tokens, with zero new classes created.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "CMS Architecture as Part of the System",
        level: 2,
        id: "cms-architecture",
      },
      {
        type: "paragraph",
        content:
          "The design system extends into the CMS. Collection fields are named consistently, reference fields are structured to avoid circular dependencies, and rich text styling is controlled through a dedicated rich-text embed class that inherits from the global typography tokens. This means client-authored content looks polished by default, without manual formatting.",
      },
      {
        type: "faq",
        items: [
          {
            question: "How long does it take to build a design system in Webflow?",
            answer:
              "For a new project, we spend the first 1-2 days establishing the design system before building any pages. This up-front investment typically saves 3-5 days over the course of the project by eliminating inconsistencies and reducing the need for one-off fixes.",
          },
          {
            question: "Can you retrofit a design system onto an existing Webflow site?",
            answer:
              "Yes, but it requires a careful audit and incremental migration. We typically start by documenting the existing class structure, identifying redundancies, and then refactoring section by section. Depending on the size of the site, this can take one to three weeks.",
          },
        ],
      },
      {
        type: "cta",
        text: "Is your Webflow site struggling with inconsistency? We can help.",
        link: "/contact",
        buttonText: "Get a design system audit",
      },
    ],
    coverImage,
    author,
    category,
    tags: [
      "webflow",
      "design systems",
      "CSS architecture",
      "component libraries",
      "creative engineering",
    ],
    readingTimeMinutes: 8,
    published: true,
    featured: false,
    displayOrder: 3,
    seoTitle:
      "Design Systems in Webflow: How to Structure Sites That Scale",
    seoDescription:
      "Learn how to build scalable Webflow design systems with token classes, BEM-inspired naming, symbol libraries, and CMS architecture that keeps sites maintainable as they grow.",
    faqSchema: [
      {
        question: "How long does it take to build a design system in Webflow?",
        answer:
          "For a new project, establishing the design system takes the first 1-2 days. This up-front investment typically saves 3-5 days over the course of the project by eliminating inconsistencies.",
      },
      {
        question:
          "Can you retrofit a design system onto an existing Webflow site?",
        answer:
          "Yes. It requires a careful audit and incremental migration, starting by documenting existing class structure, identifying redundancies, and refactoring section by section. This typically takes one to three weeks.",
      },
      {
        question: "What naming convention works best for Webflow classes?",
        answer:
          "A BEM-inspired convention adapted for Webflow works best. Use a base class like 'card', combo classes like 'card-is-featured' for variants, and child classes like 'card_heading' for internal elements. This keeps the style panel self-documenting.",
      },
      {
        question: "Do Webflow design systems work with the CMS?",
        answer:
          "Yes. A well-built design system extends into the CMS with consistent collection field naming, structured reference fields, and rich text styling controlled through dedicated embed classes that inherit from global typography tokens.",
      },
    ],
    internalLinks: [
      {
        slug: "what-is-creative-engineering",
        text: "What is creative engineering?",
      },
      {
        slug: "figma-to-webflow-5-days",
        text: "How we go from Figma to production in 5 days",
      },
      {
        slug: "webflow-supabase-claude-stack",
        text: "Our tech stack explained",
      },
    ],
    cta,
    relatedPostSlugs: [
      "what-is-creative-engineering",
      "figma-to-webflow-5-days",
      "webflow-supabase-claude-stack",
    ],
    pillarPageSlug: "what-is-creative-engineering",
    createdAt: "2026-03-08T08:00:00Z",
    updatedAt: "2026-03-08T08:00:00Z",
  },

  /* ────────────────────────────────────────────────────────────
   * 4 — From Figma to Production in 5 Days
   * ──────────────────────────────────────────────────────────── */
  {
    id: "f-004",
    slug: "figma-to-webflow-5-days",
    title:
      "From Figma to Production in 5 Days: How We Ship Webflow Sites",
    excerpt:
      "Five business days from signed-off Figma designs to a live, production-ready Webflow site. Here is the exact process we follow — day by day — to make that timeline real without cutting corners.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Five Days Is Not Rushing — It Is Discipline",
        level: 2,
        id: "five-days-discipline",
      },
      {
        type: "paragraph",
        content:
          "When people hear 'five-day build,' they assume shortcuts. Sloppy code. Missing responsive breakpoints. No QA. The opposite is true. A five-day timeline works because we have eliminated the things that make projects slow — not the things that make them good. There are no handoff meetings because the person building the site already understands the design. There are no 'let me check if the CMS supports that' conversations because the CMS architecture was planned before the build started. There is no 'the developer interpreted the animation differently' because the same person who reviewed the Figma prototype is the one implementing the interactions.",
      },
      {
        type: "heading",
        content: "Day 1: Design System Setup and Content Architecture",
        level: 2,
        id: "day-1",
      },
      {
        type: "paragraph",
        content:
          "Day one is entirely about foundation. We audit the Figma file and extract every design decision into a Webflow-native system: typography scale, color variables, spacing tokens, component inventory. Simultaneously, we define the CMS collections — what fields each content type needs, how collections reference each other, and which content will be hardcoded versus CMS-driven. By end of day one, we have a blank Webflow project with a fully configured design system and an empty but correctly structured CMS.",
      },
      {
        type: "heading",
        content: "Day 2: Core Pages and Component Build",
        level: 2,
        id: "day-2",
      },
      {
        type: "paragraph",
        content:
          "Day two is the heaviest build day. We construct the homepage, the primary interior page templates, and all shared components — navigation, footer, CTA blocks, testimonial sections, feature grids. Everything is built as Webflow symbols with slot-based content variation. We work desktop-first, establishing the structural hierarchy before touching responsive behavior. By end of day two, the desktop version of the site is 80% complete.",
      },
      {
        type: "heading",
        content: "Day 3: Remaining Pages and Responsive Design",
        level: 2,
        id: "day-3",
      },
      {
        type: "paragraph",
        content:
          "Day three splits into two streams. Morning: build out remaining pages — about, services detail pages, blog templates, contact. Afternoon: full responsive pass across all four Webflow breakpoints (tablet landscape, tablet portrait, mobile landscape, mobile). We do not rely on Webflow's auto-responsive behavior. Every breakpoint is manually reviewed and adjusted for optimal readability, tap targets, and visual balance.",
      },
      {
        type: "heading",
        content: "Day 4: Interactions, CMS Population, and Integration",
        level: 2,
        id: "day-4",
      },
      {
        type: "paragraph",
        content:
          "Day four brings the site to life. We implement scroll-triggered animations, hover states, page transitions, and any custom interactions specified in the Figma prototype. The CMS gets populated with real content — either provided by the client or generated with Claude and reviewed by our team. Form integrations, analytics scripts, and any third-party embeds are configured and tested.",
      },
      {
        type: "heading",
        content: "Day 5: QA, Performance Optimization, and Launch",
        level: 2,
        id: "day-5",
      },
      {
        type: "paragraph",
        content:
          "Day five is entirely quality assurance and optimization. We run Lighthouse audits and address any performance issues — image compression, lazy loading, font subsetting. We test every page on Chrome, Safari, Firefox, and Edge. We verify every CMS-driven page renders correctly with real content. We check meta titles, descriptions, OG images, and structured data. Once everything passes, we connect the custom domain, configure SSL, and publish.",
      },
      {
        type: "list",
        items: [
          "Lighthouse performance score target: 90+",
          "Cross-browser testing: Chrome, Safari, Firefox, Edge",
          "Device testing: iPhone, Android, iPad, desktop",
          "SEO checklist: meta tags, canonical URLs, sitemap, robots.txt",
          "Accessibility pass: alt text, focus states, color contrast, semantic markup",
        ],
        ordered: true,
      },
      {
        type: "callout",
        content:
          "The five-day timeline assumes a signed-off Figma design with real content. If the client needs design and content strategy as well, we add two to three days for discovery and design before the build sprint begins.",
        variant: "info",
      },
      {
        type: "faq",
        items: [
          {
            question: "What is included in a five-day Webflow build?",
            answer:
              "A complete, production-ready Webflow site including design system setup, all pages (typically 5-10), responsive design across all breakpoints, CMS configuration, content population, interactions and animations, SEO optimization, performance tuning, and launch.",
          },
          {
            question: "What do you need from the client before the five-day sprint?",
            answer:
              "A signed-off Figma design, final copy for all pages, high-resolution images and brand assets, and access to any third-party services that need integration (analytics, CRM, email marketing). The more complete the inputs, the smoother the build.",
          },
        ],
      },
      {
        type: "cta",
        text: "Have a Figma design ready to build? Let's put it live this week.",
        link: "/contact",
        buttonText: "Start your 5-day sprint",
      },
    ],
    coverImage,
    author,
    category,
    tags: [
      "webflow",
      "figma",
      "web development process",
      "rapid delivery",
      "creative engineering",
    ],
    readingTimeMinutes: 7,
    published: true,
    featured: false,
    displayOrder: 4,
    seoTitle:
      "From Figma to Webflow in 5 Days: Our Exact Build Process",
    seoDescription:
      "A day-by-day breakdown of how LIVV Studio ships production-ready Webflow sites in five business days — from design system setup through launch, without cutting corners.",
    faqSchema: [
      {
        question: "What is included in a five-day Webflow build?",
        answer:
          "A complete production-ready Webflow site including design system setup, all pages, responsive design, CMS configuration, content population, interactions, SEO optimization, performance tuning, and launch.",
      },
      {
        question:
          "What do you need from the client before the five-day sprint?",
        answer:
          "A signed-off Figma design, final copy for all pages, high-resolution images and brand assets, and access to any third-party services that need integration.",
      },
      {
        question: "Can complex sites really be built in five days?",
        answer:
          "Yes, for marketing sites with 5-10 pages. The speed comes from a proven design system, a refined process, and creative engineers who own both design and development. Larger sites or web applications may require a longer timeline.",
      },
    ],
    internalLinks: [
      {
        slug: "what-is-creative-engineering",
        text: "What is creative engineering?",
      },
      {
        slug: "webflow-design-systems",
        text: "Our design system approach",
      },
      {
        slug: "white-label-webflow-development",
        text: "White-label Webflow development",
      },
    ],
    cta,
    relatedPostSlugs: [
      "what-is-creative-engineering",
      "webflow-design-systems",
      "webflow-supabase-claude-stack",
    ],
    pillarPageSlug: "what-is-creative-engineering",
    createdAt: "2026-03-12T08:00:00Z",
    updatedAt: "2026-03-12T08:00:00Z",
  },

  /* ────────────────────────────────────────────────────────────
   * 5 — The Case for White-Label Webflow Development
   * ──────────────────────────────────────────────────────────── */
  {
    id: "f-005",
    slug: "white-label-webflow-development",
    title: "The Case for White-Label Webflow Development",
    excerpt:
      "You do not need to hire Webflow developers to offer Webflow services. White-label partnerships let agencies expand their capabilities without expanding their headcount. Here is how it works and why it is more profitable than you think.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "The Agency Capacity Problem",
        level: 2,
        id: "agency-capacity-problem",
      },
      {
        type: "paragraph",
        content:
          "Every growing agency hits the same wall: demand exceeds capacity, but hiring is slow, expensive, and risky. You win a project that requires Webflow expertise, but your team builds in WordPress. You could turn it down, refer it out, or scramble to hire a freelancer from Upwork and hope they deliver quality work on time. None of these options are great. White-label Webflow development is the fourth option — and for most agencies, it is the best one.",
      },
      {
        type: "heading",
        content: "What White-Label Webflow Development Actually Means",
        level: 2,
        id: "what-white-label-means",
      },
      {
        type: "paragraph",
        content:
          "White-label means we build the Webflow site under your brand. Your client never knows we exist. You handle the relationship, the strategy, the design direction. We handle the technical execution — design system architecture, Webflow development, CMS configuration, responsive optimization, QA, and launch. You deliver a finished product that looks like your team built it, because functionally, we are your team.",
      },
      {
        type: "list",
        items: [
          "You own the client relationship and project management",
          "We build in your Webflow workspace, under your account",
          "All communication happens through your team — we never contact the client directly",
          "Deliverables are branded as yours",
          "We sign NDAs and work within whatever confidentiality framework you require",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "The Financial Case",
        level: 2,
        id: "financial-case",
      },
      {
        type: "paragraph",
        content:
          "Let us run the numbers. A mid-level Webflow developer costs $80,000-$120,000 per year in salary, plus benefits, equipment, management overhead, and the risk that they leave in six months. That developer can realistically handle 15-20 projects per year. A white-label partnership costs you a fixed per-project fee — typically $3,000-$8,000 depending on scope — with no overhead, no benefits, no management burden, and no risk if the relationship does not work out.",
      },
      {
        type: "table",
        headers: ["Cost Factor", "Full-Time Hire", "White-Label Partner"],
        rows: [
          ["Annual cost (20 projects)", "$100,000-$140,000", "$60,000-$160,000"],
          ["Ramp-up time", "2-4 weeks", "Immediate"],
          ["Management overhead", "Significant", "Minimal"],
          ["Risk if demand drops", "Sunk cost", "Zero — pay per project"],
          ["Quality consistency", "Depends on individual", "Process-driven, repeatable"],
        ],
      },
      {
        type: "heading",
        content: "When White-Label Makes Sense (and When It Does Not)",
        level: 2,
        id: "when-it-makes-sense",
      },
      {
        type: "paragraph",
        content:
          "White-label is ideal when you have strong client relationships and design capabilities but lack Webflow-specific development expertise, when you need to scale capacity quickly without hiring, or when you want to test Webflow as a service offering before committing to full-time hires. It is less ideal if you need a developer sitting in your office for daily standups, if the project requires deep integration with proprietary backend systems your partner cannot access, or if your margins are too thin to support the per-project cost.",
      },
      {
        type: "heading",
        content: "How to Evaluate a White-Label Partner",
        level: 3,
        id: "evaluate-partner",
      },
      {
        type: "list",
        items: [
          "Ask to see their design system methodology — if they do not have one, expect inconsistent quality",
          "Request a case study from a previous white-label engagement, not just their own portfolio",
          "Test their communication responsiveness with a small project before committing to a large one",
          "Verify they build with clean class structures, not inline styles or one-off classes",
          "Confirm they handle responsive design across all breakpoints, not just desktop and mobile",
        ],
        ordered: true,
      },
      {
        type: "callout",
        content:
          "At LIVV, we currently partner with six agencies on a white-label basis. Our average project turnaround is five business days, and our revision rate is under 15%.",
        variant: "info",
      },
      {
        type: "faq",
        items: [
          {
            question: "Will my client know you are involved?",
            answer:
              "No. We work entirely under your brand. We build in your Webflow workspace, all communication goes through your team, and we sign NDAs to protect confidentiality. Your client will never know a partner was involved.",
          },
          {
            question: "What if I need revisions after launch?",
            answer:
              "We include one round of revisions in every project scope. Additional revisions or ongoing maintenance can be arranged on a retainer basis. Because we build with clean design systems, revisions are typically fast and low-cost.",
          },
        ],
      },
      {
        type: "cta",
        text: "Interested in a white-label partnership? Let's discuss how it would work for your agency.",
        link: "/contact",
        buttonText: "Explore a partnership",
      },
    ],
    coverImage,
    author,
    category,
    tags: [
      "white-label",
      "webflow",
      "agency partnerships",
      "outsourcing",
      "creative engineering",
    ],
    readingTimeMinutes: 7,
    published: true,
    featured: false,
    displayOrder: 5,
    seoTitle:
      "White-Label Webflow Development: A Smarter Way to Scale Your Agency",
    seoDescription:
      "Learn how white-label Webflow development lets agencies expand their capabilities without hiring. Includes cost comparisons, partnership evaluation criteria, and how the model works.",
    faqSchema: [
      {
        question: "Will my client know a white-label partner is involved?",
        answer:
          "No. White-label partners work entirely under your brand, building in your Webflow workspace with all communication routed through your team. NDAs protect confidentiality.",
      },
      {
        question: "How much does white-label Webflow development cost?",
        answer:
          "Typical per-project fees range from $3,000 to $8,000 depending on scope, with no overhead, benefits, or management burden. This is often more cost-effective than a full-time hire for agencies handling fewer than 20 Webflow projects per year.",
      },
      {
        question: "What is the typical turnaround time?",
        answer:
          "Most white-label Webflow projects are delivered in five business days from the time a signed-off design and content are provided.",
      },
      {
        question: "What if I need ongoing maintenance after launch?",
        answer:
          "One round of revisions is typically included in the project scope. Ongoing maintenance and updates can be arranged on a retainer basis.",
      },
    ],
    internalLinks: [
      {
        slug: "what-is-creative-engineering",
        text: "What is creative engineering?",
      },
      {
        slug: "figma-to-webflow-5-days",
        text: "Our five-day build process",
      },
      {
        slug: "webflow-design-systems",
        text: "How we structure Webflow design systems",
      },
    ],
    cta,
    relatedPostSlugs: [
      "what-is-creative-engineering",
      "figma-to-webflow-5-days",
      "webflow-design-systems",
    ],
    pillarPageSlug: "what-is-creative-engineering",
    createdAt: "2026-03-15T08:00:00Z",
    updatedAt: "2026-03-15T08:00:00Z",
  },
]
