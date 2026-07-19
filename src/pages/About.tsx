import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Award, Truck, Globe2, Users } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export default function About() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="container-x mb-20">
        <Reveal>
          <span className="section-eyebrow">Quiénes Somos</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest max-w-3xl">
            Ingeniería de confianza en cada rotación.
          </h1>
          <p className="mt-6 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl leading-relaxed">
            Saulin Global Holdings es una empresa especializada en la importación, distribución y venta de llantas de alto rendimiento. Desde 2009 conectamos a conductores, empresas y flotas con la mejor tecnología neumática del mundo.
          </p>
        </Reveal>
      </section>

      {/* Image banner */}
      <section className="container-x mb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl aspect-[21/9]">
            <img
              src="https://images.pexels.com/photos/8985609/pexels-photo-8985609.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Taller especializado Saulin"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <p className="text-white font-display text-xl sm:text-2xl max-w-xl">
                "Cada llanta que sale de nuestras bodegas representa una promesa de seguridad para quienes confían en nosotros."
              </p>
              <p className="text-asphalt-300 mt-3 text-sm">— Dirección General, Saulin Global Holdings</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="container-x mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '15+', label: 'Años de operación' },
            { value: '5.000+', label: 'Clientes activos' },
            { value: '8', label: 'Marcas distribuidas' },
            { value: '98%', label: 'Clientes satisfechos' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="card p-6 text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold gradient-text">{s.value}</p>
                <p className="text-sm text-asphalt-500 dark:text-asphalt-400 mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-x mb-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Nuestros pilares</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-asphalt-900 dark:text-white">
              Lo que nos define
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Shield, title: 'Seguridad primero', desc: 'Cada producto cumple normas internacionales: DOT, ECE R117, ISO 9001.' },
            { icon: Zap, title: 'Innovación constante', desc: 'Evaluamos y traemos las últimas tecnologías en compuestos y diseño.' },
            { icon: Award, title: 'Excelencia operativa', desc: 'Procesos certificados, bodegas climáticas y control de calidad riguroso.' },
            { icon: Truck, title: 'Logística de precisión', desc: 'Despacho en 24h con seguimiento en tiempo real a todo el país.' },
            { icon: Globe2, title: 'Visión global', desc: 'Relaciones directas con fabricantes en 4 continentes.' },
            { icon: Users, title: 'Cercanía humana', desc: 'Asesoría técnica personalizada. No vendemos llantas, resolvemos necesidades.' },
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

      {/* CTA */}
      <section className="container-x">
        <Reveal>
          <div className="card p-10 sm:p-12 text-center bg-asphalt-900 dark:bg-asphalt-900 border-asphalt-800">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Conoce más sobre nosotros</h2>
            <p className="mt-3 text-asphalt-300 max-w-xl mx-auto">Descubre nuestra historia, nuestra misión y los valores que nos impulsan cada día.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/historia" className="btn-primary">Nuestra historia <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/mision-vision" className="btn border border-asphalt-700 text-white hover:bg-white/5">Misión y valores</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
