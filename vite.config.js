import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "ux-engineer-v3",
    project: "iphone15"
  }), sentryVitePlugin({
    org: "ux-engineer-v3",
    project: "iphone15"
  })],

  build: {
    sourcemap: true
  }
})