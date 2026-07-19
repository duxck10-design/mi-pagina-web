import { Target, Eye, Shield, Zap, Award, Globe2, Users, Handshake } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export default function MissionVision() {
  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-20">
        <Reveal>
          <span className="section-eyebrow">Misión, Visión y Valores</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest max-w-3xl">
            El rumbo que nos guía.
          </h1>
        </Reveal>
      </section>

      {/* Mission & Vision */}
      <section className="container-x mb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card p-8 sm:p-10 h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-400">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-asphalt-900 dark:text-white">Misión</h2>
              <p className="mt-4 text-asphalt-700 dark:text-asphalt-300 leading-relaxed text-lg">
                Proveer soluciones neumáticas de alto rendimiento a través de la importación y distribución de las mejores marcas mundiales, garantizando seguridad, calidad y servicio técnico especializado para cada tipo de cliente.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card p-8 sm:p-10 h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-400">
                <Eye className="h-7 w-7" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-asphalt-900 dark:text-white">Visión</h2>
              <p className="mt-4 text-asphalt-700 dark:text-asphalt-300 leading-relaxed text-lg">
                Ser el principal distribuidor de neumáticos de alto rendimiento de la región, reconocido por su excelencia operativa, innovación tecnológica y compromiso con la seguridad vial, expandiendo nuestro impacto a todo el territorio nacional.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-x">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Nuestros Valores</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-asphalt-900 dark:text-white">
              Los principios que nos mueven
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Shield, title: 'Integridad', desc: 'Actuamos con transparencia y honestidad en cada operación. La confianza de nuestros clientes es nuestro activo más valioso.' },
            { icon: Zap, title: 'Innovación', desc: 'Buscamos constantemente nuevas tecnologías y procesos para mejorar la experiencia de nuestros clientes.' },
            { icon: Award, title: 'Excelencia', desc: 'No conformarnos con lo bueno cuando podemos alcanzar lo extraordinario. Calidad sin compromisos.' },
            { icon: Users, title: 'Compromiso con el cliente', desc: 'Cada decisión empieza y termina en el cliente. Su seguridad y satisfacción son nuestra prioridad.' },
            { icon: Globe2, title: 'Responsabilidad social', desc: 'Promovemos la seguridad vial y prácticas sostenibles en toda nuestra cadena de valor.' },
            { icon: Handshake, title: 'Trabajo en equipo', desc: 'Colaboración, respeto y apoyo mutuo. Los logros son de todos, los desafíos también.' },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="card p-6 h-full hover:border-amber-400/40 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-asphalt-900 text-amber-400 dark:bg-white/5">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-asphalt-900 dark:text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
