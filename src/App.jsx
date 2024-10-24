import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TransactionContext } from './context/TransactionContext';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Wallets } from './';
import logo from "../images/gg_coin_2.png";
import meme from "./utils/goldeng.json";
import SignupButton from './components/SignupButton.jsx';
import LoginButton from './components/LoginButton.jsx';
import { useAccount } from 'wagmi';


const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentAccount, disconnectWallet, NetworkSelectMini, Network, changeNetwork} = useContext(TransactionContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);
  const Navigate = useNavigate(); // Crear una instancia de useHistory
  const location = useLocation();
  const { address } = useAccount();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown-menu") &&
          !event.target.closest(".dropdown-button")) {
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  
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
    Navigate(`/Degen/${meme.contract}-${meme.network}`, { state: { meme } });
};

  if (location.pathname !== "/") {
    return (
      <div>
        <header className="relative w-full bg-black flex md:justify-center justify-between items-center z-20">
          <div className="relative z-10 flex items-center w-auto max-w-screen-xl mx-auto px-4">
            <nav className="hidden md:flex list-none text-xl sm:text-lg md:text-2lg lg:text-3lg xl:text-xl sm:gap-5 md:gap-10 xl:gap-15 gap-20 items-center">
              <Link to="/" className="flex px-4 py-2 hover:text-gray-300">
                <img src={logo} alt="logo" className="w-20 cursor-pointer" />
              </Link>
              <Link to="/Factory" className="text-white px-2 py-2 hover:text-gray-300">Factory</Link>
              <Link to="/Farm" className="text-white px-3 py-2 hover:text-gray-300">Farm</Link>
              <Link to="/Hall" className="text-white px-3 py-2 hover:text-gray-300">Hall</Link>
              
              <button
                onClick={() => handleClick(meme)}

                className="flex flex-col text-white text-xl px-4 py-2 hover:text-gray-300"
              >
                <span className="text-white">Degen</span>
                <span className="text-white">(BETA)</span>
              </button>

              <div className="relative flex items-center justify-between mb-6 text-left">
                <NetworkSelectMini isMini={false}  changeNetwork={changeNetwork} Network={Network}/>
              </div>

              <div className="flex items-center gap-3 z-80">
                <SignupButton />
                {!address && <LoginButton />}
              </div>

            </nav>
            <div className="flex md:hidden items-center ml-auto py-4 px-3">
              {/* Logo */}
              <Link to="/" className="flex items-center mr-4 hover:text-gray-300">
                <img src={logo} alt="logo" className="w-10 h-auto cursor-pointer" />
              </Link>
              
              {/* Botón de menú */}
              <button onClick={handleToggleClick} className="text-white cursor-pointer">
                {toggleMenu ? (
                  <AiOutlineClose fontSize={28} />
                ) : (
                  <HiMenuAlt4 fontSize={28} />
                )}
              </button>
            </div>

            {toggleMenu && (
              <ul className="fixed z-20 top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-center rounded-md bg-black text-white animate-slide-in toggle-menu">
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
                  <button
                    onClick={() => handleClick(meme)}

                    className="text-white text-xl px-4 py-2 hover:text-gray-300"
                  >
                    Degen <span className="text-gray-400"></span> (BETA)
                  </button>
                  <li className="my-2 text-xl py-3">
                  {currentAccount ? (
                    <div className="relative inline-block">
                      <button className="text-white font-semibold dropdown-button" onClick={toggleDropdown}>
                        {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <Link to="/Profile" className="text-black text-sm px-4 py-2 hover:text-gray-300">Profile</Link>
                          <div className="py-1">
                            <button onClick={disconnectWallet} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dropdown-button">
                              Disconnect Wallet
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex w-auto items-center gap-3 z-80">
                      <SignupButton />
                      {!address && <LoginButton />}
                    </div>
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
