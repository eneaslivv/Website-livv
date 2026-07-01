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
    "Software para gastronomía y hotelería | LIVV Creative Studio — Payper (Argentina)",
  description:
    "Software de gestión para restaurantes, bares y hoteles de Argentina y LATAM: comandas por QR, gestión de cocina y pagos en una sola plataforma. Construido por LIVV, creadores de Payper. White-label. Estudio senior en Buenos Aires.",
  alternates: {
    canonical: "/software-para-gastronomia",
    languages: {
      "es-AR": "/software-para-gastronomia",
      "x-default": "/software-para-gastronomia",
    },
  },
  openGraph: {
    title: "Software para gastronomía y hotelería — LIVV Creative Studio",
    description:
      "Comandas por QR, gestión de cocina y pagos en una plataforma. Creadores de Payper.",
    url: `${SITE_URL}/software-para-gastronomia`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué hace un software de gestión gastronómica?",
    a: "Unifica la operación de un local: toma de pedidos (incluido QR en la mesa), gestión de cocina, mozos, mesas, cobros y reportes. El objetivo es acelerar el servicio, reducir errores entre salón y cocina, y tener el control del local en un solo sistema.",
  },
  {
    q: "¿Qué es Payper?",
    a: "Payper es la plataforma de LIVV para gastronomía y hotelería: un sistema operativo para el rubro que integra pedidos por QR, gestión de cocina y pagos. Es la prueba de que LIVV ya construyó software real para el sector, y sirve como base para poner en marcha proyectos rápido.",
  },
  {
    q: "¿Incluye comandas por QR y pagos?",
    a: "Sí. El cliente escanea el QR de la mesa, ve la carta, pide y puede pagar desde el teléfono; el pedido entra directo a cocina. Esto descomprime al personal en horas pico y acelera la rotación de mesas.",
  },
  {
    q: "¿Sirve para bares y hoteles además de restaurantes?",
    a: "Sí. La plataforma está pensada para restaurantes, bares y hoteles. Los módulos se adaptan al tipo de operación —desde un bar de alto volumen hasta el room service de un hotel.",
  },
  {
    q: "¿Se puede usar con mi marca (white-label)?",
    a: "Sí. Payper es white-label: se despliega bajo tu marca. Y si tu operación necesita algo específico, lo desarrollamos a medida sobre esa base. El precio se cierra antes de empezar según el alcance.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Software para gastronomía y hotelería",
  alternateName: "Restaurant & hospitality management software",
  slug: "software-para-gastronomia",
  url: `${SITE_URL}/software-para-gastronomia`,
  description:
    "Software de gestión para restaurantes, bares y hoteles de Argentina y Latinoamérica: comandas por QR, gestión de cocina y pagos, por los creadores de Payper. White-label.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  {
    name: "Software para gastronomía",
    url: `${SITE_URL}/software-para-gastronomia`,
  },
])

export default function SoftwareGastronomiaPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Software gastronómico · Buenos Aires, Argentina"
      title="Software para restaurantes, bares y hoteles."
      intro="LIVV Creative Studio construye software de gestión para gastronomía y hotelería en Argentina y Latinoamérica: comandas por QR, gestión de cocina y pagos en una sola plataforma. Somos los creadores de Payper, así que partimos de software real del rubro. White-label, equipo senior en Buenos Aires, en español e inglés."
      facts={[
        { label: "Qué hacemos", value: "Software gastronómico y hotelero" },
        { label: "Producto base", value: "Payper" },
        { label: "Incluye", value: "Comandas QR · cocina · pagos" },
        { label: "Para quién", value: "Restaurantes · bares · hoteles" },
        { label: "White-label", value: "Se despliega con tu marca" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
      ]}
      sections={[
        {
          title: "Qué resuelve",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Pedidos por QR en la mesa, directo a cocina.</li>
              <li>Gestión de cocina, mesas y personal en un sistema.</li>
              <li>Cobros y pagos integrados.</li>
              <li>Menos errores entre salón y cocina, más rotación en horas pico.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Relacionado",
        items: [
          {
            href: "/products/payper",
            name: "Payper",
            description: "La plataforma de LIVV para gastronomía y hotelería.",
          },
          {
            href: "/software-a-medida",
            name: "Software a medida para empresas",
            description: "Desarrollo a medida para cualquier operación.",
          },
          {
            href: "/dashboards-a-medida",
            name: "Dashboards a medida",
            description: "Métricas del local en tiempo real.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Querés agilizar el servicio de tu local? Contanos tu operación y te proponemos el camino con Payper o a medida."
    />
  )
}
