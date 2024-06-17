import React, { useEffect, useState, useContext } from "react";
import { TransactionContext } from './context/TransactionContext';

function Wallets({ visible, onClose }) {
    const { connectWallet, connectPhantom } = useContext(TransactionContext);

    const handleOnClose = (e) => {
        if (e.target.id === 'container_meme') onClose();
    };

    if (!visible) return null;

    return (
        <div id='container_meme' onClick={handleOnClose} className="fixed z-30 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white rounded-2xl p-2 overflow-y-auto">
                <button className="bg-gray-200 p-4" onClick={connectWallet}>
                    Metamask
                </button>
                <button className="bg-gray-200 p-4" onClick={connectPhantom}>
                    Phantom
                </button>
            </div>
        </div>
    );
}

export default Wallets;
