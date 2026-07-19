import { Link } from 'react-router-dom';
import { ArrowLeft, Gauge } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center">
      <div className="container-x max-w-lg text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-400 mb-6">
          <Gauge className="h-10 w-10" />
        </div>
        <p className="font-display text-7xl font-bold gradient-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-asphalt-900 dark:text-white">Página no encontrada</h1>
        <p className="mt-3 text-asphalt-600 dark:text-asphalt-400">La ruta que buscas no existe o fue movida.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </div>
    </div>
  );
}
