"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { projects as initialProjects, type Project } from "@/lib/marketplace-data"
import { Toaster, toast } from "sonner"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"

// Dynamically import components to avoid circular dependencies if any, 
// and ensure client-side rendering where appropriate.
// However, since we are in "use client", we can import them directly if they are standard components.
// Checking paths based on previous file listing.
import { ProjectFolder } from "@/components/portfolio-preview/project-folder/index"
import { FullpageLoader } from "@/components/portfolio-preview/fullpage-loader"
import { NewProjectSlot } from "@/components/portfolio-preview/new-project-slot"
import { ProjectDetailModal } from "@/components/portfolio-preview/project-detail-modal"
import { HeroBanner } from "@/components/portfolio-preview/hero-banner"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { PartnerFormModal } from "@/components/portfolio-preview/partner-form-modal"

// We need to make sure useGeneration is available. 
// If it's not in a global context, we might need to wrap this section or assume it's provided.
// The original page wrapped it in a provider?
// Let's assume the provider is at a higher level or we need to mock it if missing.
// Checking if we can import it.
import { useGeneration, GenerationProvider } from "@/contexts/generation-context"

const PARTNER_PROGRAM_ID = "partner-program-project"
const PARTNER_PROGRAM_CONFIG = {
    title: "Partner Program",
    category: "Partnership \u00b7 Resell",
    description: "Partner with us and resell your app directly through our ecosystem.",
    clipCount: 1,
    images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    ],
}

const PROJECT_CONFIGS = [
    {
        title: "How to Design a Fashion Brand",
        clipCount: 6,
        images: [
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
        ],
    },
    {
        title: "Starting a Modern Company in New York",
        clipCount: 8,
        images: [
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        ],
    },
]

function MarketplaceContent({ id }: { id?: string }) {
    const { startGeneration } = useGeneration()

    const [isLoading, setIsLoading] = useState(true)
    const [newProjects, setNewProjects] = useState<(Project & { isNew?: boolean; isVisible?: boolean })[]>([])
    const [projects, setProjects] = useState(initialProjects)
    const nextProjectIndexRef = useRef(0)
    const animatingRef = useRef(false)
    const [showContent, setShowContent] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const hasNewInvisible = newProjects.some((p) => p.isNew && !p.isVisible)
        if (hasNewInvisible && !animatingRef.current) {
            animatingRef.current = true
            const timer = setTimeout(() => {
                setNewProjects((prev: (Project & { isNew?: boolean; isVisible?: boolean })[]) => prev.map((p) => (p.isNew && !p.isVisible ? { ...p, isVisible: true } : p)))
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [newProjects])

    useEffect(() => {
        const hasVisibleNew = newProjects.some((p) => p.isNew && p.isVisible)
        if (hasVisibleNew) {
            const timer = setTimeout(() => {
                setNewProjects((prev: (Project & { isNew?: boolean; isVisible?: boolean })[]) => prev.map((p) => ({ ...p, isNew: false })))
                animatingRef.current = false
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [newProjects])

    const allProjects = useMemo(() => {
        return [...newProjects, ...projects]
    }, [newProjects, projects])

    const handleCreateProject = useCallback(() => {
        // Check if partner project already exists
        const partnerProject = newProjects.find(p => p.id === PARTNER_PROGRAM_ID)

        if (partnerProject) {
            if (!partnerProject.isGenerating) {
                setIsPartnerFormOpen(true)
            }
            return
        }

        const timestamp = Date.now()
        const config = PARTNER_PROGRAM_CONFIG

        const newProject: Project & { isNew: boolean; isVisible?: boolean } = {
            id: PARTNER_PROGRAM_ID, // Use fixed ID for the partner app
            title: config.title,
            category: config.category,
            description: config.description,
            clipCount: config.clipCount,
            images: config.images,
            isGenerating: true,
            progress: 0,
            isNew: true,
            isVisible: false,
            createdAt: new Date().toISOString(),
        }

        setNewProjects((prev) => [newProject, ...prev])

        startGeneration(newProject.id, () => {
            setNewProjects((prev: (Project & { isNew?: boolean; isVisible?: boolean })[]) => prev.map((p) => (String(p.id) === newProject.id ? { ...p, isGenerating: false } : p)))
            // Optionally auto-open form after generation
            // setIsPartnerFormOpen(true) 
        })
    }, [startGeneration, newProjects])

    const handleRemoveFolder = useCallback((projectId: string) => {
        // Remove immediately - the exit animation is already handled in DefaultProject
        setNewProjects((prev) => prev.filter((p) => String(p.id) !== projectId))
        setProjects((prev) => prev.filter((p) => String(p.id) !== projectId))
    }, [])

    const handleFolderClick = useCallback((project: (typeof initialProjects)[number]) => {
        if (project.id === PARTNER_PROGRAM_ID) {
            setIsPartnerFormOpen(true)
        } else {
            setSelectedProject(project)
        }
    }, [])

    const handleRenameProject = useCallback((projectId: string, newTitle: string) => {
        setNewProjects((prev: (Project & { isNew?: boolean; isVisible?: boolean })[]) =>
            prev.map((p) => (String(p.id) === projectId ? { ...p, title: newTitle } : p))
        )
        setProjects((prev) =>
            prev.map((p) => (String(p.id) === projectId ? { ...p, title: newTitle } : p))
        )
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowContent(true)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isLoading])

    // Removed FullpageLoader to avoid blocking the whole page when this is just a section.
    // We can show a local loader or just render nothing until ready.
    // For better UX in a section, we might just render it directly or with a skeleton.
    // But let's keep it simple for now, maybe just hidden until ready.

    return (
        <section id={id} className="min-h-screen bg-background relative w-full py-12 md:py-24">
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "#ffffff",
                        border: "1px solid rgba(44, 36, 32, 0.08)",
                        color: "#2c2420",
                        borderRadius: "12px",
                        boxShadow: "0 4px 24px rgba(44, 36, 32, 0.08)",
                    },
                }}
            />

            <div
                className="transition-all duration-700 ease-out"
                style={{
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <AnimatedBorders className="hidden md:block" />

                    <div ref={sectionRef} className="w-full max-w-[288px] sm:max-w-[600px] lg:max-w-[912px] mx-auto">
                        <div className="animate-blur-in mb-8">
                            <HeroBanner />
                        </div>
                        <div className="flex items-start justify-between mb-10 sm:mb-12 gap-6">
                            <div>
                                <h1 className="font-sans text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#b8836e] via-[#c9a48a] to-[#a0694f] text-balance animate-blur-in">
                                    Our Custom Apps
                                </h1>
                                <p className="mt-2.5 text-[14px] sm:text-[15px] leading-relaxed text-muted-foreground max-w-md animate-blur-in-delay-1">
                                    Products built in collaboration. We partner with startups, agencies, and teams to design and develop scalable digital systems.
                                </p>
                            </div>
                            <button
                                className="text-sm font-medium text-primary-foreground rounded-full hover:opacity-90 transition-all duration-200 py-1.5 bg-primary px-4 whitespace-nowrap mt-1 animate-blur-in-delay-2 active:scale-[0.97]"
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    const x = (rect.left + rect.width / 2) / window.innerWidth
                                    const y = (rect.top + rect.height / 2) / window.innerHeight
                                    const colors = ["#b8836e", "#c9a48a", "#d4bfad", "#a0694f", "#8a7e74"]
                                    confetti({
                                        particleCount: 40,
                                        spread: 50,
                                        origin: { x, y },
                                        colors,
                                        startVelocity: 20,
                                        gravity: 0.6,
                                        scalar: 0.8,
                                        ticks: 150,
                                        shapes: ["circle"],
                                        disableForReducedMotion: true,
                                    })
                                    setTimeout(() => {
                                        confetti({
                                            particleCount: 25,
                                            spread: 70,
                                            origin: { x, y: y - 0.05 },
                                            colors,
                                            startVelocity: 15,
                                            gravity: 0.5,
                                            scalar: 0.6,
                                            ticks: 120,
                                            shapes: ["circle"],
                                            disableForReducedMotion: true,
                                        })
                                    }, 100)
                                }}
                            >
                                Start Trial
                            </button>
                        </div>

                        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
                            >
                                <NewProjectSlot onClick={handleCreateProject} />
                            </motion.div>
                            {allProjects.map((project, idx) => {
                                return (
                                    <motion.div
                                        key={project.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.25,
                                            delay: Math.min(idx * 0.03, 0.3),
                                            ease: [0.32, 0.72, 0, 1],
                                            layout: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
                                        }}
                                    >
                                        <ProjectFolder
                                            project={project}
                                            index={idx}
                                            onRemove={() => handleRemoveFolder(String(project.id))}
                                            onCancel={() => handleRemoveFolder(String(project.id))}
                                            onClick={() => handleFolderClick(project)}
                                            onRename={(newTitle) => handleRenameProject(String(project.id), newTitle)}
                                        />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <ProjectDetailModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            <PartnerFormModal
                isOpen={isPartnerFormOpen}
                onClose={() => setIsPartnerFormOpen(false)}
            />
        </section>
    )
}

export function MarketplaceSection({ id }: { id?: string }) {
    return (
        <GenerationProvider>
            <MarketplaceContent id={id} />
        </GenerationProvider>
    )
}

