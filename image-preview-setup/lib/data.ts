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
      "/rain-portrait-1.jpg",
      "/rain-portrait-2.jpg",
      "/rain-portrait-3.jpg",
      "/rain-portrait-4.jpg",
      "/rain-portrait-5.jpg",
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
      "/random-portrait-2.jpg",
      "/random-portrait-1.jpg",
      "/random-portrait-3.jpg",
      "/random-portrait-5.jpg",
      "/random-portrait-4.jpg",
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
      "/green-portrait-1.jpg",
      "/green-portrait-2.jpg",
      "/green-portrait-3.jpg",
      "/green-portrait-4.jpg",
      "/green-portrait-5.jpg",
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
      "/italy-portrait-1.jpg",
      "/italy-portrait-2.jpg",
      "/italy-portrait-3.jpg",
      "/italy-portrait-4.jpg",
      "/italy-portrait-5.jpg",
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
      "/cool-portrait-1.jpg",
      "/cool-portrait-2.jpg",
      "/cool-portrait-3.jpg",
      "/cool-portrait-4.jpg",
      "/cool-portrait-5.jpg",
    ],
  },
]
