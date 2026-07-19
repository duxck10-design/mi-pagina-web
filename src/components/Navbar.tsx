import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ShoppingBag, ChevronDown } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/utils';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/marcas', label: 'Marcas' },
  { to: '/quienes-somos', label: 'Empresa', children: [
    { to: '/quienes-somos', label: 'Quiénes Somos' },
    { to: '/historia', label: 'Nuestra Historia' },
    { to: '/mision-vision', label: 'Misión, Visión y Valores' },
  ]},
  { to: '/servicios', label: 'Servicios' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto', children: [
    { to: '/contacto', label: 'Contacto' },
    { to: '/faq', label: 'Preguntas Frecuentes' },
    { to: '/cotizacion', label: 'Cotización en Línea' },
    { to: '/certificaciones', label: 'Certificaciones' },
    { to: '/garantias', label: 'Garantías' },
  ]},
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass shadow-lg shadow-asphalt-950/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="container-x flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative h-9 w-9 transition-transform group-hover:scale-105">
            <div className="absolute inset-0 rounded-full border-2 border-amber-400" />
            <div className="absolute inset-[3px] rounded-full bg-amber-400/90" />
            <div className="absolute inset-[7px] rounded-full bg-asphalt-950" />
          </div>
          <div className="leading-none">
            <span className="font-display text-lg font-bold tracking-tightest text-asphalt-900 dark:text-white">
              SAULIN
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-asphalt-500 dark:text-asphalt-400">
              Global Holdings
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.to}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.to)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-asphalt-700 hover:text-asphalt-950 dark:text-asphalt-200 dark:hover:text-white'
                  )
                }
              >
                {link.label}
                {link.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </NavLink>
              {link.children && openDropdown === link.to && (
                <div className="absolute left-0 top-full pt-2 w-56 animate-fade-in">
                  <div className="glass rounded-xl p-2 shadow-xl shadow-asphalt-950/10">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block rounded-lg px-3 py-2.5 text-sm text-asphalt-700 hover:bg-asphalt-100 hover:text-asphalt-950 dark:text-asphalt-200 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-asphalt-700 hover:bg-asphalt-100 dark:text-asphalt-200 dark:hover:bg-white/5 transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/cotizacion" className="hidden sm:inline-flex btn-primary !py-2.5 !px-4">
            <ShoppingBag className="h-4 w-4" />
            Cotizar
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-asphalt-900 dark:text-white"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden container-x mt-3">
          <div className="glass rounded-2xl p-4 max-h-[80vh] overflow-y-auto animate-fade-in">
            {navLinks.map((link) => (
              <div key={link.to} className="border-b border-asphalt-200/40 dark:border-asphalt-800/40 last:border-0">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'block py-3 text-base font-medium',
                      isActive ? 'text-amber-600 dark:text-amber-400' : 'text-asphalt-800 dark:text-asphalt-100'
                    )
                  }
                >
                  {link.label}
                </NavLink>
                {link.children && (
                  <div className="pb-2 pl-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block py-2 text-sm text-asphalt-600 dark:text-asphalt-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/cotizacion" className="btn-primary w-full mt-4">
              <ShoppingBag className="h-4 w-4" />
              Solicitar Cotización
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
