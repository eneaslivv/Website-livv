"use client"

import { ScopeCard } from "@/components/scope-card"
import { TickerBar } from "@/components/ticker-bar"


export default function Page() {
  return (
    <div className="min-h-screen w-screen flex flex-col" style={{ backgroundColor: "#f5f2ed" }}>
      <main className="flex-1 relative flex flex-col">
        {/* Full-height vertical background lines -- edges only */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:flex justify-center">
          <div className="relative h-full" style={{ width: "500px" }}>
            <div className="absolute h-full" style={{ left: "0", width: "0", borderLeft: "1px solid rgba(224, 221, 216, 0.45)" }} />
            <div className="absolute h-full" style={{ left: "100%", width: "0", borderLeft: "1px solid rgba(224, 221, 216, 0.45)" }} />
          </div>
        </div>

        {/* Horizontal dashed line through center of radar area */}
        <div className="absolute pointer-events-none z-[1] hidden md:flex justify-center" style={{ top: "0", left: "0", right: "0", bottom: "0" }}>
          <div className="relative" style={{ width: "500px", height: "100%" }}>
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "-40%",
                width: "180%",
                height: "0",
                borderTop: "1px dashed rgba(200, 195, 188, 0.7)",
              }}
            />
          </div>
        </div>

        {/* Hero section */}
        <section
          className="flex flex-col items-center justify-center px-4 md:px-8 py-8 md:py-16 relative z-10"
          style={{ minHeight: "100vh" }}
        >
          {/* Hero header */}
          <div className="text-center mb-6 md:mb-10">
            <div
              className="inline-flex items-center gap-2 mb-3"
              style={{
                padding: "6px 10px",
                background: "rgba(212, 165, 116, 0.1)",
                borderRadius: "4px",
                border: "1px solid rgba(212, 165, 116, 0.2)",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#d4a574",
                  borderRadius: "50%",
                  boxShadow: "0 0 6px #d4a574",
                }}
              />
              <span
                className="font-sans"
                style={{
                  fontSize: "10px",
                  textTransform: "lowercase",
                  letterSpacing: "0.05em",
                  color: "#2d2d2d",
                  fontWeight: 500,
                }}
              >
                instant quote
              </span>
            </div>

            <h1
              className="text-balance font-sans"
              style={{
                fontSize: "clamp(32px, 8vw, 52px)",
                lineHeight: 1.05,
                marginBottom: "12px",
                fontWeight: 300,
                letterSpacing: "-0.025em",
              }}
            >
              {["Quote", " ", "Now"].map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, #8b6149 0%, #a0715a 40%, #c49478 70%, #7a5340 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: `blurReveal 0.7s ${i * 0.08}s ease-out both`,
                  }}
                >
                  {word === " " ? "\u00A0" : word}
                </span>
              ))}
            </h1>
            <p
              className="text-pretty"
              style={{
                fontSize: "clamp(13px, 4vw, 15px)",
                color: "#9a9490",
                maxWidth: "440px",
                margin: "0 auto",
                fontWeight: 300,
                lineHeight: 1.6,
                animation: "fadeSlideIn 0.8s 0.5s ease-out both",
              }}
            >
              Scope your project in seconds. Get a real-time quote, instantly.
            </p>
          </div>

          {/* Central area with radar + card */}
          <div
            style={{
              position: "relative",
              width: "clamp(280px, 100%, 500px)",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Radar rings */}
            {/* Outermost ring */}
            <div
              className="absolute rounded-full"
              style={{ width: "100%", height: "100%", border: "1px solid #e0ddd8" }}
            />

            {/* Conic glow sweep */}
            <div
              className="absolute rounded-full"
              style={{
                width: "100%",
                height: "100%",
                background:
                  "conic-gradient(from 230deg, transparent 0%, transparent 40%, rgba(44, 4, 5, 0.1) 60%, #2C0405 80%, transparent 100%)",
                maskImage: "radial-gradient(transparent 62%, black 63%)",
                WebkitMaskImage:
                  "radial-gradient(transparent 62%, black 63%)",
                opacity: 0.6,
                filter: "blur(10px)",
                animation: "pulse-rotate 8s infinite linear",
              }}
            />



            {/* Middle dashed ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: "80%",
                height: "80%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px dashed #e0ddd8",
                opacity: 0.5,
              }}
            />

            {/* Inner dark ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: "60%",
                height: "60%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid #333",
              }}
            />

            {/* Core dark circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: "40%",
                height: "40%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid #222",
                background: "radial-gradient(circle, #0a0a0a 0%, #000 100%)",
              }}
            />

            {/* HUD labels */}
            <div
              className="absolute font-sans"
              style={{
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#8a8a8a",
                fontSize: "8px",
                letterSpacing: "0.05em",
                textTransform: "lowercase",
              }}
            >
              explore services
            </div>
            <div
              className="absolute font-sans"
              style={{
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#8a8a8a",
                fontSize: "8px",
                letterSpacing: "0.05em",
                textTransform: "lowercase",
              }}
            >
              select to begin
            </div>

            {/* The white card */}
            <ScopeCard />
          </div>
        </section>

        {/* Ticker */}
        <TickerBar />
      </main>
    </div>
  )
}
