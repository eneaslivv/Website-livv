"use client"

import { ScopeCard } from "@/components/button-styling/scope-card"

export default function EmbedQuotePage() {
    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px 16px",
                    background: "transparent",
                }}
            >
                <ScopeCard />
            </div>
            <style jsx global>{`
                html,
                body {
                    background: transparent !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                body {
                    overflow-x: hidden;
                    cursor: auto !important;
                }
                @keyframes fadeSlideIn {
                    0% {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    )
}
