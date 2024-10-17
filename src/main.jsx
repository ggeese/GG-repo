import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";
import App from "./App";
import { TransactionProvider } from './context/TransactionContext';
import { TransactionProviderTON } from './context/ContextTON/ContextTON';
import { TransactionProviderSOL } from './context/ContextSOL/ContextSOL';
import { TransactionProviderETH } from './context/ContextETH/ContextETH';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Loading } from './components/Loading';
import { useWagmiConfig } from './wagmi.ts';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import '@rainbow-me/rainbowkit/styles.css';
import { base } from 'viem/chains';

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

// Lazy loading de los componentes
const Home = React.lazy(() => import('./components/Home/Home.jsx'));
const Factory = React.lazy(() => import('./components/Factory/Factory.jsx'));
const Farm = React.lazy(() => import('./components/Farm/Farm.jsx'));
const Hall = React.lazy(() => import('./components/Hall/Hall.jsx'));
const Admin = React.lazy(() => import('./components/Admin/Admin.jsx'));
const Degen = React.lazy(() => import('./components/Degen/Degen.jsx'));
const Profile = React.lazy(() => import('./components/Profile/Profile.jsx'));

const AppWrapper = () => {
  const wagmiConfig = useWagmiConfig();

  return (
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/goldengcoin/goldengcoin.github.io/main/tonconnect-manifest.json">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider apiKey={"yCYGyekgTfIGKsj-ZM_MQnJmbufDhUMh"} chain={base}>
            <RainbowKitProvider modalSize="compact">
              <TransactionProvider>
                <TransactionProviderTON>
                  <TransactionProviderSOL>
                    <TransactionProviderETH>
                      <React.StrictMode>
                        <BrowserRouter>
                          <Suspense fallback={<Loading />}>
                            <App />
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/Factory" element={<Factory />} />
                              <Route path="/Farm" element={<Farm />} />
                              <Route path="/Degen" element={<Degen />} />
                              <Route path="/Degen/:id" element={<Degen />} />
                              <Route path="/Hall" element={<Hall />} />
                              <Route path="/Admin" element={<Admin />} />
                              <Route path="/Profile" element={<Profile />} />
                            </Routes>
                          </Suspense>
                        </BrowserRouter>
                      </React.StrictMode>
                    </TransactionProviderETH>
                  </TransactionProviderSOL>
                </TransactionProviderTON>
              </TransactionProvider>
            </RainbowKitProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </TonConnectUIProvider>
  );
};

// Usar createRoot en lugar de ReactDOM.render
const rootElement = document.getElementById("root");
const root = rootElement._reactRootContainer || createRoot(rootElement);
root.render(<AppWrapper />);
