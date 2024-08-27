import React, { useContext, useState } from "react";
import { TransactionContextETH } from './../../../context/ContextETH/ContextETH';

function Burn({ visibleWallets, onCloseWallets, memecontract, memeticker }) {
    const { burnMemes } = useContext(TransactionContextETH);
    const [ethAmount, setEthAmount] = useState('');

    const handleAddLiquidity = () => {
        if (!ethAmount || isNaN(ethAmount)) return;
        const eth = parseFloat(ethAmount);
        burnMemes(memecontract, eth); 
    }

    const handleMinClick = () => {
        setEthAmount('0.001');
      };


    const handleOnClose = (e) => {
        if (e.target.id === 'container_burn') onCloseWallets();
    };

    if (!visibleWallets) return null;

    return (
        <div 
            id='container_burn' 
            onClick={handleOnClose} 
            className="fixed z-30 inset-0 bg-black bg-opacity-40 flex justify-center items-center"
        >
            <div className="flex flex-col justify-center bg-white rounded-3xl p-8 shadow-2xl max-w-lg w-full transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700">Burn!</h2>
                <div className="flex flex-col justify-center items-center mb-6">
                    <p className="text-center mb-6 text-black text-lg">
                        Wanna see everything on fire!!!!!!
                    </p>
                    <p className="font-bold text-yellow-400 text-sm">⚠️ Warning!</p>
                    <p className="font-bold text-black text-sm">Memes Burned wont be recovered!</p>
                </div>
                <div className="flex items-center space-x-2 mb-6">

                    <input
                        type="number"
                        placeholder={`Enter ${memeticker} amount`}
                        value={ethAmount}
                        onChange={(e) => setEthAmount(e.target.value)}
                        className="p-3 border rounded-none w-full text-center text-lg border-purple-400 focus:border-purple-600 outline-none transition duration-300"
                    />
                    <span className="bg-white text-black py-2 px-4 rounded-r-full text-lg font-semibold">{memeticker}</span>
                </div>
                <button
                    onClick={handleAddLiquidity}
                    className="bg-red-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange   -700 transition duration-300"
                >
                    Burn
                </button>
            </div>

        </div>
    );
}

export default Burn;
