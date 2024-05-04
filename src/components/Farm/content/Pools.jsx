import React, { useState, useContext } from "react";
import Stake from './Stake'
import Data_Pools from './Data_Pools'; // Asegúrate de ajustar la ruta si el archivo está en una subcarpeta
import { TransactionContext } from '../../../context/TransactionContext';

// Componente principal que incluye el componente GridContainer
const Pools = () => {
    const [showMyStake, setShowMyStake] = useState(false);
    const [selected_stake_contract, setSelected_stake_contract] = useState(null);
    const [balanceToken, setbalanceToken] = useState(null);

    const {Get_Token_Balance } = useContext(TransactionContext); 

    //const balance_token_2 = Get_Token_Balance(stake_contract)
    
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

      const handleStakeClick = async (stake_contract) => {
        setShowMyStake(true);
        setSelected_stake_contract(stake_contract);   // Guarda el token contract del item seleccionado
        const balance = await Get_Token_Balance(stake_contract);
        setbalanceToken(balance);
    };
    

    return (
        
        <div className="flex flex-col items-center text-black">
            <Data_Pools 

                handleStakeClick={handleStakeClick} 
                toggleFormulario={toggleFormulario} 
                formularioVisible={formularioVisible} 
            />  
            <Stake onClose = {handleOnClose} visible = {showMyStake} stake_contract={selected_stake_contract} balance_token_wallet={balanceToken} />
        </div>
    );
};

export default Pools;
