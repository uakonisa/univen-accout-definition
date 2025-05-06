import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'University of Venda Account System',
        short_name: 'Univen Accounts',
        description: 'Offline-ready responsive app for managing university accounts.',
        theme_color: '#00274D',
        icons: [
          {
            src: '/icons/univen-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/univen-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
