import React, { useState } from "react";
import sky from "../../../../images/sky.jpeg";
import copy_logo from "../../../../images/copy.svg";


const Token_Info = () => {
  const [contractAddress, setContractAddress] = useState('34v35grvasfgv345gdfvdfv'); // Dirección del contrato

const copyContractAddress = () => {
  navigator.clipboard.writeText(contractAddress); // Copia la dirección del contrato al portapapeles
};

const backgroundStyle = {
  backgroundImage: `url(${sky})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

  return (
    <div style={backgroundStyle} className="flex flex-col items-center justify-center min-h-screen p-10">
      {/* About Us Section */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-center space-y-4 w-full max-w-lg">
        <h1 className="text-3xl font-bold">What is Golden Goose?</h1>
        <p className="text-xl">Golden Goose hatches golden eggs, it's an egg factory of golden eggs where everyone can hatch their own golden egg.</p>
      </div>

      {/* Contract Address */}
      <div className="bg-white bg-opacity-90 p-4 mt-8 rounded-lg shadow-lg text-center w-full max-w-xl">
        <h2 className="text-4xl font-semibold p-4">Contract Address</h2>
        <div className="flex flex-items justify-center">
          <a className="flex text-gray text-4md p-2" href="https://solscan.io/token/CcxreSMUycHVRGUxbSTMrPG9GgRiZ9A8pKFzn6G6YAM2" target="_blank" rel="noopener noreferrer">CcxreSMUycHVRGUxbSTMrPG9GgRiZ9A8pKFzn6G6YAM2</a> {/* Replace with actual contract address */}
          <button onClick={copyContractAddress} className="flex flex-fil justify-center hover:bg-gray-200 text-white font-bold rounded mt-2 focus:outline-none focus:shadow-outline ">
            <img src={copy_logo} alt="Copy" className="w-4 h-4 mr-1" />
          </button>
        </div>
      </div>

      {/* Button */}

      <a className="flex justify-center mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-3xl focus:outline-none focus:shadow-outline w-full max-w-xs"
        href="https://birdeye.so/token/CcxreSMUycHVRGUxbSTMrPG9GgRiZ9A8pKFzn6G6YAM2/Hjjpt3M2koFkAvS39uyinYRRsqRWqPi1Vt5jjkJeKwNn?chain=solana" target="_blank" rel="noopener noreferrer">
          Buy MEME
        </a>

    </div>
  );
};

export default Token_Info;
