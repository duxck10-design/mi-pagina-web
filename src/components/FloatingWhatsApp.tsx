import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '51984830652';
const WHATSAPP_MESSAGE = 'Hola, me gustaría obtener información sobre llantas.';

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setTooltipOpen(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {tooltipOpen && (
        <div className="glass rounded-xl px-4 py-3 shadow-xl max-w-[240px] animate-fade-up relative">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-asphalt-200 dark:bg-asphalt-800 text-asphalt-600 dark:text-asphalt-300"
            aria-label="Cerrar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="text-sm font-medium text-asphalt-800 dark:text-asphalt-100">
            ¿Necesitas asesoría?
          </p>
          <p className="text-xs text-asphalt-600 dark:text-asphalt-400 mt-0.5">
            Chatea con un experto en llantas ahora.
          </p>
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-105 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-200"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
        </span>
      </a>
    </div>
  );
}
