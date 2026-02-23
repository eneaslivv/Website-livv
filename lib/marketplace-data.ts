export interface Project {
    id: string
    title: string
    category: string
    description: string
    clipCount: number
    createdAt: string
    images: string[]
    price?: number
    isGenerating?: boolean
    progress?: number
    eta?: string
    isFailed?: boolean
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Payper",
        category: "Operations \u00b7 Hospitality",
        description: "All-in-one operating system for bars and venues. Orders, payments, stock, and real-time control from a single dashboard.",
        clipCount: 14,
        price: 49,
        createdAt: "2024-10-20",
        images: [
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
        ],
    },
    {
        id: "2",
        title: "PRTool",
        category: "Partnerships \u00b7 Creator Economy",
        description: "Platform to manage collaborations between brands and creators. Campaigns, tracking, payouts, and performance analytics in one place.",
        clipCount: 6,
        price: 29,
        createdAt: "2024-11-15",
        images: [
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        ],
    },
    {
        id: "3",
        title: "Registrar",
        category: "Finance \u00b7 Personal OS",
        description: "Voice-first app to log income and expenses. Automatically categorizes movements and helps you understand your finances without friction.",
        clipCount: 5,
        price: 39,
        createdAt: "2024-11-25",
        images: [
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1454165833267-023bb0a16e82?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
        ],
    },
    {
        id: "4",
        title: "LegalFlow",
        category: "Legal \u00b7 Workflow Automation",
        description: "Case and document management system for law firms. Centralizes clients, cases, deadlines, and internal workflows.",
        clipCount: 8,
        price: 59,
        createdAt: "2024-10-25",
        images: [
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=2070&auto=format&fit=crop",
        ],
    },
    {
        id: "5",
        title: "PM Agent",
        category: "AI Agent \u00b7 Project Management",
        description: "AI project manager that breaks work into tasks, assigns owners, sets deadlines, and follows up automatically.",
        clipCount: 8,
        price: 19,
        createdAt: "2024-11-20",
        images: [
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518186239124-79774308a94e?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
        ],
    },
]
