import React, { useState, useEffect, useContext, useRef } from "react";
import { Loader } from './'
import { PopUp_2 } from "./"
import { TransactionContext } from '../../../context/TransactionContext';
import { TransactionContextTON } from '../../../context/ContextTON/ContextTON';
import { TransactionContextSOL } from '../../../context/ContextSOL/ContextSOL';
import { TransactionContextETH } from '../../../context/ContextETH/ContextETH';
import { NetworkSelectMini } from '../../../context/Network/NetworkSelect';
import TransportMethod from './switch';
import AddLiquidity from './AddLiquidity';
import Wallets from '../../../Wallets';
import { FileUpload } from './'


const Input2 = ({ placeholder, name_2, type, value, handleChange_2 }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="1"
        value={value}
        onChange={(e2) => handleChange_2(e2, name_2)}
        className={`placeholder:italic ${type === 'number' ? 'font-normal px-2' : ''}`}
        // Aplicar padding solo al input de tipo 'number'
    />
);

const Textarea = ({ placeholder, name_2, type , value, handleChange_2 }) => (
  <textarea
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e2) => handleChange_2(e2, name_2)}
    className="placeholder-italic resize-none p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
    style={{ maxHeight: '200px', minHeight: '150px', minWidth:'200px', maxWidth:'300px'  }}    // Estilos de Tailwind CSS para el textarea
  />
);


function PopUp({visible, onClose}) {
    const { sendTransactionTON } = useContext(TransactionContextTON);
    const { FormData_2, sendTransactionBase, walletext, handleChange_2, currentAccount, isLoading, TxHash, Network } = useContext(TransactionContext); 
    const { sendTransactionSOL } = useContext(TransactionContextSOL); 
    const { sendTransactionETH } = useContext(TransactionContextETH); 
    const [showMyModalWallets, setShowMyModalWallets] = useState(false);
    const [file, setFile] = useState(null); // Agregar estado para el archivo
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [showMyModal_2, setShowMyModal_2] = useState(false);
    const [lastTxHash, setlastTxHash] = useState(""); // Nuevo estado para prevLoadingState
    const [switchState, setSwitchState] = useState("meme"); // Estado para el interruptor

    const handleOnClose = (event) => {
        if (event.target.id === 'container_meme') onClose()
    };

    //comandos para controlar el pop up 2
    
    const handleOnClose_2 = () => setShowMyModal_2(false);

    const handleOnCloseWallets = () => setShowMyModalWallets(false);


      // Verificar si isLoading cambió de true a false
    useEffect(() => {

      if (lastTxHash !== TxHash) {
        // Ejecutar la función cuando isLoading vuelve a ser false
        setShowMyModal_2(true);
        setlastTxHash(TxHash);
      }
    }, [TxHash]); // Este efecto se ejecutará cada vez que isLoading cambie

    const toggleFormulario = () => {
        setFormularioVisible(!formularioVisible);
      };

    // Aquí actualizas el estado del archivo en PopUp cuando se selecciona un archivo en FileUpload
    const handleFileSelect = (file) => {
      setFile(file); 
    };

    
    const handleSubmit_2 = (file) => {
      const { MemeName, Symbol, Supply } = FormData_2;
      
      if (!MemeName || !Symbol || !Supply) return;
      
      if (Network === "TON") {
        sendTransactionTON(file);
      } else if (Network === "Solana") {
        sendTransactionSOL(file);
      } else {
        if (walletext === "Base Wallet") {
          sendTransactionBase(file);
        } else{
          sendTransactionETH(file)};
      }
    };
    
      

    if (!visible) return null;

    return (
        <div 
          id="container_meme"
          onClick={handleOnClose} 
          className="fixed z-30 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="relative flex flex-col justify-center bg-white rounded-2xl p-2 overflow-y-auto">
            <button 
              className="absolute top-2 right-2 p-1 sm:p-2 rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-white border border-zinc-500 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              onClick={onClose}>
                X
            </button>
            
              <div className="flex flex-col p-3 items-center max-h-screen sm:max-h-screen lg:max-h-screen md:max-h-screen">
              <TransportMethod switchState={switchState} setSwitchState={setSwitchState}/>
              {switchState === "meme" ? (
                <div>
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center">

                      <div className="flex flex-col items-center p-2 ">  {/* Columna 1 */}
                          <p className="font-bold p-2">* Name your meme:</p>
                          <Input2 placeholder="Golden Goose" name_2="MemeName" type="text" handleChange_2={handleChange_2} />
                      </div>
                      <div className="flex flex-col items-center p-2 ">  {/* Columna 2 */}
                          <p className="font-bold p-2">* Symbol:</p>
                          <Input2 placeholder="GOLDENG" name_2="Symbol" type="text" handleChange_2={handleChange_2} />
                      </div>
                      {/*/////////////334001  MIN SUPPLY ///////////////*/}
                      <div className="flex flex-col items-center p-2 ">  {/* Columna 3 */}
                          <p className="font-bold p-2">* Supply:</p>
                          <Input2 placeholder="100,000,000" name_2="Supply" type="number" handleChange_2={handleChange_2} />
                      </div>
                  </div>

                  <div className="relative flex items-center justify-around mb-6 text-left mt-6">
                    <NetworkSelectMini
                    />
                  </div>
                  <div className="flex justify-center font-goldeng">
                    <button className="p-4" onClick={toggleFormulario}>
                      {formularioVisible ? "Less Options" : "More Options"}
                    </button>
                  </div>

           
                  {formularioVisible && (
                  <div>
                    <div className="flex flex-col sm:flex-row">
                      {/* Primera columna */}
                      <div className="flex flex-col flex-1 mb-4 md:mb-0 md:mr-4">  {/* Ajusta los márgenes para la separación */}
                        <p className="font-bold text-center mb-2">Brief description:</p>
                        <div className="flex flex-col justify-center items-center p-2 italic input-container">
                          <Textarea
                              placeholder="we are people who make memes that goes to da moon!!!!"
                              name_2="description"
                              type="text"
                              handleChange_2={handleChange_2}
                              className="resize-none border rounded p-2"
                              // Ajustamos el estilo para que el textarea tenga el mismo aspecto que el input
                              style={{ minHeight: 'auto' }}
                              // Establecemos una altura mínima para el textarea
                          />
                      </div>

                    </div>

                    {/* Segunda columna */}
                    <div className="flex flex-col flex-1"> {/* Utiliza flex-1 para que esta columna ocupe el espacio restante */}
                      <div className="flex flex-col justify-center font-bold">
                        <h1 className="text-center">Image:</h1>
                      </div>
                      <div className="flex justify-center p-2">
                        <FileUpload onFileSelect={handleFileSelect}  />
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center">
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                          <p className="flex font-bold justify-center">Web Page</p>
                          <Input2 placeholder="www.yourmeme.com" name_2="Website" type="text" handleChange_2={handleChange_2} />
                      </div>

                      <div className="flex flex-col">
                          <p className="flex justify-center font-bold">Twitter</p>
                          <div className="flex justify-end">
                              <p className="flex justify-center p-2 italic">twitter.com/</p>
                              <Input2 placeholder="GoldenGoosememe" name_2="Twitter" type="text" handleChange_2={handleChange_2} className="border-none outline-none" />
                          </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex flex-col">
                          <p className="flex justify-center font-bold">Discord</p>
                          <div className="flex justify-end">
                              <p className="flex justify-center p-2 italic">discord.com/</p>
                              <Input2 placeholder="invite/FfeHwrqdAY" name_2="Discord" type="text" handleChange_2={handleChange_2} />
                          </div>
                      </div>

                      <div className="flex flex-col">
                          <p className="flex justify-center font-bold">Twitch</p>
                          <div className="flex justify-end">
                              <p className="flex justify-center p-2 italic">twitch.tv/</p>
                              <Input2 placeholder="goldeng" name_2="Twitch" type="text" handleChange_2={handleChange_2} />
                          </div>
                      </div>
                    </div>
                  </div>
                    {Network != "Solana" && (
                        <>
                          <p className="flex justify-center justify-center font-bold p-2">Fee (0 - 5) %</p>
                          <p className="flex justify-center justify-center text-sm italic">(Transaction Fee)</p>
                          <div className="flex justify-center">
                            <Input2 placeholder="0.01" name_2="Fee" type="number" handleChange_2={handleChange_2} />
                            <p className="flex justify-center font-bold p-2">% </p>
                          </div>
                        </>
                      )}

                  </div>
                    )}


                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div className="flex justify-center">
                      {currentAccount ? (
                        <div className="flex p-4 text-xl font-goldeng">
                          <button
                            className="px-10 py-4 bg-black text-xl text-white rounded-2xl shadow-md hover:bg-[#9e701f] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={() => handleSubmit_2(file)} // Pasar 'file' como parámetro
                          >
                            Create Meme
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-black py-4 px-4 mx-2 rounded-xl mt-7 cursor-pointer hover:bg-[#9e701f]"
                          onClick={() => setShowMyModalWallets(true)}
                        >
                          <p className="text-xl text-white">Connect Wallet</p>
                        </button>
                      )}
                    </div>
                  )}
                  
              </div>
                ) : (
                  <div className="flex flex-col items-center p-2">
                    <AddLiquidity/>
                  </div>
                )}
              </div>
              
            </div>
            
          <PopUp_2 onClose_2 = {handleOnClose_2} visible_2 = {showMyModal_2}/>
          <Wallets onCloseWallets={handleOnCloseWallets} visibleWallets={showMyModalWallets} />
          </div>

    )
}
export default PopUp;
