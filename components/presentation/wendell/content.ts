/**
 * Every word of the Wendell partnership proposal (/presentation/wendell).
 *
 * The page sells a structure, not a price list: six capabilities, four
 * solutions Wendell can resell, and how the two of us split the work. Prices
 * are deliberately absent until the base rates and the resale margin are set.
 */

export const PALETTE = {
    ink: "#2c0405",
    bordo: "#440c15",
    muted: "#79665f",
    paper: "#fdfbf7",
    surface: "#f3eee8",
    line: "#ddd5cc",
    blush: "#ecd2cc",
    sky: "#afc3d8",
    butter: "#fff6be",
    sage: "#8d9661",
} as const

export const CONTACT = {
    email: "hola@livv.systems",
    subject: "Partnership · Wendell × LIVV",
}

export const PREPARED = "Prepared for Wendell · October 2026"

export type Tone = "dark" | "light"

/** Chapters, in page order. The top bar shows the one in view. */
export const CHAPTERS = [
    { id: "top", label: "Partnership proposal", tone: "dark" },
    { id: "idea", label: "01 · The idea", tone: "light" },
    { id: "capabilities", label: "02 · Capabilities", tone: "light" },
    { id: "approach", label: "03 · Our approach", tone: "dark" },
    { id: "builder", label: "04 · Business builder", tone: "light" },
    { id: "solutions", label: "05 · What you can sell", tone: "light" },
    { id: "partnership", label: "06 · Working together", tone: "dark" },
    { id: "next", label: "Let's build", tone: "light" },
] as const satisfies readonly { id: string; label: string; tone: Tone }[]

export type ChapterId = (typeof CHAPTERS)[number]["id"]

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const PILLARS = ["Strategy", "Technology", "Growth"] as const
export type Pillar = (typeof PILLARS)[number]

/** The system map in the hero: three pillars, four services each. */
export const MAP: { pillar: Pillar; services: string[] }[] = [
    { pillar: "Strategy", services: ["Business model", "Positioning", "Brand", "Customer journey"] },
    { pillar: "Technology", services: ["Web & apps", "Shopify", "CRM", "AI agents"] },
    { pillar: "Growth", services: ["Content", "Ads", "SEO", "Email"] },
]

export const TICKER = [
    "Business strategy",
    "Branding",
    "UX/UI",
    "Landing pages",
    "Shopify",
    "E-commerce",
    "Web apps",
    "AI agents",
    "WhatsApp bots",
    "CRM",
    "Sales automation",
    "Integrations",
    "Social content",
    "Product photo & video",
    "Motion",
    "Google Ads",
    "Meta Ads",
    "SEO",
    "Email marketing",
    "Analytics",
    "Ongoing support",
]

/* ------------------------------------------------------------------ */
/* 01 · The idea                                                       */
/* ------------------------------------------------------------------ */

export const NEEDS = [
    "The right strategy",
    "Connected tools",
    "Efficient processes",
    "Consistent content",
    "A clear path to growth",
]

/* ------------------------------------------------------------------ */
/* 02 · Capabilities                                                   */
/* ------------------------------------------------------------------ */

export type IconName = "compass" | "layout" | "network" | "aperture" | "growth" | "loop"

export type Capability = {
    title: string
    body: string
    chips: string[]
    icon: IconName
    recurring?: boolean
}

export const CAPABILITIES: Capability[] = [
    {
        title: "Strategy & Foundation",
        body: "Business planning, brand positioning, digital strategy, customer journeys, and operational structure.",
        chips: ["Business model", "Research", "Positioning", "Branding", "Customer experience", "Product planning"],
        icon: "compass",
    },
    {
        title: "Design & Development",
        body: "Brand experiences, websites, e-commerce, Shopify stores, web applications, and custom platforms.",
        chips: ["UX/UI", "Landing pages", "Corporate sites", "Shopify", "E-commerce", "Apps", "Internal systems"],
        icon: "layout",
    },
    {
        title: "AI & Automation",
        body: "Intelligent assistants, CRM workflows, integrations, customer support automation, and connected business systems.",
        chips: ["AI agents", "WhatsApp bots", "CRM", "Sales automation", "Inventory", "Payments", "Reporting"],
        icon: "network",
    },
    {
        title: "Creative & Content",
        body: "Creative direction, social content, product visuals, video, motion, and campaigns.",
        chips: ["Visual identity", "Social content", "Product photo & video", "Motion graphics", "AI-assisted content"],
        icon: "aperture",
    },
    {
        title: "Marketing & Growth",
        body: "Paid advertising, SEO, email marketing, conversion optimization, and performance analytics.",
        chips: ["Google Ads", "Meta Ads", "SEO", "Email", "Funnels", "CRO", "Analytics"],
        icon: "growth",
    },
    {
        title: "Ongoing Support",
        body: "Maintenance, improvements, technical support, reporting, and continuous optimization.",
        chips: ["Maintenance", "New features", "Tech support", "Process improvement", "Optimization"],
        icon: "loop",
        recurring: true,
    },
]

/* ------------------------------------------------------------------ */
/* 03 · Our approach                                                   */
/* ------------------------------------------------------------------ */

export const AI_SIDE = ["Speed", "Automation", "Production", "Scalability"]
export const HUMAN_SIDE = ["Strategy", "Direction", "Judgment", "Quality"]

export type Lane = "ai" | "human" | "both"

/** One workflow, two lanes: where AI carries the work and where people do. */
export const WORKFLOW: { step: string; lane: Lane; note: string }[] = [
    { step: "Research", lane: "both", note: "AI scans markets and data. People decide what matters." },
    { step: "Strategy", lane: "human", note: "Positioning and priorities are set by people." },
    { step: "Ideas", lane: "both", note: "AI widens the range. People pick the direction." },
    { step: "Direction", lane: "human", note: "Creative and product decisions stay human." },
    { step: "Production", lane: "both", note: "AI accelerates design, code and content." },
    { step: "Quality", lane: "human", note: "Every deliverable is reviewed by a person." },
    { step: "Operations", lane: "ai", note: "Automations run the routine, supervised by the team." },
]

/* ------------------------------------------------------------------ */
/* 04 · Business builder                                               */
/* ------------------------------------------------------------------ */

export type Billing = "Project" | "Monthly"

export type BuilderStep = {
    key: "foundation" | "build" | "automate" | "grow"
    name: string
    line: string
}

export const BUILDER_STEPS: BuilderStep[] = [
    { key: "foundation", name: "Foundation", line: "Strategy, brand and the shape of the business." },
    { key: "build", name: "Build", line: "The site, the store and the product people use." },
    { key: "automate", name: "Automate", line: "Tools, data and workflows connected into one system." },
    { key: "grow", name: "Grow", line: "Campaigns, content, acquisition and optimization." },
]

export type BuilderItem = { name: string; billing: Billing }

export type BusinessCase = {
    key: string
    label: string
    /** What the client asks for on day one. */
    request: string
    note?: { text: string; href: string; link: string }
    steps: Record<BuilderStep["key"], BuilderItem[]>
}

export const BUSINESSES: BusinessCase[] = [
    {
        key: "restaurant",
        label: "Restaurant",
        request: "“We need a new website.”",
        steps: {
            foundation: [
                { name: "Concept & positioning", billing: "Project" },
                { name: "Brand identity", billing: "Project" },
            ],
            build: [
                { name: "Website with menu", billing: "Project" },
                { name: "Online ordering & payments", billing: "Project" },
                { name: "Reservations", billing: "Project" },
            ],
            automate: [
                { name: "Guest CRM", billing: "Monthly" },
                { name: "WhatsApp AI assistant", billing: "Monthly" },
                { name: "Reviews & loyalty flows", billing: "Monthly" },
            ],
            grow: [
                { name: "Food content & photography", billing: "Monthly" },
                { name: "Meta & Google Ads", billing: "Monthly" },
                { name: "Monthly reporting", billing: "Monthly" },
            ],
        },
    },
    {
        key: "brand",
        label: "Product brand",
        request: "“We want to sell online.”",
        note: {
            text: "You know this one: KRU started with its Shopify store. Steps three and four are where a brand like that keeps growing.",
            href: "/projects/kru",
            link: "See KRU",
        },
        steps: {
            foundation: [
                { name: "Positioning & product story", billing: "Project" },
                { name: "Visual identity", billing: "Project" },
            ],
            build: [
                { name: "Shopify store", billing: "Project" },
                { name: "Product photo & video", billing: "Project" },
                { name: "Bundles & subscriptions", billing: "Project" },
            ],
            automate: [
                { name: "AI shopping assistant", billing: "Monthly" },
                { name: "Inventory & order sync", billing: "Project" },
                { name: "Post-purchase flows", billing: "Monthly" },
            ],
            grow: [
                { name: "Content calendar", billing: "Monthly" },
                { name: "Paid social & search", billing: "Monthly" },
                { name: "Email & retention", billing: "Monthly" },
            ],
        },
    },
    {
        key: "services",
        label: "Service business",
        request: "“We need more clients.”",
        steps: {
            foundation: [
                { name: "Offer & positioning", billing: "Project" },
                { name: "Brand identity", billing: "Project" },
            ],
            build: [
                { name: "Website & online booking", billing: "Project" },
                { name: "Client portal", billing: "Project" },
                { name: "Payments & invoicing", billing: "Project" },
            ],
            automate: [
                { name: "CRM & lead pipeline", billing: "Monthly" },
                { name: "AI assistant for inquiries", billing: "Monthly" },
                { name: "Automated follow-ups", billing: "Monthly" },
            ],
            grow: [
                { name: "SEO & content", billing: "Monthly" },
                { name: "Google Ads", billing: "Monthly" },
                { name: "Reviews & referrals", billing: "Monthly" },
            ],
        },
    },
]

/* ------------------------------------------------------------------ */
/* 05 · What you can sell                                              */
/* ------------------------------------------------------------------ */

export type Solution = {
    name: string
    tagline: string
    includes: string[]
    idealFor: string
    billing: Billing[]
    /** Atmosphere of the card's top band (LIVV Hub 03.4). */
    wash: string
}

export const SOLUTIONS: Solution[] = [
    {
        name: "Launch a Business",
        tagline: "From zero to ready to sell.",
        includes: ["Strategy", "Brand", "Website", "Store", "Payments", "Tracking"],
        idealFor: "New ventures, rebrands and first online stores.",
        billing: ["Project", "Monthly"],
        wash: "radial-gradient(120% 140% at 0% 0%, #ecd2cc 0%, transparent 60%), radial-gradient(120% 140% at 100% 100%, #fff6be 0%, transparent 55%), #f3eee8",
    },
    {
        name: "Automate a Business",
        tagline: "Less manual work. Connected processes.",
        includes: ["CRM", "AI agents", "Integrations", "Automations"],
        idealFor: "Teams losing hours to copy-paste, follow-ups and spreadsheets.",
        billing: ["Project", "Monthly"],
        wash: "radial-gradient(120% 140% at 100% 0%, #afc3d8 0%, transparent 60%), radial-gradient(120% 140% at 0% 100%, #ecd2cc 0%, transparent 55%), #f3eee8",
    },
    {
        name: "Grow a Business",
        tagline: "More customers. Better conversion.",
        includes: ["Content", "Ads", "SEO", "Email", "Optimization"],
        idealFor: "Businesses with a product that works and room to scale.",
        billing: ["Monthly"],
        wash: "radial-gradient(120% 140% at 0% 0%, #fff6be 0%, transparent 60%), radial-gradient(120% 140% at 100% 100%, rgba(141,150,97,0.55) 0%, transparent 55%), #f3eee8",
    },
    {
        name: "Build Something Custom",
        tagline: "Solve the specific problem.",
        includes: ["Apps", "Platforms", "Internal tools", "Software"],
        idealFor: "Needs that no off-the-shelf tool really solves.",
        billing: ["Project", "Monthly"],
        wash: "radial-gradient(120% 140% at 100% 0%, rgba(68,12,21,0.38) 0%, transparent 60%), radial-gradient(120% 140% at 0% 100%, #afc3d8 0%, transparent 55%), #f3eee8",
    },
]

export const REVENUE_FLOW = [
    { title: "Open the account", body: "A launch, a store or a custom build: the first project." },
    { title: "Keep it", body: "Support, maintenance and improvements, billed monthly." },
    { title: "Grow it", body: "New layers as the business grows: automation, content, ads." },
]

/* ------------------------------------------------------------------ */
/* 06 · Working together                                               */
/* ------------------------------------------------------------------ */

export type Mode = "white-label" | "co-branded"

export const MODES: { key: Mode; label: string; caption: string }[] = [
    {
        key: "white-label",
        label: "White-label",
        caption: "We work behind the scenes, under your brand. Your client deals with you.",
    },
    {
        key: "co-branded",
        label: "Visible collaboration",
        caption: "We join the conversation as your execution partner, when it helps to close or to deliver.",
    },
]

export const ROLES = {
    wendell: {
        name: "Wendell",
        role: "Client relationships & sales",
        does: ["Finds the opportunities", "Owns the relationship", "Sells the solution", "Keeps the account close"],
    },
    livv: {
        name: "LIVV",
        role: "Strategy, design, technology & growth",
        does: ["Scopes and plans the work", "Designs, builds and automates", "Delivers with quality control", "Supports and grows it monthly"],
    },
}

export const DEAL_FLOW = [
    { title: "You spot the opportunity", body: "A client with a need: a site, a store, a process that hurts." },
    { title: "We scope it together", body: "We shape the solution, the timeline and the proposal with you." },
    { title: "We deliver", body: "Under your brand or alongside you, with you in the loop." },
    { title: "We keep it growing", body: "Support and new layers turn one project into a monthly account." },
]

export const NEXT_STEPS = [
    "A short call to agree on the model.",
    "Partner pricing for each solution, with room for your margin.",
    "A first client to run it together.",
]
