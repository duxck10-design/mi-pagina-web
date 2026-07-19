import { useState, useMemo } from 'react';
import { Calculator, Info, ArrowRightLeft, Ruler } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { cn } from '../lib/utils';

interface TireSize {
  width: number;
  profile: number;
  rim: number;
}

function diameter(t: TireSize) {
  const sidewallHeight = (t.width * t.profile) / 100;
  return (2 * sidewallHeight + t.rim * 25.4) / 25.4;
}

export default function TireCalculator() {
  const [current, setCurrent] = useState({ width: 225, profile: 45, rim: 17 });
  const [newTire, setNewTire] = useState({ width: 235, profile: 45, rim: 18 });

  const results = useMemo(() => {
    const d1 = diameter(current);
    const d2 = diameter(newTire);
    const diff = ((d2 - d1) / d1) * 100;
    const speedoDiff = -diff;
    return {
      d1: d1.toFixed(2),
      d2: d2.toFixed(2),
      diff: diff.toFixed(2),
      speedoDiff: speedoDiff.toFixed(2),
      clearance: ((d2 - d1) / 2 * 25.4).toFixed(1),
      acceptable: Math.abs(diff) < 3,
    };
  }, [current, newTire]);

  const presets = [
    { label: 'Sedán estándar', size: { width: 205, profile: 55, rim: 16 } },
    { label: 'SUV común', size: { width: 235, profile: 65, rim: 17 } },
    { label: 'Deportivo', size: { width: 245, profile: 35, rim: 20 } },
    { label: 'Pickup', size: { width: 265, profile: 70, rim: 17 } },
  ];

  const TireInput = ({ label, tire, onChange }: { label: string; tire: TireSize; onChange: (t: TireSize) => void }) => (
    <div>
      <h3 className="font-display font-semibold text-asphalt-900 dark:text-white mb-4">{label}</h3>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-asphalt-500 dark:text-asphalt-400">Ancho (mm)</label>
          <select value={tire.width} onChange={(e) => onChange({ ...tire, width: parseInt(e.target.value) })} className="input !py-2.5 mt-1">
            {[175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315].map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-asphalt-500 dark:text-asphalt-400">Perfil (%)</label>
          <select value={tire.profile} onChange={(e) => onChange({ ...tire, profile: parseInt(e.target.value) })} className="input !py-2.5 mt-1">
            {[30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-asphalt-500 dark:text-asphalt-400">Aro (")</label>
          <select value={tire.rim} onChange={(e) => onChange({ ...tire, rim: parseInt(e.target.value) })} className="input !py-2.5 mt-1">
            {[14, 15, 16, 17, 18, 19, 20, 21, 22].map(r => <option key={r} value={r}>R{r}</option>)}
          </select>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-sm text-asphalt-600 dark:text-asphalt-400">
        {tire.width}/{tire.profile} R{tire.rim}
      </p>
    </div>
  );

  return (
    <div className="pt-28 pb-20">
      <section className="container-x max-w-3xl mb-10">
        <Reveal>
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-400 mb-4">
            <Calculator className="h-7 w-7" />
          </div>
          <span className="section-eyebrow">Calculadora de medidas</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 text-asphalt-900 dark:text-white tracking-tightest">
            Calculadora de equivalencias
          </h1>
          <p className="mt-4 text-asphalt-600 dark:text-asphalt-400">
            Compara dos medidas de llanta y verifica si son compatibles. Una diferencia de diámetro superior al 3% no es recomendable.
          </p>
        </Reveal>
      </section>

      <div className="container-x max-w-3xl">
        <Reveal>
          <div className="card p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <TireInput label="Llanta actual" tire={current} onChange={setCurrent} />
              <div className="flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-asphalt-900 text-amber-400 dark:bg-white/5">
                  <ArrowRightLeft className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-6">
              <TireInput label="Llanta nueva" tire={newTire} onChange={setNewTire} />
            </div>

            {/* Results */}
            <div className="mt-8 pt-8 border-t border-asphalt-200 dark:border-asphalt-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <Ruler className="h-5 w-5 mx-auto text-asphalt-400" />
                  <p className="mt-2 text-xs text-asphalt-500 dark:text-asphalt-400">Diámetro actual</p>
                  <p className="font-display text-lg font-bold text-asphalt-900 dark:text-white">{results.d1}"</p>
                </div>
                <div className="text-center">
                  <Ruler className="h-5 w-5 mx-auto text-asphalt-400" />
                  <p className="mt-2 text-xs text-asphalt-500 dark:text-asphalt-400">Diámetro nuevo</p>
                  <p className="font-display text-lg font-bold text-asphalt-900 dark:text-white">{results.d2}"</p>
                </div>
                <div className="text-center">
                  <p className="mt-2 text-xs text-asphalt-500 dark:text-asphalt-400">Diferencia</p>
                  <p className={cn('font-display text-lg font-bold', results.acceptable ? 'text-emerald-500' : 'text-red-500')}>
                    {results.diff}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="mt-2 text-xs text-asphalt-500 dark:text-asphalt-400">Holgura</p>
                  <p className="font-display text-lg font-bold text-asphalt-900 dark:text-white">{results.clearance}mm</p>
                </div>
              </div>

              <div className={cn('mt-6 rounded-xl p-4 flex items-start gap-3', results.acceptable ? 'bg-emerald-500/10' : 'bg-red-500/10')}>
                <Info className={cn('h-5 w-5 shrink-0 mt-0.5', results.acceptable ? 'text-emerald-500' : 'text-red-500')} />
                <div>
                  <p className={cn('font-semibold text-sm', results.acceptable ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
                    {results.acceptable ? 'Cambio compatible' : 'Cambio no recomendado'}
                  </p>
                  <p className="text-sm text-asphalt-600 dark:text-asphalt-400 mt-1">
                    {results.acceptable
                      ? `La diferencia de diámetro está dentro del rango aceptable (±3%). El velocímetro variará ~${Math.abs(parseFloat(results.speedoDiff)).toFixed(1)}%.`
                      : `La diferencia supera el 3% recomendado. Esto puede afectar la precisión del velocímetro, el ABS y la altura del vehículo.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Presets */}
        <Reveal delay={100}>
          <div className="card p-6 mt-6">
            <h3 className="font-display font-semibold text-asphalt-900 dark:text-white mb-4">Medidas comunes</h3>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setCurrent(p.size)}
                  className="badge !px-4 !py-2 bg-asphalt-100 text-asphalt-600 dark:bg-asphalt-800 dark:text-asphalt-300 hover:bg-asphalt-200 dark:hover:bg-asphalt-700 transition-colors"
                >
                  {p.label}: {p.size.width}/{p.size.profile} R{p.size.rim}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
