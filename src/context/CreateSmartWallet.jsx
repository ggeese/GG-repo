import React, { useCallback } from 'react';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import logo_wallet from '../../images/coinbase_wallet.svg';

const sdk = new CoinbaseWalletSDK({
  appName: 'My Dapp With SDK',
  appLogoUrl: 'https://example.com/logo.png',
  appChainIds: [84532],
});

const provider = sdk.makeWeb3Provider();

const createWallet = async () => {
  try {
    const [address] = await provider.request({
      method: 'eth_requestAccounts',
    });
    handleSuccess(address); // Define la función handleSuccess para manejar la creación exitosa de la billetera
  } catch (error) {
    handleError(error); // Define la función handleError para manejar errores
  }
};

const BlackCreateWalletButton = ({ height = 66, width = 200 }) => {
  const buttonHeight = Math.max(48, height);
  const buttonWidth = Math.max(200, width);

  return (
    <button
      className="relative overflow-hidden border-none rounded-full bg-black text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      style={{ width: `${buttonWidth}px`, height: `${buttonHeight}px` }}
      onClick={createWallet}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 transition-opacity duration-500 transform scale-105 hover:opacity-100 rounded-full"></div>
      <div className="relative flex items-center justify-center h-full">
        <img src={logo_wallet} className="h-8 w-auto mr-2" alt="Coinbase Wallet Logo" />
        Create Wallet
      </div>
    </button>
  );
};

export { BlackCreateWalletButton, createWallet };
