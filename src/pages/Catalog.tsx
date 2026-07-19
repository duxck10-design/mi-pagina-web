import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3x3, List, Gauge, GitCompare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product, Brand } from '../lib/types';
import { ProductCard } from '../components/ProductCard';
import { cn, formatPrice } from '../lib/utils';

const VEHICLE_TYPES = ['Deportivo', 'Sedán', 'SUV', 'Pickup/SUV'];
const TERRAIN_TYPES = ['Asfalto', 'Mixto', 'Todoterreno', 'Barro'];
const SEASONS = ['Verano', 'Todas las estaciones', 'Invierno'];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [compareList, setCompareList] = useState<Product[]>([]);

  const filters = useMemo(() => ({
    brand: searchParams.get('brand') || '',
    vehicle: searchParams.get('vehicle') || '',
    terrain: searchParams.get('terrain') || '',
    season: searchParams.get('season') || '',
    rim: searchParams.get('rim') || '',
  }), [searchParams]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = supabase.from('products').select('*, brand:brands(*)');

      if (filters.brand) {
        const b = await supabase.from('brands').select('id').eq('slug', filters.brand).maybeSingle();
        if (b.data) query = query.eq('brand_id', b.data.id);
      }
      if (filters.vehicle) query = query.eq('vehicle_type', filters.vehicle);
      if (filters.terrain) query = query.eq('terrain_type', filters.terrain);
      if (filters.season) query = query.eq('season', filters.season);
      if (filters.rim) query = query.eq('rim', parseInt(filters.rim));

      if (sortBy === 'price-asc') query = query.order('price', { ascending: true });
      else if (sortBy === 'price-desc') query = query.order('price', { ascending: false });
      else if (sortBy === 'name') query = query.order('name', { ascending: true });
      else query = query.order('is_featured', { ascending: false }).order('sort_order');

      const { data } = await query;
      setProducts(data ?? []);
      setLoading(false);
    })();
  }, [filters, sortBy]);

  useEffect(() => {
    supabase.from('brands').select('*').eq('is_active', true).order('sort_order').then(({ data }) => setBrands(data ?? []));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.size.toLowerCase().includes(q) ||
      p.model?.toLowerCase().includes(q) ||
      p.brand?.name?.toLowerCase().includes(q)
    );
  }, [products, search]);

  const setFilter = useCallback((key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }, [searchParams, setSearchParams]);

  const clearFilters = () => setSearchParams(new URLSearchParams());

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const handleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 3) return prev;
      return [...prev, product];
    });
  };

  const rims = [14, 15, 16, 17, 18, 19, 20, 21, 22];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-x">
        {/* Header */}
        <div className="mb-8">
          <span className="section-eyebrow">Catálogo completo</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-asphalt-900 dark:text-white">
            Encuentra tu llanta ideal
          </h1>
          <p className="mt-3 text-asphalt-600 dark:text-asphalt-400 max-w-2xl">
            Explora nuestro inventario de más de 18 modelos de las marcas más prestigiosas. Filtra por medida, marca, tipo de vehículo y uso.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-asphalt-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, medida o modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input !pl-12 !py-3.5"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn('btn-secondary !py-3.5', activeFilterCount > 0 && '!border-amber-400 !text-amber-600 dark:!text-amber-400')}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-asphalt-950 text-xs font-bold">{activeFilterCount}</span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input !py-3.5 !w-auto cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-asphalt-300 dark:border-asphalt-700 p-1">
              <button onClick={() => setView('grid')} className={cn('flex h-9 w-9 items-center justify-center rounded-lg', view === 'grid' ? 'bg-asphalt-900 text-white dark:bg-white dark:text-asphalt-900' : 'text-asphalt-500')}>
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button onClick={() => setView('list')} className={cn('flex h-9 w-9 items-center justify-center rounded-lg', view === 'list' ? 'bg-asphalt-900 text-white dark:bg-white dark:text-asphalt-900' : 'text-asphalt-500')}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filters sidebar */}
          <aside className={cn('lg:block', showFilters ? 'block' : 'hidden')}>
            <div className="card p-5 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-asphalt-900 dark:text-white">Filtros</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-amber-600 dark:text-amber-400 hover:underline">
                    Limpiar todo
                  </button>
                )}
              </div>

              <FilterGroup title="Marca">
                {brands.map((b) => (
                  <FilterRadio key={b.id} label={b.name} checked={filters.brand === b.slug} onChange={() => setFilter('brand', filters.brand === b.slug ? '' : b.slug)} />
                ))}
              </FilterGroup>

              <FilterGroup title="Tipo de vehículo">
                {VEHICLE_TYPES.map((v) => (
                  <FilterRadio key={v} label={v} checked={filters.vehicle === v} onChange={() => setFilter('vehicle', filters.vehicle === v ? '' : v)} />
                ))}
              </FilterGroup>

              <FilterGroup title="Tipo de terreno">
                {TERRAIN_TYPES.map((t) => (
                  <FilterRadio key={t} label={t} checked={filters.terrain === t} onChange={() => setFilter('terrain', filters.terrain === t ? '' : t)} />
                ))}
              </FilterGroup>

              <FilterGroup title="Estacionalidad">
                {SEASONS.map((s) => (
                  <FilterRadio key={s} label={s} checked={filters.season === s} onChange={() => setFilter('season', filters.season === s ? '' : s)} />
                ))}
              </FilterGroup>

              <FilterGroup title="Aro (diámetro de llanta)">
                <div className="flex flex-wrap gap-2">
                  {rims.map((r) => (
                    <button
                      key={r}
                      onClick={() => setFilter('rim', filters.rim === String(r) ? '' : String(r))}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold border transition-colors',
                        filters.rim === String(r)
                          ? 'border-amber-400 bg-amber-400 text-asphalt-950'
                          : 'border-asphalt-300 text-asphalt-600 hover:border-asphalt-900 dark:border-asphalt-700 dark:text-asphalt-300 dark:hover:border-amber-400'
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </FilterGroup>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-asphalt-500 dark:text-asphalt-400">
                {loading ? 'Cargando...' : `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`}
              </p>
              {compareList.length > 0 && (
                <Link to="/comparador" state={{ products: compareList }} className="btn-primary !py-2 !px-4 text-sm">
                  <GitCompare className="h-4 w-4" />
                  Comparar ({compareList.length})
                </Link>
              )}
            </div>

            {loading ? (
              <div className={cn('grid gap-6', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card overflow-hidden">
                    <div className="aspect-[4/3] bg-asphalt-100 dark:bg-asphalt-900 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 w-20 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
                      <div className="h-5 w-40 bg-asphalt-200 dark:bg-asphalt-800 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="card p-16 text-center">
                <Gauge className="h-12 w-12 mx-auto text-asphalt-300 dark:text-asphalt-700" />
                <h3 className="mt-4 font-display text-lg font-semibold text-asphalt-900 dark:text-white">No se encontraron productos</h3>
                <p className="mt-2 text-asphalt-500 dark:text-asphalt-400">Prueba ajustando los filtros o el término de búsqueda.</p>
                <button onClick={() => { clearFilters(); setSearch(''); }} className="btn-secondary mt-6">Limpiar filtros</button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    brandName={p.brand?.name}
                    onCompare={handleCompare}
                    isComparing={!!compareList.find(c => c.id === p.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p) => (
                  <Link
                    key={p.id}
                    to={`/producto/${p.slug}`}
                    className="card group flex gap-5 p-4 hover:shadow-lg hover:border-amber-400/40 transition-all"
                  >
                    <div className="h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-xl overflow-hidden bg-asphalt-100 dark:bg-asphalt-900">
                      {p.image_url && <img src={p.image_url} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">{p.brand?.name}</span>
                      <h3 className="font-display text-lg font-semibold text-asphalt-900 dark:text-white truncate">{p.name}</h3>
                      <p className="text-sm text-asphalt-500 dark:text-asphalt-400 font-mono">{p.size}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {p.terrain_type && <span className="badge bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300">{p.terrain_type}</span>}
                        {p.vehicle_type && <span className="badge bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300">{p.vehicle_type}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <span className={cn('badge', p.in_stock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white')}>
                        {p.in_stock ? 'Disponible' : 'Agotado'}
                      </span>
                      <div className="text-right">
                        <span className="text-xs text-asphalt-400">Desde</span>
                        <p className="font-display text-xl font-bold text-asphalt-900 dark:text-white">{formatPrice(p.price, p.currency)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-asphalt-900 dark:text-white mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterRadio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex items-center gap-2.5 w-full text-left group">
      <span className={cn(
        'flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors shrink-0',
        checked ? 'border-amber-400' : 'border-asphalt-300 dark:border-asphalt-700 group-hover:border-asphalt-500'
      )}>
        {checked && <span className="h-2 w-2 rounded-full bg-amber-400" />}
      </span>
      <span className={cn('text-sm transition-colors', checked ? 'text-asphalt-900 dark:text-white font-medium' : 'text-asphalt-600 dark:text-asphalt-400 group-hover:text-asphalt-900 dark:group-hover:text-white')}>
        {label}
      </span>
    </button>
  );
}
