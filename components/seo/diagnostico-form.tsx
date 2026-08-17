"use client"

import { useState } from "react"
import { submitLead } from "@/lib/lead-ingest"

/**
 * Lead form for /diagnostico-de-automatizacion. Ninth form in the
 * lead-ingest pipeline — keeps the one-origin-per-form convention so the
 * CRM can attribute diagnostic requests separately from generic contact.
 */
export function DiagnosticoForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.phone
          ? `${formData.message}\n\nWhatsApp: ${formData.phone}`
          : formData.message,
        origin: "Diagnostico Automatizacion",
        source: "website",
        category: "diagnostico",
      })

      setIsSuccess(true)
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("No se pudo enviar. Probá de nuevo o escribinos a hola@livv.systems.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="p-8 bg-[#C4A35A]/10 border border-[#C4A35A]/20 rounded-2xl">
        <h3 className="text-xl font-medium text-white mb-2">Pedido recibido</h3>
        <p className="text-white/60">
          Gracias. Te escribimos dentro de un día hábil para coordinar la llamada
          de diagnóstico.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div>
        <label
          htmlFor="diag-name"
          className="block text-xs uppercase tracking-widest text-white/40 mb-2"
        >
          Nombre
        </label>
        <input
          type="text"
          id="diag-name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label
          htmlFor="diag-email"
          className="block text-xs uppercase tracking-widest text-white/40 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="diag-email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20"
          placeholder="vos@tuempresa.com"
        />
      </div>
      <div>
        <label
          htmlFor="diag-phone"
          className="block text-xs uppercase tracking-widest text-white/40 mb-2"
        >
          WhatsApp (opcional)
        </label>
        <input
          type="tel"
          id="diag-phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20"
          placeholder="+54 9 11 ..."
        />
      </div>
      <div>
        <label
          htmlFor="diag-message"
          className="block text-xs uppercase tracking-widest text-white/40 mb-2"
        >
          ¿Qué proceso te está comiendo horas?
        </label>
        <textarea
          id="diag-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20 resize-none"
          placeholder="Ej.: responder consultas de WhatsApp, cargar pedidos a mano, armar reportes..."
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="group relative px-8 py-3 bg-white text-black overflow-hidden rounded-full transition-all hover:bg-[#C4A35A] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 text-xs uppercase tracking-widest font-medium">
          {isLoading ? "Enviando..." : "Pedir diagnóstico sin cargo"}
        </span>
      </button>
    </form>
  )
}
