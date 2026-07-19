import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const faqs = [
  { q: '¿Cómo sé qué medida de llanta necesita mi vehículo?', a: 'La medida está grabada en el flanco de la llanta actual, en formato como 225/45 R17. También puedes consultar el manual del propietario o la etiqueta ubicada en la puerta del conductor. Si tienes dudas, usa nuestra calculadora de medidas o contáctanos para asesoría gratuita.' },
  { q: '¿Qué significan el índice de carga y el índice de velocidad?', a: 'El índice de carga indica el peso máximo que la llanta soporta (ej: 95 = 690 kg por llanta). El índice de velocidad indica la velocidad máxima segura (ej: Y = 300 km/h). Siempre usa llantas con índices iguales o superiores a los originales de tu vehículo.' },
  { q: '¿Ofrecen garantía en sus productos?', a: 'Sí. Todos nuestros productos cuentan con garantía del fabricante ante defectos de fabricación. El periodo varía según la marca y modelo, generalmente entre 1 y 5 años. Visita nuestra página de garantías para más detalles.' },
  { q: '¿Hacen envíos a todo el país?', a: 'Sí, despachamos a todo el territorio nacional en 24 horas hábiles. El envío es gratuito en compras superiores a 4 llantas. Incluimos seguimiento en tiempo real y seguro de transporte.' },
  { q: '¿Puedo comprar llantas para flotas comerciales?', a: 'Por supuesto. Tenemos un programa de distribución mayorista con precios preferenciales para flotas, talleres y concesionarios. Contáctanos para una propuesta personalizada según tu volumen.' },
  { q: '¿Las llantas son originales de la marca?', a: 'Sí. Trabajamos con importación directa de los fabricantes. Todas nuestras llantas son 100% originales y cuentan con certificaciones DOT, ECE y/o ISO según corresponda. Garantizamos autenticidad total.' },
  { q: '¿Instalan las llantas o solo las venden?', a: 'Ofrecemos servicio completo: montaje, balanceo y alineación computarizada en nuestro centro de servicio. Si prefieres instalarlas en tu taller habitual, podemos enviarte solo el producto.' },
  { q: '¿Cuál es la diferencia entre llantas de verano, invierno y todas las estaciones?', a: 'Las de verano ofrecen mejor agarre en temperaturas altas y mayor durabilidad. Las de invierno mantienen flexibilidad bajo 7°C y tienen mejor tracción en nieve. Las all-season son un compromiso equilibrado para climas moderados.' },
  { q: '¿Cuándo debo rotar mis llantas?', a: 'Recomendamos rotación cada 8.000 a 10.000 km para asegurar desgaste uniforme. También es recomendable equilibrar las llantas en cada rotación y alinear la dirección cada 15.000 km o si notas vibraciones o desviaciones.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y financiamiento corporativo para flotas. En la cotización te indicaremos el método más conveniente según tu compra.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-28 pb-20">
      <section className="container-x max-w-3xl">
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-400 mb-4">
              <HelpCircle className="h-7 w-7" />
            </div>
            <span className="section-eyebrow">Preguntas Frecuentes</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest">
              Resolvemos tus dudas
            </h1>
            <p className="mt-4 text-asphalt-600 dark:text-asphalt-400">
              Todo lo que necesitas saber antes de comprar tus llantas.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className="card overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-semibold text-asphalt-900 dark:text-white">{faq.q}</span>
                  <ChevronDown className={cn('h-5 w-5 text-asphalt-400 shrink-0 transition-transform', open === i && 'rotate-180 text-amber-500')} />
                </button>
                <div className={cn('grid transition-all duration-300', open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-asphalt-600 dark:text-asphalt-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <p className="text-asphalt-600 dark:text-asphalt-400">¿No encuentras tu respuesta?</p>
            <Link to="/contacto" className="btn-primary mt-4 inline-flex">Contáctanos</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
