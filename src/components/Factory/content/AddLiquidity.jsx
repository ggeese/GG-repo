import React, { useState, useContext, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable'; // Cambia a CreatableSelect
import { TransactionContext } from '../../../context/TransactionContext';
import { TransactionContextETH } from '../../../context/ContextETH/ContextETH';
import Wallets from '../../../Wallets';
import egger from '../../../../images/egger.png';
import eth from '../../../../images/eth.svg';

const Input = ({ placeholder, type, value, onChange  }) => (
  <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={onChange}  // Directly passing the onChange function
      className="rounded-xl"
  />
);  

const AddLiquidity = () => {
  const { currentAccount, Network, NetworkSelectMini, changeNetwork, DataUser, walletext, PoolFactoryInteractBase} = useContext(TransactionContext); 
  const { Get_ETH_Balance, PoolFactoryInteract2 } = useContext(TransactionContextETH); 
  const [showMyModalWallets, setShowMyModalWallets] = useState(false);
  const [memeAmount, setMemeAmount] = useState(0);
  const [ethAmount, setEthAmount] = useState(0);
  const [memeMax, setMemeMax] = useState(0); // Valor máximo para meme tokens
  const [ethMax, setEthMax] = useState(0);    // Valor máximo para ETH
  const [selectedToken, setSelectedToken] = useState(""); // Token seleccionado
  const [options, setOptions] = useState([]); // Initialize options state

  // Formatear opciones para react-select después de que DataUser esté disponible
  useEffect(() => {
    if (DataUser.BaseBalances?.result?.balances) {
      const formattedOptions = DataUser.BaseBalances.result.balances
        .filter(balance => balance.asset?.type === 'erc20')
        .map(balance => ({
          value: balance.asset.groupId,
          label: `${balance.asset.groupId.slice(0, 7)}...${balance.asset.groupId.slice(-7)}`,
        }));

      setOptions(formattedOptions);
    }
  }, [DataUser]); // Depend on DataUser to set options

    const handleTokenChange = (selectedOption) => {
      // Si se selecciona una opción, actualiza `selectedToken` con la opción seleccionada
      if (selectedOption) {
        setSelectedToken(selectedOption);
        // Aquí obtienes el balance del token seleccionado
        const tokenBalance = DataUser.BaseBalances?.result?.balances?.find(
          (balance) => balance.asset.groupId === selectedOption.value
        );
    
        if (tokenBalance) {
          const adjustedBalance = (parseFloat(tokenBalance.value) / Math.pow(10, tokenBalance.decimals)).toFixed(2);
          setMemeMax(adjustedBalance);
        } else {
          setSelectedToken(null); // Permitir selección vacía
        }
      } else {
        // Si el usuario borra el texto, no establecemos selectedToken a null
        // Permitir que el valor escrito se mantenga
        setSelectedToken(null); // Permitir selección vacía
      }
    };
    

    const handleCreateOption = (inputValue) => {
      console.log("Option creation");
      const newOption = { value: inputValue, label: inputValue };
      setOptions((prevOptions) => [...prevOptions, newOption]);
      setSelectedToken(newOption);
      return newOption; // Esto es importante para que el nuevo valor se agregue al select
    };
    

  const handleMemeAmountChange = (e) => {
    setMemeAmount(e.target.value);
  };

  const handleEthAmountChange = (e) => {
    setEthAmount(e.target.value);
  };

  const handleOnCloseWallets = () => setShowMyModalWallets(false);

  const handleCreateLP = async (token,tokenamount,ethamount) => {
    if (walletext === "Base Wallet"){
      await PoolFactoryInteractBase(token, tokenamount, ethamount);
    } else {
      await PoolFactoryInteract2(token, tokenamount, ethamount);

    }

  }

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
  <div className="add-liquidity-container p-1 space-y-2 rounded-3xl py-3 max-w-lg mx-auto">

    <div className="flex flex-col text-center ">
      {/* Selector de memes */}
      <label className="block text-lg font-goldeng">Add liquidity to your meme!</label>

      <div className="flex flex-col space-y-4 py-3">
        <CreatableSelect
          id="tokenSelect"
          value={selectedToken}
          onChange={handleTokenChange}
          options={options}
          placeholder="🔥Meme Contract🔥"
          isSearchable={true} // Habilita la búsqueda
          onCreateOption={handleCreateOption} // Manejar la creación de nuevas opciones
          className="text-center"
        />
      </div>

      {/* Input para cantidad de tokens del meme */}
      <div className='flex flex-fil gap-1 justify-around py-3 font-goldeng'>
        <div>
          <div className="flex flex-col space-y-2">
            <label className="block text-lg">Meme </label>
            <Input
              type="number"
              step={memeAmount / 100}
              value={memeAmount || ''}
              onChange={handleMemeAmountChange}
              className="p-1 border-1 border-green-300 rounded-lg bg-white text-gray-900 w-full text-center transition duration-200 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className='flex justify-end text-xs'>
              {memeMax}
            </div>
          </div>

          {/* Slider para tokens del meme */}
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              min="0.001"
              max={memeMax}
              step={memeMax / 100}
              value={memeAmount}
              onChange={handleMemeAmountChange}
              className="w-full py-3 accent-yellow-500"
            />
            <div className="flex justify-between text-sm">
              <button
                onClick={() => handleMemeAmountChange({ target: { value: (memeMax * 0.25).toFixed(4) } })}
                className="bg-yellow-300 text-black p-1 rounded-xl hover:bg-yellow-500"
              >
                25%
              </button>
              <button
                onClick={() => handleMemeAmountChange({ target: { value: (memeMax * 0.5).toFixed(4) } })}
                className="bg-yellow-300 text-black p-1 rounded-xl hover:bg-yellow-500"
              >
                50%
              </button>
              <button
                onClick={() => handleMemeAmountChange({ target: { value: (memeMax * 0.75).toFixed(4)} })}
                className="bg-yellow-300 text-black p-1 rounded-xl hover:bg-yellow-500"
              >
                75%
              </button>
              <button
                onClick={() => handleMemeAmountChange({ target: { value: memeMax } })}
                className="bg-yellow-300 text-black p-1 rounded-xl hover:bg-yellow-500"
              >
                100%
              </button>
            </div>
          </div>
        </div>

        <div>
          {/* Input para cantidad de ETH */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg">ETH </label>
            <Input
              type="number"
              step={ethAmount / 100}
              value={ethAmount|| ''}
              onChange={handleEthAmountChange}
              className="p-3 border-4 border-green-400 rounded-lg bg-white text-gray-900 w-full text-center transition duration-200 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className='flex justify-end text-xs'>
              {ethMax}
            </div>
          </div>

          {/* Slider para ETH */}
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              min="0.001"
              max={ethMax}
              step={ethMax / 100}
              value={ethAmount}
              onChange={handleEthAmountChange}
              className="w-full py-3 accent-green-500"
            />
            <div className="flex justify-between text-sm">
              <button
                onClick={() => handleEthAmountChange({ target: { value: (ethMax * 0.01).toFixed(4)  } })}
                className="bg-green-300 text-black px-2 py-1 rounded-xl hover:bg-green-400"
              >
                1%
              </button>
              <button
                onClick={() => handleEthAmountChange({ target: { value: (ethMax * 0.03).toFixed(4)} })}
                className="bg-green-300 text-black px-2 py-1 rounded-xl hover:bg-green-400"
              >
                3%
              </button>
              <button
                onClick={() => handleEthAmountChange({ target: { value: (ethMax * 0.07).toFixed(4) } })}
                className="bg-green-300 text-black px-2 py-1 rounded-xl hover:bg-green-400"
              >
                7%
              </button>
              <button
                onClick={() => handleEthAmountChange({ target: { value: (ethMax * 0.1).toFixed(4) } })}
                className="bg-green-300 text-black px-2 py-1 rounded-xl hover:bg-green-400"
              >
                10%
              </button>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-fil justify-around items-center text-sm  mb-3">
        <img src={egger} alt="EGG" style={{ width: '50px', height: '50px' }} />
          <NetworkSelectMini
            isMini={true}
            changeNetwork={changeNetwork}
            Network={Network}
            className="text-sm"
          />
          <img src={eth} alt="ETH" style={{ width: '50px', height: '50px' }} />
        </div>


      {/* Aviso sobre el bloqueo de liquidez */}
      <div className="bg-gray-100 p-4 mt-3 rounded-lg border-4 border-gray-300 text-red-700 text-center shadow-lg ">
        <p className="font-bold text-lg">⚠️ Warning: Once you add liquidity, LP tokens goes to a burn address 🔥</p>
      </div>

      {currentAccount ? (
        <div className="flex justify-center mt-7">
          <button
            className="bg-black text-white font-bold py-4 px-6 rounded-lg w-full shadow-lg transform transition duration-300  hover:bg-yellow-700"
            onClick={() => handleCreateLP(selectedToken, memeAmount, ethAmount)}
          >
            Create LP 
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className="bg-black py-4 px-4 mx-2 rounded-xl mt-3 cursor-pointer hover:bg-[#9e701f] text-xl text-white"
            onClick={() => setShowMyModalWallets(true)}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>

    <Wallets onCloseWallets={handleOnCloseWallets} visibleWallets={showMyModalWallets} />
  </div>


  );
};

export default AddLiquidity;
