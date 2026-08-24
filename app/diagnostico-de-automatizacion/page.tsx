import type { Metadata } from "next"
import { AeoLanding } from "@/components/seo/aeo-landing"
import { DiagnosticoForm } from "@/components/seo/diagnostico-form"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title:
    "Diagnóstico de automatización con IA, sin cargo | LIVV — Argentina y LATAM",
  description:
    "Diagnóstico de automatización para tu negocio, sin cargo: llamada de 30 minutos + informe con los 3 procesos que más te conviene automatizar, impacto estimado y presupuesto cerrado. Para pymes y empresas de Argentina y LATAM.",
  alternates: {
    canonical: "/diagnostico-de-automatizacion",
    languages: {
      "es-AR": "/diagnostico-de-automatizacion",
      "x-default": "/diagnostico-de-automatizacion",
    },
  },
  openGraph: {
    title: "Diagnóstico de automatización con IA, sin cargo — LIVV",
    description:
      "Llamada de 30 minutos + informe con los 3 procesos que más te conviene automatizar y su impacto estimado. Sin compromiso.",
    url: `${SITE_URL}/diagnostico-de-automatizacion`,
    locale: "es_AR",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
}

const faq = [
  {
    q: "¿El diagnóstico es realmente sin cargo?",
    a: "Sí. Es una llamada de 30 minutos más un informe corto que te queda a vos, elijas trabajar con LIVV o no. Lo hacemos porque es la forma más honesta de mostrar cómo pensamos: si después querés implementar, ya tenés el plan y el presupuesto cerrado; si no, te llevás igual un mapa claro de qué automatizar.",
  },
  {
    q: "¿Qué incluye el informe?",
    a: "Los 3 procesos de tu negocio con mayor retorno si se automatizan, qué herramienta conviene para cada uno (no-code como Make o n8n, IA a medida, o una combinación), el impacto estimado en horas por semana, y un presupuesto cerrado por si querés avanzar. Una página, sin humo.",
  },
  {
    q: "¿Tengo que preparar algo para la llamada?",
    a: "No hace falta. Ayuda tener en la cabeza las 2 o 3 tareas que más tiempo le comen a tu equipo cada semana (responder consultas, cargar datos, armar reportes, seguir pedidos). Con eso alcanza para detectar dónde está la plata.",
  },
  {
    q: "¿Atienden empresas fuera de Argentina?",
    a: "Sí. LIVV trabaja con empresas de toda Latinoamérica, España y Estados Unidos. La llamada se hace por videollamada en español o inglés, y los proyectos se implementan en forma remota.",
  },
  {
    q: "¿Qué pasa después del diagnóstico?",
    a: "Decidís vos. Si querés implementar, empezamos por el proceso de mayor impacto con precio cerrado desde USD 1.500 y tiempos típicos de 2 a 4 semanas. Si preferís implementarlo con tu equipo o con otra agencia, el informe es tuyo igual.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Diagnóstico de automatización con IA",
  alternateName: "AI automation assessment",
  slug: "diagnostico-de-automatizacion",
  url: `${SITE_URL}/diagnostico-de-automatizacion`,
  description:
    "Diagnóstico sin cargo para pymes y empresas de Argentina y LATAM: llamada de 30 minutos más informe con los 3 procesos que más conviene automatizar, herramienta recomendada, impacto estimado y presupuesto cerrado.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  {
    name: "Diagnóstico de automatización",
    url: `${SITE_URL}/diagnostico-de-automatizacion`,
  },
])

export default function DiagnosticoDeAutomatizacionPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Diagnóstico de automatización · Sin cargo · Buenos Aires, Argentina"
      title="¿Qué conviene automatizar en tu negocio? Averigualo en 30 minutos."
      intro="Diagnóstico de automatización sin cargo para pymes y empresas: una llamada de 30 minutos y un informe con los 3 procesos que más te conviene automatizar, la herramienta adecuada para cada uno y el impacto estimado en horas por semana. Sin compromiso: el informe te queda a vos."
      facts={[
        { label: "Qué es", value: "Llamada 30 min + informe accionable" },
        { label: "Costo", value: "Sin cargo, sin compromiso" },
        { label: "Entregable", value: "3 quick wins con impacto estimado" },
        { label: "Para quién", value: "Pymes y empresas de AR y LATAM" },
        { label: "Si querés seguir", value: "Precio cerrado desde USD 1.500" },
        { label: "Quién lo hace", value: "Equipo senior de LIVV, no un bot" },
      ]}
      sections={[
        {
          title: "Cómo funciona",
          body: (
            <ol className="space-y-3 list-decimal list-inside text-white/70">
              <li>
                <span className="text-white">Nos contás tu operación.</span>{" "}
                Completás el formulario de abajo con el proceso que más horas te
                come. Te respondemos dentro de un día hábil.
              </li>
              <li>
                <span className="text-white">Llamada de 30 minutos.</span>{" "}
                Repasamos cómo trabaja tu equipo hoy: consultas, ventas, carga de
                datos, reportes, seguimiento.
              </li>
              <li>
                <span className="text-white">Informe en 48 horas.</span> Los 3
                procesos con mayor retorno, herramienta recomendada para cada uno
                (no-code, IA a medida o mixto), impacto estimado y presupuesto
                cerrado si querés implementar.
              </li>
            </ol>
          ),
        },
        {
          title: "Para quién es (y para quién no)",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                <span className="text-white">Es para vos si</span> tu equipo
                pierde horas por semana en tareas repetitivas: responder las
                mismas consultas por WhatsApp, pasar datos de un sistema a otro,
                armar reportes a mano, perseguir pedidos o cobranzas.
              </p>
              <p>
                <span className="text-white">No es para vos si</span> buscás
                solamente una charla teórica sobre IA. El diagnóstico apunta a
                decisiones concretas: qué automatizar, con qué, y cuánto cuesta.
              </p>
            </div>
          ),
        },
        {
          title: "Pedí tu diagnóstico",
          body: <DiagnosticoForm />,
        },
      ]}
      related={{
        title: "Seguí leyendo",
        items: [
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA para empresas",
            description: "Qué se puede automatizar y cómo trabajamos.",
          },
          {
            href: "/n8n-vs-make-vs-desarrollo-a-medida",
            name: "n8n vs Make vs desarrollo a medida",
            description: "Qué camino conviene según tu caso, con costos reales.",
          },
          {
            href: "/bots-de-whatsapp",
            name: "Bots de WhatsApp con IA",
            description: "Atención 24/7 y calificación de leads por WhatsApp.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Preferís escribirnos directo? Contanos qué proceso te está comiendo horas y coordinamos la llamada."
    />
  )
}
