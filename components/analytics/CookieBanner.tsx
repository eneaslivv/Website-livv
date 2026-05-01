'use client'

import { useEffect, useState } from 'react'
import { acceptAll, applyConsent, readConsent, rejectAll } from '@/lib/consent'

export function CookieBanner() {
    const [visible, setVisible] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        const stored = readConsent()
        if (!stored) {
            setVisible(true)
            return
        }
        applyConsent(stored)
    }, [])

    if (!visible) return null

    return (
        <div
            role="dialog"
            aria-label="Cookie consent"
            // Mobile: stacked ABOVE the chat widget (which sits at bottom-right with ~120px height when expanded).
            // Desktop: pinned to the bottom-LEFT corner, so it never collides with the chat in the bottom-right.
            className="fixed bottom-[132px] left-3 right-3 max-w-[280px] sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[280px] z-[100] p-3 rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 text-white shadow-2xl"
        >
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Cookies</p>
            <p className="text-[11px] sm:text-xs text-white/75 leading-snug mb-2.5">
                Usamos cookies para medir tráfico y mejorar el sitio.
            </p>

            {showDetails && (
                <ul className="text-[10px] text-white/55 mb-2.5 space-y-1 border-l border-white/10 pl-2">
                    <li><span className="text-white/90">Esenciales</span> — siempre activas.</li>
                    <li><span className="text-white/90">Analítica</span> — Google Analytics anónimo.</li>
                    <li><span className="text-white/90">Marketing</span> — Ads y Meta Pixel.</li>
                </ul>
            )}

            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => { acceptAll(); setVisible(false) }}
                    className="flex-1 py-1.5 px-3 bg-white text-black rounded-full text-[10px] uppercase tracking-wider font-medium hover:bg-[#C4A35A] transition-colors"
                >
                    Aceptar
                </button>
                <button
                    onClick={() => { rejectAll(); setVisible(false) }}
                    className="py-1.5 px-3 text-[10px] uppercase tracking-wider text-white/55 hover:text-white transition-colors border border-white/10 rounded-full"
                >
                    Rechazar
                </button>
                <button
                    onClick={() => setShowDetails(v => !v)}
                    aria-label={showDetails ? 'Ocultar detalles' : 'Ver detalles'}
                    className="text-white/35 hover:text-white/70 transition-colors text-base leading-none px-1"
                >
                    {showDetails ? '−' : '+'}
                </button>
            </div>
        </div>
    )
}
