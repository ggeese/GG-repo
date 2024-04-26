import { TransactionContext } from '../../../context/TransactionContext';
import React, { useState, useContext } from "react";
import { Loader } from './'
import { PopUp } from "./"
import image_farm from "../../../../images/farm.jpeg";



const Welcome_Factory = () => {
  const { FormData_3, sendTransaction_3_unstake } = useContext(TransactionContext); 

  //boton de aparicion y desaparicion de formulario

  const [showMyModal, setShowMyModal] = useState(false);

  const handleOnClose = () => setShowMyModal(false);

  const handleSubmit_3_unstake = (e3) => {
    const { unstake } = FormData_3;

    e3.preventDefault();

    if(!unstake ) return;

    sendTransaction_3_unstake();    
  }

  return (
    <div>
    <div className="flex columns-2">
        <div className="flex justify-center items-stretch p-6">
          {/* Contenedor principal para el texto */}
          <div className="bg-gradient-to-r p-6 rounded-2xl shadow-2xl ">

            <h1 className="text-3xl font-bold  text-black p-8 text-center">
              Create your own meme
            </h1>
            <p className="text-black text-lg text-center p-8">
              Here you can design memes easily and quickly. Who knows? Maybe your creation will be the next viral phenomenon. Start now and let your creativity fly!
            </p>

            {/* Botón "Create your meme" que activa el popup */}
            <div className="flex justify-around">
              <button className="bg-orange-500 rounded-2xl hover:bg-blue-700 text-3xl text-white font-bold p-10 rounded my-10 text- self-end"
                      onClick={() => setShowMyModal(true)}>
                  Create your meme
              </button>
            </div>
          </div>
        </div>
          {/* Contenedor para la imagen, asegurándose de que se expanda para llenar el espacio */}
          <div className="flex justify-center flex-grow p-6">
            <img src={image_farm} alt="logo" className="h-full justify-center object-cover rounded-2xl cursor-pointer" /> {/* Ajusta según necesites */}
          </div>
      </div>
        
        <div >
          <div className="flex items-center justify-center h-64 bg-gray-800">
            <div className="text-white font-bold text-5xl">
            Total Memes Created: 213215132
            </div>
          </div>
        </div>



        <PopUp onClose = {handleOnClose} visible = {showMyModal}/>

        </div>

    
  );
};

export default Welcome_Factory;
