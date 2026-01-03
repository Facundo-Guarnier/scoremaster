
import React, { useState } from 'react';
import { Player } from '../types/game';
import GeneralaScoreDialog, { GeneralaCategory } from './GeneralaScoreDialog';

interface GeneralaCounterProps {
  players: Player[];
  onUpdateScore: (playerId: string, category: GeneralaCategory, score: number) => void;
}

const CATEGORIES: { key: GeneralaCategory; label: string }[] = [
  { key: '1', label: '1' }, { key: '2', label: '2' }, { key: '3', label: '3' },
  { key: '4', label: '4' }, { key: '5', label: '5' }, { key: '6', label: '6' },
  { key: 'E', label: 'Esc.' }, { key: 'F', label: 'Full' },
  { key: 'P', label: 'Póker' }, { key: 'G', label: 'Gral.' },
  { key: 'DG', label: 'D.Gral' }
];

const GeneralaCounter: React.FC<GeneralaCounterProps> = ({ players, onUpdateScore }) => {
  const [activeCell, setActiveCell] = useState<{ playerId: string; category: GeneralaCategory } | null>(null);

  const getPlayerScoreForCategory = (player: Player, cat: GeneralaCategory) => {
    return player.details?.[cat];
  };

  const calculateTotal = (player: Player) => {
    if (!player.details) return 0;
    return Object.values(player.details).reduce((acc: number, val: any) => acc + (val || 0), 0);
  };

  const leaderId = [...players].sort((a, b) => calculateTotal(b) - calculateTotal(a))[0]?.id;

  return (
    <div className="w-full relative bg-surface rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col h-full">
      {/* Contenedor con scroll vertical y horizontal para que el sticky funcione internamente */}
      <div className="overflow-auto relative flex-1 scrollbar-hide">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              {/* ESQUINA SUPERIOR IZQUIERDA: Sticky en ambos ejes */}
              <th className="sticky left-0 top-0 z-50 p-2 min-w-[70px] bg-surface border-r border-b border-outline-variant/30 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Item</span>
              </th>
              {players.map((p) => (
                <th 
                  key={p.id} 
                  className="sticky top-0 z-40 p-2 text-center min-w-[90px] bg-surface border-b border-outline-variant/30"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-on-surface truncate max-w-[80px] leading-tight">
                      {p.name}
                    </span>
                    {leaderId === p.id && calculateTotal(p) > 0 && (
                      <span className="text-[8px] text-primary font-bold uppercase mt-0.5">Líder</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-surface">
            {CATEGORIES.map((cat) => (
              <tr key={cat.key} className="group hover:bg-surface-container-low transition-colors">
                {/* COLUMNA DE CATEGORÍAS: Sticky horizontal */}
                <td className="sticky left-0 z-30 px-2 py-2.5 bg-surface border-r border-outline-variant/10 font-bold text-[10px] text-on-surface-variant uppercase shadow-[2px_0_5px_rgba(0,0,0,0.05)] group-hover:bg-surface-container-low transition-colors">
                  {cat.label}
                </td>
                
                {players.map((p) => {
                  const score = getPlayerScoreForCategory(p, cat.key);
                  const isFilled = score !== undefined && score !== null;
                  
                  return (
                    <td 
                      key={p.id} 
                      onClick={() => !isFilled && setActiveCell({ playerId: p.id, category: cat.key })}
                      className={`px-2 py-2.5 text-center cursor-pointer transition-all border-b border-outline-variant/5 ${
                        isFilled ? 'bg-primary/5' : 'hover:bg-surface-container-highest/20'
                      }`}
                    >
                      {isFilled ? (
                        <span className={`text-base font-black tabular-nums ${score === 0 ? 'text-error/50 line-through decoration-2' : 'text-primary'}`}>
                          {score}
                        </span>
                      ) : (
                        <span className="text-outline-variant/30 font-bold text-lg select-none">·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          
          <tfoot>
            <tr>
              {/* ESQUINA INFERIOR IZQUIERDA: Sticky en ambos ejes */}
              <td className="sticky left-0 bottom-0 z-50 p-3 bg-surface border-r border-t border-outline-variant/30 font-black text-[10px] text-primary uppercase shadow-[2px_-2px_5px_rgba(0,0,0,0.05)]">
                Total
              </td>
              {players.map((p) => (
                <td 
                  key={p.id} 
                  className="sticky bottom-0 z-40 p-3 text-center bg-surface border-t border-outline-variant/30 shadow-[0_-2px_5px_rgba(0,0,0,0.05)]"
                >
                  <span className="text-lg font-black text-on-surface tabular-nums">
                    {calculateTotal(p)}
                  </span>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {activeCell && (
        <GeneralaScoreDialog
          category={activeCell.category}
          playerName={players.find(p => p.id === activeCell.playerId)?.name || ''}
          onSelect={(score) => {
            onUpdateScore(activeCell.playerId, activeCell.category, score);
            setActiveCell(null);
          }}
          onClose={() => setActiveCell(null)}
        />
      )}
    </div>
  );
};

export default GeneralaCounter;
