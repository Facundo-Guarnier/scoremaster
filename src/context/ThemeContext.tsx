
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, generateM3Theme, applyThemeToDocument } from '../services/themeUtils';

interface ThemeContextType {
  seedColor: string;
  setSeedColor: (color: string) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'scoremaster_theme_config_v1';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Cargar estado inicial desde localStorage
  const [seedColor, setSeedColor] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return JSON.parse(saved).seedColor || '#3b82f6';
    return '#3b82f6';
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return JSON.parse(saved).mode || 'light';
    return 'light';
  });

  const isDark = mode === 'dark' || mode === 'oled';

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const isOled = mode === 'oled';
    
    // Generar la paleta
    const colors = generateM3Theme(seedColor, isDark, isOled);
    
    // Aplicar al DOM
    applyThemeToDocument(colors);
    
    // Sincronizar clase darkMode de Tailwind
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Guardar en localStorage
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ seedColor, mode }));
  }, [seedColor, mode, isDark]);

  return (
    <ThemeContext.Provider value={{ seedColor, setSeedColor, mode, setMode, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
