import React, { useContext } from "react";
import { TransactionContext } from './context/TransactionContext';
import { TransactionContextSOL } from './context/ContextSOL/ContextSOL';
import { TransactionContextETH } from './context/ContextETH/ContextETH';
import { AppSocialPoint } from './utils/axiossonfig'
import { TonConnectButton } from "@tonconnect/ui-react";
import metamaskIcon from "../images/metamask.svg";
import phantomIcon from "../images/phantom.svg";
import smartWalletIcon from "../images/smart_wallet.svg";

function Wallets({ visibleWallets, onCloseWallets }) {
    const { setDataUser, connectSmartWallet, SmartSignatureSession } = useContext(TransactionContext);
    const { connectPhantom } = useContext(TransactionContextSOL);
    const { connectWallet, signatureSession } = useContext(TransactionContextETH);


    const handleOnClose = (e) => {
        if (e.target.id === 'container_wallets') onCloseWallets();
    };

    if (!visibleWallets) return null;

    const ConnectMetamask = async () => {
        try {
            const currentAcc = await connectWallet();
            console.log(currentAcc, "cc acc");
            const Account = currentAcc.toLowerCase();
            
            const nonceResponse = await AppSocialPoint.get(`/generateNonce/${Account}`);
            const { nonce } = nonceResponse.data;
            
            const signature = await signatureSession(nonce);
            const response = await AppSocialPoint.post('/authenticate', {
                walletAddress: Account,
                signature: signature,
                type: "evm",
            });
            
            setDataUser(response.data);
        } catch (error) {
            console.log("Error during connection or signing process", error);
        } finally {
            onCloseWallets(); // Esto se ejecutará siempre, incluso si hubo un error
        }
    };
    

    const ConnectSmartWallet = async () => {
        try {
            const currentAcc = await connectSmartWallet();
            console.log(currentAcc, "cc acc");
            const Account = currentAcc.toLowerCase();
            const nonceResponse = await AppSocialPoint.get(`/generateNonce/${Account}`);
            const { nonce } = nonceResponse.data;
            const signature = await SmartSignatureSession(nonce);
            const response = await AppSocialPoint.post('/authenticate', {
                walletAddress: Account,
                signature: signature,
                type: "smartevm",
            });
            
            setDataUser(response.data);
        } catch (error) {
            console.log("Error during connection or signing process", error);
        } finally {
           // onCloseWallets(); // Esto se ejecutará siempre, incluso si hubo un error
        }
    };


    return (
        <div 
        id='container_wallets' 
        onClick={handleOnClose} 
        className="fixed z-30 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white rounded-2xl p-2 overflow-y-auto">
                <button className="bg-gray-200 p-4 flex items-center" 
                    onClick={() => ConnectSmartWallet()} // Cambia a true para abrir el popup
                >
                    <img src={smartWalletIcon} alt="Smart Wallet" className="w-6 h-6 mr-2"/>
                    Smart Wallet
                </button>   
                <button className="bg-gray-200 p-4 flex items-center" 
                    onClick={() => ConnectMetamask()} // Cambia a true para abrir el popup
                >
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
