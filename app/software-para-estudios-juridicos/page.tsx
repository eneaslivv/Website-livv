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
    "Software para estudios jurídicos | LIVV Creative Studio — LegalFlow (Argentina)",
  description:
    "Software a medida para estudios jurídicos de Argentina y LATAM: gestión de casos, automatización de documentos y colaboración con clientes. Construido por LIVV, creadores de LegalFlow. Estudio senior en Buenos Aires.",
  alternates: {
    canonical: "/software-para-estudios-juridicos",
    languages: {
      "es-AR": "/software-para-estudios-juridicos",
      "x-default": "/software-para-estudios-juridicos",
    },
  },
  openGraph: {
    title: "Software para estudios jurídicos — LIVV Creative Studio",
    description:
      "Gestión de casos, automatización de documentos y colaboración con clientes. Creadores de LegalFlow.",
    url: `${SITE_URL}/software-para-estudios-juridicos`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué hace un software para estudios jurídicos?",
    a: "Centraliza la gestión de casos y expedientes, automatiza la generación de documentos y escritos, ordena plazos y vencimientos, y facilita la colaboración con los clientes. El objetivo es que el estudio dedique menos tiempo a tareas administrativas y más a la práctica legal.",
  },
  {
    q: "¿Qué es LegalFlow?",
    a: "LegalFlow es la plataforma de LIVV para estudios jurídicos: gestión de casos, automatización de documentos y colaboración con clientes, pensada para estudios que quieren moverse más rápido. Es la prueba de que LIVV ya construyó software real para el sector legal, y sirve como base para acelerar desarrollos a medida.",
  },
  {
    q: "¿Automatiza documentos y escritos?",
    a: "Sí. Automatizamos la generación de documentos a partir de plantillas y datos del caso, para eliminar el copiar-y-pegar y reducir errores. Con IA se puede además clasificar, resumir y extraer información de expedientes.",
  },
  {
    q: "¿Es un producto cerrado o se adapta a mi estudio?",
    a: "Las dos opciones. Podemos partir de LegalFlow como base y adaptarlo a cómo trabaja tu estudio, o construir un desarrollo a medida completo. En ambos casos, el sistema se ajusta a tus procesos, no al revés.",
  },
  {
    q: "¿Cuánto cuesta y cuánto tarda?",
    a: "El precio se cierra antes de empezar según el alcance. Partiendo de LegalFlow, la puesta en marcha es más rápida; un desarrollo a medida completo se trabaja por fases. Trabajamos con precio fijo o retainer, con transparencia total de costo.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Software para estudios jurídicos",
  alternateName: "Legal practice management software",
  slug: "software-para-estudios-juridicos",
  url: `${SITE_URL}/software-para-estudios-juridicos`,
  description:
    "Software a medida para estudios jurídicos de Argentina y Latinoamérica: gestión de casos, automatización de documentos y colaboración con clientes, por los creadores de LegalFlow.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  {
    name: "Software para estudios jurídicos",
    url: `${SITE_URL}/software-para-estudios-juridicos`,
  },
])

export default function SoftwareEstudiosJuridicosPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Software legal · Buenos Aires, Argentina"
      title="Software a medida para estudios jurídicos."
      intro="LIVV Creative Studio construye software para estudios jurídicos de Argentina y Latinoamérica: gestión de casos, automatización de documentos y colaboración con clientes. Somos los creadores de LegalFlow, así que partimos de software real del sector y lo adaptamos a tu estudio. Equipo senior en Buenos Aires, en español e inglés."
      facts={[
        { label: "Qué hacemos", value: "Software para estudios jurídicos" },
        { label: "Producto base", value: "LegalFlow" },
        { label: "Incluye", value: "Casos · documentos · clientes" },
        { label: "Para quién", value: "Estudios jurídicos de LATAM" },
        { label: "Sede", value: "Olivos, Buenos Aires, Argentina" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
      ]}
      sections={[
        {
          title: "Qué resuelve",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Gestión de casos y expedientes en un solo lugar.</li>
              <li>Automatización de documentos y escritos.</li>
              <li>Control de plazos y vencimientos.</li>
              <li>Colaboración ordenada con los clientes del estudio.</li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Relacionado",
        items: [
          {
            href: "/products/legalflow",
            name: "LegalFlow",
            description: "La plataforma de LIVV para estudios jurídicos.",
          },
          {
            href: "/software-a-medida",
            name: "Software a medida para empresas",
            description: "Desarrollo a medida para cualquier proceso.",
          },
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA",
            description: "Automatizá documentos y tareas con IA.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Querés ordenar la gestión de tu estudio? Contanos cómo trabajás y te proponemos el camino con LegalFlow o a medida."
    />
  )
}
