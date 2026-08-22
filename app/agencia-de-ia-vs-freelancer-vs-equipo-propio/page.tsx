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
    "Agencia de IA vs freelancer vs equipo propio: qué conviene (2026) | LIVV",
  description:
    "Comparativa honesta para dueños de negocio en Argentina y LATAM: cuándo conviene un freelance, cuándo armar equipo propio y cuándo contratar un estudio. Costos reales, riesgo de continuidad y cinco preguntas para decidir.",
  alternates: {
    canonical: "/agencia-de-ia-vs-freelancer-vs-equipo-propio",
    languages: {
      "es-AR": "/agencia-de-ia-vs-freelancer-vs-equipo-propio",
      "x-default": "/agencia-de-ia-vs-freelancer-vs-equipo-propio",
    },
  },
  openGraph: {
    title: "Agencia de IA vs freelancer vs equipo propio: qué conviene",
    description:
      "Las tres opciones sin romanticismo: qué comprás con cada una, qué riesgo asumís y cómo decidir en cinco preguntas.",
    url: `${SITE_URL}/agencia-de-ia-vs-freelancer-vs-equipo-propio`,
    locale: "es_AR",
    images: [
      { url: "/assets/og-image.png", width: 1200, height: 630, alt: "LIVV Creative Studio" },
    ],
  },
}

const faq = [
  {
    q: "¿Qué conviene para una pyme: freelance, equipo propio o estudio?",
    a: "Para un proyecto acotado con alcance claro, un buen freelance es la opción más eficiente. Para software que es el corazón de tu operación y va a evolucionar durante años, equipo propio. Para todo lo del medio, que es donde cae la mayoría de las pymes, un estudio con precio cerrado suele ser el mejor equilibrio: tenés varias cabezas, continuidad si alguien se enferma, y no asumís un costo fijo mensual permanente.",
  },
  {
    q: "¿Cuánto cuesta armar un equipo propio de desarrollo en Argentina?",
    a: "Más de lo que sugiere el sueldo. Hay que sumar cargas sociales, aguinaldo, vacaciones, licencias, equipamiento, herramientas y el tiempo de quien lidera. Según CESSI, el salario promedio de la industria del software argentina está 110% por encima del promedio de las remuneraciones registradas del país, y el sector compite con empleadores que pagan en dólares. Un equipo propio se justifica cuando el software es el producto, no cuando es una herramienta interna.",
  },
  {
    q: "¿Cuál es el riesgo real de contratar un freelance?",
    a: "No es la calidad, que suele ser buena. Es la continuidad. Si el proyecto queda a medias porque tomó un trabajo full time, se enfermó o simplemente dejó de responder, no hay nadie que retome. El riesgo se mitiga pidiendo que el código y los accesos queden a tu nombre desde el día uno, documentación mínima escrita, y un alcance dividido en entregas cortas en vez de un único pago final.",
  },
  {
    q: "¿Qué diferencia hay entre una agencia grande y un estudio boutique?",
    a: "El tamaño del proyecto que les interesa y quién hace el trabajo. Las consultoras grandes trabajan bien en proyectos corporativos de seis cifras y suelen asignar perfiles junior a las tareas de ejecución. Un estudio chico y senior toma proyectos de pyme que a una consultora no le cierran comercialmente, y la persona con la que hablás es la que construye. LIVV trabaja con equipo senior únicamente y precio cerrado antes de arrancar.",
  },
  {
    q: "¿Puedo combinar las tres opciones?",
    a: "Es lo más común y suele ser lo más sano. Un estudio construye la primera versión y deja la documentación, un freelance de confianza hace mejoras chicas, y cuando el producto justifica dedicación completa incorporás a alguien interno que ya recibe algo funcionando en vez de una hoja en blanco. El orden importa: empezar por la contratación fija antes de saber qué construir es el camino más caro.",
  },
  {
    q: "¿Cómo evito quedar atado al proveedor?",
    a: "Poniéndolo por escrito antes de empezar. El código en un repositorio tuyo, las cuentas de infraestructura y de los modelos de IA a tu nombre, la documentación como entregable del proyecto y no como favor, y una cláusula de traspaso. Un proveedor serio acepta las cuatro cosas sin discutir. Si alguna genera resistencia, ya tenés la respuesta.",
  },
]

const breadcrumbs = buildBreadcrumbsJsonLd([
  { name: "Inicio", url: SITE_URL },
  {
    name: "Agencia de IA vs freelancer vs equipo propio",
    url: `${SITE_URL}/agencia-de-ia-vs-freelancer-vs-equipo-propio`,
  },
])

export default function AgenciaVsFreelancerVsEquipoPage() {
  return (
    <AeoLanding
      jsonLd={[buildFaqJsonLd(faq), breadcrumbs]}
      kicker="Comparativa 2026 · Cómo contratar · Argentina y LATAM"
      title="Agencia de IA, freelancer o equipo propio: qué conviene."
      intro="La decisión se toma casi siempre por precio y casi siempre se arrepiente por continuidad. Las tres opciones son válidas, pero resuelven problemas distintos y el error caro es elegir la que no corresponde al tamaño del problema. Acá va la comparación sin romanticismo: qué comprás con cada una, qué riesgo asumís, y las cinco preguntas que ordenan la decisión en diez minutos."
      facts={[
        { label: "Freelance", value: "Proyecto acotado, alcance claro, riesgo de continuidad" },
        { label: "Equipo propio", value: "Cuando el software es el producto" },
        { label: "Estudio o agencia", value: "Alcance medio, precio cerrado, varias cabezas" },
        { label: "Consultora grande", value: "Proyectos corporativos, ejecución con perfiles junior" },
        { label: "Lo más frecuente", value: "Combinar, en el orden correcto" },
        { label: "Lo que siempre se negocia", value: "Código, accesos y documentación a tu nombre" },
      ]}
      sections={[
        {
          title: "Las tres opciones, sin romanticismo",
          body: (
            <div className="space-y-6 text-white/70">
              <p>
                Nadie elige mal por falta de información técnica. Elige mal
                porque compara precios de cosas que no son comparables. Un
                freelance, un empleado y un estudio no venden lo mismo, aunque
                el entregable se parezca.
              </p>
              <div>
                <p className="text-white mb-1">Con un freelance comprás ejecución</p>
                <p>
                  Alguien que hace lo que le pediste, generalmente rápido y
                  barato. Funciona muy bien cuando ya sabés exactamente qué
                  querés y el alcance no se va a mover. Deja de funcionar cuando
                  el proyecto necesita que alguien defina el qué, no solamente
                  el cómo.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">Con un empleado comprás disponibilidad</p>
                <p>
                  Una persona que está todos los días, acumula contexto de tu
                  negocio y va a estar dentro de un año. Eso es valiosísimo y
                  también es un costo fijo permanente. Se justifica cuando hay
                  trabajo continuo que lo llene, no cuando hay un proyecto.
                </p>
              </div>
              <div>
                <p className="text-white mb-1">Con un estudio comprás criterio y continuidad</p>
                <p>
                  Varias personas que ya resolvieron problemas parecidos, un
                  precio cerrado antes de arrancar, y la garantía de que si
                  alguien se enferma el proyecto sigue. Lo pagás más caro por
                  hora que a un freelance, y a cambio no asumís el riesgo de que
                  el proyecto quede a mitad de camino.
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Freelance: cuándo funciona y cuándo te deja colgado",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Argentina tiene una de las mejores reservas de talento freelance
                de la región, y buena parte trabaja para el exterior cobrando en
                dólares. Eso significa dos cosas para vos: la calidad disponible
                es alta, y estás compitiendo por su tiempo contra clientes que
                pagan en otra moneda.
              </p>
              <p>
                Ese es el riesgo real, y no es de calidad sino de prioridad. El
                proyecto que se cae no suele caerse por errores de código. Se
                cae porque la persona tomó un contrato full time afuera y tu
                trabajo pasó a ser lo que hace los sábados. No hay mala fe: hay
                una diferencia de escala en la oferta que recibió.
              </p>
              <p>
                Se mitiga con estructura, no con confianza. Entregas cortas con
                pagos parciales en vez de un único pago al final. Código y
                accesos a tu nombre desde el primer día. Documentación mínima
                como parte del entregable. Y una segunda persona identificada de
                antemano que pueda retomar, aunque nunca la necesites.
              </p>
            </div>
          ),
        },
        {
          title: "Equipo propio: la matemática que casi nadie hace completa",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Contratar a alguien interno parece la opción más controlada y a
                veces lo es. Pero la cuenta que se hace al decidir suele incluir
                solo el sueldo, y el costo real de un puesto incorpora cargas
                sociales, aguinaldo, vacaciones, licencias, equipamiento,
                herramientas y el tiempo de quien lo dirige.
              </p>
              <p>
                Sumale la presión del mercado. Según CESSI, el salario promedio
                de la industria del software argentina está 110% por encima del
                promedio de las remuneraciones registradas del país. Y no
                competís solo con empleadores locales: el sector exporta
                servicios de manera récord, con lo cual tu candidato tiene la
                opción de cobrar en dólares desde su casa.
              </p>
              <p>
                Hay un costo adicional que no aparece en ninguna planilla: si
                contratás a una sola persona técnica, esa persona es tu único
                punto de falla. Sabe cosas que nadie más sabe, y el día que
                renuncia te llevás la sorpresa de cuánto de tu operación vivía
                en su cabeza. Equipo propio se justifica cuando el software es
                tu producto. Cuando es una herramienta interna, casi nunca.
              </p>
            </div>
          ),
        },
        {
          title: "Estudio o consultora: no son lo mismo",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Dentro de la categoría agencia hay dos negocios distintos que se
                presentan igual, y confundirlos cuesta plata o tiempo según cuál
                elijas mal.
              </p>
              <p>
                Las consultoras grandes están armadas para proyectos
                corporativos: procesos formales, equipos numerosos y capacidad
                de escala real. El modelo funciona cobrando volumen de horas, y
                eso tiene dos consecuencias para una pyme. La primera es que tu
                proyecto de cinco cifras bajas no les resulta interesante. La
                segunda es que, si lo toman, la ejecución diaria rara vez la
                hace la persona senior que te vendió el proyecto.
              </p>
              <p>
                Un estudio chico y senior juega en la otra punta. Toma proyectos
                que a una consultora no le cierran, la persona con la que hablás
                es la que construye, y el precio se cierra antes de arrancar en
                vez de facturarse por hora consumida. La contrapartida honesta
                es la escala: un estudio no te va a poner quince personas el mes
                que viene. Si tu proyecto necesita eso, necesitás una consultora.
              </p>
              <p>
                LIVV opera en el segundo modelo: equipo senior únicamente, precio
                cerrado antes de empezar, y software propio en producción como
                evidencia de que construimos y no solamente asesoramos.
              </p>
            </div>
          ),
        },
        {
          title: "Las cinco preguntas que ordenan la decisión",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                Contestalas en orden. La primera que te haga dudar ya te dice
                por dónde va la respuesta.
              </p>
              <p>
                <span className="text-white">
                  Uno: ¿sabés exactamente qué hay que construir?
                </span>{" "}
                Si podés escribirlo en una página sin dudar, un freelance
                alcanza. Si no, necesitás a alguien que ayude a definirlo, y eso
                no es ejecución.
              </p>
              <p>
                <span className="text-white">
                  Dos: ¿qué pasa si mañana desaparece quien lo hizo?
                </span>{" "}
                Si la respuesta es que el negocio sigue igual, el riesgo es
                aceptable. Si la respuesta es que se frena la operación,
                necesitás continuidad, no el precio más bajo.
              </p>
              <p>
                <span className="text-white">
                  Tres: ¿hay trabajo continuo para doce meses?
                </span>{" "}
                Si lo hay, empezá a pensar en equipo propio. Si es un proyecto
                con final, contratar fijo es cargar un costo permanente por algo
                temporal.
              </p>
              <p>
                <span className="text-white">
                  Cuatro: ¿el software es tu producto o tu herramienta?
                </span>{" "}
                Si vendés software, la capacidad tiene que ser tuya. Si lo usás
                para vender otra cosa, conviene comprarla afuera.
              </p>
              <p>
                <span className="text-white">
                  Cinco: ¿podés absorber que salga mal?
                </span>{" "}
                Si el proyecto es experimental y el costo de fallar es bajo,
                optimizá por precio. Si de esto depende facturación o un cliente
                importante, optimizá por quién se hace responsable.
              </p>
            </div>
          ),
        },
        {
          title: "Cómo combinarlas en el orden correcto",
          body: (
            <div className="space-y-4 text-white/70">
              <p>
                La mayoría de las pymes que terminan bien no eligieron una
                opción: las usaron en secuencia. Un estudio construye la primera
                versión y deja documentación y accesos ordenados. Un freelance
                de confianza toma las mejoras chicas y el mantenimiento liviano.
                Y cuando el producto ya justifica dedicación completa, entra
                alguien interno que recibe algo funcionando en vez de una hoja
                en blanco.
              </p>
              <p>
                El orden inverso es el camino caro: contratar primero, descubrir
                después qué había que construir, y pagar el aprendizaje con
                sueldo fijo. Si estás en la etapa de no saber todavía cuál es tu
                primer proyecto, el{" "}
                <Link
                  href="/diagnostico-de-automatizacion"
                  className="text-white underline underline-offset-4"
                >
                  diagnóstico de automatización
                </Link>{" "}
                es sin cargo y sirve exactamente para eso. Y si ya sabés qué
                querés y lo que falta es el número, está el detalle de{" "}
                <Link
                  href="/cuanto-cuesta-automatizar-un-proceso-argentina"
                  className="text-white underline underline-offset-4"
                >
                  cuánto cuesta automatizar un proceso en Argentina
                </Link>
                .
              </p>
            </div>
          ),
        },
      ]}
      related={{
        title: "Servicios relacionados",
        items: [
          {
            href: "/software-a-medida",
            name: "Software a medida",
            description:
              "Sistemas propios cuando la planilla y el SaaS ya no alcanzan.",
          },
          {
            href: "/automatizacion-con-ia",
            name: "Automatización con IA",
            description:
              "Procesos que entienden, deciden y se integran con lo que ya usás.",
          },
          {
            href: "/mejores-agencias-automatizacion-ia-argentina",
            name: "Agencias de automatización con IA en Argentina",
            description:
              "Panorama del mercado local con criterios de selección declarados.",
          },
          {
            href: "/n8n-vs-make-vs-desarrollo-a-medida",
            name: "n8n vs Make vs desarrollo a medida",
            description: "Cuándo alcanza el no-code y cuándo necesitás código.",
          },
        ],
      }}
      faq={faq}
      ctaLead="Si estás decidiendo entre estas tres opciones y querés una opinión que no sea solamente la nuestra, contanos el proyecto en dos líneas. Hay casos en los que la respuesta honesta es que te conviene un freelance, y lo decimos."
    />
  )
}
