
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameStateContext';
import { GameType, Game } from '../types/game';
import { getGameIcon } from '../utils/gameUtils';
import AlertDialog from '../components/common/AlertDialog';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  const [deletingGameId, setDeletingGameId] = useState<string | null>(null);

  const gameOptions: { type: GameType; label: string; icon: string }[] = [
    { type: 'truco', label: 'Truco', icon: '🎴' },
    { type: 'generala', label: 'Generala', icon: '🎲' },
    { type: 'canasta', label: 'Canasta', icon: '🧺' },
    { type: 'escoba', label: 'Escoba', icon: '🧹' },
    { type: 'mosca', label: 'La Mosca', icon: '🪰' },
  ];

  const activeGamesList = Object.values(state.activeGames) as Game[];

  const handleAction = (type: GameType) => {
    if (type === 'truco') {
      dispatch({ type: 'SET_CURRENT_GAME', payload: null });
      dispatch({ 
        type: 'CREATE_GAME', 
        payload: { type, players: ['Nosotros', 'Ellos'] } 
      });
      setTimeout(() => navigate(`/game/${type}`), 50);
    } else {
      navigate(`/setup/${type}`);
    }
  };

  const handleDeleteActive = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    setDeletingGameId(gameId);
  };

  const confirmDelete = () => {
    if (deletingGameId) {
      dispatch({ type: 'DELETE_GAME', payload: { gameId: deletingGameId } });
      setDeletingGameId(null);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20 px-4 py-4 space-y-6 max-w-md mx-auto w-full bg-background text-on-background transition-colors duration-500">
      {activeGamesList.length > 0 && (
        <section className="space-y-3">
          <header className="px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Continuar Partida</h2>
          </header>
          <div className="grid gap-3">
            {activeGamesList.map((game) => (
              <div 
                key={game.id}
                onClick={() => {
                  dispatch({ type: 'SET_CURRENT_GAME', payload: game.id });
                  navigate(`/game/${game.type}`);
                }}
                className="group relative flex items-start justify-between p-4 bg-surface-container-high rounded-[2rem] border border-outline-variant/30 active:scale-[0.98] transition-all cursor-pointer shadow-sm w-full"
              >
                <div className="flex flex-1 items-start gap-4 overflow-hidden min-w-0 pr-2">
                  <span className="text-2xl shrink-0 mt-0.5">{getGameIcon(game.type)}</span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-black capitalize text-sm leading-tight text-on-surface truncate">{game.type}</h3>
                    {/* Eliminado truncate para permitir salto de línea y evitar scroll horizontal */}
                    <p className="text-[11px] font-bold text-on-surface-variant/70 leading-snug mt-1 break-words">
                      {game.players.map(p => `${p.name} (${p.score})`).join(' · ')}
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => handleDeleteActive(e, game.id)}
                  className="p-2 text-on-surface-variant/20 hover:text-error hover:bg-error/10 rounded-full transition-all shrink-0 active:scale-90 mt-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3 flex-1">
        <header className="px-1">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Nuevo Juego</h2>
        </header>
        <div className="grid grid-cols-2 gap-3">
          {gameOptions.map((opt) => (
            <button
              key={opt.type}
              onClick={() => handleAction(opt.type)}
              className="flex flex-col items-center justify-center p-5 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 hover:bg-surface-container transition-all active:scale-95 shadow-sm text-center gap-3"
            >
              <span className="text-4xl drop-shadow-sm">{opt.icon}</span>
              <span className="font-black text-[10px] text-on-surface tracking-[0.1em] uppercase">{opt.label}</span>
            </button>
          ))}
        </div>
      </section>

      <AlertDialog 
        isOpen={deletingGameId !== null}
        title="¿Descartar?"
        message="Se perderá el progreso de esta partida activa."
        confirmLabel="Descartar"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setDeletingGameId(null)}
      />
    </div>
  );
};

export default MenuPage;
