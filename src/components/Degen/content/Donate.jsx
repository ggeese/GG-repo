import React, { useContext, useState } from "react";
import { TransactionContextETH } from './../../../context/ContextETH/ContextETH';
import { TransactionContext } from './../../../context/TransactionContext';
import { Loader } from './';

function Donate({ visibleWallets, onCloseWallets, memedata, TreasuryBalance }) {
    const { AddFastLiquidity,  } = useContext(TransactionContextETH);
    const { isLoading } = useContext(TransactionContext);

    const [ethAmount, setEthAmount] = useState('');

    const handleAddLiquidity = () => {
        if (!ethAmount || isNaN(ethAmount)) return;
        const eth = parseFloat(ethAmount);
        AddFastLiquidity(memedata.contract, eth); 
    }

    const handleMinClick = () => {
        setEthAmount('0.001');
      };


    const handleOnClose = (e) => {
        if (e.target.id === 'container_donate') onCloseWallets();
    };

    if (!visibleWallets) return null;

    return (
        <div 
            id='container_donate' 
            onClick={handleOnClose} 
            className="fixed z-30 inset-0 bg-black bg-opacity-40 flex justify-center items-center"
        >
            <div className="flex flex-col justify-center bg-black rounded-3xl p-8 shadow-2xl max-w-lg w-full transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-700">Airdrop</h2>
                <div className="flex flex-col justify-center items-center mb-6">
                    <p className="text-center mb-6 text-gray-300 text-lg">
                        🎉 Every time a meme is created, you can receive a small airdrop by giving some ETH to the pool.
                    </p>
                    <p className="font-bold text-red-500 text-sm">⚠️ Warning!</p>
                    <p className="font-bold text-gray-100 text-xl">
                        You will receive 
                        <span className="text-2xl text-yellow-300 mx-1">
                            {(TreasuryBalance ? (TreasuryBalance / 10).toFixed(4) : 'N/A')}
                        </span>
                        <span className="text-2xl text-yellow-300">
                            {memedata?.ticker || 'N/A'}
                        </span>
                    ! for:
                    </p>

                </div>


             <div className="flex items-center space-x-2 mb-6">
                <button 
                    onClick={handleMinClick}
                    className="bg-white text-black py-2 px-4 rounded-l-full text-lg font-semibold hover:bg-gray-300 transition duration-300">
                    Min
                </button>
                <input
                    type="number"
                    placeholder="Enter ETH amount"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="p-3 border rounded-none w-full text-center text-lg border-purple-400 focus:border-purple-600 outline-none transition duration-300"
                />
                <span className="bg-white text-black py-2 px-4 rounded-r-full text-lg font-semibold">ETH</span>
            </div>
                {isLoading ? (
                    <Loader /> 
                ) : (
                    <button
                        onClick={handleAddLiquidity}
                        className="bg-purple-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300"
                    >
                        Donate
                    </button>
                )}
            </div>

        </div>
    );
}

export default Donate;
