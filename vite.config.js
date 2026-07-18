import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function manualChunks(id) {
  if (!id.includes('node_modules')) return undefined
  if (id.includes('/firebase/') || id.includes('@firebase')) return 'firebase'
  if (id.includes('react-router') || id.includes('/react/') || id.includes('/react-dom/')) return 'react'
  if (id.includes('jspdf')) return 'pdf'
  if (id.includes('framer-motion')) return 'motion'
  if (id.includes('@tanstack') || id.includes('lucide-react') || id.includes('react-hot-toast') || id.includes('zustand')) return 'utilities'
  return 'vendor'
}

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: '0.0.0.0',
    port: 5173,
  },

  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
})