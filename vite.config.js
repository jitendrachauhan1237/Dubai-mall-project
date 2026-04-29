import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/gsap')) return 'gsap-vendor';
          if (id.includes('node_modules/framer-motion')) return 'framer-vendor';
          if (id.includes('node_modules/lenis')) return 'lenis-vendor';
        },
      },
    },
  },
})
