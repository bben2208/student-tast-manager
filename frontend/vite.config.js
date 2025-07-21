import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ required so Vite builds correct relative paths
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5050', // for local dev only
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
