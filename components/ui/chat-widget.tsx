"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight, ChevronLeft, X } from "lucide-react"
import { trackChatOpen } from "@/lib/analytics"

// Existing public LIVV contact number, in WhatsApp international format.
const WHATSAPP_NUMBER = "5491137991815"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Eneas! I'd like to talk about a project with LIVV.")}`

/** Direct contact: no simulated conversation, form steps or scroll locking. */
export function ChatWidget() {
    const [compact, setCompact] = useState(false)

    return (
        <aside className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-[max(16px,env(safe-area-inset-right))] z-[997] max-w-[calc(100vw-40px)] md:bottom-[max(20px,env(safe-area-inset-bottom))] md:right-[max(20px,env(safe-area-inset-right))]" aria-label="Contact Eneas" data-compact={compact}>
            <a
                className={`group flex min-h-16 items-center gap-3 rounded-full border border-[#333] bg-[#0a0a0a] p-2 text-[#f7f4ee] shadow-[0_6px_26px_rgb(0_0_0/12%)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#1b1916] hover:shadow-[0_10px_30px_rgb(0_0_0/16%)] focus-visible:outline-2 focus-visible:outline-[#b38b4b] focus-visible:outline-offset-4 motion-reduce:transform-none motion-reduce:transition-none ${compact ? "" : "pr-[18px]"}`}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Eneas on WhatsApp (opens in a new tab)"
                onClick={() => trackChatOpen("whatsapp", { widget_location: window.location.pathname })}
            >
                <span
                    className="bg-[#31392b]"
                    style={{ display: "block", width: 46, height: 46, flexShrink: 0, overflow: "hidden", borderRadius: "50%" }}
                >
                    <Image
                        src="/images/senior-team-eneas.jpg"
                        alt="Eneas from LIVV"
                        width={92}
                        height={92}
                        style={{ width: 46, height: 46, objectFit: "cover" }}
                        className="origin-[55%_30%] scale-[1.75] object-[55%_35%]"
                        quality={90}
                    />
                </span>
                {!compact && <>
                    <span className="flex flex-col gap-[3px]">
                        <span className="text-[13px] font-medium leading-[18px]">Chat with Eneas</span>
                        <span className="text-[10px] leading-[14px] text-[#aaa39a]">LIVV · WhatsApp</span>
                    </span>
                    <ArrowUpRight className="ml-[3px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" size={17} aria-hidden="true" />
                </>}
            </a>
            <button
                type="button"
                className="absolute -right-1 -top-2.5 grid h-7 w-7 place-items-center rounded-full border border-[#333] bg-[#0a0a0a] text-[#aaa39a] hover:bg-[#26221d] hover:text-[#f7f4ee] focus-visible:outline-2 focus-visible:outline-[#b38b4b] focus-visible:outline-offset-4"
                onClick={() => setCompact(value => !value)}
                aria-label={compact ? "Expand contact button" : "Minimize contact button"}
                aria-expanded={!compact}
            >
                {compact ? <ChevronLeft size={12} aria-hidden="true" /> : <X size={12} aria-hidden="true" />}
            </button>
        </aside>
    )
}
