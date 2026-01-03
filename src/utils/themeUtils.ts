
import { 
  argbFromHex, 
  themeFromSourceColor, 
  hexFromArgb,
  TonalPalette
} from "@material/material-color-utilities";

export type ThemeMode = 'light' | 'dark' | 'oled';

// Lista exhaustiva de tokens que DEBEN existir en todos los modos para evitar persistencia
const MANDATORY_TOKENS = [
  'primary', 'on-primary', 'primary-container', 'on-primary-container',
  'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container',
  'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container',
  'error', 'on-error', 'error-container', 'on-error-container',
  'background', 'on-background',
  'surface', 'on-surface', 'surface-variant', 'on-surface-variant',
  'outline', 'outline-variant',
  'surface-container-lowest', 'surface-container-low', 'surface-container', 
  'surface-container-high', 'surface-container-highest'
];

export const generateM3Theme = (sourceColor: string, isDark: boolean, isOled: boolean) => {
  const argb = argbFromHex(sourceColor);
  const theme = themeFromSourceColor(argb);
  const scheme = isDark || isOled ? theme.schemes.dark : theme.schemes.light;
  
  const colors: Record<string, string> = {};
  
  // 1. Extraer colores base del esquema
  const schemeObj = JSON.parse(JSON.stringify(scheme));
  const props = schemeObj.props || schemeObj;

  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'number') {
      const cssKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
      colors[cssKey] = hexFromArgb(value as number);
    }
  });

  // 2. Generar manualmente los tokens de superficie que M3 a veces omite en la extracción plana
  // Esto es CRITICAL para que al volver de OLED el blanco pise al negro
  const neutralPalette = theme.palettes.neutral;
  const neutralVariantPalette = theme.palettes.neutralVariant;

  const getHex = (palette: TonalPalette, tone: number) => hexFromArgb(palette.tone(tone));

  if (!isDark && !isOled) {
    // Modo Claro - Forzamos resets de superficie
    colors['background'] = getHex(neutralPalette, 98);
    colors['surface'] = getHex(neutralPalette, 98);
    colors['surface-container-lowest'] = getHex(neutralPalette, 100);
    colors['surface-container-low'] = getHex(neutralPalette, 96);
    colors['surface-container'] = getHex(neutralPalette, 94);
    colors['surface-container-high'] = getHex(neutralPalette, 92);
    colors['surface-container-highest'] = getHex(neutralPalette, 90);
    colors['outline-variant'] = getHex(neutralVariantPalette, 80);
  } else if (isDark && !isOled) {
    // Modo Oscuro Estándar
    colors['background'] = getHex(neutralPalette, 6);
    colors['surface'] = getHex(neutralPalette, 6);
    colors['surface-container-lowest'] = getHex(neutralPalette, 4);
    colors['surface-container-low'] = getHex(neutralPalette, 10);
    colors['surface-container'] = getHex(neutralPalette, 12);
    colors['surface-container-high'] = getHex(neutralPalette, 17);
    colors['surface-container-highest'] = getHex(neutralPalette, 22);
  }

  // 3. Sobrescritura OLED (Negro Puro)
  if (isOled) {
    const blackTokens = [
      'background', 'surface', 'surface-variant', 
      'surface-container-lowest', 'surface-container-low', 
      'surface-container', 'surface-container-high', 'surface-container-highest'
    ];
    blackTokens.forEach(t => colors[t] = '#000000');
  }

  return colors;
};

export const applyThemeToDocument = (colors: Record<string, string>) => {
  const root = document.documentElement;
  // Primero limpiamos posibles restos (opcional pero recomendado)
  MANDATORY_TOKENS.forEach(token => {
    if (colors[token]) {
      root.style.setProperty(`--md-sys-color-${token}`, colors[token]);
    }
  });
};
