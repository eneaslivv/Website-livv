import { BlogCategory } from "@/types/blog"

export const blogCategories: BlogCategory[] = [
  {
    slug: "webflow-seo",
    name: "Webflow SEO",
    description: "Master search engine optimization for Webflow sites with technical guides, checklists, and real-world case studies.",
    clusterId: "A",
  },
  {
    slug: "platform-comparisons",
    name: "Platform Comparisons",
    description: "Honest, builder-perspective comparisons between Webflow, Framer, WordPress, Squarespace, and custom code.",
    clusterId: "B",
  },
  {
    slug: "framer-seo",
    name: "Framer SEO & Development",
    description: "SEO optimization and development best practices for Framer sites.",
    clusterId: "C",
  },
  {
    slug: "hiring-agencies",
    name: "Hiring & Agencies",
    description: "Guides for hiring web developers, agencies, and freelancers — including pricing, red flags, and what to expect.",
    clusterId: "D",
  },
  {
    slug: "technical-integration",
    name: "Technical Integration",
    description: "Advanced technical guides on integrating Webflow with Supabase, AI, APIs, and automation tools.",
    clusterId: "E",
  },
  {
    slug: "creative-engineering",
    name: "Creative Engineering",
    description: "Exploring creative engineering as a discipline — design systems, tech stacks, and the future of building for the web.",
    clusterId: "F",
  },
  {
    slug: "industry-guides",
    name: "Industry Guides",
    description: "Industry-specific Webflow and web development guides for SaaS, restaurants, e-commerce, and franchise businesses.",
    clusterId: "G",
  },
]

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug)
}
