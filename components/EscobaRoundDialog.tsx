
import React, { useState } from 'react';
import { Player } from '../types/game';

interface EscobaRoundData {
  escobas: number;
  sieteOro: boolean;
  setenta: boolean;
  cartas: boolean;
  oros: boolean;
}

interface EscobaRoundDialogProps {
  players: Player[];
  onAdd: (roundScores: Record<string, number>, roundDetails: Record<string, any>) => void;
  onClose: () => void;
}

const EscobaRoundDialog: React.FC<EscobaRoundDialogProps> = ({ players, onAdd, onClose }) => {
  const [data, setData] = useState<Record<string, EscobaRoundData>>(
    players.reduce((acc, p) => ({
      ...acc,
      [p.id]: { escobas: 0, sieteOro: false, setenta: false, cartas: false, oros: false }
    }), {})
  );

  const toggleExclusiveItem = (playerId: string, item: keyof Omit<EscobaRoundData, 'escobas'>) => {
    setData(prev => {
      const newData = { ...prev };
      const currentlyHas = prev[playerId][item];
      players.forEach(p => newData[p.id] = { ...newData[p.id], [item]: false });
      if (!currentlyHas) newData[playerId] = { ...newData[playerId], [item]: true };
      return newData;
    });
  };

  const updateEscobas = (playerId: string, delta: number) => {
    setData(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], escobas: Math.max(0, prev[playerId].escobas + delta) }
    }));
  };

  const calculatePlayerPoints = (pData: EscobaRoundData) => {
    let pts = pData.escobas;
    if (pData.sieteOro) pts += 1;
    if (pData.setenta) pts += 1;
    if (pData.cartas) pts += 1;
    if (pData.oros) pts += 1;
    return pts;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scores: Record<string, number> = {};
    const details: Record<string, any> = {};
    players.forEach(p => {
      scores[p.id] = calculatePlayerPoints(data[p.id]);
      details[p.id] = data[p.id];
    });
    onAdd(scores, details);
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-300 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto bg-surface border border-outline-variant/30 text-on-surface cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="text-center">
          <h3 className="text-lg font-black">Calculadora</h3>
        </header>

        <div className="space-y-3">
          {players.map((player) => {
            const pData = data[player.id];
            const total = calculatePlayerPoints(pData);
            return (
              <div key={player.id} className="flex flex-col p-3 rounded-xl space-y-3 bg-surface-container-high border border-outline-variant/20 shadow-sm">
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">
                    {player.name}
                  </span>
                  <span className="text-lg font-black tabular-nums text-on-surface">
                    {total}<span className="text-[9px] ml-1 opacity-50 uppercase">pts</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-on-surface-variant">Escobas</span>
                  <div className="flex items-center gap-2 bg-surface-container-highest p-1 rounded-lg border border-outline-variant/10">
                    <button 
                      type="button"
                      onClick={() => updateEscobas(player.id, -1)} 
                      className="w-7 h-7 rounded-md flex items-center justify-center font-black hover:bg-surface-variant/30"
                    >-</button>
                    <span className="w-3 text-center font-black text-sm">{pData.escobas}</span>
                    <button 
                      type="button"
                      onClick={() => updateEscobas(player.id, 1)} 
                      className="w-7 h-7 rounded-md flex items-center justify-center font-black bg-primary text-on-primary shadow-sm"
                    >+</button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  {[
                    { key: 'sieteOro', label: '7O' },
                    { key: 'setenta', label: '70' },
                    { key: 'cartas', label: 'Car' },
                    { key: 'oros', label: 'Oro' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleExclusiveItem(player.id, item.key as any)}
                      className={`py-1.5 rounded-lg text-[9px] font-black transition-all border ${
                        pData[item.key as keyof EscobaRoundData] 
                        ? 'bg-primary border-primary text-on-primary shadow-sm' 
                        : 'bg-surface-container border-outline-variant text-on-surface-variant'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl font-bold text-xs text-primary hover:bg-primary/10 transition-colors">
            Cancelar
          </button>
          <button type="button" onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl font-black text-xs bg-primary text-on-primary shadow-lg shadow-primary/20 active:scale-95 transition-all">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscobaRoundDialog;
