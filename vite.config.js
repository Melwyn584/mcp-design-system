import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true, // Replaces width and height with "1em" so they scale with font-size
        replaceAttrValues: {
          '#3B3B3E': 'currentColor',
        },
      },
      include: "**/*.svg?react",
    }),
  ],
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/icons/')) {
            return 'icons';
          }
          if (id.includes('/src/doc-pages/')) {
            return 'docs';
          }
        }
      }
    }
  }
})
