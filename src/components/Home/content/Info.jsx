import React from "react";
import meme from "../../../../images/walletxd.png";
import { BlackCreateWalletButton, createWallet } from "../../../context/CreateSmartWallet"; // Importa el componente y la función

const Info = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10  bg-gradient-to-r from-transparent to-transparent backdrop-blur-md">
      {/* Container */}
      <div className="bg-white bg-opacity-60 border border-gray-300 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center space-y-8 w-full max-w-xl transform transition duration-500 hover:shadow-2xl">
        <h1 className="text-5xl font-goldeng text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">New to Crypto?</h1>
        <p className="text-lg text-gray-800 font-medium font-goldeng italic">Start your crypto journey today by creating your wallet with just one click!</p>
        <img 
          src={meme} 
          alt="Crypto Meme" 
          className="w-full h-auto max-w-lg rounded-lg shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer" 
          onClick={createWallet}  
        />
        <div className="pt-4">
          <BlackCreateWalletButton />
        </div>
      </div>
    </div>
  );
};

export default Info;
