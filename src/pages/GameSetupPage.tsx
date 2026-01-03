
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameStateContext';
import { GameType } from '../types/game';
import { getGameIcon } from '../utils/gameUtils';

const GameSetupPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { dispatch } = useGame();
  
  const isCanasta = type === 'canasta';
  const [selectedCount, setSelectedCount] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);

  const getPlayerOptions = () => {
    if (isCanasta) return [2, 3, 4];
    if (type === 'truco') return [2, 4]; 
    return [2, 3, 4, 5, 6];
  };

  useEffect(() => {
    let actualInputsNeeded = selectedCount;
    if (isCanasta && selectedCount === 4) {
      actualInputsNeeded = 2;
    }
    setPlayerNames(prev => {
      const newNames = [...prev];
      if (actualInputsNeeded > prev.length) {
        for (let i = prev.length; i < actualInputsNeeded; i++) {
          newNames.push('');
        }
      } else {
        newNames.length = actualInputsNeeded;
      }
      return newNames;
    });
  }, [selectedCount, isCanasta]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const processedNames = playerNames.map((name, i) => {
      if (name.trim()) return name;
      if (isCanasta && selectedCount === 4) return i === 0 ? 'Nosotros' : 'Ellos';
      return `Jugador ${i + 1}`;
    });

    dispatch({ type: 'SET_CURRENT_GAME', payload: null });
    dispatch({ 
      type: 'CREATE_GAME', 
      payload: { type: type as GameType, players: processedNames } 
    });
    setTimeout(() => navigate(`/game/${type}`, { replace: true }), 50);
  };

  const getInputLabel = (index: number) => {
    if (isCanasta && selectedCount === 4) return `Equipo ${index + 1}`;
    return `Jugador ${index + 1}`;
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-4 animate-in slide-in-from-right-4 duration-300 bg-background text-on-background">
      <div className="flex-1 space-y-5">
        <div className="text-center space-y-1">
          <span className="text-4xl">{getGameIcon(type || '')}</span>
          <h2 className="text-xl font-black capitalize text-on-surface">
            Configurar
          </h2>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Jugadores
          </label>
          <div className="flex bg-surface-container-high rounded-xl p-1 border border-outline-variant/30">
            {getPlayerOptions().map(num => (
              <button
                key={num}
                onClick={() => setSelectedCount(num)}
                className={`flex-1 py-1.5 rounded-lg font-black text-sm transition-all ${
                  selectedCount === num 
                  ? 'bg-surface text-on-surface shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-variant/30'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          {isCanasta && selectedCount === 4 && (
            <p className="text-[10px] text-center text-on-surface-variant font-medium">
              Modo Parejas (2 Equipos)
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Nombres
          </label>
          <div className="space-y-2">
            {playerNames.map((name, idx) => (
              <div key={idx} className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full bg-surface-container rounded-xl py-2 px-3 text-sm font-bold text-on-surface outline-none border-2 border-transparent focus:border-primary transition-all placeholder:text-on-surface-variant/30 shadow-sm"
                  placeholder={getInputLabel(idx)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-on-surface-variant pointer-events-none">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleStartGame}
          className="w-full bg-primary text-on-primary py-3 rounded-xl font-black text-base shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Jugar</span>
        </button>
      </div>
    </div>
  );
};

export default GameSetupPage;
