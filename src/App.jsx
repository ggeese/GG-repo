import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TransactionContext } from './context/TransactionContext';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Wallets } from './';
import NetworkSelect, {NetworkSelectMini} from './context/Network/NetworkSelect';
import logo from "../images/gg_coin_2.png";
import meme from "./utils/goldeng.json";

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentAccount, disconnectWallet } = useContext(TransactionContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);
  const Navigate = useNavigate(); // Crear una instancia de useHistory
  const location = useLocation();
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const closeMenu = (event) => {
      if (!event.target.closest(".toggle-menu") && 
          !event.target.closest(".toggle-button") && 
          !event.target.closest(".mini-menu-select")
        ) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const handleToggleClick = (e) => {
    e.stopPropagation(); // Evita que el clic se propague
    setToggleMenu(prev => !prev); // Cambia el estado de toggleMenu
  };

  const handleClick = (meme) => {
    Navigate(`/Degen/${meme.contract}`, { state: { meme } });
};

  if (location.pathname !== "/") {
    return (
      <div>
        <header className="relative w-full bg-black flex md:justify-center justify-between items-center">
          <div className="relative z-10 flex items-center justify-between w-full max-w-screen-xl mx-auto px-4">
            <Link to="/" className="flex text-2xl px-4 py-2 hover:text-gray-300">
              <img src={logo} alt="logo" className="w-20 cursor-pointer" />
            </Link>
            <nav className="hidden md:flex list-none gap-20 items-center flex-initial">
              <Link to="/Factory" className="text-white text-xl px-4 py-2 hover:text-gray-300">Factory</Link>
              <Link to="/Farm" className="text-white text-xl px-4 py-2 hover:text-gray-300">Farm</Link>
              <Link to="/Hall" className="text-white text-xl px-4 py-2 hover:text-gray-300">Hall</Link>
              
              <button
                onClick={() => handleClick(meme)}

                className="text-white text-xl px-4 py-2 hover:text-gray-300"
              >
                Degen <span className="text-gray-400"></span> (BETA)
              </button>

              <div className="relative flex items-center justify-between mb-6 text-left">
                <NetworkSelect />
              </div>
              <div>
                {currentAccount ? (
                  <div className="relative inline-block wallet-button">
                    <button className="text-white text-xl font-semibold" onClick={toggleDropdown}>
                      {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <Link to="/Profile" className=" block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm">Profile</Link>
                          <button onClick={disconnectWallet} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Disconnect Wallet
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="bg-white py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]" onClick={() => setShowMyModal(true)}>
                    <p className="text-xl text-black">Connect Wallet</p>
                  </button>
                )}
              </div>
            </nav>
            <div className="flex md:hidden ml-auto py-4 px-6 toggle-button">
              {toggleMenu
                ? <AiOutlineClose fontSize={28} className="text-white cursor-pointer" onClick={handleToggleClick} />
                : <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer" onClick={handleToggleClick} />}
            </div>
            {toggleMenu && (
              <ul className="fixed z-20 top-0 -right-2 p-3 w-[40vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-center rounded-md bg-black text-white animate-slide-in toggle-menu">
                  <li className="text-xl w-full my-2">
                    <AiOutlineClose onClick={() => setToggleMenu(false)} />
                  </li>
                  <li className="my-2 text-lg text-black mini-menu-select custom-react-select">
                    <NetworkSelectMini className = "mini-menu-select"/>
                  </li>
                  <li className="my-2 text-xl py-3">
                    <Link to="/Factory" className="text-white hover:text-gray-300">Factory</Link>
                  </li>
                  <li className="my-2 text-xl py-3">
                    <Link to="/Farm" className="text-white hover:text-gray-300">Farm</Link>
                  </li>
                  <li className="my-2 text-xl py-3">
                    <Link to="/Hall" className="text-white hover:text-gray-300">Hall</Link>
                  </li>
                  <li className="my-2 text-xl py-3">
                  {currentAccount ? (
                    <div className="relative inline-block">
                      <button className="text-white font-semibold" onClick={toggleDropdown}>
                        {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <Link to="/Profile" className="text-black text-sm px-4 py-2 hover:text-gray-300">Profile</Link>
                          <div className="py-1">
                            <button onClick={disconnectWallet} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Disconnect Wallet
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button className="bg-white py-2 px-4 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]" onClick={() => setShowMyModal(true)}>
                      <p className="text-black">Connect Wallet</p>
                    </button>
                  )}
                </li>
              </ul>
            )}
          </div>
        </header>
        <Wallets onCloseWallets={handleOnClose} visibleWallets={showMyModal} />
      </div>
    );
  }

  return null;
};

export default App;
