import { defineConfig, loadEnv, } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import openInVscode from 'vite-plugin-openinvscode'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    openInVscode(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    },
  },
  server: {
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
