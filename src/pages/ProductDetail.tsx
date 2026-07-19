import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Check, X, Shield, Gauge, Mountain, Car, Calendar,
  TrendingUp, Package, ArrowRight, MessageCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { ProductCard } from '../components/ProductCard';
import { cn, formatPrice } from '../lib/utils';

const WHATSAPP_NUMBER = '51984830652';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(4);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*, brand:brands(*)')
        .eq('slug', slug)
        .maybeSingle();

      if (data) {
        setProduct(data);
        setActiveImage(0);
        // Related: same vehicle type or same brand, exclude current
        let relQuery = supabase.from('products').select('*, brand:brands(*)').neq('id', data.id).limit(4);
        if (data.vehicle_type) relQuery = relQuery.eq('vehicle_type', data.vehicle_type);
        const { data: rel } = await relQuery;
        setRelated(rel ?? []);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 container-x">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square bg-asphalt-100 dark:bg-asphalt-900 rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 w-24 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
            <div className="h-6 w-32 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
            <div className="h-32 w-full bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 container-x text-center">
        <h1 className="font-display text-3xl font-bold text-asphalt-900 dark:text-white">Producto no encontrado</h1>
        <Link to="/catalogo" className="btn-primary mt-6">Volver al catálogo</Link>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image_url].filter(Boolean) as string[];
  const waText = `Hola, me interesa cotizar ${quantity}x ${product.name} (${product.size}). ¿Me pueden ayudar?`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  const specs = [
    { icon: Gauge, label: 'Medida', value: product.size },
    { icon: TrendingUp, label: 'Índice de carga', value: product.load_index || '—' },
    { icon: Gauge, label: 'Índice de velocidad', value: product.speed_rating || '—' },
    { icon: Mountain, label: 'Tipo de terreno', value: product.terrain_type || '—' },
    { icon: Car, label: 'Tipo de vehículo', value: product.vehicle_type || '—' },
    { icon: Calendar, label: 'Estacionalidad', value: product.season || '—' },
    { icon: Package, label: 'Patrón de banda', value: product.tread_pattern || '—' },
    { icon: Shield, label: 'Marca', value: product.brand?.name || '—' },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="container-x">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-asphalt-500 dark:text-asphalt-400 mb-8">
          <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400">Inicio</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-amber-600 dark:hover:text-amber-400">Catálogo</Link>
          <span>/</span>
          <span className="text-asphalt-900 dark:text-white truncate">{product.name}</span>
        </nav>

        <button onClick={() => navigate(-1)} className="btn-ghost !px-0 mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="card overflow-hidden aspect-square bg-asphalt-100 dark:bg-asphalt-900">
              {gallery[activeImage] && (
                <img src={gallery[activeImage]} alt={product.name} className="h-full w-full object-cover animate-scale-in" />
              )}
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3 mt-4">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'h-20 w-20 rounded-xl overflow-hidden border-2 transition-colors',
                      activeImage === i ? 'border-amber-400' : 'border-asphalt-200 dark:border-asphalt-800 hover:border-asphalt-400'
                    )}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {product.brand && (
                <Link to={`/catalogo?brand=${product.brand.slug}`}>
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: product.brand.color ?? undefined }}>
                    {product.brand.name}
                  </span>
                </Link>
              )}
              <span className={cn('badge', product.in_stock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white')}>
                {product.in_stock ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {product.in_stock ? 'Disponible' : 'Agotado'}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-asphalt-900 dark:text-white tracking-tightest">
              {product.name}
            </h1>
            <p className="text-lg text-asphalt-500 dark:text-asphalt-400 mt-2 font-mono">{product.size}</p>

            {product.description && (
              <p className="mt-5 text-asphalt-700 dark:text-asphalt-300 leading-relaxed">{product.description}</p>
            )}

            {/* Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mt-6">
                <h3 className="font-display font-semibold text-asphalt-900 dark:text-white mb-3">Beneficios</h3>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-asphalt-700 dark:text-asphalt-300">
                      <Check className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price + quantity */}
            <div className="mt-8 pt-8 border-t border-asphalt-200 dark:border-asphalt-800">
              <div className="flex items-end gap-4">
                <div>
                  <span className="text-xs text-asphalt-400">Precio por unidad</span>
                  <p className="font-display text-3xl font-bold text-asphalt-900 dark:text-white">
                    {formatPrice(product.price, product.currency)}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-asphalt-300 dark:border-asphalt-700 text-asphalt-600 dark:text-asphalt-300"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-mono font-semibold text-asphalt-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-asphalt-300 dark:border-asphalt-700 text-asphalt-600 dark:text-asphalt-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/cotizacion"
                  state={{ productId: product.id, productName: product.name, quantity }}
                  className="btn-primary flex-1 !py-3.5"
                >
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn !py-3.5 bg-[#25D366] text-white hover:bg-[#20bd5a]">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specs table */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-asphalt-900 dark:text-white mb-6">Especificaciones técnicas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map((spec) => (
              <div key={spec.label} className="card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-asphalt-100 dark:bg-asphalt-800 text-amber-600 dark:text-amber-400">
                  <spec.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-xs text-asphalt-400 uppercase tracking-wider">{spec.label}</p>
                <p className="mt-1 font-display font-semibold text-asphalt-900 dark:text-white">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-asphalt-900 dark:text-white">Productos relacionados</h2>
              <Link to="/catalogo" className="btn-secondary text-sm group">
                Ver más <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} brandName={p.brand?.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
