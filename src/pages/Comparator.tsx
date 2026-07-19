import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GitCompare, Search, X, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { Reveal } from '../components/Reveal';
import { formatPrice, cn } from '../lib/utils';

export default function Comparator() {
  const location = useLocation();
  const passedProducts = (location.state as { products?: Product[] } | null)?.products ?? [];
  const [selected, setSelected] = useState<Product[]>(passedProducts);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase.from('products').select('*, brand:brands(*)').order('name').then(({ data }) => setAllProducts(data ?? []));
  }, []);

  const filtered = search.trim()
    ? allProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && !selected.find(s => s.id === p.id))
    : allProducts.filter(p => !selected.find(s => s.id === p.id));

  const addProduct = (p: Product) => {
    if (selected.length >= 3) return;
    setSelected([...selected, p]);
    setSearch('');
  };
  const removeProduct = (id: string) => setSelected(selected.filter(p => p.id !== id));

  const compareFields = [
    { key: 'brand', label: 'Marca', get: (p: Product) => p.brand?.name ?? '—' },
    { key: 'size', label: 'Medida', get: (p: Product) => p.size },
    { key: 'model', label: 'Modelo', get: (p: Product) => p.model ?? '—' },
    { key: 'load_index', label: 'Índice de carga', get: (p: Product) => p.load_index ?? '—' },
    { key: 'speed_rating', label: 'Índice de velocidad', get: (p: Product) => p.speed_rating ?? '—' },
    { key: 'terrain_type', label: 'Terreno', get: (p: Product) => p.terrain_type ?? '—' },
    { key: 'vehicle_type', label: 'Vehículo', get: (p: Product) => p.vehicle_type ?? '—' },
    { key: 'season', label: 'Estacionalidad', get: (p: Product) => p.season ?? '—' },
    { key: 'tread_pattern', label: 'Patrón de banda', get: (p: Product) => p.tread_pattern ?? '—' },
    { key: 'price', label: 'Precio', get: (p: Product) => formatPrice(p.price, p.currency) },
    { key: 'in_stock', label: 'Disponibilidad', get: (p: Product) => p.in_stock ? 'Disponible' : 'Agotado' },
  ];

  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-10">
        <Reveal>
          <span className="section-eyebrow">Comparador</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest">
            Compara hasta 3 llantas
          </h1>
          <p className="mt-4 text-asphalt-600 dark:text-asphalt-400 max-w-2xl">
            Selecciona los productos que quieres comparar y visualiza sus especificaciones lado a lado.
          </p>
        </Reveal>
      </section>

      {/* Search / Add */}
      {selected.length < 3 && (
        <div className="container-x mb-8">
          <Reveal>
            <div className="card p-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-asphalt-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input !pl-12"
                  placeholder="Buscar llanta para agregar al comparador..."
                />
              </div>
              {search && filtered.length > 0 && (
                <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-asphalt-200 dark:border-asphalt-700">
                  {filtered.slice(0, 8).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addProduct(p)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-asphalt-100 dark:hover:bg-asphalt-800 transition-colors border-b border-asphalt-100 dark:border-asphalt-800/50 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-asphalt-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-asphalt-500 dark:text-asphalt-400 font-mono">{p.size} · {p.brand?.name}</p>
                      </div>
                      <GitCompare className="h-4 w-4 text-amber-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      )}

      {/* Comparison table */}
      {selected.length === 0 ? (
        <div className="container-x">
          <Reveal>
            <div className="card p-16 text-center">
              <GitCompare className="h-12 w-12 mx-auto text-asphalt-300 dark:text-asphalt-700" />
              <h3 className="mt-4 font-display text-lg font-semibold text-asphalt-900 dark:text-white">No has seleccionado productos</h3>
              <p className="mt-2 text-asphalt-500 dark:text-asphalt-400">Busca arriba para agregar llantas al comparador.</p>
              <Link to="/catalogo" className="btn-secondary mt-6">Explorar catálogo</Link>
            </div>
          </Reveal>
        </div>
      ) : (
        <div className="container-x">
          <Reveal>
            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-asphalt-200 dark:border-asphalt-800">
                    <th className="p-5 text-left text-xs font-semibold uppercase tracking-wider text-asphalt-500 dark:text-asphalt-400 w-40">Especificación</th>
                    {selected.map((p) => (
                      <th key={p.id} className="p-5 text-left min-w-[200px]">
                        <div className="relative group">
                          <button onClick={() => removeProduct(p.id)} className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-asphalt-200 dark:bg-asphalt-800 text-asphalt-600 dark:text-asphalt-300 hover:bg-red-500 hover:text-white transition-colors">
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-asphalt-100 dark:bg-asphalt-900 mb-3">
                            {p.image_url && <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />}
                          </div>
                          <Link to={`/producto/${p.slug}`} className="font-display font-semibold text-asphalt-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                            {p.name}
                          </Link>
                          <p className="text-xs text-asphalt-500 dark:text-asphalt-400 font-mono mt-1">{p.size}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareFields.map((field, i) => (
                    <tr key={field.key} className={cn('border-b border-asphalt-100 dark:border-asphalt-800/50', i % 2 === 1 && 'bg-asphalt-50/50 dark:bg-asphalt-900/20')}>
                      <td className="p-5 text-sm font-medium text-asphalt-600 dark:text-asphalt-400">{field.label}</td>
                      {selected.map((p) => (
                        <td key={p.id} className="p-5 text-sm text-asphalt-900 dark:text-white">
                          {field.key === 'in_stock' ? (
                            <span className={cn('badge', p.in_stock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white')}>
                              {field.get(p)}
                            </span>
                          ) : field.key === 'brand' ? (
                            <span style={{ color: p.brand?.color ?? undefined }} className="font-semibold">{field.get(p)}</span>
                          ) : (
                            field.get(p)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-5"></td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-5">
                        <Link to={`/producto/${p.slug}`} className="btn-secondary text-sm w-full group">
                          Ver detalle <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
