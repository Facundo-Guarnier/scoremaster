
export const getCanastaMinimumPoints = (score: number): number => {
  if (score < 1500) return 50;
  if (score < 3000) return 90;
  if (score < 5000) return 120;
  return 160;
};

export const generateUUID = () => {
  return Math.random().toString(36).substring(2, 9);
};

export const getGameIcon = (type: string) => {
  switch (type) {
    case 'truco': return '🎴';
    case 'generala': return '🎲';
    case 'canasta': return '🧺';
    case 'escoba': return '🧹';
    case 'mosca': return '🪰';
    default: return '🎮';
  }
};
