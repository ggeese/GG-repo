import React from 'react';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] text-white"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
