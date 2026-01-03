
import React, { useState } from 'react';
import { useGame } from '../context/GameStateContext';
import { getGameIcon } from '../utils/gameUtils';
import { Game } from '../types/game';
import AlertDialog from '../components/common/AlertDialog';

const HistoryPage: React.FC = () => {
  const { state, dispatch } = useGame();
  const [deletingGameId, setDeletingGameId] = useState<string | null>(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

  const confirmDelete = () => {
    if (deletingGameId) {
      dispatch({ type: 'DELETE_FINISHED_GAME', payload: { gameId: deletingGameId } });
      setDeletingGameId(null);
    }
  };

  const confirmClearAll = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
    setIsClearingAll(false);
  };

  const getGameResult = (game: Game) => {
    const winner = game.players.find(p => p.id === game.winnerId);
    if (game.type === 'truco') {
      return game.players.map(p => `${p.name.substring(0, 3)}: ${p.score}`).join(' - ');
    }
    if (winner) {
      return `Ganador: ${winner.name} (${winner.score} pts)`;
    }
    return 'Finalizado';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-4 pb-20 bg-background transition-colors duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
          Partidas Guardadas
        </h2>
        {state.finishedGames.length > 0 && (
          <button 
            onClick={() => setIsClearingAll(true)}
            className="text-[10px] font-black text-error hover:bg-error/10 px-3 py-1.5 rounded-full transition-all active:scale-95"
          >
            BORRAR TODO
          </button>
        )}
      </div>

      {state.finishedGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-12 text-center space-y-4">
          <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center text-4xl shadow-inner">
            📂
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-on-surface">Aún no hay historial</h3>
            <p className="text-xs text-on-surface-variant max-w-[200px] leading-relaxed">
              Tus victorias aparecerán aquí automáticamente al finalizar una partida.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {state.finishedGames.map((game) => (
            <div 
              key={game.id}
              className="group flex items-center gap-4 p-4 bg-surface-container-low rounded-[2rem] border border-outline-variant/20 shadow-sm transition-all hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center text-2xl shrink-0 shadow-sm">
                {getGameIcon(game.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 mb-0.5">
                  <h3 className="text-sm font-black capitalize text-on-surface truncate">
                    {game.type}
                  </h3>
                  <span className="text-[9px] font-bold text-on-surface-variant/50 tabular-nums">
                    {formatDate(game.createdAt)}
                  </span>
                </div>
                <p className="text-xs font-bold text-on-surface-variant truncate">
                  {getGameResult(game)}
                </p>
              </div>

              <button 
                onClick={() => setDeletingGameId(game.id)}
                className="p-2.5 text-on-surface-variant/40 hover:text-error hover:bg-error/10 rounded-full transition-all shrink-0 active:scale-90"
                title="Borrar partida"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <AlertDialog 
        isOpen={deletingGameId !== null}
        title="¿Borrar partida?"
        message="Se eliminará permanentemente del historial."
        confirmLabel="Borrar"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setDeletingGameId(null)}
      />

      <AlertDialog 
        isOpen={isClearingAll}
        title="¿Vaciar historial?"
        message="Esta acción no se puede deshacer. Se perderán todos los registros."
        confirmLabel="Vaciar todo"
        isDestructive
        onConfirm={confirmClearAll}
        onCancel={() => setIsClearingAll(false)}
      />
    </div>
  );
};

export default HistoryPage;
