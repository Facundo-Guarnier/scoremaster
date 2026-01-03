
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../../context/GameStateContext';
import FloatingThemeToggle from '../common/FloatingThemeToggle';
import AlertDialog from '../common/AlertDialog';
import BrandFooter from '../common/BrandFooter';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  const isHome = location.pathname === '/';
  const isGame = location.pathname.startsWith('/game/');
  const isSetup = location.pathname.startsWith('/setup/');
  
  const currentGame = state.currentGameId ? state.activeGames[state.currentGameId] : null;

  const getTitle = () => {
    if (isHome) return 'ScoreMaster';
    if (location.pathname === '/history') return 'Historial';
    if (isSetup) return 'Configurar';
    if (isGame && currentGame) return currentGame.type.charAt(0).toUpperCase() + currentGame.type.slice(1);
    return '';
  };

  const handleBackNavigation = () => {
    if (isSetup) {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
  };

  const handleDeleteGame = () => {
    if (currentGame) {
      dispatch({ type: 'DELETE_GAME', payload: { gameId: currentGame.id } });
      navigate('/', { replace: true });
      setShowDeleteConfirm(false);
    }
  };

  const handleFinishGame = () => {
    if (currentGame) {
      const winner = [...currentGame.players].sort((a, b) => b.score - a.score)[0];
      dispatch({ type: 'FINISH_GAME', payload: { gameId: currentGame.id, winnerId: winner.id } });
      navigate('/', { replace: true });
      setShowFinishConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background transition-colors duration-500 flex flex-col overflow-hidden">
      {/* Header sincronizado con tokens de superficie */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/10 h-14 flex items-center px-3 justify-between shrink-0 transition-colors duration-500">
        <div className="flex items-center gap-2">
          {!isHome && (
            <button 
              onClick={handleBackNavigation}
              className="p-1.5 -ml-1.5 hover:bg-surface-variant/50 rounded-lg transition-colors active:scale-90"
            >
              <svg className="w-5 h-5 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-base font-black tracking-tight truncate max-w-[150px] sm:max-w-none">
            {getTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-1">
          {isHome && (
            <Link to="/history" className="p-2 hover:bg-surface-variant/50 rounded-lg transition-colors active:scale-90 text-on-surface-variant">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          )}

          {isGame && currentGame && (
            <>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 hover:bg-error/10 text-on-surface-variant hover:text-error rounded-lg transition-colors active:scale-90"
                title="Cancelar Partida"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button 
                onClick={() => setShowFinishConfirm(true)}
                className="p-2 bg-primary text-on-primary rounded-lg shadow-sm shadow-primary/20 active:scale-90 ml-1"
                title="Finalizar Partida"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative flex flex-col">
        {children}
      </main>

      {isHome && <FloatingThemeToggle />}
      
      <BrandFooter compact className="shrink-0" />

      <AlertDialog
        isOpen={showDeleteConfirm}
        title="¿Descartar partida?"
        message="Se perderá el progreso actual."
        confirmLabel="Descartar"
        isDestructive
        onConfirm={handleDeleteGame}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <AlertDialog
        isOpen={showFinishConfirm}
        title="¿Finalizar partida?"
        message="Se guardará en el historial."
        confirmLabel="Finalizar"
        onConfirm={handleFinishGame}
        onCancel={() => setShowFinishConfirm(false)}
      />
    </div>
  );
};

export default AppLayout;
