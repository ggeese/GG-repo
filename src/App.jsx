import React, { useState, useContext } from 'react';
import Select, { components } from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { TransactionContext } from './context/TransactionContext';
import eth from "../images/ethereum.svg";
import bnb from "../images/bnb.svg";
import polygon from "../images/polygon.svg";
import avax from "../images/avax.svg";
import arbitrum from "../images/arbitrum.svg";
import fantom from "../images/fantom.svg";
import optimism from "../images/optimism.svg";
import base from "../images/base.svg";
import manta from "../images/manta.svg";
import blast from "../images/blast.svg";
import linea from "../images/linea_name.svg";
import logo from "../images/gg_coin_2.png";
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const networkIcons = {
  'Ethereum': eth,
  'BNB Chain': bnb,
  'Polygon': polygon,
  'Avalanche': avax,
  'Arbitrum': arbitrum,
  'Fantom Opera': fantom,
  'Optimism': optimism,
  'Base': base,
  'Manta Pacific': manta,
  'Blast': blast,
  'Linea': linea,
};

const networks = Object.keys(networkIcons).map(network => ({
  value: network,
  label: network,
  icon: networkIcons[network]
}));

const customOption = (props) => (
  <components.Option {...props}>
    <div className="flex items-center">
      <img src={props.data.icon} alt={props.data.label} className="w-5 h-5 mr-2" />
      {props.data.label}
    </div>
  </components.Option>
);

const customSingleValue = ({ data }) => (
  <div className="flex items-center">
    <img src={data.icon} alt={data.label} className="w-5 h-5 mr-2" />
    {data.label}
  </div>
);

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const { connectWallet, currentAccount, changeNetwork } = useContext(TransactionContext);
  const location = useLocation();

  const handleNetworkChange = (selectedOption) => {
    setSelectedNetwork(selectedOption.value);
    // Aquí llamar a la función cambiarRed con la red seleccionada
    changeNetwork(selectedOption.value);
  };
  
  if (location.pathname !== "/") {
    return (
      <header className="relative w-full bg-black flex md:justify-center justify-center items-center">
        <div className="relative z-20 flex items-center justify-between w-full max-w-screen-xl mx-auto px-4">
          <Link to="/" className="flex text-white text-2xl px-4 py-2 hover:text-gray-300">
            <img src={logo} alt="logo" className="w-32 cursor-pointer" />
          </Link>
          
          <nav className="hidden md:flex list-none flex-row gap-20 items-center flex-initial">
            <Link to="/Factory" className="text-white text-xl px-4 py-2 hover:text-gray-300">Factory</Link>
            <Link to="/Farm" className="text-white text-xl px-4 py-2 hover:text-gray-300">Farm</Link>
            <Link to="/Points" className="text-white text-xl px-4 py-2 hover:text-gray-300">Points</Link>
            
            {/* Dropdown Menu */}
            <div className="relative flex items-center justify-between mb-6 text-left">
              <Select
                options={networks}
                components={{ Option: customOption, SingleValue: customSingleValue }}
                placeholder="Select Network"
                value={networks.find(network => network.value === selectedNetwork)}
                onChange={handleNetworkChange}
                isSearchable={false}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '200px',
            
                    alignItems: 'center',
                    backgroundColor: '#000000', // Tailwind's gray-800
                    borderColor: '#000000', // Tailwind's gray-700
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#000000' // Tailwind's gray-600
                    },
                    color: '#ffffff' // White text
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ffffff' // White text
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: '#1f2937', // Tailwind's gray-800
                    color: '#ffffff' // White text
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#374151' : state.isFocused ? '#4b5563' : '#1f2937', // Different shades of gray
                    color: '#ffffff', // White text
                    '&:hover': {
                      backgroundColor: '#4b5563' // Tailwind's gray-600
                    }
                  })
                }}
              />
            </div>
            
            <div>
              {currentAccount ? (
                <p className="text-white text-xl font-semibold">
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                </p>
              ) : (
                <button
                  className="bg-white py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                  onClick={connectWallet}
                >
                  <p className="text-xl text-black">Connect Wallet</p>
                </button>
              )}
            </div>
          </nav>

          <div className="flex md:hidden ml-auto">
            {!toggleMenu ? (
              <HiMenuAlt4 fontSize={37} className="text-white cursor-pointer" onClick={() => setToggleMenu(true)} />
            ) : (
              <AiOutlineClose fontSize={37} className="text-white cursor-pointer" onClick={() => setToggleMenu(false)} />
            )}
          </div>

          {toggleMenu && (
            <ul
              className="fixed top-0 right-0 p-3 w-[40vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end bg-black text-white"
            >
              <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
              <Link to="/" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Home</Link>
              <Link to="/Factory" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Factory</Link>
              <Link to="/Farm" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Farm</Link>
              <Link to="/Points" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Points</Link>
              <div>
                {currentAccount ? (
                  <p className="text-xl font-semibold">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </p>
                ) : (
                  <button
                    className="bg-white py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                    onClick={connectWallet}
                  >
                    <p className="text-xl text-black">Connect Wallet</p>
                  </button>
                )}
              </div>
            </ul>
          )}
        </div>
      </header>
    );
  }
  return null;
};

export default App;
