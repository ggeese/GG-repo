import React, { useState, useEffect } from 'react';
import no_image from "../../../../images/goldeng.png";
import copy_logo from "../../../../images/copy.svg";

const Description = ({ memedata, MemeFee, Tradestarted, ProtectTime, setShowMyModalDonate }) => {
  const [showExpanded, setShowExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [clicked, setClicked] = useState(false);


  useEffect(() => {
    if (Tradestarted && ProtectTime) {
      const startTime = parseInt(Tradestarted, 10);
      const protectTime = parseInt(ProtectTime, 10);

      if (!isNaN(startTime) && !isNaN(protectTime)) {
        const targetTime = (startTime * 1000) + (protectTime * 60000);

        const timer = setInterval(() => {
          const now = Date.now();
          const difference = targetTime - now;

          if (difference <= 0) {
            clearInterval(timer);
            setTimeLeft(0);
          } else {
            setTimeLeft(difference);
          }
        }, 1000);

        return () => clearInterval(timer);
      } else {
        setTimeLeft(null);
      }
    } else {
      setTimeLeft(null);
    }
  }, [Tradestarted, ProtectTime]);

  const copyContractAddress = (contractAddress) => {
    navigator.clipboard.writeText(contractAddress);
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // Duración del efecto de clic
  };

  const formattedDate = Tradestarted !== null 
  ? new Date(Tradestarted.toString()*1000).toLocaleString() // Convierte el Unix timestamp a una fecha legible.
  : null;

  // Formatea el tiempo restante
  const formatTime = (ms) => {
    if (ms <= 0) return 'Time is up!';
    
    const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((ms % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return { months, days, hours, minutes, seconds };
  };
  const timetoend = timeLeft !== null ? formatTime(timeLeft) : null;


  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 mb-6 text-white">
    <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="flex flex-col justify-center items-center lg:flex-row lg:items-start space-y-2 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
        <img
          className="rounded-3xl w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover border-2 border-gray-700 shadow-lg"
          src={memedata.image || no_image}
          alt={memedata.name}
        />

        <div className="flex flex-col justify-center items-center lg:items-start space-y-2 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:space-x-4 items-center">
            <h3 className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
              {memedata.name} ({memedata.ticker})
            </h3>
            <p className="text-md font-medium text-gray-400 text-center italic lg:text-left">
              {memedata.network}
            </p>
          </div>

          {/* Botón Expand para pantallas pequeñas */}
          <div className="lg:hidden">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm px-4 rounded-full mt-1 transition-transform transform hover:scale-105"
              onClick={() => setShowExpanded(!showExpanded)}
            >
              {showExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>

          {/* Información adicional */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${showExpanded ? 'block' : 'hidden'} lg:grid lg:grid-cols-2`}>
          <div className="flex flex-col space-y-1 py-1 rounded-md bg-gray-800">
            <div className="flex items-center space-x-2">
              <p className="text-md font-medium text-gray-300">
                Contract: {memedata?.contract ? `${memedata.contract.slice(0, 6)}...${memedata.contract.slice(-4)}` : 'N/A'}
              </p>
              <button
                onClick={() => copyContractAddress(memedata.contract)}
                className={`relative transform transition-all duration-200 p-1 rounded-full bg-gray-700 hover:bg-gray-600 ${
                  clicked ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <img src={copy_logo} alt="copy_logo" className="w-4 h-4" style={{ filter: 'invert(1)' }} 
                />
              </button>
            </div>
            <p className="text-md font-medium text-gray-300">
              Sell Fee: {MemeFee !== null ? `${MemeFee / 100}%` : 'Server Error...'}
            </p>
          </div>
            <div className="flex flex-col space-y-1 py-1">
              <p className="text-md font-medium text-gray-300">
                Created: {formattedDate !== null ? formattedDate : 'Server Error...'}
              </p>
              <p className="text-md font-medium text-gray-300">
                Protect Time: {ProtectTime !== null ? `${ProtectTime/60} hours` : 'Server Error...'}
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="flex bg-gray-900 rounded-xl p-2">
      <div className="flex flex-col items-center justify-center w-auto lg:w-auto">
        <div className="hidden sm:flex flex-col items-center bg-black text-white p-4 rounded-lg shadow-lg">
        {timetoend && (
          <>
            <div className="flex flex-fil">
              {timetoend.months > 0 && (
                  <div className="flex space-x-2 mb-2 text-sm font-mono">
                    <span className="bg-gray-800 p-2 rounded-md">{timetoend.months}</span>
                    <span className="text-xs flex items-center">months</span>
                  </div>
                )}
                {timetoend.days > 0 && (
                  <div className="flex space-x-2 mb-2 text-sm font-mono">
                    <span className="bg-gray-800 p-2 rounded-md">{timetoend.days}</span>
                    <span className="text-xs flex items-center">days</span>
                  </div>
                )}
            </div>

            <div className="flex space-x-2 text-xl font-mono">
              <div className="flex flex-col items-center">
                <span className="bg-gray-800 px-4 py-2 rounded-md">{timetoend.hours}</span>
                <span className="text-xs text-gray-400">hrs</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span className="bg-gray-800 px-4 py-2 rounded-md">{timetoend.minutes}</span>
                <span className="text-xs text-gray-400">min</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span className="bg-gray-800 px-4 py-2 rounded-md">{timetoend.seconds}</span>
                <span className="text-xs text-gray-400">sec</span>
              </div>
            </div>
          </>
        )}
        </div>
        {timetoend && (
        <div>
          <button
            className={`flex justify-center items-center w-full py-2 px-6 rounded-full mt-1 lg:mt-0 transition-transform transform hover:scale-105 ${
              !timetoend || timeLeft <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white font-bold'
            }`}
            onClick={() => setShowMyModalDonate(true)}
            disabled={!timetoend || timeLeft <= 0}
          >
            
            Airdrop
          </button>
        </div>
        )}
      </div>
      {/* Termómetro Visual - Posicionado a la derecha */}
      {MemeFee > 0 && (
        <div className="flex items-center lg:items-center space-x-4 mt-4 lg:mt-0 lg:ml-4 hidden lg:flex">
          <div className="relative h-32 w-3 bg-gray-200 rounded-full overflow-hidden flex flex-col">
            <div
              className="absolute bottom-0 left-0 w-full bg-green-600 transition-all duration-500 ease-in-out"
              style={{ height: `${MemeFee / 100}%` }} // Altura basada en el fee
            />
          </div>
          <div className="flex flex-col justify-between h-32 w-8 text-gray-400 text-xs">
            <p className="text-center">100%</p>
            <p className="text-center">75%</p>
            <p className="text-center">50%</p>
            <p className="text-center">25%</p>
            <p className="text-center">0%</p>
          </div>
          <div className="flex flex-col items-center text-white text-sm font-semibold">
            Sell Fee:
            <p>{MemeFee !== null ? `${MemeFee / 100}%` : '...'}</p>
          </div>
        </div>
      )}
      </div>

    </div>

    <p className="text-gray-300 mt-4 text-center lg:text-left">
      {memedata.description}
    </p>
  </div>

    
  );
};

export default Description;
