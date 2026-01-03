
/**
 * BrandFooter - Reusable footer component for all Guarnold projects
 */

import React from "react";
import { Github, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface BrandFooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Show in compact mode (single line) */
  compact?: boolean;
  /**
   * Force dark mode variant.
   */
  forceDark?: boolean;
}

export const BrandFooter: React.FC<BrandFooterProps> = ({
  className = "",
  compact = false,
  forceDark = false,
}) => {
  // Configuración de marca
  const appName = "ScoreMaster";
  const appVersion = "1.0.0";
  const brandName = "Guarnold";
  const brandUrl = "https://guarnold.com.ar";
  const repoUrl = "https://github.com/Facundo-Guarnier/scoremaster";

  // Get theme state from context
  const { isDark } = useTheme();

  // Base wrapper for forced dark mode
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    forceDark ? <div className="dark">{children}</div> : <>{children}</>;

  // Estilos de la imagen de firma
  const signatureClasses = `h-8 sm:h-10 md:h-12 w-auto -my-1 sm:-my-2 transition-all duration-500 ${
    isDark || forceDark
      ? "invert opacity-30 hover:opacity-60"
      : "opacity-40 hover:opacity-70"
  }`;

  const footerBaseStyles = `
    border-t print:hidden transition-colors duration-500 shrink-0
    bg-surface-container-low/80 backdrop-blur-sm border-outline-variant/10
    ${className}
  `;

  const linkBaseStyles = `
    flex items-center gap-1 sm:gap-1.5 md:gap-2 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 
    rounded-lg transition-all font-medium text-[10px] sm:text-xs md:text-sm
    border border-outline-variant/20 bg-surface-container-high text-on-surface-variant
    hover:bg-primary/10 hover:text-primary hover:border-primary/30
  `;

  if (compact) {
    return (
      <Wrapper>
        <footer className={`py-3 px-4 ${footerBaseStyles}`}>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:gap-4 md:text-sm">
            {/* App Name with Badge */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="font-black text-on-surface text-[10px] md:text-xs hidden sm:inline tracking-tighter uppercase opacity-60">
                {appName}
              </span>
              <span className="px-1.5 md:px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-black font-mono bg-primary-container text-on-primary-container border border-primary/10">
                v{appVersion}
              </span>
            </div>

            <span className="hidden text-outline-variant/30 md:inline">|</span>

            {/* Brand Link - Main Hub */}
            <a
              href={brandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkBaseStyles}
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              <span className="hidden lg:inline">Más proyectos en</span>
              <span className="lg:hidden">By</span>
              <strong className="font-black">{brandName}</strong>
            </a>

            {/* Repo Link */}
            {repoUrl && (
              <>
                <span className="hidden text-outline-variant/30 md:inline">|</span>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-1.5 transition-colors p-1 sm:p-1.5 md:p-0
                    text-on-surface-variant hover:text-primary
                  "
                  title="Ver código fuente en GitHub"
                >
                  <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  <span className="hidden md:inline font-bold">Código</span>
                </a>
              </>
            )}

            {/* Signature */}
            <img
              src="/assets/guarnold_firma.png"
              alt={brandName}
              className={signatureClasses}
            />
          </div>
        </footer>
      </Wrapper>
    );
  }

  // Full version (non-compact)
  return (
    <Wrapper>
      <footer className={`py-5 px-6 ${footerBaseStyles}`}>
        <div className="flex flex-col items-center justify-between gap-4 mx-auto text-sm max-w-7xl sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-black text-on-surface uppercase tracking-widest text-xs opacity-60">{appName}</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black font-mono bg-primary-container text-on-primary-container">
              v{appVersion}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={brandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkBaseStyles}
            >
              <Globe className="w-4 h-4" />
              <span>
                Más proyectos en <strong className="font-black">{brandName}</strong>
              </span>
            </a>

            {repoUrl && (
              <>
                <span className="text-outline-variant/30">|</span>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors text-on-surface-variant hover:text-primary font-bold"
                  title="Ver código fuente en GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span>Repositorio</span>
                </a>
              </>
            )}

            <img
              src="/assets/guarnold_firma.png"
              alt={brandName}
              className={signatureClasses}
            />
          </div>
        </div>
      </footer>
    </Wrapper>
  );
};

export default BrandFooter;
