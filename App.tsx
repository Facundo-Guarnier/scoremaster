
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameStateContext';
import AppLayout from './components/layout/AppLayout';
import MenuPage from './pages/MenuPage';
import GameSetupPage from './pages/GameSetupPage';
import GamePage from './pages/GamePage';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GameProvider>
        <HashRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<MenuPage />} />
              <Route path="/setup/:type" element={<GameSetupPage />} />
              <Route path="/game/:type" element={<GamePage />} />
              <Route path="/history" element={<HistoryPage />} />
              {/* Fallback para rutas no encontradas: redirige al inicio */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </HashRouter>
      </GameProvider>
    </ThemeProvider>
  );
};

export default App;
