import React from "react";
import meme from "../../../../images/walletxd.png";
import { BlackCreateWalletButton, createWallet } from "./CreateSW"; // Importa el componente y la función

const Info = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-10 bg-gradient-to-r from-transparent to-transparent backdrop-blur-md">
      {/* Container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-center bg-white bg-opacity-60 border border-gray-300 p-8 rounded-3xl shadow-2xl w-full max-w-4xl space-y-8 lg:space-y-0 lg:space-x-8">

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-center text-center lg:text-center space-y-8">
          <h1 className="text-5xl font-goldeng text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
            New to Crypto?
          </h1>
          <p className="text-lg text-gray-800 font-medium font-goldeng italic">
            Start your crypto journey today by creating your wallet with just one click!
          </p>
          <div className="pt-4">
            <BlackCreateWalletButton />
          </div>
        </div>
        <div className="flex justify-center w-full lg:w-auto">
          <img 
            src={meme} 
            alt="Crypto Meme" 
            className="w-full h-auto max-w-lg rounded-lg shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer" 
            onClick={createWallet}  
          />
        </div>
        
        {/* Image */}

      </div>
    </div>
  );
};

export default Info;
