/* ── Blog system types ── */

export interface BlogAuthor {
  name: string
  role: string
  avatar: string
}

export interface BlogCategory {
  slug: string
  name: string
  description: string
  clusterId: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface InternalLink {
  slug: string
  text: string
}

export interface BlogCTA {
  type: "contact" | "services" | "custom"
  link: string
  text: string
}

export type BlogContentBlock =
  | { type: "heading"; content: string; level: 2 | 3; id: string }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "quote"; content: string; attribution?: string }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "callout"; content: string; variant: "tip" | "warning" | "info" }
  | { type: "code"; content: string; language?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "faq"; items: FaqItem[] }
  | { type: "cta"; text: string; link: string; buttonText: string }

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  contentBlocks: BlogContentBlock[]
  coverImage: string
  ogImage?: string
  author: BlogAuthor
  category: BlogCategory
  tags: string[]
  readingTimeMinutes: number
  published: boolean
  featured: boolean
  displayOrder: number
  seoTitle: string
  seoDescription: string
  canonicalUrl?: string
  faqSchema: FaqItem[]
  internalLinks: InternalLink[]
  cta: BlogCTA
  relatedPostSlugs: string[]
  pillarPageSlug?: string
  createdAt: string
  updatedAt: string
}
