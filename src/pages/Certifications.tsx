import { useEffect, useState } from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Certification } from '../lib/types';
import { Reveal } from '../components/Reveal';

export default function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('certifications').select('*').order('sort_order').then(({ data }) => {
      setCerts(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-12">
        <Reveal>
          <span className="section-eyebrow">Certificaciones</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest max-w-3xl">
            Calidad respaldada por estándares mundiales.
          </h1>
          <p className="mt-4 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl">
            Cada producto que distribuimos cumple con las normativas internacionales más exigentes. La seguridad no es opcional.
          </p>
        </Reveal>
      </section>

      {loading ? (
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => <div key={i} className="card h-48 animate-pulse bg-asphalt-100 dark:bg-asphalt-900" />)}
        </div>
      ) : (
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 80}>
              <div className="card p-8 h-full flex flex-col items-center text-center hover:border-amber-400/40 transition-colors">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-400">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-asphalt-900 dark:text-white">{cert.name}</h3>
                {cert.issuer && <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">{cert.issuer}</p>}
                {cert.description && <p className="mt-3 text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{cert.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Trust banner */}
      <section className="container-x mt-16">
        <Reveal>
          <div className="card p-8 sm:p-10 bg-asphalt-900 dark:bg-asphalt-900 border-asphalt-800">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 shrink-0">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="font-display text-xl font-bold text-white">Compromiso con la seguridad</h2>
                <p className="mt-2 text-asphalt-300">Todos nuestros productos pasan por control de calidad y trazabilidad total desde el fabricante hasta tus manos.</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {['Trazabilidad total', 'Control de origen', 'Garantía del fabricante'].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-asphalt-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
