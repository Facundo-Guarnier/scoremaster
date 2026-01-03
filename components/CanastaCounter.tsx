
import React, { useState } from 'react';
import { Player } from '../types/game';
import { getCanastaMinimumPoints } from '../utils/gameUtils';
import CanastaRoundDialog from './CanastaRoundDialog';

interface CanastaCounterProps {
  players: Player[];
  rounds: any[];
  onAddRound: (scores: Record<string, number>) => void;
  onRemoveRound: (index: number) => void;
}

const CanastaCounter: React.FC<CanastaCounterProps> = ({ players, rounds, onAddRound, onRemoveRound }) => {
  const [showDialog, setShowDialog] = useState(false);
  const gridColsClass = players.length === 3 ? 'grid-cols-3' : 'grid-cols-2';
  const scoreSizeClass = players.length === 3 ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl';

  return (
    <div className="space-y-3 relative h-full flex flex-col bg-background p-2">
      <div className={`grid ${gridColsClass} gap-2 shrink-0`}>
        {players.map((player) => {
          const bajada = getCanastaMinimumPoints(player.score);
          const isWinner = player.score >= 5000;

          return (
            <div 
              key={player.id}
              className={`relative flex flex-col p-3 rounded-xl border transition-all duration-300 ${
                isWinner 
                ? 'bg-primary border-primary shadow-xl z-10' 
                : 'bg-surface border-outline-variant/30 shadow-sm'
              }`}
            >
              <div className={`text-[9px] font-black uppercase tracking-widest text-center truncate ${
                isWinner ? 'text-on-primary/80' : 'text-primary'
              }`}>
                {player.name}
              </div>
              
              <div className={`${scoreSizeClass} font-black text-center tabular-nums my-1 ${
                isWinner ? 'text-on-primary' : 'text-on-surface'
              }`}>
                {player.score}
              </div>

              <div className="flex justify-center">
                <div className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm whitespace-nowrap ${
                  isWinner 
                  ? 'bg-on-primary text-primary' 
                  : 'bg-secondary-container text-on-secondary-container'
                }`}>
                  Min: {bajada}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-hidden flex flex-col flex-1 min-h-0 mb-20 shadow-inner">
        <div className="px-3 py-2 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-high shrink-0">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Historial</h3>
          <span className="text-[9px] font-bold text-outline">{rounds.length} rondas</span>
        </div>
        
        <div className="overflow-y-auto flex-1 p-1 scrollbar-hide">
          {rounds.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30 italic text-xs text-on-surface-variant">
              <span>Sin rondas</span>
            </div>
          ) : (
            <div className="space-y-1">
              {[...rounds].reverse().map((round, idx) => {
                const originalIndex = rounds.length - 1 - idx;
                return (
                  <div key={originalIndex} className="p-2 rounded-lg bg-surface border border-outline-variant/10 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                      <span className="text-[9px] font-black bg-surface-container-highest w-5 h-5 flex items-center justify-center rounded-full text-on-surface-variant shrink-0">
                        {originalIndex + 1}
                      </span>
                      <div className={`grid ${gridColsClass} gap-1 w-full pr-2`}>
                        {players.map(p => (
                          <div key={p.id} className="flex flex-col items-center sm:items-start min-w-0">
                            <span className="text-sm font-black tabular-nums text-on-surface leading-none text-center sm:text-left">
                              {round.scores?.[p.id] || 0}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Botón Normalizado y bajado */}
      <div className="fixed bottom-[68px] left-4 right-4 z-40">
        <button
          onClick={() => setShowDialog(true)}
          className="w-full bg-primary text-on-primary h-14 rounded-2xl font-black text-base shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span>Nueva Mano</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {showDialog && (
        <CanastaRoundDialog
          players={players}
          onAdd={(scores) => {
            onAddRound(scores);
            setShowDialog(false);
          }}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

export default CanastaCounter;
