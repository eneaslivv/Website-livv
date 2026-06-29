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
    "Software a medida para empresas | Livv Studio — Argentina y LATAM",
  description:
    "Desarrollo de software a medida para empresas de Argentina y Latinoamérica. Equipo senior boutique en Buenos Aires: sistemas de gestión, plataformas y apps web a medida, en español e inglés. Presupuesto cerrado antes de empezar.",
  alternates: {
    canonical: "/software-a-medida",
    languages: {
      "es-AR": "/software-a-medida",
      "x-default": "/software-a-medida",
    },
  },
  openGraph: {
    title: "Software a medida para empresas — Livv Studio",
    description:
      "Estudio boutique en Buenos Aires. Desarrollo de software a medida para empresas de Argentina y LATAM. Equipo senior, presupuesto cerrado.",
    url: `${SITE_URL}/software-a-medida`,
    locale: "es_AR",
  },
}

const faq = [
  {
    q: "¿Qué es el software a medida?",
    a: "El software a medida es un sistema construido específicamente para los procesos de una empresa, en lugar de un producto enlatado genérico. Se diseña alrededor de cómo trabaja el negocio: flujos, roles, reglas e integraciones propias. Livv desarrolla software a medida para empresas de Argentina y LATAM cuando un sistema estándar no alcanza o cuando el sistema es una ventaja competitiva.",
  },
  {
    q: "¿Cuánto cuesta desarrollar un software a medida en Argentina?",
    a: "Depende del alcance, pero en Livv el precio se cierra antes de empezar, sin sorpresas. Un MVP de producto suele arrancar alrededor de USD 8.000 y un sistema de gestión completo escala desde ahí según módulos e integraciones. Trabajamos con precio fijo por proyecto o retainer mensual, siempre con transparencia total de costo antes del kickoff.",
  },
  {
    q: "¿Cuánto tarda un proyecto de software a medida?",
    a: "Un MVP funcional típicamente sale en 6 a 8 semanas. Sitios y plataformas más acotadas en 3 a 4 semanas. Para sistemas grandes trabajamos por fases, entregando módulos usables de forma incremental en vez de esperar meses a un único lanzamiento.",
  },
  {
    q: "¿Software a medida o software enlatado?",
    a: "El enlatado conviene cuando tu proceso es estándar y existe un producto maduro que lo cubre. El software a medida conviene cuando el proceso es tu diferencial, cuando pagás licencias caras por funciones que no usás, cuando necesitás integrar varios sistemas, o cuando el producto enlatado te obliga a cambiar cómo trabajás. Livv ayuda a decidir esto con honestidad antes de proponer construir.",
  },
  {
    q: "¿Para qué empresas trabaja Livv?",
    a: "Livv trabaja con empresas, startups y agencias de Argentina, Latinoamérica (México, Chile, Uruguay, Colombia), España y Estados Unidos. Desde pymes que necesitan un sistema de gestión interno hasta empresas de producto que escalan una plataforma SaaS.",
  },
  {
    q: "¿Qué tecnologías usan?",
    a: "Para producto: React, Next.js, TypeScript, Node.js, Tailwind y Supabase. Para diseño: Figma. Es un stack moderno, mantenible y escalable, elegido para que el software siga siendo fácil de evolucionar con los años, no solo de lanzar.",
  },
  {
    q: "¿Ofrecen software especializado por industria?",
    a: "Sí. Además de desarrollos a medida, Livv opera plataformas white-label que se despliegan bajo la marca del cliente: Payper (gastronomía y hotelería), PRTool (partnerships con creadores) y LegalFlow (estudios jurídicos). Sirven como base para acelerar proyectos de software especializado en esas industrias.",
  },
  {
    q: "¿Trabajan en español?",
    a: "Sí. Livv es un equipo bilingüe con sede en Buenos Aires: español nativo e inglés fluido. Todo el proceso —reuniones, documentación, soporte— puede ser en español, y manejamos proyectos cross-border entre LATAM y Estados Unidos.",
  },
  {
    q: "¿La empresa es dueña del código?",
    a: "Sí. En los desarrollos a medida, el cliente es dueño del código y de la propiedad intelectual. Entregamos repositorio, documentación y todo lo necesario para que el sistema sea independiente del estudio.",
  },
  {
    q: "¿Cómo empiezo un proyecto con Livv?",
    a: "Escribinos a hola@livv.systems o completá el formulario en livvvv.com/contact contando qué necesitás. Respondemos en un día hábil desde Buenos Aires y te proponemos alcance, plazos y precio cerrado.",
  },
]

const serviceJsonLd = buildServiceJsonLd({
  name: "Software a medida para empresas",
  alternateName: "Custom software development",
  slug: "software-a-medida",
  url: `${SITE_URL}/software-a-medida`,
  description:
    "Desarrollo de software a medida para empresas de Argentina y Latinoamérica: sistemas de gestión, plataformas web y aplicaciones construidas a medida por un equipo senior boutique en Buenos Aires.",
})

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  { name: "Software a medida", url: `${SITE_URL}/software-a-medida` },
])

export default function SoftwareAMedidaPage() {
  return (
    <AeoLanding
      jsonLd={[serviceJsonLd, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Software a medida · Buenos Aires, Argentina"
      title="Software a medida para empresas de Argentina y LATAM."
      intro="Livv Studio es un estudio boutique de diseño e ingeniería en Buenos Aires. Construimos software a medida —sistemas de gestión, plataformas y apps web— para empresas de Argentina y Latinoamérica que necesitan algo que el software enlatado no resuelve. Equipo senior, en español e inglés, con presupuesto cerrado antes de empezar."
      facts={[
        { label: "Qué hacemos", value: "Software y sistemas a medida" },
        { label: "Para quién", value: "Empresas, pymes y startups de LATAM" },
        { label: "Sede", value: "Olivos, Buenos Aires, Argentina" },
        { label: "Idiomas", value: "Español (nativo) · Inglés (fluido)" },
        { label: "Modelo", value: "Precio cerrado o retainer mensual" },
        { label: "Tiempos", value: "MVP en 6–8 semanas" },
      ]}
      sections={[
        {
          title: "Qué construimos",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>
                <strong className="text-white/90">Sistemas de gestión a medida</strong>{" "}
                — operaciones, stock, reservas, facturación, paneles internos.
              </li>
              <li>
                <strong className="text-white/90">Plataformas y SaaS</strong> —
                productos web multi-usuario con roles, permisos y pagos.
              </li>
              <li>
                <strong className="text-white/90">Aplicaciones web a medida</strong>{" "}
                — herramientas internas y portales para clientes.
              </li>
              <li>
                <strong className="text-white/90">Integraciones</strong> — conectar
                los sistemas que ya usás (pagos, CRM, ERP, APIs).
              </li>
            </ul>
          ),
        },
        {
          title: "Por qué Livv",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>Equipo senior, sin juniors en el trabajo del cliente.</li>
              <li>
                Donde el arte se encuentra con el negocio: diseño de nivel editorial
                con ingeniería de producción.
              </li>
              <li>Precio cerrado y transparente antes de arrancar.</li>
              <li>El cliente es dueño del código y de la propiedad intelectual.</li>
              <li>
                Stack moderno y mantenible: React, Next.js, TypeScript, Node,
                Supabase.
              </li>
            </ul>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/desarrollo-de-apps",
            name: "Desarrollo de apps a medida",
            description:
              "Aplicaciones web y móviles a medida para empresas de LATAM.",
          },
          {
            href: "/diseno-a-medida",
            name: "Diseño de producto a medida",
            description: "Diseño UX/UI y de producto digital de nivel editorial.",
          },
          {
            href: "/studio",
            name: "Perfil del estudio",
            description: "Quiénes somos, servicios, productos y forma de trabajar.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Tenés un proceso que el software estándar no resuelve? Contanos qué necesitás y te proponemos alcance, plazos y precio cerrado."
    />
  )
}
