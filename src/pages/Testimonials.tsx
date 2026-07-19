import { useEffect, useState } from 'react';
import { Star, Quote as QuoteIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Testimonial } from '../lib/types';
import { Reveal } from '../components/Reveal';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_published', true).order('sort_order').then(({ data }) => {
      setTestimonials(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-12">
        <Reveal>
          <span className="section-eyebrow">Testimonios</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest">
            La voz de quienes confían en nosotros
          </h1>
          <p className="mt-4 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl">
            Miles de conductores, empresas y flotas eligen Saulin Global Holdings. Esto es lo que dicen.
          </p>
        </Reveal>
      </section>

      {/* Rating summary */}
      <section className="container-x mb-12">
        <Reveal>
          <div className="card p-8 flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <p className="font-display text-5xl font-bold gradient-text">4.9</p>
              <div className="flex justify-center gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-asphalt-500 mt-1">Promedio general</p>
            </div>
            <div className="h-16 w-px bg-asphalt-200 dark:bg-asphalt-800 hidden sm:block" />
            <div className="text-center">
              <p className="font-display text-5xl font-bold text-asphalt-900 dark:text-white">5.000+</p>
              <p className="text-sm text-asphalt-500 mt-2">Clientes satisfechos</p>
            </div>
            <div className="h-16 w-px bg-asphalt-200 dark:bg-asphalt-800 hidden sm:block" />
            <div className="text-center">
              <p className="font-display text-5xl font-bold text-asphalt-900 dark:text-white">98%</p>
              <p className="text-sm text-asphalt-500 mt-2">Recomendación</p>
            </div>
          </div>
        </Reveal>
      </section>

      {loading ? (
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => <div key={i} className="card h-64 animate-pulse bg-asphalt-100 dark:bg-asphalt-900" />)}
        </div>
      ) : (
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <div className="card p-6 h-full flex flex-col">
                <QuoteIcon className="h-8 w-8 text-amber-400/60" />
                <p className="mt-4 text-asphalt-700 dark:text-asphalt-300 leading-relaxed flex-1">{t.content}</p>
                <div className="mt-6 pt-6 border-t border-asphalt-100 dark:border-asphalt-800/50 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-asphalt-900 text-amber-400 font-display font-bold dark:bg-white/10">
                    {t.author_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-asphalt-900 dark:text-white text-sm">{t.author_name}</p>
                    <p className="text-xs text-asphalt-500 dark:text-asphalt-400">{t.author_role}{t.company ? ` · ${t.company}` : ''}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
