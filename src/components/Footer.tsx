import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const tiktokIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-asphalt-100 dark:bg-asphalt-950 border-t border-asphalt-200 dark:border-asphalt-800/50">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="relative h-9 w-9">
                <div className="absolute inset-0 rounded-full border-2 border-amber-400" />
                <div className="absolute inset-[3px] rounded-full bg-amber-400/90" />
                <div className="absolute inset-[7px] rounded-full bg-asphalt-950" />
              </div>
              <div className="leading-none">
                <span className="font-display text-lg font-bold tracking-tightest text-asphalt-900 dark:text-white">
                  SAULIN
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-asphalt-500">
                  Global Holdings
                </span>
              </div>
            </Link>
            <p className="text-sm text-asphalt-600 dark:text-asphalt-400 leading-relaxed mb-6">
              Saulin Global Holdings — Importación, distribución y venta de llantas de alto rendimiento. Marcas líderes mundiales con tecnología, seguridad y confianza.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Facebook className="h-4 w-4" />, href: '#', label: 'Facebook' },
                { icon: <Instagram className="h-4 w-4" />, href: '#', label: 'Instagram' },
                { icon: tiktokIcon, href: '#', label: 'TikTok' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-asphalt-300 text-asphalt-700 hover:border-amber-400 hover:text-amber-500 dark:border-asphalt-700 dark:text-asphalt-300 dark:hover:border-amber-400 dark:hover:text-amber-400 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-asphalt-900 dark:text-white mb-4">
              Catálogo
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/catalogo', label: 'Todos los productos' },
                { to: '/catalogo?vehicle=Deportivo', label: 'Llantas deportivas' },
                { to: '/catalogo?terrain=Todoterreno', label: 'Todoterreno' },
                { to: '/catalogo?vehicle=SUV', label: 'Para SUV' },
                { to: '/marcas', label: 'Marcas distribuidas' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-asphalt-600 hover:text-amber-600 dark:text-asphalt-400 dark:hover:text-amber-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-asphalt-900 dark:text-white mb-4">
              Empresa
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/quienes-somos', label: 'Quiénes Somos' },
                { to: '/historia', label: 'Nuestra Historia' },
                { to: '/mision-vision', label: 'Misión y Valores' },
                { to: '/servicios', label: 'Servicios' },
                { to: '/certificaciones', label: 'Certificaciones' },
                { to: '/garantias', label: 'Garantías' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-asphalt-600 hover:text-amber-600 dark:text-asphalt-400 dark:hover:text-amber-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-asphalt-900 dark:text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-asphalt-600 dark:text-asphalt-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <a href="https://maps.app.goo.gl/zgHiSfzSLT5nMJSw6" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Ver ubicación en Google Maps</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+51984830652" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    +51 984830652
                  </a>
                  <a href="tel:+51939897024" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    +51 939897024
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <a href="mailto:duxck10@gmail.com" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  duxck10@gmail.com
                </a>
              </li>
            </ul>
            <Link to="/cotizacion" className="btn-secondary w-full mt-5 !py-2.5 group">
              Solicitar cotización
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-asphalt-200 dark:border-asphalt-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-asphalt-500 dark:text-asphalt-500">
            © {new Date().getFullYear()} Saulin Global Holdings. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-asphalt-500 dark:text-asphalt-500">
            <Link to="/faq" className="hover:text-asphalt-700 dark:hover:text-asphalt-300 transition-colors">FAQ</Link>
            <a href="#" className="hover:text-asphalt-700 dark:hover:text-asphalt-300 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-asphalt-700 dark:hover:text-asphalt-300 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
