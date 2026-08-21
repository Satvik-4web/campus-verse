import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    allowedHosts: true,
    // Without this Vite binds IPv6 only ([::1]), so anything resolving
    // localhost to 127.0.0.1 gets connection-refused and the preview looks dead.
    host: true,
    // Was false, which meant edits never reached the browser without a manual
    // hard refresh — set it back to false if it turns out it was disabled on
    // purpose for the WebGL canvas.
    hmr: true
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-core';
            }
            if (id.includes('framer-motion')) {
              return 'animation';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
