
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcherFAB: React.FC = () => {
  const { seedColor, setSeedColor, mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: 'light', label: 'Claro', icon: '☀️' },
    { id: 'dark', label: 'Oscuro', icon: '🌙' },
    { id: 'oled', label: 'OLED', icon: '🌑' }
  ] as const;

  const quickColors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-[100] bg-primary text-on-primary border border-outline-variant/20"
      >
        <span className="text-2xl">🎨</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)} 
      />
      
      <div className="relative w-full max-w-sm rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-500 bg-surface border-t sm:border border-outline-variant/30 text-on-surface">
        <header className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black">Configurar Tema</h3>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full transition-colors hover:bg-surface-variant/50 text-on-surface-variant">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="space-y-8">
          <section className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 text-primary">Modo de Brillo</p>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl border bg-surface-container-low border-outline-variant/20">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                    mode === m.id 
                    ? 'bg-primary text-on-primary shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-variant/30'
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-[10px] font-bold uppercase">{m.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 text-primary">Color de Acento</p>
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              {quickColors.map(color => (
                <button
                  key={color}
                  onClick={() => setSeedColor(color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${
                    seedColor === color 
                    ? 'border-on-surface scale-110 shadow-lg' 
                    : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl border bg-surface-container-low border-outline-variant/20">
              <input 
                type="color" 
                value={seedColor}
                onChange={(e) => setSeedColor(e.target.value)}
                className="w-10 h-10 rounded-lg border-2 cursor-pointer bg-transparent border-outline"
              />
              <span className="font-mono text-sm font-bold uppercase tracking-wider text-on-surface">{seedColor}</span>
            </div>
          </section>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-8 py-4 rounded-full font-black shadow-lg active:scale-95 transition-all bg-primary text-on-primary"
        >
          Aplicar Cambios
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcherFAB;
