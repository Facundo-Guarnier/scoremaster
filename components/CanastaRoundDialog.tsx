
import React, { useState } from 'react';
import { Player } from '../types/game';

interface CanastaRoundDialogProps {
  players: Player[];
  onAdd: (scores: Record<string, number>) => void;
  onClose: () => void;
}

const CanastaRoundDialog: React.FC<CanastaRoundDialogProps> = ({ players, onAdd, onClose }) => {
  const [scores, setScores] = useState<Record<string, string>>(
    players.reduce((acc, p) => ({ ...acc, [p.id]: '' }), {})
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalScores: Record<string, number> = {};
    let hasValue = false;
    players.forEach(p => {
      const val = parseInt(scores[p.id]) || 0;
      finalScores[p.id] = val;
      if (scores[p.id] !== '') hasValue = true;
    });
    if (hasValue) onAdd(finalScores);
  };

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-300 bg-surface border border-outline-variant/30 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-0.5">
          <h3 className="text-lg font-black text-on-surface">Nueva Mano</h3>
        </div>

        <div className="space-y-3">
          {players.map((player) => (
            <div key={player.id} className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest ml-2 text-primary">
                {player.name}
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  value={scores[player.id]}
                  onChange={(e) => setScores({ ...scores, [player.id]: e.target.value })}
                  className="w-full rounded-xl py-2 px-3 text-lg font-black transition-all outline-none border-2 bg-surface-container text-on-surface border-transparent focus:border-primary placeholder:text-outline-variant"
                  autoFocus={player.id === players[0].id}
                />
                {scores[player.id] !== '' && (
                  <button 
                    type="button"
                    onClick={() => setScores({ ...scores, [player.id]: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-error transition-colors text-outline-variant"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors text-primary hover:bg-primary/10"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all active:scale-95 bg-primary text-on-primary shadow-primary/20"
          >
            Sumar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CanastaRoundDialog;
