import { http, createConfig } from 'wagmi'
import { baseSepolia, base, xLayer, bsc, blast, linea, polygon } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { berachainTestnet } from './context/Network/wagmi/NewNetworks'

export const config = createConfig({
  chains: [
    base,
    baseSepolia,
    xLayer,
    bsc,
    blast,
    linea,
    polygon,
    berachainTestnet, // Agregar Berachain Testnet aquí
    ],
    connectors: [
    injected(),
    coinbaseWallet(),
    //walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [base.id]: http('https://api.developer.coinbase.com/rpc/v1/base/yCYGyekgTfIGKsj-ZM_MQnJmbufDhUMh'),
    [baseSepolia.id]: http(),
    [xLayer.id]: http(),
    [bsc.id]: http(),
    [blast.id]: http(),
    [linea.id]: http(),
    [polygon.id]: http(),
    [berachainTestnet.id]: http(), // Añadir transporte HTTP para Berachain
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
