import React from 'react';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="ockConnectWallet_Container min-w-[90px] bg-gray-200 rounded-2xl text-[#030712] hover:bg-slate-300"
      text="Sign up"
    />
  );
}
