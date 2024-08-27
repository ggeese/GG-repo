import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Factory } from './components/Factory';
import { Farm } from './components/Farm';
import { Home } from './components/Home';
import { Points } from './components/Points';
import { Admin } from './components/Admin';
import { Degen } from './components/Degen';
import { Profile } from './components/Profile';

import "./index.css";
import App from "./App";
import { TransactionProvider } from './context/TransactionContext';
import { TransactionProviderTON } from './context/ContextTON/ContextTON';
import { TransactionProviderSOL } from './context/ContextSOL/ContextSOL';
import { TransactionProviderETH } from './context/ContextETH/ContextETH';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { config } from './wagmi.ts';

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

// Usar createRoot en lugar de ReactDOM.render
const root = createRoot(document.getElementById("root"));

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
                    <App/>
                    <Routes>

                      <Route path="/" element={<Home/>} />
                      <Route path="/Factory" element={<Factory/>} />
                      <Route path="/Farm" element={<Farm/>} />
                      <Route path="/Degen/" element={<Degen/>} />
                      <Route path="/Degen/:id" element={<Degen />} />
                      <Route path="/Hall" element={<Points/>} />
                      <Route path="/Admin" element={<Admin/>} />
                      <Route path="/Profile" element={<Profile/>} />


                    </Routes>
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
