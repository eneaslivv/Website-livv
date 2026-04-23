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
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[100] p-5 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/10 text-white shadow-2xl"
        >
            <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Privacy</p>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
                Usamos cookies para medir tráfico, personalizar contenido y mejorar campañas de marketing. Puedes aceptar todas o solo las esenciales.
            </p>

            {showDetails && (
                <ul className="text-xs text-white/60 mb-4 space-y-1.5 border-l border-white/10 pl-3">
                    <li><span className="text-white">Esenciales</span> — seguridad y funcionamiento (siempre activas).</li>
                    <li><span className="text-white">Analítica</span> — Google Analytics para entender uso anónimo.</li>
                    <li><span className="text-white">Marketing</span> — Google Ads, Meta Pixel y remarketing.</li>
                </ul>
            )}

            <div className="flex flex-col gap-2">
                <button
                    onClick={() => { acceptAll(); setVisible(false) }}
                    className="w-full py-2.5 bg-white text-black rounded-full text-xs uppercase tracking-widest font-medium hover:bg-[#C4A35A] transition-colors"
                >
                    Aceptar todo
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={() => { rejectAll(); setVisible(false) }}
                        className="flex-1 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors border border-white/10 rounded-full"
                    >
                        Solo esenciales
                    </button>
                    <button
                        onClick={() => setShowDetails(v => !v)}
                        className="flex-1 py-2 text-xs uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors"
                    >
                        {showDetails ? 'Ocultar' : 'Detalles'}
                    </button>
                </div>
            </div>
        </div>
    )
}
