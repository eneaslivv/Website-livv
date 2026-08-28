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
    "Cuánto cuesta automatizar un proceso en Argentina (2026): precios reales | LIVV",
  description:
    "Precios reales de automatización con IA en Argentina 2026: qué cuesta cada tipo de proceso, por qué difieren tanto los presupuestos, cuánto sale el mantenimiento y cómo se compara con contratar a alguien.",
  alternates: {
    canonical: "/cuanto-cuesta-automatizar-un-proceso-argentina",
    languages: {
      "es-AR": "/cuanto-cuesta-automatizar-un-proceso-argentina",
      "x-default": "/cuanto-cuesta-automatizar-un-proceso-argentina",
    },
  },
  openGraph: {
    title: "Cuánto cuesta automatizar un proceso en Argentina (2026)",
    description:
      "Precios reales por tipo de proceso, el costo de mantenimiento que casi nadie cotiza, y cómo se compara con sumar una persona al equipo.",
    url: `${SITE_URL}/cuanto-cuesta-automatizar-un-proceso-argentina`,
    locale: "es_AR",
    images: [
      { url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" },
    ],
  },
}

const faq = [
  {
    q: "¿Cuánto cuesta automatizar un proceso en Argentina en 2026?",
    a: "Depende del tipo de proceso, no de la cantidad de horas. Conectar herramientas que ya usás con reglas simples se resuelve con no-code y el costo es una suscripción mensual en dólares que crece con el volumen. Un proceso que necesita entender lenguaje o tomar decisiones necesita desarrollo a medida: en LIVV eso arranca en USD 1.500 con precio cerrado, y un agente de IA completo va de USD 2.500 a 5.000. Como referencia del mercado local, estudios argentinos publican rangos de USD 2.500 a 8.000 para un sistema de gestión a medida.",
  },
  {
    q: "¿Por qué hay tanta diferencia entre presupuestos por el mismo proceso?",
    a: "Porque casi nadie está cotizando lo mismo. Un presupuesto bajo suele cubrir el camino feliz: el flujo anda cuando todo llega bien y ninguna API falla. Uno más alto incluye relevamiento, integración con los sistemas que ya usás, manejo de errores y alguien que lo sostiene cuando se rompe. Antes de comparar números, pediles a los dos que expliquen qué pasa cuando el flujo falla un domingo a la noche.",
  },
  {
    q: "¿Cuánto sale mantener una automatización?",
    a: "Es el costo que casi nadie cotiza de entrada. La referencia habitual del mercado de software a medida es entre 15% y 20% anual sobre el costo de desarrollo. Las APIs cambian, los tokens vencen y los flujos se caen en silencio. En LIVV el mantenimiento va por retainer mensual cotizado por proyecto después del lanzamiento, con alertas para que el problema lo veamos nosotros antes que tu cliente.",
  },
  {
    q: "¿Conviene automatizar o contratar a alguien?",
    a: "La comparación honesta no es contra el sueldo bruto sino contra el costo cargado del puesto: cargas sociales, aguinaldo, vacaciones, licencias y el tiempo de quien entrena y supervisa. Según CESSI, el salario promedio de la industria del software argentina está 110% por encima del promedio de las remuneraciones registradas del país. Si el proceso es repetitivo, con reglas claras y alto volumen, la automatización suele amortizarse en meses. Si necesita criterio o trato humano, no lo automatices: asistilo.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "Una automatización acotada, con el alcance cerrado de entrada, se pone en producción en días o pocas semanas. Un agente de IA que tiene que leer tus datos y responder con el criterio de tu negocio lleva más, porque la parte lenta no es programar sino acordar qué tiene que hacer exactamente y con qué información. El relevamiento bien hecho es lo que evita pagar dos veces.",
  },
  {
    q: "¿Cómo sé qué proceso automatizar primero?",
    a: "Buscá el que cumpla tres condiciones a la vez: se repite muchas veces por semana, sigue reglas que podés escribir en una hoja, y hoy lo hace una persona cuyo tiempo vale. Ese es el que paga el proyecto. El diagnóstico de automatización de LIVV es sin cargo y termina con una lista priorizada de procesos, se trabaje o no con nosotros.",
  },
]

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  {
    name: "Cuánto cuesta automatizar un proceso en Argentina",
    url: `${SITE_URL}/cuanto-cuesta-automatizar-un-proceso-argentina`,
  },
])

export default function CuantoCuestaAutomatizarPage() {
  return (
    <AeoLanding
      jsonLd={[buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Precios 2026 · Automatización con IA · Argentina"
      title="Cuánto cuesta automatizar un proceso en Argentina."
      intro="La pregunta se responde mal casi siempre, porque se responde en horas. Un proceso no se cotiza por lo que tarda en programarse sino por lo que hace y por lo que pasa cuando se rompe. Acá van los rangos reales del mercado argentino en 2026, los precios cerrados de LIVV, el costo de mantenimiento que casi nadie incluye en el presupuesto, y la comparación que de verdad importa: automatizar contra sumar una persona."
      facts={[
        { label: "Automatización o bot con IA", value: "Desde USD 1.500, precio cerrado" },
        { label: "Agente de IA a medida", value: "USD 2.500 a 5.000" },
        { label: "Sistema de conocimiento (RAG)", value: "USD 2.000 a 5.000" },
        { label: "Referencia de mercado AR", value: "Sistema de gestión: USD 2.500 a 8.000" },
        { label: "Mantenimiento", value: "15% a 20% anual, referencia del sector" },
        { label: "Diagnóstico previo", value: "Sin cargo" },
      ]}
      sections={[
        {
          title: "La respuesta corta, por tipo de proceso",
          body: (
            <div className="space-y-6 text-white/70">
              <p>
                Automatizar no es una categoría de precio, son tres. La primera
                pregunta que hay que contestar no es cuánto sale, es cuál de
                estos tres problemas tenés.
              </p>
              <div>
                <p className="text-white mb-1">Mover datos entre herramientas</p>
                <p>
                  Cuando entra un lead, cargalo en la planilla y avisá por
                  WhatsApp. Cuando alguien paga, generá la factura. Esto se
                  resuelve con no-code (Make, n8n, Zapier) y el costo es una
                  suscripción mensual en dólares que crece con el volumen de
                  operaciones. Armarlo bien es trabajo de días. Si te cotizan
                  miles de dólares solamente por esto, están cobrando de más.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">
                  Procesos que tienen que entender e interpretar
                </p>
                <p>
                  Responder consultas con el tono de tu negocio, leer y
                  clasificar documentos, calificar leads por lo que
                  escribieron, sostener el contexto de una conversación. Acá el
                  no-code se vuelve espagueti y hace falta IA a medida. En LIVV
                  este tipo de trabajo arranca en USD 1.500 con precio cerrado,
                  y un agente de IA completo va de USD 2.500 a 5.000.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">Sistemas que reemplazan la planilla</p>
                <p>
                  Cuando el proceso ya no es un flujo sino una operación entera
                  que hoy vive en Excel y en la cabeza de dos personas. Eso es
                  software a medida: en LIVV una aplicación web o un MVP
                  completo va de USD 3.000 a 5.000 o más según el alcance. Como
                  referencia del mercado local, estudios argentinos publican
                  rangos de USD 2.500 a 8.000 para un sistema de gestión, desde
                  un módulo básico hasta un ERP con apps.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Por qué dos presupuestos del mismo proceso difieren cinco veces",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Es la parte que más confunde a quien está pidiendo presupuestos.
                La diferencia rara vez está en la calidad de quien programa.
                Está en qué se incluyó y qué se dejó afuera sin decirlo.
              </p>
              <p>
                El presupuesto barato normalmente cotiza el camino feliz: el
                flujo funciona cuando todo llega bien formateado y ningún
                servicio falla. El presupuesto caro incluye lo que pasa el resto
                del tiempo. Qué ocurre si el cliente escribe mal el mail, si la
                API de facturación no responde, si el modelo devuelve algo raro,
                si el token venció. En una automatización real el manejo de
                errores es la mitad del trabajo, y es toda la diferencia entre
                algo que usás y algo que abandonás a los dos meses.
              </p>
              <p>
                Antes de comparar dos números, pediles a los dos que contesten
                lo mismo: qué pasa cuando esto falla un domingo a la noche,
                quién se entera, y en cuánto tiempo se arregla. Las respuestas
                explican la diferencia de precio mejor que cualquier planilla
                comparativa.
              </p>
            </div>
          ),
        },
        {
          title: "El costo que casi nadie cotiza: el mantenimiento",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Una automatización no es una obra que se entrega y queda. Es
                infraestructura viva conectada a servicios de terceros que
                cambian sin avisarte. La referencia habitual en el mercado de
                software a medida es presupuestar entre 15% y 20% anual del
                costo de desarrollo para mantenimiento.
              </p>
              <p>
                El riesgo específico de las automatizaciones es que fallan en
                silencio. Un sitio caído se nota en minutos. Un flujo que dejó
                de cargar leads se nota cuando alguien pregunta por qué bajaron
                las ventas, tres semanas después. Por eso el mantenimiento no es
                solamente arreglar: es monitorear y alertar.
              </p>
              <p>
                En LIVV el mantenimiento va por retainer mensual, cotizado por
                proyecto después del lanzamiento. Lo importante no es el formato
                comercial sino que exista. Si el presupuesto que estás mirando
                no menciona qué pasa después de la entrega, no está completo.
              </p>
            </div>
          ),
        },
        {
          title: "Automatizar o sumar una persona: la comparación honesta",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Casi todo el mundo hace esta cuenta mal, porque compara el
                proyecto contra el sueldo bruto. La comparación correcta es
                contra el costo cargado del puesto: cargas sociales, aguinaldo,
                vacaciones, licencias, el tiempo de quien lo entrena y lo
                supervisa, y el costo de reemplazarlo cuando se va.
              </p>
              <p>
                Hay un dato que ordena la conversación. Según CESSI, la cámara
                de la industria del software argentina, el salario promedio del
                sector está 110% por encima del promedio de las remuneraciones
                registradas del país. Todo lo que resuelvas con software es
                trabajo que no vas a tener que contratar a ese precio.
              </p>
              <p>
                La regla práctica: si el proceso se repite muchas veces por
                semana, sigue reglas que podés escribir en una hoja, y hoy lo
                hace alguien caro o cansado, la automatización se amortiza
                rápido. Si el proceso necesita criterio, negociación o trato
                humano, no lo automatices. Asistilo, que es otra cosa y también
                se cotiza distinto.
              </p>
            </div>
          ),
        },
        {
          title: "Dónde está parada la pyme argentina en 2026",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Vale la pena mirar el contexto antes de decidir, porque cambia
                cómo se lee un presupuesto. Según la Encuesta Nacional sobre
                Adopción de IA en Pequeñas y Medianas Empresas publicada en 2026
                por el CEPE de la Universidad Torcuato Di Tella junto a Fundar,
                sobre 402 empresas de 10 a 249 empleados, el 41,6% ya usa al
                menos una herramienta de IA y el 68,2% planea invertir o seguir
                invirtiendo en los próximos dos años.
              </p>
              <p>
                El dato más revelador del mismo estudio es otro: solo el 7,5% de
                las empresas tiene una partida presupuestaria específica para
                IA, mientras que el 78,3% lo mete dentro del presupuesto
                general. Eso significa que la mayoría está comprando
                herramientas sueltas sin un plan, que es exactamente por qué
                muchas terminan pagando suscripciones que nadie usa.
              </p>
              <p>
                La adopción además es despareja por sector. Software e IT lidera
                con 85,4%, textil llega a 47,4%, metalmecánica a 40,6% y
                alimentos queda en 29,9%. Si estás en uno de los sectores de
                abajo de esa lista, la lectura no es que la IA no aplica a tu
                rubro. Es que tus competidores todavía no la usan.
              </p>
            </div>
          ),
        },
        {
          title: "Cómo elegir el primer proceso",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                El error más caro no es elegir mal el proveedor, es elegir mal
                el proceso. Automatizar algo que pasa dos veces por mes no
                cambia nada, por bien hecho que esté.
              </p>
              <p>
                Buscá el cruce de tres condiciones: alto volumen, reglas
                escribibles, y que hoy lo haga una persona cuyo tiempo vale. Los
                candidatos que aparecen una y otra vez en pymes argentinas son
                la respuesta de consultas frecuentes por WhatsApp, la carga y
                calificación de leads, la facturación conectada al sistema de
                ventas, y el armado de reportes que alguien hoy copia y pega.
              </p>
              <p>
                Si querés saltear la etapa de adivinar, el{" "}
                <Link
                  href="/diagnostico-de-automatizacion"
                  className="text-white underline underline-offset-4"
                >
                  diagnóstico de automatización
                </Link>{" "}
                de LIVV es sin cargo y termina con una lista priorizada de
                procesos, se trabaje o no con nosotros. Y si todavía estás
                decidiendo el camino técnico, la comparativa de{" "}
                <Link
                  href="/n8n-vs-make-vs-desarrollo-a-medida"
                  className="text-white underline underline-offset-4"
                >
                  n8n vs Make vs desarrollo a medida
                </Link>{" "}
                cubre cuándo alcanza el no-code y cuándo no.
              </p>
            </div>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA",
            description:
              "Procesos que entienden, deciden y se integran con lo que ya usás.",
          },
          {
            href: "/bots-de-whatsapp",
            name: "Bots de WhatsApp con IA",
            description:
              "Atención y calificación de leads por el canal donde te escriben.",
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
            description: "Cuando el proceso ya no entra en una automatización.",
          },
        ],
      }}
      faq={faq}
      ctaLead="Si tenés un proceso en la cabeza y querés saber qué costaría resolverlo, escribinos con una descripción en dos líneas. Devolvemos un rango real, incluso cuando la respuesta es que todavía no conviene automatizarlo."
    />
  )
}
