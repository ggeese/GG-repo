import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TransactionContext } from './context/TransactionContext';
import header from "../images/header.jpeg";

import logo from "../images/logo.png";
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const location = useLocation(); // Usando useLocation para acceder a la ruta actual

  if (location.pathname !== "/") {
    return (
      <header className="relative w-full flex md:justify-center justify-between items-center p-4">
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${header})`, filter: 'blur(1px)' }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex justify-center items-center w-full">
        
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
          <nav className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
            <Link to="/" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Home</Link>
            <Link to="/Factory" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Factory</Link>
            <Link to="/Farm" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Farm</Link>
            {currentAccount ? (
              <p className="text-white text-2xl text-base font-semibold">
                {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
              </p>
            ) : (
              <button
                className="bg-[#d98b3a] py-5 px-20 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                onClick={connectWallet}
              >
                <p className="text-2xl text-white">Connect Wallet</p>
              </button>
            )}
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
            </ul>
          )}
        </div>
        </div>

      </header>
    );
  }
}

export default App;
