
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { GameState, GameAction, Game, Player, GameType } from '../types/game';
import { generateUUID } from '../utils/gameUtils';

const STORAGE_KEY = 'scoremaster_pro_state_v2';

const initialState: GameState = {
  activeGames: {},
  finishedGames: [],
  currentGameId: null
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'CREATE_GAME':
      const newId = generateUUID();
      const initialScore = action.payload.type === 'mosca' ? 15 : 0;
      const newGame: Game = {
        id: newId,
        type: action.payload.type,
        status: 'playing',
        createdAt: Date.now(),
        lastUpdated: Date.now(),
        rounds: [],
        players: action.payload.players.map((name, i) => ({
          id: `p-${i}`,
          name,
          score: initialScore,
          details: action.payload.type === 'mosca' ? { passedLastRound: false } : {}
        }))
      };
      return {
        ...state,
        activeGames: { ...state.activeGames, [newId]: newGame },
        currentGameId: newId
      };

    case 'UPDATE_SCORE':
      const gameUpdate = state.activeGames[action.payload.gameId];
      if (!gameUpdate) return state;

      const updatedPlayers = gameUpdate.players.map(p => 
        p.id === action.payload.playerId 
          ? { ...p, score: Math.max(0, p.score + action.payload.amount) }
          : p
      );

      return {
        ...state,
        activeGames: {
          ...state.activeGames,
          [action.payload.gameId]: {
            ...gameUpdate,
            players: updatedPlayers,
            lastUpdated: Date.now(),
            rounds: action.payload.roundData 
              ? [...gameUpdate.rounds, action.payload.roundData] 
              : gameUpdate.rounds
          }
        }
      };

    case 'ADD_ROUND':
      const gameAdd = state.activeGames[action.payload.gameId];
      if (!gameAdd) return state;

      const playersWithNewScores = gameAdd.players.map(p => {
        let newScore = p.score + (action.payload.scores[p.id] || 0);
        // En La Mosca el puntaje no puede ser negativo, pero si llega a 0 gana
        newScore = Math.max(0, newScore);
        
        // Actualizar detalles si es Mosca (pasó ronda)
        const newDetails = { ...p.details };
        if (gameAdd.type === 'mosca') {
          newDetails.passedLastRound = action.payload.details?.[p.id]?.passed;
        }

        return {
          ...p,
          score: newScore,
          details: newDetails
        };
      });

      return {
        ...state,
        activeGames: {
          ...state.activeGames,
          [action.payload.gameId]: {
            ...gameAdd,
            players: playersWithNewScores,
            rounds: [...gameAdd.rounds, { 
              scores: action.payload.scores, 
              details: action.payload.details,
              timestamp: Date.now() 
            }],
            lastUpdated: Date.now()
          }
        }
      };

    case 'REMOVE_ROUND':
      const gameRem = state.activeGames[action.payload.gameId];
      if (!gameRem) return state;

      const roundToRemove = gameRem.rounds[action.payload.roundIndex];
      if (!roundToRemove) return state;

      const playersReverted = gameRem.players.map(p => {
        const revertedScore = Math.max(0, p.score - (roundToRemove.scores?.[p.id] || 0));
        
        // Restaurar estado de "pasó ronda" anterior si es posible
        // Como no guardamos el historial completo de detalles en cada jugador, 
        // miramos la ronda anterior en la lista de rondas si existe
        const prevRound = gameRem.rounds[action.payload.roundIndex - 1];
        const prevPassed = prevRound ? prevRound.details?.[p.id]?.passed : false;

        return {
          ...p,
          score: revertedScore,
          details: { ...p.details, passedLastRound: prevPassed }
        };
      });

      const newRounds = [...gameRem.rounds];
      newRounds.splice(action.payload.roundIndex, 1);

      return {
        ...state,
        activeGames: {
          ...state.activeGames,
          [action.payload.gameId]: {
            ...gameRem,
            players: playersReverted,
            rounds: newRounds,
            lastUpdated: Date.now()
          }
        }
      };

    case 'FINISH_GAME':
      const gameToFinish = state.activeGames[action.payload.gameId];
      if (!gameToFinish) return state;

      const finishedGame: Game = {
        ...gameToFinish,
        status: 'finished',
        winnerId: action.payload.winnerId,
        lastUpdated: Date.now()
      };

      const newActiveGames = { ...state.activeGames };
      delete newActiveGames[action.payload.gameId];

      return {
        ...state,
        activeGames: newActiveGames,
        finishedGames: [finishedGame, ...state.finishedGames].slice(0, 50),
        currentGameId: null
      };

    case 'DELETE_GAME':
      const filteredActive = { ...state.activeGames };
      delete filteredActive[action.payload.gameId];
      return { 
        ...state, 
        activeGames: filteredActive,
        currentGameId: state.currentGameId === action.payload.gameId ? null : state.currentGameId
      };

    case 'DELETE_FINISHED_GAME':
      return {
        ...state,
        finishedGames: state.finishedGames.filter(g => g.id !== action.payload.gameId)
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        finishedGames: []
      };

    case 'SET_CURRENT_GAME':
      return { ...state, currentGameId: action.payload };

    case 'LOAD_PERSISTED_STATE':
      return action.payload;

    default:
      return state;
  }
};

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        dispatch({ type: 'LOAD_PERSISTED_STATE', payload: JSON.parse(saved) });
      } catch (e) {
        console.error("Error al cargar estado persistido", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
