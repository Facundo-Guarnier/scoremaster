
import React from 'react';

interface MatchGroupProps {
  points: number; // 0 a 5
  size?: number; // Size is now controlled via CSS/Container mostly
}

const MatchGroup: React.FC<MatchGroupProps> = ({ points }) => {
  // Colores usando variables CSS de Tailwind/Material
  const activeColor = 'var(--md-sys-color-primary)';
  // Usamos un color explícito para el "fantasma" para garantizar contraste y visibilidad de la grilla
  const ghostColor = 'var(--md-sys-color-outline-variant)'; 
  
  // Grosor aumentado para estilo "marcador"
  const strokeWidth = 4;
  
  const renderLine = (threshold: number, x1: number, y1: number, x2: number, y2: number) => {
    const isActive = points >= threshold;
    return (
      <line 
        x1={x1} y1={y1} x2={x2} y2={y2} 
        stroke={isActive ? activeColor : ghostColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round" // Bordes redondeados
        strokeLinejoin="round" // Uniones redondeadas
        className="transition-colors duration-300 ease-out"
        opacity={isActive ? 1 : 0.4} // Opacidad ajustada para que los inactivos se vean claros pero distintos
      />
    );
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 block transform-gpu overflow-visible"
    >
      {/* 1. Top */}
      {renderLine(1, 15, 15, 85, 15)}
      
      {/* 2. Right */}
      {renderLine(2, 85, 15, 85, 85)}
      
      {/* 3. Bottom */}
      {renderLine(3, 85, 85, 15, 85)}
      
      {/* 4. Left */}
      {renderLine(4, 15, 85, 15, 15)}
      
      {/* 5. Diagonal */}
      {renderLine(5, 15, 15, 85, 85)}
    </svg>
  );
};

export default MatchGroup;
