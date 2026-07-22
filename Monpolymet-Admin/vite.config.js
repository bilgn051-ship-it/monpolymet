import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Admin runs on 5174 so it never collides with the public site (5173);
  // both origins are already allow-listed by the API's CORS config.
  server: { port: 5174, host: true },
})
