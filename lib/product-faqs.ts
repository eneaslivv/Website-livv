/**
 * Per-product FAQ content.
 *
 * Shared by the product layout (emits FAQPage JSON-LD) and the product page
 * (renders the same questions visibly). Both must stay in sync — schema that
 * does not match visible content is a structured-data violation and gets
 * discounted by search engines and AI answer engines alike.
 *
 * Answers may only state facts already published on this site: white-label
 * licensing, the listed prices, the 48-hour deployment claim, and what each
 * product does. No invented metrics, clients or case-study results.
 */

export interface ProductFaq {
  q: string
  a: string
}

export const productFaqs: Record<string, ProductFaq[]> = {
  payper: [
    {
      q: "What is Payper?",
      a: "Payper is a white-label operating system for bars, venues and events built by LIVV Creative Studio. It covers QR ordering, kitchen displays, waiter tools, payments and inventory in one platform, and is licensed to agencies and operators who deploy it under their own brand and domain.",
    },
    {
      q: "How much does Payper cost?",
      a: "Payper is licensed from USD 49 per month plus a one-time USD 499 setup. The licence includes custom branding, unlimited locations, priority support and the option of a full source licence.",
    },
    {
      q: "Can I resell Payper under my own brand?",
      a: "Yes. Payper is white-label by design: your logo, your colours, your domain. Agencies and operators licence the platform, sell it to their own clients and own the client relationship, while LIVV Creative Studio maintains the underlying product.",
    },
    {
      q: "How long does it take to launch Payper?",
      a: "A branded deployment goes live in under 48 hours. Setup covers connecting your domain, applying your branding and importing your menu, after which you can print QR codes and start taking orders.",
    },
    {
      q: "Who is Payper for?",
      a: "Bars, restaurants, nightlife venues and event operators that need ordering, payments and stock control in one system — and the agencies or software resellers that serve them.",
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
      a: "LegalFlow is a white-label case and document management system for law firms, built by LIVV Creative Studio. It centralises clients, cases, deadlines, document automation and a secure client portal in one branded platform.",
    },
    {
      q: "How much does LegalFlow cost?",
      a: "LegalFlow is licensed from USD 59 per month plus a one-time USD 999 setup, which includes end-to-end case workflows, advanced security features, onboarding support and custom domain setup.",
    },
    {
      q: "Is LegalFlow secure enough for legal documents?",
      a: "LegalFlow stores documents in an encrypted vault rather than a generic cloud drive, with a secure client portal for messaging and file sharing, so case material stays inside a system designed for legal work.",
    },
    {
      q: "Can a law firm run LegalFlow under its own brand?",
      a: "Yes. LegalFlow is white-label, so the firm's identity and domain are what clients see. Setup includes branding and custom domain configuration.",
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
