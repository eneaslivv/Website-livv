"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export function CustomCursor() {
  const pathname = usePathname()
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)
  const needsUpdateRef = useRef(true)
  const rafIdRef = useRef<number>(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  useEffect(() => {
    if (isTouch) return

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursor = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, 0.15)
      positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, 0.15)

      if (outerRef.current && innerRef.current) {
        const scale = isPointerRef.current ? 1.5 : 1
        const innerScale = isPointerRef.current ? 0.5 : 1

        outerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
        innerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${innerScale})`
      }

      const dx = Math.abs(positionRef.current.x - targetPositionRef.current.x)
      const dy = Math.abs(positionRef.current.y - targetPositionRef.current.y)
      if (dx < 0.1 && dy < 0.1) {
        needsUpdateRef.current = false
        return
      }

      rafIdRef.current = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      isPointerRef.current =
        window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A"

      if (!needsUpdateRef.current) {
        needsUpdateRef.current = true
        rafIdRef.current = requestAnimationFrame(updateCursor)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafIdRef.current = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [isTouch])

  if (isTouch || pathname?.startsWith('/admin') || pathname?.startsWith('/portal')) return null

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-4 w-4 rounded-full border-2 border-white" />
      </div>
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </div>
    </>
  )
}
