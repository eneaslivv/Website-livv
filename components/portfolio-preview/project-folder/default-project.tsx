"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import type { Project } from "@/lib/portfolio-data"
import type { ImagePosition } from "./types"
import { MenuButton } from "./menu-button"
import { Sparkles } from "./sparkles"
import { ProductScreen } from "./product-screen"

/**
 * Visual area height. Narrow cards get a shorter panel — at 380px a phone-width
 * card was mostly mockup, which made the grid enormous to scroll.
 */
const PANEL_H_WIDE = 380
const PANEL_H_NARROW = 268

/**
 * One dominant 16:10 mockup with two secondary screens peeking behind it.
 * Widths are fractions of the card so the composition holds at any card size.
 */
const SCREEN_LAYERS = [
  { key: "left", w: 0.46, x: -0.27, y: 40, rotate: -6, z: 5, screenIndex: 1, delay: 0.1, hero: false },
  { key: "right", w: 0.46, x: 0.27, y: 40, rotate: 6, z: 5, screenIndex: 3, delay: 0.14, hero: false },
  { key: "hero", w: 0.66, x: 0, y: 18, rotate: 0, z: 10, screenIndex: 0, delay: 0, hero: true },
] as const

// Rauno-style easing: smooth deceleration
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const TRANSITION_DURATION = 0.3 // Declare TRANSITION_DURATION
const TRANSITION_EASE = EASE_OUT_EXPO // Declare TRANSITION_EASE

interface DefaultProjectProps {
  project: Project
  isHovered: boolean
  setIsHovered: (value: boolean) => void
  isGenerating: boolean
  generationComplete: boolean
  progress: number
  sparklesFading: boolean
  showImages: boolean
  showGeneratingFooter: boolean
  imagePositions: ImagePosition[]
  clipCount: number
  remainingEta: string
  formattedDate: string
  onRemove?: () => void
  onCancel?: () => void
  onRename?: (newTitle: string) => void
  onViewDemo?: () => void
  onResell?: () => void
  priority?: boolean
}

export function DefaultProject({
  project,
  isHovered,
  setIsHovered,
  isGenerating,
  generationComplete,
  progress,
  sparklesFading,
  showImages,
  showGeneratingFooter,
  imagePositions,
  clipCount,
  remainingEta,
  formattedDate,
  onRemove,
  onCancel,
  onRename,
  onViewDemo,
  onResell,
  priority = false,
}: DefaultProjectProps) {
  const router = useRouter()
  const accent = project.accent || "#b8836e"
  const screenVariant = project.screen || "pos"

  // The mockup composition is sized against the card, not against fixed pixels
  const panelRef = useRef<HTMLDivElement>(null)
  const [panelW, setPanelW] = useState(440)
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    // Measure once up front — the observer's first callback isn't guaranteed before paint
    setPanelW(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([entry]) => setPanelW(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpenChange = (open: boolean) => {
    setIsMenuOpen(open)
    // When menu closes, reset hover state since mouse likely moved outside
    if (!open) {
      setIsHovered(false)
    }
  }
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(project.title)
  const [editCooldown, setEditCooldown] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteProgress, setDeleteProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [exitAnimationType, setExitAnimationType] = useState(0)

  // Determine animation type based on project id (0-4 for 5 different animations)
  const animationType = typeof project.id === 'number' ? project.id % 5 : parseInt(project.id, 10) % 5 || 0
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const deleteIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Focus textarea when editing starts and move cursor to end
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current
      textarea.focus()
      // Move cursor to end of text
      const length = textarea.value.length
      textarea.setSelectionRange(length, length)
    }
  }, [isEditing])

  // Sync editTitle when project title changes
  useEffect(() => {
    setEditTitle(project.title)
  }, [project.title])

  // Close editing when clicking outside - use ref to track the container
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCancelEdit()
      }
    }
    if (isEditing) {
      // Delay adding listener to avoid immediate trigger
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside)
      }, 10)
      return () => {
        clearTimeout(timer)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isEditing])

  // Close delete confirmation when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        cancelDeleteCountdown()
      }
    }
    if (showDeleteConfirm && !isDeleting) {
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside)
      }, 10)
      return () => {
        clearTimeout(timer)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [showDeleteConfirm, isDeleting])

  const handleEditClick = () => {
    setEditTitle(project.title)
    setIsEditing(true)
  }

  const handleConfirmEdit = () => {
    const trimmedTitle = editTitle.trim()
    if (trimmedTitle && trimmedTitle !== project.title) {
      onRename?.(trimmedTitle)
    }
    setIsEditing(false)
    setIsMenuOpen(false)
    setIsHovered(false)
    // Set cooldown to prevent immediate re-hover
    setEditCooldown(true)
    setTimeout(() => setEditCooldown(false), 300)
  }

  const handleCancelEdit = () => {
    setEditTitle(project.title)
    setIsEditing(false)
    setIsMenuOpen(false)
    setIsHovered(false)
    // Set cooldown to prevent immediate re-hover
    setEditCooldown(true)
    setTimeout(() => setEditCooldown(false), 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleConfirmEdit()
    } else if (e.key === "Escape") {
      handleCancelEdit()
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
    setIsMenuOpen(false)
  }

  const startDeleteCountdown = () => {
    setIsDeleting(true)
    setDeleteProgress(0)

    const duration = 3000
    const interval = 50
    let elapsed = 0

    deleteIntervalRef.current = setInterval(() => {
      elapsed += interval
      setDeleteProgress((elapsed / duration) * 100)
    }, interval)

    deleteTimeoutRef.current = setTimeout(() => {
      if (deleteIntervalRef.current) clearInterval(deleteIntervalRef.current)
      setExitAnimationType(animationType)
      setIsExiting(true)
      setTimeout(() => {
        onRemove?.()
      }, 200) // Instant exit - matches ease-out animation
    }, duration)
  }

  const cancelDeleteCountdown = () => {
    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current)
      deleteTimeoutRef.current = null
    }
    if (deleteIntervalRef.current) {
      clearInterval(deleteIntervalRef.current)
      deleteIntervalRef.current = null
    }
    setIsDeleting(false)
    setDeleteProgress(0)
    setShowDeleteConfirm(false)
    setIsHovered(false)
  }

  const isActive = isHovered && !isGenerating && !isEditing && !isMenuOpen && !showDeleteConfirm && !isDeleting

  return (
    <motion.div
      ref={containerRef}
      className={`group relative w-full ${isGenerating ? "cursor-default" : "cursor-pointer"}`}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 0.95 : 1,
        rotateX: isExiting ? 15 : 0,
        y: isExiting ? -20 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: "1200px",
        zIndex: isActive || isEditing || isMenuOpen || showDeleteConfirm || isDeleting ? 50 : 1,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => !editCooldown && !showDeleteConfirm && !isDeleting && setIsHovered(true)}
      onMouseLeave={() => !isMenuOpen && !isEditing && !showDeleteConfirm && !isDeleting && setIsHovered(false)}
    >
      <div
        className="relative w-full"
        style={{ perspective: "1200px" }}
      >
        {/* Back panel — overflow-hidden keeps the mockups inside the card at any width */}
        <motion.div
          ref={panelRef}
          className="relative z-0 rounded-2xl overflow-hidden"
          animate={{
            rotateX: isActive ? 15 : 0,
            backgroundColor: isGenerating ? "#2C0405" : "#ede7e0",
          }}
          transition={{
            rotateX: {
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            },
            backgroundColor: {
              duration: TRANSITION_DURATION,
              ease: TRANSITION_EASE,
            },
          }}
          style={{
            height: `${panelW < 360 ? PANEL_H_NARROW : PANEL_H_WIDE}px`,
            border: "1px solid rgba(44, 36, 32, 0.08)",
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          {/* Accent wash so each product's visual area reads as its own, not flat cream */}
          {!isGenerating && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(120% 90% at 50% 115%, ${accent}1c 0%, ${accent}0a 42%, transparent 72%)`,
              }}
            />
          )}
          {project.isGenerating && <Sparkles count={16} fading={sparklesFading} variant="generating" />}
          <motion.div
            className="absolute inset-0"
            animate={{
              rotateX: isActive ? -15 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            }}
            style={{
              transformStyle: "flat",
              transformOrigin: "center bottom",
            }}
          >
            {SCREEN_LAYERS.map((layer) => {
              const shouldShow = !project.isGenerating || showImages
              const isCompact = isEditing || isMenuOpen || showDeleteConfirm || isDeleting

              const w = Math.round(panelW * layer.w)
              const x = panelW * layer.x * (isCompact ? 0.8 : isActive ? 1.18 : 1)
              const y = layer.y + (isCompact ? 22 : isActive ? -10 : 0)
              const rotate = layer.rotate * (isCompact ? 0.7 : isActive ? 1.25 : 1)

              return (
                <motion.div
                  key={layer.key}
                  className="absolute left-1/2"
                  style={{ zIndex: layer.z, top: 0, marginLeft: -w / 2 }}
                  initial={false}
                  animate={{
                    x,
                    y,
                    rotate,
                    scale: shouldShow ? (isActive ? 1.03 : 1) : 0.85,
                    opacity: shouldShow ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 17,
                    mass: 1,
                    delay: shouldShow ? layer.delay : 0,
                    opacity: { duration: 0.4, ease: "easeOut", delay: shouldShow ? layer.delay : 0 },
                  }}
                >
                  <motion.div
                    className="overflow-hidden rounded-[10px]"
                    style={{
                      border: "1px solid rgba(44,36,32,0.08)",
                      boxShadow: layer.hero
                        ? "0 14px 34px rgba(44,36,32,0.16), 0 2px 6px rgba(44,36,32,0.05)"
                        : "0 6px 18px rgba(44,36,32,0.10)",
                    }}
                    animate={{
                      opacity: layer.hero ? 1 : isActive ? 0.9 : 0.62,
                      filter: `blur(${layer.hero || isActive ? 0 : 0.7}px)`,
                    }}
                    transition={{ duration: TRANSITION_DURATION, ease: TRANSITION_EASE }}
                  >
                    <ProductScreen variant={screenVariant} accent={accent} index={layer.screenIndex} width={w} />
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Front panel */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 rounded-2xl overflow-hidden"
          animate={{
            rotateX: isActive ? -25 : 0,
            backgroundColor: isGenerating ? "#8E2121" : "rgba(255, 255, 255, 0.85)",
          }}
          transition={{
            rotateX: {
              type: "spring",
              stiffness: 180,
              damping: 22,
              mass: 0.8,
            },
            backgroundColor: {
              duration: TRANSITION_DURATION,
              ease: TRANSITION_EASE,
            },
          }}
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(44, 36, 32, 0.08)",
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          <div className="relative py-4 px-4 min-h-[2.75rem]">
            {/* Edit mode glow effect */}
            <div
              className="absolute -inset-2 transition-all duration-500 rounded-t-2xl pointer-events-none"
              style={{
                opacity: isEditing ? 1 : 0,
                background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(184,131,110,0.12) 0%, transparent 60%)',
                filter: 'blur(12px)',
              }}
            />
            <div
              className="absolute -inset-px transition-all duration-500 rounded-t-lg pointer-events-none overflow-hidden"
              style={{
                opacity: isEditing ? 1 : 0,
                background: 'linear-gradient(180deg, rgba(184,131,110,0.06) 0%, rgba(184,131,110,0.01) 100%)',
              }}
            />
            <div
              className="absolute inset-x-2 -top-1 h-px transition-all duration-500 pointer-events-none"
              style={{
                opacity: isEditing ? 1 : 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(184,131,110,0.4) 50%, transparent 100%)',
                filter: 'blur(0.5px)',
              }}
            />
            <div
              className="relative z-0 transition-all duration-200 min-h-[3.5rem]"
              style={{ opacity: isEditing ? 0 : 1, pointerEvents: isEditing ? "none" : "auto" }}
            >
              {!isGenerating && (
                /* Flat label, no pill. The pill wrapped onto two lines on a
                   phone and collided with the category beside it. The category
                   is dropped on narrow cards rather than shown truncated to
                   "CREATO…", which told the reader nothing. */
                <div className="flex items-center gap-2 mb-1.5 min-w-0">
                  <span
                    className="text-[9px] font-semibold uppercase whitespace-nowrap"
                    style={{ color: accent, letterSpacing: "0.12em" }}
                  >
                    White-label
                  </span>
                  {panelW >= 360 && (
                    <>
                      <span aria-hidden className="w-2.5 h-px shrink-0 bg-[#2c2420]/20" />
                      <span className="text-[9.5px] uppercase tracking-[0.1em] text-[#8a7e74]/70 truncate">
                        {project.category}
                      </span>
                    </>
                  )}
                </div>
              )}
              <h3
                className={`font-semibold text-[17px] leading-tight line-clamp-1 transition-colors duration-200 ${isGenerating ? "text-white/90" : "text-[#2c2420]"}`}
              >
                {isGenerating ? "Your App Here" : project.title}
              </h3>
              <p className={`text-[13px] mt-1 line-clamp-2 leading-snug ${isGenerating ? "text-white/50" : "text-[#5c534c]"}`}>
                {isGenerating ? "Partner with us and resell your app directly." : project.outcome || project.description}
              </p>
              {!isGenerating && (project.modules?.length || project.licenseFrom) ? (
                <div className={`mt-2 gap-x-3 ${panelW < 360 ? "flex flex-col gap-y-0.5" : "flex items-baseline"}`}>
                  <p className="text-[11px] text-[#8a7e74] truncate flex-1">{project.modules?.join(" · ")}</p>
                  {project.licenseFrom ? (
                    <p className="text-[11px] text-[#8a7e74]/80 whitespace-nowrap">
                      From <span className="font-medium text-[#2c2420]/70">${project.licenseFrom}</span>/mo
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
            <textarea
              ref={textareaRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              className="absolute inset-0 w-full h-full py-4 px-4 bg-transparent border-none rounded-none text-[#2c2420] text-base font-semibold leading-snug focus:outline-none caret-[#b8836e] resize-none transition-opacity duration-200"
              style={{ opacity: isEditing ? 1 : 0, pointerEvents: isEditing ? "auto" : "none" }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="relative h-[48px]">
            {/* Top border */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-[#2c2420]/[0.06]" />

            {/* Progress bar - only show during active generation */}
            {isGenerating && progress < 100 && (
              <motion.div
                className="absolute top-0 left-0 h-[1px] bg-[#b8836e]/30"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            )}

            {/* Footer content - derive from showImages for reliability */}
            <div className="relative h-full">
              {isEditing ? (
                <motion.div
                  key="editing"
                  className="absolute inset-0 flex items-center justify-end px-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                    opacity: { duration: 0.15 },
                  }}
                >
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1.5 rounded-full text-[12px] text-[#8a7e74] hover:text-[#2c2420] hover:bg-[#2c2420]/5 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCancelEdit()
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-full text-[12px] font-medium text-[#f5f0eb] bg-[#1a1714] hover:bg-[#2c2420] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleConfirmEdit()
                      }}
                    >
                      Save
                    </button>
                  </div>
                </motion.div>
              ) : isGenerating && !showImages ? (
                <motion.div
                  key="generating"
                  className="absolute inset-0 flex items-center justify-between px-2 pl-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                    opacity: { duration: 0.15 },
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <motion.svg
                      className={`w-3 h-3 ${isGenerating ? "text-white/80" : "text-[#b8836e]"}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                      <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                    </motion.svg>
                    <span className="text-[13px] text-transparent bg-clip-text bg-gradient-to-r from-white/40 via-white to-white/40 bg-[length:200%_100%] animate-shimmer">Partnering</span>
                    {progress < 95 && <span className="text-[13px] text-white/50">{remainingEta}</span>}
                  </div>
                  <MenuButton project={project} onOpenChange={handleMenuOpenChange} onRemove={handleDeleteClick} onCancel={onCancel} onRename={handleEditClick} isVisible={true} />
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  className="absolute inset-0 flex items-center justify-between px-3 pl-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    mass: 1,
                    opacity: { duration: 0.35, ease: "easeOut" },
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onViewDemo) return onViewDemo()
                      router.push(`/products/${project.slug || project.title.toLowerCase().replace(/\s+/g, "-")}`)
                    }}
                    className="group/demo flex items-center gap-1 text-[12px] text-[#8a7e74] hover:text-[#2c2420] transition-colors duration-200"
                  >
                    View demo
                    <svg className="w-2.5 h-2.5 transition-transform duration-200 group-hover/demo:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onResell) return onResell()
                        router.push(`/products/${project.slug || project.title.toLowerCase().replace(/\s+/g, "-")}#pricing`)
                      }}
                      className="group/resell flex items-center gap-1 px-2 py-1 rounded-full text-[12px] font-medium text-[#2c2420] hover:bg-[#2c2420]/[0.06] transition-colors duration-200 active:scale-[0.97]"
                    >
                      <span>
                        Resell<span className="hidden sm:inline"> this product</span>
                      </span>
                      <svg className="w-2.5 h-2.5 transition-transform duration-200 group-hover/resell:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <MenuButton project={project} onOpenChange={handleMenuOpenChange} onRemove={handleDeleteClick} onCancel={onCancel} onRename={handleEditClick} isVisible={true} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete confirmation overlay */}
      {(showDeleteConfirm || isDeleting) && (
        <div
          className="absolute inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer rounded-2xl"
          onClick={() => {
            setShowDeleteConfirm(false)
            setIsHovered(false)
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "#f5f0eb",
              animation: "backdropFadeIn 300ms ease-out forwards",
            }}
          />

          {/* Content */}
          <div
            className="relative cursor-default flex flex-col items-center px-5 py-5 w-full h-full"
            style={{
              animation: isExiting
                ? `${['exitShrinkRise', 'exitCollapse', 'exitFlashFade', 'exitFoldAway', 'exitDissolve'][exitAnimationType]} 200ms ease-out forwards`
                : "menuAppear 350ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              transformOrigin: exitAnimationType === 3 ? 'center bottom' : 'center center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes backdropFadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              @keyframes menuAppear {
                0% {
                  opacity: 0;
                  transform: scale(0.85) translateY(20px);
                }
                100% {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
              }
              @keyframes crownImageAppear {
                0% {
                  opacity: 0;
                  transform: translateY(10px) scale(0.8);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              /* Animation 0: Shrink + Fade + Rise */
              @keyframes exitShrinkRise {
                0% {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
                100% {
                  opacity: 0;
                  transform: scale(0.7) translateY(-40px);
                }
              }
              /* Animation 1: Collapse to Center */
              @keyframes exitCollapse {
                0% {
                  opacity: 1;
                  transform: scale(1);
                  filter: blur(0px);
                }
                50% {
                  opacity: 0.8;
                  transform: scale(0.5);
                  filter: blur(2px);
                }
                100% {
                  opacity: 0;
                  transform: scale(0.1);
                  filter: blur(8px);
                }
              }
              /* Animation 2: Success Flash + Fade */
              @keyframes exitFlashFade {
                0% {
                  opacity: 1;
                  filter: brightness(1);
                }
                15% {
                  opacity: 1;
                  filter: brightness(2);
                }
                100% {
                  opacity: 0;
                  filter: brightness(0.5);
                }
              }
              /* Animation 3: Fold Away (3D flip) */
              @keyframes exitFoldAway {
                0% {
                  opacity: 1;
                  transform: perspective(800px) rotateX(0deg) scale(1);
                }
                100% {
                  opacity: 0;
                  transform: perspective(800px) rotateX(-90deg) scale(0.8);
                }
              }
              /* Animation 4: Dissolve Out (blur + fade) */
              @keyframes exitDissolve {
                0% {
                  opacity: 1;
                  filter: blur(0px) saturate(1);
                  transform: scale(1);
                }
                100% {
                  opacity: 0;
                  filter: blur(20px) saturate(0);
                  transform: scale(1.1);
                }
              }
            `}</style>

            {/* Crown Images */}
            <div
              className="flex items-end justify-center gap-0"
              style={{ marginTop: "-34px" }}
            >
              {[1, 2, 3].map((imgIndex, i) => {
                const rotations = [-10, 0, 10]
                const yOffsets = [4, 0, 4]
                const scales = [0.95, 1.05, 0.95]
                const marginLeft = i === 0 ? 0 : -22

                return (
                  <div
                    key={imgIndex}
                    className="relative"
                    style={{
                      zIndex: i === 1 ? 3 : 1,
                      marginLeft: marginLeft,
                      animation: `crownImageAppear 400ms cubic-bezier(0.34, 1.56, 0.64, 1) ${80 + i * 60}ms both`,
                    }}
                  >
                    <div
                      className="w-[76px] h-[48px] overflow-hidden rounded-md shadow-xl"
                      style={{
                        transform: `translateY(${yOffsets[i]}px) rotate(${rotations[i]}deg) scale(${scales[i]})`,
                      }}
                    >
                      <div style={{ opacity: i === 1 ? 1 : 0.6 }}>
                        <ProductScreen variant={screenVariant} accent={accent} index={imgIndex} width={76} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Clip Count Tag */}
            <div
              className="flex items-center justify-center gap-1 px-2 py-1 rounded-full"
              style={{
                marginTop: "-20px",
                zIndex: 10,
                background: "rgba(44, 36, 32, 0.06)",
                backdropFilter: "blur(12px)",
                animation: "crownImageAppear 400ms cubic-bezier(0.34, 1.56, 0.64, 1) 280ms both",
              }}
            >
              <span className="text-[11px] font-medium text-[#2c2420]/60">{project.modules?.length ?? clipCount}</span>
              <span className="text-[11px] text-[#8a7e74]">modules</span>
            </div>

            {/* Title */}
            <div className="text-center mt-3 mb-1 px-2">
              <p className="text-[#2c2420] font-semibold text-[15px] leading-snug line-clamp-2 text-balance">{project.title}</p>
            </div>

            {/* Subtitle / Deleting state */}
            {isDeleting ? (
              <div className="flex flex-col items-center mb-auto">
                {isExiting ? (
                  <p className="text-[#2c2420]/60 text-[13px] font-medium">Deleted</p>
                ) : (
                  <>
                    <p className="text-[#8a7e74] text-[12px]">Deleting...</p>
                    <div className="w-32 h-1 bg-[#2c2420]/10 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{
                          width: `${deleteProgress}%`,
                          backgroundColor: "oklch(0.5801 0.227 25.12)"
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-[#8a7e74] text-[12px] mb-auto">Project will be permanently deleted</p>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-center gap-2 w-full mt-auto" style={{ opacity: isExiting ? 0 : 1, transition: 'opacity 200ms' }}>
              {isDeleting ? (
                <button
                  className="flex-1 py-2 rounded-full bg-[#2c2420]/[0.06] hover:bg-[#2c2420]/[0.1] text-[#2c2420]/70 hover:text-[#2c2420] text-[13px] font-medium transition-all duration-200 active:scale-[0.97]"
                  onClick={(e) => {
                    e.stopPropagation()
                    cancelDeleteCountdown()
                  }}
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    className="flex-1 py-2 rounded-full bg-[#2c2420]/[0.06] hover:bg-[#2c2420]/[0.1] text-[#2c2420]/70 hover:text-[#2c2420] text-[13px] font-medium transition-all duration-200 active:scale-[0.97]"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteConfirm(false)
                      setIsHovered(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-2 rounded-full text-[#f5f0eb] text-[13px] font-medium transition-all duration-300 ease-out active:scale-[0.97]"
                    style={{ backgroundColor: "oklch(0.5801 0.227 25.12)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "oklch(0.65 0.2 25.12)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "oklch(0.5801 0.227 25.12)"
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      startDeleteCountdown()
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </motion.div>
  )
}
