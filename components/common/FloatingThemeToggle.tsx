
import React, { useState, useRef, useEffect } from "react";
import { Palette, Sun, Moon, MoonStar, X, RotateCcw } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const PRESET_COLORS = [
  { id: "blue", hex: "#3b82f6", name: "Blue" },
  { id: "red", hex: "#ef4444", name: "Red" },
  { id: "emerald", hex: "#10b981", name: "Emerald" },
  { id: "violet", hex: "#8b5cf6", name: "Violet" },
  { id: "amber", hex: "#f59e0b", name: "Amber" },
  { id: "pink", hex: "#ec4899", name: "Pink" },
];

const DEFAULT_SEED = "#3b82f6";

const FloatingThemeToggle: React.FC = () => {
  const { seedColor, setSeedColor, mode, setMode, isDark } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetTheme = () => {
    setSeedColor(DEFAULT_SEED);
    setMode('light');
    setShowMenu(false);
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-4 print:hidden"
    >
      {showMenu && (
        <div
          className={`
          p-4 rounded-[2.5rem] shadow-2xl border animate-in slide-in-from-bottom-4 fade-in duration-200 mb-2
          ${
            isDark
              ? "bg-surface-container-highest border-outline-variant/30"
              : "bg-surface border-outline-variant/20"
          }
        `}
        >
          <div className="flex items-center justify-between mb-4 gap-8 px-1">
            <span
              className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary`}
            >
              Apariencia
            </span>
            <button
              onClick={() => setShowMenu(false)}
              className="p-1.5 rounded-full hover:bg-surface-variant/50 transition-colors text-on-surface-variant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Mode Selector */}
            <div className="space-y-2">
              <span className="text-xs font-black text-on-surface-variant ml-1 uppercase tracking-tighter">Brillo</span>
              <div className="flex p-1 rounded-2xl gap-1 bg-surface-container-low border border-outline-variant/10">
                <button
                  onClick={() => setMode('light')}
                  className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                    mode === 'light'
                      ? "bg-surface shadow-sm text-primary"
                      : "text-on-surface-variant/40 hover:text-on-surface-variant"
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-[8px] font-black uppercase">Claro</span>
                </button>
                <button
                  onClick={() => setMode('dark')}
                  className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                    mode === 'dark'
                      ? "bg-surface shadow-sm text-primary"
                      : "text-on-surface-variant/40 hover:text-on-surface-variant"
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-[8px] font-black uppercase">Oscuro</span>
                </button>
                <button
                  onClick={() => setMode('oled')}
                  className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                    mode === 'oled'
                      ? "bg-black shadow-sm text-primary ring-1 ring-primary/20"
                      : "text-on-surface-variant/40 hover:text-on-surface-variant"
                  }`}
                >
                  <MoonStar className="w-4 h-4" />
                  <span className="text-[8px] font-black uppercase">OLED</span>
                </button>
              </div>
            </div>

            {/* Color Picker */}
            <div className="space-y-2">
              <span className="text-xs font-black text-on-surface-variant ml-1 uppercase tracking-tighter">Color</span>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSeedColor(color.hex)}
                    className={`w-7 h-7 rounded-full transition-all hover:scale-110 active:scale-90 flex items-center justify-center ${
                      seedColor === color.hex
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-surface"
                        : "border border-outline-variant/20"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {seedColor === color.hex && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={resetTheme}
              className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all text-on-surface-variant hover:bg-surface-variant/30 active:scale-95"
            >
              <RotateCcw className="w-3 h-3" />
              Resetear
            </button>
          </div>
        </div>
      )}

      {/* FAB Estándar Circular */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 shadow-lg hover:shadow-xl z-50 ${
          showMenu
            ? "bg-primary text-on-primary scale-110"
            : isDark
            ? "bg-surface-container-highest text-primary border border-outline-variant/30"
            : "bg-surface text-primary border border-outline-variant/10"
        }`}
        style={{
          boxShadow: showMenu 
            ? '0 12px 24px -6px var(--md-sys-color-primary)' 
            : '0 4px 12px 0px rgba(0,0,0,0.15)'
        }}
      >
        <Palette className="w-6 h-6 stroke-[2.5]" />
      </button>
    </div>
  );
};

export default FloatingThemeToggle;
