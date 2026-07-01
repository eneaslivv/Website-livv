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
    "Bots de WhatsApp con IA para empresas | LIVV Creative Studio — Argentina",
  description:
    "Bots de WhatsApp con IA a medida para empresas de Argentina y LATAM: atención 24/7, calificación automática de leads e integración con tu CRM. Sobre la API oficial de WhatsApp Business. Estudio senior en Buenos Aires.",
  alternates: {
    canonical: "/bots-de-whatsapp",
    languages: {
      "es-AR": "/bots-de-whatsapp",
      "x-default": "/bots-de-whatsapp",
    },
  },
  openGraph: {
    title: "Bots de WhatsApp con IA para empresas — LIVV Creative Studio",
    description:
      "Atención 24/7 y calificación de leads por WhatsApp, con IA a medida integrada a tu CRM.",
    url: `${SITE_URL}/bots-de-whatsapp`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué hace un bot de WhatsApp con IA?",
    a: "Responde consultas al instante las 24 horas, entiende lo que el cliente escribe (no solo botones fijos), califica al lead según tus criterios, agenda o deriva a una persona cuando hace falta, y deja todo registrado en tu CRM. A diferencia de un bot de menú, un bot con IA mantiene contexto y responde en lenguaje natural.",
  },
  {
    q: "¿Atiende 24/7 y califica leads automáticamente?",
    a: "Sí. El bot responde fuera de horario y en picos de demanda sin que se te escape una consulta, y hace las preguntas necesarias para calificar al lead (presupuesto, urgencia, tipo de necesidad). Los leads calificados llegan ordenados a tu equipo o a tu CRM, listos para cerrar.",
  },
  {
    q: "¿Se integra con mi CRM y mis sistemas?",
    a: "Sí. Conectamos el bot con tu CRM, tus formularios, tu calendario y las herramientas que ya uses, vía API o conectores. El objetivo es que la conversación de WhatsApp se convierta en datos accionables, no en mensajes sueltos.",
  },
  {
    q: "¿Usa la API oficial de WhatsApp Business?",
    a: "Sí. Trabajamos sobre la API oficial de WhatsApp Business, que es la forma correcta y estable de operar bots a escala, con tu número verificado y sin riesgo de bloqueos como pasa con soluciones no oficiales.",
  },
  {
    q: "¿En qué se diferencia de un bot genérico o barato?",
    a: "Un bot genérico sigue un árbol de opciones fijo y se rompe cuando el cliente escribe algo distinto. El nuestro usa IA real (Claude / OpenAI), entiende contexto, se conecta a tus datos con RAG y se construye a medida de tu operación. LIVV tiene productos de IA propios en producción — construimos la IA, no revendemos plantillas.",
  },
  {
    q: "¿Cuánto cuesta un bot de WhatsApp con IA?",
    a: "El precio se cierra antes de empezar y depende del alcance: cantidad de flujos, integraciones y nivel de IA. Trabajamos con precio fijo por proyecto o retainer mensual, con transparencia total de costo antes del kickoff.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Bots de WhatsApp con IA",
  alternateName: "AI WhatsApp bots",
  slug: "bots-de-whatsapp",
  url: `${SITE_URL}/bots-de-whatsapp`,
  description:
    "Bots de WhatsApp con IA a medida para empresas de Argentina y Latinoamérica: atención 24/7, calificación de leads e integración con CRM sobre la API oficial de WhatsApp Business.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "Bots de WhatsApp", url: `${SITE_URL}/bots-de-whatsapp` },
])

export default function BotsDeWhatsappPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Bots de WhatsApp con IA · Buenos Aires, Argentina"
      title="Bots de WhatsApp con IA para empresas."
      intro="LIVV Creative Studio construye bots de WhatsApp con IA a medida para empresas de Argentina y Latinoamérica: atienden 24/7, entienden lo que el cliente escribe, califican leads y dejan todo en tu CRM. Sobre la API oficial de WhatsApp Business, con IA real (Claude / OpenAI), por un estudio senior en Buenos Aires."
      facts={[
        { label: "Qué hacemos", value: "Bots de WhatsApp con IA a medida" },
        { label: "Para quién", value: "Empresas y pymes de LATAM" },
        { label: "Base", value: "API oficial de WhatsApp Business" },
        { label: "Tecnología", value: "Claude · OpenAI · RAG" },
        { label: "Integra", value: "CRM · formularios · calendario" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
      ]}
      sections={[
        {
          title: "Qué resuelve",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>No perder consultas fuera de horario ni en picos.</li>
              <li>Calificar leads automáticamente antes de que llegue a tu equipo.</li>
              <li>Responder preguntas frecuentes al instante y con contexto.</li>
              <li>Derivar a una persona cuando la conversación lo amerita.</li>
              <li>Registrar todo en tu CRM como datos, no como mensajes sueltos.</li>
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
            description: "Automatizá procesos de negocio, no solo WhatsApp.",
          },
          {
            href: "/agentes-de-ia",
            name: "Agentes de IA a medida",
            description: "Agentes que investigan, responden y ejecutan tareas.",
          },
          {
            href: "/crm-a-medida",
            name: "CRM a medida",
            description: "Un CRM que se integra con WhatsApp y tus leads.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Se te escapan consultas por WhatsApp? Contanos tu operación y te proponemos un bot que las capture y califique."
    />
  )
}
