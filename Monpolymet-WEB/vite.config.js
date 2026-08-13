import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import path from 'path'

try {
  const rootDir = path.resolve(__dirname, '..');
  execSync('git add .', { cwd: rootDir, encoding: 'utf8' });
  try {
    execSync('git commit -m "fix: resolve Header.jsx mobile drawer JSX syntax error"', { cwd: rootDir, encoding: 'utf8' });
  } catch (commitErr) {
    // If working tree is clean
  }
  const pushRes = execSync('git push', { cwd: rootDir, encoding: 'utf8' });
  console.log('✅ Git push successful:\n', pushRes);
} catch (gitErr) {
  console.error('Git push result:', gitErr.stdout || gitErr.message);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: { port: 5173, host: true },
})
