/**
 * Per-product FAQ content.
 *
 * Shared by the product layout (emits FAQPage JSON-LD) and the product page
 * (renders the same questions visibly). Both must stay in sync — schema that
 * does not match visible content is a structured-data violation and gets
 * discounted by search engines and AI answer engines alike.
 *
 * Answers may only state what each product does today and the prices listed
 * on its landing (lib/product-landings.ts). No invented metrics, clients or
 * case-study results.
 */

export interface ProductFaq {
  q: string
  a: string
}

export const productFaqs: Record<string, ProductFaq[]> = {
  payper: [
    {
      q: "What is Payper?",
      a: "Payper is the operating system for bars, restaurants, venues and events, built and run by LIVV Creative Studio. It covers QR ordering and payment, cashless top-ups, ticketing and access, stock and the owner's dashboard in one platform.",
    },
    {
      q: "How much does Payper cost?",
      a: "There is no fixed fee to get started: Payper charges a percentage of the cashless transactions it processes. Demos and onboarding run through payperapp.io.",
    },
    {
      q: "Do guests need to install an app?",
      a: "No. Guests scan a QR code and the menu opens in their phone's browser, with no app to install and no login.",
    },
    {
      q: "Can the menu carry my venue's brand?",
      a: "Yes. Each venue sets its own theme for the menu its guests see.",
    },
    {
      q: "Who is Payper for?",
      a: "Bars, restaurants, nightlife venues and event producers that want ordering, payments, access and stock in one system instead of several.",
    },
  ],

  prtool: [
    {
      q: "What is PRTool?",
      a: "PRTool is a white-label platform for managing collaborations between brands and creators, built by LIVV Creative Studio. It covers campaign briefing, tracking, payouts and performance analytics, and is licensed to PR agencies and talent managers who run it under their own brand.",
    },
    {
      q: "How much does PRTool cost?",
      a: "PRTool is licensed from USD 29 per month plus a one-time USD 999 setup, which includes custom branding and domain configuration.",
    },
    {
      q: "Who is PRTool built for?",
      a: "PR agencies, talent managers and brand partnership teams that run creator campaigns end to end and want one branded platform instead of spreadsheets, chat threads and separate payment tools.",
    },
    {
      q: "Can PRTool be deployed under my agency's brand?",
      a: "Yes. PRTool is white-label: it runs on your domain with your identity, so clients and creators only ever see your agency.",
    },
  ],

  legalflow: [
    {
      q: "What is LegalFlow?",
      a: "LegalFlow is practice management software for law firms, built by LIVV Creative Studio. It brings contract drafting with an AI assistant, documents, clients, tasks, the calendar and the team into one workspace.",
    },
    {
      q: "How does the contract assistant work?",
      a: "You choose the client and the type of contract, add the context, and the assistant previews and writes a draft you edit in place. From there you can ask it to refine the text with a plain instruction.",
    },
    {
      q: "Is there a portal for the firm's clients?",
      a: "No. LegalFlow is built for the firm's internal work: lawyers, paralegals and assistants use it; clients do not log in.",
    },
    {
      q: "What language is LegalFlow in?",
      a: "The interface is in Spanish today.",
    },
    {
      q: "How much does LegalFlow cost?",
      a: "LegalFlow is licensed from USD 59 per month plus a one-time USD 999 setup.",
    },
  ],

  "cms-livv": [
    {
      q: "What is CMS LIVV?",
      a: "CMS LIVV is a headless content management system built by LIVV Creative Studio. The studio builds the site and connects it to the CMS; your team edits pages, collections and images from a dashboard, and the site reads the published content.",
    },
    {
      q: "Does my site have to be hosted by LIVV?",
      a: "No. A site hosted anywhere reads its content through the public read API or the React SDK. CMS LIVV also includes its own renderer for sites LIVV hosts.",
    },
    {
      q: "Who can edit?",
      a: "A workspace has four roles: owner, admin, editor and viewer. People join by email invitation.",
    },
    {
      q: "Does a change go live as soon as I save it?",
      a: "Pages and collection items are either draft or published, and only published content is served. For a site hosted on Vercel or Netlify, a deploy hook rebuilds it from the dashboard.",
    },
    {
      q: "How much does CMS LIVV cost?",
      a: "It is quoted together with the site it runs, because the setup depends on what your team needs to edit.",
    },
  ],

  registrar: [
    {
      q: "What is Registrar?",
      a: "Registrar is a voice-first income and expense tracker built by LIVV Creative Studio. You speak a movement and Registrar transcribes it, assigns a category and files it, keeping the books current without manual data entry. It is licensed white-label.",
    },
    {
      q: "How does voice expense tracking work in Registrar?",
      a: "You say what you spent or earned in plain language. Registrar transcribes the entry, classifies it into a category and stores it with the amount and date, so the ledger updates as you speak instead of at month end.",
    },
    {
      q: "How much does Registrar cost?",
      a: "Registrar is licensed from USD 39 per month plus a one-time USD 999 setup, which includes voice capture in Spanish and English, custom branding, unlimited entries and data export.",
    },
    {
      q: "Does Registrar work in Spanish?",
      a: "Yes. Voice capture works in both Spanish and English, which makes it usable for teams and clients across Latin America as well as English-speaking markets.",
    },
    {
      q: "Who is Registrar for?",
      a: "Freelancers, small businesses and accountants who lose time to manual bookkeeping — and the agencies that want to offer a branded finance app to their own client base.",
    },
  ],

  "pm-agent": [
    {
      q: "What is PM Agent?",
      a: "PM Agent is an AI project manager built by LIVV Creative Studio. It reads a written goal, breaks it into tasks with owners and deadlines, and follows up automatically until each task closes. It is licensed white-label so agencies can run it under their own brand.",
    },
    {
      q: "What does an AI project management agent actually do?",
      a: "PM Agent decomposes an objective into assignable tasks, routes each one to an owner with a due date, chases open items without anyone writing the reminder, and produces a written digest of what moved and what stalled.",
    },
    {
      q: "How much does PM Agent cost?",
      a: "PM Agent is licensed from USD 19 per month plus a one-time USD 999 setup, which includes AI task planning and assignment, automated follow-ups, custom branding and workflow integration support.",
    },
    {
      q: "How is PM Agent different from a normal project management tool?",
      a: "A conventional tool stores the plan that someone else wrote. PM Agent writes the plan from the goal, assigns it, and does the chasing — so project management stops depending on a person remembering to update the board.",
    },
    {
      q: "Can PM Agent work alongside the tools we already use?",
      a: "Yes. PM Agent is built to run alongside an existing workflow rather than replace it, and setup includes workflow integration support.",
    },
  ],
}

export function getProductFaqs(slug: string): ProductFaq[] {
  return productFaqs[slug] ?? []
}
