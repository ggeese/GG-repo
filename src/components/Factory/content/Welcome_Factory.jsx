import React, { useState } from "react";
import { PopUp } from './';
import goose_pointer from '../../../../images/goose_pointer.png';
import bnb_name from "../../../../images/bnb_name.svg";
import polygon_name from "../../../../images/polygon_name.svg";
import fantom_name from "../../../../images/fantom_name.svg";
import avax_name from "../../../../images/avax_name_2.svg";
import op_name from "../../../../images/op_name_2.svg";
import ethereum_name from "../../../../images/ethereum_name.svg";
import arbitrum_name from "../../../../images/arbitrum_name.svg";
import base_name from "../../../../images/base_name.svg";
import blast_name from "../../../../images/blast_name.svg";
import manta_name from "../../../../images/manta_name.svg";
import linea_name from "../../../../images/linea_name.svg";
import eggs from "../../../../images/eggs.png";

const Welcome_Factory = () => {
  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);

  return (
    <div className="px-3 py-7">
 <div className="flex flex-col mb-7 justify-center md:flex-row items-center gap-8 md:gap-4 lg:gap-8 overflow-hidden">
  {/* Contenedor principal para el texto */}
  <div className="flex flex-col w-full max-w-[420px] md:max-w-[600px] lg:max-w-[570px] bg-white bg-opacity-70 rounded-[20px] overflow-hidden border-3 border-yellow-600 shadow-lg">
    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-goldeng text-center text-black p-3">
      Create your meme
    </h1>
    <p className="text-lg sm:text-2lg md:text-3lg lg:text-4 lg text-center font-goldeng text-black p-3">
    Meming the world across any chain! Join us and memificate with us!!! =) 🚀✨
    </p>
    <div className="flex justify-center mb-10">
      <button
        className="bg-black rounded-3xl hover:bg-yellow-600 px-10 sm:px-16 py-4 sm:py-6 md:px-20 md:py-7 text-xl sm:text-3xl md:text-4xl text-white font-goldeng mt-3"
        onClick={() => setShowMyModal(true)}
      >
        Create
      </button>
    </div>
  </div>
  <div className="flex w-full max-w-[420px] md:max-w-[600px] lg:max-w-[570px] bg-white bg-opacity-70 rounded-[20px] overflow-hidden border-3 border-yellow-600 shadow-lg">
    <img src={eggs} alt="eggs" className="w-full h-full object-cover" />
  </div>
</div>


      {/* Contenedor para el segundo texto */}
      <div className="flex justify-center relative">
        {/* Contenedor para el texto superpuesto */}
        <div className="flex justify-center flex-col transform text-white font-goldeng text-xl sm:text-1xl md:text-3xl lg:text-5xl text-center">
          <div className="bg-black rounded-t-3xl">
            <p className='p-2 sm:p-2 md:p-3 lg::p-5'>MEMES CREATED:</p>
            <p className='p-2 sm:p-2 md:p-3 lg::p-5'>1,515</p>
          </div>

          <div className="relative p-4 w-full sm:w-auto sm:max-w-auto sm-h-10 md:w-full md:max-w-[840px] lg:w-[960px] lg:max-w-full xl:w-[1080px] border-t-3 border-b-3 md:border-3 border-yellow-600 md:rounded-b-3xl bg-black from-gray-300 to-transparent overflow-hidden">
            <div className="flex flex-fil banner animate-slide supportedNetworks z-[0] relative flex items-center h-20 sm:h-10 md:h-20 xl:h-20 gap-1">
              <img src={ethereum_name} alt="ethereum" className="w-full h-full px-2" />
              <img src={bnb_name} alt="bnb_name" className="w-full sm:h-32 h-64" />
              <img src={polygon_name} alt="polygon" className="w-full sm:h-32 h-64" />
              <img src={avax_name} alt="avax" className="w-full h-full px-2" />
              <img src={arbitrum_name} alt="arbitrum" className="w-full h-full px-2" />
              <img src={fantom_name} alt="fantom_name" className="w-full h-full px-2" />
              <img src={op_name} alt="op_name" className="w-full h-full px-2" />
              <img src={base_name} alt="base" className="w-full h-full px-2 inverted-image" />
              <img src={manta_name} alt="manta" className="w-full sm:h-32 h-64" />
              <img src={blast_name} alt="blast" className="w-full h-full px-2 inverted-image" />
              <img src={linea_name} alt="linea" className="w-full h-full px-4" />
              <img src={ethereum_name} alt="ethereum" className="w-full h-full px-2" />
              <img src={bnb_name} alt="bnb_name" className="w-full h-64" />
              <img src={polygon_name} alt="polygon" className="w-full sm:h-32 h-64 px-2" />
              <img src={avax_name} alt="avax" className="w-full h-full px-2" />
            </div>
          </div>

          <div className="relative">
            {/* Imagen para pantallas grandes */}
            <div className="hidden md:block">
              <img src={goose_pointer} alt="Imagen" className="absolute bottom-[-50px] right-[-100px] w-auto h-60 lg: sm:right-[-50px] lg:right-[-150px]" />
            </div>
          </div>
        </div>
      </div>

      <PopUp onClose={handleOnClose} visible={showMyModal} />
    </div>
  );
};

export default Welcome_Factory;
