import React from "react";
import airdrop from "../../../../images/airdrop.jpg"; // Imagen de vista previa
import telegram from "../../../../images/telegrama.png"; // Imagen de Telegram

const Airdrop = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-10 bg-gradient-to-r from-transparent to-transparent backdrop-blur-md">
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start p-8 bg-white bg-opacity-80 rounded-3xl shadow-2xl overflow-hidden lg:space-x-8">
        
        {/* Sección de texto y botón */}
        <div className="flex flex-col items-center lg:items-center mb-8 lg:mb-0 text-center lg:text-left">
          <div className="text-5xl font-extrabold text-pink-600 mb-4 mt-12 flex items-center justify-center lg:justify-center">
             Airdrop! 
             <img src={telegram} alt="Telegram Logo" className="w-12 h-12 mr-2" />
          </div>
          <p className="text-lg text-gray-700 mb-6 max-w-md">
            Memes are raining from the sky!!! Catch them before they're gone!! Play with us and dive into the crypto memes world with GG.
          </p>
          <a
            href="https://t.me/ggeese_bot/GGeese"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Play Now
          </a>
        </div>
        
        {/* Sección de imagen */}
        <div className="w-full max-w-md lg:w-1/2 relative group">
          <img
            src={airdrop}
            alt="Airdrop Preview"
            className="w-full h-auto rounded-3xl shadow-lg transform group-hover:scale-105 transition duration-500 ease-in-out border-4 border-gradient-to-r from-black via-blue-700 to-purple-900 p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
