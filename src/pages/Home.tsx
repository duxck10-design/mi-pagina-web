import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Award, Truck, Search, Calculator, GitCompare,
  Globe2, Wrench, Phone, Star, Quote as QuoteIcon,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Brand, Testimonial } from '../lib/types';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';


export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [p, b, t] = await Promise.all([
        supabase.from('products').select('*, brand:brands(*)').eq('is_featured', true).order('sort_order').limit(6),
        supabase.from('brands').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('testimonials').select('*').eq('is_published', true).order('sort_order').limit(3),
      ]);
      setFeatured(p.data ?? []);
      setBrands(b.data ?? []);
      setTestimonials(t.data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/16387794/pexels-photo-16387794.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Llanta de alto rendimiento"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 bg-grid-faint bg-[size:60px_60px] opacity-30" />
        </div>

        <div className="container-x relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-6 animate-fade-up">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-white">Distribuidor oficial de marcas líderes mundiales</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tightest animate-fade-up" style={{ animationDelay: '0.1s' }}>
              El rendimiento<br />empieza en el suelo.
            </h1>

            <p className="mt-6 text-lg text-asphalt-200 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Importación, distribución y venta de llantas de alto rendimiento. Tecnología, seguridad y confianza de las marcas más prestigiosas del mundo.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/catalogo" className="btn-primary !py-4 !px-7 text-base group">
                Explorar catálogo
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/cotizacion" className="btn !py-4 !px-7 text-base glass text-white hover:bg-white/10">
                Solicitar cotización
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {[
                { value: '15+', label: 'Años de experiencia' },
                { value: '8', label: 'Marcas líderes' },
                { value: '5.000+', label: 'Clientes activos' },
                { value: '24h', label: 'Despacho exprés' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-asphalt-300 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-asphalt-950 to-transparent pointer-events-none" />
      </section>

      {/* QUICK TOOLS */}
      <section className="container-x -mt-12 relative z-20">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: 'Buscador inteligente', desc: 'Encuentra por medida, aro o vehículo', to: '/catalogo' },
              { icon: GitCompare, title: 'Comparador', desc: 'Compara hasta 3 llantas lado a lado', to: '/comparador' },
              { icon: Calculator, title: 'Calculadora de medidas', desc: 'Convierte y verifica equivalencias', to: '/calculadora' },
              { icon: Phone, title: 'Cotización en línea', desc: 'Recibe tu precio en minutos', to: '/cotizacion' },
            ].map((tool) => (
              <Link
                key={tool.title}
                to={tool.to}
                className="card p-5 group hover:border-amber-400/50 hover:shadow-xl transition-all"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-400 group-hover:text-asphalt-950 transition-colors">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-asphalt-900 dark:text-white">{tool.title}</h3>
                <p className="text-sm text-asphalt-500 dark:text-asphalt-400 mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-x py-20">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-eyebrow">Catálogo destacado</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-asphalt-900 dark:text-white">
                Lo mejor de cada marca
              </h2>
            </div>
            <Link to="/catalogo" className="btn-secondary group">
              Ver todo el catálogo
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-[4/3] bg-asphalt-100 dark:bg-asphalt-900 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
                  <div className="h-5 w-40 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductCard product={product} brandName={product.brand?.name} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* BRANDS MARQUEE */}
      <section className="py-16 border-y border-asphalt-200 dark:border-asphalt-800/50 bg-asphalt-50/50 dark:bg-asphalt-900/30">
        <div className="container-x mb-8">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-asphalt-500 dark:text-asphalt-400">
              Distribuidores oficiales de las marcas más prestigiosas del mundo
            </p>
          </Reveal>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...brands, ...brands].map((brand, i) => (
              <Link
                key={`${brand.id}-${i}`}
                to={`/catalogo?brand=${brand.slug}`}
                className="flex items-center gap-3 shrink-0 group"
              >
                <span
                  className="font-display text-2xl font-bold tracking-tightest transition-colors"
                  style={{ color: brand.color ?? undefined }}
                >
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SAULIN */}
      <section className="container-x py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Por qué Saulin</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-asphalt-900 dark:text-white">
              Más que llantas. Una promesa de seguridad.
            </h2>
            <p className="mt-4 text-asphalt-600 dark:text-asphalt-400">
              Combinamos las mejores marcas del mundo con servicio técnico especializado y logística de primer nivel.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Shield, title: 'Seguridad garantizada', desc: 'Solo distribuimos productos certificados internacionalmente con trazabilidad total.' },
            { icon: Zap, title: 'Tecnología de punta', desc: 'Compuestos de sílice, run-flat, sensores TPMS y los últimos avances en diseño de banda.' },
            { icon: Award, title: 'Calidad certificada', desc: 'ISO 9001, DOT, ECE R117 y certificaciones 3PMSF en todos nuestros productos.' },
            { icon: Truck, title: 'Logística exprés', desc: 'Despacho en 24 horas a todo el país con seguimiento en tiempo real.' },
            { icon: Globe2, title: 'Importación directa', desc: 'Relaciones directas con fabricantes, sin intermediarios. Mejor precio garantizado.' },
            { icon: Wrench, title: 'Servicio técnico', desc: 'Equipo de ingenieros especializados para asesoría, instalación y mantenimiento.' },
          ].map((feat, i) => (
            <Reveal key={feat.title} delay={i * 80}>
              <div className="card p-6 h-full hover:border-amber-400/40 transition-colors">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-asphalt-900 text-amber-400 dark:bg-white/5">
                  <feat.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-asphalt-900 dark:text-white">{feat.title}</h3>
                <p className="mt-2 text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{feat.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container-x py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-asphalt-900 dark:bg-asphalt-900 p-10 sm:p-16">
            <div className="absolute inset-0 bg-grid-faint bg-[size:40px_40px] opacity-20" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-amber-400/5 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                ¿No sabes qué llanta necesitas?
              </h2>
              <p className="mt-4 text-asphalt-300 text-lg">
                Nuestro equipo de expertos te asesora gratis. Cuéntanos tu vehículo y te recomendamos la mejor opción.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/cotizacion" className="btn-primary !py-4 !px-7 text-base">
                  Asesoría gratuita
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/calculadora" className="btn !py-4 !px-7 text-base border border-asphalt-700 text-white hover:bg-white/5">
                  Calcular medidas
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="container-x py-20">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow">Testimonios</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-asphalt-900 dark:text-white">
                Lo que dicen nuestros clientes
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 100}>
                <div className="card p-6 h-full">
                  <QuoteIcon className="h-8 w-8 text-amber-400/60" />
                  <p className="mt-4 text-asphalt-700 dark:text-asphalt-300 leading-relaxed">{t.content}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-asphalt-900 text-amber-400 font-display font-bold dark:bg-white/10">
                      {t.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-asphalt-900 dark:text-white text-sm">{t.author_name}</p>
                      <p className="text-xs text-asphalt-500 dark:text-asphalt-400">{t.author_role}{t.company ? ` · ${t.company}` : ''}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
