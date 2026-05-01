import type { MetadataRoute } from "next"

/**
 * robots.txt
 * - Default: allow all standard search engines (Google, Bing, etc.).
 * - Explicitly grant access to AI / generative-search crawlers so Livv
 *   Studio is eligible to be cited and recommended in ChatGPT Search,
 *   Perplexity, Gemini, Claude, and SearchGPT results.
 *
 * AI crawler reference list (kept up to date via vendor docs):
 *   GPTBot           — OpenAI training crawler
 *   OAI-SearchBot    — OpenAI live search crawler (ChatGPT Search)
 *   ChatGPT-User     — ChatGPT user-initiated retrieval
 *   ClaudeBot        — Anthropic crawler
 *   Claude-Web       — Anthropic on-demand fetch
 *   anthropic-ai     — Anthropic legacy
 *   PerplexityBot    — Perplexity search
 *   Perplexity-User  — Perplexity user-initiated fetch
 *   Google-Extended  — Gemini training opt-in
 *   Applebot-Extended — Apple Intelligence training opt-in
 *   CCBot            — Common Crawl (training data for many LLMs)
 *   Bytespider       — ByteDance / TikTok / Doubao
 *   FacebookBot / Meta-ExternalAgent — Meta AI
 *   YouBot           — You.com search/AI
 *   DuckAssistBot    — DuckDuckGo AI
 *   Amazonbot        — Amazon (Alexa+ / Rufus)
 *   Diffbot          — knowledge graph used by some agents
 *   Cohere-AI / cohere-ai — Cohere
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "FacebookBot",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "YouBot",
    "DuckAssistBot",
    "Amazonbot",
    "Diffbot",
    "Cohere-AI",
    "cohere-ai",
    "Mistralai-User",
  ]

  const privatePaths = ["/admin/", "/api/", "/portal/", "/presentation/"]

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: privatePaths,
      })),
    ],
    sitemap: "https://livvvv.com/sitemap.xml",
    host: "https://livvvv.com",
  }
}
