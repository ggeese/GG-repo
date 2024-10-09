import React, { useState, useCallback } from "react";
import { generateSecureToken } from "../../../onramp/connect/queries";
import { BLOCKCHAIN_LIST } from "../../../onramp/connect/blockchains";

const OnRamp = ({isOnRampVisible, onCloseRamp }) => {
  const [showBuyQuoteURLText, setShowBuyQuoteURLText] = useState(false);
  const [blockchainOption, setBlockchainOption] = useState("base");
  const [ethAddress, setEthAddress] = useState("");
  const [blockchains, setBlockchains] = useState([]);

  const handleOnClose = (event) => {
    // Cierra el popup si el clic se realiza fuera del contenido del popup
    if (event.target.id === 'onRampOverlay') onCloseRamp();
  };

  const secureTokenWrapper = useCallback(async () => {
    const response = await generateSecureToken({
      ethAddress,
      blockchains: showBuyQuoteURLText ? blockchains : [blockchainOption.toLowerCase()],
    });

    try {
      if (response) {
        console.log("Nuevo token generado:", response);
        const link = `https://pay.coinbase.com/buy/select-asset?sessionToken=${response}`;
        console.log(link); // Verifica el enlace generado
        window.open(link, "_blank", "popup,width=540,height=700");
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }, [ethAddress, showBuyQuoteURLText, blockchains, blockchainOption]);

  if (!isOnRampVisible) return null;

  return (
    <>
      {/* Popup para el OnRamp */}
      <div
        id="onRampOverlay"
        className="fixed z-40 inset-0 to-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center transition-all duration-300 ease-out"
        onClick={handleOnClose} // Cierra el popup al hacer clic fuera
      >
        <div
          className="bg-white rounded-2xl shadow-2xl p-8 relative max-w-md w-full transform transition-transform duration-500 scale-95 hover:scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 p-1 rounded-full transition duration-300"
            onClick={() => onCloseRamp()} // Cierra el popup
          >
            ✖
          </button>
  
          <div className="flex flex-col items-center w-full space-y-4">
            {/* Select para elegir la blockchain */}
            <label htmlFor="blockchain-option" className="text-gray-700 font-semibold">Blockchain:</label>
            <select
              id="blockchain-option"
              className="border border-gray-500 rounded-lg p-2 bg-gray-100 text-gray-700 text-center focus:ring-2 focus:ring-indigo-500 w-1/2"
              value={blockchainOption}
              onChange={(e) => setBlockchainOption(e.target.value)}
              required
            >
              <option value="" disabled>Select a network</option>
              {BLOCKCHAIN_LIST.map((curr) => (
                <option className="bg-gray-100 text-black" key={curr.id} value={curr.id}>{curr.name}</option>
              ))}
            </select>
  
            {/* Input para la dirección de la wallet */}
            <label htmlFor="ethAddress" className="text-gray-700 font-semibold">Destination Wallet Address:</label>
            <input
              id="ethAddress"
              className="border border-gray-300 rounded-lg p-2 text-black bg-gray-300 focus:ring-2 focus:ring-indigo-500 w-full text-sm"
              type="text"
              placeholder="Enter your address"
              value={ethAddress}
              onChange={(e) => setEthAddress(e.target.value)}
              required
            />
  
            {/* Botón para generar el token seguro */}
            <button
              className="bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition duration-300 w-auto px-3"
              onClick={secureTokenWrapper}
            >
              Buy Crypto Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default OnRamp;
