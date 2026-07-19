import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Brand } from '../lib/types';
import { Reveal } from '../components/Reveal';

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('brands').select('*').eq('is_active', true).order('sort_order').then(({ data }) => {
      setBrands(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-16">
        <Reveal>
          <span className="section-eyebrow">Marcas que distribuimos</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest max-w-3xl">
            Las mejores marcas del mundo, en un solo lugar.
          </h1>
          <p className="mt-6 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl leading-relaxed">
            Trabajamos directamente con los fabricantes más prestigiosos del planeta para garantizar autenticidad, calidad y los mejores precios.
          </p>
        </Reveal>
      </section>

      {loading ? (
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card p-8 h-48 animate-pulse bg-asphalt-100 dark:bg-asphalt-900" />
          ))}
        </div>
      ) : (
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, i) => (
            <Reveal key={brand.id} delay={i * 70}>
              <Link
                to={`/catalogo?brand=${brand.slug}`}
                className="card p-8 h-full group hover:border-amber-400/50 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-display text-3xl font-bold tracking-tightest transition-transform group-hover:scale-105"
                    style={{ color: brand.color ?? undefined }}
                  >
                    {brand.name}
                  </span>
                  <Globe2 className="h-5 w-5 text-asphalt-300 dark:text-asphalt-700" />
                </div>
                {brand.tagline && (
                  <p className="text-sm font-medium text-asphalt-700 dark:text-asphalt-300 italic">"{brand.tagline}"</p>
                )}
                {brand.country && (
                  <p className="text-xs text-asphalt-400 mt-1 uppercase tracking-wider">{brand.country}</p>
                )}
                {brand.description && (
                  <p className="mt-4 text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed flex-1">{brand.description}</p>
                )}
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                  Ver productos
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
