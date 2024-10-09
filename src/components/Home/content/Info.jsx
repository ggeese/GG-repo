import React, { useState } from "react";
import meme from "../../../../images/walletxd.png";
import { BlackCreateWalletButton } from "./CreateSW"; // Importa solo el botón
import OnRamp from "./OnRamp"; // Importa el nuevo componente
import coinbase from '../../../../images/coinbase.svg';

const Info = () => {
  const [isOnRampVisible, setIsOnRampVisible] = useState(false); // Estado para controlar el popup

  const handleOnCloseRamp = () => setIsOnRampVisible(false);


  return (
    <div>
    <div className="flex items-center justify-center min-h-screen p-10 bg-gradient-to-r from-transparent to-transparent backdrop-blur-md">
      <div className="flex flex-col lg:flex-row items-center lg:items-center bg-white bg-opacity-60 border border-gray-300 p-8 rounded-3xl shadow-2xl w-full max-w-4xl space-y-8 lg:space-y-0 lg:space-x-8">

        <div className="flex flex-col items-center lg:items-center text-center lg:text-center space-y-8">
          <h1 className="text-5xl font-goldeng text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
            New to Crypto?
          </h1>
          <p className="text-lg text-gray-800 font-medium font-goldeng italic">
            Start your crypto journey today by creating your wallet with just one click!
          </p>
          <div className="flex flex-fil pt-4">
            <div className="">
              <BlackCreateWalletButton />
            </div>

            <button
        className="relative overflow-hidden border-none rounded-full bg-black text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 ml-4"
        style={{ width: `200px`, height: `73px` }}
        onClick={() => setIsOnRampVisible(true)} // Cambia a true para abrir el popup
        >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 transition-opacity duration-500 transform scale-105 hover:opacity-100 rounded-full"></div>
        <div className="relative flex items-center justify-center h-full">
          <img src={coinbase} className="h-8 w-auto mr-2" alt="Wallet Logo" />
           Fund Wallet
        </div>
      </button>
           
          </div>
        </div>

        <div className="flex justify-center w-full lg:w-auto">
          <img 
            src={meme} 
            alt="Crypto Meme" 
            className="w-full h-auto max-w-lg rounded-lg shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer" 
          />
        </div>
        
      </div>
    </div>
      <OnRamp 
        onCloseRamp={handleOnCloseRamp}
        isOnRampVisible={isOnRampVisible} // Asegúrate de pasar setIsOnRampOpen aquí
      />
    </div>

  );
};

export default Info;
