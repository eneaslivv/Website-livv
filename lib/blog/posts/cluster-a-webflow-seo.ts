import { BlogPost } from "@/types/blog"

const sharedAuthor = {
  name: "LIVV Studio",
  role: "Creative Engineering Agency",
  avatar: "/assets/logo-new.png",
}

const sharedCategory = {
  slug: "webflow-seo",
  name: "Webflow SEO",
  description:
    "Master search engine optimization for Webflow sites with technical guides, checklists, and real-world case studies.",
  clusterId: "A",
}

const sharedCta = {
  type: "contact" as const,
  link: "/contact",
  text: "Need help optimizing your Webflow site for SEO? Let's talk.",
}

export const clusterAWebflowSeo: BlogPost[] = [
  // ──────────────────────────────────────────────
  // 1. PILLAR — The Complete Webflow SEO Guide
  // ──────────────────────────────────────────────
  {
    id: "ws-001",
    slug: "webflow-seo-complete-guide",
    title: "The Complete Webflow SEO Guide for 2026",
    excerpt:
      "Everything you need to rank a Webflow site: from crawlability and Core Web Vitals to structured data, image optimization, and ongoing audits.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Webflow Is a Serious SEO Platform in 2026",
        level: 2,
        id: "why-webflow-seo",
      },
      {
        type: "paragraph",
        content:
          "Webflow ships clean, semantic HTML, automatically generates sitemaps, and lets you edit meta tags without touching code. But default settings alone will not get you to page one. This guide walks through every lever you can pull\u2014from the hosting layer to structured data\u2014to turn a Webflow project into a high-ranking asset.",
      },
      {
        type: "paragraph",
        content:
          "We have audited over 120 Webflow builds for clients ranging from seed-stage SaaS to enterprise e-commerce. The patterns that move the needle are remarkably consistent, and they are all covered here.",
      },
      {
        type: "heading",
        content: "Crawlability and Indexation Fundamentals",
        level: 2,
        id: "crawlability-indexation",
      },
      {
        type: "paragraph",
        content:
          "Google cannot rank what it cannot crawl. Webflow auto-generates a sitemap.xml at /sitemap.xml, but it includes every page\u2014even utility pages, password-protected pages, and style guides you never meant to publish. Open your sitemap, audit every URL, and use Webflow\u2019s page settings to exclude pages that should not be indexed. Set those pages to 'Exclude from sitemap' and add a noindex tag in Custom Code.",
      },
      {
        type: "list",
        items: [
          "Verify your sitemap in Google Search Console within 48 hours of launch.",
          "Exclude utility, style guide, and staging pages from the sitemap.",
          "Set a canonical URL on every page to prevent duplicate content.",
          "Use 301 redirects (not 302) for any URL changes\u2014Webflow\u2019s redirect panel supports this natively.",
          "Check robots.txt at yourdomain.com/robots.txt\u2014Webflow\u2019s default is permissive, but verify it after custom domain setup.",
        ],
        ordered: true,
      },
      {
        type: "heading",
        content: "On-Page SEO Settings in Webflow",
        level: 2,
        id: "on-page-seo",
      },
      {
        type: "paragraph",
        content:
          "Every page in Webflow exposes a settings panel with Title Tag, Meta Description, Open Graph Title, Open Graph Description, and Open Graph Image. These fields are not optional\u2014they are your first impression in SERPs and on social. Keep title tags under 60 characters. Write meta descriptions between 120 and 155 characters, front-loading the primary keyword. Set a unique OG image (1200x630 px) for every page to control how links appear on LinkedIn, X, and Slack.",
      },
      {
        type: "callout",
        content:
          "Webflow lets you set a global fallback OG image in Project Settings > SEO. Always set this, but override it on key landing pages and blog posts with a custom image.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "Core Web Vitals and Page Speed",
        level: 2,
        id: "core-web-vitals",
      },
      {
        type: "paragraph",
        content:
          "Since 2021, Core Web Vitals have been a confirmed Google ranking signal. The three metrics\u2014Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP)\u2014measure real-user experience. Webflow sites hosted on Webflow\u2019s CDN generally start with decent Time to First Byte, but LCP and CLS problems are common when designers use unoptimized hero images, heavy custom fonts, or layout-shifting animations.",
      },
      {
        type: "table",
        headers: ["Metric", "Good", "Needs Improvement", "Poor"],
        rows: [
          ["LCP", "< 2.5 s", "2.5 s \u2013 4.0 s", "> 4.0 s"],
          ["INP", "< 200 ms", "200 ms \u2013 500 ms", "> 500 ms"],
          ["CLS", "< 0.1", "0.1 \u2013 0.25", "> 0.25"],
        ],
      },
      {
        type: "paragraph",
        content:
          "For a deep-dive into each metric and exact steps to fix them in Webflow, see our dedicated Core Web Vitals guide.",
      },
      {
        type: "heading",
        content: "Structured Data and Schema Markup",
        level: 2,
        id: "structured-data",
      },
      {
        type: "paragraph",
        content:
          "Rich results\u2014FAQ dropdowns, review stars, breadcrumbs, how-to carousels\u2014are powered by structured data. Webflow does not generate schema automatically, but you can inject JSON-LD into the <head> of any page via the Custom Code panel. At minimum, every Webflow site should have Organization schema on the homepage, BreadcrumbList schema on subpages, and Article schema on blog posts. FAQ schema is a quick win for service pages.",
      },
      {
        type: "heading",
        content: "Image Optimization",
        level: 2,
        id: "image-optimization",
      },
      {
        type: "paragraph",
        content:
          "Images are the number-one culprit behind slow Webflow sites. Webflow\u2019s built-in responsive images generate srcset attributes, but the source file you upload determines the ceiling. Upload images at 2x the display size, compress with tools like Squoosh or TinyPNG before uploading, and always use WebP or AVIF where possible. Set meaningful alt text on every image\u2014it helps accessibility and Google Image Search.",
      },
      {
        type: "heading",
        content: "Internal Linking Architecture",
        level: 3,
        id: "internal-linking",
      },
      {
        type: "paragraph",
        content:
          "Internal links distribute PageRank and help crawlers discover content. Use descriptive anchor text, link contextually within body copy (not just navigation), and build a hub-and-spoke model where pillar pages link to supporting posts and vice versa. In Webflow CMS, you can use reference fields to automate related-post links at the bottom of every article.",
      },
      {
        type: "heading",
        content: "Ongoing SEO Audits and Monitoring",
        level: 2,
        id: "ongoing-audits",
      },
      {
        type: "paragraph",
        content:
          "SEO is not a one-time setup. Run a monthly audit covering: crawl errors in Search Console, Core Web Vitals regressions, keyword ranking changes, and new backlink opportunities. Use Screaming Frog or Sitebulb to crawl your Webflow site quarterly and catch broken links, missing meta descriptions, and orphan pages. Track organic traffic in GA4 with a custom exploration filtered to landing page.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Is Webflow good for SEO?",
            answer:
              "Yes. Webflow generates clean, semantic HTML and gives you full control over meta tags, sitemaps, and redirects. Performance depends on how you build\u2014follow this guide to maximize your rankings.",
          },
          {
            question: "Does Webflow support custom schema markup?",
            answer:
              "Webflow does not auto-generate schema, but you can add JSON-LD structured data via the Custom Code panel on any page or site-wide in Project Settings.",
          },
          {
            question: "How do I submit my Webflow sitemap to Google?",
            answer:
              "Go to Google Search Console > Sitemaps and enter your-domain.com/sitemap.xml. Webflow auto-generates and updates this file whenever you publish.",
          },
          {
            question:
              "Can I use Webflow for large sites with thousands of pages?",
            answer:
              "Webflow CMS supports up to 10,000 items per collection. For larger sites, consider splitting content across collections or using the Webflow Data API for programmatic management.",
          },
        ],
      },
      {
        type: "cta",
        text: "Need a full SEO audit of your Webflow site? We will identify every issue and build a roadmap to page one.",
        link: "/contact",
        buttonText: "Get a Free SEO Audit",
      },
    ],
    coverImage: "/images/blog/webflow-seo-complete-guide.webp",
    ogImage: "/images/blog/og-webflow-seo-complete-guide.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "seo",
      "technical seo",
      "core web vitals",
      "schema markup",
      "site speed",
    ],
    readingTimeMinutes: 14,
    published: true,
    featured: true,
    displayOrder: 1,
    seoTitle: "The Complete Webflow SEO Guide for 2026 | LIVV Studio",
    seoDescription:
      "Master Webflow SEO: crawlability, Core Web Vitals, schema markup, image optimization, and internal linking in one actionable guide.",
    faqSchema: [
      {
        question: "Is Webflow good for SEO?",
        answer:
          "Yes. Webflow generates clean, semantic HTML and gives you full control over meta tags, sitemaps, and redirects. Performance depends on how you build.",
      },
      {
        question: "Does Webflow support custom schema markup?",
        answer:
          "Webflow does not auto-generate schema, but you can add JSON-LD structured data via the Custom Code panel on any page or site-wide.",
      },
      {
        question: "How do I submit my Webflow sitemap to Google?",
        answer:
          "Go to Google Search Console > Sitemaps and enter your-domain.com/sitemap.xml. Webflow auto-generates and updates this file on publish.",
      },
    ],
    internalLinks: [
      {
        text: "Core Web Vitals guide",
        slug: "/blog/webflow-core-web-vitals",
      },
      {
        text: "Schema markup guide",
        slug: "/blog/webflow-schema-markup-guide",
      },
      {
        text: "Image optimization deep-dive",
        slug: "/blog/webflow-image-optimization",
      },
      { text: "Our Webflow services", slug: "/services/webflow-development" },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-core-web-vitals",
      "webflow-schema-markup-guide",
      "webflow-seo-settings-ignored",
      "webflow-image-optimization",
    ],
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-03-18T00:00:00Z",
  },

  // ──────────────────────────────────────────────
  // 2. Core Web Vitals
  // ──────────────────────────────────────────────
  {
    id: "ws-002",
    slug: "webflow-core-web-vitals",
    title: "Webflow Core Web Vitals: How to Hit Green on Every Metric",
    excerpt:
      "A practical breakdown of LCP, INP, and CLS in Webflow\u2014with exact fixes for the most common performance killers.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Core Web Vitals Are a Ranking Factor\u2014Here Is What Matters",
        level: 2,
        id: "cwv-ranking-factor",
      },
      {
        type: "paragraph",
        content:
          "Google uses three Core Web Vitals\u2014Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)\u2014as ranking signals. In 2024, INP replaced First Input Delay (FID), raising the bar for JavaScript-heavy sites. For Webflow projects, the good news is that you rarely deal with complex client-side frameworks. The bad news is that unoptimized images, render-blocking fonts, and layout-shifting interactions can still tank your scores.",
      },
      {
        type: "heading",
        content: "Fixing Largest Contentful Paint (LCP)",
        level: 2,
        id: "fixing-lcp",
      },
      {
        type: "paragraph",
        content:
          "LCP measures how quickly the largest visible element\u2014usually a hero image or heading\u2014renders. Webflow sites most often fail LCP because of oversized hero images served without explicit width and height, or custom fonts that block rendering. The fastest fix: compress your hero image to under 200 KB, serve it in WebP format, and set fetchpriority='high' via a custom attribute in Webflow\u2019s element settings.",
      },
      {
        type: "list",
        items: [
          "Compress hero images to under 200 KB using Squoosh or ShortPixel.",
          "Add fetchpriority='high' as a custom attribute on the LCP image element.",
          "Preload critical fonts with a <link rel='preload'> tag in the page\u2019s <head> custom code.",
          "Avoid lazy-loading the above-the-fold hero image\u2014Webflow\u2019s default lazy load should be disabled for it.",
          "Remove or defer third-party scripts that block the main thread (analytics, chat widgets).",
        ],
        ordered: true,
      },
      {
        type: "heading",
        content: "Fixing Cumulative Layout Shift (CLS)",
        level: 2,
        id: "fixing-cls",
      },
      {
        type: "paragraph",
        content:
          "CLS measures visual stability. The biggest CLS offenders in Webflow are images without explicit dimensions, web fonts that cause FOUT (Flash of Unstyled Text), and interactions that resize elements above the fold. Always set width and height on images\u2014Webflow does this automatically if you use the native image element, but background images on divs do not get this treatment.",
      },
      {
        type: "callout",
        content:
          "Use font-display: swap in your @font-face declarations. If you load fonts via Webflow\u2019s font manager, add a <style> tag in Custom Code to override the default font-display value to 'swap' or 'optional' for above-the-fold text.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "Fixing Interaction to Next Paint (INP)",
        level: 2,
        id: "fixing-inp",
      },
      {
        type: "paragraph",
        content:
          "INP measures responsiveness to user interactions like clicks, taps, and key presses. Webflow sites generally score well on INP because they don\u2019t rely on heavy client-side JS frameworks. However, complex Webflow interactions with 'Affect: Class' on many elements, or third-party scripts that monopolize the main thread, can push INP above 200 ms. Audit your interactions: if an animation affects more than 10 elements simultaneously, refactor it to use transform and opacity only.",
      },
      {
        type: "heading",
        content: "How to Measure Core Web Vitals",
        level: 2,
        id: "how-to-measure",
      },
      {
        type: "paragraph",
        content:
          "Use PageSpeed Insights for lab data and the Chrome UX Report for real-user data. The CrUX data in Search Console is what Google actually uses for ranking. Lab tools like Lighthouse are useful for debugging, but they run on a simulated throttled connection\u2014real-user data may differ. Check your CrUX data monthly in Search Console under 'Core Web Vitals' to spot regressions.",
      },
      {
        type: "table",
        headers: ["Tool", "Data Type", "Best For"],
        rows: [
          ["PageSpeed Insights", "Lab + Field", "Quick page-level checks"],
          [
            "Chrome UX Report (CrUX)",
            "Field only",
            "Real-user data for rankings",
          ],
          ["Lighthouse", "Lab only", "Debugging specific issues"],
          ["Web Vitals JS library", "Field (RUM)", "Custom dashboards"],
        ],
      },
      {
        type: "heading",
        content: "Webflow-Specific Performance Checklist",
        level: 2,
        id: "performance-checklist",
      },
      {
        type: "list",
        items: [
          "Disable 'Lazy Load' on above-the-fold images.",
          "Use native Webflow image elements instead of background images for LCP candidates.",
          "Limit Lottie animations to under 100 KB; defer non-critical Lotties.",
          "Move third-party scripts (analytics, chat) to the page footer or load them after user interaction.",
          "Audit Webflow interactions: use 'transform' and 'opacity' only for animations\u2014avoid layout-triggering properties like width, height, or margin.",
          "Enable Webflow\u2019s built-in minification (it is on by default, but verify in Project Settings).",
        ],
        ordered: false,
      },
      {
        type: "faq",
        items: [
          {
            question: "What is a good LCP score for a Webflow site?",
            answer:
              "Under 2.5 seconds. Most well-optimized Webflow sites hit 1.5\u20132.0 seconds on mobile.",
          },
          {
            question: "Does Webflow hosting affect Core Web Vitals?",
            answer:
              "Webflow uses a global CDN with fast TTFB. Hosting is rarely the bottleneck\u2014image weight and font loading are the typical culprits.",
          },
          {
            question:
              "Can Webflow interactions cause layout shift?",
            answer:
              "Yes. Interactions that change element dimensions (width, height, padding) above the fold will trigger CLS. Stick to transform and opacity.",
          },
        ],
      },
      {
        type: "cta",
        text: "Struggling with Core Web Vitals on your Webflow site? We can audit and fix every metric.",
        link: "/contact",
        buttonText: "Book a Performance Audit",
      },
    ],
    coverImage: "/images/blog/webflow-core-web-vitals.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "core web vitals",
      "lcp",
      "cls",
      "inp",
      "page speed",
      "performance",
    ],
    readingTimeMinutes: 10,
    published: true,
    featured: false,
    displayOrder: 2,
    seoTitle:
      "Webflow Core Web Vitals: How to Hit Green on Every Metric | LIVV Studio",
    seoDescription:
      "Fix LCP, CLS, and INP on your Webflow site with this step-by-step guide. Includes a performance checklist and measurement tools.",
    faqSchema: [
      {
        question: "What is a good LCP score for a Webflow site?",
        answer:
          "Under 2.5 seconds. Most well-optimized Webflow sites hit 1.5\u20132.0 seconds on mobile.",
      },
      {
        question: "Does Webflow hosting affect Core Web Vitals?",
        answer:
          "Webflow uses a global CDN with fast TTFB. Hosting is rarely the bottleneck\u2014image weight and font loading are the typical culprits.",
      },
      {
        question: "Can Webflow interactions cause layout shift?",
        answer:
          "Yes. Interactions that change element dimensions above the fold will trigger CLS. Stick to transform and opacity.",
      },
    ],
    internalLinks: [
      {
        text: "Complete Webflow SEO guide",
        slug: "/blog/webflow-seo-complete-guide",
      },
      {
        text: "LCP case study",
        slug: "/blog/webflow-lcp-optimization-case-study",
      },
      {
        text: "Image optimization tips",
        slug: "/blog/webflow-image-optimization",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-seo-complete-guide",
      "webflow-lcp-optimization-case-study",
      "webflow-image-optimization",
      "webflow-seo-settings-ignored",
    ],
    pillarPageSlug: "webflow-seo-complete-guide",
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-03-10T00:00:00Z",
  },

  // ──────────────────────────────────────────────
  // 3. Schema Markup Guide
  // ──────────────────────────────────────────────
  {
    id: "ws-003",
    slug: "webflow-schema-markup-guide",
    title: "How to Add Schema Markup (JSON-LD) to Any Webflow Site",
    excerpt:
      "Step-by-step instructions for adding Organization, Article, FAQ, and Breadcrumb schema to Webflow\u2014no plugins needed.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Schema Markup Matters for Webflow SEO",
        level: 2,
        id: "why-schema-matters",
      },
      {
        type: "paragraph",
        content:
          "Schema markup (structured data) tells Google exactly what your content is\u2014an article, a product, an FAQ, a business. When Google understands your content, it can show rich results: FAQ dropdowns, star ratings, breadcrumb trails, and knowledge panels. These enhanced listings increase click-through rates by 20\u201340% in most studies. Webflow does not generate schema automatically, but adding it is straightforward using JSON-LD in the Custom Code panel.",
      },
      {
        type: "heading",
        content: "Where to Add JSON-LD in Webflow",
        level: 2,
        id: "where-to-add",
      },
      {
        type: "paragraph",
        content:
          "You have two options: site-wide or page-specific. For Organization schema, add it in Project Settings > Custom Code > Head Code\u2014this injects the script on every page. For page-specific schema (Article, FAQ, Product), open the page\u2019s settings and paste the JSON-LD into the 'Inside <head> tag' field. For CMS-driven pages like blog posts, use Webflow\u2019s embed element inside the page template and bind CMS fields into the JSON-LD dynamically.",
      },
      {
        type: "heading",
        content: "Organization Schema for Your Homepage",
        level: 2,
        id: "organization-schema",
      },
      {
        type: "code",
        language: "json",
        content: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "sameAs": [
    "https://linkedin.com/company/yourcompany",
    "https://twitter.com/yourcompany"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@yoursite.com"
  }
}`,
      },
      {
        type: "paragraph",
        content:
          "Replace the placeholder values with your real business information. Validate the output with Google\u2019s Rich Results Test before publishing.",
      },
      {
        type: "heading",
        content: "Article Schema for Blog Posts",
        level: 2,
        id: "article-schema",
      },
      {
        type: "paragraph",
        content:
          "Every blog post should include Article schema. In a Webflow CMS-powered blog, create an embed element at the top of your blog post template and use CMS bindings to dynamically insert the title, author, publish date, and featured image URL. This is the most scalable approach\u2014every new post automatically gets structured data.",
      },
      {
        type: "code",
        language: "json",
        content: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{wf {\"path\":\"name\"} }}",
  "image": "{{wf {\"path\":\"main-image\"} }}",
  "datePublished": "{{wf {\"path\":\"published-date\"} }}",
  "author": {
    "@type": "Organization",
    "name": "Your Company"
  }
}`,
      },
      {
        type: "heading",
        content: "FAQ Schema for Service Pages",
        level: 2,
        id: "faq-schema",
      },
      {
        type: "paragraph",
        content:
          "FAQ schema generates expandable question-and-answer pairs directly in Google\u2019s search results. Add it to any page that has a genuine FAQ section. Google has tightened guidelines\u2014only use FAQ schema for actual frequently asked questions, not for keyword stuffing. Limit yourself to 3\u20135 high-value questions per page.",
      },
      {
        type: "heading",
        content: "BreadcrumbList Schema for Navigation",
        level: 3,
        id: "breadcrumb-schema",
      },
      {
        type: "paragraph",
        content:
          "Breadcrumb schema gives Google a clear picture of your site hierarchy and displays a breadcrumb trail in SERPs instead of the raw URL. This is especially valuable for sites with deep navigation. Add BreadcrumbList JSON-LD to every subpage, with each item pointing to a parent in the hierarchy: Home > Services > Webflow Development.",
      },
      {
        type: "callout",
        content:
          "Always validate your schema with Google\u2019s Rich Results Test (search.google.com/test/rich-results) before publishing. Even small JSON syntax errors will prevent rich results from appearing.",
        variant: "warning",
      },
      {
        type: "heading",
        content: "Common Schema Mistakes in Webflow",
        level: 2,
        id: "common-mistakes",
      },
      {
        type: "list",
        items: [
          "Placing the JSON-LD in the <body> instead of the <head>\u2014it works, but Google recommends <head>.",
          "Using placeholder text that never gets updated after launch.",
          "Adding schema types that do not match the page content (e.g., Product schema on a blog post).",
          "Forgetting to update schema when page content changes.",
          "Not testing with the Rich Results Test after every change.",
        ],
        ordered: false,
      },
      {
        type: "faq",
        items: [
          {
            question: "Does Webflow support schema markup natively?",
            answer:
              "No. Webflow does not auto-generate structured data. You need to manually add JSON-LD via Custom Code fields or embed elements.",
          },
          {
            question: "Where should I put JSON-LD in Webflow?",
            answer:
              "For site-wide schema (Organization), use Project Settings > Custom Code > Head. For page-specific schema, use the page\u2019s Head Code field or an embed element on CMS templates.",
          },
          {
            question: "How many FAQ schema items should I add?",
            answer:
              "Google recommends genuine FAQs only. Stick to 3\u20135 high-quality questions per page for best results.",
          },
        ],
      },
      {
        type: "cta",
        text: "Want rich results without the guesswork? We implement and validate schema for Webflow sites end to end.",
        link: "/contact",
        buttonText: "Get Schema Implemented",
      },
    ],
    coverImage: "/images/blog/webflow-schema-markup.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "schema markup",
      "json-ld",
      "structured data",
      "rich results",
      "seo",
    ],
    readingTimeMinutes: 9,
    published: true,
    featured: false,
    displayOrder: 3,
    seoTitle:
      "How to Add Schema Markup (JSON-LD) to Webflow | LIVV Studio",
    seoDescription:
      "Add Organization, Article, FAQ, and Breadcrumb schema to your Webflow site with JSON-LD. Step-by-step with code examples.",
    faqSchema: [
      {
        question: "Does Webflow support schema markup natively?",
        answer:
          "No. You need to manually add JSON-LD via Custom Code fields or embed elements.",
      },
      {
        question: "Where should I put JSON-LD in Webflow?",
        answer:
          "For site-wide schema, use Project Settings > Custom Code > Head. For page-specific schema, use the page\u2019s Head Code field.",
      },
      {
        question: "How many FAQ schema items should I add per page?",
        answer:
          "Stick to 3\u20135 genuine, high-quality questions per page for best results with Google.",
      },
    ],
    internalLinks: [
      {
        text: "Complete Webflow SEO guide",
        slug: "/blog/webflow-seo-complete-guide",
      },
      {
        text: "SEO settings you might be ignoring",
        slug: "/blog/webflow-seo-settings-ignored",
      },
      { text: "Webflow development services", slug: "/services/webflow-development" },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-seo-complete-guide",
      "webflow-seo-settings-ignored",
      "webflow-sitemap-robots",
      "webflow-data-api-scripts",
    ],
    pillarPageSlug: "webflow-seo-complete-guide",
    createdAt: "2026-01-28T00:00:00Z",
    updatedAt: "2026-03-05T00:00:00Z",
  },

  // ──────────────────────────────────────────────
  // 4. Sitemap and Robots.txt
  // ──────────────────────────────────────────────
  {
    id: "ws-004",
    slug: "webflow-sitemap-robots",
    title: "Webflow Sitemap and Robots.txt: What You Need to Know",
    excerpt:
      "How Webflow generates your sitemap and robots.txt, what the defaults get wrong, and how to fix them for better crawl efficiency.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "How Webflow Handles Sitemaps Automatically",
        level: 2,
        id: "auto-sitemap",
      },
      {
        type: "paragraph",
        content:
          "Webflow generates a sitemap.xml file automatically at yourdomain.com/sitemap.xml. It updates every time you publish. The sitemap includes all published pages and CMS collection items. This is convenient, but it also means utility pages, password-protected pages, and 'draft' pages that are technically published can end up in your sitemap\u2014telling Google to crawl and index pages you never intended to rank.",
      },
      {
        type: "heading",
        content: "Auditing Your Webflow Sitemap",
        level: 2,
        id: "auditing-sitemap",
      },
      {
        type: "list",
        items: [
          "Open yourdomain.com/sitemap.xml in your browser.",
          "Check every URL. Are there style guide pages, 404 pages, or test pages listed?",
          "For unwanted pages, go to Page Settings in Webflow and toggle 'Exclude this page from sitemap'.",
          "For CMS items you do not want indexed, use a conditional visibility trick: set the item to 'Draft' status, or use a toggle field to control sitemap inclusion programmatically.",
          "After cleanup, republish and verify the sitemap no longer contains excluded URLs.",
        ],
        ordered: true,
      },
      {
        type: "heading",
        content: "Understanding Webflow\u2019s Default Robots.txt",
        level: 2,
        id: "default-robots",
      },
      {
        type: "paragraph",
        content:
          "Webflow generates a default robots.txt that allows all crawlers access to all pages. On staging subdomains (yoursite.webflow.io), Webflow adds a 'Disallow: /' directive to prevent indexing. Once you connect a custom domain, the robots.txt switches to permissive. You cannot directly edit robots.txt in Webflow\u2019s UI\u2014there is no file editor for it. However, you can override it by hosting a custom robots.txt file via a reverse proxy, Cloudflare Workers, or by redirecting /robots.txt to a CMS-hosted text page.",
      },
      {
        type: "callout",
        content:
          "If your Webflow staging site (yoursite.webflow.io) is indexed in Google, it means the noindex directive was not in place or Google cached it before the directive was added. Submit a removal request in Search Console for the staging domain.",
        variant: "warning",
      },
      {
        type: "heading",
        content: "Custom Robots.txt with Cloudflare Workers",
        level: 2,
        id: "custom-robots",
      },
      {
        type: "paragraph",
        content:
          "If you need to block specific crawlers or directories, the cleanest approach is a Cloudflare Worker that intercepts requests to /robots.txt and returns your custom content. This takes about 10 minutes to set up. Create a Worker that checks if the request URL path is /robots.txt, and if so, returns a new Response with your desired directives. Otherwise, pass the request through to Webflow\u2019s origin.",
      },
      {
        type: "code",
        language: "javascript",
        content: `addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname === '/robots.txt') {
    const robotsTxt = \`User-agent: *
Allow: /
Disallow: /style-guide
Disallow: /utility-pages/
Sitemap: https://yoursite.com/sitemap.xml\`
    return new Response(robotsTxt, {
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  return fetch(request)
}`,
      },
      {
        type: "heading",
        content: "Submitting Your Sitemap to Google Search Console",
        level: 2,
        id: "submit-search-console",
      },
      {
        type: "paragraph",
        content:
          "After connecting your custom domain and publishing, go to Google Search Console, select your property, navigate to Sitemaps in the left menu, and submit yourdomain.com/sitemap.xml. Google will crawl it and report any errors. Check back after 48 hours to verify all URLs are discovered. If you see 'Couldn\u2019t fetch' errors, verify your custom domain DNS is properly configured and SSL is active.",
      },
      {
        type: "heading",
        content: "Sitemap Best Practices for Webflow CMS",
        level: 3,
        id: "cms-sitemap-tips",
      },
      {
        type: "list",
        items: [
          "Keep your sitemap under 50,000 URLs (Webflow will not hit this limit, but it is the Google maximum).",
          "Use descriptive slugs on CMS items\u2014these become the URL paths in the sitemap.",
          "Update content regularly so Google sees fresh lastmod dates when recrawling.",
          "If using multiple CMS collections, verify all collections appear in the sitemap.",
        ],
        ordered: false,
      },
      {
        type: "faq",
        items: [
          {
            question: "Can I edit robots.txt in Webflow?",
            answer:
              "Not directly through Webflow\u2019s UI. You can override it using Cloudflare Workers, a reverse proxy, or by redirecting the path to a custom-hosted file.",
          },
          {
            question: "Does Webflow automatically update the sitemap?",
            answer:
              "Yes. Webflow regenerates sitemap.xml every time you publish changes to the site.",
          },
          {
            question: "How do I exclude a page from the Webflow sitemap?",
            answer:
              "Open the page in Webflow, go to Page Settings, and toggle 'Exclude this page from sitemap.' Then republish.",
          },
          {
            question: "My staging site is indexed\u2014how do I fix it?",
            answer:
              "Submit a URL removal request in Google Search Console for the staging domain. Then verify that Webflow\u2019s staging robots.txt has Disallow: / set.",
          },
        ],
      },
      {
        type: "cta",
        text: "Need help with crawl management on your Webflow site? We handle sitemaps, robots.txt, and Search Console setup.",
        link: "/contact",
        buttonText: "Talk to Our SEO Team",
      },
    ],
    coverImage: "/images/blog/webflow-sitemap-robots.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "sitemap",
      "robots.txt",
      "crawlability",
      "google search console",
      "technical seo",
    ],
    readingTimeMinutes: 8,
    published: true,
    featured: false,
    displayOrder: 4,
    seoTitle:
      "Webflow Sitemap and Robots.txt: What You Need to Know | LIVV Studio",
    seoDescription:
      "Learn how Webflow generates sitemaps and robots.txt, how to exclude pages, and how to customize robots.txt with Cloudflare Workers.",
    faqSchema: [
      {
        question: "Can I edit robots.txt in Webflow?",
        answer:
          "Not directly through Webflow\u2019s UI. Use Cloudflare Workers or a reverse proxy to override it.",
      },
      {
        question: "Does Webflow automatically update the sitemap?",
        answer:
          "Yes. Webflow regenerates sitemap.xml every time you publish.",
      },
      {
        question: "How do I exclude a page from the Webflow sitemap?",
        answer:
          "Open the page, go to Page Settings, toggle 'Exclude this page from sitemap,' and republish.",
      },
    ],
    internalLinks: [
      {
        text: "Complete Webflow SEO guide",
        slug: "/blog/webflow-seo-complete-guide",
      },
      {
        text: "SEO settings you might be ignoring",
        slug: "/blog/webflow-seo-settings-ignored",
      },
      {
        text: "Managing scripts with the Data API",
        slug: "/blog/webflow-data-api-scripts",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-seo-complete-guide",
      "webflow-seo-settings-ignored",
      "webflow-schema-markup-guide",
      "webflow-data-api-scripts",
    ],
    pillarPageSlug: "webflow-seo-complete-guide",
    createdAt: "2026-02-05T00:00:00Z",
    updatedAt: "2026-03-01T00:00:00Z",
  },

  // ──────────────────────────────────────────────
  // 5. SEO Settings You're Ignoring
  // ──────────────────────────────────────────────
  {
    id: "ws-005",
    slug: "webflow-seo-settings-ignored",
    title: "Webflow SEO Settings You\u2019re Probably Ignoring",
    excerpt:
      "Most Webflow users configure the basics. Here are the settings that actually move the needle\u2014and that most teams skip.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "The SEO Settings Most Webflow Users Miss",
        level: 2,
        id: "settings-most-miss",
      },
      {
        type: "paragraph",
        content:
          "You set the title tag and meta description. Maybe you added an OG image. But there are at least eight Webflow SEO settings that directly impact rankings and click-through rates\u2014and most teams ignore them. This post covers the ones we fix on nearly every Webflow audit we run.",
      },
      {
        type: "heading",
        content: "1. The Global 301 Redirect for www vs. non-www",
        level: 2,
        id: "www-redirect",
      },
      {
        type: "paragraph",
        content:
          "If both www.yoursite.com and yoursite.com resolve to your Webflow project, you are splitting link equity between two domains. In Webflow\u2019s hosting settings, set a default domain (either www or non-www) and enable the 'Redirect to default domain' toggle. This creates a site-wide 301 redirect that consolidates all link signals to a single canonical domain.",
      },
      {
        type: "heading",
        content: "2. Canonical URLs on Every Page",
        level: 2,
        id: "canonical-urls",
      },
      {
        type: "paragraph",
        content:
          "Webflow does not set canonical URLs automatically. Without a canonical, Google decides which version of a page is 'primary'\u2014and it does not always choose correctly. Open each page\u2019s settings and paste the full URL (including https://) into the Canonical URL field. For CMS collection pages, you can inject a dynamic canonical using a custom code embed with the page\u2019s slug.",
      },
      {
        type: "heading",
        content: "3. Custom 404 Page",
        level: 2,
        id: "custom-404",
      },
      {
        type: "paragraph",
        content:
          "Webflow lets you design a custom 404 page, but most teams leave the default. A well-designed 404 page retains users who hit dead links by offering navigation, search, or popular content links. From an SEO perspective, it reduces bounce rate from 404 hits and can recover sessions that would otherwise be lost.",
      },
      {
        type: "heading",
        content: "4. Alt Text on Every Image",
        level: 2,
        id: "alt-text",
      },
      {
        type: "paragraph",
        content:
          "This sounds basic, but in our audits, 60\u201370% of Webflow sites have images without alt text. Every image element in Webflow has an alt text field\u2014fill it with a concise, descriptive phrase that includes relevant keywords naturally. Decorative images (borders, dividers) should have an empty alt attribute to be ignored by screen readers.",
      },
      {
        type: "callout",
        content:
          "For CMS-driven images, add an 'Image Alt Text' plain text field to your collection and bind it to the image\u2019s alt attribute. This lets content editors set alt text per item without touching the designer.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "5. Open Graph and Twitter Card Defaults",
        level: 2,
        id: "og-twitter-defaults",
      },
      {
        type: "paragraph",
        content:
          "In Project Settings > SEO, Webflow lets you set a fallback OG image and OG description. These apply to any page that does not have its own OG settings. Set these defaults to your brand\u2019s hero image and a compelling one-line description. Then override on key landing pages and blog posts.",
      },
      {
        type: "heading",
        content: "6. Heading Hierarchy (H1 through H6)",
        level: 2,
        id: "heading-hierarchy",
      },
      {
        type: "paragraph",
        content:
          "Webflow lets you assign any heading level to any text element. This flexibility is a double-edged sword\u2014we regularly see sites with three H1 tags on a single page, or H3s used before H2s for styling reasons. Search engines use heading hierarchy to understand content structure. Every page should have exactly one H1 (usually the page title), followed by H2s for major sections, and H3s for subsections.",
      },
      {
        type: "heading",
        content: "7. Clean URL Slugs",
        level: 3,
        id: "clean-slugs",
      },
      {
        type: "paragraph",
        content:
          "Webflow auto-generates slugs from page names, which often produces slugs like 'our-amazing-premium-web-design-services-for-startups'. Short, keyword-focused slugs perform better in search. Edit slugs manually in Page Settings to keep them under 3\u20135 words: /services/web-design is far better than the auto-generated alternative.",
      },
      {
        type: "heading",
        content: "8. Noindex Tags on Utility Pages",
        level: 3,
        id: "noindex-utility",
      },
      {
        type: "paragraph",
        content:
          "Password pages, thank-you pages, style guides, and test pages should not be indexed. In Webflow, you can add a noindex meta tag by going to Page Settings > Custom Code > Head Code and pasting: <meta name=\"robots\" content=\"noindex, nofollow\">. Also exclude these pages from the sitemap.",
      },
      {
        type: "faq",
        items: [
          {
            question:
              "Does Webflow set canonical URLs automatically?",
            answer:
              "No. You must manually set the canonical URL in each page\u2019s settings or inject it dynamically for CMS pages.",
          },
          {
            question:
              "How do I add noindex to a Webflow page?",
            answer:
              "Go to Page Settings > Custom Code > Inside <head> tag and add <meta name='robots' content='noindex, nofollow'>.",
          },
          {
            question:
              "Should every Webflow page have unique OG images?",
            answer:
              "Set a global fallback in Project Settings, but override it on landing pages and blog posts with custom images for better social sharing.",
          },
          {
            question: "How many H1 tags should a Webflow page have?",
            answer:
              "Exactly one. Use H2s for major sections and H3s for subsections. Webflow\u2019s visual hierarchy classes should not dictate your heading structure.",
          },
        ],
      },
      {
        type: "cta",
        text: "Let us audit your Webflow SEO settings and fix the gaps. Most audits uncover 10+ quick wins.",
        link: "/contact",
        buttonText: "Request an SEO Settings Audit",
      },
    ],
    coverImage: "/images/blog/webflow-seo-settings.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "seo settings",
      "canonical urls",
      "meta tags",
      "alt text",
      "heading hierarchy",
    ],
    readingTimeMinutes: 9,
    published: true,
    featured: false,
    displayOrder: 5,
    seoTitle:
      "8 Webflow SEO Settings You\u2019re Probably Ignoring | LIVV Studio",
    seoDescription:
      "Fix these 8 overlooked Webflow SEO settings: canonical URLs, heading hierarchy, alt text, OG defaults, noindex tags, and more.",
    faqSchema: [
      {
        question: "Does Webflow set canonical URLs automatically?",
        answer:
          "No. You must manually set the canonical URL in each page\u2019s settings.",
      },
      {
        question: "How do I add noindex to a Webflow page?",
        answer:
          "Go to Page Settings > Custom Code > Inside <head> and add a noindex meta tag.",
      },
      {
        question: "How many H1 tags should a Webflow page have?",
        answer:
          "Exactly one. Use H2 and H3 for subheadings.",
      },
    ],
    internalLinks: [
      {
        text: "Complete Webflow SEO guide",
        slug: "/blog/webflow-seo-complete-guide",
      },
      {
        text: "Sitemap and robots.txt guide",
        slug: "/blog/webflow-sitemap-robots",
      },
      {
        text: "Image optimization tips",
        slug: "/blog/webflow-image-optimization",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-seo-complete-guide",
      "webflow-sitemap-robots",
      "webflow-schema-markup-guide",
      "webflow-image-optimization",
    ],
    pillarPageSlug: "webflow-seo-complete-guide",
    createdAt: "2026-02-12T00:00:00Z",
    updatedAt: "2026-03-08T00:00:00Z",
  },

  // ──────────────────────────────────────────────
  // 6. LCP Optimization Case Study
  // ──────────────────────────────────────────────
  {
    id: "ws-006",
    slug: "webflow-lcp-optimization-case-study",
    title: "How We Cut LCP from 3.0s to 1.8s on a Webflow Site",
    excerpt:
      "A real case study: the exact changes we made to a client\u2019s Webflow site to reduce Largest Contentful Paint by 40%.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "The Problem: A Beautiful Site That Google Flagged as Slow",
        level: 2,
        id: "the-problem",
      },
      {
        type: "paragraph",
        content:
          "A B2B SaaS client came to us with a Webflow marketing site that looked exceptional but had a Largest Contentful Paint of 3.0 seconds on mobile. Google Search Console flagged 80% of their pages as 'Poor' for Core Web Vitals. Organic traffic had plateaued, and they suspected performance was the bottleneck. We ran a full audit and identified five changes that brought LCP down to 1.8 seconds in three weeks.",
      },
      {
        type: "heading",
        content: "Step 1: Identifying the LCP Element",
        level: 2,
        id: "identifying-lcp",
      },
      {
        type: "paragraph",
        content:
          "The first step is always identifying what the LCP element is. Using Chrome DevTools Performance tab, we recorded a page load and found the LCP element was a 2.4 MB PNG hero image at 3840x2160 pixels\u2014far larger than needed. The image was set to lazy load (Webflow\u2019s default for non-background images), which delayed it even further because the browser waited until the image entered the viewport before fetching it.",
      },
      {
        type: "heading",
        content: "Step 2: Optimizing the Hero Image",
        level: 2,
        id: "optimizing-hero",
      },
      {
        type: "list",
        items: [
          "Resized the hero image from 3840px to 1920px wide (2x the max display width).",
          "Converted from PNG to WebP, reducing file size from 2.4 MB to 145 KB.",
          "Disabled lazy loading on the hero image in Webflow\u2019s image settings.",
          "Added fetchpriority='high' as a custom attribute to tell the browser to prioritize this resource.",
        ],
        ordered: true,
      },
      {
        type: "paragraph",
        content:
          "This single change dropped LCP from 3.0s to 2.2s\u2014a 27% improvement. But we were not done.",
      },
      {
        type: "heading",
        content: "Step 3: Eliminating Render-Blocking Fonts",
        level: 2,
        id: "render-blocking-fonts",
      },
      {
        type: "paragraph",
        content:
          "The site used three custom font families loaded via Webflow\u2019s font manager: a display font for headings, a sans-serif for body, and a monospace for code snippets. All three loaded in the <head> as render-blocking resources. We reduced this to two families (dropping the monospace, which appeared on only two pages) and added font-display: swap via a <style> block in head custom code. We also preloaded the primary body font with a <link rel='preload'> tag.",
      },
      {
        type: "heading",
        content: "Step 4: Deferring Third-Party Scripts",
        level: 2,
        id: "deferring-scripts",
      },
      {
        type: "paragraph",
        content:
          "The site loaded five third-party scripts in the <head>: Google Tag Manager, Hotjar, Intercom, a cookie consent banner, and a social proof widget. Each script blocked the main thread during parsing. We moved all scripts except GTM to the page footer (body end code in Webflow) and loaded Intercom and the social proof widget only after user interaction using a small loader script that listened for the first click or scroll event.",
      },
      {
        type: "code",
        language: "javascript",
        content: `// Defer non-critical scripts until first user interaction
function loadDeferred() {
  // Intercom
  const ic = document.createElement('script');
  ic.src = 'https://widget.intercom.io/widget/YOUR_ID';
  ic.async = true;
  document.body.appendChild(ic);
  // Remove listener after first load
  window.removeEventListener('click', loadDeferred);
  window.removeEventListener('scroll', loadDeferred);
}
window.addEventListener('click', loadDeferred, { once: true });
window.addEventListener('scroll', loadDeferred, { once: true });`,
      },
      {
        type: "heading",
        content: "Step 5: Preloading Critical Resources",
        level: 2,
        id: "preloading-resources",
      },
      {
        type: "paragraph",
        content:
          "Finally, we added preload hints for the two most critical resources: the hero image and the primary web font file. These <link rel='preload'> tags in the <head> tell the browser to fetch these files immediately, before the CSS parser discovers them. Combined with the fetchpriority attribute on the image, this shaved another 200ms off LCP.",
      },
      {
        type: "heading",
        content: "Results: Before and After",
        level: 2,
        id: "results",
      },
      {
        type: "table",
        headers: ["Metric", "Before", "After", "Change"],
        rows: [
          ["LCP (mobile)", "3.0 s", "1.8 s", "-40%"],
          ["LCP (desktop)", "2.1 s", "1.2 s", "-43%"],
          ["Total page weight", "4.8 MB", "1.9 MB", "-60%"],
          ["Render-blocking resources", "8", "2", "-75%"],
          ["CWV pass rate (Search Console)", "20%", "95%", "+75pp"],
        ],
      },
      {
        type: "paragraph",
        content:
          "Within six weeks of these changes going live, the client saw a 22% increase in organic impressions and a 15% increase in organic clicks. The pages that moved from 'Poor' to 'Good' in Search Console saw the biggest ranking improvements, with three target keywords moving from positions 8\u201312 to positions 3\u20135.",
      },
      {
        type: "faq",
        items: [
          {
            question: "How long does it take for CWV improvements to affect rankings?",
            answer:
              "Google updates CrUX data monthly, so you typically see ranking changes 4\u20138 weeks after the performance improvements go live.",
          },
          {
            question: "Is 1.8s LCP good enough?",
            answer:
              "Yes. Google\u2019s 'Good' threshold is under 2.5s. An LCP of 1.8s puts you well into the green zone.",
          },
          {
            question: "Can I apply these same fixes to any Webflow site?",
            answer:
              "Most of these optimizations apply universally to Webflow projects. The specific gains depend on your starting point, but hero image compression and script deferral help every site.",
          },
        ],
      },
      {
        type: "cta",
        text: "Want the same results for your Webflow site? We run performance audits with guaranteed improvements.",
        link: "/contact",
        buttonText: "Get a Performance Audit",
      },
    ],
    coverImage: "/images/blog/webflow-lcp-case-study.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "lcp",
      "case study",
      "performance",
      "core web vitals",
      "page speed",
    ],
    readingTimeMinutes: 10,
    published: true,
    featured: false,
    displayOrder: 6,
    seoTitle:
      "How We Cut LCP from 3.0s to 1.8s on a Webflow Site | LIVV Studio",
    seoDescription:
      "Case study: 5 changes that reduced Webflow LCP by 40%. Hero image optimization, font loading, script deferral, and preloading.",
    faqSchema: [
      {
        question:
          "How long does it take for CWV improvements to affect rankings?",
        answer:
          "Google updates CrUX data monthly. Expect ranking changes 4\u20138 weeks after improvements go live.",
      },
      {
        question: "Is 1.8s LCP good enough?",
        answer:
          "Yes. Google\u2019s threshold for 'Good' LCP is under 2.5 seconds.",
      },
      {
        question: "Can I apply these fixes to any Webflow site?",
        answer:
          "Most optimizations apply universally. Hero image compression and script deferral help every site.",
      },
    ],
    internalLinks: [
      {
        text: "Core Web Vitals guide",
        slug: "/blog/webflow-core-web-vitals",
      },
      {
        text: "Image optimization deep-dive",
        slug: "/blog/webflow-image-optimization",
      },
      {
        text: "Complete Webflow SEO guide",
        slug: "/blog/webflow-seo-complete-guide",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-core-web-vitals",
      "webflow-image-optimization",
      "webflow-seo-complete-guide",
      "webflow-data-api-scripts",
    ],
    pillarPageSlug: "webflow-seo-complete-guide",
    createdAt: "2026-02-20T00:00:00Z",
    updatedAt: "2026-03-15T00:00:00Z",
  },

  // ──────────────────────────────────────────────
  // 7. Image Optimization
  // ──────────────────────────────────────────────
  {
    id: "ws-007",
    slug: "webflow-image-optimization",
    title:
      "Webflow Image Optimization: From 55MB to 5MB Without Losing Quality",
    excerpt:
      "A step-by-step workflow for compressing, resizing, and serving images in Webflow\u2014cutting page weight by 90% while maintaining visual fidelity.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Image Optimization Is the Highest-ROI SEO Task",
        level: 2,
        id: "why-image-optimization",
      },
      {
        type: "paragraph",
        content:
          "On the average Webflow site, images account for 60\u201380% of total page weight. A single uncompressed PNG hero image can be 5 MB\u2014more than most entire web pages should weigh. Image optimization is the fastest way to improve LCP, reduce bandwidth costs, and deliver a better user experience. We recently audited a Webflow portfolio site with 55 MB of images across the homepage. After optimization, it weighed 5 MB with zero visible quality loss.",
      },
      {
        type: "heading",
        content: "The Pre-Upload Workflow",
        level: 2,
        id: "pre-upload-workflow",
      },
      {
        type: "paragraph",
        content:
          "Never upload raw images directly to Webflow. Before uploading, every image should go through this pipeline: resize to 2x the maximum display width (a 600px-wide image on your site should be uploaded at 1200px), convert to WebP format, and compress to a quality setting between 75\u201385%. Tools like Squoosh (browser-based, free), ShortPixel (batch processing), or ImageOptim (macOS) handle this in seconds.",
      },
      {
        type: "list",
        items: [
          "Export from design tools (Figma, Photoshop) at 2x display size.",
          "Convert to WebP using Squoosh, cwebp CLI, or ShortPixel.",
          "Target 75\u201385% quality for photos, 90%+ for graphics with sharp edges or text.",
          "Verify the compressed image against the original at actual display size\u2014differences are usually invisible.",
          "Name the file descriptively: 'saas-dashboard-hero.webp' not 'IMG_4523.webp'.",
        ],
        ordered: true,
      },
      {
        type: "heading",
        content: "How Webflow\u2019s Responsive Images Work",
        level: 2,
        id: "responsive-images",
      },
      {
        type: "paragraph",
        content:
          "When you add a native image element in Webflow, it automatically generates a srcset with multiple resolutions (500w, 800w, 1080w, 1600w, 2000w) and serves the appropriately sized version based on the visitor\u2019s viewport. This is powerful, but it only works with native image elements\u2014not background images on divs, which serve the full-resolution file to every device. For above-the-fold images, always use the native <img> element instead of a CSS background.",
      },
      {
        type: "callout",
        content:
          "Webflow\u2019s asset manager shows file sizes for all uploaded images. Sort by size to identify the heaviest offenders. Any image over 500 KB should be re-evaluated.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "WebP vs. AVIF vs. PNG vs. JPEG",
        level: 2,
        id: "format-comparison",
      },
      {
        type: "table",
        headers: ["Format", "Best For", "Compression", "Browser Support"],
        rows: [
          ["WebP", "Photos and graphics", "25\u201335% smaller than JPEG", "97%+ global support"],
          ["AVIF", "Photos (highest compression)", "50% smaller than JPEG", "92% support (growing)"],
          ["JPEG", "Fallback for photos", "Baseline, widely supported", "100%"],
          ["PNG", "Graphics with transparency", "Lossless, larger files", "100%"],
          ["SVG", "Icons, logos, illustrations", "Vector, tiny file size", "100%"],
        ],
      },
      {
        type: "paragraph",
        content:
          "Our recommendation: use WebP for all raster images. It has near-universal browser support and consistently delivers 25\u201335% smaller files than JPEG at equivalent quality. Use SVG for icons and logos. Reserve PNG only for images that require transparency and where WebP with alpha is not sufficient.",
      },
      {
        type: "heading",
        content: "Lazy Loading: When to Use It and When Not To",
        level: 2,
        id: "lazy-loading",
      },
      {
        type: "paragraph",
        content:
          "Lazy loading defers image download until the image enters the viewport. This is excellent for below-the-fold images\u2014it reduces initial page weight and speeds up LCP. Webflow lets you toggle lazy loading per image element. The critical rule: never lazy-load your LCP element. If your hero image is lazy-loaded, the browser waits to download it until after layout, which directly increases LCP. Disable lazy loading on the first image visible on the page.",
      },
      {
        type: "heading",
        content: "Alt Text and SEO for Images",
        level: 2,
        id: "alt-text-seo",
      },
      {
        type: "paragraph",
        content:
          "Every image needs descriptive alt text for accessibility and SEO. Google Image Search drives significant traffic for visual industries (design, architecture, fashion). Write alt text that describes what the image shows and naturally includes relevant keywords. Avoid keyword stuffing\u2014'screenshot of SaaS analytics dashboard showing monthly revenue growth' is better than 'SaaS dashboard analytics software revenue tool.'",
      },
      {
        type: "heading",
        content: "Batch Optimization Script for Large Sites",
        level: 3,
        id: "batch-optimization",
      },
      {
        type: "paragraph",
        content:
          "For sites with hundreds of images, manual optimization is not feasible. Use a CLI tool like cwebp (from Google) or sharp (Node.js) to batch-convert and compress images before uploading. Here is a simple bash script that converts all PNGs and JPEGs in a folder to WebP at 80% quality:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Convert all images in ./images to WebP at 80% quality
for file in ./images/*.{png,jpg,jpeg}; do
  cwebp -q 80 "$file" -o "\${file%.*}.webp"
done
echo "Conversion complete. Check ./images for .webp files."`,
      },
      {
        type: "faq",
        items: [
          {
            question: "Does Webflow automatically compress images?",
            answer:
              "Webflow generates responsive srcset sizes but does not compress the original file you upload. Always compress before uploading.",
          },
          {
            question: "Should I use AVIF in Webflow?",
            answer:
              "AVIF offers the best compression, but Webflow does not auto-generate AVIF variants. You can upload AVIF files manually, but ensure fallbacks for the ~8% of browsers that do not support it.",
          },
          {
            question: "What is the ideal file size for a Webflow hero image?",
            answer:
              "Under 200 KB for mobile and under 300 KB for desktop. Use WebP at 80% quality and resize to 2x display width.",
          },
          {
            question: "How do I check image sizes in Webflow?",
            answer:
              "Open the Asset Manager in Webflow\u2019s designer. It shows file size, dimensions, and format for every uploaded image.",
          },
        ],
      },
      {
        type: "cta",
        text: "Need help optimizing images across your Webflow site? We handle the full audit, compression, and re-upload.",
        link: "/contact",
        buttonText: "Optimize My Images",
      },
    ],
    coverImage: "/images/blog/webflow-image-optimization.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "image optimization",
      "webp",
      "page speed",
      "lcp",
      "lazy loading",
      "compression",
    ],
    readingTimeMinutes: 11,
    published: true,
    featured: false,
    displayOrder: 7,
    seoTitle:
      "Webflow Image Optimization: From 55MB to 5MB | LIVV Studio",
    seoDescription:
      "Cut Webflow page weight by 90%: pre-upload compression, WebP conversion, responsive images, lazy loading strategy, and batch scripts.",
    faqSchema: [
      {
        question: "Does Webflow automatically compress images?",
        answer:
          "No. Webflow generates responsive sizes but does not compress the original. Always compress before uploading.",
      },
      {
        question: "What is the ideal file size for a Webflow hero image?",
        answer:
          "Under 200 KB for mobile, under 300 KB for desktop. Use WebP at 80% quality.",
      },
      {
        question: "Should I use AVIF in Webflow?",
        answer:
          "AVIF has the best compression but ~8% of browsers lack support. Upload AVIF manually with fallbacks, or stick with WebP.",
      },
    ],
    internalLinks: [
      {
        text: "Core Web Vitals guide",
        slug: "/blog/webflow-core-web-vitals",
      },
      {
        text: "LCP case study",
        slug: "/blog/webflow-lcp-optimization-case-study",
      },
      {
        text: "Complete Webflow SEO guide",
        slug: "/blog/webflow-seo-complete-guide",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-core-web-vitals",
      "webflow-lcp-optimization-case-study",
      "webflow-seo-complete-guide",
      "webflow-seo-settings-ignored",
    ],
    pillarPageSlug: "webflow-seo-complete-guide",
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-03-18T00:00:00Z",
  },

  // ──────────────────────────────────────────────
  // 8. Data API and Scripts
  // ──────────────────────────────────────────────
  {
    id: "ws-008",
    slug: "webflow-data-api-scripts",
    title: "Managing Scripts in Webflow with the Data API",
    excerpt:
      "How to use Webflow\u2019s Data API to programmatically manage custom scripts, track injections, and maintain SEO hygiene across large sites.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "The Script Management Problem in Webflow",
        level: 2,
        id: "script-management-problem",
      },
      {
        type: "paragraph",
        content:
          "On a small Webflow site, managing scripts through the Custom Code panel is straightforward. On a site with 50+ pages, multiple analytics tools, conversion pixels, and third-party widgets, it becomes a maintenance nightmare. Scripts get duplicated across pages, outdated tracking codes linger, and no one has visibility into what is actually loaded. The Webflow Data API\u2019s Scripts endpoints solve this by giving you programmatic control over script injection.",
      },
      {
        type: "heading",
        content: "What the Webflow Scripts API Can Do",
        level: 2,
        id: "scripts-api-overview",
      },
      {
        type: "paragraph",
        content:
          "The Webflow Data API v2 includes endpoints for registering, listing, and managing custom scripts on a site. Instead of pasting the same analytics snippet into every page\u2019s Custom Code panel, you register the script once via the API and it is injected across all pages (or specific pages) automatically. This is cleaner, auditable, and less error-prone than manual injection.",
      },
      {
        type: "list",
        items: [
          "Register a script: POST /sites/{site_id}/registered_scripts",
          "List all scripts: GET /sites/{site_id}/registered_scripts",
          "Apply scripts to pages: POST /sites/{site_id}/custom_code/scripts",
          "Remove a script: DELETE /sites/{site_id}/registered_scripts/{script_id}",
          "Inline and hosted (external URL) scripts are both supported.",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "Registering a Script via the API",
        level: 2,
        id: "registering-script",
      },
      {
        type: "paragraph",
        content:
          "To register a hosted script (like Google Tag Manager), send a POST request with the script source URL, display name, and version. The API returns a script ID you can use to manage it later. Here is an example using curl:",
      },
      {
        type: "code",
        language: "bash",
        content: `curl -X POST "https://api.webflow.com/v2/sites/YOUR_SITE_ID/registered_scripts" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sourceUrl": "https://www.googletagmanager.com/gtm.js?id=GTM-XXXXX",
    "displayName": "Google Tag Manager",
    "version": "1.0.0",
    "location": "header"
  }'`,
      },
      {
        type: "heading",
        content: "Applying Scripts to Specific Pages",
        level: 2,
        id: "applying-to-pages",
      },
      {
        type: "paragraph",
        content:
          "Once registered, you can apply a script to all pages or target specific pages by their page ID. This is useful for conversion pixels that should only fire on thank-you pages, or analytics that should run everywhere except the blog. Use the custom_code/scripts endpoint with a list of page IDs to control placement granularly.",
      },
      {
        type: "heading",
        content: "Auditing Existing Scripts for SEO Impact",
        level: 2,
        id: "auditing-scripts",
      },
      {
        type: "paragraph",
        content:
          "Every third-party script is a potential performance liability. Use the GET endpoint to list all registered scripts and review each one. For every script, ask: Is this still needed? Does it block the main thread? Can it be deferred or loaded after interaction? We regularly find clients running two analytics tools (GA4 and an old Universal Analytics snippet), abandoned A/B testing scripts, and social share widgets that add 200+ KB to every page.",
      },
      {
        type: "callout",
        content:
          "Use Google Lighthouse\u2019s 'Third-Party Usage' audit to see exactly how much time each script costs. Any script adding more than 250 ms of main-thread blocking time should be deferred or removed.",
        variant: "info",
      },
      {
        type: "heading",
        content: "Version Control and Rollback",
        level: 2,
        id: "version-control",
      },
      {
        type: "paragraph",
        content:
          "The API\u2019s version field lets you track which version of a script is deployed. When updating a script (say, upgrading GTM or switching analytics providers), register the new version and remove the old one. This creates a clear audit trail. For teams that use CI/CD pipelines, you can integrate Webflow script management into your deployment workflow\u2014updating scripts as part of the same process that deploys code changes.",
      },
      {
        type: "heading",
        content: "SEO Best Practices for Script Management",
        level: 2,
        id: "seo-best-practices",
      },
      {
        type: "list",
        items: [
          "Load analytics and tracking scripts in the footer (location: 'footer'), not the header.",
          "Defer non-essential scripts until after first user interaction.",
          "Remove abandoned scripts\u2014every unused script adds weight and risk.",
          "Use the API to audit scripts quarterly; check each for necessity and performance impact.",
          "Keep inline scripts minimal; prefer external hosted scripts that can be cached by the browser.",
          "Monitor third-party script impact in Core Web Vitals reports after any script changes.",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "Automation: Script Audit via Node.js",
        level: 3,
        id: "automation-script",
      },
      {
        type: "code",
        language: "javascript",
        content: `const WEBFLOW_API = 'https://api.webflow.com/v2';
const SITE_ID = process.env.WEBFLOW_SITE_ID;
const TOKEN = process.env.WEBFLOW_API_TOKEN;

async function auditScripts() {
  const res = await fetch(
    \`\${WEBFLOW_API}/sites/\${SITE_ID}/registered_scripts\`,
    { headers: { Authorization: \`Bearer \${TOKEN}\` } }
  );
  const { registeredScripts } = await res.json();

  console.log(\`Found \${registeredScripts.length} registered scripts:\\n\`);
  for (const script of registeredScripts) {
    console.log(\`- \${script.displayName} (v\${script.version})\`);
    console.log(\`  Location: \${script.location}\`);
    console.log(\`  Source: \${script.sourceUrl || 'inline'}\\n\`);
  }
}

auditScripts();`,
      },
      {
        type: "faq",
        items: [
          {
            question: "Does the Webflow Data API require a paid plan?",
            answer:
              "The Data API is available on Webflow\u2019s CMS and Business hosting plans. Check Webflow\u2019s pricing page for the latest plan requirements.",
          },
          {
            question: "Can I use the API to add scripts to CMS collection pages?",
            answer:
              "Yes. You can target specific page IDs, including CMS template pages, when applying scripts via the custom_code/scripts endpoint.",
          },
          {
            question: "Is it safe to manage scripts via the API in production?",
            answer:
              "Yes, but always test changes on a staging environment first. Register new scripts and verify they load correctly before removing old ones.",
          },
          {
            question: "How does script placement affect SEO?",
            answer:
              "Scripts in the <head> can block rendering and increase LCP. Place non-critical scripts in the footer and defer them to minimize performance impact.",
          },
          {
            question: "Can I roll back a script change via the API?",
            answer:
              "You can re-register a previous version of a script and remove the current one. Using version numbers helps track what was deployed and when.",
          },
        ],
      },
      {
        type: "cta",
        text: "Need help setting up script management for your Webflow site? We build automated workflows that keep your site fast and compliant.",
        link: "/contact",
        buttonText: "Let\u2019s Automate Your Scripts",
      },
    ],
    coverImage: "/images/blog/webflow-data-api-scripts.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "webflow",
      "data api",
      "scripts",
      "google tag manager",
      "performance",
      "technical seo",
      "automation",
    ],
    readingTimeMinutes: 12,
    published: true,
    featured: false,
    displayOrder: 8,
    seoTitle:
      "Managing Scripts in Webflow with the Data API | LIVV Studio",
    seoDescription:
      "Use Webflow\u2019s Data API to register, audit, and manage scripts programmatically. Includes code examples and SEO best practices.",
    faqSchema: [
      {
        question: "Does the Webflow Data API require a paid plan?",
        answer:
          "The API is available on CMS and Business hosting plans. Check Webflow\u2019s pricing for current requirements.",
      },
      {
        question: "Can I use the API to add scripts to CMS pages?",
        answer:
          "Yes. Target specific page IDs, including CMS templates, via the custom_code/scripts endpoint.",
      },
      {
        question: "How does script placement affect SEO?",
        answer:
          "Head scripts block rendering and increase LCP. Place non-critical scripts in the footer and defer them.",
      },
    ],
    internalLinks: [
      {
        text: "Complete Webflow SEO guide",
        slug: "/blog/webflow-seo-complete-guide",
      },
      {
        text: "Core Web Vitals guide",
        slug: "/blog/webflow-core-web-vitals",
      },
      {
        text: "LCP optimization case study",
        slug: "/blog/webflow-lcp-optimization-case-study",
      },
      {
        text: "Sitemap and robots.txt guide",
        slug: "/blog/webflow-sitemap-robots",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "webflow-seo-complete-guide",
      "webflow-core-web-vitals",
      "webflow-sitemap-robots",
      "webflow-lcp-optimization-case-study",
    ],
    pillarPageSlug: "webflow-seo-complete-guide",
    createdAt: "2026-03-10T00:00:00Z",
    updatedAt: "2026-03-20T00:00:00Z",
  },
]
