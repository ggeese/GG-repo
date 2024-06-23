import React, { useState, useContext, useEffect } from 'react';
import Select, { components } from 'react-select';
import { Link, useLocation } from 'react-router-dom';
import { TransactionContext } from './context/TransactionContext';
import eth from "../images/ethereum.svg";
import bnb from "../images/bnb.svg";
import berachain from "../images/berachain.svg";
import polygon from "../images/polygon.svg";
import okb from "../images/okb.svg";
import avax from "../images/avax.svg";
import arbitrum from "../images/arbitrum.svg";
import fantom from "../images/fantom.svg";
import optimism from "../images/optimism.svg";
import base from "../images/base.svg";
import manta from "../images/manta.svg";
import blast from "../images/blast.svg";
import linea from "../images/linea_name.svg";
import klaytn from "../images/klaytn.svg";
import merlin from "../images/merlin.svg";
import solana from "../images/solana.svg";
import TON from "../images/TON.svg";
import zetachain from "../images/zetachain.svg";
import logo from "../images/gg_coin_2.png";
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Wallets } from './';


const networkIcons = {
  'Berachain Artio':  { icon: berachain, nick: ' Berachain Testnet' },
  'X Layer Mainnet':  { icon: okb, nick: 'X Layer' },
  //'Sepolia ETH': { icon: eth, nick: ' Sepolia ETH' },
  //'Ethereum':  { icon: eth, nick: ' Ethereum' },
  'BNB Smart Chain Mainnet': { icon: bnb, nick: ' BNB Chain' },
  //'BNB Smart Chain Testnet': { icon: bnb, nick: ' BNB Testnet' },
  //'X Layer Testnet':  { icon: okb, nick: 'X layer Testnet' },
  //'Merlin Mainnet':  { icon: merlin, nick: ' Merlin Chain' },
  //'Merlin Testnet':  { icon: merlin, nick: ' Merlin Testnet' },
  'Base':  { icon: base, nick: 'Base' },
  //'Base Sepolia':  { icon: base, nick: 'Base Testnet' },
  //'Avalanche C-Chain':  { icon: avax, nick: ' Avalanche' },
  //'Avalanche Testnet C-Chain':  { icon: avax, nick: ' Avalanche Testnet' },
  //'OP Mainnet':  { icon: optimism, nick: ' Optimism' },
  //'Manta Pacific Mainnet':  { icon: manta, nick: ' Manta' },
  'Blast':  { icon: blast, nick: ' Blast' },
  'Linea':  { icon: linea, nick: ' Linea' },
  //'Klaytn Mainnet Cypress':  { icon: klaytn, nick: ' Klaytn' },
  'Polygon Mainnet':  { icon: polygon, nick: ' Polygon' },
  //'Arbitrum One':  { icon: arbitrum, nick: ' Arbitrum' },
  //'Fantom Opera':  { icon: fantom, nick: ' Fantom' },
  'ZetaChain Mainnet':  { icon: zetachain, nick: ' Zeta Chain' },
  //'ZetaChain Athens 3 Testnet':  { icon: zetachain, nick: ' Zeta Chain Testnet' },
  'TON':  { icon: TON, nick: 'TON (telegram)' },
  'Solana': { icon: solana, nick: ' Solana Devnet' },


};



const networks = Object.keys(networkIcons).map(network => ({
  value: network,
  label: networkIcons[network].nick,  // Usa el 'nick' del objeto
  icon: networkIcons[network].icon
}));

const customOption = (props) => (
  <components.Option {...props}>
    <div className="relative flex text-xl py-1 items-center">
      <img src={props.data.icon} alt={props.data.label} className="w-5 h-5 mr-3 bg-white rounded-3xl" />
      {props.data.label}
    </div>
  </components.Option>
);

const customSingleValue = ({ data }) => (
  <div className="relative flex text-xl items-center">
    <img src={data.icon} alt={data.label} className="w-5 h-5 mr-3 bg-white rounded-3xl" />
    {data.label}
  </div>
);


const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const {connectWallet, currentAccount, changeNetwork, disconnectWallet, Network, changeNetSol } = useContext(TransactionContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);
  const location = useLocation();

  const defaultNetwork = networks.find(network => network.value === Network);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNetworkChange = (selectedOption) => {
    setSelectedNetwork(selectedOption.value);
    if (selectedOption.value === "Solana") {
      changeNetSol();
    } else {
      changeNetwork(selectedOption.value);
    }
  };  

  useEffect(() => {
    const closeMenu = (event) => {
      // Verificar si el clic proviene del menú desplegable o su área circundante
      if (
        !event.target.closest(".toggle-menu") &&
        !event.target.closest(".toggle-button")
      ) {
        setToggleMenu(false);
      }
    };
  
    document.addEventListener("click", closeMenu);
  
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  
  useEffect(() => {
    const closeMenu = (event) => {
      // Verificar si el clic proviene del menú desplegable o su botón de alternancia
      if (
        !event.target.closest(".toggle-menu") &&
        !event.target.closest(".toggle-button")
      ) {
        setToggleMenu(false);
      }
    };
  
    document.addEventListener("click", closeMenu);
  
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  


  if (location.pathname !== "/") {
    return (
      <div>
      <header className="relative w-full bg-black flex md:justify-center justify-between items-center">
        <div className="relative z-10 flex items-center justify-between w-full max-w-screen-xl mx-auto px-4">
          <Link to="/" className="flex text-2xl px-4 py-2 hover:text-gray-300">
            <img src={logo} alt="logo" className="w-32 cursor-pointer" />
          </Link>
          
          <nav className="hidden md:flex list-none gap-20 items-center flex-initial">
            <Link to="/Factory" className="text-white text-xl px-4 py-2 hover:text-gray-300">Factory</Link>
            <Link to="/Farm" className="text-white text-xl px-4 py-2 hover:text-gray-300">Farm</Link>
            <Link to="/Points" className="text-white text-xl px-4 py-2 hover:text-gray-300">Points</Link>
            
            {/* Dropdown Menu */}
            <div className="relative flex items-center justify-between mb-6 text-left">
              <Select
                options={networks}
                components={{ Option: customOption, SingleValue: customSingleValue }}
                placeholder="Select Network"
                value={selectedNetwork ? networks.find(network => network.value === selectedNetwork) : defaultNetwork} // Usar la primera opción como predeterminada si no hay ninguna seleccionada
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
                <div className="relative inline-block wallet-button">

                  <button className="text-white text-xl font-semibold"
                    onClick={toggleDropdown}
                  >
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </button>
                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <button
                        onClick={disconnectWallet}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                  )}
                </div>
              ) : (
                <button
                  className="bg-white py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                  onClick={() => setShowMyModal(true)}
                  >
                  <p className="text-xl text-black">Connect Wallet</p>
                </button>
              )}
            </div>
          </nav>

          <div className="flex md:hidden ml-auto py-4">
            {!toggleMenu ? (
              <HiMenuAlt4 fontSize={37} className="text-white cursor-pointer toggle-button" onClick={() => setToggleMenu(true)} />
            ) : (
              <AiOutlineClose fontSize={37} className="text-white cursor-pointer toggle-button" onClick={() => setToggleMenu(false)} />
            )}
          </div>

          {toggleMenu && (
            <ul
              className="fixed top-0 right-0 px-2 gap-5 w-[50vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-center bg-black text-white"
            >
              <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
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

              <Link to="/" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Home</Link>
              <Link to="/Factory" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Factory</Link>
              <Link to="/Farm" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Farm</Link>
              <Link to="/Points" className="text-xl my-2 text-white" onClick={() => setToggleMenu(false)}>Points</Link>
              

                  {/* Agregar la barra de selección de redes aquí */}
              <div className="relative flex items-center justify-between mb-6 text-left">
                <Select
                  options={networks}
                  components={{ Option: customOption, SingleValue: customSingleValue }}
                  placeholder="Select Network"
                  value={selectedNetwork ? networks.find(network => network.value === selectedNetwork) : defaultNetwork} // Usar la primera opción como predeterminada si no hay ninguna seleccionada
                  onChange={handleNetworkChange}
                  isSearchable={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      width: '150px',
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
              {/* Fin de la barra de selección de redes */}
            </ul>
          )}
        </div>
      </header>
<Wallets onClose={handleOnClose} visible={showMyModal} />
</div>
      
    );
  }
  return null;
};

export default App;
