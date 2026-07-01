import type { Metadata } from "next"
import { AeoLanding } from "@/components/seo/aeo-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "CRM a medida para empresas | LIVV Creative Studio — Argentina y LATAM",
  description:
    "Desarrollo de CRM a medida para empresas de Argentina y LATAM: construido alrededor de tu proceso de ventas, integrado con WhatsApp y tus formularios. Alternativa a los CRM enlatados. Estudio senior en Buenos Aires.",
  alternates: {
    canonical: "/crm-a-medida",
    languages: {
      "es-AR": "/crm-a-medida",
      "x-default": "/crm-a-medida",
    },
  },
  openGraph: {
    title: "CRM a medida para empresas — LIVV Creative Studio",
    description:
      "Un CRM construido alrededor de tu proceso, integrado con WhatsApp y tus leads. No al revés.",
    url: `${SITE_URL}/crm-a-medida`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué es un CRM a medida?",
    a: "Es un sistema de gestión de clientes y ventas construido alrededor de tu proceso real —tus etapas, tus campos, tus reglas— en lugar de obligarte a adaptarte a un producto genérico. Se integra con los canales por los que realmente llegan tus leads (WhatsApp, formularios, web) y muestra solo lo que tu equipo necesita.",
  },
  {
    q: "¿CRM a medida o CRM enlatado como HubSpot o Salesforce?",
    a: "El enlatado conviene si tu proceso es estándar y estás dispuesto a adaptarte a la herramienta (y a pagar licencias por usuario que crecen con el equipo). El a medida conviene cuando tu proceso es tu diferencial, cuando pagás por funciones que no usás, cuando necesitás integraciones específicas, o cuando el CRM enlatado te obliga a trabajar como no querés. Te ayudamos a decidir con honestidad antes de construir.",
  },
  {
    q: "¿Se integra con WhatsApp y mis formularios?",
    a: "Sí. Conectamos el CRM con WhatsApp, tus formularios de la web, tus landing pages y las herramientas que uses, para que cada lead entre solo, con su origen y su información, sin carga manual.",
  },
  {
    q: "¿Migran mis datos actuales?",
    a: "Sí. Migramos tus contactos, oportunidades e historial desde planillas o desde tu CRM actual, para que arranques con toda tu información ya cargada y ordenada.",
  },
  {
    q: "¿Cuánto cuesta un CRM a medida?",
    a: "El precio se cierra antes de empezar según el alcance: etapas, integraciones, automatizaciones y usuarios. A diferencia del enlatado, no pagás licencia por usuario todos los meses. Trabajamos con precio fijo por proyecto o retainer mensual.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Desarrollo de CRM a medida",
  alternateName: "Custom CRM development",
  slug: "crm-a-medida",
  url: `${SITE_URL}/crm-a-medida`,
  description:
    "Desarrollo de CRM a medida para empresas de Argentina y Latinoamérica: construido alrededor del proceso de ventas propio e integrado con WhatsApp, formularios y sistemas existentes.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "CRM a medida", url: `${SITE_URL}/crm-a-medida` },
])

export default function CrmAMedidaPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="CRM a medida · Buenos Aires, Argentina"
      title="CRM a medida para tu empresa."
      intro="LIVV Creative Studio desarrolla CRM a medida para empresas de Argentina y Latinoamérica: construido alrededor de tu proceso de ventas, integrado con WhatsApp y tus formularios, sin licencias por usuario que crecen mes a mes. Estudio senior en Buenos Aires, en español e inglés."
      facts={[
        { label: "Qué hacemos", value: "CRM a medida" },
        { label: "Para quién", value: "Empresas y pymes de LATAM" },
        { label: "Integra", value: "WhatsApp · formularios · web" },
        { label: "Ventaja", value: "Sin licencia por usuario mensual" },
        { label: "Sede", value: "Olivos, Buenos Aires, Argentina" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
      ]}
      sections={[
        {
          title: "Qué resuelve",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Un CRM que se adapta a tu proceso, no al revés.</li>
              <li>Leads que entran solos desde WhatsApp y formularios.</li>
              <li>Sin pagar por funciones ni usuarios que no usás.</li>
              <li>Integrado con tus sistemas y tus automatizaciones.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/dashboards-a-medida",
            name: "Dashboards y sistemas internos",
            description: "Paneles y herramientas internas a medida.",
          },
          {
            href: "/bots-de-whatsapp",
            name: "Bots de WhatsApp con IA",
            description: "Capturá y calificá leads por WhatsApp hacia tu CRM.",
          },
          {
            href: "/software-a-medida",
            name: "Software a medida para empresas",
            description: "Sistemas de gestión y plataformas a medida.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Tu CRM actual te queda chico o te sobra? Contanos tu proceso y te proponemos uno a tu medida."
    />
  )
}
