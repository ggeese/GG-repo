import { TransactionContext } from '../../../context/TransactionContext';
import React, { useState, useContext } from "react";
import { Loader } from './'
import PopUp from "./PopUp"
import image_farm from "../../../../images/farm.jpeg";


const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    />
);

const Input2 = ({ placeholder, name_2, type, value, handleChange_2 }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e2) => handleChange_2(e2, name_2)}
    />
);

const Input3 = ({ placeholder, name_3, type, value, handleChange_3 }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e3) => handleChange_3(e3, name_3)}
    />
);

const Input4 = ({ placeholder, name_4, type, value, handleChange_4 }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e4) => handleChange_4(e4, name_4)}
    />
);

const Welcome = () => {
  const { FormData, FormData_2, FormData_3, FormData_4, sendTransaction, sendTransaction_2, sendTransaction_3, sendTransaction_3_unstake, sendTransaction_4 , handleChange, handleChange_2, handleChange_3, handleChange_4 } = useContext(TransactionContext); 

  //boton de aparicion y desaparicion de formulario
  const [formularioVisible, setFormularioVisible] = useState(false);

  const [showMyModal, setShowMyModal] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const handleOnClose = () => setShowMyModal(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleFormulario = () => {
    setFormularioVisible(!formularioVisible);
  };


  const handleSubmit = (e) => {
    const { addressTo, amount, message } = FormData;

    e.preventDefault();

    if(!addressTo || !amount || !message) return;

    sendTransaction();
  }

  const handleSubmit_2 = (e2) => {
    const { MemeName, Symbol, Supply } = FormData_2;

    e2.preventDefault();

    if(!MemeName || !Symbol || !Supply) return;

    sendTransaction_2();    
  }
  

  const handleSubmit_3 = (e3) => {
    const { stake } = FormData_3;

    e3.preventDefault();

    if(!stake ) return;

    sendTransaction_3();    
  }

  const handleSubmit_3_unstake = (e3) => {
    const { unstake } = FormData_3;

    e3.preventDefault();

    if(!unstake ) return;

    sendTransaction_3_unstake();    
  }

  
  const handleSubmit_4 = (e4) => {
    const { parameter } = FormData_4;

    e4.preventDefault();

    if(!parameter ) return;

    sendTransaction_4();    
  }

  
  handleSubmit_3_unstake


  return (
    
    <div>
        <div className="flex justify-start items-stretch">
          {/* Contenedor principal para el texto */}
          <div className="bg-gradient-to-r p-6 rounded-lg shadow-xl w-1/2">

            <h1 className="text-3xl font-bold text-white mb-4 text-center">
              Create your own meme
            </h1>
            <p className="text-white text-lg text-center">
              Here you can design memes easily and quickly. Who knows? Maybe your creation will be the next viral phenomenon. Start now and let your creativity fly!
            </p>

            {/* Botón "Create your meme" que activa el popup */}
            <div className="flex justify-center">
              <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded my-10 text-lg"
                      onClick={() => setShowMyModal(true)}>
                  Create your meme
              </button>
            </div>
          </div>

          {/* Contenedor para la imagen, asegurándose de que se expanda para llenar el espacio */}
          <div className="flex justify-center flex-grow">
            <img src={image_farm} alt="logo" className="w-2/3 h-full justify-center object-cover rounded-2xl cursor-pointer" /> {/* Ajusta según necesites */}
          </div>


        </div>
        <div >
          <div className="flex items-center justify-center h-64 bg-gray-800">
            <div className="text-white font-bold text-5xl">
            Total Memes Created: 213215132
            </div>
          </div>
        </div>



        <div>
          <p className = "text-white text-base font-semibold">
                  Stake your meme
          </p>
        </div>
        <div>
          <Input3 placeholder="amount stake" name_3= "stake" type= "number" handleChange_3={handleChange_3} />

          {false ? (
              <Loader/>
            ) : (
              <button
              type="button"
              onClick={handleSubmit_3}
              >
              Stake Meme
              </button>
            )}

        </div>

        <div>
          <Input3 placeholder="amount unstake" name_3= "unstake" type= "number" handleChange_3={handleChange_3} />

          {false ? (
              <Loader/>
            ) : (
              <button
              type="button"
              onClick={handleSubmit_3_unstake}
              >
              Unstake Meme
              </button>
            )}

        </div>

        <div>
        <p className = "text-white text-base font-semibold">
                  Owner Functions
          </p>

        </div>

        <div>
          <Input4 placeholder="value" name_4= "parameter" type= "number" handleChange_4={handleChange_4} />

          {false ? (
              <Loader/>
            ) : (
              <button
              type="button"
              onClick={handleSubmit_4}
              >
              send parameter
              </button>
            )}

        </div>
        <PopUp onClose = {handleOnClose} visible = {showMyModal}/>
    </div>
    
  );
};

export default Welcome;
