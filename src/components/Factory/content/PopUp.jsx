import React, { useState, useEffect, useContext, useRef } from "react";
import { Loader } from './'
import { PopUp_2 } from "./"
import { TransactionContext } from '../../../context/TransactionContext';


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
    style={{ height: 'auto', minHeight: '200px' }}    // Estilos de Tailwind CSS para el textarea
  />
);



  function FileUpload({ onFileSelect }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null); // Ref para acceder al input de archivo


    const handleDragOver = (event) => {
        event.preventDefault(); // Evita comportamientos por defecto
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            setFile(file);
            updatePreview(file);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        updatePreview(file);
        onFileSelect(file);
    };

    const handleClick = () => {
      fileInputRef.current.click(); // Activa el input de archivo cuando se hace clic en el área
    };

    const updatePreview = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveFile = () => {
      setFile(null);
      setPreviewUrl(null);
    };



    return (
        <div>
            <div
                onClick={handleClick} // Maneja clic aquí
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex border-dashed border-4 border-gray-300 py-1 px-5 text-center cursor-pointer"
                style={{ minHeight: '200px' }}
            >
                {previewUrl ? (
                  <div className="relative">
                    <div className="flex justify-center">
                      <img src={previewUrl} alt="Preview" className="max-w-full max-h-96 object-contain" />
                    </div>
                    <div className="absolute top-0 right-0">
                      <button onClick={handleRemoveFile} className="text-black rounded-full p-1 cursor-pointer hover:bg-blue-100 text-3xl">
                        X
                      </button>
                    </div>
                  </div>

                ) : (
                  <div className="flex text-center text-gray-500 items-center justify-center">  
                      Drag and drop an image here, or click to select file
                  </div>
              )}
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef} // Referencia al input

                   // ref={input => input && !previewUrl && input.click()} // Automatically trigger click if no file
                />
            </div>

        </div>
    );
}
  


function PopUp({visible, onClose}) {
    
    const { FormData_2, sendTransaction_2, handleChange_2, isLoading, URI_creation } = useContext(TransactionContext); 

    const [file, setFile] = useState(null); // Agregar estado para el archivo

    const [formularioVisible, setFormularioVisible] = useState(false);

    const handleOnClose = (event) => {
        if (event.target.id === 'container_meme') onClose()
    };

    //comandos para controlar el pop up 2

    const [showMyModal_2, setShowMyModal_2] = useState(false);
    const [prevLoadingState, setPrevLoadingState] = useState(false); // Nuevo estado para prevLoadingState
    
    const handleOnClose_2 = () => setShowMyModal_2(false);

      // Verificar si isLoading cambió de true a false
    useEffect(() => {
    if (isLoading === false && prevLoadingState === true) {
        // Ejecutar la función cuando isLoading vuelve a ser false
        setShowMyModal_2(true);
      }
    setPrevLoadingState(isLoading);
    }, [isLoading]); // Este efecto se ejecutará cada vez que isLoading cambie

    const toggleFormulario = () => {
        setFormularioVisible(!formularioVisible);
      };

    // Aquí actualizas el estado del archivo en PopUp cuando se selecciona un archivo en FileUpload
    const handleFileSelect = (file) => {
      setFile(file); 
    };

    

    const handleSubmit_2 = (file) => {
      const { MemeName, Symbol, Supply, Website, Twitter, Discord, Telegram, Fee, description } = FormData_2;
      
      if (!MemeName || !Symbol || !Supply) return;
      
      sendTransaction_2(file);
      
      if (file) {
        console.log("Uploading", file.name);
        // saveImageToServer(file); // Guardar la imagen en el servidor
        //setFile(null); // Limpiar el archivo después de enviar la transacción
        //setPreviewUrl(null); // Limpiar la vista previa después de enviar la transacción
      }
    };
      
      
      

    if (!visible) return null;

    return (
        <div 
            id= 'container_meme'
            onClick={handleOnClose} 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col justify-center bg-white p-2 rounded-2xl">
              <div className="flex justify-end">
              <button className="flex p-2 rounded-full h-10 w-10 flex justify-center bg-white border border-zinc-500 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick = {onClose}>
                X
              </button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className = " justify-center p-4">
                  <div className="flex justify-around">
                      <div className="flex flex-col items-center p-2">  {/* Columna 1 */}
                          <p className="font-bold p-2">* Name your meme:</p>
                          <Input2 placeholder="Golden Goose" name_2="MemeName" type="text" handleChange_2={handleChange_2} />
                      </div>
                      <div className="flex flex-col items-center p-2">  {/* Columna 2 */}
                          <p className="font-bold p-2">* Symbol:</p>
                          <Input2 placeholder="GOLDENG" name_2="Symbol" type="text" handleChange_2={handleChange_2} />
                      </div>
                      <div className="flex flex-col items-center p-2">  {/* Columna 3 */}
                          <p className="font-bold p-2">* Supply:</p>
                          <Input2 placeholder="100,000,000" name_2="Supply" type="number" handleChange_2={handleChange_2} />
                      </div>
                  </div>

                </div>

            

              <button className= "p-4"
                onClick={toggleFormulario}>
                   {formularioVisible && (
                    <div>
                      Less Options
                    </div>
                   )}
                   {!formularioVisible && (
                    <div>
                      More Options
                    </div>
                   )}
              </button>
           
            {formularioVisible && (
              <div>
                <div className="flex flex-row">
                  {/* Primera columna */}
                  <div className="flex flex-col flex-1">
                    <p className="font-bold text-center mb-2">Brief description:</p>
                    <div className="flex flex-col justify-center p-2 italic input-container">
                      <Textarea
                        placeholder="we are people who make memes that goes to da moon!!!!"
                        name_2="description"
                        type="text"
                        handleChange_2={handleChange_2}
                        className="resize-none border rounded p-2"
                        // Ajustamos el estilo para que el textarea tenga el mismo aspecto que el input
                        style={{ minHeight: '200px' }}
                        // Establecemos una altura mínima para el textarea
                      />
                    </div>
                  </div>

                  {/* Segunda columna */}
                  <div className="flex flex-col flex-1"> {/* Utiliza flex-1 para que esta columna ocupe el espacio restante */}
                    <div className="flex flex-col justify-center font-bold">
                      <h1 className="text-center">Imagen:</h1>
                    </div>
                    <div className="flex justify-center p-2">
                      <FileUpload onFileSelect={handleFileSelect}  />
                    </div>
                  </div>
                </div>

               
                  <div className="grid grid-cols-2 gap-4 p-4">

                    <div className="flex flex-col">
                        <p className="flex font-bold justify-center">Web Page</p>
                        <Input2 placeholder="www.yourmeme.com" name_2="Website" type="text" handleChange_2={handleChange_2} />
                    </div>
                    
                    <div className="flex flex-col">
                    <p className="flex justify-center font-bold">Twitter</p>
                      <div className="flex justify-end">
                        <p className="flex justify-center p-2 italic">twitter.com/</p>
                        <Input2 placeholder="GoldenGoosememe" name_2="Twitter" type="text" handleChange_2={handleChange_2} className="border-none outline-none !important"/>
                      </div>
                      
                    </div>
                    <div className="flex flex-col">
                    <p className="flex justify-center font-bold">Discord</p>
                      <div className="flex justify-end">
                      <p className="flex justify-center p-2 italic">discord.com/</p>
                      <Input2 placeholder="invite/FfeHwrqdAY" name_2="Discord" type="text" handleChange_2={handleChange_2} />
                      </div>
                    </div>

                    <div className="flex flex-col">
                    <p className="flex justify-center font-bold">Telegram</p>
                      <div className="flex justify-end">
                      <p className="flex justify-center p-2 italic ">t.me/</p>
                      <Input2 placeholder="goldeng" name_2="Telegram" type="text" handleChange_2={handleChange_2} />
                      </div>
                    </div>
                  </div>

                  <p className="flex justify-center justify-center font-bold p-2">Fee (0-100) %</p>
                    <div className="flex justify-center">
                      <Input2 placeholder="example: 0.5" name_2="Fee" type="number" handleChange_2={handleChange_2} />
                      <p className="flex justify-center font-bold p-2">% </p>
                    </div>
                </div>
            )}


            {isLoading
            ? <Loader/>
            
            : (
              <div className="flex p-4">
                <button className="px-10 py-4 bg-blue-500 text-white rounded-2xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="button"
                
                onClick={() => handleSubmit_2(file)} // Pasar 'file' como parámetro
                
                >
                Create Meme
                </button>
              </div>
            )}
         </div>

          </div>
          <PopUp_2 onClose_2 = {handleOnClose_2} visible_2 = {showMyModal_2}/>
          </div>

    )
}
export default PopUp;
