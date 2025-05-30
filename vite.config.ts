import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/login': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/register': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})
