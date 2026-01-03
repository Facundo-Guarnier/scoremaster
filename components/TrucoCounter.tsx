
import React from 'react';
import MatchGroup from './MatchGroup';

interface TrucoCounterProps {
  name: string;
  score: number;
  onUpdate: (amount: number) => void;
  isWinner: boolean;
}

const TrucoCounter: React.FC<TrucoCounterProps> = ({ name, score, onUpdate, isWinner }) => {
  
  const handleAction = (amount: number) => {
    if ('vibrate' in navigator) navigator.vibrate(25);
    onUpdate(amount);
  };

  const displayName = name.toUpperCase().includes('ELLOS') ? 'ELLOS' : 'NOSOTROS';

  const renderGhostMatches = () => {
    const groups = [];
    for (let i = 0; i < 6; i++) {
      const startRange = i * 5;
      const pointsInThisGroup = Math.min(5, Math.max(0, score - startRange));
      const isBuenasStart = i === 3; 

      if (isBuenasStart) {
        groups.push(
          <div key="divider" className="w-full px-6 flex items-center justify-center shrink-0 h-4 my-1">
            <div className="w-full border-t-2 border-dashed border-outline-variant/30" />
          </div>
        );
      }

      groups.push(
        <div key={i} className="flex justify-center shrink-0">
          <MatchGroup points={pointsInThisGroup} />
        </div>
      );
    }
    return groups;
  };

  return (
    <div className={`flex flex-col h-full w-full relative transition-colors duration-500 ${
      isWinner ? 'bg-primary/5' : 'bg-transparent'
    }`}>
      
      {/* Header: Name & Giant Score */}
      <header className="shrink-0 pt-4 pb-2 text-center flex flex-col items-center justify-center">
        <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-0 ${
          isWinner ? 'text-primary' : 'text-on-surface-variant'
        }`}>
          {displayName}
        </h3>
        
        <div className={`text-[4rem] sm:text-[5rem] leading-[0.9] font-black tabular-nums tracking-tighter transition-all duration-300 ${
          isWinner ? 'text-primary scale-110' : 'text-on-surface'
        }`}>
          {score}
        </div>
      </header>

      {/* Body: Matches - Flex Grow */}
      <div className="flex-1 flex flex-col items-center justify-evenly py-2 overflow-hidden min-h-0 w-full">
        {renderGhostMatches()}
      </div>

      {/* Footer: Control Zone */}
      <footer className="shrink-0 p-4 w-full">
        <div className="flex items-stretch gap-3 h-20 sm:h-24">
          
          {/* Botón Restar (30%) */}
          <button 
            onClick={() => handleAction(-1)}
            disabled={score === 0}
            className="flex-[0.3] rounded-2xl bg-surface-container-high border border-outline-variant/20 text-on-surface-variant flex items-center justify-center font-bold text-3xl active:scale-95 active:bg-surface-container-highest transition-all disabled:opacity-30 disabled:active:scale-100"
            aria-label="Restar punto"
          >
            -
          </button>
          
          {/* Botón Sumar (70%) */}
          <button 
            onClick={() => handleAction(1)}
            disabled={score >= 30}
            className="flex-[0.7] rounded-2xl bg-primary text-on-primary flex items-center justify-center font-black text-4xl shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
            aria-label="Sumar punto"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </footer>
      
      {isWinner && (
        <div className="absolute inset-0 pointer-events-none border-4 border-primary/20 z-0" />
      )}
    </div>
  );
};

export default TrucoCounter;
