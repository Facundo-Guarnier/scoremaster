
import React, { useState } from 'react';
import { Player } from '../types/game';
import MoscaRoundDialog from './MoscaRoundDialog';

interface MoscaCounterProps {
  players: Player[];
  rounds: any[];
  onAddRound: (scores: Record<string, number>, details: Record<string, any>) => void;
  onRemoveRound: (index: number) => void;
}

const MoscaCounter: React.FC<MoscaCounterProps> = ({ players, rounds, onAddRound, onRemoveRound }) => {
  const [showDialog, setShowDialog] = useState(false);
  
  // Grilla de tarjetas principales: 3 columnas si hay más de 3 jugadores
  const mainGridCols = players.length > 3 ? 'grid-cols-3' : 'grid-cols-2';
  
  // Grilla del historial: 3 columnas para 5-6 jugadores, 2 para el resto
  const historyGridCols = players.length > 4 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className="space-y-3 h-full flex flex-col p-2 bg-background">
      {/* Grid de Jugadores Optimizado */}
      <div className={`grid ${mainGridCols} gap-2 shrink-0`}>
        {players.map((player) => {
          const isWinner = player.score === 0;
          const passed = player.details?.passedLastRound;

          return (
            <div 
              key={player.id} 
              className={`relative flex flex-col p-3 rounded-xl border transition-all duration-300 items-center justify-center overflow-hidden min-h-[90px] ${
                isWinner 
                ? 'bg-primary border-primary shadow-lg z-10' 
                : 'bg-surface border-outline-variant/30 shadow-sm'
              }`}
            >
              {passed && !isWinner && (
                <div className="absolute top-1 right-1 flex items-center gap-1 bg-error/15 px-1.5 py-0.5 rounded-md border border-error/20 z-20">
                  <span className="text-[7px] font-black text-error uppercase tracking-tighter">Pasó</span>
                  <div className="w-1 h-1 rounded-full bg-error animate-pulse" />
                </div>
              )}

              <div className="w-full pr-1 px-1 text-center">
                <span className={`text-[9px] font-black uppercase tracking-widest block truncate ${
                  isWinner ? 'text-on-primary/70' : 'text-primary'
                }`}>
                  {player.name}
                </span>
              </div>

              <div className={`text-3xl sm:text-4xl font-black tabular-nums leading-none tracking-tighter my-1 ${
                isWinner ? 'text-on-primary' : 'text-on-surface'
              }`}>
                {player.score}
              </div>

              {isWinner && (
                <div className="text-[7px] font-black uppercase bg-on-primary text-primary px-2 py-0.5 rounded-lg shadow-sm">
                  Ganador
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Historial Optimizado para 6 Jugadores */}
      <section className="bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden shadow-inner flex flex-col flex-1 min-h-0 mb-20">
        <header className="px-4 py-2 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high shrink-0">
          <h3 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Historial</h3>
          <span className="text-[9px] font-bold text-outline">
            {rounds.length} {rounds.length === 1 ? 'ronda' : 'rondas'}
          </span>
        </header>

        <div className="overflow-y-auto flex-1 p-1 space-y-1 scrollbar-hide">
          {rounds.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 italic text-xs space-y-2">
              <span className="text-3xl">🪰</span>
              <span className="font-black uppercase tracking-widest">Sin rondas</span>
            </div>
          ) : (
            [...rounds].reverse().map((round, idx) => {
              const originalIndex = rounds.length - 1 - idx;
              return (
                <div key={originalIndex} className="p-2 rounded-lg bg-surface border border-outline-variant/10 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-[8px] font-black bg-surface-container-highest w-5 h-5 flex items-center justify-center rounded-full text-on-surface-variant shrink-0 tabular-nums">
                      {originalIndex + 1}
                    </span>
                    
                    {/* Grilla de puntajes pura, sin etiquetas de texto para ganar espacio */}
                    <div className={`flex-1 grid ${historyGridCols} gap-x-1 gap-y-1 items-center justify-center text-center`}>
                      {players.map(p => {
                        const scoreImpact = round.scores?.[p.id] || 0;
                        const pPassed = round.details?.[p.id]?.passed;
                        
                        return (
                          <div key={p.id} className="flex justify-center items-center min-w-0">
                            <span className={`text-sm font-bold tabular-nums ${
                              pPassed 
                              ? 'text-outline-variant/40 italic text-xs' 
                              : scoreImpact > 0 
                                ? 'text-error' 
                                : scoreImpact < 0 
                                  ? 'text-primary' 
                                  : 'text-on-surface'
                            }`}>
                              {pPassed ? '—' : (scoreImpact > 0 ? `+${scoreImpact}` : scoreImpact)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Botón Flotante sincronizado con La Canasta */}
      <div className="fixed bottom-[68px] left-4 right-4 z-40">
        <button
          onClick={() => setShowDialog(true)}
          className="w-full bg-primary text-on-primary h-14 rounded-2xl font-black text-base shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span className="uppercase tracking-widest">Anotar Ronda</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {showDialog && (
        <MoscaRoundDialog
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

export default MoscaCounter;
