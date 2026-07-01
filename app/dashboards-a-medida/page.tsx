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
    "Dashboards y sistemas internos a medida | LIVV Creative Studio — Argentina",
  description:
    "Dashboards, paneles y sistemas internos a medida para empresas de Argentina y LATAM: métricas en tiempo real, herramientas para ordenar tu operación e integración con tus datos actuales. Estudio senior en Buenos Aires.",
  alternates: {
    canonical: "/dashboards-a-medida",
    languages: {
      "es-AR": "/dashboards-a-medida",
      "x-default": "/dashboards-a-medida",
    },
  },
  openGraph: {
    title: "Dashboards y sistemas internos a medida — LIVV Creative Studio",
    description:
      "Paneles y herramientas internas a medida: métricas en tiempo real y una sola pantalla para operar.",
    url: `${SITE_URL}/dashboards-a-medida`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué es un dashboard a medida?",
    a: "Es un panel construido específicamente para tu operación: muestra tus métricas, tus datos y las acciones que tu equipo realmente necesita, en una sola pantalla. A diferencia de un reporte genérico, se arma alrededor de cómo trabaja tu negocio y se conecta a tus fuentes de datos.",
  },
  {
    q: "¿Para qué sirve un sistema interno o panel de gestión?",
    a: "Para dejar de depender de planillas sueltas y de pedirle datos a distintas personas. Un sistema interno centraliza operaciones, stock, ventas, tareas o lo que tu negocio maneje, con permisos por rol y todo en un solo lugar. Ordena la operación y te da visibilidad en tiempo real.",
  },
  {
    q: "¿Se conecta con los sistemas y datos que ya uso?",
    a: "Sí. Integramos el dashboard con tus fuentes actuales —base de datos, CRM, ERP, planillas, APIs de terceros— para que la información llegue sola y no haya que cargarla dos veces.",
  },
  {
    q: "¿Puedo ver métricas en tiempo real?",
    a: "Sí. Diseñamos los paneles para mostrar datos actualizados en vivo (ventas, operación, KPIs) con alertas cuando algo se sale de rango, para que puedas tomar decisiones sin esperar un reporte de fin de mes.",
  },
  {
    q: "¿Cuánto tarda y cuánto cuesta?",
    a: "Un panel acotado puede salir en pocas semanas; un sistema interno completo se trabaja por fases. El precio se cierra antes de empezar según los módulos, las integraciones y la complejidad. Trabajamos con precio fijo o retainer, con transparencia total de costo.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Dashboards y sistemas internos a medida",
  alternateName: "Custom dashboards & internal tools",
  slug: "dashboards-a-medida",
  url: `${SITE_URL}/dashboards-a-medida`,
  description:
    "Dashboards, paneles y sistemas internos a medida para empresas de Argentina y Latinoamérica: métricas en tiempo real, permisos por rol e integración con datos existentes.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "Dashboards a medida", url: `${SITE_URL}/dashboards-a-medida` },
])

export default function DashboardsAMedidaPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Dashboards y sistemas internos · Buenos Aires, Argentina"
      title="Dashboards y sistemas internos a medida."
      intro="LIVV Creative Studio construye dashboards, paneles y herramientas internas a medida para empresas de Argentina y Latinoamérica: métricas en tiempo real, permisos por rol y una sola pantalla para operar. Nos integramos con los datos que ya tenés. Estudio senior en Buenos Aires, en español e inglés."
      facts={[
        { label: "Qué hacemos", value: "Dashboards y sistemas internos a medida" },
        { label: "Para quién", value: "Empresas y pymes de LATAM" },
        { label: "Incluye", value: "Métricas en vivo · permisos por rol" },
        { label: "Integra", value: "CRM · ERP · planillas · APIs" },
        { label: "Sede", value: "Olivos, Buenos Aires, Argentina" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
      ]}
      sections={[
        {
          title: "Qué resuelve",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Dejar de depender de planillas y datos dispersos.</li>
              <li>Ver la operación y los KPIs en tiempo real.</li>
              <li>Centralizar procesos internos con permisos por rol.</li>
              <li>Conectar la información de todos tus sistemas en un lugar.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/crm-a-medida",
            name: "CRM a medida",
            description: "Un CRM construido alrededor de tu proceso de ventas.",
          },
          {
            href: "/software-a-medida",
            name: "Software a medida para empresas",
            description: "Sistemas de gestión y plataformas a medida.",
          },
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA",
            description: "Automatizá lo que hoy hacés a mano.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Necesitás ver tu operación en una sola pantalla? Contanos qué datos manejás y te proponemos el panel."
    />
  )
}
