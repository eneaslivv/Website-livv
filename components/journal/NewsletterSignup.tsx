"use client"

import { useState } from "react"

/**
 * Newsletter signup. Embedded mid-article and at end per LIVV editorial
 * brief section 7.1. Minimal aesthetic — single email input, single
 * submit, no copy bloat.
 *
 * The form action is intentionally TODO until the user picks a platform
 * (Buttondown vs Beehiiv — open item #8 in the brief). Once chosen, this
 * component POSTs to whatever endpoint that platform exposes, or to a
 * Next.js Route Handler at /api/newsletter that forwards to the platform.
 *
 * Uses "use client" because the form needs local validation state. The
 * input and button still ship in the initial HTML, so AI crawlers see
 * the call-to-action.
 */
export function NewsletterSignup({
  variant = "inline",
}: {
  variant?: "inline" | "footer"
}) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || status === "loading") return
    setStatus("loading")
    setErrorMessage(null)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: variant }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Subscription failed.")
      }
      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Subscription failed.")
    }
  }

  const isInline = variant === "inline"

  return (
    <aside
      aria-label="Newsletter signup"
      className={`my-12 ${isInline ? "border-y border-[#2A1818]/15 py-10" : "border border-[#2A1818]/15 rounded-2xl p-8"} max-w-2xl mx-auto`}
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-3">
        The Journal · Monthly
      </div>
      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#2A1818] mb-3">
        Editorial from LIVV, once a month.
      </h3>
      <p className="text-sm text-[#2A1818]/65 leading-relaxed mb-6">
        New essays, case studies, and what we have been reading. No promotion.
        Unsubscribe in one click.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="flex-1 px-4 py-3 rounded-full border border-[#2A1818]/15 bg-white/60 text-sm text-[#2A1818] placeholder:text-[#2A1818]/40 focus:outline-none focus:border-[#C4A35A] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="px-6 py-3 rounded-full bg-[#2A1818] text-[#FAF8F3] text-sm font-medium hover:bg-[#2A1818]/90 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed" : "Subscribe"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-xs text-[#769268] mt-3" role="status">
          Check your inbox to confirm.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-xs text-[#a13a3a] mt-3" role="alert">
          {errorMessage}
        </p>
      )}
    </aside>
  )
}
