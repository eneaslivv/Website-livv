/** Rendered UI mock shown inside a product card instead of a stock photo. */
export type ScreenVariant = "pos" | "campaigns" | "finance" | "cases" | "board"

export interface Project {
    id: string
    /** Route segment for /products/[slug] */
    slug: string
    title: string
    category: string
    /** Long-form copy, used by the featured block */
    description: string
    /** One-line result the product delivers, used on the cards */
    outcome: string
    /** Core modules, shown as a single meta line */
    modules: string[]
    /** Monthly white-label license, starting price */
    licenseFrom: number
    /** Which UI mock to render in the card's visual area */
    screen: ScreenVariant
    accent: string
    featured?: boolean
    clipCount: number
    createdAt: string
    images?: string[]
    price?: number
    isGenerating?: boolean
    progress?: number
    eta?: string
    isFailed?: boolean
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "payper",
        title: "Payper",
        category: "Operations · Hospitality",
        description:
            "All-in-one operating system for bars, venues and events. Orders, payments, stock and real-time control from a single dashboard — deployed under your brand.",
        outcome: "Run bars, venues and events from one system.",
        modules: ["Orders", "Payments", "Inventory", "Analytics"],
        licenseFrom: 49,
        screen: "pos",
        accent: "#b8836e",
        featured: true,
        clipCount: 14,
        createdAt: "2024-10-20",
    },
    {
        id: "2",
        slug: "prtool",
        title: "PRTool",
        category: "Partnerships · Creator Economy",
        description:
            "Platform to manage collaborations between brands and creators. Campaigns, tracking, payouts and performance analytics in one place.",
        outcome: "Run creator campaigns from brief to payout.",
        modules: ["Campaigns", "Tracking", "Payouts"],
        licenseFrom: 29,
        screen: "campaigns",
        accent: "#c9a48a",
        clipCount: 6,
        createdAt: "2024-11-15",
    },
    {
        id: "3",
        slug: "legalflow",
        title: "LegalFlow",
        category: "Legal · Workflow Automation",
        description:
            "Case and document management system for law firms. Centralizes clients, cases, deadlines and internal workflows.",
        outcome: "Centralize cases, documents and deadlines.",
        modules: ["Cases", "Documents", "Deadlines"],
        licenseFrom: 59,
        screen: "cases",
        accent: "#8a7e74",
        clipCount: 8,
        createdAt: "2024-10-25",
    },
    {
        id: "4",
        slug: "registrar",
        title: "Registrar",
        category: "Finance · Personal OS",
        description:
            "Voice-first app to log income and expenses. Automatically categorizes movements and helps you understand your finances without friction.",
        outcome: "Log income and expenses by voice.",
        modules: ["Voice input", "Categories", "Reports"],
        licenseFrom: 39,
        screen: "finance",
        accent: "#a0694f",
        clipCount: 5,
        createdAt: "2024-11-25",
    },
    {
        id: "5",
        slug: "pm-agent",
        title: "PM Agent",
        category: "AI Agent · Project Management",
        description:
            "AI project manager that breaks work into tasks, assigns owners, sets deadlines and follows up automatically.",
        outcome: "Turn goals into tasks, owners and deadlines.",
        modules: ["Tasks", "Owners", "Follow-ups"],
        licenseFrom: 19,
        screen: "board",
        accent: "#b8836e",
        clipCount: 8,
        createdAt: "2024-11-20",
    },
]

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]
export const secondaryProjects = projects.filter((p) => p !== featuredProject)
