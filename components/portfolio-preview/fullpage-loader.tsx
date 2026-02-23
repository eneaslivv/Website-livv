"use client"

import { useEffect, useState } from "react"

interface FullpageLoaderProps {
  duration?: number
  onComplete?: () => void
}

export function FullpageLoader({ duration = 1600, onComplete }: FullpageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, duration - 100)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration + 600)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
  }, [duration, onComplete])

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const linearProgress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3)
      setLoadingProgress(easedProgress * 100)

      if (linearProgress >= 1) {
        clearInterval(interval)
      }
    }, 16) // ~60fps
    return () => clearInterval(interval)
  }, [duration])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f0eb]">
      <div
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(0.96) translateY(-52px)" : "scale(1) translateY(-40px)",
          transition: "opacity 600ms cubic-bezier(0.32, 0.72, 0, 1), transform 600ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-6 w-10 h-[72px] bg-[#2c2420]/5 border border-[#2c2420]/10 overflow-hidden rounded-sm">
            <div
              className="absolute left-0 right-0 h-[1px] bg-[#b8836e] shadow-[0_0_8px_rgba(184,131,110,0.4)]"
              style={{ top: `${loadingProgress}%`, transition: "top 100ms cubic-bezier(0.32, 0.72, 0, 1)" }}
            />
            <div
              className="absolute inset-x-0 bg-gradient-to-t from-[#b8836e]/10 to-transparent"
              style={{
                height: `${loadingProgress}%`,
                top: 0,
                transition: "height 100ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            />
            <div className="absolute bottom-1 left-1 right-1 flex flex-col items-start gap-0.5">
              {[0, 1, 2].map((i) => {
                const threshold = 33 + i * 22
                const isActive = loadingProgress > threshold
                const finalWidths = ["85%", "65%", "50%"]
                return (
                  <div
                    key={i}
                    className="h-[2px] rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: isActive ? finalWidths[i] : "0%",
                      backgroundColor: isActive ? "rgba(184,131,110,0.5)" : "rgba(44,36,32,0.08)",
                    }}
                  />
                )
              })}
            </div>
          </div>
          <h1 className="font-semibold tracking-tight text-[#2c2420]/90 text-2xl">Restream Clips</h1>
          <div className="mt-4 w-52">
            <div className="rounded-full bg-[#2c2420]/10 overflow-hidden h-1.5 w-full">
              <div
                className="h-full bg-[#b8836e] rounded-full"
                style={{
                  width: `${loadingProgress}%`,
                  transition: "width 100ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
