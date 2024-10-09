import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),       
    nodePolyfills(), // this is necessary to avoid "process is not defined issue"
    visualizer({ open: true })
  ],
  optimizeDeps: {
    include: ['@project-serum/anchor', '@coinbase/wallet-sdk']
  },
  assetsInclude: ['**/*.glb'], // Add this line to include .glb files
})
