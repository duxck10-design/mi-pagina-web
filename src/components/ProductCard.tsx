import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Gauge, Mountain, Car } from 'lucide-react';
import { Product } from '../lib/types';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  brandName?: string;
  onCompare?: (product: Product) => void;
  isComparing?: boolean;
}

export function ProductCard({ product, brandName, onCompare, isComparing }: ProductCardProps) {
  return (
    <div className="card group overflow-hidden hover:shadow-xl hover:shadow-asphalt-950/5 dark:hover:shadow-black/30 hover:-translate-y-1">
      <Link to={`/producto/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-asphalt-100 dark:bg-asphalt-900">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-asphalt-400">
            <Gauge className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.is_featured && (
            <span className="badge bg-amber-400/90 text-asphalt-950">Destacado</span>
          )}
          <span className={`badge ${product.in_stock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
            {product.in_stock ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            {product.in_stock ? 'Disponible' : 'Agotado'}
          </span>
        </div>
        {onCompare && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onCompare(product);
            }}
            className={`absolute top-3 right-3 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              isComparing
                ? 'bg-amber-400 text-asphalt-950'
                : 'glass text-asphalt-700 dark:text-asphalt-200 opacity-0 group-hover:opacity-100'
            }`}
          >
            {isComparing ? 'Comparando' : 'Comparar'}
          </button>
        )}
      </Link>

      <div className="p-5">
        {brandName && (
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {brandName}
          </span>
        )}
        <Link to={`/producto/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-semibold text-asphalt-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-asphalt-500 dark:text-asphalt-400 mt-0.5 font-mono">{product.size}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {product.terrain_type && (
            <span className="badge bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300">
              <Mountain className="h-3 w-3" /> {product.terrain_type}
            </span>
          )}
          {product.vehicle_type && (
            <span className="badge bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300">
              <Car className="h-3 w-3" /> {product.vehicle_type}
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-asphalt-100 dark:border-asphalt-800/50 flex items-center justify-between">
          <div>
            <span className="text-xs text-asphalt-400">Desde</span>
            <p className="font-display text-xl font-bold text-asphalt-900 dark:text-white">
              {formatPrice(product.price, product.currency)}
            </p>
          </div>
          <Link
            to={`/producto/${product.slug}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-asphalt-900 text-white dark:bg-white dark:text-asphalt-900 group-hover:bg-amber-400 group-hover:text-asphalt-950 transition-colors"
            aria-label="Ver detalle"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
