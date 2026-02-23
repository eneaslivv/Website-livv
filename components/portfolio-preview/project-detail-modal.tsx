"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Project } from "@/lib/portfolio-data"

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0)
    setDirection(0)
  }, [project?.id])

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const images = project?.images || []
  const total = images.length

  const goNext = useCallback(() => {
    if (total <= 1) return
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    if (total <= 1) return
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  // Auto-advance every 4s
  useEffect(() => {
    if (!isOpen || total <= 1) return
    const interval = setInterval(goNext, 4000)
    return () => clearInterval(interval)
  }, [isOpen, total, goNext])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
    }),
  }

  if (!project || !mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-2xl bg-[#ffffff] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-white/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-black/60" />
            </button>

            {/* Image slider area */}
            <div className="relative aspect-[16/10] bg-[#f5f0eb] overflow-hidden group">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={`${project.id}-${currentIndex}`}
                  src={images[currentIndex]}
                  alt={`${project.title} - Image ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.25 },
                  }}
                  draggable={false}
                />
              </AnimatePresence>

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Nav arrows */}
              {total > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); goPrev() }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 text-black/60" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); goNext() }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm border border-white/40 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 text-black/60" />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {total > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation()
                        setDirection(i > currentIndex ? 1 : -1)
                        setCurrentIndex(i)
                      }}
                      className="relative w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: i === currentIndex ? "#b8836e" : "rgba(255,255,255,0.4)",
                        transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
                      }}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content area */}
            <div className="px-6 py-5 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-[#2c2420] leading-snug text-balance">
                    {project.title}
                  </h2>
                  {project.category && (
                    <p className="text-[12px] text-[#b8836e] mt-1 tracking-wide">{project.category}</p>
                  )}
                </div>
                {project.price && (
                  <span className="text-xl font-semibold text-[#2c2420] shrink-0">${project.price}</span>
                )}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[#8a7e74]">
                {project.description}
              </p>
              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const slug = project.title.toLowerCase().replace(/\s+/g, '-');
                    router.push(`/products/${slug}`);
                  }}
                  className="flex-1 py-3 rounded-full text-[13px] font-medium bg-[#1a1714] text-[#f5f0eb] hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm"
                >
                  Get started
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const slug = project.title.toLowerCase().replace(/\s+/g, '-');
                    router.push(`/products/${slug}`);
                  }}
                  className="px-6 py-3 rounded-full text-[13px] font-medium text-[#2c2420]/70 bg-[#2c2420]/[0.05] hover:bg-[#2c2420]/[0.1] transition-all duration-200 active:scale-[0.98]"
                >
                  Learn more
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
