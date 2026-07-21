import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      // Exclude the public folder from chokidar watching to avoid
      // Windows EBUSY errors on locked static assets (e.g. open images).
      ignored: ['**/public/**'],
    },
  },
})
