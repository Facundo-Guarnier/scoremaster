
import React, { useState, useMemo } from 'react';
import { Player } from '../types/game';

interface PlayerRoundState {
  playing: boolean;
  tricks: number;
}

interface MoscaRoundDialogProps {
  players: Player[];
  onAdd: (roundScores: Record<string, number>, roundDetails: Record<string, any>) => void;
  onClose: () => void;
}

const MoscaRoundDialog: React.FC<MoscaRoundDialogProps> = ({ players, onAdd, onClose }) => {
  const [data, setData] = useState<Record<string, PlayerRoundState>>(
    players.reduce((acc, p) => ({
      ...acc,
      [p.id]: { playing: true, tricks: 0 }
    }), {})
  );

  const togglePlaying = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (player?.details?.passedLastRound && data[playerId].playing) {
      return;
    }

    setData(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], playing: !prev[playerId].playing, tricks: 0 }
    }));
  };

  const updateTricks = (playerId: string, val: number) => {
    setData(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], tricks: val }
    }));
  };

  const calculatePlayerImpact = (pState: PlayerRoundState) => {
    if (!pState.playing) return 0;
    if (pState.tricks === 0) return 5;
    return -pState.tricks;
  };

  const totalTricks = useMemo(() => {
    return (Object.values(data) as PlayerRoundState[])
      .filter(p => p.playing)
      .reduce((sum, p) => sum + p.tricks, 0);
  }, [data]);

  const isValid = totalTricks === 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const scores: Record<string, number> = {};
    const details: Record<string, any> = {};
    players.forEach(p => {
      const pState = data[p.id];
      scores[p.id] = calculatePlayerImpact(pState);
      details[p.id] = { passed: !pState.playing, tricks: pState.tricks };
    });
    onAdd(scores, details);
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto bg-surface border border-outline-variant/30 text-on-surface cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="text-center">
          <h3 className="text-lg font-black tracking-tight">Cargar Ronda</h3>
        </header>

        {/* Indicador de Bazas Compacto */}
        <div className="flex justify-center">
          <div className={`
            px-4 py-1.5 rounded-xl border-2 font-black transition-all duration-300 flex items-center gap-2
            ${totalTricks === 5 ? 'bg-primary/5 border-primary text-primary' : 
              totalTricks > 5 ? 'bg-error/5 border-error text-error' : 
              'bg-surface-container-high border-outline-variant text-on-surface-variant'}
          `}>
            <span className="text-[10px] uppercase tracking-widest">Bazas:</span>
            <span className="text-lg tabular-nums">{totalTricks} / 5</span>
          </div>
        </div>

        <div className="space-y-2">
          {players.map((player) => {
            const pState = data[player.id];
            const impact = calculatePlayerImpact(pState);
            const canPass = !player.details?.passedLastRound;

            return (
              <div key={player.id} className={`p-3 rounded-xl border transition-all ${
                pState.playing ? 'bg-surface-container-low border-outline-variant/20 shadow-sm' : 'bg-surface-container-highest/10 border-transparent opacity-50'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-wider text-on-surface truncate max-w-[80px]">
                      {player.name}
                    </span>
                    {player.details?.passedLastRound && (
                      <span className="text-[7px] font-bold text-error uppercase">Obligado</span>
                    )}
                  </div>
                  
                  <div className="flex bg-surface-container-high rounded-lg p-0.5 border border-outline-variant/10">
                    <button
                      type="button"
                      onClick={() => !pState.playing && togglePlaying(player.id)}
                      className={`px-3 py-1 rounded-md text-[8px] font-black transition-all ${
                        pState.playing 
                        ? 'bg-primary text-on-primary shadow-sm' 
                        : 'text-on-surface-variant'
                      }`}
                    >
                      JUEGA
                    </button>
                    <button
                      type="button"
                      disabled={!canPass}
                      onClick={() => pState.playing && togglePlaying(player.id)}
                      className={`px-3 py-1 rounded-md text-[8px] font-black transition-all disabled:opacity-5 ${
                        !pState.playing 
                        ? 'bg-on-surface text-surface' 
                        : 'text-on-surface-variant/40 hover:text-on-surface-variant'
                      }`}
                    >
                      PASA
                    </button>
                  </div>
                </div>

                {pState.playing ? (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 grid grid-cols-6 gap-1">
                      {[0, 1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => updateTricks(player.id, val)}
                          className={`aspect-square rounded-lg flex items-center justify-center font-black text-[10px] transition-all border-2 ${
                            pState.tricks === val
                            ? val === 0 ? 'bg-error text-on-error border-error shadow-sm' : 'bg-primary text-on-primary border-primary shadow-sm'
                            : 'bg-surface border-outline-variant/10 text-on-surface-variant'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    <div className={`w-10 text-center font-black text-xs tabular-nums p-1 rounded-lg border-dashed border ${
                      impact > 0 ? 'bg-error/5 text-error border-error/20' : impact < 0 ? 'bg-primary/5 text-primary border-primary/20' : 'text-on-surface/20 border-outline-variant'
                    }`}>
                      {impact > 0 ? `+${impact}` : impact}
                    </div>
                  </div>
                ) : (
                  <div className="h-8 flex items-center justify-center bg-surface-container-highest/20 rounded-lg text-[8px] font-black text-on-surface-variant/30 uppercase tracking-widest italic">
                    Descansa
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 pt-2">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 py-3 rounded-xl font-bold text-[10px] text-on-surface-variant uppercase tracking-widest"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!isValid}
            className={`
              flex-1 py-3 rounded-xl font-black text-[10px] shadow-lg transition-all active:scale-95 uppercase tracking-widest
              ${isValid ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant/20 grayscale cursor-not-allowed'}
            `}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoscaRoundDialog;
