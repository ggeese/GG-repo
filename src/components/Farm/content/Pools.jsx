import React, { useState } from "react";
import Stake from './Stake'
import Data_Pools from './Data_Pools'; // Asegúrate de ajustar la ruta si el archivo está en una subcarpeta

// Componente principal que incluye el componente GridContainer
const Pools = () => {

    const [showMyStake, setShowMyStake] = useState(false);
    const [selected_stake_contract, setSelected_stake_contract] = useState(null);

    const handleOnClose = () =>{ 
        setShowMyStake(false);
        setSelected_stake_contract(null);  // Resetea el token contract seleccionado al cerrar
    };

    const [formularioVisible, setFormularioVisible] = useState({});

    const toggleFormulario = (id) => {
        setFormularioVisible(prevState => ({
          ...prevState,
          [id]: !prevState[id]
        }));
      };

    const handleStakeClick = (stake_contract) => {
        setShowMyStake(true);
        setSelected_stake_contract(stake_contract);  // Guarda el token contract del item seleccionado
    };
    
    return (
        
        <div className="flex flex-col items-center text-black p-10 ">
            <div className="text-xl mb-7">
                Stake MEME tokens to Earn $GULL
            </div>
            <Data_Pools 

                handleStakeClick={handleStakeClick} 
                toggleFormulario={toggleFormulario} 
                formularioVisible={formularioVisible} 
            />  
            <Stake onClose = {handleOnClose} visible = {showMyStake} stake_contract={selected_stake_contract} />
        </div>
    );
};

export default Pools;
