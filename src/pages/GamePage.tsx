
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameStateContext';
import ScoreDisplay from '../components/ScoreDisplay';
import TrucoCounter from '../components/TrucoCounter';
import GeneralaCounter from '../components/GeneralaCounter';
import CanastaCounter from '../components/CanastaCounter';
import EscobaCounter from '../components/EscobaCounter';
import MoscaCounter from '../components/MoscaCounter';
import VictoryModal from '../components/VictoryModal';
import { Game } from '../types/game';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { type: urlType } = useParams<{ type: string }>();
  const { state, dispatch } = useGame();
  
  const game = state.currentGameId ? state.activeGames[state.currentGameId] : null;

  useEffect(() => {
    if (!game && urlType) {
      const activeGames = Object.values(state.activeGames) as Game[];
      const found = activeGames.reverse().find(g => g.type === urlType);
      
      if (found) {
        dispatch({ type: 'SET_CURRENT_GAME', payload: found.id });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [game, state.activeGames, urlType, dispatch, navigate]);

  if (!game) return null;

  const handleUpdate = (playerId: string, amount: number) => {
    dispatch({ type: 'UPDATE_SCORE', payload: { gameId: game.id, playerId, amount } });
  };

  const handleGeneralaUpdate = (playerId: string, category: string, score: number) => {
    const player = game.players.find(p => p.id === playerId);
    if (!player) return;

    const currentDetails = player.details || {};
    const updatedDetails = { ...currentDetails, [category]: score };
    const newTotal = Object.values(updatedDetails).reduce((acc: number, val: any) => acc + (val || 0), 0) as number;
    const diff = newTotal - player.score;

    dispatch({
      type: 'UPDATE_SCORE',
      payload: { 
        gameId: game.id, 
        playerId, 
        amount: diff,
        roundData: { playerId, category, score, timestamp: Date.now() }
      }
    });
    player.details = updatedDetails;
  };

  const handleAddRound = (scores: Record<string, number>, details?: Record<string, any>) => {
    dispatch({ type: 'ADD_ROUND', payload: { gameId: game.id, scores, details } as any });
  };

  const handleRemoveRound = (roundIndex: number) => {
    dispatch({ type: 'REMOVE_ROUND', payload: { gameId: game.id, roundIndex } });
  };

  const handleFinish = (winnerId: string) => {
    dispatch({ type: 'FINISH_GAME', payload: { gameId: game.id, winnerId } });
    navigate('/', { replace: true });
  };

  const getWinnerThreshold = () => {
    switch(game.type) {
      case 'truco': return 30;
      case 'canasta': return 5000;
      case 'mosca': return 0; // Se gana llegando a 0
      default: return 30;
    }
  };

  // Lógica de ganador inversa para La Mosca
  const winner = game.type === 'mosca' 
    ? game.players.find(p => p.score === 0)
    : game.players.find(p => p.score >= getWinnerThreshold());

  const renderBoard = () => {
    switch (game.type) {
      case 'truco':
        return (
          <div className="flex h-full w-full divide-x-2 divide-outline-variant/10 overflow-hidden bg-background">
            {game.players.map(player => (
              <TrucoCounter
                key={player.id}
                name={player.name}
                score={player.score}
                onUpdate={(amt) => handleUpdate(player.id, amt)}
                isWinner={player.score >= 30}
              />
            ))}
          </div>
        );
      case 'generala':
        return (
          <div className="h-full overflow-y-auto pb-4 px-2 pt-2">
            <GeneralaCounter players={game.players} onUpdateScore={handleGeneralaUpdate} />
          </div>
        );
      case 'canasta':
        return (
          <div className="h-full overflow-y-auto pb-4 px-2 pt-2">
            <CanastaCounter
              players={game.players}
              rounds={game.rounds}
              onAddRound={handleAddRound}
              onRemoveRound={handleRemoveRound}
            />
          </div>
        );
      case 'escoba':
        return (
          <div className="h-full overflow-y-auto pb-4 px-2 pt-2">
            <EscobaCounter
              players={game.players}
              rounds={game.rounds}
              onAddRound={handleAddRound}
              onRemoveRound={handleRemoveRound}
              onUpdateManual={handleUpdate}
            />
          </div>
        );
      case 'mosca':
        return (
          <div className="h-full overflow-y-auto pb-4 px-2 pt-2">
            <MoscaCounter
              players={game.players}
              rounds={game.rounds}
              onAddRound={handleAddRound}
              onRemoveRound={handleRemoveRound}
            />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto pb-4 px-2 pt-2">
            {game.players.map(player => (
              <ScoreDisplay
                key={player.id}
                name={player.name}
                score={player.score}
                onAdd={() => handleUpdate(player.id, 1)}
                onSub={() => handleUpdate(player.id, -1)}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex-1 h-full w-full overflow-hidden flex flex-col">
      <div className="flex-1 w-full md:max-w-4xl md:mx-auto h-full">
        {renderBoard()}
      </div>
      
      {winner && (
        <VictoryModal 
          winnerName={winner.name} 
          onRestart={() => handleFinish(winner.id)} 
        />
      )}
    </div>
  );
};

export default GamePage;
