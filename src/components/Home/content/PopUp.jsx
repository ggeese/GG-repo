import React, { useState, useContext } from "react";
import { Loader } from './'
import { TransactionContext } from '../../../context/TransactionContext';

const Input2 = ({ placeholder, name_2, type, value, handleChange_2 }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e2) => handleChange_2(e2, name_2)}
      />
  );


export default function PopUp({visible, onClose}) {
    
    const { FormData_2, sendTransaction_2, handleChange_2 } = useContext(TransactionContext); 

    const [formularioVisible, setFormularioVisible] = useState(false);

    const handleOnClose = (event) => {
        if (event.target.id === 'container_meme') onClose()
    };

    const toggleFormulario = () => {
        setFormularioVisible(!formularioVisible);
      };

    const handleSubmit_2 = (e2) => {
        const { MemeName, Symbol, Supply } = FormData_2;
    
        e2.preventDefault();
    
        if(!MemeName || !Symbol || !Supply) return;
    
        sendTransaction_2();    
      }

    if (!visible) return null;

    return (
        <div 
            id= 'container_meme'
            onClick={handleOnClose} 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">

            <div className="bg-white p-2 rounded">
                <div class="flex justify-around items-center">
                     <p>Create your Meme</p>
                      <button class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 float-right"
                          onClick={onClose}>X</button>
               

                </div>
               
            <div>
          <Input2 placeholder="Name your meme" name_2= "MemeName" type= "text" handleChange_2={handleChange_2} />
          <Input2 placeholder="Symbol" name_2= "Symbol" type= "text" handleChange_2={handleChange_2} />
          <Input2 placeholder="Max Supply" name_2= "Supply" type= "number" handleChange_2={handleChange_2} />

          <div>

            <button className= "float-right"
             onClick={toggleFormulario}>
                Advanced Options</button>

          </div>

           
            {formularioVisible && (
                <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="font-bold">Web Page</p>
                    <Input2 placeholder="Web Page" name_2="Website" type="text" handleChange_2={handleChange_2} />
                    <p class="font-bold">Discord</p>
                    <Input2 placeholder="Discord" name_2="Discord" type="text" handleChange_2={handleChange_2} />
                    <p class="font-bold">Twitter</p>
                    <Input2 placeholder="Twitter" name_2="Twitter" type="text" handleChange_2={handleChange_2} />
                </div>
            </div>

            )}
        
                  {false ? (
              <Loader/>
            ) : (
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="button"
              onClick={handleSubmit_2}
              >
              Create Meme
              </button>
            )}
         </div>
         </div>
        </div>
    )
}
