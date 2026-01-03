
<div align="center">

# 🎮 Score Master

**Contador de puntos para juegos de cartas argentinos - Truco, Escoba, Generala, y más**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ✨ Características

- 🎯 **Múltiples juegos** - Truco, Escoba, Generala, Mosca y Canasta
- 📱 **Diseño responsive** - Funciona perfectamente en móviles y escritorio
- 🎨 **Temas claro/oscuro** - Interfaz adaptable a tus preferencias
- 📊 **Seguimiento de partidas** - Lleva el control de todas tus rondas
- 💾 **Historial completo** - Revisa tus partidas anteriores
- ⚡ **Carga rápida** - Optimizado para rendimiento máximo

---

## 🚀 Instalación

**Requisitos:** Node.js 18+

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/scoremaster.git
cd scoremaster

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build de producción |

---

## 🏗️ Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra rápido
- **React Router** - Enrutamiento SPA
- **Lucide React** - Iconografía
- **Material Color Utilities** - Sistema de colores dinámicos

---

## 📁 Estructura del proyecto

```
scoremaster/
├── public/            # Archivos estáticos (favicon, imágenes)
├── src/
│   ├── components/
│   │   ├── common/    # Componentes reutilizables (Navbar, Footer)
│   │   ├── layout/    # Layouts de la aplicación
│   │   └── *Counter.tsx   # Contadores específicos por juego
│   ├── context/       # Context API (tema, estado del juego)
│   ├── pages/         # Páginas de la aplicación
│   ├── types/         # Tipos TypeScript
│   ├── utils/         # Funciones auxiliares
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Punto de entrada
├── index.html         # HTML principal
├── vite.config.ts     # Configuración de Vite
└── tsconfig.json      # Configuración de TypeScript
```

---

## 🎮 Juegos Soportados

- **Truco** 🃏 - Contador con puntos hasta 30
- **Escoba de 15** 🧹 - Seguimiento de rondas y puntos
- **Generala** 🎲 - Tabla completa de categorías
- **Mosca** 🪰 - Sistema de vidas
- **Canasta** 🎴 - Contador de puntos acumulados

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

<div align="center">

### 🎯 ¡Que comience el juego!

</div>
