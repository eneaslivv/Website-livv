"use client"

import { useState, useCallback } from "react"
import { LiquidMetalButton } from "./liquid-metal-button"
import { BadgeScroller } from "./badge-scroller"
import { QuotingFlow } from "./quoting-flow"

type CardPhase = "badges" | "quoting"

export function ScopeCard() {
  const [phase, setPhase] = useState<CardPhase>("badges")
  const [selectedBadge, setSelectedBadge] = useState<{
    id: string
    label: string
  } | null>(null)
  const [showError, setShowError] = useState(false)

  const handleBadgeClick = useCallback((badgeId: string, badgeLabel: string) => {
    setSelectedBadge({ id: badgeId, label: badgeLabel })
    setPhase("quoting")
    setShowError(false)
  }, [])

  const handleStartScoping = useCallback(() => {
    if (!selectedBadge) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }, [selectedBadge])

  const handleBack = useCallback(() => {
    setPhase("badges")
    setSelectedBadge(null)
  }, [])

  return (
    <div
      style={{
        width: "clamp(280px, 90%, 420px)",
        height: "460px",
        background: "#ffffff",
        borderRadius: "24px",
        border: "1px solid rgba(224, 221, 216, 0.6)",
        boxShadow:
          "0 2px 4px rgba(44, 4, 5, 0.02), 0 8px 16px rgba(44, 4, 5, 0.04), 0 16px 32px rgba(44, 4, 5, 0.06), 0 32px 64px rgba(44, 4, 5, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
        transition: "height 0.4s ease",
        display: "flex",
        flexDirection: "column" as const,
      }}
    >
      {phase === "badges" ? (
        <div
          className="flex flex-col"
          style={{ animation: "fadeSlideIn 0.4s ease-out" }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center"
            style={{
              padding: "20px 28px 0 28px",
            }}
          >
            <span
              className="font-sans"
              style={{
                fontSize: "11px",
                color: "#8a8a8a",
                textTransform: "lowercase",
                letterSpacing: "0.04em",
                fontWeight: 400,
              }}
            >
              what do you need?
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: "11px",
                color: "#b0ada8",
                textTransform: "lowercase",
                letterSpacing: "0.04em",
                fontWeight: 400,
              }}
            >
              select a service
            </span>
          </div>

          {/* Badge area */}
          <div
            style={{
              padding: "24px 0",
              minHeight: "180px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BadgeScroller onBadgeClick={handleBadgeClick} />
          </div>

          {/* Separator */}
          <div style={{ height: "1px", background: "#eae8e4", margin: "0 28px" }} />

          {/* Bottom section */}
          <div
            className="flex flex-col items-center justify-center flex-1"
            style={{
              padding: "24px 28px 36px 28px",
              gap: "16px",
            }}
          >
            <span
              className="font-sans"
              style={{
                fontSize: "11px",
                color: showError ? "#e74c3c" : "#b0ada8",
                textTransform: "lowercase",
                letterSpacing: "0.04em",
                fontWeight: 400,
                transition: "color 0.3s ease",
              }}
            >
              {showError ? "Select a service first to get a quote" : "or explore everything"}
            </span>
            <div onClick={handleStartScoping}>
              <LiquidMetalButton label="start scoping" />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ animation: "fadeSlideIn 0.4s ease-out", flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
          <QuotingFlow
            onBack={handleBack}
            initialBadgeId={selectedBadge?.id || "websites"}
          />
        </div>
      )}
    </div>
  )
}
