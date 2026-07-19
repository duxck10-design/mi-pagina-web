import { Shield, Clock, RefreshCw, FileCheck, Truck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

export default function Warranties() {
  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-12">
        <Reveal>
          <span className="section-eyebrow">Garantías</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest max-w-3xl">
            Tu inversión, protegida.
          </h1>
          <p className="mt-4 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl">
            Todas nuestras llantas incluyen garantía del fabricante. Respaldo total ante defectos de fabricación.
          </p>
        </Reveal>
      </section>

      {/* Warranty types */}
      <section className="container-x mb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Shield, title: 'Garantía de fabricación', period: '1 a 5 años', desc: 'Cobertura ante defectos de materiales o mano de obra. El periodo varía según la marca y modelo del neumático.' },
            { icon: Clock, title: 'Garantía de kilometraje', period: 'Hasta 95.000 km', desc: 'Algunos modelos incluyen garantía de desgaste por kilometraje. Si la llanta se desgasta antes de lo garantizado, se prorratea.' },
            { icon: RefreshCw, title: 'Reemplazo por daño en ruta', period: 'Primer año', desc: 'Cobertura ante daños irreparables por pinchaduras o impacto en el primer año (aplica en modelos seleccionados).' },
          ].map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="card p-6 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-600 dark:text-amber-400">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-asphalt-900 dark:text-white">{w.title}</h3>
                <span className="badge bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300 mt-2">{w.period}</span>
                <p className="mt-3 text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-x mb-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Cómo ejercer tu garantía</span>
            <h2 className="font-display text-3xl font-bold mt-2 text-asphalt-900 dark:text-white">Proceso simple y transparente</h2>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileCheck, step: '01', title: 'Reúne tu comprobante', desc: 'Factura o número de pedido y la llanta afectada.' },
            { icon: AlertCircle, step: '02', title: 'Reporta el caso', desc: 'Contáctanos por WhatsApp o formulario describiendo el problema.' },
            { icon: Truck, step: '03', title: 'Inspección técnica', desc: 'Nuestro equipo evalúa el defecto y confirma la cobertura.' },
            { icon: CheckCircle2, step: '04', title: 'Reemplazo o reembolso', desc: 'Recibes tu llanta nueva o el reembolso correspondiente.' },
          ].map((p, i) => (
            <Reveal key={p.step} delay={i * 100}>
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-asphalt-900 text-amber-400 dark:bg-white/5">
                  <p.icon className="h-6 w-6" />
                </div>
                <span className="block mt-4 font-display text-2xl font-bold text-asphalt-200 dark:text-asphalt-800">{p.step}</span>
                <h3 className="mt-1 font-display font-semibold text-asphalt-900 dark:text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Exclusions */}
      <section className="container-x">
        <Reveal>
          <div className="card p-8">
            <h2 className="font-display text-xl font-bold text-asphalt-900 dark:text-white">Lo que no cubre la garantía</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {[
                'Desgaste normal por uso',
                'Daños por mal uso (baches, bordillos a alta velocidad)',
                'Daños por mantenimiento incorrecto',
                'Pinchaduras reparables',
                'Daños por accidentes o colisiones',
                'Modificaciones al neumático',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-asphalt-600 dark:text-asphalt-400">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-asphalt-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-asphalt-200 dark:border-asphalt-800">
              <Link to="/contacto" className="btn-primary">¿Tienes una consulta de garantía? Contáctanos</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
