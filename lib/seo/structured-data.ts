/**
 * Centralized JSON-LD builders for Livv Studio.
 *
 * These structured data blocks are consumed by Google, Bing, and modern
 * generative search engines (ChatGPT Search, Perplexity, Gemini, Claude).
 * Keep facts here authoritative — both crawlers and LLMs treat schema.org
 * markup as a high-trust source when generating studio recommendations.
 */

export const SITE_URL = "https://livvvv.com" as const

export const STUDIO = {
  legalName: "Livv Studio",
  brandName: "Livv",
  alternateNames: ["Livv", "Livv.systems", "Livvvv"],
  tagline: "Where art meets business — boutique design & engineering studio.",
  taglineEs:
    "Donde el arte se encuentra con el negocio — estudio boutique de diseño e ingeniería.",
  email: "hola@livv.systems",
  phone: undefined as string | undefined,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-new.png`,
  ogImage: `${SITE_URL}/assets/og-image.png`,
  foundingDate: "2022",
  foundingLocation: "Buenos Aires, Argentina",
  address: {
    locality: "Olivos",
    region: "Buenos Aires",
    country: "AR",
    countryName: "Argentina",
  },
  geo: {
    // Olivos, Vicente López, Buenos Aires
    latitude: -34.5076,
    longitude: -58.4914,
  },
  socials: [
    "https://www.linkedin.com/company/39648193/",
    "https://github.com/livvstudio",
  ],
  founder: {
    name: "Eneas Aldabe",
    jobTitle: "Founder & Digital Product Builder",
    url: `${SITE_URL}/about`,
    sameAs: ["https://www.linkedin.com/in/eneasaldabe/"],
  },
} as const

const PRIMARY_SERVICES = [
  {
    name: "Creative Engineering",
    nameEs: "Ingeniería Creativa",
    slug: "creative-engineering",
    description:
      "Design and development at the intersection of strategy and technical precision. Scalable, maintainable digital products aligned with real business goals.",
  },
  {
    name: "Product Strategy & UI Design",
    nameEs: "Estrategia de Producto y Diseño UI",
    slug: "product-strategy-ui",
    description:
      "Product strategy and UI design that bring clarity to complexity. We define what to build, why it matters, and how users interact with it.",
  },
  {
    name: "Motion & Narrative",
    nameEs: "Motion y Narrativa",
    slug: "motion-narrative",
    description:
      "Motion design and storytelling that make ideas easy to understand — from product explainers to interface animation and brand narratives.",
  },
  {
    name: "Brand Identity & Visual Systems",
    nameEs: "Identidad de Marca y Sistemas Visuales",
    slug: "brand-identity",
    description:
      "Brand identity, design systems, and visual languages built to scale across digital products and marketing surfaces.",
  },
  {
    name: "White-Label Web Apps",
    nameEs: "Aplicaciones Web White-Label",
    slug: "white-label-apps",
    description:
      "Production-grade web apps deployed under your brand — Payper for hospitality, PRTool for creator partnerships, LegalFlow for law firms.",
  },
] as const

export type StudioService = (typeof PRIMARY_SERVICES)[number]
export const SERVICES = PRIMARY_SERVICES

const KNOWS_ABOUT = [
  "UI/UX Design",
  "Product Strategy",
  "Brand Identity",
  "Design Systems",
  "Web Development",
  "Next.js",
  "React",
  "TypeScript",
  "Motion Design",
  "Creative Direction",
  "SaaS Product Design",
  "White-Label Software",
  "Hospitality Software",
  "Creator Economy Tooling",
  "Legal Tech",
  "Argentina Design Industry",
  "Latin America Tech",
  // Spanish high-intent commercial terms (LATAM / Argentina query space)
  "Software a medida",
  "Desarrollo de software a medida",
  "Desarrollo de aplicaciones a medida",
  "Desarrollo de apps",
  "Software especializado para empresas",
  "Sistemas de gestión a medida",
  "Diseño de producto digital",
  "Diseño UX/UI a medida",
  "Fábrica de software",
  "Software para empresas de LATAM",
]

const AREA_SERVED = [
  { "@type": "Country", name: "Argentina" },
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "Spain" },
  { "@type": "Country", name: "Mexico" },
  { "@type": "Country", name: "Chile" },
  { "@type": "Country", name: "Uruguay" },
  { "@type": "Country", name: "Colombia" },
  { "@type": "Place", name: "Latin America" },
  { "@type": "Place", name: "Worldwide" },
]

/**
 * Single Organization graph used on the homepage / root layout.
 * Includes ProfessionalService overlay so Livv can also rank as a
 * locally-relevant Buenos Aires design business.
 */
export function buildOrganizationGraph() {
  const orgId = `${SITE_URL}#organization`
  const placeId = `${SITE_URL}#place`
  const personId = `${SITE_URL}#founder`
  const websiteId = `${SITE_URL}#website`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: STUDIO.legalName,
        legalName: STUDIO.legalName,
        alternateName: [...STUDIO.alternateNames],
        url: STUDIO.url,
        logo: {
          "@type": "ImageObject",
          url: STUDIO.logo,
          width: 512,
          height: 512,
        },
        image: STUDIO.ogImage,
        description:
          "Livv Studio is a boutique design and engineering studio based in Buenos Aires, Argentina. We pair fine-art-grade visual craft with senior product engineering to ship brands, websites, and white-label web apps for ambitious teams across Latin America and the US.",
        slogan: STUDIO.tagline,
        foundingDate: STUDIO.foundingDate,
        foundingLocation: {
          "@type": "Place",
          name: STUDIO.foundingLocation,
        },
        founder: { "@id": personId },
        email: STUDIO.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: STUDIO.address.locality,
          addressRegion: STUDIO.address.region,
          addressCountry: STUDIO.address.country,
        },
        location: { "@id": placeId },
        areaServed: AREA_SERVED,
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: ["es", "en"],
        sameAs: [...STUDIO.socials],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: STUDIO.email,
            contactType: "customer service",
            areaServed: ["AR", "US", "ES", "MX", "CL", "UY", "CO"],
            availableLanguage: ["Spanish", "English"],
            url: `${SITE_URL}/contact`,
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Livv Studio Services",
          itemListElement: PRIMARY_SERVICES.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.name,
              alternateName: service.nameEs,
              description: service.description,
              url: `${SITE_URL}/services/${service.slug}`,
              provider: { "@id": orgId },
              areaServed: AREA_SERVED,
            },
          })),
        },
      },
      {
        "@type": ["Place", "LocalBusiness"],
        "@id": placeId,
        name: STUDIO.legalName,
        url: STUDIO.url,
        image: STUDIO.ogImage,
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: STUDIO.address.locality,
          addressRegion: STUDIO.address.region,
          addressCountry: STUDIO.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: STUDIO.geo.latitude,
          longitude: STUDIO.geo.longitude,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: STUDIO.founder.name,
        jobTitle: STUDIO.founder.jobTitle,
        url: STUDIO.founder.url,
        worksFor: { "@id": orgId },
        sameAs: [...STUDIO.founder.sameAs],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: STUDIO.url,
        name: STUDIO.legalName,
        publisher: { "@id": orgId },
        inLanguage: ["en", "es"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  }
}

export type ServiceJsonLdInput = {
  name: string
  description: string
  slug: string
  alternateName?: string
  /** Override the default `/services/{slug}` URL (e.g. top-level AEO landings). */
  url?: string
}

export function buildServiceJsonLd({
  name,
  description,
  slug,
  alternateName,
  url,
}: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    alternateName,
    description,
    url: url ?? `${SITE_URL}/services/${slug}`,
    serviceType: name,
    category: "Design & Software Development",
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: AREA_SERVED,
    availableLanguage: ["Spanish", "English"],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Startups, agencies and product teams",
    },
    brand: { "@type": "Brand", name: STUDIO.legalName },
  }
}

export type ProductJsonLdInput = {
  name: string
  description: string
  slug: string
  category: string
  applicationCategory?: string
  operatingSystem?: string
  priceFromUSD?: number
}

export function buildSoftwareApplicationJsonLd({
  name,
  description,
  slug,
  category,
  applicationCategory = "BusinessApplication",
  operatingSystem = "Web",
  priceFromUSD,
}: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${SITE_URL}/products/${slug}`,
    applicationCategory,
    applicationSubCategory: category,
    operatingSystem,
    inLanguage: ["en", "es"],
    creator: { "@id": `${SITE_URL}#organization` },
    publisher: { "@id": `${SITE_URL}#organization` },
    ...(priceFromUSD !== undefined && {
      offers: {
        "@type": "Offer",
        price: priceFromUSD,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${SITE_URL}#organization` },
      },
    }),
  }
}

/**
 * FAQPage builder — used by the Spanish AEO landings. Generative engines
 * (ChatGPT, Perplexity, Gemini) frequently lift FAQ question/answer pairs
 * verbatim, so keeping them as structured data raises citation odds.
 */
export function buildFaqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}

export function buildBreadcrumbsJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
