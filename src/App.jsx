import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TransactionContext } from './context/TransactionContext';
import { Factory  } from './components/Factory';
import { Farm  } from './components/Farm';
import { Home  } from './components/Home';

import logo from "../images/logo.png";
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const Info = () => <Link to="/Farm" >Farm</Link>



const App = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const location = useLocation(); // Usando useLocation para acceder a la ruta actual

  if (location.pathname !== "/") {

    return (    
      <header className="w-full flex md:justify-center justify-between items-center p-4 gradient-bg-header">
      
        <div className="flex justify-between items-center">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />

          <nav className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
            <Link to="/" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Home</Link>
            <Link to="/Factory" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Factory</Link>
            <Link to="/Farm" className="text-white text-2xl px-20 py-2 hover:text-gray-300">Farm</Link>
            

            {currentAccount ? (
              <p className="text-white text-2xl text-base font-semibold">
                Wallet Connected
              </p>
            ) : (
              <button
                className="bg-[#d98b3a] py-5 px-20 mx-2 rounded-xl cursor-pointer hover:bg-[#9e701f]"
                onClick={connectWallet}>
                <p className="text-2xl">
                  Connect Wallet</p>
              </button>
            )}
          </nav>
          
          <div className="flex relative ml-auto ">
            {/* Toggle button for mobile menu */}
            {!toggleMenu && (
              <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer " onClick={() => setToggleMenu(true)} />
            )}
            {toggleMenu && (
              <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
            )}
          </div>
          
          {/* Mobile menu */}
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
      </header>
  );
  }
}
  
export default App;
