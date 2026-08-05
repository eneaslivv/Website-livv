import type { ScreenVariant } from "@/lib/portfolio-data"

/**
 * Below-the-fold content for /services/[slug].
 * The hero stays driven by the existing service data (and the Supabase override);
 * everything after it is authored here so the five routes share one layout.
 *
 * Proof entries may only reference projects and products that already exist in
 * this repo — no invented clients, metrics or testimonials.
 */

export interface ServiceTransformation {
  challengeLabel: string
  challenge: string
  outcomeLabel: string
  outcome: string
  outcomePoints: string[]
}

export interface ServiceCapability {
  title: string
  body: string
  deliverables: string[]
}

export interface ServiceProcessStep {
  title: string
  body: string
}

export interface ServiceProof {
  name: string
  category: string
  challenge: string
  contribution: string
  href: string
  /** Existing asset in /public. Omit when none exists and use `screen` instead. */
  image?: string
  /** Rendered product-UI mock, for products with no photographable screenshot */
  screen?: ScreenVariant
  accent: string
  /** Small technical annotations placed around the visual */
  annotations: string[]
}

export interface ServiceFinalCta {
  label: string
  headline: string
  headlineAccent?: string
  body: string
  action: string
  secondary?: { text: string; href: string }
}

export interface ServicePageContent {
  transformation: ServiceTransformation
  capabilitiesLabel: string
  capabilities: [ServiceCapability, ServiceCapability, ServiceCapability]
  processLabel: string
  process: [ServiceProcessStep, ServiceProcessStep, ServiceProcessStep]
  proof: ServiceProof
  cta: ServiceFinalCta
}

export const servicePages: Record<string, ServicePageContent> = {
  "custom-software-development": {
    transformation: {
      challengeLabel: "The challenge",
      challenge:
        "Operations run across a stack of tools that were never meant to talk to each other. Requirements live in threads and spreadsheets, engineering starts before the product is defined, and every new process needs another workaround. The software fits the vendor, not the business.",
      outcomeLabel: "The outcome",
      outcome: "Production software built around how your business actually operates.",
      outcomePoints: ["Scope defined before a line of code", "Complete product logic, not screens", "A system documented and ready to scale"],
    },
    capabilitiesLabel: "What we do",
    capabilities: [
      {
        title: "Product and technical definition",
        body: "We map the operation, name the constraints and decide what ships first. The scope, data model and architecture are agreed before development starts.",
        deliverables: ["Scope and product logic", "Data model and architecture"],
      },
      {
        title: "Design and full-stack development",
        body: "The same senior team designs the interfaces and writes the code. Next.js, React Native, Flutter and Supabase, TypeScript across the stack, no handoff in the middle.",
        deliverables: ["Interface and design system", "Full-stack implementation"],
      },
      {
        title: "Deployment, documentation and evolution",
        body: "We ship to production, hand over documentation your team can work from, and stay available for the iterations that follow the first release.",
        deliverables: ["Production deployment", "Technical documentation"],
      },
    ],
    processLabel: "How we work",
    process: [
      { title: "Scope", body: "Understand the operation, the users and the one outcome that matters first." },
      { title: "Build", body: "Design and develop in the same team, shipping reviewable increments." },
      { title: "Ship", body: "Deploy to production, document the system and hand over ownership." },
    ],
    proof: {
      name: "Internal Management Systems",
      category: "Internal tools · Development",
      challenge: "Operational work spread across disconnected tools with no single source of truth.",
      contribution: "We designed and built custom operational software that centralizes the workflows a business runs on every day.",
      href: "/projects/internal-management",
      image: "/images/internal-dashboard.png",
      accent: "#2C0405",
      annotations: ["ROLE: ADMIN", "FLOW 03"],
    },
    cta: {
      label: "Custom software development",
      headline: "Stop adapting your operation to someone else's software.",
      headlineAccent: "Build the one your business actually needs.",
      body: "Bring us the process that costs your team the most time. We will scope what it takes to replace it.",
      action: "Start scoping your software",
      secondary: { text: "Need AI inside it? See AI Integration", href: "/services/ai-integration" },
    },
  },

  "ai-integration": {
    transformation: {
      challengeLabel: "The challenge",
      challenge:
        "AI arrives as a demo. A chat window is added, the team gets excited, and months later nothing has shipped because the integration was never specified at the workflow level. The model was chosen before the job was defined.",
      outcomeLabel: "The outcome",
      outcome: "One specific workflow doing measurable operational work in production.",
      outcomePoints: ["A named job, not a generic assistant", "Integration inside the existing product", "Evaluation and observability from day one"],
    },
    capabilitiesLabel: "What we do",
    capabilities: [
      {
        title: "Workflow and use-case definition",
        body: "We start from the operational job you want done, not from the model. What gets automated, what stays human, and how you will know it worked.",
        deliverables: ["Use-case specification", "Success criteria"],
      },
      {
        title: "AI architecture and product integration",
        body: "Claude or OpenAI APIs, retrieval over your own data, and the surrounding architecture: caching, fallback paths, prompt versioning. The AI stays invisible inside the product.",
        deliverables: ["RAG and agent architecture", "In-product integration"],
      },
      {
        title: "Evaluation, observability and delivery",
        body: "Evaluation harnesses and prompt observability so quality is measured rather than assumed, then shipped to production behind the same release process as the rest of the product.",
        deliverables: ["Evaluation harness", "Production deployment"],
      },
    ],
    processLabel: "How we work",
    process: [
      { title: "Identify the job", body: "Define the operational task, its inputs and what a correct output looks like." },
      { title: "Integrate the intelligence", body: "Build the retrieval, agent and product surfaces around that task." },
      { title: "Evaluate and deploy", body: "Measure output quality, instrument it, then ship it to production." },
    ],
    proof: {
      name: "PM Agent",
      category: "AI agent · Project management",
      challenge: "Project work stalls between status updates: tasks unassigned, deadlines undefined, follow-ups forgotten.",
      contribution: "We built an AI project manager that breaks work into tasks, assigns owners, sets deadlines and follows up automatically.",
      href: "/products/pm-agent",
      screen: "board",
      accent: "#2C0405",
      annotations: ["AGENT: ACTIVE", "STATE: FOLLOW-UP"],
    },
    cta: {
      label: "AI integration",
      headline: "Bring us the operational job.",
      headlineAccent: "We will design the AI around it.",
      body: "Not a chat window. One workflow, integrated into your product, measured in production.",
      action: "Start scoping your AI workflow",
      secondary: { text: "Need the product built too? See Custom Software", href: "/services/custom-software-development" },
    },
  },

  "creative-engineering": {
    transformation: {
      challengeLabel: "The challenge",
      challenge:
        "The idea is ambitious and the reference deck is full of things nobody can quote a timeline for. Design hands over something engineering cannot build, or engineering builds something that lost the idea on the way. The experience ends up either expressive or reliable, rarely both.",
      outcomeLabel: "The outcome",
      outcome: "An expressive digital experience that holds up in production.",
      outcomePoints: ["A concept validated before it is built", "Interaction proven in a real prototype", "Production-grade implementation"],
    },
    capabilitiesLabel: "What we do",
    capabilities: [
      {
        title: "Digital concept and interaction direction",
        body: "We decide what the experience should do before deciding how it looks: the idea, the interaction model and the constraints it has to live inside.",
        deliverables: ["Concept direction", "Interaction model"],
      },
      {
        title: "Rapid prototyping and motion behavior",
        body: "We build the risky part first, in code, so timing, physics and feel are judged on a real device instead of in a mockup.",
        deliverables: ["Working prototype", "Motion behaviour spec"],
      },
      {
        title: "Production-grade implementation",
        body: "The prototype becomes shippable software: performant, responsive, accessible, and maintainable by the team that inherits it.",
        deliverables: ["Production implementation", "Performance budget"],
      },
    ],
    processLabel: "How we work",
    process: [
      { title: "Explore", body: "Define the idea and the interaction model, and agree what makes it distinctive." },
      { title: "Prototype", body: "Build the hardest interaction first and validate it in the browser." },
      { title: "Engineer", body: "Take the prototype to production without losing the feel it earned." },
    ],
    proof: {
      name: "Azqira",
      category: "Digital experience",
      challenge: "A brand experience that had to feel distinctive without compromising how it performed on real devices.",
      contribution: "We took the concept from interaction direction through to a built, production-ready digital experience.",
      href: "/projects/azqira",
      image: "/images/project-mobile.png",
      accent: "#2C0405",
      annotations: ["PROTOTYPE 02", "STATE: SHIPPED"],
    },
    cta: {
      label: "Creative engineering",
      headline: "Distinctive is not the hard part.",
      headlineAccent: "Distinctive and reliable is.",
      body: "Bring the idea nobody has been able to scope. We will prototype the risky part first.",
      action: "Start scoping your experience",
      secondary: { text: "Need motion direction? See Motion & Narrative", href: "/services/motion-narrative" },
    },
  },

  "product-strategy-ui": {
    transformation: {
      challengeLabel: "The challenge",
      challenge:
        "Requirements arrive from every direction and each one becomes another screen. Flows contradict each other, the same object is called three different things, and engineering estimates keep moving because the product was never actually decided.",
      outcomeLabel: "The outcome",
      outcome: "A product system your users understand and your engineers can build.",
      outcomePoints: ["Clear scope and priorities", "Complete flows, not loose screens", "A UI system that scales"],
    },
    capabilitiesLabel: "What we do",
    capabilities: [
      {
        title: "Product definition and priorities",
        body: "We turn the request list into decisions: what the product is for, who it serves, what ships first and what deliberately waits.",
        deliverables: ["Product definition", "Prioritised scope"],
      },
      {
        title: "Experience architecture and flows",
        body: "Information architecture, navigation and end-to-end flows, including the empty, error and edge states that usually get discovered during development.",
        deliverables: ["Information architecture", "End-to-end flows"],
      },
      {
        title: "Scalable UI system and prototype",
        body: "A component-level design system with the tokens, states and rules engineering needs, plus a clickable prototype to validate it before build.",
        deliverables: ["UI design system", "Validation prototype"],
      },
    ],
    processLabel: "How we work",
    process: [
      { title: "Define", body: "Agree what the product is for and which outcome comes first." },
      { title: "Structure", body: "Design the architecture and the complete flows behind it." },
      { title: "Design", body: "Build the UI system and validate it in a working prototype." },
    ],
    proof: {
      name: "Paper",
      category: "SaaS product · Product strategy, UI/UX",
      challenge: "Venue and nightlife operations needed one product covering orders, service and control instead of separate tools.",
      contribution: "We defined the product structure and designed the flows and interface system behind the platform.",
      href: "/projects/paper",
      image: "/images/portfolio-2.jpg",
      accent: "#2C0405",
      annotations: ["FLOW 01", "STATE: VALIDATED"],
    },
    cta: {
      label: "Product strategy & UI",
      headline: "Your product does not need more screens.",
      headlineAccent: "It needs clearer decisions.",
      body: "Turn scattered requirements into a product your users understand and your engineering team can build.",
      action: "Start scoping your product",
      secondary: { text: "Ready to build it? See Custom Software", href: "/services/custom-software-development" },
    },
  },

  "motion-narrative": {
    transformation: {
      challengeLabel: "The challenge",
      challenge:
        "The product is good and the explanation is not. Every demo starts from a different place, the deck needs a narrator, and the interface moves without telling anyone what just happened. What the team understands in a meeting does not survive contact with an audience.",
      outcomeLabel: "The outcome",
      outcome: "A visual story that lands the first time it is seen.",
      outcomePoints: ["One narrative structure, reused everywhere", "Motion with a job, not decoration", "A system the team can extend"],
    },
    capabilitiesLabel: "What we do",
    capabilities: [
      {
        title: "Narrative and communication structure",
        body: "We decide what the story has to prove, in what order, and what gets left out. The structure comes before any frame is designed.",
        deliverables: ["Narrative structure", "Script and messaging"],
      },
      {
        title: "Storyboards and motion direction",
        body: "Storyboards, pacing and motion direction, so timing and emphasis are agreed before production time is spent on them.",
        deliverables: ["Storyboards", "Motion direction"],
      },
      {
        title: "Animation systems and production",
        body: "Final production plus the reusable pieces behind it: interface animation rules, easing and timing your team can apply to the next release.",
        deliverables: ["Final animation", "Reusable motion system"],
      },
    ],
    processLabel: "How we work",
    process: [
      { title: "Clarify", body: "Define the message, the audience and what the story has to prove." },
      { title: "Storyboard", body: "Design the sequence, the pacing and the emphasis before production." },
      { title: "Animate", body: "Produce the final piece and the motion rules that outlive it." },
    ],
    proof: {
      name: "Sacoa Cashless",
      category: "Design & animations",
      challenge: "A cashless platform whose value was hard to explain in a static format.",
      contribution: "We handled the design and animation work that turns the platform into something people can follow at a glance.",
      href: "/projects/sacoa",
      image: "/images/sacoa-cashless.png",
      accent: "#2C0405",
      annotations: ["SEQUENCE 02", "STATE: FINAL"],
    },
    cta: {
      label: "Motion & narrative",
      headline: "Make your product easier to understand.",
      headlineAccent: "And harder to forget.",
      body: "Bring us the thing your team keeps having to explain twice. We will design the story that explains it once.",
      action: "Start scoping your story",
      secondary: { text: "Need the interface too? See Product Strategy & UI", href: "/services/product-strategy-ui" },
    },
  },
}

export function getServicePageContent(slug: string): ServicePageContent | null {
  return servicePages[slug] ?? null
}
