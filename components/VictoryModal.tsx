
import React from 'react';

interface VictoryModalProps {
  winnerName: string;
  onRestart: () => void;
}

const VictoryModal: React.FC<VictoryModalProps> = ({ winnerName, onRestart }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-in fade-in duration-300 cursor-pointer"
      onClick={onRestart}
    >
      <div 
        className="p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center space-y-6 transform animate-in zoom-in-95 duration-300 bg-surface-container-highest border border-outline-variant/30 text-on-surface cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl">🏆</div>
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            ¡Victoria!
          </h2>
          <p className="mt-2 text-lg text-on-surface-variant">
            <span className="font-bold text-primary">{winnerName}</span> ha ganado la partida.
          </p>
        </div>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 transition-all active:scale-95 bg-primary text-on-primary"
        >
          Nueva Partida
        </button>
      </div>
    </div>
  );
};

export default VictoryModal;
