"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"

import { projects as initialProjects, type Project } from "@/lib/data"
import { ProjectFolder } from "@/components/project-folder"
import { Toaster, toast } from "sonner"
import { FullpageLoader } from "@/components/fullpage-loader"
import { useGeneration } from "@/contexts/generation-context"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { NewProjectSlot } from "@/components/new-project-slot"
import { ProjectDetailModal } from "@/components/project-detail-modal"
import { HeroBanner } from "@/components/hero-banner"
const PROJECT_CONFIGS = [
  {
    title: "How to Design a Fashion Brand",
    clipCount: 6,
    images: [
      "/newbrand-portrait-1.png",
      "/newbrand-portrait-2.png",
      "/newbrand-portrait-3.png",
      "/newbrand-portrait-4.png",
      "/newbrand-portrait-5.png",
    ],
  },
  {
    title: "Starting a Modern Company in New York",
    clipCount: 8,
    images: [
      "/brand-portrait-1.png",
      "/brand-portrait-2.png",
      "/brand-portrait-3.png",
      "/brand-portrait-4.png",
      "/brand-portrait-5.png",
    ],
  },
]

export default function ClipsPage() {
  const { startGeneration } = useGeneration()

  const [isLoading, setIsLoading] = useState(true)
  const [newProjects, setNewProjects] = useState<(Project & { isNew?: boolean; isVisible?: boolean })[]>([])
  const [projects, setProjects] = useState(initialProjects)
  const nextProjectIndexRef = useRef(0)
  const animatingRef = useRef(false)
  const [showContent, setShowContent] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof initialProjects)[number] | null>(null)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hasNewInvisible = newProjects.some((p) => p.isNew && !p.isVisible)
    if (hasNewInvisible && !animatingRef.current) {
      animatingRef.current = true
      const timer = setTimeout(() => {
        setNewProjects((prev) => prev.map((p) => (p.isNew && !p.isVisible ? { ...p, isVisible: true } : p)))
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [newProjects])

  useEffect(() => {
    const hasVisibleNew = newProjects.some((p) => p.isNew && p.isVisible)
    if (hasVisibleNew) {
      const timer = setTimeout(() => {
        setNewProjects((prev) => prev.map((p) => ({ ...p, isNew: false })))
        animatingRef.current = false
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [newProjects])

  const allProjects = useMemo(() => {
    return [...newProjects, ...projects]
  }, [newProjects, projects])

  const handleCreateProject = useCallback(() => {
    const timestamp = Date.now()
    const configIndex = nextProjectIndexRef.current
    const config = PROJECT_CONFIGS[configIndex]

    nextProjectIndexRef.current = (configIndex + 1) % PROJECT_CONFIGS.length

    const newProject: Project & { isNew: boolean; isVisible?: boolean } = {
      id: `new-project-${timestamp}`,
      title: config.title,
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
      setNewProjects((prev) => prev.map((p) => (String(p.id) === newProject.id ? { ...p, isGenerating: false } : p)))
    })
  }, [startGeneration])

  const handleRemoveFolder = useCallback((projectId: string) => {
    // Remove immediately - the exit animation is already handled in DefaultProject
    setNewProjects((prev) => prev.filter((p) => String(p.id) !== projectId))
    setProjects((prev) => prev.filter((p) => String(p.id) !== projectId))
  }, [])

  const handleFolderClick = useCallback((project: (typeof initialProjects)[number]) => {
    setSelectedProject(project)
  }, [])

  const handleRenameProject = useCallback((projectId: string, newTitle: string) => {
    setNewProjects((prev) =>
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

  if (isLoading) {
    return <FullpageLoader duration={2000} />
  }

  return (
    <div className="min-h-screen bg-background">
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
        <main ref={mainRef} className="flex-1 min-h-screen p-4 pt-12 sm:p-6 sm:pt-14 md:p-8 md:pt-16">
          <div className="mx-auto w-full max-w-[288px] sm:max-w-[600px] lg:max-w-[912px]">
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
        </main>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
