import type { Metadata } from "next"
import { AeoLanding } from "@/components/seo/aeo-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title:
    "Automatización con IA para empresas | LIVV Creative Studio — Argentina y LATAM",
  description:
    "Automatización de procesos con IA para empresas de Argentina y Latinoamérica: flujos automáticos, agentes que responden y califican, integraciones entre sistemas. Estudio senior en Buenos Aires con productos de IA propios en producción.",
  alternates: {
    canonical: "/automatizacion-con-ia",
    languages: {
      "es-AR": "/automatizacion-con-ia",
      "x-default": "/automatizacion-con-ia",
    },
  },
  openGraph: {
    title: "Automatización con IA para empresas — LIVV Creative Studio",
    description:
      "Automatizá procesos con IA: flujos, agentes que responden y califican, e integraciones. Estudio senior en Buenos Aires.",
    url: `${SITE_URL}/automatizacion-con-ia`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué procesos se pueden automatizar con IA en una empresa?",
    a: "Respuestas a consultas y atención al cliente, calificación y seguimiento de leads, generación y clasificación de documentos, carga y sincronización de datos entre sistemas, reportes automáticos, y flujos internos repetitivos (aprobaciones, alertas, recordatorios). La regla es simple: si es una tarea repetitiva basada en reglas o en lenguaje, probablemente se pueda automatizar.",
  },
  {
    q: "¿Cuánto cuesta automatizar procesos con IA?",
    a: "El precio se cierra antes de empezar y depende del alcance: cuántos procesos, qué sistemas hay que integrar y qué nivel de IA se necesita. Empezamos por el flujo de mayor impacto para que la automatización se pague sola, y desde ahí escalamos. Trabajamos con precio fijo por proyecto o retainer mensual.",
  },
  {
    q: "¿IA a medida o herramientas no-code como Zapier o Make?",
    a: "Ambas tienen lugar. Para conectar apps con lógica simple, Make o Zapier alcanzan y los usamos. Cuando el proceso necesita entender lenguaje, tomar decisiones, leer documentos o mantener contexto, ahí entra la IA a medida (Claude / OpenAI). En muchos proyectos combinamos las dos: no-code para el plumbing, IA a medida para la parte inteligente.",
  },
  {
    q: "¿Tengo que cambiar los sistemas que ya uso?",
    a: "No. Automatizamos sobre lo que ya tenés: WhatsApp, tu CRM, planilla, ERP, mail o la herramienta que uses. Nos integramos vía API o conectores; el objetivo es sacarte trabajo manual, no obligarte a migrar todo.",
  },
  {
    q: "¿Qué tecnología usan para la IA?",
    a: "Anthropic Claude y OpenAI para los modelos, RAG (recuperación sobre tus propios datos) cuando la IA necesita conocer tu información, y Make / Zapier o integraciones a medida para conectar sistemas. Stack de producto: Next.js, TypeScript, Node, Supabase.",
  },
  {
    q: "¿Tienen ejemplos reales de automatización con IA?",
    a: "Sí. LIVV construyó y usa internamente PM Agent, un agente de IA que automatiza standups, planificación y síntesis de estado, y que licencia a otros estudios. Además implementamos calificación automática de leads y agentes de atención para clientes. No es teoría: son sistemas en producción.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Automatización de procesos con IA",
  alternateName: "AI process automation",
  slug: "automatizacion-con-ia",
  url: `${SITE_URL}/automatizacion-con-ia`,
  description:
    "Automatización de procesos de negocio con IA para empresas de Argentina y Latinoamérica: agentes, calificación de leads, integraciones y flujos automáticos, por un estudio senior en Buenos Aires.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "Automatización con IA", url: `${SITE_URL}/automatizacion-con-ia` },
])

export default function AutomatizacionConIaPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Automatización con IA · Buenos Aires, Argentina"
      title="Automatización con IA para empresas de Argentina y LATAM."
      intro="LIVV Creative Studio automatiza procesos de negocio con IA para empresas de Argentina y Latinoamérica: flujos que hoy hacés a mano, agentes que responden y califican, e integraciones entre tus sistemas. Estudio senior en Buenos Aires, con productos de IA propios en producción (PM Agent), en español e inglés."
      facts={[
        { label: "Qué hacemos", value: "Automatización de procesos con IA" },
        { label: "Para quién", value: "Empresas y pymes de LATAM" },
        { label: "Sede", value: "Olivos, Buenos Aires, Argentina" },
        { label: "Tecnología", value: "Claude · OpenAI · RAG · Make" },
        { label: "Prueba real", value: "PM Agent en producción" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
      ]}
      sections={[
        {
          title: "Qué automatizamos",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Atención y respuestas automáticas (WhatsApp, web, mail).</li>
              <li>Calificación y seguimiento de leads.</li>
              <li>Generación, lectura y clasificación de documentos.</li>
              <li>Sincronización de datos entre tus sistemas.</li>
              <li>Reportes y alertas automáticas.</li>
            </ul>
          ),
        },
        {
          title: "Por qué LIVV",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Construimos IA de verdad, no plantillas: agentes propios en producción.</li>
              <li>Nos integramos con lo que ya usás, sin obligarte a migrar.</li>
              <li>Empezamos por el proceso de mayor impacto para que se pague solo.</li>
              <li>Equipo senior, precio cerrado, código propiedad del cliente.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/bots-de-whatsapp",
            name: "Bots de WhatsApp con IA",
            description: "Atención 24/7 y calificación de leads por WhatsApp.",
          },
          {
            href: "/agentes-de-ia",
            name: "Agentes de IA a medida",
            description: "Agentes que investigan, responden y ejecutan tareas.",
          },
          {
            href: "/software-a-medida",
            name: "Software a medida para empresas",
            description: "Sistemas y plataformas a medida para LATAM.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Qué proceso te está comiendo horas? Contanos y te proponemos por dónde empezar a automatizar con IA."
    />
  )
}
