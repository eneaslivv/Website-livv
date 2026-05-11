/* Editorial component barrel.
 *
 * Import from "@/components/journal" anywhere a piece needs to render.
 * Components are intentionally small and composable so a /journal/[slug]
 * page can pick whichever ones the article shape calls for, without
 * pulling unused weight.
 *
 * Server-side by default. NewsletterSignup and ResourceDownload are the
 * two client components in this set because they need form state.
 * Editorial body content stays server-rendered so AI crawlers see it
 * (LIVV editorial brief section 4.3 / 5.3 hard rule).
 */
export { ArticleHero } from "./ArticleHero"
export { CaseStudyHero } from "./CaseStudyHero"
export { JournalContentBlocksRenderer } from "./ContentBlocksRenderer"
export { DecisionPoint } from "./DecisionPoint"
export { JournalFaq, buildFaqPageJsonLd } from "./FAQ"
export { KeyTakeaways } from "./KeyTakeaways"
export { PullQuote } from "./PullQuote"
export { AuthorBio } from "./AuthorBio"
export { RelatedReading } from "./RelatedReading"
export { NewsletterSignup } from "./NewsletterSignup"
export { ResourceDownload } from "./ResourceDownload"
export { StackBadge } from "./StackBadge"
