import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tailwindcss from "tailwindcss";



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),       nodePolyfills(), // this is necessary to avoid "process is not defined issue"
  ],
  optimizeDeps: {
    include: ['@project-serum/anchor']
  }
})
