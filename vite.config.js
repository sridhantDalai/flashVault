import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    allowedHosts: [
      ".ngrok-free.dev"
    ]
  },

  build: {
    rollupOptions: {
      // 🔥 backend / node-only modules ignore karo
      external: ["dotenv"]
    }
  }
})