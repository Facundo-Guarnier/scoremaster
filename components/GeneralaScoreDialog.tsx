
import React from 'react';

export type GeneralaCategory = '1' | '2' | '3' | '4' | '5' | '6' | 'E' | 'F' | 'P' | 'G' | 'DG';

interface GeneralaScoreDialogProps {
  category: GeneralaCategory;
  playerName: string;
  onSelect: (score: number) => void;
  onClose: () => void;
}

const CATEGORY_NAMES: Record<GeneralaCategory, string> = {
  '1': 'Unos', '2': 'Doses', '3': 'Treses', '4': 'Cuatros', '5': 'Cincos', '6': 'Seises',
  'E': 'Escalera', 'F': 'Full', 'P': 'Poker', 'G': 'Generala', 'DG': 'Doble G.'
};

const GeneralaScoreDialog: React.FC<GeneralaScoreDialogProps> = ({ category, playerName, onSelect, onClose }) => {
  const isNumeric = ['1', '2', '3', '4', '5', '6'].includes(category);

  const renderNumericOptions = () => {
    const val = parseInt(category);
    return (
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((count) => (
          <button
            key={count}
            onClick={() => onSelect(count * val)}
            className="flex flex-col items-center justify-center p-2 rounded-xl transition-all active:scale-95 bg-surface-container-highest text-on-surface hover:bg-surface-variant"
          >
            <span className="text-xl font-black">{count * val}</span>
            <span className="text-[8px] uppercase opacity-60 font-bold">{count}d</span>
          </button>
        ))}
      </div>
    );
  };

  const renderMajorOptions = () => {
    const options: Record<string, { base: number; servida: number }> = {
      'E': { base: 20, servida: 25 },
      'F': { base: 30, servida: 35 },
      'P': { base: 40, servida: 45 },
      'G': { base: 50, servida: 55 },
      'DG': { base: 100, servida: 100 },
    };
    const config = options[category];
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(config.base)}
            className="p-3 rounded-xl flex flex-col items-center bg-primary-container text-on-primary-container hover:bg-primary/10 transition-colors"
          >
            <span className="text-xl font-black">{config.base}</span>
            <span className="text-[9px] uppercase font-bold">Armada</span>
          </button>
          {category !== 'DG' && (
            <button
              onClick={() => onSelect(config.servida)}
              className="p-3 rounded-xl flex flex-col items-center shadow-lg active:scale-95 bg-primary text-on-primary shadow-primary/20"
            >
              <span className="text-xl font-black">{config.servida}</span>
              <span className="text-[9px] uppercase font-bold">Servida</span>
            </button>
          )}
        </div>
        <button
          onClick={() => onSelect(0)}
          className="w-full p-3 rounded-xl font-bold border transition-colors bg-surface text-on-surface-variant border-outline-variant hover:bg-surface-variant/20 text-xs"
        >
          Tachar (0)
        </button>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-300 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xs rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-300 bg-surface border border-outline-variant/30 text-on-surface cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-black">{CATEGORY_NAMES[category]}</h3>
            <p className="text-xs text-on-surface-variant">
              Para <span className="font-bold text-primary">{playerName}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-surface-container text-on-surface-variant">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isNumeric ? renderNumericOptions() : renderMajorOptions()}

        <div className="mt-4 pt-2 border-t border-outline-variant/20">
          <button 
            onClick={onClose} 
            className="w-full text-xs font-bold uppercase tracking-widest py-2 rounded-xl text-primary hover:bg-primary/10"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralaScoreDialog;
