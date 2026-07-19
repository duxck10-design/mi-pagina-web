import { Link } from 'react-router-dom';
import { Wrench, Truck, Shield, Gauge, RefreshCw, ClipboardCheck, ArrowRight, Zap, Package } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const services = [
  { icon: Wrench, title: 'Instalación profesional', desc: 'Montaje, desmontaje y balanceo con equipos de precisión de última generación. Personal certificado.' },
  { icon: RefreshCw, title: 'Rotación y balanceo', desc: 'Mantenimiento periódico para maximizar la vida útil de tus neumáticos y garantizar desgaste uniforme.' },
  { icon: Gauge, title: 'Alineación computarizada', desc: 'Alineación 3D con tecnología láser para una conducción segura y un desgaste óptimo.' },
  { icon: Shield, title: 'Inspección de seguridad', desc: 'Evaluación completa del estado de tus llantas: profundidad de dibujo, paredes laterales y presión.' },
  { icon: Package, title: 'Distribución mayorista', desc: 'Suministro a flotas corporativas, talleres y concesionarios con precios preferenciales y stock garantizado.' },
  { icon: Truck, title: 'Logística exprés', desc: 'Despacho en 24 horas a todo el país con seguimiento en tiempo real y seguros de transporte.' },
  { icon: ClipboardCheck, title: 'Garantía extendida', desc: 'Cobertura ante defectos de fabricación con respaldo directo del fabricante y trámite sin complicaciones.' },
  { icon: Zap, title: 'Asesoría técnica', desc: 'Recomendación de productos según tu vehículo, uso y presupuesto. Ingenieros especializados a tu servicio.' },
];

export default function Services() {
  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-16">
        <Reveal>
          <span className="section-eyebrow">Servicios</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest max-w-3xl">
            No solo vendemos llantas. Las hacemos durar.
          </h1>
          <p className="mt-6 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl leading-relaxed">
            Servicio integral antes, durante y después de la compra. Porque tu seguridad no termina en la venta.
          </p>
        </Reveal>
      </section>

      {/* Image banner */}
      <section className="container-x mb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl aspect-[21/9]">
            <img
              src="https://images.pexels.com/photos/8985609/pexels-photo-8985609.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Servicio técnico especializado"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-asphalt-950/90 via-asphalt-950/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8 sm:p-12">
              <div className="max-w-lg">
                <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Centro de servicio certificado</p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">Tecnología de precisión, manos expertas</h2>
                <p className="mt-3 text-asphalt-200">Equipos de diagnóstico 3D, balanceo de alta resolución y alineación láser computarizada.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Services grid */}
      <section className="container-x mb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="card p-6 h-full hover:border-amber-400/40 transition-colors group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-asphalt-900 text-amber-400 dark:bg-white/5 group-hover:bg-amber-400 group-hover:text-asphalt-950 transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-asphalt-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-x mb-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Cómo trabajamos</span>
            <h2 className="font-display text-3xl font-bold mt-2 text-asphalt-900 dark:text-white">Proceso simple, resultados profesionales</h2>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: '01', title: 'Consulta', desc: 'Cuéntanos tu vehículo y necesidades.' },
            { step: '02', title: 'Recomendación', desc: 'Te sugerimos las mejores opciones.' },
            { step: '03', title: 'Cotización', desc: 'Recibes un precio claro y sin sorpresas.' },
            { step: '04', title: 'Instalación', desc: 'Montaje profesional y listo para rodar.' },
          ].map((p, i) => (
            <Reveal key={p.step} delay={i * 100}>
              <div className="text-center">
                <span className="font-display text-5xl font-bold text-asphalt-200 dark:text-asphalt-800">{p.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-asphalt-900 dark:text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x">
        <Reveal>
          <div className="card p-10 sm:p-12 text-center bg-asphalt-900 dark:bg-asphalt-900 border-asphalt-800">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">¿Listo para agendar tu servicio?</h2>
            <p className="mt-3 text-asphalt-300 max-w-xl mx-auto">Contáctanos y un especialista te atenderá en minutos.</p>
            <Link to="/contacto" className="btn-primary mt-6 inline-flex">
              Agendar ahora <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
