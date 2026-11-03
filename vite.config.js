import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  // the SSR bundle only feeds scripts/prerender.mjs, it needs no static assets
  build: { copyPublicDir: !isSsrBuild },
}))
