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
    description: "Manage orders, operations and internal workflows for hospitality businesses.",
    clipCount: 14,
    price: 49,
    createdAt: "2024-10-20",
    images: [
      "/images/portfolio-1.png",
      "/images/portfolio-2.jpg",
      "/images/portfolio-3.jpg",
      "/images/portfolio-4.jpg",
      "/images/portfolio-5.jpg",
    ],
  },
  {
    id: "2",
    title: "PRTool",
    category: "Partnerships \u00b7 Creator Economy",
    description: "Manage collaborations, campaigns, and payments between brands and creators.",
    clipCount: 6,
    price: 29,
    createdAt: "2024-11-15",
    images: [
      "/images/portfolio-6.png",
      "/images/portfolio-1.png",
      "/images/portfolio-2.jpg",
      "/images/portfolio-3.jpg",
      "/images/portfolio-4.jpg",
    ],
  },
  {
    id: "3",
    title: "Registrar",
    category: "Finance \u00b7 Personal OS",
    description: "Voice-first financial management for automated expense tracking and insights.",
    clipCount: 5,
    price: 39,
    createdAt: "2024-11-25",
    images: [
      "/images/portfolio-4.jpg",
      "/images/portfolio-5.jpg",
      "/images/portfolio-6.png",
      "/images/portfolio-1.png",
      "/images/portfolio-2.jpg",
    ],
  },
  {
    id: "4",
    title: "LegalFlow",
    category: "Legal \u00b7 Workflow Automation",
    description: "Automated case management and internal workflow systems for modern law firms.",
    clipCount: 8,
    price: 59,
    createdAt: "2024-10-25",
    images: [
      "/images/portfolio-2.jpg",
      "/images/portfolio-3.jpg",
      "/images/portfolio-4.jpg",
      "/images/portfolio-5.jpg",
      "/images/portfolio-6.png",
    ],
  },
  {
    id: "5",
    title: "PM Agent",
    category: "AI Agent \u00b7 Project Management",
    description: "Autonomous AI agent for task breakdown, deadline tracking, and team follow-up.",
    clipCount: 8,
    price: 19,
    createdAt: "2024-11-20",
    images: [
      "/images/portfolio-5.jpg",
      "/images/portfolio-6.png",
      "/images/portfolio-1.png",
      "/images/portfolio-2.jpg",
      "/images/portfolio-3.jpg",
    ],
  },
]
