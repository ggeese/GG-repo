import { TransactionContext } from '../../../context/TransactionContext';
import React, { useState, useContext } from "react";
import { PopUp } from './';
import image_farm from '../../../../images/marble_texture.jpeg';
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
  const { FormData_3, sendTransaction_3_unstake } = useContext(TransactionContext);

  const [showMyModal, setShowMyModal] = useState(false);

  const handleOnClose = () => setShowMyModal(false);

  const handleSubmit_3_unstake = (e3) => {
    const { unstake } = FormData_3;
    e3.preventDefault();
    if (!unstake) return;
    sendTransaction_3_unstake();
  };

  return (
    <div style={{ backgroundImage: `url(${image_farm})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="flex flex-col justify-center md:flex-row items-center gap-8 md:gap-4 lg:gap-8 px-5 py-20">
        {/* Contenedor principal para el texto */}
        <div className="self-stretch flex flex-col w-full max-w-[420px] lg:w-[780px] lg:max-w-[980px] bg-white rounded-[20px] overflow-hidden border-3 border-black">
          <h1 className="flex justify-center text-8xl text-center font-bold text-black p-5">
            Create your meme
          </h1>
          <p className="text-black text-lg text-center md:text-left p-8">
            Here you can design memes easily and quickly. Who knows? Maybe your
            creation will be the next viral phenomenon. Start now and let your
            creativity fly!
          </p>
          <div className="flex justify-center mb-10">
            <button
              className="bg-orange-500 rounded-3xl hover:bg-blue-700 px-20 py-10 text-5xl text-white font-bold mt-10 self-center"
              onClick={() => setShowMyModal(true)}
            >
              Create
            </button>
          </div>
        </div>
        <div className= "self-stretch flex flex-col w-full max-w-[420px] lg:w-[780px] lg:max-w-[980px] bg-white rounded-[20px] overflow-hidden border-3 border-black">
          <img src={eggs} alt="eggs" className="mt-auto mb-auto"  />

        </div>

  {/* Contenedor para la imagen */}

</div>


      {/* Contenedor para el segundo texto */}
    <div className="flex justify-center relative">
      {/* Contenedor para la imagen */}
      {/* Contenedor para el texto superpuesto */}
      <div className="flex justify-center flex-col transform text-white font-bold text-5xl text-center">
        <div className="bg-black rounded-t-3xl">
          <p className='p-6 text-5xl'>TOTAL MEMES CREATED</p>
          <p className='p-6 text-5xl'>15,156,155</p>
        </div>

      <div className="relative p-4 w-full md:w-full md:max-w-[840px] lg:w-[960px] lg:max-w-full xl:w-[1080px] border-t-3 border-b-3 md:border-3 border-black md:rounded-b-3xl bg-black from-gray-300 to-transparent overflow-hidden">
        <div className="flex flex-fil banner animate-slide supportedNetworks z-[1] relative flex items-center h-1/4 md:h-20 gap-1">
          <img src={ethereum_name} alt="ethereum" className="w-full h-full px-2" />
          <img src={bnb_name} alt="bnb_name" className="w-full h-64" />
          <img src={polygon_name} alt="polygon" className="w-full h-64" />
          <img src={avax_name} alt="avax" className="w-full h-full px-2" />
          <img src={arbitrum_name} alt="arbitrum" className="w-full h-full px-2" />
          <img src={fantom_name} alt="fantom_name" className="w-full h-full px-2" />
          <img src={op_name} alt="op_name" className="w-full h-full px-2" />
          <img src={base_name} alt="base" className="w-full h-full px-2 inverted-image" />
          <img src={manta_name} alt="manta" className="w-full h-64" />
          <img src={blast_name} alt="blast" className="w-full h-full px-2 inverted-image" />
          <img src={linea_name} alt="linea" className="w-full h-full px-4" />
          <img src={ethereum_name} alt="ethereum" className="w-full h-full px-2" />
          <img src={bnb_name} alt="bnb_name" className="w-full h-64" />
          <img src={polygon_name} alt="polygon" className="w-full h-64 px-2" />
          <img src={avax_name} alt="avax" className="w-full h-full px-2" />
        </div>
    </div>
    <div className="md-flex relative">
      {/* Imagen para pantallas grandes */}
      <div className="hidden md:block">
        <img src={goose_pointer} alt="Imagen" className="absolute bottom-[-80px] right-[-200px] w-auto h-60" />
      </div>
    </div>

    </div>
    </div>

      

      <PopUp onClose={handleOnClose} visible={showMyModal} />
    </div>
  );
};

export default Welcome_Factory;
