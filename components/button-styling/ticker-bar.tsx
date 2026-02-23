"use client"

const industries = [
  "saas founders",
  "dev agencies",
  "startups",
  "ecommerce",
  "fintech",
  "health tech",
  "ai companies",
  "creative studios",
  "enterprise",
]

export function TickerBar() {
  // Triple the items to ensure we have enough content to bridge the loop gap
  const tripled = [...industries, ...industries, ...industries]

  return (
    <div
      className="relative z-50 w-full overflow-hidden"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e0ddd8",
      }}
    >
      <div
        className="flex items-center overflow-hidden"
        style={{ height: "clamp(40px, 6vh, 48px)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "ticker 30s linear infinite",
            gap: "clamp(32px, 4vw, 56px)",
            paddingLeft: "clamp(12px, 3vw, 20px)",
          }}
        >
          {tripled.map((name, i) => (
            <span
              key={i}
              className="flex items-center"
              style={{ gap: "12px" }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "clamp(12px, 2.5vw, 16px)",
                  fontWeight: 700,
                  color: "#2d2d2d",
                  letterSpacing: "-0.01em",
                  textTransform: "lowercase",
                }}
              >
                {name}
              </span>
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#d4a574",
                  opacity: 0.6,
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
