import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify', // Polyfill para o crypto
      stream: 'stream-browserify', // Polyfill para stream
      events: 'events', // Polyfill para events
      vm: 'vm-browserify', // Polyfill para vm
    },
  }
})
