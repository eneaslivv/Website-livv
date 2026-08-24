import type { Metadata } from "next"
import Link from "next/link"
import { AeoLanding } from "@/components/seo/aeo-landing"
import {
  buildBreadcrumbsJsonLd,
  buildFaqJsonLd,
  SITE_URL,
} from "@/lib/seo/structured-data"

export const metadata: Metadata = {
  title:
    "n8n vs Make vs desarrollo a medida (2026): cuál conviene para tu negocio | LIVV",
  description:
    "Comparativa honesta para dueños de negocio en Argentina y LATAM: cuándo conviene n8n, cuándo Make o Zapier, y cuándo desarrollo a medida con IA. Costos reales, mantenimiento, límites de cada camino y cómo combinarlos.",
  alternates: {
    canonical: "/n8n-vs-make-vs-desarrollo-a-medida",
    languages: {
      "es-AR": "/n8n-vs-make-vs-desarrollo-a-medida",
      "x-default": "/n8n-vs-make-vs-desarrollo-a-medida",
    },
  },
  openGraph: {
    title: "n8n vs Make vs desarrollo a medida: cuál conviene (2026)",
    description:
      "Cuándo alcanza el no-code, cuándo necesitás IA a medida, costos reales de cada camino y las combinaciones que mejor funcionan.",
    url: `${SITE_URL}/n8n-vs-make-vs-desarrollo-a-medida`,
    locale: "es_AR",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" }],
  },
}

const faq = [
  {
    q: "¿n8n o Make para una pyme argentina?",
    a: "Si nadie en tu equipo es técnico, Make: es más simple de operar y la curva de aprendizaje es menor. Si tenés alguien con perfil técnico (o un partner que lo opere), n8n conviene a volumen alto: se puede self-hostear, con lo cual el costo deja de escalar con la cantidad de operaciones, algo clave con precios en dólares.",
  },
  {
    q: "¿Cuándo conviene desarrollo a medida en lugar de no-code?",
    a: "Cuando el proceso necesita entender lenguaje o tomar decisiones (responder consultas, leer documentos, calificar leads), cuando el flujo es el corazón de tu operación y no podés depender de los límites de una plataforma, o cuando el costo mensual del no-code a tu volumen ya supera la cuota de un desarrollo propio. La automatización a medida con IA arranca en torno a USD 1.500 con precio cerrado.",
  },
  {
    q: "¿Puedo empezar con no-code y migrar a medida después?",
    a: "Sí, y suele ser el camino sano: validás el proceso con Make o n8n, y cuando el volumen o la complejidad lo justifican, migrás las partes críticas a código propio. Lo importante es documentar los flujos desde el día uno para que la migración no sea arqueología.",
  },
  {
    q: "¿Quién mantiene la automatización cuando algo se rompe?",
    a: "Es la pregunta que casi nadie hace antes de empezar. Las APIs cambian, los tokens vencen y los flujos se caen en silencio. Con no-code, alguien de tu equipo tiene que monitorear. Con un partner como LIVV, el mantenimiento entra en un retainer mensual con alertas: si un flujo falla, nos enteramos nosotros antes que tu cliente.",
  },
  {
    q: "¿Cuánto cuesta cada camino en 2026?",
    a: "Make y n8n cloud se pagan por mes en dólares y el costo crece con el volumen de operaciones; n8n self-hosted elimina la licencia pero suma servidor y alguien que lo administre. El desarrollo a medida con LIVV es precio cerrado: automatizaciones e integraciones con IA desde USD 1.500, agentes a medida entre USD 2.500 y 5.000, y retainer mensual opcional para mantenimiento y mejoras.",
  },
  {
    q: "¿Y Zapier?",
    a: "Zapier juega en la misma liga que Make: catálogo de integraciones enorme y muy fácil de usar, pero suele resultar más caro a volumen alto. Para una pyme de LATAM pagando en dólares, Make o n8n suelen dar mejor relación costo-beneficio. La lógica de esta comparativa aplica igual.",
  },
]

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  {
    name: "n8n vs Make vs desarrollo a medida",
    url: `${SITE_URL}/n8n-vs-make-vs-desarrollo-a-medida`,
  },
])

export default function N8nVsMakeVsAMedidaPage() {
  return (
    <AeoLanding
      jsonLd={[buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Comparativa 2026 · Automatización · Argentina y LATAM"
      title="n8n vs Make vs desarrollo a medida: cuál conviene para tu negocio."
      intro="Escrita por un equipo que usa los tres caminos en proyectos reales. La respuesta corta: para conectar apps con lógica simple, el no-code alcanza y sobra; para procesos que entienden lenguaje y toman decisiones, necesitás IA a medida; y la mayoría de las operaciones bien armadas combinan ambos. Acá va el criterio completo, con costos y sin humo."
      facts={[
        { label: "Make", value: "Conectar apps sin código, operación simple" },
        { label: "n8n", value: "No-code técnico, self-host, volumen alto" },
        { label: "A medida + IA", value: "Procesos que entienden y deciden" },
        { label: "Costo no-code", value: "Mensual en USD, crece con el volumen" },
        { label: "Costo a medida", value: "Cerrado, desde USD 1.500" },
        { label: "Lo más común", value: "Combinar: no-code + IA a medida" },
      ]}
      sections={[
        {
          title: "Cuándo conviene cada camino",
          body: (
            <div className="space-y-6 text-white/70">
              <div>
                <p className="text-white mb-1">Make (o Zapier): el punto de partida</p>
                <p>
                  Ideal para conectar herramientas que ya usás con reglas
                  simples: cuando entra un lead, cargalo en la planilla y avisá
                  por Slack; cuando alguien paga, generá la factura. Lo opera
                  una persona no técnica, se arma en días y el costo inicial es
                  bajo. Su límite: cuando el flujo necesita interpretar texto
                  libre, decidir con contexto o manejar excepciones, los
                  escenarios se vuelven espagueti.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">n8n: no-code para equipos técnicos</p>
                <p>
                  Misma idea que Make pero pensado para perfiles técnicos: nodos
                  de código, control de versiones y, sobre todo, la opción de
                  self-hostearlo. A volumen alto eso cambia la economía: en vez
                  de pagar por operación en dólares, pagás un servidor fijo.
                  Requiere alguien que lo administre: si no lo tenés, ese ahorro
                  se convierte en flujos caídos que nadie mira.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">
                  Desarrollo a medida con IA: cuando el proceso piensa
                </p>
                <p>
                  Responder consultas de clientes con el tono de tu negocio,
                  leer y clasificar documentos, calificar leads, mantener
                  contexto de una conversación: eso no se resuelve con
                  escenarios de no-code, se resuelve con IA a medida (Claude,
                  OpenAI, RAG sobre tus datos). También conviene cuando el flujo
                  es el corazón de la operación y no querés que viva en una
                  plataforma de terceros: el código es tuyo, corre donde vos
                  quieras y escala sin costo por operación.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Los costos reales, sin vueltas",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                <span className="text-white">No-code:</span> arranca barato y
                crece con el uso. Make y n8n cloud cobran suscripción mensual en
                dólares que escala con las operaciones; Zapier suele ser el más
                caro de los tres a igual volumen. n8n self-hosted elimina la
                licencia, pero suma servidor y horas de administración.
              </p>
              <p>
                <span className="text-white">A medida con LIVV:</span> precio
                cerrado antes de empezar. Automatización o integración con IA
                desde USD 1.500; agente de IA a medida entre USD 2.500 y 5.000;
                sistema RAG sobre tus propios datos entre USD 2.000 y 5.000.
                Mantenimiento y mejoras por retainer mensual opcional. El código
                queda de tu propiedad.
              </p>
              <p>
                La cuenta que importa: si tu no-code ya cuesta más por mes que
                la cuota de un desarrollo propio, o si el proceso falla seguido
                porque el no-code no lo banca, cambió la ecuación.
              </p>
            </div>
          ),
        },
        {
          title: "Lo que nadie te cuenta antes de automatizar",
          body: (
            <ul className="space-y-2 list-disc list-inside text-white/70">
              <li>
                Las automatizaciones se rompen en silencio: APIs que cambian,
                tokens que vencen. Sin monitoreo, te enterás por un cliente
                enojado.
              </li>
              <li>
                El costo real del no-code no es la licencia: es la persona de tu
                equipo que pasa horas armando y arreglando escenarios.
              </li>
              <li>
                Automatizar un proceso desordenado lo único que hace es producir
                desorden más rápido. Primero se ordena el proceso, después se
                automatiza.
              </li>
              <li>
                La combinación gana: no-code para mover datos entre sistemas, IA
                a medida para la parte que entiende y decide. Es como armamos la
                mayoría de los proyectos en LIVV.
              </li>
            </ul>
          ),
        },
        {
          title: "Checklist para decidir en 5 preguntas",
          body: (
            <ol className="space-y-2 list-decimal list-inside text-white/70">
              <li>
                ¿El flujo sigue reglas fijas o necesita interpretar y decidir?
                Reglas fijas: no-code. Interpretar: IA a medida.
              </li>
              <li>
                ¿Cuántas operaciones por mes? Pocas: Make. Muchas y tenés perfil
                técnico: n8n. Muchas y es crítico: a medida.
              </li>
              <li>¿Quién lo va a mantener cuando falle un martes a la noche?</li>
              <li>
                ¿El proceso es el corazón de tu negocio? Si se cae y perdés
                ventas, no lo dejes en manos de una plataforma de terceros.
              </li>
              <li>
                ¿Cuánto vale la hora que hoy pierde tu equipo? Esa es la vara
                contra la que se compara cualquier presupuesto.
              </li>
            </ol>
          ),
        },
        {
          title: "¿No sabés cuál es tu caso?",
          body: (
            <p className="text-white/70">
              Para eso armamos el{" "}
              <Link
                href="/diagnostico-de-automatizacion"
                className="text-white underline underline-offset-4"
              >
                diagnóstico de automatización sin cargo
              </Link>
              : una llamada de 30 minutos y un informe con los 3 procesos que
              más te conviene automatizar, la herramienta adecuada para cada uno
              (aunque sea no-code y no nos contrates) y el impacto estimado.
            </p>
          ),
        },
      ]}
      related={{
        title: "Seguí leyendo",
        items: [
          {
            href: "/diagnostico-de-automatizacion",
            name: "Diagnóstico de automatización sin cargo",
            description: "30 minutos + informe con tus 3 quick wins.",
          },
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA para empresas",
            description: "Qué automatizamos y cómo trabajamos.",
          },
          {
            href: "/agentes-de-ia",
            name: "Agentes de IA a medida",
            description: "Agentes que investigan, responden y ejecutan tareas.",
          },
        ],
      }}
      faq={faq}
      ctaLead="¿Querés que miremos tu caso concreto? Contanos qué proceso querés automatizar y te decimos con qué camino lo resolveríamos, con presupuesto cerrado."
    />
  )
}
