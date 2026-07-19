import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Reveal } from '../components/Reveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <div className="pt-28 pb-20">
      <section className="container-x mb-12">
        <Reveal>
          <span className="section-eyebrow">Contacto</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest">
            Hablemos.
          </h1>
          <p className="mt-4 text-lg text-asphalt-600 dark:text-asphalt-400 max-w-2xl">
            Estamos aquí para ayudarte. Escríbenos y un especialista te responderá en menos de 24 horas.
          </p>
        </Reveal>
      </section>

      <div className="container-x grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Form */}
        <Reveal>
          <div className="card p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-asphalt-900 dark:text-white">¡Mensaje enviado!</h2>
                <p className="mt-2 text-asphalt-600 dark:text-asphalt-400">Gracias por contactarnos. Te responderemos pronto.</p>
                <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label">Nombre completo *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="label">Teléfono</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+51 ..." />
                  </div>
                </div>
                <div>
                  <label className="label">Correo electrónico</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="tu@correo.com" />
                </div>
                <div>
                  <label className="label">Asunto</label>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" placeholder="¿Sobre qué nos escribes?" />
                </div>
                <div>
                  <label className="label">Mensaje *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" placeholder="Cuéntanos en qué podemos ayudarte..." />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-500">Hubo un error al enviar. Intenta de nuevo.</p>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
                  <Send className="h-4 w-4" />
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Info + Map */}
        <div className="space-y-6">
          <Reveal delay={100}>
            <div className="card p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-asphalt-900 dark:text-white">Dirección</h3>
                  <a href="https://maps.app.goo.gl/zgHiSfzSLT5nMJSw6" target="_blank" rel="noopener noreferrer" className="text-sm text-asphalt-600 dark:text-asphalt-400 mt-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Ver ubicación en Google Maps</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-asphalt-900 dark:text-white">Teléfono</h3>
                  <div className="flex flex-col gap-1 mt-1">
                    <a href="tel:+51984830652" className="text-sm text-asphalt-600 dark:text-asphalt-400 hover:text-amber-600 dark:hover:text-amber-400">+51 984830652</a>
                    <a href="tel:+51939897024" className="text-sm text-asphalt-600 dark:text-asphalt-400 hover:text-amber-600 dark:hover:text-amber-400">+51 939897024</a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-asphalt-900 dark:text-white">Correo</h3>
                  <a href="mailto:duxck10@gmail.com" className="text-sm text-asphalt-600 dark:text-asphalt-400 mt-1 hover:text-amber-600 dark:hover:text-amber-400">duxck10@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-600 dark:text-amber-400 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-asphalt-900 dark:text-white">Horario</h3>
                  <p className="text-sm text-asphalt-600 dark:text-asphalt-400 mt-1">Lun - Vie: 8:00 - 18:00<br />Sáb: 9:00 - 14:00</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <a
              href="https://maps.app.goo.gl/zgHiSfzSLT5nMJSw6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              Ver ubicación en Google Maps
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
