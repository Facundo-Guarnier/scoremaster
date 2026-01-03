
export type GameType = 'truco' | 'generala' | 'canasta' | 'escoba' | 'mosca';

export interface Player {
  id: string;
  name: string;
  score: number;
  details?: Record<string, any>; // Para jugadas de Generala, Canasta o estado de La Mosca
}

export interface Game {
  id: string;
  type: GameType;
  players: Player[];
  status: 'playing' | 'finished';
  createdAt: number;
  lastUpdated: number;
  winnerId?: string;
  rounds: any[]; // Historial de manos/rondas
}

export interface GameState {
  activeGames: Record<string, Game>;
  finishedGames: Game[];
  currentGameId: string | null;
}

export type GameAction = 
  | { type: 'CREATE_GAME'; payload: { type: GameType; players: string[] } }
  | { type: 'UPDATE_SCORE'; payload: { gameId: string; playerId: string; amount: number; roundData?: any } }
  | { type: 'ADD_ROUND'; payload: { gameId: string; scores: Record<string, number>; details?: Record<string, any> } }
  | { type: 'REMOVE_ROUND'; payload: { gameId: string; roundIndex: number } }
  | { type: 'FINISH_GAME'; payload: { gameId: string; winnerId: string } }
  | { type: 'DELETE_GAME'; payload: { gameId: string } }
  | { type: 'DELETE_FINISHED_GAME'; payload: { gameId: string } }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'SET_CURRENT_GAME'; payload: string | null }
  | { type: 'LOAD_PERSISTED_STATE'; payload: GameState };
