import React, { useContext } from "react";
import { TransactionContext } from './context/TransactionContext';
import { TonConnectButton } from "@tonconnect/ui-react";
import metamaskIcon from "../images/metamask.svg";
import phantomIcon from "../images/phantom.svg";
import smartWalletIcon from "../images/smart_wallet.svg";

function Wallets({ visible, onClose }) {
    const { connectWallet, connectPhantom, connectSmartWallet } = useContext(TransactionContext);

    const handleOnClose = (e) => {
        if (e.target.id === 'container_meme') onClose();
    };

    if (!visible) return null;

    return (
        <div id='container_meme' onClick={handleOnClose} className="fixed z-30 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white rounded-2xl p-2 overflow-y-auto">
                <button className="bg-gray-200 p-4 flex items-center" onClick={connectSmartWallet}>
                    <img src={smartWalletIcon} alt="Smart Wallet" className="w-6 h-6 mr-2"/>
                    Smart Wallet
                </button>   
                <button className="bg-gray-200 p-4 flex items-center" onClick={connectWallet}>
                    <img src={metamaskIcon} alt="Metamask" className="w-6 h-6 mr-2"/>
                    Metamask
                </button> 
                <button className="bg-gray-200 p-4 flex items-center" onClick={connectPhantom}>
                    <img src={phantomIcon} alt="Phantom" className="w-6 h-6 mr-2"/>
                    Phantom
                </button>
                <TonConnectButton className="bg-gray-200 p-4 flex items-center" style={{ float: "right" }}>
                    {/* Puedes añadir un icono para TonConnect si tienes uno */}
                </TonConnectButton>
            </div>
        </div>
    );
}

export default Wallets;
