// NewNetworks.ts
import { Chain } from '@wagmi/core/chains'; // Importa el tipo `Chain`

// Definir Berachain Testnet (o Mainnet si tienes los datos)
const berachainTestnet: Chain = {
  id: 80084, // Reemplaza con el Chain ID de Berachain
  name: 'Berachain bArtio',
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://bartio.drpc.org'], // Cambia al URL de RPC correcto
    },
    public: {
      http: ['https://bartio.rpc.berachain.com	'], // Puedes definir un URL público si es necesario
    },
  },
  blockExplorers: {
    default: { name: 'Berachain Explorer', url: 'https://bartio.beratrail.io/' }, // Cambia si es necesario
  },
  testnet: true, // Cambia a `false` si estás usando la mainnet
};

// Exportar el objeto
export { berachainTestnet };
