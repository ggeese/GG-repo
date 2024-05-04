import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TransactionContext } from './context/TransactionContext';
import header from "../images/header.jpeg";
import logo from "../images/gg_coin_2.png";
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const location = useLocation(); // Usando useLocation para acceder a la ruta actual

  if (location.pathname !== "/") {
    return (
      <header className="relative w-full bg-black flex md:justify-center justify-between items-center p-4">

      <div className="relative z-7 flex justify-center items-center w-full">
        
        <div className=" justify-between items-center">
          
          <nav className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
            <Link to="/" className="text-white text-2xl px-20 py-2 hover:text-gray-300"><img src={logo} alt="logo" className="w-32 cursor-pointer" /></Link>
            <Link to="/Factory" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Factory</Link>
            <Link to="/Farm" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Farm</Link>
            <Link to="/Points" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Points</Link>
            <div>
              {currentAccount ? (
                <p className="text-white text-2xl text-base font-semibold">
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                </p>
              ) : (
                <button
                  className="bg-white py-4 px-10 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                    onClick={connectWallet}
                >
                  <p className="text-2xl text-black">Connect Wallet</p>
                </button>
                
              )}
            </div>

          </nav>

            

          <div className="flex relative ml-auto">
            {!toggleMenu && (
              <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer " onClick={() => setToggleMenu(true)} />
            )}
            {toggleMenu && (
              <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
            )}
          </div>
          {toggleMenu && (
            <ul
              className="z-10 fixed top-0 right-0 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
              flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
              <Link to="/" className="text-xl my-2 text-white">Home</Link>
              <Link to="/Factory" className="text-xl my-2 text-white">Factory</Link>
              <Link to="/Farm" className="text-xl my-2 text-white">Farm</Link>
              <Link to="/Points" className="text-xl my-2 text-white">Points</Link>
              <div>

                {currentAccount ? (
                  <p className="text-black text-2xl text-base font-semibold">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </p>
                ) : (
                  <button
                    className="bg-white py-4 px-10 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                      onClick={connectWallet}
                  >
                    <p className="text-2xl text-black">Connect Wallet</p>
                  </button>
                  
                )}
              </div>
            </ul>
          )}
        </div>

        </div>

      </header>
    );
  }
}

export default App;
