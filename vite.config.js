import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},  // <- para prevenir errores con process.env
  },
  optimizeDeps: {
    esbuildOptions: {
      // 👇 Esto soluciona el problema de 'eval'
      supported: {
        'top-level-await': true,
        'dynamic-import': true,
        'import-meta': true,
      },
    },
  },
});
