import type { Metadata } from "next"
import Link from "next/link"
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
      "es-ES": "/software-para-estudios-juridicos",
      es: "/software-para-estudios-juridicos",
      "x-default": "/software-para-estudios-juridicos",
    },
  },
  openGraph: {
    title: "Software para estudios jurídicos — LIVV Creative Studio",
    description:
      "Gestión de casos, automatización de documentos y colaboración con clientes. Creadores de LegalFlow.",
    url: `${SITE_URL}/software-para-estudios-juridicos`,
    locale: "es_AR",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
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
        { label: "Para quién", value: "Estudios jurídicos de LATAM y España" },
        { label: "LegalFlow bajo tu marca", value: "Licencia desde USD 19–39/mes" },
        { label: "Puesta en marcha", value: "Setup desde USD 999" },
        { label: "Desarrollo a medida sobre la base", value: "Desde USD 1.500, precio cerrado" },
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
        {
          title: "Dónde está parado el mercado legal hoy",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                El dato que ordena la conversación: alrededor del 69% de los
                abogados argentinos todavía gestiona su práctica con soluciones
                de escritorio, carpetas físicas o planillas de Excel, según
                relevamientos del sector publicados en 2026. Mientras tanto, el
                mercado LegalTech latinoamericano crece en torno al 11% anual.
              </p>
              <p>
                Hay razones históricas para ese atraso y conviene nombrarlas
                porque condicionan cualquier proyecto: la dependencia del
                expediente electrónico del Poder Judicial de la Nación, la
                heterogeneidad de los sistemas judiciales provinciales, cada uno
                con su propio portal, y una tradición de trabajo individual o de
                estudio chico donde el software se percibió siempre como un
                gasto sin retorno claro.
              </p>
              <p>
                La lectura comercial es simple. Si tu estudio ordena su gestión
                ahora, no está alcanzando al resto del mercado: está
                adelantándose a dos tercios de él.
              </p>
            </div>
          ),
        },
        {
          title: "Dos caminos, los dos con precio publicado",
          body: (
            <div className="space-y-6 text-white/70">
              <p>
                No hace falta empezar por un desarrollo entero. LegalFlow ya
                existe y está en producción, así que hay un camino corto y uno
                largo, y la mayoría de los estudios empieza por el corto.
              </p>
              <div>
                <p className="text-white mb-1">
                  Camino corto: LegalFlow desplegado bajo tu marca
                </p>
                <p>
                  El producto ya construido, con la identidad de tu estudio,
                  configurado sobre tu forma de trabajar. Licencia desde USD 19
                  a 39 por mes según el plan, más una puesta en marcha desde USD
                  999 por única vez. Es el camino con el que estás operando en
                  semanas en vez de meses.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">
                  Camino largo: desarrollo a medida sobre esa base
                </p>
                <p>
                  Cuando el estudio tiene un proceso propio que ninguna
                  plataforma cubre, se construye a medida. Precio cerrado antes
                  de empezar: las automatizaciones e integraciones con IA
                  arrancan en USD 1.500, y una aplicación completa va de USD
                  3.000 a 5.000 o más según el alcance. El cliente es dueño del
                  código.
                </p>
              </div>
              <p>
                Lo habitual es combinarlos: arrancar con la plataforma y sumar
                a medida lo que sea específico de tu estudio. Si no sabés
                todavía en cuál de los dos caés, el{" "}
                <Link
                  href="/diagnostico-de-automatizacion"
                  className="text-white underline underline-offset-4"
                >
                  diagnóstico sin cargo
                </Link>{" "}
                termina con esa respuesta y una lista priorizada de procesos.
              </p>
            </div>
          ),
        },
        {
          title: "Por qué te lo dice un estudio que ya lo construyó",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                LegalFlow no es una propuesta ni una maqueta. Es software en
                producción, construido por el mismo equipo que te va a atender.
                Es la diferencia entre contratar a alguien que va a aprender tu
                rubro con tu proyecto y contratar a alguien que ya resolvió el
                problema una vez.
              </p>
              <p>
                LIVV tiene cinco productos propios funcionando con usuarios
                pagando, de los cuales LegalFlow es el del sector legal. Ninguna
                de las agencias con las que probablemente nos estés comparando
                puede decir lo mismo, y es el criterio más barato de verificar
                que tenés a mano: pedí ver el producto funcionando antes de
                firmar nada, con nosotros o con quien sea.
              </p>
            </div>
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
          {
            href: "/diagnostico-de-automatizacion",
            name: "Diagnóstico de automatización sin cargo",
            description:
              "Treinta minutos y un informe con los procesos priorizados.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Querés ordenar la gestión de tu estudio? Contanos cómo trabajás y te proponemos el camino con LegalFlow o a medida, con el precio cerrado antes de empezar."
    />
  )
}
