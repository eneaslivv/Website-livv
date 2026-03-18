"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { LiquidMetalButton } from "./liquid-metal-button"
import { ArrowLeft, SkipForward, Send, Mail } from "lucide-react"
import { submitLead } from "@/lib/lead-ingest"

// --- Data definitions ---

interface BadgeConfig {
  id: string
  label: string
  questions: Question[]
  complexityWeight: number
}

interface Question {
  text: string
  options: string[]
  weight: number
}

interface ChatMessage {
  role: "system" | "user"
  text: string
  type?: "text" | "options" | "email-capture" | "summary" | "cta"
  options?: string[]
}

const BADGES: BadgeConfig[] = [
  {
    id: "webflow", label: "Webflow", complexityWeight: 1,
    questions: [
      { text: "Is this a new website or a redesign?", options: ["New website", "Redesign", "Migration"], weight: 1 },
      { text: "How many core pages are involved?", options: ["Landing only", "Small site (3-5)", "Full site (6-10+)"], weight: 1.5 },
      { text: "Do you need CMS or dynamic content?", options: ["No CMS needed", "Basic CMS", "Advanced CMS"], weight: 1.2 },
    ],
  },
  {
    id: "wordpress", label: "WordPress", complexityWeight: 1,
    questions: [
      { text: "Is this a new build or existing site?", options: ["New build", "Existing site update", "Migration from another platform"], weight: 1 },
      { text: "What level of customization?", options: ["Theme-based", "Semi-custom", "Fully custom"], weight: 1.5 },
      { text: "Do you need e-commerce?", options: ["No", "Simple store", "Advanced WooCommerce"], weight: 1.3 },
    ],
  },
  {
    id: "framer", label: "Framer", complexityWeight: 1.1,
    questions: [
      { text: "What type of site are you building?", options: ["Landing page", "Multi-page site", "Portfolio / showcase"], weight: 1 },
      { text: "Do you need custom interactions?", options: ["Minimal", "Moderate scroll/hover effects", "Complex interactive elements"], weight: 1.4 },
      { text: "Will this need a CMS?", options: ["Static only", "Basic CMS", "Structured CMS"], weight: 1.1 },
    ],
  },
  {
    id: "claude", label: "Claude / AI", complexityWeight: 1.8,
    questions: [
      { text: "What are we building?", options: ["Chatbot / assistant", "Content generation tool", "AI-powered automation"], weight: 1.2 },
      { text: "How complex is the AI logic?", options: ["Single prompt flow", "Multi-step with context", "Agent with tool use"], weight: 1.8 },
      { text: "Does it need to integrate with existing data?", options: ["No, standalone", "Basic API connections", "Deep system integration"], weight: 1.5 },
    ],
  },
  {
    id: "code", label: "Code / App", complexityWeight: 1.6,
    questions: [
      { text: "What are we building?", options: ["Internal tool", "Client-facing product", "Admin dashboard"], weight: 1 },
      { text: "How complex is the logic?", options: ["Basic CRUD", "Business logic & roles", "AI / automation involved"], weight: 1.7 },
      { text: "Does this integrate with existing systems?", options: ["Standalone", "Simple API", "Multiple integrations"], weight: 1.4 },
    ],
  },
  {
    id: "motion", label: "Motion design", complexityWeight: 1.3,
    questions: [
      { text: "What is the animation for?", options: ["Product UI", "App walkthrough", "Feature explanation"], weight: 1 },
      { text: "How integrated should it be?", options: ["Visual only", "UI-driven", "Data-driven"], weight: 1.5 },
    ],
  },
  {
    id: "nextjs", label: "Next.js", complexityWeight: 1.5,
    questions: [
      { text: "What type of project?", options: ["Marketing site", "Web application", "E-commerce"], weight: 1 },
      { text: "Do you need authentication?", options: ["No auth needed", "Basic auth", "Advanced roles & permissions"], weight: 1.3 },
      { text: "What about data persistence?", options: ["Static / no database", "Simple database", "Complex data model"], weight: 1.5 },
    ],
  },
  {
    id: "figma", label: "Figma", complexityWeight: 0.8,
    questions: [
      { text: "What do you need designed?", options: ["UI screens", "Full design system", "Prototype / clickable flow"], weight: 1 },
      { text: "What level of fidelity?", options: ["Wireframes", "High fidelity", "Production-ready with specs"], weight: 1.3 },
    ],
  },
  {
    id: "websites", label: "Websites", complexityWeight: 1,
    questions: [
      { text: "What type of website do you need?", options: ["Marketing / corporate", "Portfolio / personal", "E-commerce"], weight: 1 },
      { text: "How many pages?", options: ["Single page", "Small (3-5 pages)", "Large (6+ pages)"], weight: 1.3 },
      { text: "Do you have a design already?", options: ["No, need design too", "Have wireframes", "Have full designs"], weight: 0.8 },
    ],
  },
  {
    id: "landing", label: "Landing pages", complexityWeight: 0.8,
    questions: [
      { text: "What's the goal of the landing page?", options: ["Lead generation", "Product launch", "Event / waitlist"], weight: 1 },
      { text: "Do you need A/B testing or analytics?", options: ["No, just the page", "Basic analytics", "Full A/B setup"], weight: 1.2 },
    ],
  },
  {
    id: "email", label: "Email", complexityWeight: 0.7,
    questions: [
      { text: "What type of email work?", options: ["Email templates", "Full campaign", "Transactional emails"], weight: 1 },
      { text: "How many templates?", options: ["1-2 templates", "3-5 templates", "Full email system"], weight: 1.2 },
    ],
  },
  {
    id: "branding", label: "Branding", complexityWeight: 1.2,
    questions: [
      { text: "What do you need?", options: ["Logo only", "Logo + brand guidelines", "Full brand identity"], weight: 1.3 },
      { text: "Is this a new brand or rebrand?", options: ["New brand", "Brand refresh", "Complete rebrand"], weight: 1.1 },
    ],
  },
  {
    id: "mobile", label: "Mobile apps", complexityWeight: 1.8,
    questions: [
      { text: "Which platforms?", options: ["iOS only", "Android only", "Both (cross-platform)"], weight: 1.2 },
      { text: "What type of app?", options: ["Simple utility", "Social / content", "Complex with backend"], weight: 1.6 },
      { text: "Do you need a backend?", options: ["No, client-only", "Simple API", "Full backend system"], weight: 1.4 },
    ],
  },
  {
    id: "presentations", label: "Presentations", complexityWeight: 0.6,
    questions: [
      { text: "What is the presentation for?", options: ["Investor pitch", "Sales deck", "Internal / strategy"], weight: 1 },
      { text: "How many slides?", options: ["Under 10", "10-20", "20+"], weight: 1.1 },
    ],
  },
  {
    id: "ui", label: "User interface", complexityWeight: 1.2,
    questions: [
      { text: "What do you need?", options: ["UI screens", "Full design system", "Prototype"], weight: 1 },
      { text: "What level of fidelity?", options: ["Wireframes", "High fidelity", "Production-ready"], weight: 1.3 },
    ],
  },
  {
    id: "dashboards", label: "Dashboards", complexityWeight: 1.5,
    questions: [
      { text: "What type of dashboard?", options: ["Analytics / reporting", "Admin panel", "Real-time monitoring"], weight: 1.2 },
      { text: "How complex is the data?", options: ["Simple metrics", "Multiple data sources", "Complex visualizations"], weight: 1.5 },
    ],
  },
  {
    id: "automation", label: "Automation", complexityWeight: 1.4,
    questions: [
      { text: "What do you want to automate?", options: ["Workflows / processes", "Data pipelines", "Communication / notifications"], weight: 1.2 },
      { text: "How complex?", options: ["Simple trigger-action", "Multi-step workflow", "AI-powered automation"], weight: 1.5 },
    ],
  },
  {
    id: "ecommerce", label: "E-commerce", complexityWeight: 1.6,
    questions: [
      { text: "What platform?", options: ["Shopify", "Custom build", "WooCommerce"], weight: 1 },
      { text: "How many products?", options: ["Under 50", "50-500", "500+"], weight: 1.3 },
      { text: "Do you need custom features?", options: ["Standard store", "Custom checkout", "Subscriptions / memberships"], weight: 1.5 },
    ],
  },
  {
    id: "social", label: "Social Media", complexityWeight: 0.7,
    questions: [
      { text: "What do you need?", options: ["Content strategy", "Template design", "Full management"], weight: 1 },
      { text: "Which platforms?", options: ["1-2 platforms", "3-4 platforms", "Full omnichannel"], weight: 1.2 },
    ],
  },
  {
    id: "print", label: "Print design", complexityWeight: 0.7,
    questions: [
      { text: "What do you need?", options: ["Business cards / stationery", "Marketing materials", "Packaging"], weight: 1 },
      { text: "Do you have brand guidelines?", options: ["Yes, follow existing", "Need to create", "Flexible"], weight: 0.8 },
    ],
  },
  {
    id: "seo", label: "SEO", complexityWeight: 0.9,
    questions: [
      { text: "What do you need?", options: ["SEO audit", "On-page optimization", "Full SEO strategy"], weight: 1 },
      { text: "Is this for a new or existing site?", options: ["New site", "Existing site", "Migration"], weight: 1.1 },
    ],
  },
  {
    id: "analytics", label: "Analytics", complexityWeight: 1.0,
    questions: [
      { text: "What do you need tracked?", options: ["Website analytics", "Product analytics", "Marketing attribution"], weight: 1 },
      { text: "What tools do you use?", options: ["Need recommendations", "Google Analytics", "Custom setup"], weight: 1.1 },
    ],
  },
  {
    id: "api", label: "API integrations", complexityWeight: 1.4,
    questions: [
      { text: "What type of integration?", options: ["Connect two services", "Build custom API", "Complex multi-service"], weight: 1.3 },
      { text: "How many integrations?", options: ["1-2", "3-5", "5+"], weight: 1.4 },
    ],
  },
  {
    id: "saas", label: "SaaS", complexityWeight: 1.8,
    questions: [
      { text: "What stage?", options: ["MVP / prototype", "V1 launch", "Scaling existing"], weight: 1.2 },
      { text: "What features?", options: ["Basic CRUD + auth", "Multi-tenant + billing", "Complex with AI"], weight: 1.7 },
      { text: "Do you have designs?", options: ["No, need design too", "Have wireframes", "Have full designs"], weight: 0.8 },
    ],
  },
  {
    id: "ai-agents", label: "Custom AI Agents", complexityWeight: 2.1,
    questions: [
      { text: "What will the agent do?", options: ["Customer support / helpdesk", "Data analysis & insights", "Process automation & workflows", "Research & information retrieval"], weight: 1.5 },
      { text: "What LLM model?", options: ["Claude (Anthropic)", "GPT-4 (OpenAI)", "Open source (Llama, Mistral)", "Multiple models"], weight: 1.2 },
      { text: "What tools/integrations?", options: ["Knowledge base / documents", "APIs & databases", "Code execution & real-time data", "Advanced tool orchestration"], weight: 1.9 },
      { text: "How autonomous should it be?", options: ["Fully supervised", "Semi-autonomous with oversight", "Fully autonomous"], weight: 1.8 },
    ],
  },
]

const SCOPE_QUESTIONS: Question[] = [
  { text: "Do you also need the full design, or just development?", options: ["Design + development", "Development only", "Design only"], weight: 1.4 },
  { text: "Any existing brand direction?", options: ["Starting from scratch", "Have brand guidelines", "Have a reference"], weight: 0.6 },
  { text: "What's the timeline?", options: ["No rush", "Within a month", "ASAP"], weight: 0.8 },
]

// --- Pricing helper ---
function computeEstimate(score: number): { low: string; high: string } {
  const base = 800
  const low = Math.round((base + score * 420) / 100) * 100
  const high = Math.round((low * 1.6) / 100) * 100
  return {
    low: low.toLocaleString("en-US"),
    high: high.toLocaleString("en-US"),
  }
}

// --- Phases ---
type FlowPhase = "questions" | "email" | "summary"

// --- Main component ---

export function QuotingFlow({
  onBack,
  initialBadgeId,
}: {
  onBack: () => void
  initialBadgeId: string
}) {
  const badge = BADGES.find((b) => b.id === initialBadgeId) || BADGES[0]
  const allQuestions = [...badge.questions, ...SCOPE_QUESTIONS]

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [complexityScore, setComplexityScore] = useState(0)
  const [phase, setPhase] = useState<FlowPhase>("questions")
  const [chatInput, setChatInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Initialize with first question
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        {
          role: "system",
          text: allQuestions[0].text,
          type: "options",
          options: allQuestions[0].options,
        },
      ])
    }, 300)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, phase, emailSubmitted])

  const advanceQuestion = useCallback(
    (answer: string | null) => {
      const question = allQuestions[currentQuestionIndex]
      if (answer) {
        const optionIndex = question.options.indexOf(answer)
        const added = (optionIndex + 1) * question.weight * badge.complexityWeight * 0.5
        setComplexityScore((prev) => prev + added)
        setAnswers((prev) => [...prev, answer])
        setMessages((prev) => [...prev, { role: "user", text: answer, type: "text" }])
      } else {
        setMessages((prev) => [...prev, { role: "user", text: "skipped", type: "text" }])
      }

      const nextIndex = currentQuestionIndex + 1
      if (nextIndex < allQuestions.length) {
        setCurrentQuestionIndex(nextIndex)
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "system",
              text: allQuestions[nextIndex].text,
              type: "options",
              options: allQuestions[nextIndex].options,
            },
          ])
          setSelectedOption(null)
        }, 400)
      } else {
        // Done with questions -- show email capture
        setTimeout(() => {
          setPhase("email")
          setMessages((prev) => [
            ...prev,
            {
              role: "system",
              text: "almost done -- where should we send the estimate?",
              type: "email-capture",
            },
          ])
        }, 500)
      }
    },
    [badge, currentQuestionIndex],
  )

  const handleOptionClick = useCallback(
    (option: string) => {
      setSelectedOption(option)
      setTimeout(() => advanceQuestion(option), 350)
    },
    [advanceQuestion],
  )

  const handleSkip = useCallback(() => {
    advanceQuestion(null)
  }, [advanceQuestion])

  const handleEmailSubmit = useCallback(() => {
    if (!emailInput.trim() || !emailInput.includes("@")) return
    setEmailSubmitted(true)
    setMessages((prev) => [...prev, { role: "user", text: emailInput.trim(), type: "text" }])

    // Generate summary after email
    setTimeout(() => {
      setPhase("summary")
      const estimate = computeEstimate(complexityScore)
      const designIncluded = answers.some((a) => a.includes("Design"))
      const timeline = answers.find((a) => ["No rush", "Within a month", "ASAP"].includes(a)) || "flexible"

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: [
            `here's your estimate:`,
            ``,
            `service: ${badge.label}`,
            designIncluded ? `scope: design + development` : answers.some((a) => a === "Design only") ? `scope: design` : `scope: development`,
            `selections: ${answers.filter((a) => a !== "skipped").slice(0, 4).join(", ")}`,
            `timeline: ${timeline.toLowerCase()}`,
            ``,
            `estimated range:`,
          ].join("\n"),
          type: "summary",
        },
      ])
    }, 600)
  }, [emailInput, complexityScore, answers, badge])

  const handleChatSend = useCallback(() => {
    if (!chatInput.trim()) return
    setMessages((prev) => [...prev, { role: "user", text: chatInput.trim(), type: "text" }])
    const userMsg = chatInput.trim()
    setChatInput("")
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "system", text: `noted -- "${userMsg}" added to the scope. anything else?`, type: "text" },
      ])
    }, 600)
  }, [chatInput])

  const lastSystemMsg = messages.filter((m) => m.role === "system").pop()
  const isLastSystemOptions = lastSystemMsg?.type === "options"
  const estimate = computeEstimate(complexityScore)

  return (
    <div
      className="flex flex-col"
      style={{ height: "100%", minHeight: 0 }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center"
        style={{ padding: "18px 24px 14px 24px", flexShrink: 0 }}
      >
        <button
          onClick={onBack}
          className="flex items-center"
          style={{
            gap: "6px", fontSize: "10px", color: "#8a8a8a",
            background: "none", border: "none", cursor: "pointer",
            textTransform: "lowercase", letterSpacing: "0.05em", fontWeight: 500,
          }}
        >
          <ArrowLeft size={12} /> back
        </button>

        <span
          style={{
            padding: "5px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 500,
            background: "#2d2d2d", color: "#f5f2ed",
          }}
        >
          {badge.label}
        </span>

        {isLastSystemOptions ? (
          <button
            onClick={handleSkip}
            className="flex items-center"
            style={{
              gap: "4px", fontSize: "10px", color: "#aaa",
              background: "none", border: "none", cursor: "pointer",
              textTransform: "lowercase", letterSpacing: "0.05em", fontWeight: 500,
            }}
          >
            skip <SkipForward size={10} />
          </button>
        ) : (
          <div style={{ width: "40px" }} />
        )}
      </div>

      {/* Scrollable chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col"
        style={{
          gap: "10px",
          padding: "0 24px 12px 24px",
          scrollbarWidth: "none",
          minHeight: 0,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className="flex flex-col"
            style={{
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
              animation: "fadeSlideIn 0.3s ease-out",
              gap: "8px",
            }}
          >
            {/* Bubble */}
            <div
              style={{
                padding: msg.role === "user" ? "8px 14px" : "10px 16px",
                borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                fontSize: "13px", fontWeight: 400, lineHeight: 1.5,
                maxWidth: "88%",
                background: msg.role === "user" ? "#2d2d2d" : "rgba(245, 242, 237, 0.6)",
                color: msg.role === "user" ? "#f5f2ed" : "#4a4a4a",
                border: msg.role === "user" ? "none" : "1px solid #e8e5e0",
                whiteSpace: "pre-line",
              }}
            >
              {msg.text}
            </div>

            {/* Options pills */}
            {msg.type === "options" && msg === lastSystemMsg && phase === "questions" && (
              <div className="flex flex-wrap" style={{ gap: "6px", maxWidth: "88%" }}>
                {msg.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      padding: "8px 14px", borderRadius: "100px",
                      fontSize: "12px", fontWeight: 400, cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: selectedOption === option ? "1px solid #2d2d2d" : "1px solid #e0ddd8",
                      background: selectedOption === option ? "#2d2d2d" : "rgba(255,255,255,0.7)",
                      color: selectedOption === option ? "#f5f2ed" : "#5a5a5a",
                      transform: selectedOption === option ? "scale(0.97)" : "scale(1)",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Email capture inline */}
            {msg.type === "email-capture" && !emailSubmitted && (
              <div
                className="flex items-center"
                style={{
                  gap: "6px", maxWidth: "88%",
                  animation: "fadeSlideIn 0.4s ease-out",
                }}
              >
                <div
                  className="flex-1 flex items-center"
                  style={{
                    border: "1px solid #e0ddd8", borderRadius: "100px",
                    padding: "0 14px", height: "38px",
                    background: "rgba(255,255,255,0.8)",
                  }}
                >
                  <Mail size={14} style={{ color: "#b0ada8", marginRight: "8px", flexShrink: 0 }} />
                  <input
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleEmailSubmit() }}
                    placeholder="your@email.com"
                    type="email"
                    style={{
                      width: "100%", background: "none", border: "none", outline: "none",
                      fontSize: "13px", color: "#2d2d2d", fontWeight: 400,
                    }}
                  />
                </div>
                <button
                  onClick={handleEmailSubmit}
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: emailInput.includes("@") ? "#2d2d2d" : "#e8e5e0",
                    border: "none",
                    cursor: emailInput.includes("@") ? "pointer" : "default",
                    transition: "all 0.2s ease", flexShrink: 0,
                  }}
                >
                  <Send size={13} style={{ color: emailInput.includes("@") ? "#f5f2ed" : "#aaa" }} />
                </button>
              </div>
            )}

            {/* Summary pricing card */}
            {msg.type === "summary" && (
              <div
                style={{
                  width: "100%", maxWidth: "88%",
                  animation: "fadeSlideIn 0.5s ease-out",
                }}
              >
                {/* Price range */}
                <div
                  style={{
                    padding: "16px 20px", borderRadius: "16px",
                    background: "rgba(245, 242, 237, 0.4)",
                    border: "1px solid #e8e5e0",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#8a8a8a", fontWeight: 500 }}>
                    estimated range
                  </span>
                  <div style={{ marginTop: "8px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "28px", fontWeight: 300, color: "#2d2d2d", letterSpacing: "-0.02em" }}>
                      ${estimate.low}
                    </span>
                    <span style={{ fontSize: "14px", color: "#b0ada8", fontWeight: 400 }}>--</span>
                    <span style={{ fontSize: "28px", fontWeight: 300, color: "#2d2d2d", letterSpacing: "-0.02em" }}>
                      ${estimate.high}
                    </span>
                    <span style={{ fontSize: "11px", color: "#b0ada8", fontWeight: 400 }}>USD</span>
                  </div>
                </div>

                {/* Schedule call CTA */}
                <div style={{ marginTop: "4px", width: "100%" }}>
                  <LiquidMetalButton
                    label="schedule a call"
                    onClick={async () => {
                      const designIncluded = answers.some((a) => a.includes("Design"))
                      const scope = designIncluded ? "design + development" : answers.some((a) => a === "Design only") ? "design" : "development"
                      const timeline = answers.find((a) => ["No rush", "Within a month", "ASAP"].includes(a)) || "flexible"
                      const selections = answers.filter((a) => a !== "skipped").join(", ")
                      const message = [
                        `Service: ${badge.label}`,
                        `Scope: ${scope}`,
                        `Selections: ${selections}`,
                        `Timeline: ${timeline}`,
                        `Estimated range: $${estimate.low} – $${estimate.high} USD`,
                      ].join("\n")

                      try {
                        await submitLead({
                          name: emailInput.split("@")[0],
                          email: emailInput,
                          message,
                          origin: "Quoting Flow",
                          source: "website",
                          category: "quote",
                        })
                      } catch (err) {
                        console.error("Failed to save quote lead:", err)
                      }
                      window.open("https://cal.com", "_blank")
                    }}
                    fullWidth
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom input -- only after summary */}
      {phase === "summary" && (
        <div
          className="flex items-center"
          style={{
            padding: "10px 24px 18px 24px",
            gap: "8px", flexShrink: 0,
            borderTop: "1px solid #eae8e4",
            animation: "fadeSlideIn 0.4s ease-out",
          }}
        >
          <div
            className="flex-1 flex items-center"
            style={{
              border: "1px solid #e0ddd8", borderRadius: "100px",
              padding: "0 16px", height: "38px",
              background: "rgba(255,255,255,0.6)",
            }}
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleChatSend() }}
              placeholder="add details or ask anything..."
              style={{
                width: "100%", background: "none", border: "none", outline: "none",
                fontSize: "13px", color: "#2d2d2d", fontWeight: 400,
              }}
            />
          </div>
          <button
            onClick={handleChatSend}
            style={{
              width: "38px", height: "38px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: chatInput.trim() ? "#2d2d2d" : "#e8e5e0",
              border: "none",
              cursor: chatInput.trim() ? "pointer" : "default",
              transition: "all 0.2s ease", flexShrink: 0,
            }}
          >
            <Send size={13} style={{ color: chatInput.trim() ? "#f5f2ed" : "#aaa" }} />
          </button>
        </div>
      )}
    </div>
  )
}
