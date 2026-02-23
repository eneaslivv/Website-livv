"use client"

import React from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const accounts = [
  { name: "GlobalOS", icon: "G", color: "#d4734b", country: "Argentina", mrr: "$7,513", vol: "$64,406" },
  { name: "PRTool", icon: "PR", color: "#e8a87c", country: "USA", mrr: "$1,352", vol: "$7,989" },
  { name: "LegalFlow", icon: "L", color: "#845ec2", country: "Spain", mrr: "$1,122", vol: "$22,112" },
  { name: "PM Agent", icon: "PM", color: "#ff6f91", country: "UK", mrr: "$3,290", vol: "$11,378" },
  { name: "Registrar", icon: "R", color: "#00c9a7", country: "Mexico", mrr: "$27,840", vol: "$265,202" },
]

const agentSteps = [
  { label: "Scope", status: "done" as const },
  { label: "Design", status: "done" as const },
  { label: "Build", status: "active" as const },
  { label: "Deploy", status: "pending" as const },
]

export function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [activeStep, setActiveStep] = useState(2)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const cardRotateX = useSpring(useTransform(mouseY, [-200, 200], [2, -2]), springConfig)
  const cardRotateY = useSpring(useTransform(mouseX, [-300, 300], [-2, 2]), springConfig)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      className="relative w-full overflow-hidden rounded-2xl border border-[#ddd5cc]/50 group"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >



      <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-8 sm:px-12 lg:px-16 py-10 sm:py-14">


        {/* Center: Stacked cards */}
        <div className="flex-1 w-full max-w-2xl mx-auto relative" style={{ perspective: "1200px" }}>
          <motion.div
            className="relative"
            style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: "preserve-3d" }}
          >
            {/* Dashboard card */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="rounded-xl overflow-hidden border border-[#ddd5cc]/30"
                style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px) saturate(1.3)", WebkitBackdropFilter: "blur(16px) saturate(1.3)", boxShadow: "0 2px 24px rgba(44,36,32,0.07), inset 0 1px 0 rgba(255,255,255,0.8)" }}
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#ede7e0]/80 bg-[#faf8f5]/90">
                  <div className="flex gap-1">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#e0d6cc]" />
                    <div className="w-[6px] h-[6px] rounded-full bg-[#e0d6cc]" />
                    <div className="w-[6px] h-[6px] rounded-full bg-[#e0d6cc]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1 px-2 py-px rounded bg-[#ede7e0]/60 text-[8px] text-[#8a7e74]">
                      <svg className="w-[7px] h-[7px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      dashboard.globalos.com
                    </div>
                  </div>
                </div>

                {/* Agent pipeline bar -- integrated inside the dashboard */}
                <div className="px-3.5 py-2 border-b border-[#ede7e0]/60 bg-[#fdfcfa]/80">
                  <div className="flex items-center gap-1 mb-1.5">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#b8836e] to-[#c9a48a] flex items-center justify-center">
                      <svg className="w-1.5 h-1.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    </div>
                    <span className="text-[9px] font-semibold text-[#2c2420]/80">Agent Pipeline</span>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[8px] text-emerald-600/80 font-medium">Live</span>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="flex items-center gap-0">
                    {agentSteps.map((step, i) => {
                      const isActive = i === activeStep
                      const isDone = i < activeStep || (activeStep === 0 && i === 3 ? false : i < activeStep)
                      const isPending = i > activeStep

                      return (
                        <React.Fragment key={step.label}>
                          <motion.div
                            className="flex items-center gap-1"
                            animate={{ opacity: isPending ? 0.4 : 1 }}
                            transition={{ duration: 0.4 }}
                          >
                            <motion.div
                              className="w-4 h-4 rounded-md flex items-center justify-center border transition-colors duration-300"
                              style={{
                                borderColor: isActive ? "#b8836e" : isDone ? "#c9a48a50" : "#ddd5cc60",
                                background: isActive ? "rgba(184,131,110,0.12)" : isDone ? "rgba(201,164,138,0.06)" : "transparent",
                              }}
                              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              {isDone ? (
                                <svg className="w-2 h-2 text-[#b8836e]" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                              ) : isActive ? (
                                <motion.div
                                  className="w-1.5 h-1.5 rounded-full bg-[#b8836e]"
                                  animate={{ opacity: [1, 0.4, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                />
                              ) : (
                                <div className="w-1 h-1 rounded-full bg-[#ddd5cc]" />
                              )}
                            </motion.div>
                            <span className={`text-[7px] font-medium ${isActive ? "text-[#b8836e]" : isDone ? "text-[#8a7e74]" : "text-[#c9bfb5]"}`}>{step.label}</span>
                          </motion.div>

                          {i < agentSteps.length - 1 && (
                            <div className="flex-1 h-[1px] mx-1 relative overflow-hidden">
                              <div className="absolute inset-0 bg-[#e8ded4]" />
                              {(isDone || isActive) && (
                                <motion.div
                                  className="absolute inset-y-0 left-0 bg-[#c9a48a]"
                                  initial={{ width: "0%" }}
                                  animate={{ width: isDone ? "100%" : isActive ? "60%" : "0%" }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                              )}
                              {isActive && (
                                <motion.div
                                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#b8836e]"
                                  style={{ boxShadow: "0 0 4px rgba(184,131,110,0.5)" }}
                                  animate={{ left: ["0%", "60%", "0%"] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                              )}
                            </div>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>

                {/* Table */}
                <div className="px-3.5 py-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-semibold text-[#2c2420]">Connected accounts</p>
                    <span className="text-[8px] text-[#8a7e74] px-1.5 py-0.5 rounded bg-[#ede7e0]/60">{accounts.length} active</span>
                  </div>

                  <div className="grid grid-cols-[1fr_65px_65px_75px] gap-px mb-1">
                    {["Accounts", "Region", "MRR", "Volume"].map(h => (
                      <span key={h} className="text-[7px] font-semibold text-[#8a7e74]/70 uppercase tracking-wider">{h}</span>
                    ))}
                  </div>

                  {accounts.map((r, i) => (
                    <motion.div
                      key={r.name}
                      className="grid grid-cols-[1fr_65px_65px_75px] gap-px py-[4px] border-b border-[#ede7e0]/40 last:border-0 items-center hover:bg-[#faf8f5]/80 transition-colors rounded-sm"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-[16px] h-[16px] rounded-[4px] flex items-center justify-center shrink-0" style={{ backgroundColor: `${r.color}15` }}>
                          <span className="text-[6px] font-bold" style={{ color: r.color }}>{r.icon}</span>
                        </div>
                        <span className="text-[9px] font-medium text-[#2c2420] truncate">{r.name}</span>
                      </div>
                      <span className="text-[8px] text-[#8a7e74] hidden sm:block">{r.country}</span>
                      <span className="text-[8px] text-[#2c2420] tabular-nums">{r.mrr}</span>
                      <span className="text-[8px] text-[#2c2420] tabular-nums">{r.vol}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Receipt card (overlapping front) */}
            <motion.div
              className="absolute -left-4 sm:-left-8 top-8 z-20 w-[170px] sm:w-[195px]"
              initial={{ opacity: 0, y: 25, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: "translateZ(40px)" }}
            >
              <div
                className="rounded-xl p-3.5 relative border border-white/50"
                style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", boxShadow: "0 12px 40px rgba(44,36,32,0.1), 0 2px 6px rgba(44,36,32,0.04), inset 0 1px 0 rgba(255,255,255,0.9)" }}
              >

                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#d4734b] to-[#b8836e] flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">G</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#2c2420]">GlobalOS</span>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <p className="text-[9px] text-[#8a7e74] leading-relaxed mb-2.5">Payment confirmed. Thank you.</p>

                {[
                  ["Order", "#294546"],
                  ["Date", "Feb 6, 2026"],
                ].map(([label, value], i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-[#ede7e0]/40">
                    <span className="text-[8px] text-[#8a7e74]">{label}</span>
                    <span className="text-[8px] font-medium text-[#2c2420]">{value}</span>
                  </div>
                ))}

                <div className="mt-2 pt-2 border-t border-[#ddd5cc]/40 flex items-center justify-between">
                  <span className="text-[8px] text-[#8a7e74]">Total</span>
                  <span className="text-[13px] font-semibold text-[#2c2420]">$49<span className="text-[9px] font-normal text-[#8a7e74]">.00</span></span>
                </div>

                {/* Animated progress bar */}
                <div className="mt-2.5 h-1 rounded-full overflow-hidden bg-[#ede7e0]/60">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#b8836e] to-[#c9a48a]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
