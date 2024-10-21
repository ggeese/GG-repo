import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  phantomWallet,
  trustWallet,
  ledgerWallet ,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia, mainnet } from 'wagmi/chains';
import { isWalletACoinbaseSmartWallet } from '@coinbase/onchainkit/wallet';
import { createPublicClient } from 'viem';


export function useWagmiConfig() {
  const projectId = "2529ee2ce06e3c7d8f7369517d5473c5" ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const checkIfCoinbaseSmartWallet = async (senderAddress) => {
    const userOperation = { sender: senderAddress };
    return isWalletACoinbaseSmartWallet({ client: publicClient, userOp: userOperation });
  };

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
        {
          groupName: 'Other Wallets',
          wallets: [metaMaskWallet, phantomWallet, trustWallet, ledgerWallet, rainbowWallet, walletConnectWallet],
        },
      ],
      {
        appName: 'GG',
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [base, baseSepolia],
      // turn off injected provider discovery
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
      },
    });

    return { wagmiConfig, checkIfCoinbaseSmartWallet }; // Return the check function
  }, [projectId]);
}
