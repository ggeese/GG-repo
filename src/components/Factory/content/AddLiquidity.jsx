import React, { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../../../context/TransactionContext';
import { NetworkSelectMini } from '../../../context/Network/NetworkSelect';
import { TransactionContextETH } from '../../../context/ContextETH/ContextETH';
import Wallets from '../../../Wallets';

const Input = ({ placeholder, name_6, type, value, handleChange_6 }) => (
  <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e6) => handleChange_6(e6, name_6)}
      className=""

  />
);  

const AddLiquidity = () => {
  const { currentAccount, Network } = useContext(TransactionContext); 
  const { Get_ETH_Balance, PoolFactoryInteract2, handleChange_6 } = useContext(TransactionContextETH); 
  const [showMyModalWallets, setShowMyModalWallets] = useState(false);
  const [memeAmount, setMemeAmount] = useState(0);
  const [ethAmount, setEthAmount] = useState(0);
  const [memeMax, setMemeMax] = useState(1000); // Valor máximo para meme tokens
  const [ethMax, setEthMax] = useState(10);    // Valor máximo para ETH

  const handleMemeChange = (event) => {
    setMemeAmount(event.target.value);
  };

  const handleEthChange = (event) => {
    setEthAmount(event.target.value);
  };

  const handleOnCloseWallets = () => setShowMyModalWallets(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance_ETH = await Get_ETH_Balance();
        if (balance_ETH) {
          setEthMax(balance_ETH);
        }
      } catch (error) {
        console.error('Error fetching ETH balance:', error);
      }
    };

    if (currentAccount && Network) {
      fetchBalance();
    }
  }, [currentAccount, Network, Get_ETH_Balance]);

  return (
    <div className="add-liquidity-container p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
      <div className='flex w-auto justify-center'>
        <NetworkSelectMini/>
      </div>
      <div className="flex flex-col space-y-4">

        <div className="flex items-center space-x-4">
          {/* Selector de memes */}
          <Input 
            placeholder="token address" 
            name_6="tokenaddress" 
            type="text" 
            handleChange_6={handleChange_6}
          />
          {/* Input para cantidad de tokens del meme */}
          <Input
            type="number"
            name_6="lpmeme" 
            step={memeAmount/100}
            handleChange_6={handleChange_6}
            className="p-2 border border-gray-300 rounded w-auto"
          />
        </div>
        {/* Slider para tokens del meme */}
        <div className="flex flex-col space-y-2">
          <input
            type="range"
            min="0.001"
            max={memeMax}
            step={memeMax/100}
            value={memeAmount}
            handleChange_6={handleChange_6}
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <span>0.001</span>
            <span>{memeMax}</span>
          </div>
        </div>
        <div className="flex flex-fil justify-end space-y-2">
          {/* Input para cantidad de ETH */}
          <div className="flex items-center justify-around space-x-4">

            <label className="font-semibold">ETH</label>

            <Input
              type="number"
              name_6="lpeth" 
              step={ethMax/100}
              handleChange_6={handleChange_6}
              className="p-2 border border-gray-300 rounded w-auto"
            />
            {/* Slider para ETH */}

          </div>
        </div>
          <input
                type="range"
                min="0.001"
                max={ethMax}
                step={ethMax/100}
                value={ethAmount}
                handleChange_6={handleChange_6}
                className="w-full"
              />
          <div className="flex justify-between text-xs">
            <span>0.001</span>
            <span>{ethMax}</span>
          </div>
          
          {/* Aviso sobre el bloqueo de liquidez */}
          <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
            <p className="text-yellow-800 font-semibold">
            Notice: The liquidity you provide
            </p>
            <p className="text-yellow-800 font-semibold">
            will be sent to a burn address,
            </p>
            <p className="text-yellow-800 font-semibold">
            and cannot be recovered.
            </p>
          </div>

          {currentAccount ? (
            <div className="flex p-4 justify-center text-xl font-goldeng">
              <button className="bg-black text-white p-4 rounded-lg shadow-md w-auto"
              onClick={() => PoolFactoryInteract2()}
              >
                Create LP
              </button>
              </div>
                ) : (
                  <div className='flex justify-center'>
                  <button
                    className="bg-black py-4 px-4 mx-2 rounded-xl mt-7 cursor-pointer hover:bg-[#9e701f]"
                    onClick={() => setShowMyModalWallets(true)}
                  >
                    <p className="text-xl text-white">Connect Wallet</p>
                  </button>
                  </div>
                )}
      </div>

      <Wallets onCloseWallets={handleOnCloseWallets} visibleWallets={showMyModalWallets} />

    </div>
  );
};

export default AddLiquidity;
