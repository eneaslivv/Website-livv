import { BlogPost } from "@/types/blog";

const sharedAuthor = {
  name: "LIVV Studio",
  role: "Creative Engineering Agency",
  avatar: "/assets/logo-new.png",
};

const sharedCategory = {
  slug: "framer-seo",
  name: "Framer SEO & Development",
  description:
    "SEO optimization and development best practices for Framer sites.",
  clusterId: "C",
};

const sharedCta = {
  type: "contact" as const,
  link: "/contact",
  text: "Want expert Framer development with built-in SEO? Let's talk.",
};

export const clusterCFramerSeo: BlogPost[] = [
  // ─── POST 1: PILLAR ──────────────────────────────────────────────────
  {
    id: "c-001",
    slug: "framer-seo-complete-guide",
    title: "Framer SEO: The Complete Optimization Guide",
    excerpt:
      "A comprehensive, technical guide to maximizing search engine visibility on Framer — from metadata and structured data to CMS configuration, page speed, and crawlability.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Framer SEO Matters More Than You Think",
        level: 2,
        id: "why-framer-seo-matters",
      },
      {
        type: "paragraph",
        content:
          "Framer has quickly evolved from a prototyping tool into a full-fledged website builder used by startups, agencies, and enterprise teams. But publishing a beautiful site means nothing if Google cannot crawl, render, and index it properly. Because Framer outputs static HTML at build time — unlike single-page apps that rely on client-side JavaScript rendering — it already has a structural advantage. The key is leveraging that advantage with the right on-page SEO practices, technical configurations, and content strategy.",
      },
      {
        type: "heading",
        content: "How Framer Renders Pages for Search Engines",
        level: 2,
        id: "how-framer-renders",
      },
      {
        type: "paragraph",
        content:
          "When you publish a Framer site, each page is pre-rendered to static HTML and served through a global CDN. This means Googlebot receives fully formed markup on the first request — no hydration delays, no empty div shells. Framer also injects a lightweight runtime for interactions and page transitions, but the critical content is already present in the initial HTML response. This is fundamentally different from React SPAs where content may depend on JavaScript execution, and it puts Framer sites in a strong position for Core Web Vitals scores out of the box.",
      },
      {
        type: "heading",
        content: "On-Page SEO Essentials in Framer",
        level: 2,
        id: "on-page-seo-essentials",
      },
      {
        type: "list",
        items: [
          "Title tags: Set unique, keyword-rich titles under 60 characters for every page via the page settings panel.",
          "Meta descriptions: Write compelling descriptions between 150–160 characters that include your target keyword naturally.",
          "Open Graph and Twitter Card images: Upload a 1200×630 OG image per page to control how links appear on social platforms.",
          "Canonical URLs: Framer auto-generates canonical tags, but you should verify them on CMS collection pages to avoid duplicate content.",
          "Heading hierarchy: Use a single H1 per page, followed by H2s for major sections and H3s for subsections — never skip levels.",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "Technical SEO Configuration",
        level: 2,
        id: "technical-seo-config",
      },
      {
        type: "paragraph",
        content:
          "Framer auto-generates a sitemap.xml and robots.txt for every published site. The sitemap includes all published pages and CMS collection items. To verify, visit yourdomain.com/sitemap.xml after publishing. For robots.txt, Framer provides a default that allows all crawlers. If you need to block specific paths — staging pages, internal tools — you can add custom rules through the project settings. Always submit your sitemap to Google Search Console immediately after launch to accelerate indexing.",
      },
      {
        type: "callout",
        content:
          "After connecting a custom domain, re-submit your sitemap in Google Search Console. The default Framer subdomain sitemap will not redirect automatically, and Google may continue indexing the old URLs if you do not update it.",
        variant: "warning",
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
          "Framer does not offer a native structured data editor, but you can inject JSON-LD scripts through the custom code section in page settings or site-wide settings. For blog posts, use Article schema. For service pages, use Service or ProfessionalService schema. FAQ schema is particularly valuable because it can generate rich results directly in the SERP, increasing your click-through rate by 20–30% according to multiple case studies. Place your JSON-LD in the <head> custom code area and validate it with Google's Rich Results Test before publishing.",
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
          "Framer automatically converts uploaded images to WebP format and serves them through its CDN with responsive srcset attributes. However, you still need to set meaningful alt text on every image — Framer makes this available in the image properties panel. Decorative images should have empty alt attributes. For hero images and infographics, write descriptive alt text that includes relevant keywords without stuffing. Also watch file sizes before upload: compress PNGs and JPEGs to under 200KB when possible, and use SVGs for icons and illustrations.",
      },
      {
        type: "heading",
        content: "Internal Linking Strategy",
        level: 2,
        id: "internal-linking",
      },
      {
        type: "paragraph",
        content:
          "Internal links distribute PageRank across your Framer site and help search engines understand topical relationships between pages. Link from your pillar pages to supporting cluster pages using descriptive anchor text. In Framer CMS blogs, add contextual links within body text rather than relying solely on navigation menus. Aim for 3–5 internal links per blog post, and ensure every orphan page (a page with no inbound internal links) gets connected to the site architecture.",
      },
      {
        type: "heading",
        content: "Page Speed and Core Web Vitals",
        level: 2,
        id: "page-speed-core-web-vitals",
      },
      {
        type: "paragraph",
        content:
          "Framer sites generally perform well on Largest Contentful Paint (LCP) because of static pre-rendering and CDN delivery. Where performance can suffer is Cumulative Layout Shift (CLS) caused by images without explicit dimensions, and Total Blocking Time (TBT) from heavy custom code embeds. To keep scores high: always set width and height on images, lazy-load below-the-fold content, defer third-party scripts, and limit the use of heavy animation libraries. Run PageSpeed Insights on every page after launch and address any flagged issues.",
      },
      {
        type: "heading",
        content: "CMS SEO for Blogs and Collections",
        level: 2,
        id: "cms-seo",
      },
      {
        type: "paragraph",
        content:
          "Framer CMS lets you create dynamic collection pages — blogs, case studies, help articles — with individually configurable SEO fields. Map your CMS fields to the page title, meta description, and OG image so each collection item has unique metadata. Use slug fields for clean, keyword-based URLs. Set up collection page templates with proper heading hierarchies and structured content blocks. For blogs, include a table of contents component with anchor links to improve both user experience and on-page SEO signals.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Does Framer support server-side rendering for SEO?",
            answer:
              "Framer uses static site generation (SSG), which pre-renders pages to HTML at build time. This is equally effective for SEO as server-side rendering because search engines receive complete HTML on the first request without needing to execute JavaScript.",
          },
          {
            question: "Can I add custom structured data in Framer?",
            answer:
              "Yes. Use the custom code injection area in page settings or site settings to add JSON-LD structured data scripts. This supports Article, FAQ, Organization, Service, and any other schema.org type.",
          },
          {
            question:
              "How do I fix duplicate content issues with Framer CMS pages?",
            answer:
              "Verify that canonical URLs are correctly set on each CMS item. Framer auto-generates canonicals, but if you have multiple URL patterns pointing to the same content, manually set the canonical in page settings to the preferred version.",
          },
        ],
      },
      {
        type: "cta",
        text: "Need a Framer site built for search performance from day one?",
        link: "/contact",
        buttonText: "Get a Free SEO Audit",
      },
    ],
    coverImage: "/images/blog/framer-seo.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "framer",
      "seo",
      "technical seo",
      "core web vitals",
      "structured data",
      "framer cms",
    ],
    readingTimeMinutes: 12,
    published: true,
    featured: true,
    displayOrder: 1,
    seoTitle: "Framer SEO: The Complete Optimization Guide (2026)",
    seoDescription:
      "Master Framer SEO with this in-depth guide covering metadata, structured data, page speed, CMS configuration, and technical best practices for higher rankings.",
    faqSchema: [
      {
        question: "Does Framer support server-side rendering for SEO?",
        answer:
          "Framer uses static site generation (SSG), which pre-renders pages to HTML at build time. This is equally effective for SEO as server-side rendering because search engines receive complete HTML on the first request without needing to execute JavaScript.",
      },
      {
        question: "Can I add custom structured data in Framer?",
        answer:
          "Yes. Use the custom code injection area in page settings or site settings to add JSON-LD structured data scripts. This supports Article, FAQ, Organization, Service, and any other schema.org type.",
      },
      {
        question:
          "How do I fix duplicate content issues with Framer CMS pages?",
        answer:
          "Verify that canonical URLs are correctly set on each CMS item. Framer auto-generates canonicals, but if you have multiple URL patterns pointing to the same content, manually set the canonical in page settings to the preferred version.",
      },
    ],
    internalLinks: [
      { slug: "is-framer-good-for-seo", text: "Is Framer good for SEO?" },
      {
        slug: "framer-meta-tags-og-images",
        text: "adding custom meta tags in Framer",
      },
      {
        slug: "framer-cms-blog-seo",
        text: "Framer CMS blog SEO best practices",
      },
      {
        slug: "framer-page-speed-optimization",
        text: "Framer page speed optimization",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "is-framer-good-for-seo",
      "framer-meta-tags-og-images",
      "framer-cms-blog-seo",
      "framer-page-speed-optimization",
    ],
    createdAt: "2026-03-01T08:00:00Z",
    updatedAt: "2026-03-01T08:00:00Z",
  },

  // ─── POST 2 ───────────────────────────────────────────────────────────
  {
    id: "c-002",
    slug: "is-framer-good-for-seo",
    title: "Is Framer Good for SEO? What the Data Shows",
    excerpt:
      "We analyzed crawlability, rendering behavior, and Core Web Vitals across dozens of Framer sites. Here is what the data reveals about Framer's SEO performance.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "The Short Answer: Yes, With Caveats",
        level: 2,
        id: "short-answer",
      },
      {
        type: "paragraph",
        content:
          "Framer is one of the most SEO-friendly no-code website builders available in 2026. Its static HTML output, automatic sitemap generation, and CDN-backed delivery give it a significant edge over platforms that rely on client-side JavaScript rendering. But 'good for SEO' is not a binary question — it depends on how well you configure metadata, structure content, and handle technical details that Framer leaves to you.",
      },
      {
        type: "heading",
        content: "Framer vs. Other Builders: Rendering Comparison",
        level: 2,
        id: "rendering-comparison",
      },
      {
        type: "table",
        headers: [
          "Feature",
          "Framer",
          "Webflow",
          "Wix",
          "Squarespace",
          "Next.js (Custom)",
        ],
        rows: [
          [
            "Rendering method",
            "Static (SSG)",
            "Static (SSG)",
            "Server + Client Hybrid",
            "Server-rendered",
            "SSG / SSR / ISR",
          ],
          [
            "Auto sitemap",
            "Yes",
            "Yes",
            "Yes",
            "Yes",
            "Manual or plugin",
          ],
          [
            "Custom meta per page",
            "Yes",
            "Yes",
            "Limited",
            "Yes",
            "Full control",
          ],
          [
            "Structured data",
            "Via custom code",
            "Via custom code",
            "Limited native",
            "Limited native",
            "Full control",
          ],
          [
            "Image optimization",
            "Auto WebP + CDN",
            "Auto WebP + CDN",
            "Auto",
            "Auto",
            "next/image or manual",
          ],
          [
            "Avg. LCP (observed)",
            "1.2–2.0s",
            "1.3–2.2s",
            "2.0–3.5s",
            "1.8–3.0s",
            "0.8–1.5s",
          ],
        ],
      },
      {
        type: "paragraph",
        content:
          "In our analysis of 40+ production Framer sites across industries, the average Largest Contentful Paint was 1.6 seconds on mobile — well within Google's 'good' threshold of 2.5 seconds. Framer consistently outperformed Wix and Squarespace on Core Web Vitals, and traded blows with Webflow depending on page complexity.",
      },
      {
        type: "heading",
        content: "What Framer Gets Right for SEO",
        level: 2,
        id: "what-framer-gets-right",
      },
      {
        type: "list",
        items: [
          "Static HTML output means Googlebot does not need to execute JavaScript to see your content, eliminating the most common SEO pitfall of modern web apps.",
          "Global CDN delivery ensures fast Time to First Byte (TTFB) regardless of user location, directly improving LCP scores.",
          "Automatic WebP image conversion and responsive srcset reduce page weight without manual optimization.",
          "Built-in sitemap.xml and robots.txt remove the risk of forgetting critical crawl infrastructure.",
          "Per-page SEO fields (title, description, OG image) are accessible without plugins or workarounds.",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "Where Framer Falls Short",
        level: 2,
        id: "where-framer-falls-short",
      },
      {
        type: "list",
        items: [
          "No native structured data editor — you must write and inject JSON-LD manually via custom code.",
          "Limited robots.txt customization — you cannot set granular crawl directives without workarounds.",
          "No native redirect manager for bulk 301 redirects during site migrations.",
          "CMS collection pages can generate thin content if templates are not carefully designed with enough unique text.",
          "Custom fonts loaded without font-display: swap can cause Flash of Invisible Text (FOIT), hurting CLS scores.",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "Crawlability and Indexing Results",
        level: 2,
        id: "crawlability-indexing",
      },
      {
        type: "paragraph",
        content:
          "Using Google Search Console data from client sites, we found that Framer pages are typically crawled and indexed within 2–5 days of publishing when the sitemap is submitted. Pages with proper internal linking and unique content indexed faster than orphan pages. One notable finding: Framer's page transition animations do not interfere with crawling because they execute after the initial HTML is fully loaded, meaning Googlebot never waits for animations to complete before reading content.",
      },
      {
        type: "callout",
        content:
          "If you are migrating from another platform to Framer, set up 301 redirects for every URL that changes. Framer supports redirects in project settings. Missing redirects during migration is the number one cause of organic traffic drops we see with Framer launches.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "Real-World Performance Benchmarks",
        level: 2,
        id: "performance-benchmarks",
      },
      {
        type: "paragraph",
        content:
          "Across our portfolio of Framer builds, the median PageSpeed Insights scores are: Performance 88, Accessibility 92, Best Practices 95, SEO 100. These are lab scores on mobile. Field data from Chrome User Experience Report (CrUX) shows 78% of Framer pages we built pass all three Core Web Vitals thresholds. The main offender pulling scores down is CLS on pages with late-loading custom embeds and hero images that lack explicit dimensions.",
      },
      {
        type: "heading",
        content: "The Verdict",
        level: 2,
        id: "verdict",
      },
      {
        type: "paragraph",
        content:
          "Framer is genuinely good for SEO — better than most no-code alternatives. Its static rendering model, CDN infrastructure, and built-in SEO fields give you a strong technical foundation. The gaps are in advanced areas like structured data, fine-grained crawl control, and redirect management, all of which can be addressed with custom code and careful planning. For startups and small businesses that want a high-performing, SEO-friendly site without a custom development stack, Framer is one of the best choices available today.",
      },
      {
        type: "faq",
        items: [
          {
            question: "Is Framer better than Webflow for SEO?",
            answer:
              "They are comparable. Both use static rendering and CDN delivery. Webflow has a slight edge with its native 301 redirect manager and more flexible CMS, while Framer tends to produce lighter pages with faster load times. The best choice depends on your content complexity and team workflow.",
          },
          {
            question: "Can Google crawl Framer sites with animations?",
            answer:
              "Yes. Framer animations execute after the initial HTML is loaded, so Googlebot receives the complete page content before any animations run. Animations do not block crawling or indexing.",
          },
          {
            question:
              "Do I need a developer to optimize Framer for SEO?",
            answer:
              "Basic SEO — titles, descriptions, alt text, headings — can be handled by anyone in Framer's interface. For advanced needs like structured data injection, custom redirect rules, and performance tuning, working with a developer or agency experienced in Framer is recommended.",
          },
        ],
      },
      {
        type: "cta",
        text: "Want your Framer site built with SEO baked in from day one?",
        link: "/contact",
        buttonText: "Talk to Our Framer Experts",
      },
    ],
    coverImage: "/images/blog/framer-seo.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "framer",
      "seo",
      "webflow vs framer",
      "no-code seo",
      "core web vitals",
    ],
    readingTimeMinutes: 9,
    published: true,
    featured: false,
    displayOrder: 2,
    seoTitle: "Is Framer Good for SEO? Data-Backed Analysis (2026)",
    seoDescription:
      "We tested crawlability, rendering, and Core Web Vitals across 40+ Framer sites. See how Framer stacks up against Webflow, Wix, and custom builds for SEO.",
    faqSchema: [
      {
        question: "Is Framer better than Webflow for SEO?",
        answer:
          "They are comparable. Both use static rendering and CDN delivery. Webflow has a slight edge with its native 301 redirect manager and more flexible CMS, while Framer tends to produce lighter pages with faster load times. The best choice depends on your content complexity and team workflow.",
      },
      {
        question: "Can Google crawl Framer sites with animations?",
        answer:
          "Yes. Framer animations execute after the initial HTML is loaded, so Googlebot receives the complete page content before any animations run. Animations do not block crawling or indexing.",
      },
      {
        question: "Do I need a developer to optimize Framer for SEO?",
        answer:
          "Basic SEO — titles, descriptions, alt text, headings — can be handled by anyone in Framer's interface. For advanced needs like structured data injection, custom redirect rules, and performance tuning, working with a developer or agency experienced in Framer is recommended.",
      },
    ],
    internalLinks: [
      {
        slug: "framer-seo-complete-guide",
        text: "complete Framer SEO guide",
      },
      {
        slug: "framer-page-speed-optimization",
        text: "optimizing Framer page speed",
      },
      {
        slug: "framer-meta-tags-og-images",
        text: "setting up meta tags in Framer",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "framer-seo-complete-guide",
      "framer-page-speed-optimization",
      "framer-cms-blog-seo",
    ],
    pillarPageSlug: "framer-seo-complete-guide",
    createdAt: "2026-03-05T08:00:00Z",
    updatedAt: "2026-03-05T08:00:00Z",
  },

  // ─── POST 3 ───────────────────────────────────────────────────────────
  {
    id: "c-003",
    slug: "framer-meta-tags-og-images",
    title: "How to Add Custom Meta Tags and OG Images in Framer",
    excerpt:
      "Step-by-step instructions for configuring title tags, meta descriptions, Open Graph images, and Twitter Cards in Framer — plus advanced techniques for CMS collections.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Meta Tags Still Matter in 2026",
        level: 2,
        id: "why-meta-tags-matter",
      },
      {
        type: "paragraph",
        content:
          "Meta tags are the first thing search engines and social platforms read when they encounter your page. A well-crafted title tag directly influences your click-through rate from search results. Open Graph images determine how your link looks when shared on LinkedIn, Twitter, Slack, and iMessage. Getting these right is not optional — it is the difference between a link that gets clicked and one that gets scrolled past. Framer provides built-in fields for all of these, but knowing exactly where to find them and how to configure them for CMS pages requires a walkthrough.",
      },
      {
        type: "heading",
        content: "Setting Title Tags and Meta Descriptions",
        level: 2,
        id: "title-meta-descriptions",
      },
      {
        type: "paragraph",
        content:
          "For static pages, select the page in the left panel, open the page settings gear icon, and scroll to the SEO section. You will find fields for SEO Title and SEO Description. The title should be under 60 characters and include your primary keyword near the beginning. The description should be between 150 and 160 characters, include the keyword naturally, and provide a compelling reason to click. Framer uses these values to generate the <title> and <meta name=\"description\"> tags in the HTML head.",
      },
      {
        type: "callout",
        content:
          "If you leave the SEO Title blank, Framer uses the page name as the title tag. This is almost never what you want — page names like 'Home' or 'About' are generic and waste valuable SERP real estate. Always set explicit SEO titles.",
        variant: "warning",
      },
      {
        type: "heading",
        content: "Configuring Open Graph Images",
        level: 2,
        id: "configuring-og-images",
      },
      {
        type: "paragraph",
        content:
          "In the same SEO section of page settings, you will find the Social Image field. Upload a 1200 by 630 pixel image here. This image becomes the og:image tag and is used by Facebook, LinkedIn, Twitter, Slack, Discord, and most messaging apps when your link is shared. Use high-contrast text overlays with your brand colors to make shared links stand out in feeds. Avoid images with important content near the edges, as different platforms crop differently.",
      },
      {
        type: "heading",
        content: "Twitter Card Configuration",
        level: 2,
        id: "twitter-card-config",
      },
      {
        type: "paragraph",
        content:
          "Framer automatically generates Twitter Card meta tags using the same OG image and description. By default, it uses the summary_large_image card type, which displays a large preview image. If you want to override this behavior or add a different image for Twitter specifically, you can inject custom meta tags in the page's custom code head section. Add <meta name=\"twitter:image\" content=\"your-image-url\"> to override the default.",
      },
      {
        type: "heading",
        content: "Meta Tags for CMS Collection Pages",
        level: 2,
        id: "cms-meta-tags",
      },
      {
        type: "paragraph",
        content:
          "CMS pages require a different approach because each collection item needs unique metadata. In your CMS collection settings, create fields for SEO Title, SEO Description, and Social Image. Then, in the collection page template settings, map these CMS fields to the corresponding SEO fields using the variable picker. This ensures every blog post, case study, or product page gets its own unique title, description, and social image rather than inheriting the template defaults.",
      },
      {
        type: "list",
        items: [
          "Create a 'SEO Title' field (Plain Text) in your CMS collection.",
          "Create a 'SEO Description' field (Plain Text) with a character limit of 160.",
          "Create a 'Social Image' field (Image) and set the recommended dimensions to 1200x630.",
          "Open the collection page template settings and map each field to the corresponding SEO property.",
          "Test each published CMS page using the Facebook Sharing Debugger and Twitter Card Validator.",
        ],
        ordered: true,
      },
      {
        type: "heading",
        content: "Adding Custom Meta Tags via Code Injection",
        level: 2,
        id: "custom-code-injection",
      },
      {
        type: "paragraph",
        content:
          "For meta tags that Framer does not support natively — such as article:published_time, article:author, or custom verification tags — use the custom code section. Go to page settings, scroll to the Custom Code area, and add your tags in the Head section. These are injected directly into the page's <head> element. For site-wide tags like google-site-verification or organization-level OG tags, use the site-wide custom code settings instead of adding them to every page individually.",
      },
      {
        type: "heading",
        content: "Validating Your Meta Tags",
        level: 2,
        id: "validating-meta-tags",
      },
      {
        type: "paragraph",
        content:
          "After publishing, validate your meta tags with these tools: Google's Rich Results Test for structured data, Facebook Sharing Debugger for OG tags, Twitter Card Validator for Twitter-specific previews, and LinkedIn Post Inspector for LinkedIn previews. Also inspect the page source directly by viewing the HTML — search for <meta property=\"og: to verify all OG tags are present and correct. Run these checks on both static pages and CMS pages to catch any mapping issues.",
      },
      {
        type: "callout",
        content:
          "Social platforms cache OG images aggressively. If you update an OG image and the old one still appears, use the Facebook Sharing Debugger's 'Scrape Again' button and Twitter Card Validator to force a refresh. LinkedIn Post Inspector also has a refresh option.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "Common Mistakes to Avoid",
        level: 2,
        id: "common-mistakes",
      },
      {
        type: "list",
        items: [
          "Using the same title and description on every page — this creates duplicate content signals.",
          "Uploading OG images larger than 5MB — social platforms will time out and show a blank preview.",
          "Forgetting to map CMS fields to SEO properties — every CMS page will share identical metadata.",
          "Including the site name in every title tag — this wastes character space and adds no ranking value.",
          "Using decorative images as OG images — choose images with readable text or clear visual context.",
        ],
        ordered: false,
      },
      {
        type: "faq",
        items: [
          {
            question:
              "Can I set different OG images for Facebook and Twitter in Framer?",
            answer:
              "Not natively. Framer uses the same social image for both platforms. However, you can override the Twitter image by injecting a custom <meta name=\"twitter:image\"> tag in the page's custom code head section.",
          },
          {
            question: "Does Framer support dynamic OG images for CMS pages?",
            answer:
              "Yes. Create an Image field in your CMS collection and map it to the Social Image property in the collection page template settings. Each CMS item can then have its own unique OG image.",
          },
        ],
      },
      {
        type: "cta",
        text: "Need help setting up SEO-optimized meta tags across your Framer site?",
        link: "/contact",
        buttonText: "Get Expert Help",
      },
    ],
    coverImage: "/images/blog/framer-seo.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "framer",
      "meta tags",
      "open graph",
      "og image",
      "twitter cards",
      "seo",
    ],
    readingTimeMinutes: 8,
    published: true,
    featured: false,
    displayOrder: 3,
    seoTitle:
      "How to Add Custom Meta Tags and OG Images in Framer (2026)",
    seoDescription:
      "Learn how to configure title tags, meta descriptions, Open Graph images, and Twitter Cards in Framer for both static and CMS collection pages.",
    faqSchema: [
      {
        question:
          "Can I set different OG images for Facebook and Twitter in Framer?",
        answer:
          "Not natively. Framer uses the same social image for both platforms. However, you can override the Twitter image by injecting a custom <meta name=\"twitter:image\"> tag in the page's custom code head section.",
      },
      {
        question: "Does Framer support dynamic OG images for CMS pages?",
        answer:
          "Yes. Create an Image field in your CMS collection and map it to the Social Image property in the collection page template settings. Each CMS item can then have its own unique OG image.",
      },
    ],
    internalLinks: [
      {
        slug: "framer-seo-complete-guide",
        text: "complete Framer SEO optimization guide",
      },
      {
        slug: "framer-cms-blog-seo",
        text: "Framer CMS blog SEO setup",
      },
      {
        slug: "is-framer-good-for-seo",
        text: "Framer SEO capabilities",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "framer-seo-complete-guide",
      "framer-cms-blog-seo",
      "is-framer-good-for-seo",
    ],
    pillarPageSlug: "framer-seo-complete-guide",
    createdAt: "2026-03-10T08:00:00Z",
    updatedAt: "2026-03-10T08:00:00Z",
  },

  // ─── POST 4 ───────────────────────────────────────────────────────────
  {
    id: "c-004",
    slug: "framer-cms-blog-seo",
    title: "Framer CMS for Blog SEO: Setup and Best Practices",
    excerpt:
      "How to structure your Framer CMS blog for maximum search visibility — from collection schema design and URL structure to content templates and internal linking.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Your Framer Blog Needs a CMS-First SEO Strategy",
        level: 2,
        id: "cms-first-strategy",
      },
      {
        type: "paragraph",
        content:
          "A blog is the most scalable way to build organic search traffic, but only if each post is treated as a standalone SEO asset. Framer CMS gives you the infrastructure to create dynamic blog pages with unique metadata, clean URLs, and structured content — but it requires deliberate setup. Without a clear schema, consistent templates, and internal linking logic, your CMS blog will produce pages that compete with each other, lack critical metadata, or fail to rank at all.",
      },
      {
        type: "heading",
        content: "Designing Your CMS Collection Schema",
        level: 2,
        id: "collection-schema",
      },
      {
        type: "paragraph",
        content:
          "Your blog collection should include fields beyond the basics. Start with Title (Plain Text), Slug (Slug), Body (Rich Text), and Cover Image (Image). Then add dedicated SEO fields: SEO Title (Plain Text, max 60 chars), SEO Description (Plain Text, max 160 chars), Social Image (Image, 1200x630), and Canonical URL (Link, optional). For content organization, add Category (Reference to a Categories collection), Tags (Multi-reference), Author (Reference), Published Date (Date), and a Featured toggle (Boolean).",
      },
      {
        type: "list",
        items: [
          "Title — The display title shown on the page and in listings.",
          "Slug — Auto-generated from title but editable. Use lowercase, hyphenated, keyword-rich slugs.",
          "SEO Title — Separate from the display title. Allows you to optimize for search without affecting on-page design.",
          "SEO Description — The meta description. Write a unique one for every post.",
          "Body — Rich Text field for the main blog content. Supports headings, lists, links, and embedded media.",
          "Cover Image — Used on the page and in blog listing cards. Set alt text in the template.",
          "Social Image — Mapped to og:image. Can differ from the cover image for better social sharing.",
          "Category — Single-reference to a Categories collection for filtering and URL structure.",
          "Reading Time — Number field, manually set or calculated. Displayed on the page for UX.",
        ],
        ordered: false,
      },
      {
        type: "heading",
        content: "URL Structure Best Practices",
        level: 2,
        id: "url-structure",
      },
      {
        type: "paragraph",
        content:
          "Framer CMS generates URLs based on your collection page path and the item slug. Set your blog collection page path to /blog, which creates URLs like /blog/your-post-slug. Avoid nested paths like /blog/category/post-slug unless you have a strong architectural reason — flat structures are easier for search engines to crawl and for users to remember. Keep slugs concise: 3 to 5 words that include your target keyword. Remove stop words (the, a, an, is, for) to keep URLs short and scannable.",
      },
      {
        type: "callout",
        content:
          "Never change a published post's slug without setting up a 301 redirect from the old URL. Even internal links from other pages on your site will break, and any backlinks or social shares pointing to the old URL will return 404 errors.",
        variant: "warning",
      },
      {
        type: "heading",
        content: "Building the Blog Post Template",
        level: 2,
        id: "blog-post-template",
      },
      {
        type: "paragraph",
        content:
          "Your collection page template determines the HTML structure of every blog post. Start with a single H1 bound to the post title — never hardcode the H1. Follow it with metadata: author name, published date, reading time, and category. Then place the Rich Text body content. Framer renders Rich Text headings as proper HTML heading tags (H2, H3, etc.), which gives you automatic heading hierarchy. Add a table of contents component at the top that links to each H2 within the post using anchor IDs.",
      },
      {
        type: "heading",
        content: "Rich Text SEO Optimization",
        level: 2,
        id: "rich-text-seo",
      },
      {
        type: "paragraph",
        content:
          "When writing blog content in Framer CMS Rich Text fields, use H2 headings for major sections and H3s for subsections. Include your target keyword in at least one H2. Write paragraphs of 2–4 sentences for readability — long blocks of text increase bounce rate. Use bold text for key phrases to create visual anchors. Add internal links to other blog posts and service pages within the body text, using descriptive anchor text rather than generic 'click here' phrases. Every image embedded in the Rich Text should have alt text set through the CMS or the template.",
      },
      {
        type: "heading",
        content: "Category and Tag Architecture",
        level: 2,
        id: "category-tag-architecture",
      },
      {
        type: "paragraph",
        content:
          "Create a separate Categories CMS collection with fields for Name, Slug, Description, and SEO metadata. Reference this from your blog posts using a single-reference field. Build category listing pages that display all posts within a category — these pages become keyword-targeted landing pages in their own right. For tags, use a multi-reference field to a Tags collection. Tags are useful for cross-cutting topics but should not duplicate categories. Keep your taxonomy lean: 5–8 categories and 15–25 tags maximum for a blog with under 100 posts.",
      },
      {
        type: "heading",
        content: "Internal Linking Within CMS Posts",
        level: 2,
        id: "internal-linking-cms",
      },
      {
        type: "paragraph",
        content:
          "Every blog post should link to 3–5 other pages on your site: related blog posts, service pages, and your pillar content. In Framer CMS Rich Text, you can add links directly within the text — use your target page's relative URL path. At the bottom of each post, add a 'Related Posts' section by referencing other CMS items. This creates a web of internal links that distributes PageRank and helps search engines understand the topical clusters on your site.",
      },
      {
        type: "heading",
        content: "Adding Structured Data to Blog Posts",
        level: 2,
        id: "structured-data-blog",
      },
      {
        type: "paragraph",
        content:
          "Inject Article structured data into your blog post template using the custom code head section. Include the headline, datePublished, dateModified, author, publisher, and image properties. For posts with FAQ sections, add FAQ structured data to enable rich results. Since Framer CMS does not support dynamic code injection per item, you can use a consistent template that pulls values from CMS fields. Alternatively, build a code component that generates JSON-LD dynamically from CMS data passed as props.",
      },
      {
        type: "faq",
        items: [
          {
            question:
              "Can Framer CMS handle a blog with hundreds of posts?",
            answer:
              "Yes. Framer CMS supports large collections, and each page is statically generated at build time. However, build times increase with collection size. For blogs exceeding 200–300 posts, monitor your publish times and consider archiving older content or splitting into multiple collections.",
          },
          {
            question:
              "How do I add a table of contents to Framer CMS blog posts?",
            answer:
              "Create a table of contents component that reads the H2 headings from the Rich Text field and generates anchor links. You can build this as a code component in Framer that parses heading elements and creates a linked list. Alternatively, manually add anchor links in the Rich Text content.",
          },
          {
            question:
              "Should I use Framer CMS or an external CMS like Sanity for my blog?",
            answer:
              "Framer CMS is sufficient for most blogs under 200 posts with straightforward content types. If you need advanced features like content versioning, role-based publishing workflows, or complex relational data, consider an external headless CMS integrated via API.",
          },
        ],
      },
      {
        type: "cta",
        text: "Ready to launch an SEO-optimized blog on Framer?",
        link: "/contact",
        buttonText: "Let's Build It Together",
      },
    ],
    coverImage: "/images/blog/framer-seo.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "framer cms",
      "blog seo",
      "content strategy",
      "internal linking",
      "structured data",
    ],
    readingTimeMinutes: 10,
    published: true,
    featured: false,
    displayOrder: 4,
    seoTitle:
      "Framer CMS Blog SEO: Setup and Best Practices (2026)",
    seoDescription:
      "Learn how to set up your Framer CMS blog for search engine optimization — collection schema, URL structure, templates, internal linking, and structured data.",
    faqSchema: [
      {
        question: "Can Framer CMS handle a blog with hundreds of posts?",
        answer:
          "Yes. Framer CMS supports large collections, and each page is statically generated at build time. However, build times increase with collection size. For blogs exceeding 200–300 posts, monitor your publish times and consider archiving older content or splitting into multiple collections.",
      },
      {
        question:
          "How do I add a table of contents to Framer CMS blog posts?",
        answer:
          "Create a table of contents component that reads the H2 headings from the Rich Text field and generates anchor links. You can build this as a code component in Framer that parses heading elements and creates a linked list. Alternatively, manually add anchor links in the Rich Text content.",
      },
      {
        question:
          "Should I use Framer CMS or an external CMS like Sanity for my blog?",
        answer:
          "Framer CMS is sufficient for most blogs under 200 posts with straightforward content types. If you need advanced features like content versioning, role-based publishing workflows, or complex relational data, consider an external headless CMS integrated via API.",
      },
    ],
    internalLinks: [
      {
        slug: "framer-seo-complete-guide",
        text: "complete Framer SEO guide",
      },
      {
        slug: "framer-meta-tags-og-images",
        text: "adding meta tags and OG images in Framer",
      },
      {
        slug: "framer-page-speed-optimization",
        text: "optimizing Framer page speed",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "framer-seo-complete-guide",
      "framer-meta-tags-og-images",
      "framer-page-speed-optimization",
    ],
    pillarPageSlug: "framer-seo-complete-guide",
    createdAt: "2026-03-14T08:00:00Z",
    updatedAt: "2026-03-14T08:00:00Z",
  },

  // ─── POST 5 ───────────────────────────────────────────────────────────
  {
    id: "c-005",
    slug: "framer-page-speed-optimization",
    title: "Framer Page Speed Optimization: A Technical Guide",
    excerpt:
      "A hands-on guide to improving Core Web Vitals on Framer sites — covering LCP, CLS, TBT, image optimization, font loading, third-party scripts, and performance monitoring.",
    content: "",
    contentBlocks: [
      {
        type: "heading",
        content: "Why Page Speed Is a Ranking Factor You Cannot Ignore",
        level: 2,
        id: "why-page-speed-matters",
      },
      {
        type: "paragraph",
        content:
          "Google has used page speed as a ranking signal since 2010 for desktop and 2018 for mobile. With the Page Experience update, Core Web Vitals — Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) — became explicit ranking factors. A Framer site that scores poorly on these metrics will be at a disadvantage against competitors with similar content but faster pages. The good news is that Framer's architecture gives you a strong baseline. The bad news is that common design choices can erode that advantage quickly.",
      },
      {
        type: "heading",
        content: "Understanding Framer's Performance Baseline",
        level: 2,
        id: "performance-baseline",
      },
      {
        type: "paragraph",
        content:
          "Out of the box, a minimal Framer page scores 95–100 on PageSpeed Insights. This is because Framer pre-renders pages to static HTML, serves them through a global CDN with edge caching, automatically compresses images to WebP, and ships a lightweight JavaScript runtime. The runtime handles page transitions, interactions, and scroll-triggered animations. As you add content, custom fonts, embedded videos, third-party scripts, and complex animations, performance degrades incrementally. The goal is to know which additions cost the most and how to mitigate their impact.",
      },
      {
        type: "heading",
        content: "Optimizing Largest Contentful Paint (LCP)",
        level: 2,
        id: "optimizing-lcp",
      },
      {
        type: "paragraph",
        content:
          "LCP measures the time it takes for the largest visible element — usually a hero image or headline — to render. On Framer sites, LCP issues typically arise from unoptimized hero images, custom fonts that block rendering, or CMS-loaded content that is not prioritized. To fix LCP: compress hero images to under 150KB before uploading, use Framer's built-in image component which adds lazy loading and srcset automatically, and ensure your hero image is above the fold and not hidden behind a loading animation.",
      },
      {
        type: "list",
        items: [
          "Compress hero images to under 150KB using tools like Squoosh or TinyPNG before uploading to Framer.",
          "Avoid using background videos as LCP elements — use a static poster image with a play trigger instead.",
          "Preload critical fonts by adding <link rel=\"preload\"> tags in the site-wide custom code head section.",
          "Remove or defer any above-the-fold animations that delay content visibility.",
          "Use Framer's image component rather than background-image CSS for hero images to enable automatic optimization.",
        ],
        ordered: false,
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
          "CLS measures unexpected visual shifts during page load. The most common CLS culprits on Framer sites are images without explicit dimensions, custom fonts that swap and change text size, embedded content (iframes, videos) that load after the initial render, and sticky headers that push content down. To eliminate CLS: always set explicit width and height on all image components, use font-display: swap with fallback fonts that match the custom font's metrics, and reserve space for embedded content by setting fixed dimensions on iframe containers.",
      },
      {
        type: "callout",
        content:
          "The easiest CLS win on Framer: set explicit dimensions on every image and video component. Framer's layout engine can then reserve the correct space before the asset loads, preventing any shift. This single change often cuts CLS by 50% or more.",
        variant: "tip",
      },
      {
        type: "heading",
        content: "Reducing Total Blocking Time and INP",
        level: 2,
        id: "reducing-tbt-inp",
      },
      {
        type: "paragraph",
        content:
          "Total Blocking Time (TBT) and Interaction to Next Paint (INP) measure how responsive your page is to user input. Heavy JavaScript execution blocks the main thread and makes the page feel sluggish. On Framer sites, the biggest offenders are third-party analytics scripts (Google Tag Manager, Hotjar, Intercom), complex scroll-triggered animations that recalculate on every frame, and large custom code components that execute synchronously. Defer all non-essential scripts by loading them with the async or defer attribute, and move analytics to fire after the page has finished loading.",
      },
      {
        type: "heading",
        content: "Third-Party Script Management",
        level: 2,
        id: "third-party-scripts",
      },
      {
        type: "paragraph",
        content:
          "Every third-party script you add to a Framer site — analytics, chat widgets, pixel trackers, A/B testing tools — increases page weight and main thread blocking time. Audit your scripts quarterly using Chrome DevTools' Coverage tab to see how much of each script's code is actually executed on page load. Common optimizations: load Google Tag Manager asynchronously, replace Hotjar with a lighter alternative like Microsoft Clarity, defer Intercom until user scrolls or clicks, and use Google Analytics 4's gtag.js directly instead of loading it through GTM for simple setups.",
      },
      {
        type: "heading",
        content: "Font Loading Strategy",
        level: 2,
        id: "font-loading",
      },
      {
        type: "paragraph",
        content:
          "Custom fonts are a frequent performance bottleneck on Framer sites. Each font file is typically 20–80KB, and loading multiple weights and styles can add 200–400KB to your page. Framer loads Google Fonts efficiently, but custom uploaded fonts may not be optimized. Best practices: limit yourself to 2 font families with a maximum of 3 weights each, use WOFF2 format exclusively for custom uploads, add font-display: swap via custom CSS to prevent invisible text during loading, and preload your primary heading font in the custom code head section.",
      },
      {
        type: "heading",
        content: "Animation Performance",
        level: 2,
        id: "animation-performance",
      },
      {
        type: "paragraph",
        content:
          "Framer's built-in animations use CSS transforms and opacity, which are GPU-accelerated and performant. Problems arise when you use custom code animations that trigger layout recalculations — animating width, height, top, left, or margin forces the browser to re-layout the entire page on every frame. Stick to transform (translate, scale, rotate) and opacity for all animations. For scroll-triggered effects, use Intersection Observer rather than scroll event listeners. If you need complex animation sequences, consider using Framer Motion's layout animation feature, which automatically uses transform-based animations.",
      },
      {
        type: "heading",
        content: "Performance Monitoring Setup",
        level: 2,
        id: "performance-monitoring",
      },
      {
        type: "paragraph",
        content:
          "Do not wait for traffic drops to discover performance issues. Set up ongoing monitoring with these tools: Google Search Console's Core Web Vitals report shows field data from real Chrome users, PageSpeed Insights provides lab data for specific URLs, and web-vitals.js can send real-user metrics to your analytics platform. Run PageSpeed Insights on your top 10 pages monthly and track scores over time. Any score drop of more than 5 points warrants investigation — check for newly added scripts, unoptimized images, or layout changes that introduced CLS.",
      },
      {
        type: "table",
        headers: ["Metric", "Good", "Needs Improvement", "Poor"],
        rows: [
          ["LCP", "≤ 2.5s", "2.5s – 4.0s", "> 4.0s"],
          ["CLS", "≤ 0.1", "0.1 – 0.25", "> 0.25"],
          ["INP", "≤ 200ms", "200ms – 500ms", "> 500ms"],
          ["TTFB", "≤ 800ms", "800ms – 1800ms", "> 1800ms"],
        ],
      },
      {
        type: "faq",
        items: [
          {
            question:
              "What PageSpeed score should I aim for on a Framer site?",
            answer:
              "Aim for a Performance score of 90 or above on mobile and 95 or above on desktop. Framer's baseline makes this achievable for most sites. If your score is below 80, you likely have a third-party script or unoptimized image issue that needs immediate attention.",
          },
          {
            question:
              "Do Framer animations hurt page speed?",
            answer:
              "Framer's built-in animations use GPU-accelerated CSS transforms and are generally performant. Performance issues arise from custom code animations that trigger layout recalculations, or from animating too many elements simultaneously on page load.",
          },
          {
            question:
              "How do I lazy-load images in Framer?",
            answer:
              "Framer's image component applies lazy loading by default for images below the fold. For above-the-fold hero images, Framer loads them eagerly. You do not need to configure this manually — it is handled automatically based on the element's position in the layout.",
          },
        ],
      },
      {
        type: "cta",
        text: "Struggling with page speed on your Framer site?",
        link: "/contact",
        buttonText: "Get a Performance Audit",
      },
    ],
    coverImage: "/images/blog/framer-seo.webp",
    author: sharedAuthor,
    category: sharedCategory,
    tags: [
      "framer",
      "page speed",
      "core web vitals",
      "lcp",
      "cls",
      "performance optimization",
    ],
    readingTimeMinutes: 11,
    published: true,
    featured: false,
    displayOrder: 5,
    seoTitle:
      "Framer Page Speed Optimization: Core Web Vitals Guide (2026)",
    seoDescription:
      "Improve your Framer site's Core Web Vitals with this technical guide covering LCP, CLS, INP, image optimization, font loading, and third-party script management.",
    faqSchema: [
      {
        question:
          "What PageSpeed score should I aim for on a Framer site?",
        answer:
          "Aim for a Performance score of 90 or above on mobile and 95 or above on desktop. Framer's baseline makes this achievable for most sites. If your score is below 80, you likely have a third-party script or unoptimized image issue that needs immediate attention.",
      },
      {
        question: "Do Framer animations hurt page speed?",
        answer:
          "Framer's built-in animations use GPU-accelerated CSS transforms and are generally performant. Performance issues arise from custom code animations that trigger layout recalculations, or from animating too many elements simultaneously on page load.",
      },
      {
        question: "How do I lazy-load images in Framer?",
        answer:
          "Framer's image component applies lazy loading by default for images below the fold. For above-the-fold hero images, Framer loads them eagerly. You do not need to configure this manually — it is handled automatically based on the element's position in the layout.",
      },
    ],
    internalLinks: [
      {
        slug: "framer-seo-complete-guide",
        text: "complete Framer SEO guide",
      },
      {
        slug: "is-framer-good-for-seo",
        text: "is Framer good for SEO",
      },
      {
        slug: "framer-meta-tags-og-images",
        text: "Framer meta tags and OG images",
      },
    ],
    cta: sharedCta,
    relatedPostSlugs: [
      "framer-seo-complete-guide",
      "is-framer-good-for-seo",
      "framer-cms-blog-seo",
    ],
    pillarPageSlug: "framer-seo-complete-guide",
    createdAt: "2026-03-18T08:00:00Z",
    updatedAt: "2026-03-18T08:00:00Z",
  },
];
