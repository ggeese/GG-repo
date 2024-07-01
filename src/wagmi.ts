import { http, createConfig } from 'wagmi'
import { baseSepolia, base, xLayer, bsc, blast, linea, polygon, zetachain, berachainTestnet } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [
    base,
    baseSepolia,
    xLayer,
    bsc,
    blast,
    linea,
    polygon,
    zetachain,
    berachainTestnet],
    connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [xLayer.id]: http(),
    [bsc.id]: http(),
    [blast.id]: http(),
    [linea.id]: http(),
    [polygon.id]: http(),
    [zetachain.id]: http(),
    [berachainTestnet.id]: http(),

  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
