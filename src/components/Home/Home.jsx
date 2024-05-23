import React, { useState, useEffect, useRef } from 'react';
import Welcome from './content/Welcome';
import Info from './content/Info';
import Token_Info from './content/Token_Info';
import Hatching from './content/Hatching';
import FAQ from './content/FAQ';
import goose_static from "../../../images/goose_static.png"; 
import piece from "../../../images/piece.png";
import bg_1 from "../../../images/bg_1.jpg"; 
import bg_1_1 from "../../../images/bg_1_1.png"; 
import bg_2 from "../../../images/bg_2.jpg"; 
import bg_3 from "../../../images/bg_3.jpg"; 
import bg_4 from "../../../images/bg_4.jpg"; 
import bg_5 from "../../../images/bg_5.jpg"; 
import cloud_red from "../../../images/cloud_red.png"; 
import copy_logo from "../../../images/copy.svg";


const Home = () => {
  const [contractAddress] = useState('CcxreSMUycHVRGUxbSTMrPG9GgRiZ9A8pKFzn6G6YAM2');
  const [currentSection, setCurrentSection] = useState('');
  const tokenInfoRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [showPiece, setShowPiece] = useState(false); // Estado para manejar la visibilidad de 'piece'
  const [tokenInfoVisible, setTokenInfoVisible] = useState(false); // Estado para manejar la visibilidad de 'piece' en Token_Info

  const copyContractAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // Duración del efecto de clic
  };

  const togglePiece = () => {
    setShowPiece(!showPiece); // Alternar la visibilidad de 'piece'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection('Token_Info');
            setTokenInfoVisible(true); // Mostrar 'piece' cuando Token_Info está visible
          } else if (currentSection === 'Token_Info') {
            setCurrentSection('');
            setTokenInfoVisible(false); // Ocultar 'piece' cuando Token_Info deja de estar visible
          }
        });
      },
      { threshold: 0.5 } // Ajusta este valor según tus necesidades
    );

    if (tokenInfoRef.current) {
      observer.observe(tokenInfoRef.current);
    }
    return () => {
      if (tokenInfoRef.current) {
        observer.unobserve(tokenInfoRef.current);
      }
    };
  }, [currentSection]);

  return (
    <div>
      {/* Sección Welcome con fondo bg_1 */}
      <div className="min-h-screen bg-black relative">
        {/* Primer fondo */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg_1})` }}></div>
        <div className="absolute inset-0 z-10 bg-cover bg-center" style={{ backgroundImage: `url(${bg_1_1})` }}></div>

        <div className="absolute left-10 top-1/4">
          <div className="move-right-animation inline-block">
            <div className="">
              <div className="animatedSprite"></div>
            </div>
          </div>
        </div>
        <div className="absolute right-20 top-1/3 z-2 scale-90">
          <div className="move-left-animation inline-block">
            <div className="scale-90">
              <div className="animatedSprite"></div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 z-2">
          <div className="move-left-animation inline-block">
            <div className="scale-50">
              <div className="animatedSprite"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 mt-20 left-5 z-2">
          <div className="move-right-animation inline-block">
            <div className="scale-75">
              <div className="animatedSprite"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Welcome />
        </div>
      </div>

      {/* Sección Token_Info con fondo bg_2 */}
      <div  id="faq" ref={tokenInfoRef} className="min-h-screen" style={{ backgroundImage: `url(${bg_2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Token_Info />
      </div>

      {/* Sección Info con fondo bg_3 */}
      <div className="min-h-screen" style={{ backgroundImage: `url(${bg_3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Hatching />
      </div>

      {/* Sección Hatching con fondo bg_4 */}
      <div  className="min-h-screen" style={{ backgroundImage: `url(${bg_4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <FAQ />
      </div>

      {/* Sección FAQ con fondo bg_5 */}
      <div className="min-h-screen" style={{ backgroundImage: `url(${bg_5})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>

      {/* Imagen fija en la esquina inferior derecha */}
      <div className="fixed flex flex-col bottom-0 right-0 z-20 items-end">
        {(showPiece || tokenInfoVisible) && ( // Mostrar 'piece' si showPiece o tokenInfoVisible son true
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-black transform transition-all rounded-full shadow-lg" style={{
              clipPath: 'polygon(50% 10%, 75% 20%, 90% 40%, 80% 60%, 70% 70%, 60% 80%, 50% 85%, 30% 80%, 20% 70%, 10% 60%, 5% 50%, 10% 30%, 20% 20%, 40% 10%)'
            }}></div>
            <button>
            <a href="#faq">
              <img src={piece} alt="piece" className="relative transform transition-all w-40 h-auto sm:w-44 md:w-52 lg:w-72 xl:w-80 hover:scale-110" />
            </a>
            </button>
          </div>
        )}
        <img
          src={goose_static}
          alt="Goose"
          className="transform transition-all hover:scale-110 w-40 h-auto sm:w-44 md:w-52 lg:w-72 xl:w-80 object-cover cursor-pointer" // Ajusta el tamaño de la imagen según sea necesario
          onClick={togglePiece} // Agregar evento onClick
        />
      </div>

      {/* Botón con contrato encima de la nube */}
      <div className="fixed flex flex-col top-0 left-0 z-20 items-start">
        <button
          className={`relative transform transition-all ${clicked ? 'scale-120' : 'hover:scale-110'}`}
          onClick={copyContractAddress}
        >
          <img
            src={cloud_red}
            alt="cloud"
            className="w-40 h-auto sm:w-44 md:w-52 lg:w-72 xl:w-80 object-cover" // Ajusta el tamaño de la imagen según sea necesario
          />
          <div
            className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-4 rounded-full focus:outline-none items-center text-center"
          >
            <p className="text-black font-bold mb-1">CONTRACT</p>
            <div className="flex items-center">
              <img src={copy_logo} alt="Copy" className="w-6 h-6 mr-2" />
              <span>{contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Home;
