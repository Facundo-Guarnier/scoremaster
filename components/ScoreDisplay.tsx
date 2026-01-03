
import React from 'react';

interface ScoreDisplayProps {
  name: string;
  score: number;
  onAdd: () => void;
  onSub: () => void;
  isWinner?: boolean;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ name, score, onAdd, onSub, isWinner }) => {
  return (
    <div className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
      isWinner 
      ? 'bg-primary text-on-primary scale-105 shadow-xl ring-2 ring-primary-container' 
      : 'bg-primary-container text-on-primary-container shadow-md'
    }`}>
      <span className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">{name}</span>
      
      <div className="text-5xl font-black my-2 tabular-nums">
        {score}
      </div>

      <div className="flex gap-3 mt-2">
        <button 
          onClick={onSub}
          className="w-10 h-10 rounded-full bg-surface/30 flex items-center justify-center text-xl font-bold hover:bg-surface/50 transition-colors"
        >
          -
        </button>
        <button 
          onClick={onAdd}
          className="w-10 h-10 rounded-full bg-on-primary-container text-primary-container flex items-center justify-center text-xl font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay;
