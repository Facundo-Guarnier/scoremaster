
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeShowcase: React.FC = () => {
  const { seedColor, setSeedColor, mode, setMode } = useTheme();

  const ColorChip = ({ bg, text, label }: { bg: string; text: string; label: string }) => (
    <div className={`${bg} ${text} p-4 rounded-xl flex flex-col justify-between h-24 shadow-sm transition-all duration-300`}>
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      <span className="text-sm opacity-80">M3 Token</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Controles del Sistema */}
      <section className="bg-surface-variant/20 p-6 rounded-3xl border border-outline-variant">
        <h2 className="text-xl font-bold mb-6 text-on-surface">Configurador del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Color Semilla (M3 Source)</label>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={seedColor}
                onChange={(e) => setSeedColor(e.target.value)}
                className="w-12 h-12 rounded-full border-2 border-outline cursor-pointer overflow-hidden"
              />
              <span className="font-mono text-on-surface uppercase">{seedColor}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-2">Modo Visual</label>
            <div className="flex bg-surface-variant p-1 rounded-full border border-outline-variant">
              {(['light', 'dark', 'oled'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-full text-xs font-bold uppercase transition-all ${
                    mode === m 
                    ? 'bg-primary text-on-primary shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Card */}
      <section className="bg-surface p-8 rounded-[2rem] border border-outline-variant shadow-lg flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-on-surface tracking-tight">Material You + Tailwind</h1>
          <p className="text-on-surface-variant leading-relaxed">
            Esta interfaz se adapta armónicamente al color seleccionado. Usando <code className="bg-primary-container text-on-primary-container px-1 rounded">material-color-utilities</code>, generamos una paleta tonal que respeta los ratios de contraste definidos por Google.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold shadow-sm hover:opacity-90 transition-opacity">
              Acción Primaria
            </button>
            <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
              Contenedor Secundario
            </button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <ColorChip bg="bg-tertiary" text="text-on-tertiary" label="Tertiary" />
          <ColorChip bg="bg-error" text="text-on-error" label="Error" />
          <div className="col-span-2 bg-surface-variant text-on-surface-variant p-4 rounded-xl border border-outline italic text-sm">
            Nota: En modo OLED, este fondo es #000000 pero los acentos mantienen su colorimetría.
          </div>
        </div>
      </section>

      {/* Grid de Tokens */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ColorChip bg="bg-primary" text="text-on-primary" label="Primary" />
        <ColorChip bg="bg-primary-container" text="text-on-primary-container" label="P. Container" />
        <ColorChip bg="bg-secondary" text="text-on-secondary" label="Secondary" />
        <ColorChip bg="bg-secondary-container" text="text-on-secondary-container" label="S. Container" />
      </div>
    </div>
  );
};

export default ThemeShowcase;
