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
    "Software para gastronomía y hotelería | LIVV Creative Studio — Payper (Argentina)",
  description:
    "Software de gestión para restaurantes, bares y hoteles de Argentina y LATAM: comandas por QR, gestión de cocina y pagos en una sola plataforma. Construido por LIVV, creadores de Payper. White-label. Estudio senior en Buenos Aires.",
  alternates: {
    canonical: "/software-para-gastronomia",
    languages: {
      "es-AR": "/software-para-gastronomia",
      "es-ES": "/software-para-gastronomia",
      es: "/software-para-gastronomia",
      "x-default": "/software-para-gastronomia",
    },
  },
  openGraph: {
    title: "Software para gastronomía y hotelería — LIVV Creative Studio",
    description:
      "Comandas por QR, gestión de cocina y pagos en una plataforma. Creadores de Payper.",
    url: `${SITE_URL}/software-para-gastronomia`,
    locale: "es_AR",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
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
        { label: "Payper bajo tu marca", value: "Licencia desde USD 19–39/mes" },
        { label: "Puesta en marcha", value: "Setup desde USD 999" },
        { label: "Desarrollo a medida sobre la base", value: "Desde USD 1.500, precio cerrado" },
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
        {
          title: "El sector menos digitalizado es el que más tiene para ganar",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Según la Encuesta Nacional sobre Adopción de IA en Pymes
                publicada en 2026 por el CEPE de la Universidad Torcuato Di
                Tella junto a Fundar, sobre 402 empresas, la adopción de IA por
                sector queda así: software e IT 85,4%, textil 47,4%,
                metalmecánica 40,6%, y alimentos 29,9%. Alimentos es el último
                de la lista.
              </p>
              <p>
                Es fácil leer ese número como que la tecnología no aplica al
                rubro. La lectura correcta es la contraria: en gastronomía, el
                local de la otra cuadra tampoco la está usando. En software e IT
                digitalizarse es ponerse al día; en gastronomía todavía es
                diferenciarse.
              </p>
              <p>
                Y el margen concreto está en la operación de hora pico, que es
                donde se pierde plata sin que aparezca en ningún reporte:
                pedidos mal tomados, mesas que rotan lento, cocina que no sabe
                qué entra, y stock que se descubre faltante cuando ya no hay
                tiempo de reponer.
              </p>
            </div>
          ),
        },
        {
          title: "Dos caminos, los dos con precio publicado",
          body: (
            <div className="space-y-6 text-white/70">
              <p>
                Payper ya existe y está en producción, así que no hace falta
                empezar por un desarrollo entero. Hay un camino corto y uno
                largo, y la mayoría de los locales empieza por el corto.
              </p>
              <div>
                <p className="text-white mb-1">
                  Camino corto: Payper desplegado con tu marca
                </p>
                <p>
                  El sistema ya construido, con la identidad de tu local,
                  configurado sobre tu carta y tu forma de trabajar. Licencia
                  desde USD 19 a 39 por mes según el plan, más una puesta en
                  marcha desde USD 999 por única vez. Estás operando en semanas,
                  no en meses.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">
                  Camino largo: desarrollo a medida sobre esa base
                </p>
                <p>
                  Cuando la operación tiene algo que ninguna plataforma cubre,
                  se construye a medida. Precio cerrado antes de empezar: las
                  automatizaciones e integraciones con IA arrancan en USD 1.500,
                  y una aplicación completa va de USD 3.000 a 5.000 o más según
                  el alcance. El cliente es dueño del código.
                </p>
              </div>
              <p>
                Si tenés varios locales o una marca que quiere su propio
                sistema, el white-label es el camino: el producto sale con tu
                nombre y tus clientes nunca ven el nuestro. Si no sabés todavía
                por dónde empezar, el{" "}
                <Link
                  href="/diagnostico-de-automatizacion"
                  className="text-white underline underline-offset-4"
                >
                  diagnóstico sin cargo
                </Link>{" "}
                termina con una lista priorizada de procesos de tu operación.
              </p>
            </div>
          ),
        },
        {
          title: "Por qué te lo dice un estudio que ya lo construyó",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Payper no es una propuesta ni una maqueta. Es software en
                producción, construido por el mismo equipo que te va a atender.
                Es la diferencia entre contratar a alguien que va a aprender el
                rubro gastronómico con tu local y contratar a alguien que ya
                resolvió el problema.
              </p>
              <p>
                LIVV tiene cinco productos propios funcionando con usuarios
                pagando, y Payper es el de gastronomía y hotelería. Es el
                criterio más barato de verificar que tenés a mano cuando estás
                comparando proveedores: pedí ver el producto funcionando antes
                de firmar nada, con nosotros o con quien sea.
              </p>
            </div>
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
          {
            href: "/diagnostico-de-automatizacion",
            name: "Diagnóstico de automatización sin cargo",
            description:
              "Treinta minutos y un informe con los procesos priorizados.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Querés agilizar el servicio de tu local? Contanos tu operación y te proponemos el camino con Payper o a medida, con el precio cerrado antes de empezar."
    />
  )
}
