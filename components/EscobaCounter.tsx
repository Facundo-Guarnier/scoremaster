
import React, { useState } from 'react';
import { Player } from '../types/game';
import EscobaRoundDialog from './EscobaRoundDialog';

interface EscobaCounterProps {
  players: Player[];
  rounds: any[];
  onAddRound: (scores: Record<string, number>, details: Record<string, any>) => void;
  onRemoveRound: (index: number) => void;
  onUpdateManual: (playerId: string, amount: number) => void;
}

const EscobaCounter: React.FC<EscobaCounterProps> = ({ players, rounds, onAddRound, onRemoveRound }) => {
  const [showDialog, setShowDialog] = useState(false);

  const renderRoundSummary = (round: any) => {
    return players.map(p => {
      const d = round.details?.[p.id];
      if (!d) return null;
      const parts = [];
      if (d.escobas > 0) parts.push(`${d.escobas} E.`);
      if (d.sieteOro) parts.push('7O');
      if (d.setenta) parts.push('Set.');
      if (d.cartas) parts.push('Car.');
      if (d.oros) parts.push('Oro');
      
      return (
        <div key={p.id} className="text-[9px] font-medium text-on-surface-variant leading-tight flex items-center gap-1">
          <span className="text-primary font-bold uppercase opacity-70">{p.name.slice(0,3)}:</span>
          <span className="truncate">{parts.join(' ') || '-'}</span>
        </div>
      );
    });
  };

  return (
    <div className="space-y-3 h-full flex flex-col p-1">
      <div className="grid grid-cols-2 gap-2 shrink-0">
        {players.map((player) => (
          <div 
            key={player.id} 
            className="bg-surface-container-low rounded-xl border border-outline-variant p-3 flex flex-col items-center shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/10" />
            <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-1 opacity-80">
              {player.name}
            </span>
            <div className="text-4xl font-black text-on-surface tabular-nums leading-none">
              {player.score}
            </div>
          </div>
        ))}
      </div>

      <section className="bg-surface-container-high rounded-xl border border-outline-variant overflow-hidden shadow-inner flex flex-col flex-1 min-h-0 mb-20">
        <header className="px-3 py-2 bg-surface-container-highest/50 border-b border-outline-variant/30 flex justify-between items-center shrink-0">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface">Historial</h3>
          <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-lg text-[9px] font-black">
            {rounds.length}
          </span>
        </header>

        <div className="overflow-y-auto flex-1 p-1 scrollbar-hide">
          {rounds.length === 0 ? (
            <div className="h-full flex items-center justify-center opacity-30 text-xs italic">
              <p>Sin manos registradas</p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/10">
              {[...rounds].reverse().map((round, idx) => {
                const originalIndex = rounds.length - 1 - idx;
                return (
                  <div key={originalIndex} className="p-2 flex items-start justify-between">
                    <div className="flex items-start gap-2 w-full">
                      <div className="w-5 h-5 rounded-full bg-surface-variant/40 flex items-center justify-center text-[9px] font-black text-on-surface-variant shrink-0 mt-0.5">
                        {originalIndex + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex gap-4 mb-1">
                          {players.map(p => (
                            <span key={p.id} className="text-sm font-black text-on-surface tabular-nums">
                              {round.scores?.[p.id] ?? 0}
                            </span>
                          ))}
                        </div>
                        <div className="space-y-0.5 opacity-80">
                          {renderRoundSummary(round)}
                        </div>
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
          <span>Nueva Ronda</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {showDialog && (
        <EscobaRoundDialog
          players={players}
          onAdd={(scores, details) => {
            onAddRound(scores, details);
            setShowDialog(false);
          }}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
};

export default EscobaCounter;
