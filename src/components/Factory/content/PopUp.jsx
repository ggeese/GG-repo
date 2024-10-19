import React, { useState, useEffect, useContext } from "react";
import { Loader } from './'
import { PopUp_2 } from "./"
import { PopUp_3 } from "./"
import { TransactionContext } from '../../../context/TransactionContext';
import { TransactionContextTON } from '../../../context/ContextTON/ContextTON';
import { TransactionContextSOL } from '../../../context/ContextSOL/ContextSOL';
import { TransactionContextETH } from '../../../context/ContextETH/ContextETH';
import TransportMethod from './switch';
import AddLiquidity from './AddLiquidity';
import Wallets from '../../../Wallets';
import { FileUpload } from './'
import info from "../../../../images/info.svg";


const Input2 = ({ placeholder, name_2, type, value, handleChange_2, disabled, className }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="1"
        value={value}
        onChange={(e2) => handleChange_2(e2, name_2)}
        className={className}
        disabled={disabled}
        // Aplicar padding solo al input de tipo 'number'
    />
);

const Textarea = ({ placeholder, name_2, type , value, handleChange_2 }) => (
  <textarea
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e2) => handleChange_2(e2, name_2)}
    className="placeholder:italic resize-none p-2 border text-sm rounded focus:outline-none focus:ring focus:border-blue-300 rounded-lg"
    style={{ maxHeight: '200px', minHeight: '150px', minWidth:'200px', maxWidth:'300px'  }}    // Estilos de Tailwind CSS para el textarea
    maxLength={370} // Limita la entrada a 370 caracteres

  />
);

const Tooltip = ({ message, space }) => (
  <div className="relative flex justify-center items-center group z-2">
    <img src={info} alt="info icon" className="w-auto h-3  cursor-pointer" />
    <div
      className={`absolute flex flex-col items-center hidden group-hover:flex`}
      style={{ bottom: `${space || 3}rem` }} 
    >
      <div className="w-36 p-2 text-xs text-white bg-black rounded-md shadow-lg">
        {message}
      </div>
      <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
    </div>
  </div>
);

function PopUp({visible, onClose}) {
    const { sendTransactionTON } = useContext(TransactionContextTON);
    const { FormData_2, sendTransactionBase, sendTransaction, walletext, handleChange_2, currentAccount, isLoading, TxHash, TxHashPool, Network, changeNetwork, NetworkSelectMini } = useContext(TransactionContext); 
    const { sendTransactionSOL } = useContext(TransactionContextSOL); 
    const { sendTransactionETH } = useContext(TransactionContextETH); 
    const [showMyModalWallets, setShowMyModalWallets] = useState(false);
    const [file, setFile] = useState(null); // Agregar estado para el archivo
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [formularioVisible2, setFormularioVisible2] = useState(false);
    const [showMyModal_2, setShowMyModal_2] = useState(false);
    const [showMyModal_3, setShowMyModal_3] = useState(false);
    const [lastTxHash, setlastTxHash] = useState(""); // Nuevo estado para prevLoadingState
    const [lastTxHashPool, setlastTxHashPool] = useState(""); // Nuevo estado para prevLoadingState
    const [switchState, setSwitchState] = useState("meme"); // Estado para el interruptor
    const [isChecked, setIsChecked] = useState(true);
    const [supplyError, setSupplyError] = useState(''); // Estado para controlar el mensaje de error
    const [description, setDescription] = useState(''); // Estado para el texto del textarea
    const maxCharacters = 370;

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const handleOnClose = (event) => {
        if (event.target.id === 'container_meme') onClose()
    };

      // Actualiza el estado del textarea y verifica la longitud
  const handleTextareaChange = (e2) => {
    const { value } = e2.target;
    if (value.length <= maxCharacters) {
      setDescription(value);
      handleChange_2(e2, 'description'); // Llamada a la función original
    }
  };
    
    //comandos para controlar el pop up 2
    
    const handleOnClose_2 = () => setShowMyModal_2(false);
    const handleOnClose_3 = () => setShowMyModal_3(false);


    const handleOnCloseWallets = () => setShowMyModalWallets(false);


      // Verificar si isLoading cambió de true a false
    useEffect(() => {

      if (lastTxHash !== TxHash) {
        // Ejecutar la función cuando isLoading vuelve a ser false
        setShowMyModal_2(true);
        setlastTxHash(TxHash);
      }

      if (lastTxHashPool !== TxHashPool) {
        // Ejecutar la función cuando isLoading vuelve a ser false
        setShowMyModal_3(true);
        setlastTxHashPool(TxHashPool);
      }
    }, [TxHash, TxHashPool]); // Este efecto se ejecutará cada vez que isLoading cambie
    


    const toggleFormulario = () => {
        setFormularioVisible(!formularioVisible);
      };

    const toggleFormulario2 = () => {
      setFormularioVisible2(!formularioVisible2);
    };


    // Aquí actualizas el estado del archivo en PopUp cuando se selecciona un archivo en FileUpload
    const handleFileSelect = (file) => {
      setFile(file); 
    };

    
    const handleSubmit_2 = (file) => {
      const { MemeName, Symbol, Supply } = FormData_2;

      if (!MemeName || !Symbol || !Supply) return;

      if (Supply < 1000000) {
        setSupplyError('*low supply');
        return; 
      } else {
          setSupplyError(''); 
      }
      
      if (Network === "TON") {
        sendTransactionTON(file);
      } else if (Network === "Solana") {
        sendTransactionSOL(file);
        } else {
          console.log("sended tx")
          sendTransaction(file);
        };
    };
    
    const handleInputChange = (e2, name_2) => {
      const value = e2.target.value;
      handleChange_2(e2, name_2); // Llamada a la función original
  
      // Limpiar el error al escribir en el input de Supply
      if (name_2 === 'Supply') {
          setSupplyError(''); // Limpia el mensaje de error al escribir
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
                        <div className="flex flex-fil items-center">
                          <p className="font-bold p-2">* Name</p>
                        </div>
                          <Input2 placeholder="Golden Geese" name_2="MemeName" type="text" handleChange_2={handleChange_2} className={`placeholder:italic rounded-xl`}/>
                      </div>
                      <div className="flex flex-col items-center p-2 ">  {/* Columna 2 */}
                        <div className="flex flex-fil items-center">
                          <p className="font-bold p-2">* Symbol</p>
                          </div>  
                          <Input2 placeholder="GG" name_2="Symbol" type="text" handleChange_2={handleChange_2} className={`placeholder:italic uppercase rounded-xl`}/>
                      </div>
                      {/*/////////////334001  MIN SUPPLY ///////////////*/}
                      <div className="flex flex-col items-center p-2 ">  {/* Columna 3 */}
                          <div className="flex flex-fil items-center">
                            <p className="font-bold p-2">* Supply</p>
                            <Tooltip 
                              message="Min memecoin supply is 1 million."
                              space={1}
                            />
                          </div>
                          <Input2 placeholder="100,000,000" name_2="Supply" type="number" handleChange_2={handleInputChange} className={`placeholder:italic rounded-xl`}/>
                          {supplyError && (
                              <p className="text-red-500 text-sm italic mt-1">{supplyError}</p>
                          )}
                      </div>
                  </div>

                  <div className="relative flex items-center text-sm justify-around mb-3 text-left mt-3">
                    <NetworkSelectMini
                    isMini={true}
                    changeNetwork={changeNetwork} Network={Network}
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
                      {/* Primera columna descripcion*/}
                      <div className="flex flex-col items-center flex-1 mb-4 md:mb-0 md:mr-4">  {/* Ajusta los márgenes para la separación */}
                        <div className="flex flex-fil items-center">
                          <p className="font-bold text-center mb-1 mr-2">Description</p>
                        </div>
                        <div className="flex flex-col justify-center items-center p-2 mb-1 italic input-container">
                          <Textarea
                              placeholder="we are people who make memes that goes to da moon!!!!"
                              name_2="description"
                              type="text"
                              handleChange_2={handleTextareaChange}
                              className="resize-none border rounded placeholder:sitalic p-2"
                              // Ajustamos el estilo para que el textarea tenga el mismo aspecto que el input
                              style={{ minHeight: 'auto' }}
                              // Establecemos una altura mínima para el textarea
                          />
                          <p className="flex text-gray-500 text-xs ml-auto mt-1">{description.length}/370</p> {/* Muestra el contador */}

                        </div>
                        {Network !== "Solana" && (
                          <div className="flex flex-col items-center mb-3">
                            <div className="flex flex-fil items-center justify-center">
                              <p className="flex justify-center font-bold p-2">Fee (0 - 1) %</p>
                              <Tooltip 
                                message={
                                  <>
                                    <p className="mb-3">This fee applies to all transfers.</p>
                                    <p className="mb-3">The collected taxes are directed to the creator's wallet address.</p>
                                  </>
                                }
                              space={1}
                            />
                            </div>
                              <div className="flex justify-end">
                                <Input2 placeholder="0.01" name_2="Fee" type="number" handleChange_2={handleChange_2} className={`placeholder:italic rounded-lg`}/>
                              </div>
                          </div>
                        )}

                      </div>

                      {/* Segunda columna imagen */}
                      <div className="flex flex-col flex-1"> {/* Utiliza flex-1 para que esta columna ocupe el espacio restante */}
                        <div className="flex flex-col justify-center items-center">
                          <div className="flex flex-fil items-center">
                            <h1 className="text-center font-bold mr-2">Image</h1>
                          </div>
                        </div>
                        <div className="flex justify-center p-2 mb-7">
                          <FileUpload onFileSelect={handleFileSelect}  />
                        </div>
                        {Network !== "Solana" && (
                          <div className="flex flex-col items-center mb-3">
                            <div className="flex flex-fil justify-center items-center">
                              <input 
                                type="checkbox" 
                                checked={isChecked} 
                                onChange={handleCheckboxChange} 
                                className="mr-2"
                              />
                              <div className="flex flex-fil items-center">
                              <p className="flex font-bold p-2 ">Smart Launch</p>
                              <Tooltip
                                message={
                                  <>
                                    <p className="mb-3">Smart Launch applies a sell fee to the token, which decreases gradually over time.</p>
                                    <p className="mb-3">When the token is first created, the sell fee starts at 100%.</p>
                                    <p className="mb-3">It then reduces in a linear fashion until reaching 0%, according to this specified time frame.</p>
                                  </>
                                }
                                space={1}
                              />

                              </div>
                            </div>

                              <div className="flex flex-fil justify-end items-center gap-3">
                                <Input2 placeholder="1" name_2="ProtectInput" type="number" handleChange_2={handleChange_2} disabled={!isChecked} className={`placeholder:italic w-24 rounded-lg`} />
                                <select
                                  onChange={(e2) => handleChange_2(e2, 'Timeframe')}
                                  className="border p-2 rounded-xl w-24"
                                      >
                                    <option value={60}>Hours</option>
                                    <option value={60 * 24}>Days</option>
                                    <option value={60 * 24 * 7}>Weeks</option>
                                    <option value={60 * 24 * 30}>Months</option>
                                    <option value={60 * 24 * 30 * 12}>Years</option>

                                </select>
                              </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center font-goldeng">
                      <button className="py-1" onClick={toggleFormulario2}>
                        {formularioVisible2 ? "Less Options" : "Social Media"}
                      </button>
                    </div>
                      {formularioVisible2 && (
                    <div>
                      <div className="border-t-2 border-dashed border-[#9c9c9c] w-full mt-4"></div>

                      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center mt-3 gap-3">
                        <div className="flex flex-col">

                          <div className="flex flex-col mb-3">
                            <div className="flex flex-fil items-center justify-center">
                              <p className="flex justify-center font-bold mr-2">Twitter</p>
                            </div>
                              <div className="flex justify-end">
                                  <p className="flex justify-center p-2 italic">twitter.com/</p>
                                  <Input2 placeholder="GeesesGolden" name_2="Twitter" type="text" handleChange_2={handleChange_2} className={`placeholder:italic w-auto p-2 border rounded-lg`}/>
                              </div>
                          </div>
                          <div className="flex flex-col items-center mb-3">
                              <div className="flex flex-fil items-center justify-center">
                                <p className="flex font-bold justify-center mr-2">Web Page</p>
                              </div>
                              <Input2 placeholder="www.yourmeme.com" name_2="Website" type="text" handleChange_2={handleChange_2} className={`placeholder:italic w-64 p-2 border rounded-lg`}/>
                          </div>




                        </div>

                        <div className="flex flex-col">

                          <div className="flex flex-col mb-3">
                            <div className="flex flex-col mb-3">
                              <div className="flex flex-fil items-center justify-center">
                                <p className="flex justify-center font-bold mr-2">Twitch</p>
                                <Tooltip 
                                  message="This channel will appear in the Degen section, allowing you to watch live streams in real time."
                                  space={1}
                                />
                              </div>
                              <div className="flex justify-end">
                                  <p className="flex justify-center p-2 italic">twitch.tv/</p>
                                  <Input2 placeholder="gg" name_2="Twitch" type="text" handleChange_2={handleChange_2} className={`placeholder:italic rounded-lg`}/>
                              </div>
                            </div>
                            <div className="flex flex-fil items-center justify-center">
                              <p className="flex justify-center font-bold mr-2">Discord</p>
                            </div>
                            <div className="flex justify-end">
                                <p className="flex justify-center p-2 italic">discord.com/</p>
                                <Input2 placeholder="invite/FfeHwrqdAY" name_2="Discord" type="text" handleChange_2={handleChange_2} className={`placeholder:italic rounded-lg`}/>
                            </div>
                          </div>



                        </div>
                      </div>
                    </div>
                      )}
                  </div>
                    )}


                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div className="flex justify-center">
                      {currentAccount ? (

                        <div className="flex p-4 text-xl font-goldeng mt-3">
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
          <PopUp_3 onClose_3 = {handleOnClose_3} visible_3 = {showMyModal_3}/>
          <Wallets onCloseWallets={handleOnCloseWallets} visibleWallets={showMyModalWallets} />
        </div>

    )
}
export default PopUp;
