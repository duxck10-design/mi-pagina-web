import { Reveal } from '../components/Reveal';

const milestones = [
  { year: '2009', title: 'Los inicios', desc: 'Saulin Global Holdings abre sus puertas como distribuidor local con un inventario de 200 llantas y un sueño: traer la mejor tecnología neumática al país.' },
  { year: '2012', title: 'Primera importación directa', desc: 'Firmamos acuerdos directos con Bridgestone y Michelin, eliminando intermediarios y mejorando precios para nuestros clientes.' },
  { year: '2015', title: 'Expansión regional', desc: 'Abrimos bodegas en tres ciudades clave y duplicamos nuestra capacidad de almacenamiento con tecnología climática.' },
  { year: '2018', title: 'Certificación ISO 9001', desc: 'Obtenemos la certificación ISO 9001:2015, consolidando nuestros procesos de calidad y control de inventario.' },
  { year: '2020', title: 'Transformación digital', desc: 'Lanzamos nuestra plataforma en línea con catálogo digital, cotización automatizada y seguimiento de pedidos en tiempo real.' },
  { year: '2023', title: 'Líderes del sector', desc: 'Superamos los 5.000 clientes activos y ampliamos nuestro portafolio a 8 marcas líderes mundiales con presencia en flotas corporativas.' },
  { year: '2026', title: 'El futuro', desc: 'Invertimos en IA para recomendación de productos y ampliaremos nuestra red de servicio técnico a todo el territorio nacional.' },
];

export default function History() {
  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-20">
        <Reveal>
          <span className="section-eyebrow">Nuestra Historia</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest max-w-3xl">
            Una trayectoria forjada en el asfalto.
          </h1>
          <p className="mt-6 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl leading-relaxed">
            Más de 15 años llevando las mejores llantas del mundo a conductores, empresas y flotas. Esta es nuestra historia.
          </p>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="container-x">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-asphalt-200 dark:bg-asphalt-800 sm:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 50}>
                <div className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
                    <div className="h-4 w-4 rounded-full bg-amber-400 ring-4 ring-asphalt-50 dark:ring-asphalt-950" />
                  </div>

                  {/* Content */}
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="card p-6">
                      <span className="font-display text-3xl font-bold gradient-text">{m.year}</span>
                      <h3 className="mt-2 font-display text-lg font-semibold text-asphalt-900 dark:text-white">{m.title}</h3>
                      <p className="mt-2 text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
