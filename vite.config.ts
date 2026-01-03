
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Optimization: split vendor libraries into separate chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('react-dom')) return 'vendor-react-dom';
            if (id.includes('react-router-dom')) return 'vendor-router';
            if (id.includes('react-helmet-async')) return 'vendor-seo';
            return 'vendor'; // all other node_modules
          }
        },
      },
    },
    // Increase chunk size warning limit if necessary
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 3000,
    proxy: {
      // Proxy local requests to Netlify functions during local dev
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
    },
  },
});
