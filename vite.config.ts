import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: 'public/sw.ts',
        swDest: 'dist/sw.js',
        injectionPoint: 'self.__WB_MANIFEST'
      },
      manifest: {
        name: 'Kame House Manga Reader',
        short_name: 'KameHouse',
        start_url: '/',
        display: 'standalone',
        background_color: '#f59e0b',
        theme_color: '#f59e0b',
        icons: [
          {
            src: '/icons/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/pwa-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.mangadex\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 1 day
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001/kame-house-manga/us-central1/mangaProxy',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  },
  optimizeDeps: {
    include: ['@tanstack/react-query'],
  }
})
