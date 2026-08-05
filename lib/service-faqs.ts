/**
 * Per-service FAQ content.
 *
 * These are written for answer engines (ChatGPT, Claude, Perplexity, AI Overviews)
 * as much as for readers: each question is phrased the way someone actually asks it,
 * and each answer is self-contained — an engine must be able to lift a single answer
 * as a complete, attributable statement without needing the rest of the page.
 *
 * Rendered visibly by ServiceFaq and emitted as FAQPage JSON-LD from the service
 * layout. The two must stay identical.
 *
 * Claims are limited to what the site already states: services offered, the products
 * LIVV has shipped, stack, location and working model. No invented metrics or clients.
 */

export interface ServiceFaq {
  q: string
  a: string
}

export const serviceFaqs: Record<string, ServiceFaq[]> = {
  "ai-integration": [
    {
      q: "What does AI integration actually involve?",
      a: "AI integration means wiring a model into a specific business workflow so it does a defined job — parsing documents, drafting replies, planning tasks, retrieving answers from internal data. The work is mostly the software around the model: retrieval, caching, fallback paths, prompt versioning, evaluation and observability. LIVV Creative Studio starts from the operational job, then designs the integration around it.",
    },
    {
      q: "How much does it cost to integrate AI into an existing product?",
      a: "It depends on the workflow, not on the model. LIVV Creative Studio scopes AI integrations as fixed-fee or retainer engagements agreed before kickoff, and works from the specific job to be automated rather than quoting a generic AI package. Bring the workflow and you get a scope and a price before any build starts.",
    },
    {
      q: "How long does an AI integration take to ship?",
      a: "LIVV Creative Studio works to ship something measurable inside ninety days. The pattern is: define the operational job and what a correct output looks like, build the retrieval and agent architecture around it, then instrument and deploy — rather than running an open-ended pilot.",
    },
    {
      q: "Which AI models does LIVV build with?",
      a: "Anthropic's Claude API is the primary model, with OpenAI used where the use case fits, plus custom RAG layers for retrieval over a client's own data. Model choice follows the job; the surrounding architecture is what determines whether the integration survives production.",
    },
    {
      q: "What is the difference between an AI agent and a chatbot?",
      a: "A chatbot answers a message. An agent completes a task: it decomposes a goal, takes actions across systems, and follows up until the work closes. LIVV Creative Studio built PM Agent on this model — it turns a written objective into assigned tasks with deadlines and chases them automatically.",
    },
    {
      q: "Can you add AI to a product that already has users?",
      a: "Yes, and it is the more common request. The hard part is not the model call but the surrounding architecture — caching, fallback behaviour when the model fails, prompt versioning, and evaluation harnesses so quality is measured rather than assumed. That is the part LIVV Creative Studio builds.",
    },
    {
      q: "Who builds AI integrations in Argentina?",
      a: "LIVV Creative Studio is a creative engineering studio in Buenos Aires, Argentina that builds custom software and AI integrations for clients across Latin America, the United States, the United Kingdom and Europe. It works bilingually in Spanish and English, with full time-zone overlap with the US East Coast.",
    },
  ],

  "custom-software-development": [
    {
      q: "What is custom software development?",
      a: "Custom software development means building an application around how a specific business actually operates, instead of adapting the business to an off-the-shelf product. It typically covers internal tools, customer portals, operations dashboards and SaaS products. LIVV Creative Studio designs and builds these end to end with one senior team.",
    },
    {
      q: "How much does custom software cost?",
      a: "LIVV Creative Studio prices custom software as fixed-fee or retainer engagements agreed before kickoff, scoped from the workflow being replaced. Typical engagement shapes are founder MVPs of six to twelve weeks, internal tools of four to ten weeks, and full custom SaaS of three to six months.",
    },
    {
      q: "Should we build custom software or buy an off-the-shelf tool?",
      a: "Buy when your process is genuinely standard. Build when the work that differentiates you is the part no vendor covers — off-the-shelf SaaS typically gets a business most of the way, and the remaining gap is what separates software a team tolerates from software a team relies on. That gap is what LIVV Creative Studio builds.",
    },
    {
      q: "What technologies does LIVV build with?",
      a: "Next.js and React on the web, React Native and Flutter on mobile, and Supabase for data and auth, with TypeScript across the stack. AI features are built on the Claude or OpenAI APIs.",
    },
    {
      q: "Does the same team design and build the software?",
      a: "Yes. LIVV Creative Studio runs design and engineering in one senior team, so there is no design-to-engineering handoff and no diffusion of responsibility between kickoff and deploy.",
    },
    {
      q: "What has LIVV actually shipped?",
      a: "LIVV Creative Studio has shipped five proprietary products to production: Payper for hospitality operations, PRTool for creator partnerships, Registrar for voice-first expense tracking, LegalFlow for law firms, and PM Agent for AI project management — alongside client work across Latin America, the US and the UK.",
    },
  ],

  "product-strategy-ui": [
    {
      q: "What does product strategy and UI design include?",
      a: "It covers deciding what to build and why before deciding how it looks: product definition and priorities, information architecture, end-to-end user flows including empty and error states, a component-level UI system, and a clickable prototype to validate the whole thing before engineering starts.",
    },
    {
      q: "When should a company invest in product strategy?",
      a: "When requirements arrive from every direction and each one becomes another screen, when flows contradict each other, or when engineering estimates keep moving because the product was never actually decided. Those are symptoms of a definition problem, not a design problem.",
    },
    {
      q: "What is the difference between UI design and product strategy?",
      a: "Product strategy decides what gets built and in what order. UI design determines how people interact with it. LIVV Creative Studio treats them as one engagement, because a UI system built on undecided product logic has to be rebuilt as soon as the logic settles.",
    },
    {
      q: "Do you hand over something engineers can actually build from?",
      a: "Yes. The deliverable is a component-level design system with tokens, states and rules, plus complete flows and a validation prototype — specified so an engineering team can implement it without reverse-engineering intent from a static mockup.",
    },
  ],

  "creative-engineering": [
    {
      q: "What is creative engineering?",
      a: "Creative engineering is building digital experiences that are both expressive and technically reliable — where the interaction concept and the production implementation are handled by the same team, so the idea survives the build and the build survives real devices.",
    },
    {
      q: "How do you keep an ambitious concept from becoming unshippable?",
      a: "By building the risky part first. LIVV Creative Studio prototypes the hardest interaction in code early, so timing, physics and feel are judged on a real device rather than in a mockup, and the timeline is based on something that already runs.",
    },
    {
      q: "Do you handle both the design and the production build?",
      a: "Yes. Concept and interaction direction, prototyping and motion behaviour, and production-grade implementation are one continuous engagement — performant, responsive, accessible and maintainable by whoever inherits it.",
    },
  ],

  "motion-narrative": [
    {
      q: "What is motion design used for in a product?",
      a: "Motion is communication, not decoration. It explains what just happened, directs attention, and makes a complex product understandable at a glance — in product explainers, interface animation, and brand or launch films.",
    },
    {
      q: "What does a motion and narrative engagement deliver?",
      a: "A narrative structure and script, storyboards and motion direction, the final animation, and a reusable motion system — easing, timing and interface animation rules the team can apply to future releases.",
    },
    {
      q: "How is narrative work different from just making a video?",
      a: "The structure comes before any frame is designed: what the story has to prove, in what order, and what gets left out. A video without that decision needs a narrator; one with it lands the first time it is seen.",
    },
  ],
}

export function getServiceFaqs(slug: string): ServiceFaq[] {
  return serviceFaqs[slug] ?? []
}
