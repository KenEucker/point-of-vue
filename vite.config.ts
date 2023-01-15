import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import EnvironmentPlugin from 'vite-plugin-environment'
import env from 'dotenv'
env.config()

const port = process.env.PORT ? Number(process.env.PORT) : 8080

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    EnvironmentPlugin({
      ORIGIN: process.env.ORIGIN ?? 'http://localhost',
      ORIGIN_PORT: process.env.ORIGIN_PORT ?? port.toString(),
      PORT: port.toString(),
      GRAPH_URL: process.env.GRAPH_URL ?? 'http://localhost',
      GRAPH_PORT: process.env.GRAPH_PORT ?? '8100',
      GRAPH_PATH: process.env.GRAPH_PATH ?? 'graphql',
      STUDIO_URL: process.env.STUDIO_URL ?? 'http://localhost:5555',
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN ?? null,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE ?? null,
      AUTH0_CID: process.env.AUTH0_CID ?? null,
      AUTH0_S: process.env.AUTH0_S ?? null,
    }),
  ],
  server: {
    port: process.env.ORIGIN_PORT ? Number(process.env.ORIGIN_PORT) : port,
    // host: process.env.ORIGIN_HOST ?? 'localhost',
  },
  preview: {
    port: process.env.ORIGIN_PORT ? Number(process.env.ORIGIN_PORT) : port,
  },
})
