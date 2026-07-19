import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Send, CheckCircle2, ShoppingBag, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/types';
import { Reveal } from '../components/Reveal';

const WHATSAPP_NUMBER = '51984830652';

export default function Quote() {
  const location = useLocation();
  const state = location.state as { productId?: string; productName?: string; quantity?: number } | null;

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', product_name: state?.productName || '',
    quantity: state?.quantity || 4, message: '',
  });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    supabase.from('products').select('*, brand:brands(*)').order('name').then(({ data }) => setProducts(data ?? []));
  }, []);

  const filteredProducts = search.trim()
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.size.toLowerCase().includes(search.toLowerCase()))
    : products;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const selected = products.find(p => p.name === form.product_name);
    const { error } = await supabase.from('quote_requests').insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      product_id: selected?.id || null,
      product_name: form.product_name || null,
      quantity: form.quantity,
      message: form.message || null,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  const waText = `Hola, solicito cotización de:\n• Producto: ${form.product_name || 'No especificado'}\n• Cantidad: ${form.quantity}\n• Nombre: ${form.name}${form.message ? `\n• Nota: ${form.message}` : ''}`;
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  if (status === 'success') {
    return (
      <div className="pt-28 pb-20 container-x max-w-xl text-center">
        <Reveal>
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-asphalt-900 dark:text-white">¡Solicitud enviada!</h1>
          <p className="mt-3 text-asphalt-600 dark:text-asphalt-400">
            Recibimos tu solicitud de cotización. Un especialista te contactará en menos de 24 horas con el precio y disponibilidad.
          </p>
          <p className="mt-4 text-sm text-asphalt-500 dark:text-asphalt-500">
            ¿Quieres acelerar el proceso? Escríbenos directamente por WhatsApp.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn mt-6 bg-[#25D366] text-white hover:bg-[#20bd5a]">
            Enviar por WhatsApp
          </a>
          <div className="mt-4">
            <Link to="/catalogo" className="btn-ghost">Volver al catálogo</Link>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <section className="container-x max-w-2xl mb-10">
        <Reveal>
          <span className="section-eyebrow">Cotización en línea</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest">
            Solicita tu cotización
          </h1>
          <p className="mt-4 text-asphalt-600 dark:text-asphalt-400">
            Completa el formulario y recibe un precio personalizado en menos de 24 horas. Sin compromiso.
          </p>
        </Reveal>
      </section>

      <div className="container-x max-w-2xl">
        <Reveal>
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Nombre completo *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="label">Teléfono *</label>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+51 ..." />
              </div>
            </div>
            <div>
              <label className="label">Correo electrónico</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="tu@correo.com" />
            </div>

            {/* Product search */}
            <div>
              <label className="label">Producto de interés</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-asphalt-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input !pl-11"
                  placeholder="Buscar llanta por nombre o medida..."
                />
              </div>
              {search && (
                <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-asphalt-200 dark:border-asphalt-700">
                  {filteredProducts.slice(0, 6).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => { setForm({ ...form, product_name: p.name }); setSearch(''); }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-asphalt-100 dark:hover:bg-asphalt-800 transition-colors border-b border-asphalt-100 dark:border-asphalt-800/50 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-asphalt-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-asphalt-500 dark:text-asphalt-400 font-mono">{p.size} · {p.brand?.name}</p>
                      </div>
                      <ShoppingBag className="h-4 w-4 text-asphalt-400" />
                    </button>
                  ))}
                </div>
              )}
              {form.product_name && !search && (
                <div className="mt-2 flex items-center justify-between rounded-xl bg-amber-400/10 px-4 py-3">
                  <span className="text-sm font-medium text-asphalt-900 dark:text-white">{form.product_name}</span>
                  <button type="button" onClick={() => setForm({ ...form, product_name: '' })} className="text-xs text-asphalt-500 hover:text-red-500">Cambiar</button>
                </div>
              )}
            </div>

            <div>
              <label className="label">Cantidad</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })} className="flex h-11 w-11 items-center justify-center rounded-xl border border-asphalt-300 dark:border-asphalt-700 text-asphalt-600 dark:text-asphalt-300">−</button>
                <input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) || 1 })} className="input !w-24 text-center" />
                <button type="button" onClick={() => setForm({ ...form, quantity: form.quantity + 1 })} className="flex h-11 w-11 items-center justify-center rounded-xl border border-asphalt-300 dark:border-asphalt-700 text-asphalt-600 dark:text-asphalt-300">+</button>
                <span className="text-sm text-asphalt-400 ml-2">unidades</span>
              </div>
            </div>

            <div>
              <label className="label">Mensaje (opcional)</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" placeholder="Especificaciones, vehículo, fecha requerida..." />
            </div>

            {status === 'error' && <p className="text-sm text-red-500">Hubo un error. Intenta de nuevo.</p>}

            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full !py-4">
              <Send className="h-4 w-4" />
              {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
            </button>

            <div className="text-center">
              <span className="text-xs text-asphalt-400">o</span>
            </div>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn w-full !py-4 bg-[#25D366] text-white hover:bg-[#20bd5a]">
              Cotizar por WhatsApp
            </a>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
