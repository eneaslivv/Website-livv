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
    "Automatización con IA para empresas en España (2026): costes reales y cómo empezar | LIVV",
  description:
    "Guía para pymes españolas: qué cuesta automatizar con IA en 2026, qué cubre el Kit Digital, y por qué cada vez más empresas de España trabajan con estudios de Latinoamérica. Datos del INE, Banco de España y precios reales.",
  alternates: {
    canonical: "/automatizacion-con-ia-espana",
    languages: {
      "es-ES": "/automatizacion-con-ia-espana",
      es: "/automatizacion-con-ia-espana",
      "x-default": "/automatizacion-con-ia-espana",
    },
  },
  openGraph: {
    title: "Automatización con IA para empresas en España (2026)",
    description:
      "Costes reales, qué cubre el Kit Digital, y cómo funciona trabajar con un estudio de Buenos Aires desde España.",
    url: `${SITE_URL}/automatizacion-con-ia-espana`,
    locale: "es_ES",
    images: [
      { url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" },
    ],
  },
}

const faq = [
  {
    q: "¿Cuánto cuesta automatizar un proceso con IA en España en 2026?",
    a: "Las agencias españolas publican rangos de 1.500 a 3.000 € para una prueba de concepto con un solo flujo, de 8.000 a 25.000 € para un proyecto medio con varios flujos y un agente básico, y por encima de 50.000 € para implantaciones avanzadas, más un mantenimiento de 500 a 1.500 € al mes. LIVV trabaja con precio cerrado desde USD 1.500 para una automatización o un bot con IA, y entre USD 2.500 y 5.000 para un agente completo. La diferencia no es de alcance sino de base de costes: el equipo opera desde Buenos Aires.",
  },
  {
    q: "¿El Kit Digital cubre proyectos de inteligencia artificial?",
    a: "Sí. Desde la Orden TDF/39/2026 el programa incluye por primera vez categorías específicas de IA, entre ellas chatbots, analítica con machine learning y automatización inteligente. La categoría de Inteligencia Artificial se incorporó con un bono de hasta 6.000 € y el Gobierno destinó 40 millones de euros a esa línea. El bono digital general va de 2.000 a 29.000 € según el tamaño de la empresa. Conviene confirmar el importe y los plazos vigentes con un agente digitalizador antes de planificar el proyecto.",
  },
  {
    q: "¿Por qué una empresa española contrataría un estudio de Argentina?",
    a: "Por las dos barreras que las propias empresas españolas declaran como principales. Según la Encuesta sobre Actividad Empresarial del Banco de España, la falta de personal cualificado la señala el 45,8% y los altos costes de implantación el 40,8%. Un estudio senior de Buenos Aires responde a las dos: el idioma es el mismo, el solapamiento horario es de cuatro a seis horas, y la base de costes argentina permite precios muy por debajo de los del mercado español para el mismo alcance.",
  },
  {
    q: "¿Cómo funciona el día a día con cuatro horas de diferencia?",
    a: "La franja compartida va aproximadamente de las 14:00 a las 19:00 hora peninsular, que es donde se hacen las reuniones y las revisiones. El resto del día trabaja cada uno por su lado, lo que en la práctica alarga la jornada del proyecto en vez de acortarla: lo que se define por la tarde en España avanza mientras allí es de noche. En proyectos de alcance cerrado la diferencia horaria deja de ser un problema y pasa a ser una ventaja.",
  },
  {
    q: "¿Qué se puede automatizar primero en una pyme española?",
    a: "Los mismos procesos que en cualquier mercado, con una particularidad local: la mayoría de las empresas españolas que ya usan IA la usan en fase experimental y no en producción. Los candidatos con mejor retorno son la atención de consultas frecuentes, la clasificación y calificación de leads, la lectura y extracción de datos de documentos, y los informes que hoy alguien compone a mano. LIVV ofrece un diagnóstico sin coste que devuelve esa lista priorizada.",
  },
  {
    q: "¿Cómo se factura y con qué contrato?",
    a: "LIVV factura en dólares como exportación de servicios desde Argentina, un esquema habitual y establecido: la exportación de servicios basados en conocimiento es el tercer complejo exportador del país, con más de 10.000 millones de dólares anuales. El precio se cierra antes de empezar, el cliente es propietario del código, y el trabajo bajo marca del cliente con acuerdo de confidencialidad es parte habitual del modelo.",
  },
  {
    q: "¿Qué nivel de adopción de IA hay hoy en las pymes españolas?",
    a: "Menor de lo que sugiere la conversación pública. Según el INE, en el primer trimestre de 2025 el 21,1% de las empresas de 10 o más empleados usaba IA, y solo el 13,4% de las microempresas. Por tamaño, la pequeña empresa está en torno al 18% y la mediana al 31%. Y del conjunto que ya la usa, el Banco de España observa que alrededor del 60% la mantiene en fase experimental o piloto en lugar de en producción. El margen de ventaja competitiva para quien la lleve a producción sigue siendo amplio.",
  },
]

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  {
    name: "Automatización con IA para empresas en España",
    url: `${SITE_URL}/automatizacion-con-ia-espana`,
  },
])

const service = buildServiceJsonLd({
  slug: "automatizacion-con-ia-espana",
  name: "Automatización con IA para empresas en España",
  description:
    "Automatización de procesos con inteligencia artificial para pymes y empresas españolas, entregada por un estudio senior de Buenos Aires con precio cerrado y solapamiento horario de cuatro a seis horas.",
  url: `${SITE_URL}/automatizacion-con-ia-espana`,
})

export default function AutomatizacionEspanaPage() {
  return (
    <AeoLanding
      jsonLd={[service, buildFaqJsonLd(faq), breadcrumbs]}
      kicker="España · Automatización con IA · 2026"
      title="Automatización con IA para empresas en España."
      intro="Las empresas españolas declaran dos frenos principales para adoptar IA: no encuentran perfiles cualificados y les parece cara la implantación. Esta página va directo a esos dos puntos, con los datos de adopción reales del INE y del Banco de España, lo que cuestan hoy los proyectos en el mercado español, qué cubre el Kit Digital desde 2026, y cómo funciona en la práctica trabajar con un estudio senior de Buenos Aires."
      facts={[
        { label: "Adopción, empresas 10+ empleados", value: "21,1% (INE, T1 2025)" },
        { label: "Adopción, microempresas", value: "13,4%" },
        { label: "De las que usan IA", value: "~60% sigue en fase piloto" },
        { label: "Freno principal declarado", value: "Falta de personal cualificado (45,8%)" },
        { label: "Segundo freno", value: "Altos costes de implantación (40,8%)" },
        { label: "Kit Digital, categoría IA", value: "Bono de hasta 6.000 €" },
      ]}
      sections={[
        {
          title: "El punto de partida real, no el del titular",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                La conversación pública sobre IA en España va muy por delante de
                la adopción medida. Según el Instituto Nacional de Estadística,
                en el primer trimestre de 2025 el 21,1% de las empresas de diez o
                más empleados usaba alguna herramienta de inteligencia
                artificial, frente al 12,4% del año anterior. En las
                microempresas la cifra baja al 13,4%.
              </p>
              <p>
                El dato que más cambia la lectura no es ese. La Encuesta sobre
                Actividad Empresarial del Banco de España, realizada sobre unas
                6.300 empresas, encuentra que cerca del 60% de las que ya usan IA
                la mantienen en fase experimental o piloto, no en producción.
                Traducido: la mayoría del mercado compró herramientas y todavía
                no cambió ningún proceso.
              </p>
              <p>
                Por tamaño, el escalón es claro. La microempresa ronda el 13%, la
                pequeña el 18%, la mediana el 31% y la grande se acerca al 60%.
                Cuanto más chica la empresa, más grande la ventaja disponible
                para quien se mueva primero, porque su competencia directa
                tampoco se movió.
              </p>
            </div>
          ),
        },
        {
          title: "Los dos frenos que declaran las propias empresas",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Cuando el Banco de España pregunta qué impide adoptar IA, las
                respuestas se ordenan así: falta de personal cualificado, 45,8%.
                Altos costes de implantación, 40,8%. Datos no disponibles o de
                mala calidad, 37,8%.
              </p>
              <p>
                Vale la pena detenerse en que los dos primeros frenos no son
                técnicos ni de convencimiento. Nadie está diciendo que la IA no
                sirva. Están diciendo que no encuentran a quién contratar y que
                lo que encuentran es caro. Es un problema de oferta, no de
                demanda.
              </p>
              <p>
                Y es exactamente el problema que resuelve trabajar con un estudio
                de Latinoamérica: el perfil senior existe y está disponible, y la
                base de costes es distinta. No es una promesa de calidad más
                barata, que sería sospechoso. Es que el mismo trabajo, hecho
                desde otra estructura de costes, sale a otro precio.
              </p>
            </div>
          ),
        },
        {
          title: "Qué cuesta hoy en el mercado español",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Las agencias españolas publican rangos bastante consistentes
                entre sí para 2026:
              </p>
              <ul className="space-y-2 pl-5 list-disc marker:text-white/30">
                <li>
                  Prueba de concepto simple, un solo flujo con un modelo de
                  lenguaje: de 1.500 a 3.000 €.
                </li>
                <li>
                  Proyecto medio, entre cinco y diez flujos conectados con un
                  agente básico: de 8.000 a 25.000 €.
                </li>
                <li>
                  Implantación avanzada con RAG, agentes autónomos e
                  integraciones complejas: por encima de 50.000 €.
                </li>
                <li>
                  Mantenimiento mensual: de 500 a 1.500 €, más el consumo de las
                  APIs de los modelos.
                </li>
              </ul>
              <p>
                Los precios cerrados de LIVV, publicados y sin letra chica: una
                automatización, un bot de WhatsApp o una funcionalidad con IA
                añadida a un producto existente, desde USD 1.500. Un agente de IA
                a medida, entre USD 2.500 y 5.000. Un sistema de conocimiento con
                RAG, entre USD 2.000 y 5.000. Una aplicación web o un MVP
                completo, de USD 3.000 a 5.000 o más según el alcance.
              </p>
              <p>
                Puesto uno al lado del otro, el rango completo de LIVV entra por
                debajo de lo que en el mercado español cuesta un proyecto medio.
                Conviene decir de dónde sale esa diferencia, porque un precio
                mucho más bajo sin explicación es motivo para desconfiar: sale de
                operar desde Buenos Aires con equipo senior y sin estructura
                intermedia. Es una ventaja de base de costes, no una categoría de
                calidad inferior.
              </p>
            </div>
          ),
        },
        {
          title: "El Kit Digital ahora cubre IA",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Es un cambio de 2026 que todavía no todo el mundo tiene
                incorporado. Desde la Orden TDF/39/2026, el programa Kit Digital
                incluye por primera vez categorías específicas de inteligencia
                artificial: chatbots, analítica con machine learning,
                automatización inteligente y ciberseguridad con IA.
              </p>
              <p>
                La categoría de Inteligencia Artificial se incorporó con un bono
                de hasta 6.000 €, dentro de una partida de 40 millones destinada
                a esa línea. El bono digital general va de 2.000 a 29.000 € según
                el segmento de empresa, y el programa alcanza desde autónomos y
                microempresas hasta medianas de 50 a 250 empleados. Existe además
                Ticket Innova como programa complementario, con importes de hasta
                7.000 € para proyectos de innovación tecnológica.
              </p>
              <p>
                La consecuencia práctica para una pyme: buena parte de un
                proyecto de automatización de tamaño razonable puede quedar
                cubierta por la ayuda. Los importes, plazos y condiciones cambian
                y conviene confirmarlos con un agente digitalizador antes de
                planificar nada, pero el orden de magnitud vale la pena mirarlo
                antes de descartar el proyecto por precio.
              </p>
            </div>
          ),
        },
        {
          title: "Cómo funciona trabajar con Buenos Aires desde España",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                La objeción razonable es la distancia. Va contestada en concreto.
              </p>
              <p>
                <span className="text-white">Horario.</span> Entre cuatro y seis
                horas de diferencia según la época del año. La franja compartida
                va aproximadamente de las 14:00 a las 19:00 hora peninsular, que
                alcanza de sobra para reuniones y revisiones. El resto del día
                cada uno avanza por su lado, con lo cual lo que se define por la
                tarde en España progresa mientras allí es de noche.
              </p>
              <p>
                <span className="text-white">Idioma.</span> Español nativo de
                ambos lados. No hay capa de traducción ni malentendidos de
                matiz, que es la diferencia real frente a subcontratar en Asia o
                en Europa del Este.
              </p>
              <p>
                <span className="text-white">Encuadre.</span> La exportación de
                servicios desde Argentina es un circuito establecido, no una
                excepción: los servicios basados en conocimiento superaron los
                10.000 millones de dólares anuales y son el tercer complejo
                exportador del país. Facturación en dólares, precio cerrado antes
                de empezar, y el cliente es propietario del código.
              </p>
              <p>
                <span className="text-white">Marca.</span> El trabajo bajo marca
                del cliente con acuerdo de confidencialidad es parte habitual del
                modelo, así que una agencia española puede usar a LIVV como
                equipo de producción sin que aparezca en la relación con su
                cliente final.
              </p>
            </div>
          ),
        },
        {
          title: "Por dónde empezar",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                El error más caro no es elegir mal el proveedor sino elegir mal
                el primer proceso. Buscá el cruce de tres condiciones: que se
                repita muchas veces por semana, que siga reglas que se puedan
                escribir en una página, y que hoy lo haga alguien cuyo tiempo
                valga. Los candidatos que aparecen una y otra vez son la atención
                de consultas frecuentes, la calificación de leads, la extracción
                de datos de documentos y los informes compuestos a mano.
              </p>
              <p>
                Si preferís saltarte la fase de suposiciones, el{" "}
                <Link
                  href="/diagnostico-de-automatizacion"
                  className="text-white underline underline-offset-4"
                >
                  diagnóstico de automatización
                </Link>{" "}
                es sin coste y termina con una lista priorizada de procesos, se
                trabaje o no con nosotros. Y si estás decidiendo el camino
                técnico antes que el proveedor, la comparativa de{" "}
                <Link
                  href="/n8n-vs-make-vs-desarrollo-a-medida"
                  className="text-white underline underline-offset-4"
                >
                  n8n vs Make vs desarrollo a medida
                </Link>{" "}
                cubre cuándo alcanza el no-code y cuándo hace falta código.
              </p>
            </div>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/diagnostico-de-automatizacion",
            name: "Diagnóstico de automatización sin coste",
            description:
              "Treinta minutos y un informe con los procesos priorizados.",
          },
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA",
            description:
              "Procesos que entienden, deciden y se integran con lo que ya usás.",
          },
          {
            href: "/agentes-de-ia",
            name: "Agentes de IA a medida",
            description:
              "Agentes que ejecutan tareas completas, no solo responden.",
          },
          {
            href: "/software-a-medida",
            name: "Software a medida",
            description:
              "Cuando el proceso ya no entra en una automatización.",
          },
        ],
      }}
      faq={faq}
      ctaLead="Si estás en España y querés saber qué costaría resolver un proceso concreto, escribinos con una descripción en dos líneas. Devolvemos un rango real y te decimos si creemos que encaja en alguna de las líneas de ayuda vigentes."
    />
  )
}
