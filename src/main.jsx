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
import { config } from './wagmi.ts';

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

// Usar createRoot en lugar de ReactDOM.render
const rootElement = document.getElementById("root");
let root = rootElement._reactRootContainer || createRoot(rootElement);

root.render(
  <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/goldengcoin/goldengcoin.github.io/main/tonconnect-manifest.json">
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TransactionProvider>
          <TransactionProviderTON>
            <TransactionProviderSOL>
              <TransactionProviderETH>
                <React.StrictMode>
                  <BrowserRouter>
                    <Suspense fallback={<Loading/>}>
                    <App/>
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
      </QueryClientProvider>
    </WagmiProvider>
  </TonConnectUIProvider>
);
