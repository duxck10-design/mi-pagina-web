import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Brand, QuoteRequest, ContactMessage } from '../lib/types';
import {
  LogOut, Package, ShoppingBag, Mail, Plus, Edit3, Trash2, X, Save,
  LayoutDashboard, Tag,
} from 'lucide-react';
import { cn, formatPrice, formatDate } from '../lib/utils';

type Tab = 'dashboard' | 'products' | 'quotes' | 'messages';

export default function Admin() {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [tab, setTab] = useState<Tab>('dashboard');

  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    (async () => {
      setDataLoading(true);
      const [p, b, q, m] = await Promise.all([
        supabase.from('products').select('*, brand:brands(*)').order('sort_order'),
        supabase.from('brands').select('*').order('sort_order'),
        supabase.from('quote_requests').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(20),
      ]);
      setProducts(p.data ?? []);
      setBrands(b.data ?? []);
      setQuotes(q.data ?? []);
      setMessages(m.data ?? []);
      setDataLoading(false);
    })();
  }, [session]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('Credenciales incorrectas. Verifica tu correo y contraseña.');
    setAuthLoading(false);
  };

  const handleSignOut = () => supabase.auth.signOut();

  const saveProduct = async (product: Partial<Product>) => {
    const payload = {
      ...product,
      slug: product.slug || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };
    if (editing) {
      await supabase.from('products').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('products').insert(payload);
    }
    setShowProductForm(false);
    setEditing(null);
    const { data } = await supabase.from('products').select('*, brand:brands(*)').order('sort_order');
    setProducts(data ?? []);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await supabase.from('products').delete().eq('id', id);
    setProducts(products.filter(p => p.id !== id));
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    await supabase.from('quote_requests').update({ status }).eq('id', id);
    setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
  };

  if (session === null) {
    return <div className="pt-28 pb-20 container-x text-center"><p className="text-asphalt-500">Verificando sesión...</p></div>;
  }

  if (!session) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center">
        <div className="container-x max-w-md">
          <div className="card p-8">
            <div className="text-center mb-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-400">
                <LayoutDashboard className="h-7 w-7" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold text-asphalt-900 dark:text-white">Panel administrativo</h1>
              <p className="mt-2 text-sm text-asphalt-500 dark:text-asphalt-400">Inicia sesión para gestionar el contenido.</p>
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="label">Correo electrónico</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="duxck10@gmail.com" />
              </div>
              <div>
                <label className="label">Contraseña</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
              </div>
              {authError && <p className="text-sm text-red-500">{authError}</p>}
              <button type="submit" disabled={authLoading} className="btn-primary w-full">
                {authLoading ? 'Verificando...' : 'Iniciar sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Resumen', icon: LayoutDashboard },
    { id: 'products' as Tab, label: 'Productos', icon: Package },
    { id: 'quotes' as Tab, label: 'Cotizaciones', icon: ShoppingBag },
    { id: 'messages' as Tab, label: 'Mensajes', icon: Mail },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-asphalt-900 dark:text-white">Panel administrativo</h1>
            <p className="text-sm text-asphalt-500 dark:text-asphalt-400 mt-1">Gestiona productos, cotizaciones y mensajes.</p>
          </div>
          <button onClick={handleSignOut} className="btn-secondary text-sm">
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
                tab === t.id
                  ? 'bg-asphalt-900 text-white dark:bg-white dark:text-asphalt-900'
                  : 'text-asphalt-600 hover:bg-asphalt-100 dark:text-asphalt-300 dark:hover:bg-asphalt-800'
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
              {t.id === 'quotes' && quotes.filter(q => q.status === 'nueva').length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-asphalt-950 text-xs font-bold">
                  {quotes.filter(q => q.status === 'nueva').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="card p-16 text-center text-asphalt-500">Cargando datos...</div>
        ) : (
          <>
            {/* Dashboard */}
            {tab === 'dashboard' && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Package} label="Productos" value={products.length} />
                <StatCard icon={Tag} label="Marcas" value={brands.length} />
                <StatCard icon={ShoppingBag} label="Cotizaciones nuevas" value={quotes.filter(q => q.status === 'nueva').length} highlight />
                <StatCard icon={Mail} label="Mensajes" value={messages.length} />
              </div>
            )}

            {/* Products */}
            {tab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-display text-xl font-bold text-asphalt-900 dark:text-white">Productos ({products.length})</h2>
                  <button onClick={() => { setEditing(null); setShowProductForm(true); }} className="btn-primary text-sm">
                    <Plus className="h-4 w-4" /> Nuevo producto
                  </button>
                </div>
                <div className="card overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-asphalt-200 dark:border-asphalt-800 text-left text-xs uppercase tracking-wider text-asphalt-500">
                        <th className="p-4">Producto</th>
                        <th className="p-4">Marca</th>
                        <th className="p-4">Medida</th>
                        <th className="p-4">Precio</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-b border-asphalt-100 dark:border-asphalt-800/50 last:border-0">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg overflow-hidden bg-asphalt-100 dark:bg-asphalt-900 shrink-0">
                                {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}
                              </div>
                              <span className="font-medium text-asphalt-900 dark:text-white text-sm">{p.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-asphalt-600 dark:text-asphalt-400">{p.brand?.name}</td>
                          <td className="p-4 text-sm font-mono text-asphalt-600 dark:text-asphalt-400">{p.size}</td>
                          <td className="p-4 text-sm font-semibold text-asphalt-900 dark:text-white">{formatPrice(p.price, p.currency)}</td>
                          <td className="p-4">
                            <span className={cn('badge', p.in_stock ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white')}>
                              {p.in_stock ? 'Sí' : 'No'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button onClick={() => { setEditing(p); setShowProductForm(true); }} className="flex h-8 w-8 items-center justify-center rounded-lg text-asphalt-500 hover:bg-asphalt-100 dark:hover:bg-asphalt-800">
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button onClick={() => deleteProduct(p.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Quotes */}
            {tab === 'quotes' && (
              <div>
                <h2 className="font-display text-xl font-bold text-asphalt-900 dark:text-white mb-4">Solicitudes de cotización</h2>
                <div className="space-y-3">
                  {quotes.map((q) => (
                    <div key={q.id} className="card p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-asphalt-900 dark:text-white">{q.name}</p>
                            <span className={cn('badge text-xs',
                              q.status === 'nueva' ? 'bg-amber-400 text-asphalt-950' :
                              q.status === 'contactado' ? 'bg-steel-500 text-white' :
                              'bg-emerald-500 text-white'
                            )}>{q.status}</span>
                          </div>
                          <p className="text-sm text-asphalt-500 dark:text-asphalt-400 mt-1">
                            {q.product_name ? `${q.product_name} · ` : ''}{q.quantity} unid. · {q.phone || q.email || 'Sin contacto'} · {formatDate(q.created_at)}
                          </p>
                          {q.message && <p className="text-sm text-asphalt-600 dark:text-asphalt-400 mt-1">{q.message}</p>}
                        </div>
                        <select
                          value={q.status}
                          onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                          className="input !w-auto !py-2 text-sm"
                        >
                          <option value="nueva">Nueva</option>
                          <option value="contactado">Contactado</option>
                          <option value="cerrada">Cerrada</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {quotes.length === 0 && <p className="text-asphalt-500 text-center py-12">No hay cotizaciones.</p>}
                </div>
              </div>
            )}

            {/* Messages */}
            {tab === 'messages' && (
              <div>
                <h2 className="font-display text-xl font-bold text-asphalt-900 dark:text-white mb-4">Mensajes de contacto</h2>
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="card p-5">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-asphalt-900 dark:text-white">{m.name}</p>
                        <span className={cn('badge text-xs', m.status === 'nuevo' ? 'bg-amber-400 text-asphalt-950' : 'bg-emerald-500 text-white')}>{m.status}</span>
                      </div>
                      <p className="text-sm text-asphalt-500 dark:text-asphalt-400 mt-1">{m.subject} · {m.email || m.phone || 'Sin contacto'} · {formatDate(m.created_at)}</p>
                      <p className="text-sm text-asphalt-600 dark:text-asphalt-400 mt-2">{m.message}</p>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-asphalt-500 text-center py-12">No hay mensajes.</p>}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product form modal */}
      {showProductForm && (
        <ProductForm
          product={editing}
          brands={brands}
          onSave={saveProduct}
          onClose={() => { setShowProductForm(false); setEditing(null); }}
        />
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, highlight }: { icon: React.ElementType; label: string; value: number; highlight?: boolean }) {
  return (
    <div className={cn('card p-6', highlight && value > 0 && 'border-amber-400/50')}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-asphalt-100 dark:bg-asphalt-800 text-amber-600 dark:text-amber-400">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-asphalt-900 dark:text-white">{value}</p>
      <p className="text-sm text-asphalt-500 dark:text-asphalt-400">{label}</p>
    </div>
  );
}

function ProductForm({ product, brands, onSave, onClose }: {
  product: Product | null;
  brands: Brand[];
  onSave: (p: Partial<Product>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    brand_id: product?.brand_id || '',
    model: product?.model || '',
    size: product?.size || '',
    width: product?.width || '',
    profile: product?.profile || '',
    rim: product?.rim || '',
    load_index: product?.load_index || '',
    speed_rating: product?.speed_rating || '',
    terrain_type: product?.terrain_type || '',
    vehicle_type: product?.vehicle_type || '',
    season: product?.season || '',
    tread_pattern: product?.tread_pattern || '',
    image_url: product?.image_url || '',
    description: product?.description || '',
    price: product?.price || '',
    in_stock: product?.in_stock ?? true,
    is_featured: product?.is_featured ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      brand_id: form.brand_id || null,
      width: form.width ? parseInt(String(form.width)) : null,
      profile: form.profile ? parseInt(String(form.profile)) : null,
      rim: form.rim ? parseInt(String(form.rim)) : null,
      price: form.price ? parseFloat(String(form.price)) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-asphalt-950/60 backdrop-blur-sm" onClick={onClose}>
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-asphalt-900 dark:text-white">
            {product ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-asphalt-500 hover:bg-asphalt-100 dark:hover:bg-asphalt-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Nombre *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Marca</label>
              <select value={form.brand_id} onChange={(e) => setForm({ ...form, brand_id: e.target.value })} className="input">
                <option value="">Sin marca</option>
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Ancho</label>
              <input type="number" value={form.width} onChange={(e) => setForm({ ...form, width: e.target.value })} className="input" placeholder="225" />
            </div>
            <div>
              <label className="label">Perfil</label>
              <input type="number" value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} className="input" placeholder="45" />
            </div>
            <div>
              <label className="label">Aro</label>
              <input type="number" value={form.rim} onChange={(e) => setForm({ ...form, rim: e.target.value })} className="input" placeholder="17" />
            </div>
          </div>
          <div>
            <label className="label">Medida (texto) *</label>
            <input required value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="input" placeholder="225/45 R17" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Índice de carga</label>
              <input value={form.load_index} onChange={(e) => setForm({ ...form, load_index: e.target.value })} className="input" placeholder="95Y" />
            </div>
            <div>
              <label className="label">Índice de velocidad</label>
              <input value={form.speed_rating} onChange={(e) => setForm({ ...form, speed_rating: e.target.value })} className="input" placeholder="Y" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Terreno</label>
              <select value={form.terrain_type} onChange={(e) => setForm({ ...form, terrain_type: e.target.value })} className="input">
                <option value="">—</option>
                {['Asfalto', 'Mixto', 'Todoterreno', 'Barro'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Vehículo</label>
              <select value={form.vehicle_type} onChange={(e) => setForm({ ...form, vehicle_type: e.target.value })} className="input">
                <option value="">—</option>
                {['Deportivo', 'Sedán', 'SUV', 'Pickup/SUV'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Estacionalidad</label>
              <select value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} className="input">
                <option value="">—</option>
                {['Verano', 'Todas las estaciones', 'Invierno'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">URL de imagen</label>
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="input" placeholder="https://..." />
          </div>
          <div>
            <label className="label">Descripción</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input resize-none" />
          </div>
          <div>
            <label className="label">Precio (USD)</label>
            <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input" placeholder="199.00" />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-asphalt-700 dark:text-asphalt-300">
              <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="h-4 w-4 rounded accent-amber-400" />
              En stock
            </label>
            <label className="flex items-center gap-2 text-sm text-asphalt-700 dark:text-asphalt-300">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="h-4 w-4 rounded accent-amber-400" />
              Destacado
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              <Save className="h-4 w-4" /> Guardar
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
