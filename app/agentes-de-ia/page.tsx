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
    "Agentes de IA a medida para empresas | LIVV Creative Studio — Argentina y LATAM",
  description:
    "Desarrollo de agentes de IA a medida para empresas de Argentina y LATAM: agentes que investigan, responden, sintetizan y ejecutan tareas. Claude y OpenAI, RAG sobre tus datos. Estudio senior en Buenos Aires con un agente propio en producción (PM Agent).",
  alternates: {
    canonical: "/agentes-de-ia",
    languages: {
      "es-AR": "/agentes-de-ia",
      "x-default": "/agentes-de-ia",
    },
  },
  openGraph: {
    title: "Agentes de IA a medida — LIVV Creative Studio",
    description:
      "Agentes de IA que investigan, responden y ejecutan tareas. Claude/OpenAI + RAG sobre tus datos.",
    url: `${SITE_URL}/agentes-de-ia`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué es un agente de IA?",
    a: "Un agente de IA es un sistema que no solo responde: toma un objetivo, decide los pasos, usa herramientas (busca en tus datos, llama a otras APIs, escribe documentos) y ejecuta la tarea de punta a punta. Es el escalón por encima de un chatbot: en vez de contestar una pregunta, hace el trabajo.",
  },
  {
    q: "¿En qué se diferencia de un chatbot?",
    a: "Un chatbot responde mensajes. Un agente actúa: puede investigar información, cruzar datos de varios sistemas, generar un reporte, cargar algo en tu CRM o disparar un flujo. El chatbot conversa; el agente resuelve tareas.",
  },
  {
    q: "¿Qué puede hacer un agente de IA para mi empresa?",
    a: "Ejemplos concretos: investigar y calificar prospectos, sintetizar el estado de proyectos, generar y clasificar documentos, responder soporte con acceso a tu base de conocimiento, revisar y ordenar datos, y automatizar reportes recurrentes. Diseñamos el agente alrededor del trabajo repetitivo que más tiempo te quita.",
  },
  {
    q: "¿Con qué modelos y tecnología trabajan?",
    a: "Anthropic Claude y OpenAI para el razonamiento, RAG y bases vectoriales para que el agente conozca tus datos, e integraciones a medida para que pueda actuar sobre tus sistemas. Stack: Next.js, TypeScript, Node, Supabase.",
  },
  {
    q: "¿Qué es RAG y por qué importa?",
    a: "RAG (Retrieval-Augmented Generation) es conectar la IA a tus propios datos —documentos, base de conocimiento, historial— para que responda con tu información y no invente. Es lo que hace que un agente sea útil para tu empresa en lugar de dar respuestas genéricas.",
  },
  {
    q: "¿Tienen un agente propio en producción?",
    a: "Sí. LIVV construyó PM Agent, un agente de gestión de proyectos que automatiza standups, planificación y síntesis de estado, que usamos internamente y licenciamos a otros estudios. Construimos agentes de IA de verdad, con experiencia real en producción.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Desarrollo de agentes de IA a medida",
  alternateName: "Custom AI agent development",
  slug: "agentes-de-ia",
  url: `${SITE_URL}/agentes-de-ia`,
  description:
    "Desarrollo de agentes de IA a medida para empresas de Argentina y Latinoamérica: agentes que investigan, responden, sintetizan y ejecutan tareas con Claude/OpenAI y RAG sobre datos propios.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "Agentes de IA", url: `${SITE_URL}/agentes-de-ia` },
])

export default function AgentesDeIaPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Agentes de IA · Buenos Aires, Argentina"
      title="Agentes de IA a medida para empresas."
      intro="LIVV Creative Studio desarrolla agentes de IA a medida para empresas de Argentina y Latinoamérica: sistemas que investigan, responden, sintetizan y ejecutan tareas de punta a punta. Claude y OpenAI, RAG sobre tus datos, por un estudio senior en Buenos Aires con un agente propio en producción (PM Agent)."
      facts={[
        { label: "Qué hacemos", value: "Agentes de IA a medida" },
        { label: "Para quién", value: "Empresas y pymes de LATAM" },
        { label: "Modelos", value: "Anthropic Claude · OpenAI" },
        { label: "Datos", value: "RAG sobre tu información" },
        { label: "Prueba real", value: "PM Agent en producción" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
      ]}
      sections={[
        {
          title: "Qué construimos",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Agentes de investigación y calificación (prospectos, datos).</li>
              <li>Agentes de soporte con acceso a tu base de conocimiento.</li>
              <li>Agentes de operación: reportes, síntesis, tareas recurrentes.</li>
              <li>Agentes integrados a tus sistemas para que actúen, no solo hablen.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA",
            description: "Automatizá procesos de negocio con IA a medida.",
          },
          {
            href: "/bots-de-whatsapp",
            name: "Bots de WhatsApp con IA",
            description: "Atención 24/7 y calificación de leads por WhatsApp.",
          },
          {
            href: "/software-a-medida",
            name: "Software a medida para empresas",
            description: "Sistemas y plataformas a medida para LATAM.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Qué tarea repetitiva te gustaría delegar a un agente? Contanos y te proponemos por dónde empezar."
    />
  )
}
