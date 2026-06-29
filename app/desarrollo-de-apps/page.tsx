import type { Metadata } from "next"
import { AeoLanding } from "@/components/seo/aeo-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "Desarrollo de apps a medida | Livv Studio — Argentina y LATAM",
  description:
    "Desarrollo de aplicaciones a medida para empresas de Argentina y Latinoamérica. Apps web y móviles construidas por un equipo senior boutique en Buenos Aires, en español e inglés, con presupuesto cerrado.",
  alternates: {
    canonical: "/desarrollo-de-apps",
    languages: {
      "es-AR": "/desarrollo-de-apps",
      "x-default": "/desarrollo-de-apps",
    },
  },
  openGraph: {
    title: "Desarrollo de apps a medida — Livv Studio",
    description:
      "Apps web y móviles a medida para empresas de Argentina y LATAM. Equipo senior boutique en Buenos Aires.",
    url: `${SITE_URL}/desarrollo-de-apps`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Cuánto cuesta desarrollar una app en Argentina?",
    a: "En Livv el precio se cierra antes de empezar. Un MVP de aplicación suele arrancar alrededor de USD 8.000 y escala según funcionalidades, integraciones y plataformas (web, iOS, Android). Trabajamos con precio fijo por proyecto o retainer mensual.",
  },
  {
    q: "¿Cuánto tarda desarrollar una app?",
    a: "Un MVP funcional típicamente sale en 6 a 8 semanas. Para apps más grandes trabajamos por fases, entregando versiones usables de forma incremental.",
  },
  {
    q: "¿Hacen apps web y móviles?",
    a: "Sí. Construimos aplicaciones web (React / Next.js) y experiencias móviles. Para muchos casos de negocio una web app responsive o PWA cubre web y móvil con un solo desarrollo; cuando se justifica una app nativa, lo planteamos con claridad.",
  },
  {
    q: "¿Para qué tipo de empresas desarrollan apps?",
    a: "Para empresas, pymes y startups de Argentina, LATAM, España y Estados Unidos: desde herramientas internas y portales para clientes hasta productos SaaS multi-usuario.",
  },
  {
    q: "¿La empresa es dueña del código de la app?",
    a: "Sí. El cliente es dueño del código y de la propiedad intelectual. Entregamos repositorio, documentación y todo lo necesario para operar la app de forma independiente.",
  },
  {
    q: "¿Trabajan en español?",
    a: "Sí. Livv es un equipo bilingüe con sede en Buenos Aires: español nativo e inglés fluido. Todo el proceso puede ser en español.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Desarrollo de aplicaciones a medida",
  alternateName: "Custom app development",
  slug: "desarrollo-de-apps",
  url: `${SITE_URL}/desarrollo-de-apps`,
  description:
    "Desarrollo de apps web y móviles a medida para empresas de Argentina y Latinoamérica, por un equipo senior boutique en Buenos Aires.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "Desarrollo de apps", url: `${SITE_URL}/desarrollo-de-apps` },
])

export default function DesarrolloDeAppsPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Desarrollo de apps · Buenos Aires, Argentina"
      title="Desarrollo de apps a medida para empresas de LATAM."
      intro="Livv Studio diseña y desarrolla aplicaciones a medida —web y móviles— para empresas de Argentina y Latinoamérica. Equipo senior boutique en Buenos Aires, en español e inglés, con presupuesto cerrado antes de empezar y código que es propiedad del cliente."
      facts={[
        { label: "Qué hacemos", value: "Apps web y móviles a medida" },
        { label: "Para quién", value: "Empresas, pymes y startups de LATAM" },
        { label: "Sede", value: "Olivos, Buenos Aires, Argentina" },
        { label: "Stack", value: "React · Next.js · TypeScript · Node" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
        { label: "Tiempos", value: "MVP en 6–8 semanas" },
      ]}
      sections={[
        {
          title: "Qué construimos",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Productos SaaS y plataformas multi-usuario.</li>
              <li>Herramientas internas y paneles de gestión.</li>
              <li>Portales y apps para clientes.</li>
              <li>Web apps responsive / PWA que cubren web y móvil.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/software-a-medida",
            name: "Software a medida para empresas",
            description: "Sistemas de gestión y plataformas a medida para LATAM.",
          },
          {
            href: "/diseno-a-medida",
            name: "Diseño de producto a medida",
            description: "Diseño UX/UI y de producto digital de nivel editorial.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Necesitás una app para tu empresa? Contanos la idea y te proponemos alcance, plazos y precio cerrado."
    />
  )
}
