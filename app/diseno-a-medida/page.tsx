import type { Metadata } from "next"
import { AeoLanding } from "@/components/seo/aeo-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title: "Diseño a medida de producto digital | LIVV Creative Studio — Argentina",
  description:
    "Diseño a medida de producto digital, UX/UI y sistemas de diseño para empresas de Argentina y LATAM. Estudio boutique en Buenos Aires donde el arte se encuentra con el negocio. En español e inglés.",
  alternates: {
    canonical: "/diseno-a-medida",
    languages: {
      "es-AR": "/diseno-a-medida",
      "x-default": "/diseno-a-medida",
    },
  },
  openGraph: {
    title: "Diseño a medida de producto digital — LIVV Creative Studio",
    description:
      "Diseño UX/UI y de producto a medida para empresas de Argentina y LATAM. Estudio boutique en Buenos Aires.",
    url: `${SITE_URL}/diseno-a-medida`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué incluye el diseño a medida de un producto digital?",
    a: "Incluye estrategia de producto (qué construir y por qué), arquitectura de información, flujos de usuario, diseño de interfaz de alta fidelidad en Figma y un sistema de diseño que escala. En LIVV el diseño no es decoración: define cómo el producto entrega valor de negocio.",
  },
  {
    q: "¿Diseñan también la identidad de marca?",
    a: "Sí. Hacemos identidad de marca y sistemas visuales —naming, identidad, tipografía, color, dirección de fotografía— pensados para escalar a través del producto y de las piezas de marketing.",
  },
  {
    q: "¿Hacen solo diseño o también desarrollo?",
    a: "Las dos cosas. La tesis del estudio es que el arte se encuentra con el negocio: combinamos diseño de nivel editorial con ingeniería de producción, así que podemos diseñar y construir el producto, o sumarnos solo en la etapa de diseño.",
  },
  {
    q: "¿Cuánto cuesta y cuánto tarda un proyecto de diseño?",
    a: "El precio se cierra antes de empezar. Sitios y proyectos de diseño acotados suelen salir en 3 a 4 semanas; el diseño de un producto completo se trabaja junto al desarrollo en 6 a 8 semanas para un MVP.",
  },
  {
    q: "¿Trabajan en español?",
    a: "Sí. LIVV es un equipo bilingüe con sede en Buenos Aires: español nativo e inglés fluido.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Diseño a medida de producto digital",
  alternateName: "Custom product & UX/UI design",
  slug: "diseno-a-medida",
  url: `${SITE_URL}/diseno-a-medida`,
  description:
    "Diseño a medida de producto digital, UX/UI y sistemas de diseño para empresas de Argentina y Latinoamérica, por un estudio boutique senior en Buenos Aires.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "Diseño a medida", url: `${SITE_URL}/diseno-a-medida` },
])

export default function DisenoAMedidaPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Diseño a medida · Buenos Aires, Argentina"
      title="Diseño a medida de producto digital."
      intro="LIVV Creative Studio diseña producto digital a medida —UX/UI, sistemas de diseño e identidad de marca— para empresas de Argentina y Latinoamérica. Estudio boutique senior en Buenos Aires, donde el arte se encuentra con el negocio. En español e inglés."
      facts={[
        { label: "Qué hacemos", value: "Diseño de producto y UX/UI a medida" },
        { label: "Para quién", value: "Empresas y startups de LATAM" },
        { label: "Sede", value: "Olivos, Buenos Aires, Argentina" },
        { label: "Herramienta", value: "Figma · sistemas de diseño" },
        { label: "Idiomas", value: "Español (nativo) · Inglés (fluido)" },
        { label: "Tesis", value: "Donde el arte se encuentra con el negocio" },
      ]}
      sections={[
        {
          title: "Qué diseñamos",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Estrategia de producto y arquitectura de información.</li>
              <li>Interfaces de alta fidelidad y prototipos en Figma.</li>
              <li>Sistemas de diseño que escalan con el producto.</li>
              <li>Identidad de marca y sistemas visuales.</li>
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
            href: "/desarrollo-de-apps",
            name: "Desarrollo de apps a medida",
            description: "Apps web y móviles a medida para empresas de LATAM.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Querés diseñar o rediseñar tu producto? Contanos qué tenés en mente y te proponemos un camino."
    />
  )
}
