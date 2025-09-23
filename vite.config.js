import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      external: ['@splinetool/react-spline', '@splinetool/runtime'],
      output: {
        globals: {
          '@splinetool/react-spline': 'Spline',
          '@splinetool/runtime': 'SplineRuntime'
        }
      }
    }
  }
})
